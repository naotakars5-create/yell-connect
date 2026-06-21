"use client";

import { Gift, Check } from "lucide-react";
import type { WishItem } from "@/lib/types";
import { yen } from "@/lib/format";
import { useStore } from "@/lib/store";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

const priorityColor: Record<WishItem["priority"], string> = {
  高: "bg-ember-100 text-ember-700",
  中: "bg-yell-100 text-yell-700",
  低: "bg-gray-100 text-gray-500",
};

export function WishlistItemCard({
  item,
  onSupport,
}: {
  item: WishItem;
  onSupport: (item: WishItem) => void;
}) {
  const { role } = useStore();
  const remaining = item.needed - item.funded;
  const complete = remaining <= 0;

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden flex">
      <div className="w-28 shrink-0">
        <MediaPlaceholder
          emoji={item.emoji}
          bg={item.bg}
          ratio="h-full min-h-[140px]"
          size="text-4xl"
        />
      </div>

      <div className="flex-1 p-3 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-sm text-gray-800 leading-snug">{item.name}</h3>
          <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${priorityColor[item.priority]}`}>
            優先{item.priority}
          </span>
        </div>

        <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{item.reason}</p>

        <div className="mt-2">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-gray-500">
              {complete ? (
                <span className="text-emerald-600 font-bold">充足しました 🎉</span>
              ) : (
                <>
                  残り <span className="font-bold text-ember-600">{remaining}</span> / {item.needed}個
                </>
              )}
            </span>
            <span className="font-bold text-gray-700">{yen(item.price)}</span>
          </div>
          <ProgressBar value={item.funded} max={item.needed} />
        </div>

        {role === "ob" ? (
          <button
            disabled={complete}
            onClick={() => onSupport(item)}
            className="mt-2.5 flex items-center justify-center gap-1.5 rounded-full bg-yell-gradient py-2 text-white text-sm font-bold shadow-card disabled:opacity-40 disabled:bg-none disabled:bg-gray-300 active:scale-[0.98] transition"
          >
            {complete ? <Check size={15} /> : <Gift size={15} />}
            {complete ? "達成済み" : "この物品を支援する"}
          </button>
        ) : (
          <div className="mt-2.5 text-center text-[11px] text-gray-400 py-1.5 rounded-full bg-warm-bg">
            OB/OGからの支援を募集中
          </div>
        )}
      </div>
    </div>
  );
}
