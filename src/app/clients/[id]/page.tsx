import React from "react";
import { notFound } from "next/navigation";
import { mockClients } from "@/lib/clients/mockData";
import { ClientHeader } from "@/components/clients/ClientHeader";
import { ClientTabs } from "@/components/clients/ClientTabs";

export default async function ClientHubPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const client = mockClients[resolvedParams.id];

  if (!client) {
    notFound();
  }

  return (
    <div className="w-full">
      <ClientHeader client={client} />
      <ClientTabs client={client} />
    </div>
  );
}
