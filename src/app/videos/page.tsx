"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, ArrowRight, BookOpen } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";
import { VideoCard } from "@/components/ui/VideoCard";
import { Card } from "@/components/ui/Card";
import { RECIPE_FILTERS, VIDEO_RECIPES, FORUM_POSTS } from "@/lib/mock/data";

export default function VideosPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"trending" | "views">("trending");

  const filteredVideos = VIDEO_RECIPES.filter((video) => {
    const matchesFilter =
      activeFilter === "All" ||
      video.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
      video.cuisine.toLowerCase().includes(activeFilter.toLowerCase());

    const matchesSearch =
      !searchQuery.trim() ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <AppShell>
      <div className="flex flex-col space-y-8">
        {/* Page Header */}
        <PageHeader
          eyebrow="WATCH & COOK"
          title="Video recipes"
          subtitle="Follow along with plant-based culinary creators, complete with AI-generated step-by-step summaries."
        />

        {/* Search and Filters Bar */}
        <div className="flex flex-col gap-4">
          <div className="max-w-md">
            <Input
              variant="search"
              placeholder="Filter by recipe title, author or ingredient…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {RECIPE_FILTERS.map((filter) => (
              <Chip
                key={filter}
                variant="filter"
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Chip>
            ))}

            {/* Sort Button */}
            <button
              type="button"
              onClick={() =>
                setSortOrder((prev) => (prev === "trending" ? "views" : "trending"))
              }
              className="ml-auto h-10 px-[18px] text-[15px] rounded-full border border-stone-200 bg-white text-stone-700 font-medium hover:text-stone-900 transition-colors inline-flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-stone-500" strokeWidth={1.75} />
              <span className="capitalize">{sortOrder}</span>
            </button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Link key={video.id} href={`/videos/${video.id}`} className="block">
              <VideoCard
                title={video.title}
                duration={video.duration}
                author={video.author}
                views={video.views}
                imageUrl={video.image}
              />
            </Link>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-lg font-semibold text-stone-800">
              No recipes match your criteria
            </p>
            <p className="mt-1 text-sm text-stone-500">
              Try changing your filter chip or searching for a different ingredient.
            </p>
          </Card>
        )}

        {/* Related Community Blogs Section */}
        <section className="pt-8 border-t border-stone-200">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-emerald-700 mb-1">
                COMMUNITY ARTICLES
              </p>
              <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
                Related nutrition guides & stories
              </h2>
            </div>
            <Link
              href="/forum"
              className="inline-flex items-center gap-1.5 text-base font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>Explore forum</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FORUM_POSTS.slice(0, 2).map((post) => (
              <Link key={post.id} href={`/forum/${post.id}`}>
                <Card className="h-full hover:border-emerald-600 transition-colors cursor-pointer p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{post.category}</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>{post.author}</span>
                    <span>{post.timestamp}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
