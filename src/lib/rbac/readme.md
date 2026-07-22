# Server-Side RBAC Permission Middleware & Authorization Hooks

This directory provides the core Role-Based Access Control (RBAC) data structures, matrix configuration, and user permissions state for **Homelio Care**.

While the primary interface lives in the `/users` page component, server-side authorization checks MUST be enforced on every API route, Next.js Server Action, and Middleware handler to ensure complete HIPAA compliance and prevent direct URL or API tampering.

---

## 1. Where to Wire Server-Side Enforcement

### A. Next.js App Router Middleware (`src/middleware.ts`)
Intercept incoming HTTP requests before routing to pages or API handlers. Extract the authenticated session token, resolve the user's role from the database, and match the route path against the corresponding `module_id`.

```typescript
// Example src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authorizeRoute } from "@/lib/rbac/serverGuard";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  const user = await getAuthenticatedUser(token);
  
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Check if current user role has access to requested route path
  const isAuthorized = await authorizeRoute(user, req.nextUrl.pathname);
  
  if (!isAuthorized) {
    return new NextResponse("Forbidden: Insufficient Role Permissions", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/patients/:path*",
    "/scheduling/:path*",
    "/billing/:path*",
    "/incidents/:path*",
    "/compliance/:path*",
    "/settings/:path*",
    "/api/:path*",
  ],
};
```

---

## 2. Granular Field & Sub-toggle Enforcement

In addition to module-level checks (`full` | `edit` | `view` | `none`), certain modules contain sensitive sub-toggles (e.g. `Patients` clinical vs billing, or `Incident & Risk` restricted incident reports).

### Example Field Guard in API Handlers
```typescript
import { checkModulePermission } from "@/lib/rbac/serverGuard";

export async function GET(request: Request) {
  const session = await getSession();
  const perm = await checkModulePermission(session.user.role_id, "mod_patients");

  if (perm.access_level === "none") {
    return Response.json({ error: "Access denied" }, { status: 403 });
  }

  let query = db.patients.select();

  // Enforce Row Scope (Caseload / Branch / Self)
  if (perm.scope_type === "caseload") {
    query = query.whereIn("id", session.user.assigned_clients);
  } else if (perm.scope_type === "branch") {
    query = query.where("branch_id", session.user.branch_id);
  }

  const patientData = await query.fetch();

  // Enforce Field-Level Sub-toggles
  const sanitizedData = patientData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    // Include clinical notes only if sub-toggle is true
    clinical_notes: perm.field_permissions?.clinical_notes ? patient.clinical_notes : undefined,
    // Include insurance & demographics
    insurance: perm.field_permissions?.demographics_insurance ? patient.insurance : undefined,
    // Include billing details only if sub-toggle is true
    billing: perm.field_permissions?.billing_balance ? patient.billing : undefined,
  }));

  return Response.json(sanitizedData);
}
```

---

## 3. Database Schema Mapping

For production SQL or Prisma ORM migrations, reference the data model interfaces defined in [`types.ts`](./types.ts):
- `roles` table: `id (PK), name, tier, is_system_role, description`
- `modules` table: `id (PK), name, category, has_sub_toggles`
- `role_permissions` table: `role_id (FK), module_id (FK), access_level, scope_type, field_permissions (JSONB)`
- `users` table: `id (PK), name, email, role_id (FK), status, branch_id, assigned_clients (ARRAY), linked_client_ids (ARRAY), family_permissions (JSONB)`
- `audit_logs` table: `id (PK), timestamp, actor_name, actor_email, action, target_type, target_id, target_name, details, diff (JSONB)`
