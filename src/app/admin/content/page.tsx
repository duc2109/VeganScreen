"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { ADMIN_CONTENT_ITEMS } from "@/lib/mock/admin";
import { AdminContentItem } from "@/lib/mock/types";
import { CheckCircle2, EyeOff, Flag, FileText, Video, MessageSquare } from "lucide-react";

type ContentTab = "all" | "Blog" | "Video" | "Comment";

function StatusBadge({ status }: { status: AdminContentItem["status"] }) {
  if (status === "Published") return <Badge variant="success">Published</Badge>;
  if (status === "Under Review") return <Badge variant="info">Under Review</Badge>;
  return <Badge variant="flagged">Removed</Badge>;
}

function TypeIcon({ type }: { type: AdminContentItem["type"] }) {
  if (type === "Video") return <Video className="w-3.5 h-3.5 text-violet-600" />;
  if (type === "Blog") return <FileText className="w-3.5 h-3.5 text-emerald-600" />;
  return <MessageSquare className="w-3.5 h-3.5 text-blue-600" />;
}

function ContentManagement() {
  const [activeTab, setActiveTab] = useState<ContentTab>("all");
  const [items, setItems] = useState<AdminContentItem[]>([...ADMIN_CONTENT_ITEMS]);

  const tabs: { id: ContentTab; label: string }[] = [
    { id: "all", label: "All Content" },
    { id: "Blog", label: "Blogs" },
    { id: "Video", label: "Videos" },
    { id: "Comment", label: "Comments" },
  ];

  const filtered = activeTab === "all" ? items : items.filter((i) => i.type === activeTab);

  const setStatus = (id: string, status: AdminContentItem["status"]) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === t.id
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-white border border-stone-200 text-stone-600 hover:border-emerald-300 hover:text-stone-900"
            }`}
          >
            {t.label}
            <span className={`ml-2 text-xs ${activeTab === t.id ? "text-emerald-200" : "text-stone-400"}`}>
              {t.id === "all" ? items.length : items.filter((i) => i.type === t.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={[
          { key: "content", label: "Content" },
          { key: "type", label: "Type" },
          { key: "author", label: "Author" },
          { key: "date", label: "Date" },
          { key: "reports", label: "Reports" },
          { key: "status", label: "Status" },
          { key: "actions", label: "Actions" },
        ]}
        rows={filtered.map((item) => ({
          content: (
            <p className="text-sm font-medium text-stone-900 line-clamp-1 max-w-[280px]">
              {item.title}
            </p>
          ),
          type: (
            <span className="flex items-center gap-1.5 text-xs font-medium text-stone-600">
              <TypeIcon type={item.type} />
              {item.type}
            </span>
          ),
          author: <span className="text-xs text-stone-600">{item.author}</span>,
          date: <span className="text-xs text-stone-500">{item.date}</span>,
          reports: (
            <span className={`text-xs font-semibold ${item.reports > 0 ? "text-red-600" : "text-stone-400"}`}>
              {item.reports > 0 ? `⚠ ${item.reports}` : "—"}
            </span>
          ),
          status: <StatusBadge status={item.status} />,
          actions: (
            <div className="flex items-center gap-1">
              {item.status !== "Published" && (
                <button
                  onClick={() => setStatus(item.id, "Published")}
                  title="Approve"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Approve
                </button>
              )}
              {item.status !== "Removed" && (
                <button
                  onClick={() => setStatus(item.id, "Removed")}
                  title="Remove"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <EyeOff className="w-3 h-3" />
                  Remove
                </button>
              )}
              {item.status !== "Under Review" && (
                <button
                  onClick={() => setStatus(item.id, "Under Review")}
                  title="Flag for review"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Flag className="w-3 h-3" />
                  Flag
                </button>
              )}
            </div>
          ),
        }))}
      />
    </div>
  );
}

export default function AdminContentPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Administration"
          title="Content Management"
          subtitle="Review, approve, flag, and remove blogs, videos, and comments."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <ContentManagement />
        )}
      </div>
    </AppShell>
  );
}

