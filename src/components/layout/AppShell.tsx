"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { RightRail } from "./RightRail";
import { Menu, X } from "lucide-react";

export interface AppShellProps {
  children: React.ReactNode;
  showRightRail?: boolean;
  rightRail?: React.ReactNode;
}

export function AppShell({
  children,
  showRightRail = true,
  rightRail,
}: AppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Sticky Header */}
      <Header />

      {/* Mobile Sidebar Floating Trigger (<1024px) */}
      <div className="lg:hidden fixed bottom-5 right-5 z-50">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="w-12 h-12 rounded-full bg-emerald-700 text-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-emerald-800 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Main Container below Header */}
      <div className="flex-1 flex">
        {/* Desktop Sticky Sidebar (>=1024px) */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Drawer (<1024px) */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />
            {/* Drawer */}
            <div className="relative z-50 w-[270px] bg-white h-full shadow-2xl overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main
          className={`flex-1 min-w-0 p-6 md:p-9 flex flex-col ${
            showRightRail ? "xl:flex-row gap-9 justify-center items-start" : "items-center"
          }`}
        >
          {/* Main Content Column */}
          <div
            className={`min-w-0 w-full ${
              showRightRail ? "flex-1 max-w-[1150px]" : "max-w-[1240px]"
            }`}
          >
            {children}
          </div>

          {/* Right Rail (stacks below on screens <1280px if shown) */}
          {showRightRail && (
            <div className="shrink-0 w-full xl:w-[360px]">
              {rightRail || <RightRail />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
