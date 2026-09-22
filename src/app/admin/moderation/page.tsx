"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { MODERATION_QUEUE } from "@/lib/mock/admin";
import { ModerationItem } from "@/lib/mock/types";
import {
  ShieldCheck,
  AlertTriangle,
  Trash2,
  ArrowUpRight,
  CheckCircle2,
  Info,
} from "lucide-react";

const REASON_COLORS: Record<string, string> = {
  "Dangerous claim": "bg-red-100 text-red-700 border-red-200",
  Misinformation: "bg-orange-100 text-orange-700 border-orange-200",
  Spam: "bg-amber-100 text-amber-700 border-amber-200",
  Offensive: "bg-purple-100 text-purple-700 border-purple-200",
  Inappropriate: "bg-pink-100 text-pink-700 border-pink-200",
};

function ConfidenceMeter({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = pct >= 95 ? "bg-red-500" : pct >= 85 ? "bg-amber-500" : "bg-stone-400";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-stone-700 shrink-0">{pct}%</span>
    </div>
  );
}

function ModerationCard({
  item,
  onApprove,
  onRemove,
  onEscalate,
}: {
  item: ModerationItem;
  onApprove: () => void;
  onRemove: () => void;
  onEscalate: () => void;
}) {
  const statusColor = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Removed: "bg-red-50 text-red-700 border-red-200",
    Escalated: "bg-violet-50 text-violet-700 border-violet-200",
  }[item.status];

  return (
    <Card className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-stone-500">{item.contentType}</span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-500">{item.author}</span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-400">{item.reportedAt}</span>
          </div>
        </div>
        <span
          className={`shrink-0 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusColor}`}
        >
          {item.status}
        </span>
      </div>

      {/* Snippet */}
      <blockquote className="bg-red-50 border-l-4 border-red-300 px-4 py-3 rounded-r-xl">
        <p className="text-sm text-red-900 leading-relaxed italic">&ldquo;{item.snippet}&rdquo;</p>
      </blockquote>

      {/* Flag reasons */}
      <div className="flex flex-wrap gap-1.5">
        {item.flagReasons.map((r) => (
          <span
            key={r}
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${REASON_COLORS[r] ?? "bg-stone-100 text-stone-600 border-stone-200"}`}
          >
            {r}
          </span>
        ))}
      </div>

      {/* AI confidence */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-stone-500 font-medium">AI Confidence</span>
        </div>
        <ConfidenceMeter value={item.aiConfidence} />
      </div>

      {/* Actions */}
      {item.status === "Pending" && (
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={onApprove}
            className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approve content
          </button>
          <button
            onClick={onRemove}
            className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </button>
          <button
            onClick={onEscalate}
            className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Escalate
          </button>
        </div>
      )}
    </Card>
  );
}

function ModerationContent() {
  const [items, setItems] = useState<ModerationItem[]>([...MODERATION_QUEUE]);
  const [confirmModal, setConfirmModal] = useState<{ itemId: string; action: "Remove" | "Escalate" } | null>(null);

  const handleAction = (itemId: string, status: ModerationItem["status"]) => {
    setItems((prev) =>
      prev.map((m) => (m.id === itemId ? { ...m, status } : m))
    );
    setConfirmModal(null);
  };

  const pending = items.filter((i) => i.status === "Pending");
  const resolved = items.filter((i) => i.status !== "Pending");

  return (
    <div className="space-y-8">
      {/* Policy banner */}
      <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 rounded-[14px] px-5 py-3.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <p className="text-sm text-stone-700">
          <span className="font-semibold text-stone-900">AI flag → Human review:</span>{" "}
          Nothing is removed without an admin action. All AI flags require manual confirmation.
        </p>
      </div>

      {/* Pending queue */}
      <div className="space-y-4">
        <h3 className="font-semibold text-stone-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          Pending Review
          {pending.length > 0 && (
            <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
              {pending.length} urgent
            </span>
          )}
        </h3>
        {pending.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-[20px] p-10 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="font-semibold text-stone-800">Queue is clear</p>
            <p className="text-sm text-stone-500 mt-1">All flagged content has been reviewed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {pending.map((item) => (
              <ModerationCard
                key={item.id}
                item={item}
                onApprove={() => handleAction(item.id, "Approved")}
                onRemove={() => setConfirmModal({ itemId: item.id, action: "Remove" })}
                onEscalate={() => setConfirmModal({ itemId: item.id, action: "Escalate" })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Resolved items */}
      {resolved.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-stone-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-stone-500" />
            Resolved
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {resolved.map((item) => (
              <ModerationCard
                key={item.id}
                item={item}
                onApprove={() => {}}
                onRemove={() => {}}
                onEscalate={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      {/* Confirmation modal */}
      <Modal
        isOpen={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        title={confirmModal?.action === "Remove" ? "Confirm removal" : "Escalate for review"}
      >
        <div className="space-y-4">
          <p className="text-base text-stone-700">
            {confirmModal?.action === "Remove"
              ? "This will permanently remove the content from VeggieHub. This action can be reversed by an admin from the Content management page."
              : "This will flag the item for senior admin review. The content remains visible until a decision is made."}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() =>
                confirmModal &&
                handleAction(
                  confirmModal.itemId,
                  confirmModal.action === "Remove" ? "Removed" : "Escalated"
                )
              }
              className={`flex-1 h-11 rounded-xl font-semibold text-white transition-colors cursor-pointer ${
                confirmModal?.action === "Remove"
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-violet-700 hover:bg-violet-800"
              }`}
            >
              {confirmModal?.action === "Remove" ? "Yes, remove" : "Yes, escalate"}
            </button>
            <button
              onClick={() => setConfirmModal(null)}
              className="h-11 px-5 rounded-xl bg-stone-100 text-stone-700 font-semibold hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function AdminModerationPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Administration"
          title="Content Moderation"
          subtitle="AI-flagged content requiring human review and decision."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <ModerationContent />
        )}
      </div>
    </AppShell>
  );
}

