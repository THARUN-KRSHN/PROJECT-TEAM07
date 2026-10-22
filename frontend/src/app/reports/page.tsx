"use client";

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
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
  Printer,
  X,
  Share2,
} from "lucide-react";

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState<ReportItem | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);
  const [recipient, setRecipient] = useState("District Emergency Operations Centre");
  const [includeFindings, setIncludeFindings] = useState(true);
  const [includeActions, setIncludeActions] = useState(true);
  const analyticsRef = useRef<HTMLDivElement>(null);

  const notify = (message: string) => {
    setDownloadNotification(message);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4000);
  };

  const handleDownload = (report: ReportItem) => {
    setActiveReport(report);
  };

  const printReport = (report: ReportItem) => {
    const findings = includeFindings
      ? `<h2>Executive findings</h2><ul>${report.keyFindings.map((item) => `<li>${item}</li>`).join("")}</ul>`
      : "";
    const actions = includeActions
      ? `<h2>Recommended actions</h2><ul>${report.recommendedActions.map((item) => `<li>${item}</li>`).join("")}</ul>`
      : "";
    const popup = window.open("", "_blank", "width=900,height=900");
    if (!popup) {
      notify("Allow pop-ups to export the report.");
      return;
    }
    popup.document.write(`<!doctype html><html><head><title>${report.reportNumber}</title>
      <style>body{font:14px Arial;color:#202923;max-width:780px;margin:40px auto;line-height:1.5}
      h1{color:#247343}h2{font-size:16px;border-bottom:1px solid #ddd;padding-bottom:6px}
      .meta,.metric{background:#f3f5f3;padding:12px;border:1px solid #e1e6e1;border-radius:8px}
      .metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.label{font-size:11px;color:#526056;text-transform:uppercase}
      li{margin:8px 0}</style></head><body>
      <h1>GiriRaksha Hazard Report</h1><div class="meta"><b>${report.reportNumber}</b><br>
      ${report.title}<br>Prepared for: ${recipient}<br>Location: ${report.locationName}, ${report.district}<br>
      Generated: ${report.generatedDate} · Valid until: ${report.validUntil}</div>
      <div class="metrics"><div class="metric"><span class="label">Risk score</span><br><b>${report.riskScore.toFixed(2)}</b></div>
      <div class="metric"><span class="label">Risk level</span><br><b>${report.riskLevel}</b></div>
      <div class="metric"><span class="label">Rainfall</span><br><b>${report.rainfallStatus}</b></div></div>
      ${findings}${actions}<p><b>Disclaimer:</b> This report is an academic susceptibility assessment and is not an official warning.</p>
      </body></html>`);
    popup.document.close();
    popup.focus();
    popup.print();
    notify(`Prepared ${report.reportNumber} for PDF printing`);
  };

  const captureAnalytics = async () => {
    if (!analyticsRef.current || !activeReport) return;
    try {
      const canvas = await html2canvas(analyticsRef.current, { backgroundColor: "#ffffff", scale: 2 });
      const link = document.createElement("a");
      link.download = `${activeReport.reportNumber}-analytics.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      notify(`Downloaded ${activeReport.reportNumber} analytics screenshot`);
    } catch {
      notify("Unable to capture analytics screenshot. Try again in a moment.");
    }
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
                      <span>Customize Report</span>
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
            <div className="rounded-lg border border-[#E1E6E1] bg-[#F3F5F3] p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#247343]">Customize export</span>
              <label className="block text-xs text-[#526056]">
                Prepared for
                <input value={recipient} onChange={(event) => setRecipient(event.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E1E6E1] bg-white px-3 py-2 text-sm text-[#202923]" />
              </label>
              <div className="flex flex-wrap gap-4 text-xs text-[#202923]">
                <label className="flex items-center gap-2"><input type="checkbox" checked={includeFindings}
                  onChange={(event) => setIncludeFindings(event.target.checked)} /> Executive findings</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={includeActions}
                  onChange={(event) => setIncludeActions(event.target.checked)} /> Recommended actions</label>
              </div>
            </div>

            <div ref={analyticsRef} className="rounded-lg border border-[#E1E6E1] bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#247343]">Analytics snapshot</span>
                <span className="text-xs font-semibold text-[#526056]">{activeReport.locationName}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded border border-[#E1E6E1] p-2"><div className="text-[10px] text-[#526056]">Risk score</div><strong>{activeReport.riskScore.toFixed(2)}</strong></div>
                <div className="rounded border border-[#E1E6E1] p-2"><div className="text-[10px] text-[#526056]">Risk class</div><strong>{activeReport.riskLevel}</strong></div>
                <div className="rounded border border-[#E1E6E1] p-2"><div className="text-[10px] text-[#526056]">Status</div><strong>{activeReport.evacuationStatus}</strong></div>
              </div>
              <div className="space-y-2">
                {activeReport.keyFindings.slice(0, 3).map((finding, index) => (
                  <div key={finding} className="flex items-center gap-2 text-xs text-[#526056]">
                    <span className="w-5 text-right font-bold text-[#247343]">{index + 1}</span>
                    <div className="h-2 flex-1 rounded-full bg-[#E1E6E1]"><div className="h-2 rounded-full bg-[#247343]" style={{ width: `${Math.max(25, 90 - index * 20)}%` }} /></div>
                    <span className="w-2/5 truncate">{finding}</span>
                  </div>
                ))}
              </div>
            </div>

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
                onClick={() => printReport(activeReport)}
                className="px-4 py-2 rounded-md text-xs font-semibold bg-[#247343] text-white hover:bg-[#1E5E37] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button onClick={captureAnalytics}
                className="px-4 py-2 rounded-md text-xs font-semibold bg-[#D97706] text-white hover:bg-[#B45309] flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                <span>Download Analytics PNG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
