"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import { DataTable } from "@/components/ui/Table";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { AI_MODELS } from "@/lib/mock/admin";
import { AIModelMetric } from "@/lib/mock/types";
import {
  Sparkles,
  Activity,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Settings2,
} from "lucide-react";

const AI_LOGS = [
  { id: "l1", model: "Recommendation Engine", event: "Accuracy threshold met", level: "info", time: "2 min ago" },
  { id: "l2", model: "Content Moderation", event: "Override mode activated by Admin", level: "warn", time: "8 min ago" },
  { id: "l3", model: "Nutrition Chatbot", event: "Query volume spike: +340% in last hour", level: "warn", time: "22 min ago" },
  { id: "l4", model: "Recommendation Engine", event: "Embedding model cache refreshed", level: "info", time: "1 hr ago" },
  { id: "l5", model: "Content Moderation", event: "Flagged post mod3 with 0.92 confidence", level: "info", time: "1 hr ago" },
  { id: "l6", model: "Nutrition Chatbot", event: "Response latency degraded: 480ms avg", level: "error", time: "2 hr ago" },
];

function StatusDot({ status }: { status: AIModelMetric["status"] }) {
  const colors = {
    Optimal: "bg-emerald-500",
    Degraded: "bg-amber-500 animate-pulse",
    Maintenance: "bg-red-500 animate-pulse",
  };
  return <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${colors[status]}`} />;
}

function AccuracyBar({ value }: { value: number }) {
  const color = value >= 96 ? "bg-emerald-500" : value >= 90 ? "bg-amber-400" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-bold text-stone-800 w-12 text-right">{value}%</span>
    </div>
  );
}

function AIContent() {
  const [models, setModels] = useState<AIModelMetric[]>([...AI_MODELS]);

  const toggleOverride = (id: string) => {
    setModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, overrideMode: !m.overrideMode } : m))
    );
  };

  return (
    <div className="space-y-8">
      {/* Model cards */}
      <div>
        <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          AI Model Overview
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {models.map((m) => (
            <Card key={m.id} className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusDot status={m.status} />
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        m.status === "Optimal"
                          ? "bg-emerald-50 text-emerald-700"
                          : m.status === "Degraded"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-stone-900 leading-snug">
                    {m.name}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">{m.version}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-stone-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Accuracy
                    </span>
                  </div>
                  <AccuracyBar value={m.accuracy} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-stone-50 rounded-xl px-3 py-2">
                    <div className="flex items-center gap-1 text-xs text-stone-500 mb-0.5">
                      <Clock className="w-3 h-3" />
                      Latency
                    </div>
                    <p className="font-semibold text-stone-900 text-sm">{m.latencyMs}ms</p>
                  </div>
                  <div className="bg-stone-50 rounded-xl px-3 py-2">
                    <div className="flex items-center gap-1 text-xs text-stone-500 mb-0.5">
                      <Zap className="w-3 h-3" />
                      Daily queries
                    </div>
                    <p className="font-semibold text-stone-900 text-sm">
                      {(m.dailyQueries / 1000).toFixed(1)}K
                    </p>
                  </div>
                </div>
              </div>

              {/* Override toggle */}
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-stone-700">Override Mode</p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {m.overrideMode ? "Flags require manual review" : "Automatic actions enabled"}
                    </p>
                  </div>
                  <Toggle
                    checked={m.overrideMode}
                    onChange={() => toggleOverride(m.id)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Sensitivity controls */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Settings2 className="w-4 h-4 text-stone-600" />
          <h3 className="font-semibold text-stone-800">Global Sensitivity Controls</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { label: "Spam detection threshold", value: 85, color: "bg-blue-500" },
            { label: "Dangerous claim sensitivity", value: 92, color: "bg-red-500" },
            { label: "Misinformation confidence cutoff", value: 88, color: "bg-amber-500" },
          ].map((ctrl) => (
            <div key={ctrl.label}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-stone-600">{ctrl.label}</label>
                <span className="text-xs font-bold text-stone-800">{ctrl.value}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                defaultValue={ctrl.value}
                className="w-full h-1.5 accent-emerald-600 cursor-pointer rounded-full"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Logs table */}
      <div className="space-y-3">
        <h3 className="font-semibold text-stone-800 flex items-center gap-2">
          <Activity className="w-4 h-4 text-stone-600" />
          Recent Model Logs
        </h3>
        <DataTable
          columns={[
            { key: "level", label: "Level" },
            { key: "model", label: "Model" },
            { key: "event", label: "Event" },
            { key: "time", label: "Time" },
          ]}
          rows={AI_LOGS.map((log) => ({
            level: (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  log.level === "info"
                    ? "bg-stone-100 text-stone-600"
                    : log.level === "warn"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {log.level === "info" ? "INFO" : log.level === "warn" ? "WARN" : "ERROR"}
              </span>
            ),
            model: (
              <span className="text-xs font-medium text-stone-600 truncate max-w-[160px] block">
                {log.model}
              </span>
            ),
            event: (
              <span className="text-sm text-stone-800 flex items-center gap-1.5">
                {log.level === "error" && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                {log.event}
              </span>
            ),
            time: <span className="text-xs text-stone-400">{log.time}</span>,
          }))}
        />
      </div>
    </div>
  );
}

export default function AdminAIPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Administration"
          title="AI Model Management"
          subtitle="Monitor model accuracy, latency, query volume, and configure override controls."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <AIContent />
        )}
      </div>
    </AppShell>
  );
}

