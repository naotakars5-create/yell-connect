"use client";

import Link from "next/link";
import {
  Trophy,
  Gift,
  Package,
  Coins,
  TrendingUp,
  Heart,
  CalendarHeart,
  ChevronRight,
  Award,
} from "lucide-react";
import { useStore } from "@/lib/store";
import type { Donation, SupportRank } from "@/lib/types";
import { yen, formatDate } from "@/lib/format";
import { getRankInfo, RANK_THRESHOLDS } from "@/lib/rank";
import { RoleBadge } from "@/components/ui/RoleBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";

const rankOrder: SupportRank[] = ["bronze", "silver", "gold"];
const rankMeta: Record<SupportRank, { emoji: string; label: string }> = {
  bronze: { emoji: "🥉", label: "ブロンズ" },
  silver: { emoji: "🥈", label: "シルバー" },
  gold: { emoji: "🥇", label: "ゴールド" },
};

function DonationRow({ d }: { d: Donation }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl shadow-card p-3">
      <div className="grid place-items-center w-10 h-10 rounded-xl bg-yell-gradient-soft text-xl shrink-0">
        {d.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-bold text-gray-800 truncate">{d.label}</div>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-0.5">
          <span
            className={`px-1.5 py-0.5 rounded-full font-bold ${
              d.type === "物品支援"
                ? "bg-yell-100 text-yell-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {d.type === "物品支援" ? (
              <Package size={9} className="inline -mt-0.5 mr-0.5" />
            ) : (
              <Coins size={9} className="inline -mt-0.5 mr-0.5" />
            )}
            {d.type}
          </span>
          {formatDate(d.date)}
        </div>
      </div>
      <div className="text-sm font-extrabold text-gray-800 shrink-0">{yen(d.amount)}</div>
    </div>
  );
}

/* ---------- OB/OG マイページ ---------- */
function ObMyPage() {
  const { currentUser, donations, yearlyTotal } = useStore();
  const rank = getRankInfo(yearlyTotal);
  const itemCount = donations.filter((d) => d.type === "物品支援").length;
  const moneyCount = donations.filter((d) => d.type === "金額支援").length;

  return (
    <div className="space-y-5">
      {/* プロフィール + ランク */}
      <div className={`rounded-2xl bg-gradient-to-br ${rank.colorClass} p-4 text-white shadow-card`}>
        <div className="flex items-center gap-3">
          <div className="grid place-items-center w-14 h-14 rounded-2xl bg-white/25 text-3xl backdrop-blur">
            {currentUser.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-extrabold leading-tight">{currentUser.name}</h1>
            <div className="text-[11px] text-white/90">{currentUser.position}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl leading-none">{rank.emoji}</div>
            <div className="text-[10px] font-bold mt-0.5">{rank.label}</div>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white/15 p-3 backdrop-blur">
          <div className="text-[11px] text-white/80">2026年の支援総額</div>
          <div className="text-3xl font-extrabold mt-0.5">{yen(yearlyTotal)}</div>
          {rank.remaining !== null ? (
            <div className="mt-2">
              <div className="flex justify-between text-[10px] text-white/90 mb-1">
                <span>次の{rankMeta[rank.nextRank!].label}ランクまで</span>
                <span className="font-bold">あと {yen(rank.remaining)}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/25 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${Math.min(100, (yearlyTotal / rank.nextThreshold!) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-white/90 mt-2">最高ランク到達！ありがとうございます🎉</div>
          )}
        </div>
      </div>

      {/* サマリー */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl shadow-card p-3 text-center">
          <TrendingUp size={18} className="text-yell-500 mx-auto" />
          <div className="text-lg font-extrabold text-gray-800 mt-1">{donations.length}</div>
          <div className="text-[10px] text-gray-400">支援回数</div>
        </div>
        <div className="bg-white rounded-2xl shadow-card p-3 text-center">
          <Package size={18} className="text-yell-500 mx-auto" />
          <div className="text-lg font-extrabold text-gray-800 mt-1">{itemCount}</div>
          <div className="text-[10px] text-gray-400">物品支援</div>
        </div>
        <div className="bg-white rounded-2xl shadow-card p-3 text-center">
          <Coins size={18} className="text-yell-500 mx-auto" />
          <div className="text-lg font-extrabold text-gray-800 mt-1">{moneyCount}</div>
          <div className="text-[10px] text-gray-400">金額支援</div>
        </div>
      </div>

      {/* ランク特典 */}
      <section>
        <SectionHeader icon={Award} title="支援ランク" />
        <div className="bg-white rounded-2xl shadow-card p-3.5 space-y-2.5">
          {rankOrder.map((r) => {
            const reached = yearlyTotal >= RANK_THRESHOLDS[r];
            const isCurrent = rank.rank === r;
            return (
              <div
                key={r}
                className={`flex items-center gap-3 rounded-xl p-2.5 ${
                  isCurrent ? "bg-yell-gradient-soft ring-1 ring-yell-200" : ""
                }`}
              >
                <span className={`text-2xl ${reached ? "" : "grayscale opacity-40"}`}>
                  {rankMeta[r].emoji}
                </span>
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-gray-800">
                    {rankMeta[r].label}
                    {isCurrent && (
                      <span className="ml-1.5 text-[9px] text-yell-700 bg-yell-100 px-1.5 py-0.5 rounded-full">
                        現在
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    年間 {yen(RANK_THRESHOLDS[r])} 以上
                  </div>
                </div>
                {reached && <span className="text-[10px] font-bold text-emerald-600">達成済</span>}
              </div>
            );
          })}
        </div>
      </section>

      {/* 支援履歴 */}
      <section>
        <SectionHeader
          icon={Gift}
          title="支援履歴"
          action={<span className="text-[11px] text-gray-400">{donations.length}件</span>}
        />
        <div className="space-y-2">
          {donations.map((d) => (
            <DonationRow key={d.id} d={d} />
          ))}
        </div>
      </section>

      {/* クイックリンク */}
      <Link
        href="/support"
        className="flex items-center justify-center gap-1.5 w-full bg-yell-gradient text-white text-sm font-bold py-3 rounded-full shadow-card active:scale-95 transition"
      >
        <Heart size={16} />
        続けて応援する
      </Link>
    </div>
  );
}

/* ---------- 現役生 マイページ ---------- */
function ActiveMyPage() {
  const { currentUser, posts } = useStore();
  const myPosts = posts.filter((p) => p.authorRole === "active");
  const totalLikes = myPosts.reduce((s, p) => s + p.likeCount, 0);
  const totalComments = myPosts.reduce((s, p) => s + p.comments.length, 0);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-yell-gradient p-4 text-white shadow-card">
        <div className="flex items-center gap-3">
          <div className="grid place-items-center w-14 h-14 rounded-2xl bg-white/25 text-3xl backdrop-blur">
            {currentUser.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-extrabold leading-tight">{currentUser.name}</h1>
              <RoleBadge role="active" />
            </div>
            <div className="text-[11px] text-white/90">{currentUser.grade}</div>
            <div className="text-[11px] text-white/90">{currentUser.position}</div>
          </div>
        </div>
        {currentUser.bio && (
          <p className="text-[12px] text-white/90 mt-3 leading-relaxed">{currentUser.bio}</p>
        )}
      </div>

      {/* 活動サマリー */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl shadow-card p-3 text-center">
          <CalendarHeart size={18} className="text-yell-500 mx-auto" />
          <div className="text-lg font-extrabold text-gray-800 mt-1">{myPosts.length}</div>
          <div className="text-[10px] text-gray-400">投稿数</div>
        </div>
        <div className="bg-white rounded-2xl shadow-card p-3 text-center">
          <Heart size={18} className="text-ember-500 mx-auto" />
          <div className="text-lg font-extrabold text-gray-800 mt-1">{totalLikes}</div>
          <div className="text-[10px] text-gray-400">もらった応援</div>
        </div>
        <div className="bg-white rounded-2xl shadow-card p-3 text-center">
          <Trophy size={18} className="text-yell-500 mx-auto" />
          <div className="text-lg font-extrabold text-gray-800 mt-1">{totalComments}</div>
          <div className="text-[10px] text-gray-400">コメント</div>
        </div>
      </div>

      <div className="rounded-2xl bg-yell-gradient-soft border border-yell-100 p-4 text-center">
        <Gift size={22} className="text-yell-500 mx-auto" />
        <p className="text-[12px] text-yell-700 mt-2 leading-relaxed">
          OB/OGの皆さんからの支援とコメントが、ここに届きます。<br />
          活動を投稿して、応援の輪を広げよう！
        </p>
        <Link
          href="/feed"
          className="inline-flex items-center gap-1 mt-3 bg-yell-gradient text-white text-xs font-bold px-4 py-2 rounded-full"
        >
          活動を投稿する <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export default function MyPage() {
  const { role } = useStore();
  return <div className="px-4 py-4">{role === "ob" ? <ObMyPage /> : <ActiveMyPage />}</div>;
}
