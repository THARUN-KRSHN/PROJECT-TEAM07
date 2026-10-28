"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/authContext";
import Image from "next/image";

const PUBLIC_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Risk Map", href: "/map" },
  { label: "Demo Presentation", href: "/demo-presentation" },
  { label: "Safety Guidelines", href: "/safety" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [researchDropdownOpen, setResearchDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setResearchDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#E1E6E1] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.5rem] flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          onClick={handleLinkClick}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#247343] rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-[#fff8df] border border-[#f2c94c]/40 flex items-center justify-center overflow-hidden transition-colors">
            <Image src="/logo.png" alt="" width={36} height={36} className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#202923] flex items-center">
              Giri<span className="text-[#247343]">Raksha</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-[#526056] font-medium -mt-0.5">
              Kerala Landslide Awareness
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {PUBLIC_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-full text-sm font-medium transition-colors",
                  isActive
                      ? "bg-[#247343] text-white font-semibold"
                    : "text-[#526056] hover:text-[#202923] hover:bg-[#F3F5F3]"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* If Authenticated: Authorized Research Dropdown */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setResearchDropdownOpen(!researchDropdownOpen)}
                className={cn(
                  "px-3.5 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors",
                  pathname.startsWith("/insights") ||
                    pathname.startsWith("/pipeline") ||
                    pathname.startsWith("/reports") ||
                    pathname.startsWith("/research")
                    ? "bg-[#247343] text-white font-semibold"
                    : "text-[#526056] hover:text-[#202923] hover:bg-[#F3F5F3]"
                )}
              >
                <span>Analytics Suite</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {researchDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#E1E6E1] rounded-lg shadow-lg py-1.5 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#526056] border-b border-[#E1E6E1]">
                    Authorised Features
                  </div>
                  <Link
                    href="/insights"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-[#202923] hover:bg-[#F3F5F3] hover:text-[#247343]"
                  >
                    <BarChart2 className="w-4 h-4 text-[#247343]" />
                    <span>SHAP Factor Attribution</span>
                  </Link>
                  <Link
                    href="/reports"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-[#202923] hover:bg-[#F3F5F3] hover:text-[#247343]"
                  >
                    <FileText className="w-4 h-4 text-[#247343]" />
                    <span>Downloadable Risk Reports</span>
                  </Link>
                  <Link
                    href="/pipeline"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-[#202923] hover:bg-[#F3F5F3] hover:text-[#247343]"
                  >
                    <Layers className="w-4 h-4 text-[#247343]" />
                    <span>Data Pipeline & Architecture</span>
                  </Link>
                  <Link
                    href="/research"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-[#202923] hover:bg-[#F3F5F3] hover:text-[#247343]"
                  >
                    <Shield className="w-4 h-4 text-[#247343]" />
                    <span>Model Evaluation & Benchmarks</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#247343] hover:bg-[#1E5E37] text-white transition-colors shadow-sm"
          >
            <MapPin className="w-4 h-4" />
            <span>Explore Risk Map</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 border-l border-[#E1E6E1] pl-3">
              <div className="text-right">
                <div className="text-xs font-semibold text-[#202923]">{user?.name}</div>
                <div className="text-[10px] text-[#247343] font-medium">{user?.roleLabel}</div>
              </div>
              <button
                onClick={logout}
                title="Sign out"
                className="p-2 rounded-md text-[#526056] hover:text-[#DC2626] hover:bg-[#F3F5F3] transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium border border-[#E1E6E1] text-[#202923] hover:bg-[#F3F5F3] hover:border-[#247343] transition-colors"
            >
              <LogIn className="w-4 h-4 text-[#247343]" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/map"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#247343] text-white"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Map</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-md bg-[#F3F5F3] border border-[#E1E6E1] text-[#202923] hover:bg-[#E1E6E1] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E1E6E1] bg-white px-4 py-4 space-y-2">
          {PUBLIC_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#F3F5F3] text-[#247343] font-semibold"
                    : "text-[#526056] hover:text-[#202923] hover:bg-[#F3F5F3]"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {isAuthenticated ? (
            <div className="pt-2 border-t border-[#E1E6E1] space-y-2">
              <div className="px-3 py-1 text-xs text-[#526056]">
                Signed in as: <strong className="text-[#202923]">{user?.name}</strong> ({user?.roleLabel})
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <Link
                  href="/insights"
                  onClick={handleLinkClick}
                  className="p-2 rounded bg-[#F3F5F3] text-[#202923] font-medium"
                >
                  SHAP Analytics
                </Link>
                <Link
                  href="/reports"
                  onClick={handleLinkClick}
                  className="p-2 rounded bg-[#F3F5F3] text-[#202923] font-medium"
                >
                  Reports
                </Link>
                <Link
                  href="/pipeline"
                  onClick={handleLinkClick}
                  className="p-2 rounded bg-[#F3F5F3] text-[#202923] font-medium"
                >
                  Pipeline
                </Link>
                <Link
                  href="/research"
                  onClick={handleLinkClick}
                  className="p-2 rounded bg-[#F3F5F3] text-[#202923] font-medium"
                >
                  Research
                </Link>
              </div>
              <button
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium text-[#DC2626] bg-[#FDF2F2] border border-[#FCA5A5]"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-[#E1E6E1]">
              <Link
                href="/signin"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium border border-[#E1E6E1] text-[#202923] bg-[#F3F5F3]"
              >
                <LogIn className="w-4 h-4 text-[#247343]" />
                <span>Sign In for Authorised Access</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
