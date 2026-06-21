"use client";

import { useState } from "react";
import { ImagePlus, Send } from "lucide-react";
import type { Post } from "@/lib/types";
import { useStore } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";

const categories: Post["category"][] = ["練習", "試合結果", "活動報告", "お知らせ"];
const emojiChoices = ["🏉", "💪", "🔥", "🌤️", "🏆", "📣", "🍙", "🤝"];

export function NewPostForm() {
  const { currentUser, addPost } = useStore();
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<Post["category"]>("練習");
  const [emoji, setEmoji] = useState<string>("🏉");
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!body.trim()) return;
    addPost({ category, body: body.trim(), imageEmoji: emoji });
    setBody("");
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  };

  return (
    <div className="bg-white rounded-2xl shadow-card p-3.5">
      <div className="flex items-center gap-2 mb-2.5">
        <Avatar emoji={currentUser.avatar} role={currentUser.role} size="sm" />
        <span className="text-sm font-bold text-gray-700">活動を投稿</span>
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        placeholder="今日の練習や試合の様子をシェアしよう…"
        className="w-full resize-none rounded-xl bg-warm-bg border border-warm-border p-3 text-[13px] outline-none focus:border-yell-300"
      />

      {/* カテゴリ */}
      <div className="flex gap-1.5 mt-2.5 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition ${
              category === c ? "bg-yell-500 text-white" : "bg-warm-bg text-gray-500"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 写真（絵文字選択でダミー） */}
      <div className="flex items-center gap-1.5 mt-2.5">
        <ImagePlus size={16} className="text-gray-400" />
        <span className="text-[11px] text-gray-400 mr-1">写真:</span>
        {emojiChoices.map((e) => (
          <button
            key={e}
            onClick={() => setEmoji(emoji === e ? "" : e)}
            className={`text-lg leading-none rounded-md px-1 transition ${
              emoji === e ? "bg-yell-100 scale-110" : "opacity-50"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      <button
        onClick={submit}
        disabled={!body.trim()}
        className="mt-3 w-full flex items-center justify-center gap-1.5 rounded-full bg-yell-gradient py-2.5 text-white font-bold shadow-card disabled:opacity-40 active:scale-[0.98] transition"
      >
        <Send size={16} />
        {done ? "投稿しました！" : "投稿する"}
      </button>
    </div>
  );
}
