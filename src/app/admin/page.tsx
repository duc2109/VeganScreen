"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { ADMIN_STATS, AI_MODELS, MODERATION_QUEUE } from "@/lib/mock/admin";
import {
  Users,
  Video,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const STAT_ICONS = [
  <Users className="w-4 h-4" key="users" />,
  <Video className="w-4 h-4" key="video" />,
  <Sparkles className="w-4 h-4" key="sparkles" />,
  <AlertTriangle className="w-4 h-4" key="alert" />,
];

const RECENT_ACTIVITY = [
  { id: "a1", text: "Linh Nguyen published a new recipe video", time: "8 min ago", icon: <Video className="w-3.5 h-3.5" />, color: "text-emerald-600" },
  { id: "a2", text: "AI flagged 1 post for Dangerous claim", time: "18 min ago", icon: <AlertTriangle className="w-3.5 h-3.5" />, color: "text-red-600" },
  { id: "a3", text: "24 new members joined this week", time: "1 hr ago", icon: <Users className="w-3.5 h-3.5" />, color: "text-blue-600" },
  { id: "a4", text: "Content moderation model updated to v1.9", time: "3 hr ago", icon: <Activity className="w-3.5 h-3.5" />, color: "text-violet-600" },
  { id: "a5", text: "Category 'High-Protein Meals' hit 480 recipes", time: "Yesterday", icon: <TrendingUp className="w-3.5 h-3.5" />, color: "text-amber-600" },
];

function AdminContent() {
  const pendingMod = MODERATION_QUEUE.filter((m) => m.status === "Pending");

  return (
    <div className="space-y-8">
      {/* Flagged urgent banner */}
      {pendingMod.length > 0 && (
        <div className="flex items-center gap-4 bg-red-50 border border-red-200 rounded-[16px] px-5 py-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-red-900 text-sm">
              {pendingMod.length} items awaiting moderation review
            </p>
            <p className="text-xs text-red-700 mt-0.5">
              AI-flagged content requires human approval before any action is taken.
            </p>
          </div>
          <Link
            href="/admin/moderation"
            className="shrink-0 h-9 px-4 rounded-xl bg-red-700 text-white text-sm font-semibold hover:bg-red-800 transition-colors"
          >
            Review queue →
          </Link>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ADMIN_STATS.map((s, i) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            subtext={s.change}
            icon={STAT_ICONS[i]}
            badge={
              !s.positive ? (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
              ) : undefined
            }
          />
        ))}
      </div>

      {/* AI accuracy + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI model summary */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="font-semibold text-stone-800">AI Model Health</h3>
            <Link href="/admin/ai" className="ml-auto text-xs text-emerald-700 font-semibold hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {AI_MODELS.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-900 truncate">{m.name}</p>
                  <p className="text-xs text-stone-500">{m.version} · {m.latencyMs}ms avg</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-700">{m.accuracy}%</p>
                    <p className="text-xs text-stone-500">accuracy</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${m.status === "Optimal" ? "bg-emerald-500" : m.status === "Degraded" ? "bg-amber-500" : "bg-red-500"}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent activity */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-stone-600" />
            <h3 className="font-semibold text-stone-800">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className={`mt-0.5 shrink-0 ${a.color}`}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-800 leading-snug">{a.text}</p>
                  <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick links */}
      <div>
        <h3 className="font-semibold text-stone-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: "Members", href: "/admin/members", icon: <Users className="w-5 h-5" /> },
            { label: "Content", href: "/admin/content", icon: <Video className="w-5 h-5" /> },
            { label: "Categories", href: "/admin/categories", icon: <ShieldCheck className="w-5 h-5" /> },
            { label: "AI Models", href: "/admin/ai", icon: <Sparkles className="w-5 h-5" /> },
            { label: "Moderation", href: "/admin/moderation", icon: <AlertTriangle className="w-5 h-5" /> },
          ].map((qa) => (
            <Link
              key={qa.href}
              href={qa.href}
              className="flex flex-col items-center gap-2 p-4 bg-white border border-stone-200 rounded-[16px] hover:border-emerald-400 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 flex items-center justify-center transition-colors">
                {qa.icon}
              </div>
              <span className="text-xs font-semibold text-stone-700 group-hover:text-emerald-700 transition-colors">
                {qa.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* AI policy notice */}
      <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-[14px] px-5 py-3.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <p className="text-sm text-stone-600">
          <span className="font-semibold text-stone-800">AI flag → Human review policy active.</span>{" "}
          No content is automatically removed. Every AI decision requires an admin action.
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Administration"
          title="Admin Dashboard"
          action={
            <Badge variant="info" className="text-sm px-3 py-1">
              Admin Panel
            </Badge>
          }
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <AdminContent />
        )}
      </div>
    </AppShell>
  );
}
