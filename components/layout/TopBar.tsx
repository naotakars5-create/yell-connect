"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { RoleSwitcher } from "./RoleSwitcher";
import { notices } from "@/data/notices";

export function TopBar() {
  const unread = notices.filter((n) => n.unread).length;
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-warm-border">
      <div className="flex items-center justify-between px-4 h-14">
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-xl">🔥</span>
          <span className="font-extrabold text-[15px] tracking-tight">
            <span className="text-yell-600">エール</span>
            <span className="text-ember-600">コネクト</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <RoleSwitcher />
          <Link
            href="/notifications"
            className="relative grid place-items-center w-9 h-9 rounded-full hover:bg-warm-bg"
            aria-label="お知らせ"
          >
            <Bell size={20} className="text-gray-600" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[15px] h-[15px] px-1 rounded-full bg-ember-500 text-white text-[9px] font-bold grid place-items-center">
                {unread}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
