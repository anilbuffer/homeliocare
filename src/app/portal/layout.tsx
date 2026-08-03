import { PortalLayout } from "@/components/portal/PortalLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["CLIENT", "FAMILY"]}>
      <PortalLayout>{children}</PortalLayout>
    </AuthGuard>
  );
}
