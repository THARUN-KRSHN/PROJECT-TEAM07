"use client";

import React from "react";
import Link from "next/link";
import { Lock, LogIn, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth, UserRole } from "@/lib/authContext";

interface AuthGateProps {
  children: React.ReactNode;
  featureTitle: string;
  featureDescription?: string;
  requiredRole?: UserRole;
}

export function AuthGate({
  children,
  featureTitle,
  featureDescription = "Detailed geotechnical analytics, model evaluation metrics, and prediction confidence outputs are reserved for authorised disaster officials and researchers.",
  requiredRole,
}: AuthGateProps) {
  const { isAuthenticated, user, loginAs } = useAuth();

  if (isAuthenticated) {
    if (requiredRole && user?.role !== requiredRole && user?.role !== "admin") {
      return (
        <div className="max-w-2xl mx-auto my-16 p-8 rounded-xl bg-[#F3F5F3] border border-[#E1E6E1] text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white border border-[#E1E6E1] text-[#D97706] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#202923]">Elevated Permissions Required</h2>
          <p className="text-xs sm:text-sm text-[#526056] leading-relaxed">
            This module requires <strong>{requiredRole}</strong> role permissions. You are currently signed in as <strong>{user?.roleLabel}</strong>.
          </p>
          <div className="pt-2">
            <Link
              href="/signin"
              className="px-5 py-2.5 rounded-md bg-[#247343] text-white text-xs font-semibold hover:bg-[#1E5E37]"
            >
              Switch Role on Sign In Page
            </Link>
          </div>
        </div>
      );
    }

    return <>{children}</>;
  }

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 sm:p-10 rounded-xl bg-white border border-[#E1E6E1] shadow-sm text-center space-y-6">
      <div className="w-14 h-14 rounded-full bg-[#F3F5F3] border border-[#E1E6E1] text-[#247343] flex items-center justify-center mx-auto">
        <Lock className="w-7 h-7" />
      </div>

      <div className="space-y-2 max-w-lg mx-auto">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#247343] px-2.5 py-0.5 rounded bg-[#F3F8F5] border border-[#A7D7B9]">
          Restricted Scientific Module
        </span>
        <h2 className="text-2xl font-bold text-[#202923] tracking-tight">
          {featureTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#526056] leading-relaxed">
          {featureDescription}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/signin"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-semibold text-sm bg-[#247343] hover:bg-[#1E5E37] text-white transition-colors"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In to Access</span>
        </Link>

        {/* Quick Demo Evaluation Bypass */}
        <button
          type="button"
          onClick={() => loginAs("officer")}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-semibold text-xs bg-[#F3F5F3] hover:bg-[#E1E6E1] text-[#202923] border border-[#E1E6E1] transition-colors"
          title="Instant one-click demo login for academic evaluation"
        >
          <ShieldCheck className="w-4 h-4 text-[#247343]" />
          <span>Quick Demo Evaluation (KSDMA Officer)</span>
        </button>
      </div>

      <div className="pt-4 border-t border-[#E1E6E1] text-xs text-[#526056] flex items-center justify-center gap-2">
        <span>Ordinary residents can explore available public information on the</span>
        <Link href="/map" className="text-[#247343] font-semibold hover:underline inline-flex items-center gap-1">
          <span>Risk Map</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
