"use client";

import React, { useState } from "react";
import { DemoBanner } from "@/components/navigation/DemoBanner";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { AuthGate } from "@/components/auth/AuthGate";
import { MOCK_REPORTS, ReportItem } from "@/data/mockReports";
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
  Building,
  Printer,
  X,
  Share2,
} from "lucide-react";

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState<ReportItem | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  const handleDownload = (report: ReportItem) => {
    setDownloadNotification(`Generated ${report.reportNumber} PDF (${report.fileSizeBytes})`);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#202923]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-12">
        <AuthGate
          featureTitle="Downloadable Hazard Reports & Official Dossiers"
          featureDescription="Official hazard bulletins, evacuation advisories, and synthesized terrain reports compiled for disaster response authorities. Accessible only to authenticated officials and researchers."
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E1E6E1]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F3] border border-[#E1E6E1] text-[#247343] text-xs font-bold uppercase tracking-wider mb-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Hazard Intelligence Center</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#202923] tracking-tight">
                  Risk Reports &amp; Advisories
                </h1>
                <p className="text-sm text-[#526056] mt-1 max-w-2xl leading-relaxed">
                  Automated hazard briefs generated for the Kerala State Disaster Management
                  Authority (KSDMA), District Emergency Operations, and local Grama Panchayats.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#526056] bg-[#F3F5F3] px-3 py-1.5 rounded-md border border-[#E1E6E1]">
                  Active Bulletins: <strong className="text-[#202923]">{MOCK_REPORTS.length}</strong>
                </span>
              </div>
            </div>

            {/* Toast Notification when Download is triggered */}
            {downloadNotification && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#247343] text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <div className="text-xs">
                  <strong className="block font-semibold">Download Complete:</strong>
                  <span>{downloadNotification}</span>
                </div>
              </div>
            )}

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_REPORTS.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-xl p-6 border border-[#E1E6E1] hover:border-[#247343] flex flex-col justify-between transition-colors shadow-sm"
                >
                  <div>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-semibold text-[#526056]">
                        {report.reportNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white ${
                          report.riskLevel === "VERY HIGH"
                            ? "bg-[#DC2626]"
                            : "bg-[#EA580C]"
                        }`}
                      >
                        {report.riskLevel} • {report.riskScore.toFixed(2)}
                      </span>
                    </div>

                    {/* Title & Location */}
                    <h3 className="text-base font-bold text-[#202923] tracking-tight mb-1">
                      {report.title}
                    </h3>
                    <div className="text-xs text-[#247343] font-medium mb-4">
                      {report.locationName}, {report.district}
                    </div>

                    {/* Key Stats Pill */}
                    <div className="bg-[#F3F5F3] rounded-lg p-3 border border-[#E1E6E1] space-y-1.5 text-xs mb-4">
                      <div className="flex justify-between">
                        <span className="text-[#526056]">Status:</span>
                        <strong className="text-[#DC2626] font-semibold">
                          {report.evacuationStatus}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#526056]">Telemetry:</span>
                        <span className="text-[#202923] font-medium">{report.rainfallStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#526056]">Generated:</span>
                        <span className="text-[#526056]">{report.generatedDate}</span>
                      </div>
                    </div>

                    {/* Key Findings Preview */}
                    <div className="text-xs text-[#526056] space-y-1 mb-6">
                      <span className="text-[10px] uppercase font-bold text-[#202923] tracking-wider block">
                        Executive Finding:
                      </span>
                      <p className="line-clamp-2">
                        {report.keyFindings[0]}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 border-t border-[#E1E6E1] flex items-center gap-2">
                    <button
                      onClick={() => setActiveReport(report)}
                      className="flex-1 py-2 px-3 rounded-md text-xs font-semibold bg-[#F3F5F3] hover:bg-[#E1E6E1] text-[#202923] flex items-center justify-center gap-1.5 transition-colors border border-[#E1E6E1]"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#247343]" />
                      <span>View Dossier</span>
                    </button>

                    <button
                      onClick={() => handleDownload(report)}
                      className="flex-1 py-2 px-3 rounded-md text-xs font-semibold bg-[#247343] hover:bg-[#1E5E37] text-white flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AuthGate>
      </main>

      {/* Full Report Inspection Modal */}
      {activeReport && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-[#E1E6E1] rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E1E6E1]">
              <div>
                <span className="text-xs font-mono text-[#247343] font-semibold">
                  {activeReport.reportNumber}
                </span>
                <h2 className="text-2xl font-bold text-[#202923] mt-1">
                  {activeReport.title}
                </h2>
                <div className="text-xs text-[#526056] mt-0.5">
                  Issued by: {activeReport.author}
                </div>
              </div>
              <button
                onClick={() => setActiveReport(null)}
                className="p-1.5 rounded-md hover:bg-[#F3F5F3] text-[#526056] hover:text-[#202923] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Findings & Evacuation Guidance */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-lg bg-[#F3F5F3] border border-[#E1E6E1] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#247343]">
                  Actionable Operational Directive
                </span>
                <p className="text-[#202923] font-medium leading-relaxed">
                  {activeReport.evacuationStatus}: Pre-emptive relocation required for river-adjacent tea plantation clusters in {activeReport.locationName}.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#202923] mb-2">Executive Findings:</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-[#526056]">
                  {activeReport.keyFindings.map((finding, idx) => (
                    <li key={idx}>{finding}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#E1E6E1] flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveReport(null)}
                className="px-4 py-2 rounded-md text-xs font-semibold border border-[#E1E6E1] text-[#202923] hover:bg-[#F3F5F3]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(activeReport);
                  setActiveReport(null);
                }}
                className="px-4 py-2 rounded-md text-xs font-semibold bg-[#247343] text-white hover:bg-[#1E5E37] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Official PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
