"use client";

import { useStore } from "@/lib/store";
import { GraduationCap, Users } from "lucide-react";

export function RoleSwitcher() {
  const { role, setRole } = useStore();
  return (
    <div className="flex items-center rounded-full bg-warm-bg p-0.5 text-xs font-bold">
      <button
        onClick={() => setRole("active")}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition ${
          role === "active" ? "bg-emerald-500 text-white shadow-sm" : "text-gray-500"
        }`}
      >
        <GraduationCap size={13} />
        現役生
      </button>
      <button
        onClick={() => setRole("ob")}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition ${
          role === "ob" ? "bg-yell-500 text-white shadow-sm" : "text-gray-500"
        }`}
      >
        <Users size={13} />
        OB/OG
      </button>
    </div>
  );
}
