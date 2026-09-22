"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  Share2,
  Lock,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useRole } from "@/context/RoleContext";
import { ForumPost, CommentItem } from "@/lib/mock/types";
import { FORUM_POSTS } from "@/lib/mock/data";

export function ForumPostDetailClient({ post }: { post: ForumPost }) {
  const { isGuest, role } = useRole();
  const [votes, setVotes] = useState(post.votes);
  const [comments, setComments] = useState<CommentItem[]>(post.comments);
  const [commentText, setCommentText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleVote = (direction: "up" | "down") => {
    if (isGuest) return;
    setVotes((prev) => prev + (direction === "up" ? 1 : -1));
  };

  const handleCommentVote = (commentId: string, direction: "up" | "down") => {
    if (isGuest) return;
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return { ...c, votes: c.votes + (direction === "up" ? 1 : -1) };
        }
        return c;
      })
    );
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isGuest) return;

    const newComment: CommentItem = {
      id: `fc-${Date.now()}`,
      author: role === "Admin" ? "Admin User" : "Linh Nguyen",
      authorInitials: role === "Admin" ? "AD" : "LN",
      verified: true,
      content: commentText.trim(),
      timestamp: "Just now",
      votes: 1,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const otherPosts = FORUM_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  const rightRailContent = (
    <aside className="w-full space-y-6 select-none">
      <Card>
        <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight mb-4">
          More from {post.category}
        </h3>
        <div className="space-y-3.5 divide-y divide-stone-100">
          {otherPosts.map((op) => (
            <Link
              key={op.id}
              href={`/forum/${op.id}`}
              className="pt-3 first:pt-0 block group"
            >
              <h4 className="text-sm font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {op.title}
              </h4>
              <p className="mt-1 text-xs text-stone-500">
                {op.author} · {op.votes} upvotes
              </p>
            </Link>
          ))}
        </div>
      </Card>
    </aside>
  );

  return (
    <AppShell rightRail={rightRailContent}>
      <div className="flex flex-col space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            <span>Back to all discussions</span>
          </Link>
        </div>

        {/* Main Post Card */}
        <Card className="p-8">
          <div className="flex items-start gap-5">
            {/* Upvote Pill */}
            <div className="flex flex-col items-center bg-stone-50 border border-stone-200 rounded-xl p-2 shrink-0 select-none min-w-[52px]">
              <button
                type="button"
                onClick={() => handleVote("up")}
                disabled={isGuest}
                className={`p-1.5 rounded-lg text-stone-500 hover:text-emerald-700 hover:bg-stone-100 transition-colors ${
                  isGuest ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                }`}
                title={isGuest ? "Sign in to vote" : "Upvote"}
              >
                <ChevronUp className="w-6 h-6" strokeWidth={2.5} />
              </button>
              <span className="text-base font-bold text-stone-900 my-1">
                {votes}
              </span>
              <button
                type="button"
                onClick={() => handleVote("down")}
                disabled={isGuest}
                className={`p-1.5 rounded-lg text-stone-500 hover:text-red-600 hover:bg-stone-100 transition-colors ${
                  isGuest ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                }`}
                title={isGuest ? "Sign in to vote" : "Downvote"}
              >
                <ChevronDown className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <Badge variant="success">{post.category}</Badge>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500">
                  Published {post.timestamp}
                </span>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Author & Action Row */}
              <div className="mt-5 pb-5 border-b border-stone-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={post.authorInitials} verified={post.verified} />
                  <div>
                    <span className="text-base font-semibold text-stone-900">
                      {post.author}
                    </span>
                    <span className="text-xs text-stone-500 block">
                      {post.authorHandle}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="h-9 px-4 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copied ? "Link copied!" : "Share"}</span>
                </button>
              </div>

              {/* Article Content */}
              <div className="mt-6 text-stone-800 text-base leading-relaxed space-y-4 whitespace-pre-line">
                {post.content}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <Card className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-emerald-700" />
            <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Comments ({comments.length})
            </h2>
          </div>

          {/* New Comment Box */}
          {isGuest ? (
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-center mb-6 select-none">
              <Lock className="w-6 h-6 text-amber-700 mx-auto mb-2" />
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Join the conversation
              </h3>
              <p className="text-sm text-stone-600 mt-1 mb-4">
                You are currently viewing as Guest. Create a free account or log in to post comments and vote.
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
            <form onSubmit={handlePostComment} className="flex flex-col gap-3 mb-8">
              <textarea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your perspective or ask a follow-up question…"
                className="w-full p-4 rounded-xl border border-stone-200 bg-white text-base text-stone-900 placeholder:text-stone-400 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-xs"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="h-10 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-sm"
                >
                  Post reply
                </button>
              </div>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-xl bg-stone-50 border border-stone-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      initials={comment.authorInitials}
                      verified={comment.verified}
                      className="scale-90"
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

                  <div className="flex items-center gap-1.5 bg-white rounded-full px-2.5 py-0.5 border border-stone-200 shadow-xs">
                    <button
                      type="button"
                      onClick={() => handleCommentVote(comment.id, "up")}
                      disabled={isGuest}
                      className="p-0.5 text-stone-500 hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-semibold text-stone-700">
                      {comment.votes}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCommentVote(comment.id, "down")}
                      disabled={isGuest}
                      className="p-0.5 text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="mt-2.5 text-base text-stone-700 leading-relaxed pl-1">
                  {comment.content}
                </p>
              </div>
            ))}

            {comments.length === 0 && (
              <p className="text-center py-6 text-sm text-stone-500">
                No replies yet. Be the first to join the conversation!
              </p>
            )}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
