"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, MessageSquare, CalendarHeart } from "lucide-react";

const items = [
  { href: "/community", label: "同期", icon: Users },
  { href: "/community/board", label: "掲示板", icon: MessageSquare },
  { href: "/community/events", label: "イベント", icon: CalendarHeart },
];

export function CommunityNav() {
  const pathname = usePathname();
  return (
    <div className="flex gap-1.5 bg-white rounded-full p-1 shadow-card">
      {items.map((it) => {
        const active = pathname === it.href;
        const Icon = it.icon;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-full text-xs font-bold transition ${
              active ? "bg-yell-gradient text-white shadow-sm" : "text-gray-500"
            }`}
          >
            <Icon size={14} />
            {it.label}
          </Link>
        );
      })}
    </div>
  );
}
