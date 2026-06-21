"use client";

import { ArrowLeft, Gift, MessageCircle, CalendarHeart, CalendarClock, Bell } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { notices } from "@/data/notices";
import type { Notice } from "@/lib/types";
import { timeAgo } from "@/lib/format";

const iconMeta: Record<Notice["icon"], { icon: typeof Gift; color: string }> = {
  support: { icon: Gift, color: "bg-yell-100 text-yell-700" },
  comment: { icon: MessageCircle, color: "bg-emerald-100 text-emerald-700" },
  event: { icon: CalendarHeart, color: "bg-violet-100 text-violet-700" },
  schedule: { icon: CalendarClock, color: "bg-ember-100 text-ember-700" },
  system: { icon: Bell, color: "bg-slate-100 text-slate-600" },
};

function NoticeRow({ n }: { n: Notice }) {
  const meta = iconMeta[n.icon];
  const Icon = meta.icon;
  return (
    <div
      className={`flex gap-3 rounded-2xl p-3.5 shadow-card ${
        n.unread ? "bg-white" : "bg-white/60"
      }`}
    >
      <div className={`grid place-items-center w-10 h-10 rounded-xl shrink-0 ${meta.color}`}>
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="text-[13px] font-bold text-gray-800">{n.title}</h3>
          {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-ember-500 shrink-0" />}
        </div>
        <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">{n.body}</p>
        <div className="text-[10px] text-gray-400 mt-1">{timeAgo(n.createdAt)}</div>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const { role } = useStore();
  const visible = notices
    .filter((n) => n.audience === "all" || n.audience === role)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/" className="grid place-items-center w-8 h-8 rounded-full hover:bg-white">
          <ArrowLeft size={18} className="text-gray-600" />
        </Link>
        <h1 className="text-lg font-extrabold text-gray-800">お知らせ</h1>
      </div>

      <div className="space-y-2.5">
        {visible.length > 0 ? (
          visible.map((n) => <NoticeRow key={n.id} n={n} />)
        ) : (
          <p className="text-center text-xs text-gray-400 py-10">お知らせはありません。</p>
        )}
      </div>
    </div>
  );
}
