"use client";

import React from "react";
import { CertificateCard } from "./CertificateCard";
import { MOCK_CERTIFICATIONS } from "@/lib/mockTrainingData";

export function MyCertifications() {
  return (
    <div className="space-y-6 pb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800">My Certifications</h3>
        <p className="text-sm text-slate-500">Downloadable proof of your completed training and compliance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK_CERTIFICATIONS.map((cert: any) => (
          <CertificateCard key={cert.id} {...cert} />
        ))}
      </div>
    </div>
  );
}
