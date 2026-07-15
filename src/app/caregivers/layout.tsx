import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";

export default function CaregiversLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
