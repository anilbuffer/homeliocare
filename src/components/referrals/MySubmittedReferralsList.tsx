"use client";

import React from "react";
import Link from "next/link";
import { PlusCircle, ExternalLink, Mailbox } from "lucide-react";

interface MySubmittedReferralsListProps {
  email: string;
}

// Mock data matching the requested status and minimal PHI
const MOCK_REFERRALS = [
  { id: "REF-A1B2C3", patientName: "John Doe", date: "2023-10-25T14:30:00Z", status: "received" },
  { id: "REF-X9Y8Z7", patientName: "Jane Smith", date: "2023-10-24T09:15:00Z", status: "under_review" },
  { id: "REF-M4N5P6", patientName: "Robert Johnson", date: "2023-10-20T11:45:00Z", status: "assessment_scheduled" },
  { id: "REF-Q1W2E3", patientName: "Mary Williams", date: "2023-10-18T16:20:00Z", status: "need_info" },
  { id: "REF-K9L8J7", patientName: "James Brown", date: "2023-10-15T10:00:00Z", status: "accepted" },
  { id: "REF-H5G6F7", patientName: "Patricia Jones", date: "2023-10-10T13:10:00Z", status: "not_fit" },
];

export function MySubmittedReferralsList({ email }: MySubmittedReferralsListProps) {
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'received':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 border border-teal-200">Received</span>;
      case 'assessment_scheduled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 border border-teal-200">Assessment Scheduled</span>;
      case 'accepted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 border border-teal-200">Accepted as Client</span>;
      case 'under_review':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">Under Review</span>;
      case 'in_progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">In Progress</span>;
      case 'need_info':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">Needs More Info</span>;
      case 'not_fit':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">Not a Fit</span>;
      case 'referred_elsewhere':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">Referred Elsewhere</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">{status}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Submitted Referrals</h1>
          <p className="text-slate-500 text-sm mt-1">
            Showing status for referrals submitted by <span className="font-medium text-slate-700">{email}</span>
          </p>
        </div>
        <Link 
          href="/refer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          New Referral
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {MOCK_REFERRALS.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Patient / Reference
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {MOCK_REFERRALS.map((referral) => (
                  <tr key={referral.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900">{referral.patientName}</span>
                        <span className="text-xs text-slate-500 font-mono mt-0.5">{referral.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {formatDate(referral.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(referral.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Mailbox className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No referrals found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">
              You haven't submitted any referrals using this email address yet.
            </p>
            <Link 
              href="/refer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
            >
              Submit your first referral
            </Link>
          </div>
        )}
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start gap-3 mt-8">
        <div className="mt-0.5">
          <ExternalLink className="w-5 h-5 text-slate-400" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-slate-700">Questions about a referral?</h4>
          <p className="text-sm text-slate-500 mt-1">
            If you need to provide additional clinical details or update a submission, please contact our intake team directly at{" "}
            <a href="mailto:intake@homelio.example.com" className="text-teal-600 hover:underline">intake@homelio.example.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
