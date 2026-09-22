"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { ADMIN_CATEGORIES } from "@/lib/mock/admin";
import { CategoryItem } from "@/lib/mock/types";
import { Plus, Pencil, Archive, RotateCcw } from "lucide-react";

let nextId = 9;

function CategoriesContent() {
  const [categories, setCategories] = useState<CategoryItem[]>([...ADMIN_CATEGORIES]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<CategoryItem | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formType, setFormType] = useState<CategoryItem["type"]>("Recipe Category");

  const openAdd = () => {
    setEditItem(null);
    setFormName("");
    setFormSlug("");
    setFormType("Recipe Category");
    setModalOpen(true);
  };

  const openEdit = (item: CategoryItem) => {
    setEditItem(item);
    setFormName(item.name);
    setFormSlug(item.slug);
    setFormType(item.type);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formName.trim()) return;
    if (editItem) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editItem.id
            ? { ...c, name: formName, slug: formSlug || formName.toLowerCase().replace(/\s+/g, "-"), type: formType }
            : c
        )
      );
    } else {
      const newCat: CategoryItem = {
        id: `cat${nextId++}`,
        name: formName,
        slug: formSlug || formName.toLowerCase().replace(/\s+/g, "-"),
        type: formType,
        recipeCount: 0,
        status: "Active",
      };
      setCategories((prev) => [...prev, newCat]);
    }
    setModalOpen(false);
  };

  const toggleArchive = (id: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? ("Archived" as const) : ("Active" as const) }
          : c
      )
    );
  };

  const foodTypes = categories.filter((c) => c.type === "Food Type");
  const recipeCategories = categories.filter((c) => c.type === "Recipe Category");

  const renderTable = (items: CategoryItem[]) => (
    <DataTable
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "count", label: "Recipes" },
        { key: "status", label: "Status" },
        { key: "actions", label: "" },
      ]}
      rows={items.map((item) => ({
        name: <span className="text-sm font-semibold text-stone-900">{item.name}</span>,
        slug: <code className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-lg">{item.slug}</code>,
        count: <span className="text-sm text-stone-600 font-medium">{item.recipeCount.toLocaleString()}</span>,
        status:
          item.status === "Active" ? (
            <Badge variant="success">Active</Badge>
          ) : (
            <Badge variant="info">Archived</Badge>
          ),
        actions: (
          <div className="flex items-center gap-1">
            <button
              onClick={() => openEdit(item)}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => toggleArchive(item.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                item.status === "Active"
                  ? "hover:bg-amber-50 text-stone-400 hover:text-amber-700"
                  : "hover:bg-emerald-50 text-stone-400 hover:text-emerald-700"
              }`}
              title={item.status === "Active" ? "Archive" : "Restore"}
            >
              {item.status === "Active" ? (
                <Archive className="w-3.5 h-3.5" />
              ) : (
                <RotateCcw className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        ),
      }))}
    />
  );

  return (
    <div className="space-y-8">
      {/* Header action */}
      <div className="flex justify-end">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Food Types */}
      <div className="space-y-3">
        <h3 className="font-semibold text-stone-800 flex items-center gap-2">
          Food Types
          <span className="text-xs font-normal text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
            {foodTypes.length}
          </span>
        </h3>
        {renderTable(foodTypes)}
      </div>

      {/* Recipe Categories */}
      <div className="space-y-3">
        <h3 className="font-semibold text-stone-800 flex items-center gap-2">
          Recipe Categories
          <span className="text-xs font-normal text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
            {recipeCategories.length}
          </span>
        </h3>
        {renderTable(recipeCategories)}
      </div>

      {/* Add / Edit modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? "Edit Category" : "Add Category"}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="cat-name" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
              Name *
            </label>
            <input
              id="cat-name"
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. High-Protein Meals"
              className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>
          <div>
            <label htmlFor="cat-slug" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
              Slug
            </label>
            <input
              id="cat-slug"
              type="text"
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              placeholder="high-protein-meals (auto-generated)"
              className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
              Type
            </label>
            <div className="flex gap-2">
              {(["Food Type", "Recipe Category"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormType(t)}
                  className={`flex-1 h-10 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    formType === t
                      ? "bg-emerald-700 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 h-11 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              {editItem ? "Save changes" : "Add category"}
            </button>
            <button
              onClick={() => setModalOpen(false)}
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

export default function AdminCategoriesPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Administration"
          title="Categories"
          subtitle="Manage food type and recipe category taxonomy."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <CategoriesContent />
        )}
      </div>
    </AppShell>
  );
}

