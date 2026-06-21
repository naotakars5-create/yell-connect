"use client";

import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { PostCard } from "@/components/feed/PostCard";
import { NewPostForm } from "@/components/feed/NewPostForm";

export default function FeedPage() {
  const { posts, role } = useStore();

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-extrabold text-gray-800">活動フィード</h1>
        <Link
          href="/schedule"
          className="flex items-center gap-1 text-xs font-bold text-yell-600 bg-yell-50 px-2.5 py-1.5 rounded-full"
        >
          <CalendarDays size={14} />
          スケジュール
          <ChevronRight size={13} />
        </Link>
      </div>

      {/* 投稿フォーム（現役生のみ。OBは閲覧＋応援） */}
      {role === "active" ? (
        <NewPostForm />
      ) : (
        <div className="rounded-2xl bg-yell-gradient-soft border border-yell-100 p-3.5 text-[12px] text-yell-700">
          現役生の活動に「いいね」と応援コメントを送って、世代を超えて応援しよう！💪
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
