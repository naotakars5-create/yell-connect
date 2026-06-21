"use client";

import { Users, MessageCircle, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { alumniGroups } from "@/data/alumni";
import type { AlumniGroup } from "@/lib/types";
import { CommunityNav } from "@/components/community/CommunityNav";

function AlumniGroupCard({ group, isMine }: { group: AlumniGroup; isMine: boolean }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-card p-4 ${
        isMine ? "ring-2 ring-yell-400" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="grid place-items-center w-12 h-12 rounded-2xl bg-yell-gradient-soft text-2xl">
          {group.accentEmoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-sm text-gray-800 truncate">{group.label}</h3>
            {isMine && (
              <span className="shrink-0 text-[9px] font-bold text-yell-700 bg-yell-100 px-1.5 py-0.5 rounded-full">
                あなたの同期
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
            <Users size={11} />
            登録 {group.memberCount} 名
          </div>
        </div>
      </div>

      {/* メンバーアバター列 */}
      <div className="flex items-center gap-1.5 mt-3">
        {group.members.slice(0, 4).map((m) => (
          <span
            key={m}
            className="text-[10px] font-medium text-gray-600 bg-warm-card border border-warm-border rounded-full px-2 py-1"
          >
            {m}
          </span>
        ))}
        {group.memberCount > group.members.length && (
          <span className="text-[10px] text-gray-400">
            +{group.memberCount - group.members.length}
          </span>
        )}
      </div>

      {/* 最近の話題 */}
      <div className="flex items-start gap-1.5 mt-3 rounded-xl bg-warm-card p-2.5">
        <MessageCircle size={13} className="text-yell-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-600 leading-snug">{group.recentTopic}</p>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const { currentUser, role } = useStore();
  const myYear = role === "ob" ? currentUser.graduationYear : undefined;

  // 自分の同期を先頭に
  const sorted = [...alumniGroups].sort((a, b) => {
    if (a.graduationYear === myYear) return -1;
    if (b.graduationYear === myYear) return 1;
    return b.graduationYear - a.graduationYear;
  });

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-2">
        <Users size={22} className="text-yell-500" />
        <h1 className="text-lg font-extrabold text-gray-800">OB/OGコミュニティ</h1>
      </div>

      <CommunityNav />

      <div className="rounded-2xl bg-yell-gradient p-4 text-white shadow-card">
        <div className="flex items-center gap-1.5 text-sm font-extrabold">
          <Sparkles size={16} />
          同期でつながる
        </div>
        <p className="text-[12px] text-white/90 mt-1.5 leading-relaxed">
          卒業年度ごとの「同期グループ」。懐かしい仲間と再会し、世代を超えて後輩を応援しよう。
        </p>
      </div>

      <div className="space-y-3">
        {sorted.map((g) => (
          <AlumniGroupCard key={g.graduationYear} group={g} isMine={g.graduationYear === myYear} />
        ))}
      </div>
    </div>
  );
}
