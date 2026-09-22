"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Search } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

export function Header() {
  const router = useRouter();
  const { isGuest, role } = useRole();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 h-[72px] w-full bg-white border-b border-stone-200 flex items-center justify-between">
      {/* Left Cell: 270px wide, left offset 26px */}
      <div className="w-[270px] h-full flex items-center pl-[26px] gap-2.5 shrink-0 border-r border-stone-200 lg:border-r-0">
        <Link href="/" className="flex items-center gap-2.5 select-none group">
          {/* Logo Tile: 40x40, rounded-xl, emerald faint 500->600 gradient */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm flex items-center justify-center text-white">
            <Leaf className="w-5 h-5 text-white" strokeWidth={1.75} />
          </div>

          {/* Wordmark: Fraunces 700 24px */}
          <span className="font-serif font-bold text-2xl tracking-tight leading-none">
            <span className="text-stone-900">Veggie</span>
            <span className="text-emerald-700">Hub</span>
          </span>
        </Link>
      </div>

      {/* Middle: Search Pill (646x44, left aligned at x=277) */}
      <div className="flex-1 max-w-[646px] ml-2 mr-4 hidden md:block">
        <div className="w-full h-11 bg-stone-50 border border-stone-200 rounded-full px-4 flex items-center gap-3 focus-within:border-emerald-600 focus-within:bg-white transition-all shadow-xs">
          <Search className="w-[18px] h-[18px] text-stone-400 shrink-0" strokeWidth={1.75} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search recipes, threads, restaurants…"
            className="w-full bg-transparent text-base text-stone-900 placeholder:text-stone-400 outline-none"
          />
          <kbd className="h-5 px-1.5 rounded-md bg-white border border-stone-200 text-[11px] font-medium text-stone-400 flex items-center justify-center shrink-0 shadow-xs select-none">
            ↵ Enter
          </kbd>
        </div>
      </div>

      {/* Right Cluster: right offset 28px, gap 24 */}
      <div className="flex items-center gap-5 pr-7 shrink-0 ml-auto md:ml-0">
        {isGuest ? (
          <>
            <Link
              href="/login"
              className="text-base font-medium text-stone-800 hover:text-stone-950 transition-colors cursor-pointer"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="h-9 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              Join free
            </Link>
          </>
        ) : (
          <Link
            href="/me"
            className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-stone-50 transition-colors group cursor-pointer"
          >
            <Avatar initials={role === "Admin" ? "AD" : "LN"} verified={true} />
            <div className="hidden sm:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
                  {role === "Admin" ? "Admin User" : "Linh Nguyen"}
                </span>
                <Badge
                  variant={role === "Admin" ? "flagged" : "success"}
                  className="text-[10px] px-1.5 py-0"
                >
                  {role}
                </Badge>
              </div>
              <span className="text-xs text-stone-500">
                {role === "Admin" ? "System Operator" : "@linh.greens"}
              </span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
