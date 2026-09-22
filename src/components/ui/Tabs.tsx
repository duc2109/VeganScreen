"use client";

import React from "react";

export interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  badge?: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "pills" | "underline";
  className?: string;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "pills",
  className = "",
}: TabsProps) {
  if (variant === "underline") {
    return (
      <div className={`flex border-b border-stone-200 gap-6 select-none ${className}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`pb-3 text-base font-semibold transition-all relative cursor-pointer inline-flex items-center gap-2 ${
                isActive
                  ? "text-emerald-800"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    isActive
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 select-none ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`h-10 px-5 rounded-full text-base font-medium transition-colors cursor-pointer inline-flex items-center gap-2 ${
              isActive
                ? "bg-emerald-700 text-white font-semibold shadow-xs"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  isActive
                    ? "bg-emerald-800 text-white"
                    : "bg-stone-100 text-stone-600"
                }`}
              >
                {tab.count}
              </span>
            )}
            {tab.badge && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-100 text-amber-800">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
