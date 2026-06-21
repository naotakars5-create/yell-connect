"use client";

import { useState } from "react";
import { MessageSquare, MessagesSquare, Trophy, FileText, Coffee } from "lucide-react";
import { boardPosts } from "@/data/board";
import type { BoardPost } from "@/lib/types";
import { timeAgo } from "@/lib/format";
import { CommunityNav } from "@/components/community/CommunityNav";
import { Avatar } from "@/components/ui/Avatar";

type Board = BoardPost["board"];

const tabs: { key: Board; icon: typeof Trophy; color: string }[] = [
  { key: "大会情報", icon: Trophy, color: "text-ember-600" },
  { key: "活動報告", icon: FileText, color: "text-yell-600" },
  { key: "雑談", icon: Coffee, color: "text-violet-600" },
];

const boardBadge: Record<Board, string> = {
  大会情報: "bg-ember-100 text-ember-700",
  活動報告: "bg-yell-100 text-yell-700",
  雑談: "bg-violet-100 text-violet-700",
};

function ThreadCard({ post }: { post: BoardPost }) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-3.5 active:scale-[0.99] transition">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${boardBadge[post.board]}`}>
          {post.board}
        </span>
        <span className="text-[10px] text-gray-400">{timeAgo(post.createdAt)}</span>
      </div>
      <h3 className="font-bold text-sm text-gray-800 leading-snug">{post.title}</h3>
      <p className="text-[12px] text-gray-500 mt-1 leading-relaxed line-clamp-2">{post.body}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <Avatar emoji={post.authorAvatar} size="sm" />
          <div className="leading-tight">
            <div className="text-[11px] font-bold text-gray-700">{post.authorName}</div>
            {post.graduationYear && (
              <div className="text-[9px] text-gray-400">{post.graduationYear}年卒</div>
            )}
          </div>
        </div>
        <span className="flex items-center gap-1 text-[11px] text-gray-400">
          <MessagesSquare size={13} />
          {post.replyCount}件の返信
        </span>
      </div>
    </div>
  );
}

export default function BoardPage() {
  const [active, setActive] = useState<Board>("大会情報");
  const filtered = boardPosts
    .filter((p) => p.board === active)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare size={22} className="text-yell-500" />
        <h1 className="text-lg font-extrabold text-gray-800">OB/OG掲示板</h1>
      </div>

      <CommunityNav />

      {/* 板タブ */}
      <div className="flex gap-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          const on = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition ${
                on ? "bg-white shadow-card text-gray-800" : "bg-warm-card text-gray-400"
              }`}
            >
              <Icon size={14} className={on ? t.color : ""} />
              {t.key}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((p) => <ThreadCard key={p.id} post={p} />)
        ) : (
          <p className="text-center text-xs text-gray-400 py-8">
            まだ投稿がありません。最初のスレッドを立ててみましょう。
          </p>
        )}
      </div>

      {/* 新規スレッド（デモ：飾り） */}
      <button className="w-full bg-yell-gradient text-white text-sm font-bold py-3 rounded-full shadow-card active:scale-95 transition">
        ＋ 新しいスレッドを立てる
      </button>
    </div>
  );
}
