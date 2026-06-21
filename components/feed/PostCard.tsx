"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import type { Post } from "@/lib/types";
import { useStore } from "@/lib/store";
import { timeAgo } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";
import { RoleBadge } from "@/components/ui/RoleBadge";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

const categoryColor: Record<Post["category"], string> = {
  試合結果: "bg-ember-100 text-ember-700",
  練習: "bg-yell-100 text-yell-700",
  活動報告: "bg-emerald-100 text-emerald-700",
  お知らせ: "bg-sky-100 text-sky-700",
};

export function PostCard({ post }: { post: Post }) {
  const { likedPosts, toggleLike, addComment, role } = useStore();
  const liked = likedPosts.has(post.id);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const submitComment = () => {
    const body = draft.trim();
    if (!body) return;
    addComment(post.id, body);
    setDraft("");
    setOpen(true);
  };

  return (
    <article className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* ヘッダー */}
      <div className="flex items-center gap-2.5 px-3.5 pt-3.5 pb-2.5">
        <Avatar emoji={post.authorAvatar} role={post.authorRole} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-gray-800 truncate">{post.authorName}</span>
            <RoleBadge role={post.authorRole} />
          </div>
          <span className="text-xs text-gray-400">{timeAgo(post.createdAt)}</span>
        </div>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${categoryColor[post.category]}`}>
          {post.category}
        </span>
      </div>

      {/* 画像 */}
      {post.imageEmoji && (
        <MediaPlaceholder emoji={post.imageEmoji} bg={post.imageBg} />
      )}

      {/* 本文 */}
      <p className="px-3.5 py-3 text-[13px] leading-relaxed text-gray-700 whitespace-pre-wrap">
        {post.body}
      </p>

      {/* アクション */}
      <div className="flex items-center gap-4 px-3.5 pb-2 border-t border-warm-border pt-2.5">
        <button
          onClick={() => toggleLike(post.id)}
          className={`flex items-center gap-1.5 text-sm font-medium transition active:scale-90 ${
            liked ? "text-ember-500" : "text-gray-500"
          }`}
        >
          <Heart size={19} className={liked ? "fill-ember-500" : ""} />
          {post.likeCount}
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500"
        >
          <MessageCircle size={19} />
          {post.comments.length}
        </button>
        {role === "ob" && (
          <span className="ml-auto text-[11px] text-yell-600 font-medium">
            応援コメントで力になろう →
          </span>
        )}
      </div>

      {/* コメント欄 */}
      {open && (
        <div className="px-3.5 pb-3.5 space-y-2.5 animate-fade-in">
          {post.comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2">
              <Avatar emoji={c.authorAvatar} role={c.authorRole} size="sm" />
              <div className="flex-1 rounded-2xl bg-warm-bg px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-gray-700">{c.authorName}</span>
                  <RoleBadge role={c.authorRole} />
                </div>
                <p className="text-[13px] text-gray-700 mt-0.5">{c.body}</p>
              </div>
            </div>
          ))}

          {/* 入力 */}
          <div className="flex items-center gap-2 pt-1">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitComment()}
              placeholder={role === "ob" ? "応援コメントを送る…" : "コメントする…"}
              className="flex-1 rounded-full bg-warm-bg border border-warm-border px-3.5 py-2 text-[13px] outline-none focus:border-yell-300"
            />
            <button
              onClick={submitComment}
              className="grid place-items-center w-9 h-9 rounded-full bg-yell-gradient text-white active:scale-90 transition"
              aria-label="送信"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
