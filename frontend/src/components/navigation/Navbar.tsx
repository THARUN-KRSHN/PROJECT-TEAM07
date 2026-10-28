"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  MapPin,
  Shield,
  LogIn,
  LogOut,
  ChevronDown,
  Layers,
  BarChart2,
  FileText,
  User,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/authContext";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Risk Map", href: "/map" },
  { label: "Demo Presentation", href: "/demo-presentation" },
  { label: "Safety Guidelines", href: "/safety" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [analyticsDropdownOpen, setAnalyticsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAnalyticsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setAnalyticsDropdownOpen(false);
  };

  const isAnalyticsActive =
    pathname.startsWith("/insights") ||
    pathname.startsWith("/pipeline") ||
    pathname.startsWith("/reports") ||
    pathname.startsWith("/research");

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-6 w-full max-w-6xl mx-auto transition-all">
      <div className="bg-white/95 backdrop-blur-md border border-[#E1E8E2] rounded-full px-3 sm:px-4 py-2 shadow-sm flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Icon & Logo */}
        <Link
          href="/"
          onClick={handleLinkClick}
          className="flex items-center gap-2.5 group focus:outline-none shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-[#1B432E] text-white flex items-center justify-center overflow-hidden shadow-xs group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="GiriRaksha Logo"
              width={22}
              height={22}
              className="h-5 w-5 object-contain brightness-0 invert"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-[#1B3624] flex items-center leading-none">
              Giri<span className="text-[#247343]">Raksha</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.14em] text-[#526056] font-semibold mt-0.5 hidden sm:inline">
              Landslide GIS
            </span>
          </div>
        </Link>

        {/* Center: SINGLE FLOATING NAV PILL (All links in 1 pill, no separate pill per item) */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="inline-flex items-center gap-0.5 lg:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium transition-all rounded-full relative flex items-center gap-1.5",
                    isActive
                      ? "text-[#247343] font-bold"
                      : "text-[#526056] hover:text-[#202923] hover:bg-white/60"
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#247343] shrink-0" />
                  )}
                </Link>
              );
            })}

            {/* Sub-Header Dropdown: Analytics Suite */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAnalyticsDropdownOpen(!analyticsDropdownOpen)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all cursor-pointer",
                  isAnalyticsActive || analyticsDropdownOpen
                    ? "text-[#247343] font-bold bg-white/70 shadow-xs"
                    : "text-[#526056] hover:text-[#202923] hover:bg-white/60"
                )}
              >
                <span>Analytics Suite</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform duration-200 text-[#526056]",
                    analyticsDropdownOpen && "rotate-180 text-[#247343]"
                  )}
                />
                {isAnalyticsActive && !analyticsDropdownOpen && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#247343] shrink-0 ml-0.5" />
                )}
              </button>

              {/* Polished Sub-Header Floating Menu */}
              {analyticsDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-80 bg-white border border-[#E1E6E1] rounded-2xl shadow-xl p-3 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                  {/* Category 1: Spatial Intelligence & Attribution */}
                  <div className="px-2.5 pt-1 pb-1.5 flex items-center justify-between border-b border-[#EDF2ED]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#247343]">
                      Spatial Intelligence &amp; AI
                    </span>
                    <span className="text-[9px] font-mono text-[#247343] font-semibold bg-[#EAF5EE] px-1.5 py-0.5 rounded">
                      Real-time
                    </span>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/insights"
                      onClick={handleLinkClick}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F3F6F4] transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#EAF5EE] text-[#247343] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#247343] group-hover:text-white transition-colors">
                        <BarChart2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-[#202923] group-hover:text-[#247343] transition-colors">
                          SHAP Factor Attribution
                        </div>
                        <div className="text-[11px] text-[#526056] truncate">
                          Slope, rainfall &amp; soil saturation triggers
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/pipeline"
                      onClick={handleLinkClick}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F3F6F4] transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#EAF5EE] text-[#247343] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#247343] group-hover:text-white transition-colors">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-[#202923] group-hover:text-[#247343] transition-colors">
                          Data Pipeline Architecture
                        </div>
                        <div className="text-[11px] text-[#526056] truncate">
                          PostGIS grid &amp; GeoParquet spatial index
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Category 2: Official Validation & Benchmarks */}
                  <div className="px-2.5 pt-2 pb-1.5 flex items-center justify-between border-b border-[#EDF2ED] mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#247343]">
                      Official Reports &amp; Metrics
                    </span>
                    <span className="text-[9px] font-mono text-[#526056] bg-[#F1F4F1] px-1.5 py-0.5 rounded">
                      GSI/IMD
                    </span>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/research"
                      onClick={handleLinkClick}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F3F6F4] transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#EAF5EE] text-[#247343] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#247343] group-hover:text-white transition-colors">
                        <Shield className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-[#202923] group-hover:text-[#247343] transition-colors">
                          Model Evaluation &amp; Benchmarks
                        </div>
                        <div className="text-[11px] text-[#526056] truncate">
                          ROC-AUC 0.997 &amp; spatial k-fold validation
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/reports"
                      onClick={handleLinkClick}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F3F6F4] transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#EAF5EE] text-[#247343] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#247343] group-hover:text-white transition-colors">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-[#202923] group-hover:text-[#247343] transition-colors">
                          Downloadable Risk Reports
                        </div>
                        <div className="text-[11px] text-[#526056] truncate">
                          PDF hazard dossiers for 14 Kerala districts
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Right: User Authentication / Researcher Profile */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5 bg-[#FAFBF9] border border-[#E1E6E1] py-1 px-3 rounded-full shadow-xs">
              <div className="w-6 h-6 rounded-full bg-[#EAF5EE] text-[#247343] flex items-center justify-center text-[10px] font-bold">
                {user?.name?.charAt(0) || <User className="w-3 h-3" />}
              </div>
              <div className="text-left leading-tight">
                <div className="text-xs font-semibold text-[#202923] truncate max-w-[120px]">
                  {user?.name}
                </div>
                <div className="text-[9px] text-[#247343] font-medium">
                  {user?.roleLabel || "Researcher"}
                </div>
              </div>
              <button
                onClick={logout}
                title="Sign out"
                className="p-1 rounded-full text-[#718075] hover:text-[#DC2626] hover:bg-[#FEE2E2] transition-colors cursor-pointer ml-1"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold bg-[#1B432E] hover:bg-[#143423] text-white transition-all shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-300" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/map"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#247343] text-white shadow-xs"
          >
            <MapPin className="w-3 h-3" />
            <span>Map</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl bg-[#F3F5F3] border border-[#E1E6E1] text-[#202923] hover:bg-[#E1E6E1] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E1E6E1] bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                    isActive
                      ? "bg-[#EAF5EE] text-[#247343] font-bold"
                      : "text-[#526056] hover:text-[#202923] hover:bg-[#F3F5F3]"
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#247343]" />}
                </Link>
              );
            })}
          </div>

          {/* Mobile Analytics Suite Sub-headers */}
          <div className="pt-2 border-t border-[#E1E6E1] space-y-2">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#247343] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Analytics Suite
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <Link
                href="/insights"
                onClick={handleLinkClick}
                className="p-2.5 rounded-xl bg-[#F9FAF8] border border-[#E5EBE6] text-[#202923] font-medium hover:bg-[#EAF5EE] transition-colors"
              >
                <div className="font-semibold text-xs text-[#247343]">SHAP Insights</div>
                <div className="text-[10px] text-[#526056]">Factor Attribution</div>
              </Link>
              <Link
                href="/pipeline"
                onClick={handleLinkClick}
                className="p-2.5 rounded-xl bg-[#F9FAF8] border border-[#E5EBE6] text-[#202923] font-medium hover:bg-[#EAF5EE] transition-colors"
              >
                <div className="font-semibold text-xs text-[#247343]">GIS Pipeline</div>
                <div className="text-[10px] text-[#526056]">ETL &amp; PostGIS</div>
              </Link>
              <Link
                href="/research"
                onClick={handleLinkClick}
                className="p-2.5 rounded-xl bg-[#F9FAF8] border border-[#E5EBE6] text-[#202923] font-medium hover:bg-[#EAF5EE] transition-colors"
              >
                <div className="font-semibold text-xs text-[#247343]">Benchmarks</div>
                <div className="text-[10px] text-[#526056]">Model Evaluation</div>
              </Link>
              <Link
                href="/reports"
                onClick={handleLinkClick}
                className="p-2.5 rounded-xl bg-[#F9FAF8] border border-[#E5EBE6] text-[#202923] font-medium hover:bg-[#EAF5EE] transition-colors"
              >
                <div className="font-semibold text-xs text-[#247343]">Reports</div>
                <div className="text-[10px] text-[#526056]">District PDF Export</div>
              </Link>
            </div>
          </div>

          {/* User Sign-in / Sign-out */}
          <div className="pt-2 border-t border-[#E1E6E1]">
            {isAuthenticated ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#F9FAF8] border border-[#E5EBE6]">
                <div>
                  <div className="text-xs font-bold text-[#202923]">{user?.name}</div>
                  <div className="text-[10px] text-[#247343]">{user?.roleLabel}</div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    handleLinkClick();
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-[#DC2626] bg-[#FEE2E2] hover:bg-[#FECACA] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold border border-[#E1E6E1] text-[#202923] bg-[#F9FAF8] hover:bg-[#EAF5EE]"
              >
                <LogIn className="w-3.5 h-3.5 text-[#247343]" />
                <span>Sign In for Authorised Access</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
