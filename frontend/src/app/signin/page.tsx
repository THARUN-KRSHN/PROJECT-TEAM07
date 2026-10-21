"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DemoBanner } from "@/components/navigation/DemoBanner";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  LogIn,
  Check,
  Building,
  Microscope,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useAuth, UserRole } from "@/lib/authContext";

const ACCESS_COMPARISON = [
  { feature: "Public homepage, map & safety guidelines", public: true, auth: true },
  { feature: "Simple location risk summary", public: true, auth: true },
  { feature: "Emergency helplines and warning signs", public: true, auth: true },
  { feature: "Detailed terrain & multi-window rainfall analytics", public: false, auth: true },
  { feature: "Ensemble prediction model outputs & confidence", public: false, auth: true },
  { feature: "SHAP feature importance & factor attribution", public: false, auth: true },
  { feature: "Model evaluation & ROC/AUC scientific methodology", public: false, auth: true },
  { feature: "Official downloadable hazard reports (PDF)", public: false, auth: true },
  { feature: "Dataset management and pipeline retrain triggers", public: false, auth: true, adminOnly: true },
];

export default function SignInPage() {
  const { user, isAuthenticated, loginAs, logout } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRoleSignIn = (role: UserRole) => {
    loginAs(role);
    router.push("/map");
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs("officer");
    router.push("/map");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#202923]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F3] border border-[#E1E6E1] text-[#247343] text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Authorised Analytics Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#202923]">
              Authorised User Sign In
            </h1>
            <p className="text-sm text-[#526056] leading-relaxed">
              Detailed machine learning explainability (SHAP), terrain derivatives, and model evaluation metrics are reserved for authenticated disaster officials and researchers.
            </p>
          </div>

          {/* Already Signed In Alert */}
          {isAuthenticated && (
            <div className="p-6 rounded-xl bg-[#F3F8F5] border border-[#A7D7B9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#247343]">Currently Signed In</div>
                <div className="text-base font-bold text-[#202923] mt-0.5">{user?.name}</div>
                <div className="text-xs text-[#526056]">{user?.roleLabel} • {user?.agency}</div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/insights"
                  className="px-4 py-2 rounded-md bg-[#247343] text-white text-xs font-semibold hover:bg-[#1E5E37]"
                >
                  Go to Analytics Suite
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md bg-white border border-[#E1E6E1] text-xs font-semibold text-[#DC2626] hover:bg-[#FDF2F2]"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* Sign In Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Quick Demo Role Selection (Evaluator Friendly) */}
            <div className="bg-[#F3F5F3] p-6 rounded-xl border border-[#E1E6E1] space-y-5">
              <div>
                <h2 className="text-base font-bold text-[#202923]">One-Click Evaluation Roles</h2>
                <p className="text-xs text-[#526056] mt-1">
                  Select a test credential below to access authenticated analytics immediately without entering passwords.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleRoleSignIn("officer")}
                  className="w-full p-4 rounded-lg bg-white border border-[#E1E6E1] hover:border-[#247343] text-left transition-all group flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#247343]" />
                      <span className="text-sm font-bold text-[#202923] group-hover:text-[#247343]">
                        Disaster Management Officer
                      </span>
                    </div>
                    <p className="text-xs text-[#526056]">
                      Access to location dossiers, downloadable PDF hazard reports, and community exposure analysis.
                    </p>
                    <div className="text-[10px] text-[#247343] font-medium pt-1">
                      KSDMA • State Emergency Services
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#526056] group-hover:text-[#247343] shrink-0 mt-1" />
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSignIn("researcher")}
                  className="w-full p-4 rounded-lg bg-white border border-[#E1E6E1] hover:border-[#247343] text-left transition-all group flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Microscope className="w-4 h-4 text-[#247343]" />
                      <span className="text-sm font-bold text-[#202923] group-hover:text-[#247343]">
                        Geotechnical &amp; AI Researcher
                      </span>
                    </div>
                    <p className="text-xs text-[#526056]">
                      Access to SHAP factor attribution, Cartosat DEM derivatives, model ROC/AUC curves, and algorithm benchmarks.
                    </p>
                    <div className="text-[10px] text-[#247343] font-medium pt-1">
                      CESS • Academic Research Consortium
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#526056] group-hover:text-[#247343] shrink-0 mt-1" />
                </button>
              </div>
            </div>

            {/* Credential Form */}
            <div className="bg-white p-6 rounded-xl border border-[#E1E6E1] space-y-4">
              <div>
                <h2 className="text-base font-bold text-[#202923]">Authorised Credentials</h2>
                <p className="text-xs text-[#526056] mt-1">
                  Log in with your official government or institutional credentials.
                </p>
              </div>

              <form onSubmit={handleCustomSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@kerala.gov.in"
                    className="w-full px-3 py-2 bg-white border border-[#E1E6E1] rounded text-sm text-[#202923] focus:outline-none focus:border-[#247343]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Password / Token
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 bg-white border border-[#E1E6E1] rounded text-sm text-[#202923] focus:outline-none focus:border-[#247343]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md font-semibold text-sm bg-[#247343] hover:bg-[#1E5E37] text-white transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In as Authorised User</span>
                </button>
              </form>

              <div className="pt-2 text-[11px] text-[#526056] border-t border-[#E1E6E1]">
                Need researcher access? Contact the platform administrator via the{" "}
                <Link href="/about" className="text-[#247343] hover:underline">
                  About &amp; Feedback page
                </Link>
                .
              </div>
            </div>
          </div>

          {/* Access Control Matrix (Section 4 in plan) */}
          <div className="space-y-4 pt-4">
            <div className="border-b border-[#E1E6E1] pb-2">
              <h2 className="text-lg font-bold text-[#202923]">Access Control Matrix</h2>
              <p className="text-xs text-[#526056] mt-0.5">
                Overview of features accessible to general public users vs. authenticated specialists.
              </p>
            </div>

            <div className="border border-[#E1E6E1] rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F3F5F3] text-[#202923] font-bold border-b border-[#E1E6E1]">
                  <tr>
                    <th className="py-2.5 px-4">Feature</th>
                    <th className="py-2.5 px-4 text-center w-36">General Users</th>
                    <th className="py-2.5 px-4 text-center w-48">Authenticated Users</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E6E1] bg-white text-[#202923]">
                  {ACCESS_COMPARISON.map((row, i) => (
                    <tr key={i} className="hover:bg-[#F3F5F3]">
                      <td className="py-2 px-4 font-medium">{row.feature}</td>
                      <td className="py-2 px-4 text-center">
                        {row.public ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-[#247343]">
                            <Check className="w-4 h-4" />
                            <span>Included</span>
                          </span>
                        ) : (
                          <span className="text-[#526056] font-normal">—</span>
                        )}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <span className="inline-flex items-center gap-1 font-semibold text-[#247343]">
                          <Check className="w-4 h-4" />
                          <span>{row.adminOnly ? "Admin / Research" : "Authorised"}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
