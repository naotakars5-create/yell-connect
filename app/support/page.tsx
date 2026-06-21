"use client";

import { useState } from "react";
import { HandHeart, ShoppingBag, Info } from "lucide-react";
import { useStore } from "@/lib/store";
import { club } from "@/data/club";
import type { WishItem } from "@/lib/types";
import { WishlistItemCard } from "@/components/support/WishlistItemCard";
import { DonationCard } from "@/components/support/DonationCard";
import {
  SupportSuccessModal,
  type SupportPayload,
} from "@/components/support/SupportSuccessModal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function SupportPage() {
  const { role, wishlist, supportItem, donate } = useStore();
  const [payload, setPayload] = useState<SupportPayload | null>(null);

  const handleSupportItem = (item: WishItem) => {
    const r = supportItem(item.id);
    setPayload({ ...r, kind: "物品支援" });
  };
  const handleDonate = (amount: number) => {
    const r = donate(amount);
    setPayload({ ...r, kind: "金額支援" });
  };

  return (
    <div className="px-4 py-4 space-y-5">
      {/* ヘッダー */}
      <div className="rounded-2xl bg-yell-gradient p-4 text-white shadow-card">
        <div className="flex items-center gap-2">
          <HandHeart size={22} />
          <h1 className="text-lg font-extrabold">サポート</h1>
        </div>
        <p className="text-xs text-white/90 mt-1">
          {club.schoolName} {club.clubName}
        </p>
        <p className="text-[11px] text-white/80 mt-2 leading-relaxed">
          {role === "ob"
            ? "欲しい物リストから物品を、または金額で、ワンタップで応援できます。"
            : "現在、部活が必要としている物品の一覧です。OB/OGの皆さんに支援をお願いしています。"}
        </p>
      </div>

      {/* 金額支援（OBのみ強調表示。現役には非表示） */}
      {role === "ob" && <DonationCard onDonate={handleDonate} />}

      {/* 欲しい物リスト */}
      <section>
        <SectionHeader icon={ShoppingBag} title="欲しい物リスト" />
        <div className="space-y-3">
          {wishlist.map((item) => (
            <WishlistItemCard key={item.id} item={item} onSupport={handleSupportItem} />
          ))}
        </div>
      </section>

      <div className="flex items-start gap-2 rounded-xl bg-yell-50 border border-yell-100 p-3 text-[11px] text-yell-700">
        <Info size={14} className="shrink-0 mt-0.5" />
        <p>
          支援した物品はメーカー・店舗から学校へ直送されます。手数料10%が運営費に充てられ、
          残りはすべて部活動の支援に使われます。
        </p>
      </div>

      <SupportSuccessModal payload={payload} onClose={() => setPayload(null)} />
    </div>
  );
}
