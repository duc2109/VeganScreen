"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Lock, Mail, User } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useRole } from "@/context/RoleContext";
import { DIET_OPTIONS } from "@/lib/mock/data";

export default function RegisterPage() {
  const router = useRouter();
  const { setRole } = useRole();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [diet, setDiet] = useState("vegan");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration and set to Member
    setRole("Member");
    router.push("/me");
  };

  return (
    <AppShell showRightRail={false}>
      <div className="w-full flex justify-center py-10">
        <Card className="max-w-md w-full p-8 shadow-sm">
          {/* Logo Brand Header */}
          <div className="flex flex-col items-center text-center mb-7 select-none">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm flex items-center justify-center text-white mb-3">
              <Leaf className="w-6 h-6 text-white" strokeWidth={1.75} />
            </div>
            <h1 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Create your VeggieHub account
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Personalized weekly meal planner & AI nutrition access — free forever.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Full name
              </label>
              <Input
                type="text"
                required
                icon={<User className="w-4 h-4" />}
                placeholder="Linh Nguyen"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Email address
              </label>
              <Input
                type="email"
                required
                icon={<Mail className="w-4 h-4" />}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Password
              </label>
              <Input
                type="password"
                required
                icon={<Lock className="w-4 h-4" />}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Diet preference
              </label>
              <Select
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                options={DIET_OPTIONS.map((d) => ({
                  value: d.id,
                  label: d.label,
                }))}
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm mt-2"
            >
              Join free
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 pt-5 border-t border-stone-100 text-center text-sm text-stone-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Log in
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
