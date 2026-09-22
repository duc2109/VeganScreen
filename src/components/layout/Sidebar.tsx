"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  CirclePlay,
  MessagesSquare,
  MapPin,
  CalendarDays,
  Sparkles,
  Lock,
  LayoutDashboard,
  ShieldAlert,
  Users,
  FileText,
  Tag,
  Cpu,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useRole } from "@/context/RoleContext";
import { DIET_OPTIONS } from "@/lib/mock/data";

export function Sidebar() {
  const pathname = usePathname();
  const { role, setRole, isGuest, isAdmin } = useRole();

  // Diet filter state - "vegan" active by default matching the reference
  const [selectedDiets, setSelectedDiets] = useState<string[]>(["vegan"]);

  const toggleDiet = (id: string) => {
    setSelectedDiets((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const navItems = [
    {
      label: "Discover",
      href: "/",
      icon: Compass,
      active: pathname === "/",
    },
    {
      label: "Video recipes",
      href: "/videos",
      icon: CirclePlay,
      active: pathname === "/videos" || pathname.startsWith("/videos/"),
    },
    {
      label: "Forum",
      href: "/forum",
      icon: MessagesSquare,
      active: pathname === "/forum" || pathname.startsWith("/forum/"),
    },
    {
      label: "Nearby shops",
      href: "/shops",
      icon: MapPin,
      active: pathname === "/shops" || pathname.startsWith("/shops/"),
    },
    {
      label: "Meal planner",
      href: "/planner",
      icon: CalendarDays,
      active: pathname === "/planner" || pathname.startsWith("/planner/"),
      lock: isGuest,
    },
    {
      label: "AI nutritionist",
      href: "/ai",
      icon: Sparkles,
      active: pathname === "/ai" || pathname.startsWith("/ai/"),
      badge: "Beta",
    },
  ];

  const adminNavItems = [
    {
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      label: "Moderation",
      href: "/admin/moderation",
      icon: ShieldAlert,
      active: pathname.startsWith("/admin/moderation"),
      flagCount: "3",
    },
    {
      label: "Members",
      href: "/admin/members",
      icon: Users,
      active: pathname.startsWith("/admin/members"),
    },
    {
      label: "Content",
      href: "/admin/content",
      icon: FileText,
      active: pathname.startsWith("/admin/content"),
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: Tag,
      active: pathname.startsWith("/admin/categories"),
    },
    {
      label: "AI Models",
      href: "/admin/ai",
      icon: Cpu,
      active: pathname.startsWith("/admin/ai"),
    },
  ];

  return (
    <aside className="sticky top-[72px] w-[270px] h-[calc(100vh-72px)] overflow-y-auto bg-white border-r border-stone-200 p-3 flex flex-col justify-between shrink-0 select-none scrollbar-thin">
      <div>
        {/* Navigation Items */}
        <nav className="flex flex-col space-y-[2.5px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`h-10 px-4 rounded-xl flex items-center justify-between text-base font-medium transition-colors ${
                  item.active
                    ? "bg-emerald-50 text-emerald-800 font-semibold"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      item.active ? "text-emerald-700" : "text-stone-400"
                    }`}
                    strokeWidth={1.75}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {/* Right Extras */}
                {item.lock && (
                  <Lock className="w-4 h-4 text-stone-300 shrink-0 ml-2" />
                )}
                {item.badge && (
                  <Badge variant="beta" className="ml-2 shrink-0">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Section: ADMIN (visible if Admin role) */}
        {isAdmin && (
          <div className="mt-6 pt-5 border-t border-stone-100">
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-400 px-1 mb-2.5">
              ADMIN
            </h3>
            <nav className="flex flex-col space-y-[2px]">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`h-9 px-3.5 rounded-xl flex items-center justify-between text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-emerald-50 text-emerald-800 font-semibold"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          item.active ? "text-emerald-700" : "text-stone-400"
                        }`}
                        strokeWidth={1.75}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.flagCount && (
                      <Badge variant="flagged" className="text-[11px] px-2 py-0">
                        {item.flagCount}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Section: BROWSE BY DIET */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-400 px-1 mb-3">
            BROWSE BY DIET
          </h3>
          <div className="flex flex-wrap gap-2">
            {DIET_OPTIONS.map((diet) => (
              <Chip
                key={diet.id}
                variant="diet"
                active={selectedDiets.includes(diet.id)}
                onClick={() => toggleDiet(diet.id)}
              >
                {diet.label}
              </Chip>
            ))}
          </div>
        </div>

        {/* Promo Card (Guest Only) */}
        {isGuest && (
          <div className="mt-6 p-5 rounded-2xl bg-emerald-800 relative overflow-hidden text-white shadow-sm">
            {/* Decor Circles */}
            <div className="w-28 h-28 rounded-full bg-emerald-700 absolute -top-6 -right-6 pointer-events-none" />
            <div className="w-24 h-24 rounded-full bg-amber-400/20 absolute -bottom-6 -right-6 pointer-events-none" />

            <div className="relative z-10">
              <Sparkles className="w-[22px] h-[22px] text-amber-400" />
              <h4 className="mt-3 font-serif font-bold text-xl leading-[1.25] text-white">
                Plan your week, save recipes, ask the AI.
              </h4>
              <p className="mt-2 text-sm text-emerald-200/85">
                Free forever for the community.
              </p>
              <Link
                href="/register"
                className="mt-4 w-full h-10 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-base font-medium transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center"
              >
                Create free account
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Dev Switcher: PREVIEW AS (Bottom) */}
      <div className="mt-6 rounded-xl border border-dashed border-stone-300 p-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
          PREVIEW AS
        </div>
        <SegmentedControl value={role} onChange={setRole} />
      </div>
    </aside>
  );
}
