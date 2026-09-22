"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Clock,
  Flame,
  ChefHat,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Lock,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { DurationChip } from "@/components/ui/DurationChip";
import { VideoCard } from "@/components/ui/VideoCard";
import { useRole } from "@/context/RoleContext";
import { VideoRecipe, CommentItem } from "@/lib/mock/types";
import { VIDEO_RECIPES, FORUM_POSTS } from "@/lib/mock/data";

export function VideoDetailClient({ video }: { video: VideoRecipe }) {
  const { isGuest, role } = useRole();
  const [activeTab, setActiveTab] = useState("summary");
  const [isPlaying, setIsPlaying] = useState(false);
  const [comments, setComments] = useState<CommentItem[]>(video.comments);
  const [newCommentText, setNewCommentText] = useState("");
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleVote = (commentId: string, direction: "up" | "down") => {
    if (isGuest) return;
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const delta = direction === "up" ? 1 : -1;
          return { ...c, votes: c.votes + delta };
        }
        return c;
      })
    );
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || isGuest) return;

    const newComment: CommentItem = {
      id: `new-${Date.now()}`,
      author: role === "Admin" ? "Admin User" : "Linh Nguyen",
      authorInitials: role === "Admin" ? "AD" : "LN",
      verified: true,
      content: newCommentText.trim(),
      timestamp: "Just now",
      votes: 1,
    };

    setComments([newComment, ...comments]);
    setNewCommentText("");
  };

  const relatedVideos = VIDEO_RECIPES.filter((v) => v.id !== video.id).slice(0, 2);

  const customRightRail = (
    <aside className="w-full space-y-6 select-none">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight">
            Related video recipes
          </h3>
          <Link
            href="/videos"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider"
          >
            All
          </Link>
        </div>
        <div className="space-y-4">
          {relatedVideos.map((rVideo) => (
            <Link key={rVideo.id} href={`/videos/${rVideo.id}`} className="block">
              <VideoCard
                title={rVideo.title}
                duration={rVideo.duration}
                author={rVideo.author}
                views={rVideo.views}
                imageUrl={rVideo.image}
              />
            </Link>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight">
            Community discussions
          </h3>
          <Link
            href="/forum"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider"
          >
            Forum
          </Link>
        </div>
        <div className="space-y-3 divide-y divide-stone-100">
          {FORUM_POSTS.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/forum/${post.id}`}
              className="pt-2.5 first:pt-0 block group"
            >
              <h4 className="text-sm font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="mt-1 text-xs text-stone-500">
                {post.author} · {post.commentsCount} comments
              </p>
            </Link>
          ))}
        </div>
      </Card>
    </aside>
  );

  return (
    <AppShell rightRail={customRightRail}>
      <div className="flex flex-col space-y-7">
        {/* 16:9 Video Player Container */}
        <div className="relative aspect-video w-full rounded-2xl bg-emerald-900 overflow-hidden shadow-sm flex items-center justify-center text-white select-none">
          {/* Background Decor Circle */}
          <div className="absolute -left-12 -bottom-24 w-72 h-72 rounded-full bg-emerald-800 pointer-events-none" />
          <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-amber-400/15 pointer-events-none" />

          {isPlaying ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-stone-950">
              <Play className="w-16 h-16 text-emerald-500 mb-4 animate-pulse" />
              <p className="text-lg font-semibold text-stone-200">
                Streaming recipe demonstration…
              </p>
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="mt-4 h-9 px-5 rounded-full bg-stone-800 text-stone-300 hover:text-white text-sm font-medium transition-colors"
              >
                Pause preview
              </button>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 flex items-center justify-center transition-all hover:scale-105 shadow-md cursor-pointer"
                aria-label="Play video"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <p className="mt-4 text-base font-semibold text-emerald-100">
                Watch full cooking walkthrough ({video.duration})
              </p>
            </div>
          )}

          {/* Player Overlays */}
          <div className="absolute left-4 top-4 z-10">
            <DurationChip duration={video.duration} variant="hero" />
          </div>
          <div className="absolute right-4 top-4 z-10">
            <BookmarkButton />
          </div>
        </div>

        {/* Recipe Title and Metadata */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Badge variant="recipeOfDay" className="h-7 text-xs">
              {video.cuisine}
            </Badge>
            <span className="text-sm font-semibold text-emerald-700">
              {video.category}
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight leading-tight">
            {video.title}
          </h1>

          <p className="mt-3 text-base text-stone-600 leading-relaxed max-w-3xl">
            {video.description}
          </p>

          {/* Author & Stats Row */}
          <div className="mt-5 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar initials={video.authorInitials} verified={video.verified} />
              <div>
                <p className="text-base font-semibold text-stone-900 leading-snug">
                  {video.author}
                </p>
                <p className="text-xs text-stone-500">{video.authorHandle}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm font-semibold text-stone-700">
              <Rating score={video.rating} reviewsCount={video.reviewsCount} />
              <div className="flex items-center gap-1.5 text-stone-600">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{video.time}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-600">
                <ChefHat className="w-4 h-4 text-emerald-600" />
                <span>{video.difficulty}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-600">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{video.kcal} kcal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation: Summary Recipe vs Comments */}
        <div className="pt-2">
          <Tabs
            tabs={[
              { id: "summary", label: "Summary recipe", badge: "AI Speech-to-Text" },
              { id: "comments", label: `Comments (${comments.length})` },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="underline"
          />
        </div>

        {/* Tab Content 1: Summary Recipe */}
        {activeTab === "summary" && (
          <div className="space-y-6">
            {/* AI Speech-to-text banner */}
            <div className="relative overflow-hidden rounded-[20px] border border-amber-200/80 bg-gradient-to-br from-amber-50 to-amber-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight">
                      AI Speech-to-Text Recipe Summary
                    </h3>
                    <Badge variant="info">AI-generated</Badge>
                  </div>
                  <p className="text-xs text-amber-800 mb-3">
                    {video.aiSummary.durationNote}
                  </p>
                  <p className="text-base text-stone-700 leading-relaxed italic">
                    “{video.aiSummary.speechTranscript}”
                  </p>
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <Card>
              <h3 className="font-serif font-bold text-2xl text-stone-900 tracking-tight mb-4">
                Ingredients Checklist
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {video.ingredients.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  return (
                    <label
                      key={ing.name}
                      onClick={() => toggleIngredient(idx)}
                      className={`p-3 rounded-xl border transition-colors cursor-pointer flex items-center justify-between select-none ${
                        isChecked
                          ? "bg-emerald-50/70 border-emerald-300 text-emerald-900"
                          : "bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                        />
                        <span
                          className={`text-base font-medium ${
                            isChecked ? "line-through text-stone-500" : ""
                          }`}
                        >
                          {ing.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-stone-500 shrink-0 ml-2">
                        {ing.amount}
                      </span>
                    </label>
                  );
                })}
              </div>
            </Card>

            {/* Steps Section */}
            <Card>
              <h3 className="font-serif font-bold text-2xl text-stone-900 tracking-tight mb-4">
                Numbered Instructions
              </h3>
              <div className="space-y-4">
                {video.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 font-serif font-bold text-base flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      {idx + 1}
                    </div>
                    <p className="text-base text-stone-700 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Tab Content 2: Comments */}
        {activeTab === "comments" && (
          <div className="space-y-6">
            {/* Post comment box */}
            {isGuest ? (
              <div className="p-6 rounded-[20px] bg-amber-50/70 border border-amber-200 text-center select-none">
                <Lock className="w-6 h-6 text-amber-700 mx-auto mb-2" />
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  Join the conversation
                </h4>
                <p className="text-sm text-stone-600 mt-1 mb-4">
                  Log in or create a free account to ask questions and vote on tips.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link
                    href="/register"
                    className="h-9 px-5 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-sm font-medium transition-colors"
                  >
                    Create free account
                  </Link>
                  <Link
                    href="/login"
                    className="h-9 px-4 rounded-full text-stone-700 hover:bg-stone-200 text-sm font-medium transition-colors"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePostComment} className="flex flex-col gap-3">
                <textarea
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Share cooking tips, ingredient adjustments or questions…"
                  className="w-full p-4 rounded-xl border border-stone-200 bg-white text-base text-stone-900 placeholder:text-stone-400 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-xs"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!newCommentText.trim()}
                    className="h-10 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-sm"
                  >
                    Post comment
                  </button>
                </div>
              </form>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id} className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        initials={comment.authorInitials}
                        verified={comment.verified}
                      />
                      <div>
                        <span className="text-base font-semibold text-stone-900">
                          {comment.author}
                        </span>
                        <span className="text-xs text-stone-400 ml-2">
                          {comment.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Upvote / Downvote Buttons */}
                    <div className="flex items-center gap-1.5 bg-stone-50 rounded-full px-2.5 py-1 border border-stone-200">
                      <button
                        type="button"
                        onClick={() => handleVote(comment.id, "up")}
                        disabled={isGuest}
                        className={`p-1 rounded-full text-stone-500 hover:text-emerald-700 transition-colors ${
                          isGuest ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                        }`}
                        title={isGuest ? "Log in to vote" : "Upvote"}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-semibold text-stone-700 min-w-[16px] text-center">
                        {comment.votes}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleVote(comment.id, "down")}
                        disabled={isGuest}
                        className={`p-1 rounded-full text-stone-500 hover:text-red-600 transition-colors ${
                          isGuest ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                        }`}
                        title={isGuest ? "Log in to vote" : "Downvote"}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-base text-stone-700 leading-relaxed">
                    {comment.content}
                  </p>
                </Card>
              ))}

              {comments.length === 0 && (
                <Card className="text-center py-8 text-stone-500">
                  <MessageSquare className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                  <p className="text-base font-medium">No comments yet.</p>
                  <p className="text-sm">Be the first to share your thoughts!</p>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
