import React from "react";
import { Card, cn } from "@/components/ui/Card";
import { Client } from "@/lib/clients/mockData";
import { FileText, Image as ImageIcon } from "lucide-react";

export function DocumentsTab({ client }: { client: Client }) {
  if (!client.documents) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200">
          <h3 className="text-lg font-medium text-slate-700 mb-2">No documents uploaded</h3>
        </Card>
      </div>
    );
  }

  const { documents } = client;
  
  const sections = [
    { title: "Intake", items: documents.intake },
    { title: "Consents", items: documents.consents },
    { title: "Clinical", items: documents.clinical },
    { title: "Insurance", items: documents.insurance },
    { title: "Orders", items: documents.orders },
  ];

  return (
    <div className="space-y-8">
      {sections.map((section, idx) => (
        section.items && section.items.length > 0 && (
          <div key={idx}>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">{section.title}</h3>
            <div className="flex flex-wrap gap-4">
              {section.items.map((doc) => (
                <Card key={doc.id} className="p-4 flex items-center gap-4 w-[400px] border border-slate-200 hover:border-brand-teal/50 hover:shadow-md transition-all cursor-pointer">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", doc.type === "img" ? "bg-blue-50 text-blue-500" : "bg-rose-50 text-rose-500")}>
                    {doc.type === "img" ? (
                      <ImageIcon className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {doc.author} · {doc.date} · {doc.size}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
