import { PortalLayout } from "@/components/portal/PortalLayout";

export default function TrainingAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalLayout>{children}</PortalLayout>;
}
