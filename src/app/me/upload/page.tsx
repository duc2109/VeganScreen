"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Dropzone } from "@/components/ui/Dropzone";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { CheckCircle2, Clock, Flame, ChefHat, Tag, X, Plus } from "lucide-react";

const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Advanced"] as const;
const CUISINE_OPTIONS = ["Vietnamese", "Japanese", "Mediterranean", "Indian", "Mexican", "American", "Thai", "Korean"];
const CATEGORY_OPTIONS = ["Breakfast", "Mains", "Soups", "Bowls & salads", "Snacks", "Desserts", "High-protein", "Gluten-free"];

function UploadContent() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("25");
  const [kcal, setKcal] = useState("450");
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTY_OPTIONS)[number]>("Easy");
  const [cuisine, setCuisine] = useState("Vietnamese");
  const [category, setCategory] = useState("Mains");
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>(["Firm tofu", "Bok choy", "Garlic", "Sesame oil"]);
  const [submitted, setSubmitted] = useState(false);

  const addIngredient = () => {
    const v = ingredientInput.trim();
    if (v && !ingredients.includes(v)) setIngredients((p) => [...p, v]);
    setIngredientInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto text-center p-12">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-stone-900 mb-2">Recipe submitted!</h2>
        <p className="text-stone-500 text-sm mb-6">
          Your recipe video "{title}" is under review and will be published shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setTitle("");
            setDescription("");
            setVideoFile(null);
            setIngredients(["Firm tofu", "Bok choy", "Garlic", "Sesame oil"]);
          }}
          className="h-10 px-6 rounded-full bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
        >
          Upload another
        </button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
      {/* Left: main form */}
      <div className="space-y-6">
        {/* Video dropzone */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
            Recipe Video *
          </label>
          <Dropzone
            label={videoFile ? videoFile.name : "Drop your recipe video here"}
            hint="MP4, MOV, WebM · max 2 GB · 16:9 recommended"
            accept="video/*"
            onFileAccepted={(file) => setVideoFile(file)}
          />
        </div>

        {/* Title */}
        <div>
          <label htmlFor="recipe-title" className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
            Recipe Title *
          </label>
          <input
            id="recipe-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Crispy Sesame Garlic Tofu with Bok Choy"
            className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="recipe-desc" className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
            Description
          </label>
          <textarea
            id="recipe-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe your recipe — flavour profile, technique, serving suggestion…"
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none resize-none"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
            Ingredients
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addIngredient())}
              placeholder="Add ingredient…"
              className="flex-1 h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing) => (
              <span
                key={ing}
                className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-stone-100 text-stone-800 rounded-full text-sm font-medium"
              >
                {ing}
                <button
                  type="button"
                  onClick={() => setIngredients((p) => p.filter((x) => x !== ing))}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: metadata */}
      <div className="space-y-5">
        <Card className="p-5 space-y-5">
          <h3 className="text-xs font-semibold text-stone-600 uppercase tracking-wider">Recipe Details</h3>

          {/* Time */}
          <div>
            <label htmlFor="prep-time" className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5" />
              Prep time (min)
            </label>
            <input
              id="prep-time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min={1}
              max={240}
              className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>

          {/* Kcal */}
          <div>
            <label htmlFor="kcal" className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              Calories per serving (kcal)
            </label>
            <input
              id="kcal"
              type="number"
              value={kcal}
              onChange={(e) => setKcal(e.target.value)}
              min={50}
              max={3000}
              className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
              <ChefHat className="w-3.5 h-3.5" />
              Difficulty
            </label>
            <div className="flex gap-2">
              {DIFFICULTY_OPTIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 h-9 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    difficulty === d
                      ? "bg-emerald-700 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Cuisine */}
          <div>
            <label htmlFor="cuisine" className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5" />
              Cuisine
            </label>
            <select
              id="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            >
              {CUISINE_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2 block">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </Card>

        <button
          type="submit"
          className="w-full h-12 rounded-xl bg-emerald-700 text-white font-semibold text-base hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer"
        >
          Publish Recipe →
        </button>
        <p className="text-xs text-stone-500 text-center">
          Your recipe will be reviewed by our team before publishing.
        </p>
      </div>
    </form>
  );
}

export default function MeUploadPage() {
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Creator Tools"
          title="Upload Recipe Video"
          subtitle="Share your plant-based creations with the VeggieHub community."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : (
          <UploadContent />
        )}
      </div>
    </AppShell>
  );
}

