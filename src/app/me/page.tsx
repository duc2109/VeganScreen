"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { VIDEO_RECIPES } from "@/lib/mock/videos";
import { FORUM_POSTS } from "@/lib/mock/forum";
import Link from "next/link";
import {
  Video,
  FileText,
  MessageSquare,
  Upload,
  Settings,
  Pencil,
  Trash2,
  CheckCircle2,
  Users,
  Star,
} from "lucide-react";

const MY_VIDEOS = VIDEO_RECIPES.slice(0, 4).map((v) => ({
  id: v.id,
  title: v.title,
  views: v.views,
  rating: v.rating,
  status: "Published" as const,
  date: "Sep 15, 2026",
}));

const MY_POSTS = FORUM_POSTS.slice(0, 3).map((p) => ({
  id: p.id,
  title: p.title,
  votes: p.votes,
  comments: p.commentsCount,
  status: "Published" as const,
  date: "Sep 14, 2026",
}));

const MY_COMMENTS = [
  { id: "c1", content: "This tofu method changed my life!", on: "Crispy Sesame Garlic Tofu", date: "Sep 17, 2026", votes: 24 },
  { id: "c2", content: "Do you need a high-speed blender for this?", on: "Green Goddess Smoothie Bowl", date: "Sep 12, 2026", votes: 8 },
  { id: "c3", content: "I swapped coconut aminos for soy and it still tastes great.", on: "Miso Glazed Portobello", date: "Sep 10, 2026", votes: 15 },
];

type TabId = "videos" | "posts" | "comments";

function TabButton({ id, label, icon, active, onClick }: {
  id: TabId; label: string; icon: React.ReactNode; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
        active
          ? "bg-emerald-700 text-white shadow-sm"
          : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ProfileContent() {
  const [activeTab, setActiveTab] = useState<TabId>("videos");
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const handleDelete = (id: string) => {
    if (confirm("Remove this item from your profile?")) {
      setDeletedIds((p) => [...p, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile card */}
      <div className="bg-white border border-stone-200 rounded-[20px] p-6 flex flex-wrap gap-6 items-center">
        <div className="relative">
          <Avatar initials="YU" size={72} />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-serif font-bold text-2xl text-stone-900">Your Name</h2>
            <Badge variant="success">Member</Badge>
          </div>
          <p className="text-stone-500 text-sm mt-0.5">@yourhandle · Joined Jan 2026</p>
          <p className="text-stone-600 text-sm mt-2">Plant-based enthusiast from Ho Chi Minh City 🌿 Sharing veggie recipes and nutrition tips.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/me/upload"
            className="flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Recipe
          </Link>
          <Link
            href="/me/settings"
            className="flex items-center gap-2 h-10 px-4 rounded-xl bg-stone-100 text-stone-700 text-sm font-semibold hover:bg-stone-200 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Recipes Published"
          value="4"
          subtext="+1 this month"
          icon={<Video className="w-4 h-4" />}
        />
        <StatCard
          label="Community Posts"
          value="3"
          subtext="3 active threads"
          icon={<FileText className="w-4 h-4" />}
        />
        <StatCard
          label="Total Views"
          value="284K"
          subtext="+12% this month"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          label="Avg. Rating"
          value="4.8★"
          subtext="Across all recipes"
          icon={<Star className="w-4 h-4" />}
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <TabButton
          id="videos" label="My Recipes" icon={<Video className="w-4 h-4" />}
          active={activeTab === "videos"} onClick={() => setActiveTab("videos")}
        />
        <TabButton
          id="posts" label="My Posts" icon={<FileText className="w-4 h-4" />}
          active={activeTab === "posts"} onClick={() => setActiveTab("posts")}
        />
        <TabButton
          id="comments" label="My Comments" icon={<MessageSquare className="w-4 h-4" />}
          active={activeTab === "comments"} onClick={() => setActiveTab("comments")}
        />
      </div>

      {/* Videos tab */}
      {activeTab === "videos" && (
        <DataTable
          columns={[
            { key: "title", label: "Recipe" },
            { key: "views", label: "Views" },
            { key: "rating", label: "Rating" },
            { key: "status", label: "Status" },
            { key: "actions", label: "" },
          ]}
          rows={MY_VIDEOS
            .filter((v) => !deletedIds.includes(v.id))
            .map((v) => ({
              title: (
                <Link href={`/videos/${v.id}`} className="font-medium text-stone-900 hover:text-emerald-700 transition-colors line-clamp-1">
                  {v.title}
                </Link>
              ),
              views: <span className="text-sm text-stone-600">{v.views}</span>,
              rating: <span className="text-sm font-semibold text-amber-600">{v.rating}★</span>,
              status: <Badge variant="success">{v.status}</Badge>,
              actions: (
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition-colors cursor-pointer">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ),
            }))}
        />
      )}

      {/* Posts tab */}
      {activeTab === "posts" && (
        <DataTable
          columns={[
            { key: "title", label: "Post" },
            { key: "votes", label: "Votes" },
            { key: "comments", label: "Replies" },
            { key: "status", label: "Status" },
            { key: "actions", label: "" },
          ]}
          rows={MY_POSTS
            .filter((p) => !deletedIds.includes(p.id))
            .map((p) => ({
              title: (
                <Link href={`/forum/${p.id}`} className="font-medium text-stone-900 hover:text-emerald-700 transition-colors line-clamp-1">
                  {p.title}
                </Link>
              ),
              votes: <span className="text-sm text-stone-600">▲ {p.votes}</span>,
              comments: <span className="text-sm text-stone-600">{p.comments}</span>,
              status: <Badge variant="success">{p.status}</Badge>,
              actions: (
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition-colors cursor-pointer">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ),
            }))}
        />
      )}

      {/* Comments tab */}
      {activeTab === "comments" && (
        <DataTable
          columns={[
            { key: "content", label: "Comment" },
            { key: "on", label: "On" },
            { key: "votes", label: "Votes" },
            { key: "date", label: "Date" },
            { key: "actions", label: "" },
          ]}
          rows={MY_COMMENTS
            .filter((c) => !deletedIds.includes(c.id))
            .map((c) => ({
              content: <span className="text-sm text-stone-800 line-clamp-1">{c.content}</span>,
              on: <span className="text-xs text-emerald-700 font-medium line-clamp-1">{c.on}</span>,
              votes: <span className="text-sm text-stone-600">▲ {c.votes}</span>,
              date: <span className="text-xs text-stone-500">{c.date}</span>,
              actions: (
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              ),
            }))}
        />
      )}
    </div>
  );
}

export default function MePage() {
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Your Account"
          title="My Profile"
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : (
          <ProfileContent />
        )}
      </div>
    </AppShell>
  );
}
