"use client";

import Link from "next/link";
import {
  Users,
  Heart,
  CalendarDays,
  MapPin,
  ChevronRight,
  Gift,
  MessageSquare,
  Newspaper,
  HandHeart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { club } from "@/data/club";
import { alumniGroups } from "@/data/alumni";
import { yen, formatDateTime, isPast } from "@/lib/format";
import { getRankInfo } from "@/lib/rank";
import { PostCard } from "@/components/feed/PostCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";

function ClubHero() {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${club.coverColor} p-4 text-white shadow-card`}>
      <div className="flex items-center gap-3">
        <div className="grid place-items-center w-14 h-14 rounded-2xl bg-white/20 text-3xl backdrop-blur">
          {club.emblem}
        </div>
        <div className="min-w-0">
          <div className="text-[11px] text-white/80">{club.schoolName}</div>
          <h1 className="text-lg font-extrabold leading-tight">{club.clubName}</h1>
          <div className="text-[11px] text-white/90 mt-0.5">「{club.catchphrase}」</div>
        </div>
      </div>
      <div className="flex gap-4 mt-3 pt-3 border-t border-white/20 text-center">
        <div className="flex-1">
          <div className="text-base font-extrabold">{club.memberCount}</div>
          <div className="text-[10px] text-white/80">現役部員</div>
        </div>
        <div className="flex-1">
          <div className="text-base font-extrabold">{club.obCount}</div>
          <div className="text-[10px] text-white/80">登録OB/OG</div>
        </div>
        <div className="flex-1">
          <div className="text-base font-extrabold">{club.established}</div>
          <div className="text-[10px] text-white/80">創部</div>
        </div>
      </div>
    </div>
  );
}

function NextEventCard() {
  const { schedule, role, watchedEvents, toggleWatch } = useStore();
  const next = schedule
    .filter((e) => !isPast(e.date))
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))[0];
  if (!next) return null;
  const watched = watchedEvents.has(next.id);

  return (
    <Link href="/schedule" className="block bg-white rounded-2xl shadow-card p-3.5">
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center gap-1 text-[11px] font-bold text-yell-600">
          <CalendarDays size={13} />
          次の{next.type}
        </span>
        <ChevronRight size={15} className="text-gray-300" />
      </div>
      <h3 className="font-bold text-sm text-gray-800">{next.title}</h3>
      <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1">
        <span>{formatDateTime(next.date)}</span>
        <span className="flex items-center gap-0.5">
          <MapPin size={11} />
          {next.place}
        </span>
      </div>
      {role === "ob" && (
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWatch(next.id);
          }}
          className={`mt-2.5 w-full text-xs font-bold py-2 rounded-full transition ${
            watched ? "bg-emerald-500 text-white" : "bg-yell-50 text-yell-700"
          }`}
        >
          {watched ? "観戦予定に登録済み ✓" : "観戦予定にする"}
        </button>
      )}
    </Link>
  );
}

function QuickLink({
  href,
  icon: Icon,
  label,
  sub,
}: {
  href: string;
  icon: typeof Gift;
  label: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="flex-1 bg-white rounded-2xl shadow-card p-3 flex flex-col gap-1 active:scale-95 transition"
    >
      <Icon size={20} className="text-yell-500" />
      <span className="text-[13px] font-bold text-gray-800">{label}</span>
      <span className="text-[10px] text-gray-400">{sub}</span>
    </Link>
  );
}

/* ---------- 現役生ホーム ---------- */
function ActiveHome() {
  const { posts, wishlist } = useStore();
  const totalNeeded = wishlist.reduce((s, w) => s + w.needed, 0);
  const totalFunded = wishlist.reduce((s, w) => s + w.funded, 0);

  return (
    <div className="space-y-4">
      <ClubHero />

      <div className="flex gap-3">
        <QuickLink href="/feed" icon={Newspaper} label="活動を投稿" sub="練習・試合をシェア" />
        <QuickLink href="/support" icon={Gift} label="欲しい物リスト" sub="支援を募集する" />
      </div>

      <NextEventCard />

      {/* 支援状況サマリー */}
      <Link href="/support" className="block bg-white rounded-2xl shadow-card p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1.5 text-sm font-bold text-gray-800">
            <HandHeart size={16} className="text-yell-500" />
            欲しい物の充足状況
          </span>
          <span className="text-xs font-bold text-ember-600">
            {totalFunded}/{totalNeeded}個
          </span>
        </div>
        <ProgressBar value={totalFunded} max={totalNeeded} />
        <p className="text-[11px] text-gray-400 mt-2">
          OB/OGの皆さんから {totalFunded} 個の支援が届いています。ありがとうございます！
        </p>
      </Link>

      {/* 最新の活動 */}
      <section>
        <SectionHeader
          icon={Newspaper}
          title="みんなの活動"
          action={
            <Link href="/feed" className="text-xs text-yell-600 font-bold flex items-center">
              すべて見る <ChevronRight size={13} />
            </Link>
          }
        />
        <div className="space-y-4">
          {posts.slice(0, 2).map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------- OB/OGホーム ---------- */
function ObHome() {
  const { posts, yearlyTotal, donations, currentUser, wishlist } = useStore();
  const rank = getRankInfo(yearlyTotal);
  const urgent = wishlist.filter((w) => w.funded < w.needed && w.priority === "高");

  return (
    <div className="space-y-4">
      <ClubHero />

      {/* 自分の支援サマリー */}
      <Link href="/mypage" className="block rounded-2xl bg-white shadow-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] text-gray-400">{currentUser.name} さんの今年の支援</div>
            <div className="text-2xl font-extrabold text-gray-800 mt-0.5">{yen(yearlyTotal)}</div>
          </div>
          <div className={`flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${rank.colorClass} px-3 py-2 text-white`}>
            <span className="text-2xl leading-none">{rank.emoji}</span>
            <span className="text-[10px] font-bold mt-0.5">{rank.label}</span>
          </div>
        </div>
        {rank.remaining !== null && (
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>次のランクまで</span>
              <span className="font-bold text-yell-600">あと {yen(rank.remaining)}</span>
            </div>
            <ProgressBar value={yearlyTotal} max={rank.nextThreshold!} />
          </div>
        )}
        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2.5">
          <TrendingUp size={12} />
          累計 {donations.length} 件の応援を届けました
        </div>
      </Link>

      {/* 今すぐ支援できる（緊急） */}
      {urgent.length > 0 && (
        <Link
          href="/support"
          className="block rounded-2xl bg-yell-gradient p-4 text-white shadow-card active:scale-[0.98] transition"
        >
          <div className="flex items-center gap-1.5 text-sm font-extrabold">
            <Sparkles size={16} />
            いま応援が必要です
          </div>
          <p className="text-[12px] text-white/90 mt-1.5">
            「{urgent[0].name}」など優先度の高い物品があと {urgent.reduce((s, w) => s + (w.needed - w.funded), 0)} 個不足しています。
          </p>
          <div className="mt-2.5 inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur">
            <Gift size={13} />
            欲しい物リストを見る
            <ChevronRight size={13} />
          </div>
        </Link>
      )}

      <NextEventCard />

      <div className="flex gap-3">
        <QuickLink href="/community" icon={Users} label="コミュニティ" sub={`同期 ${alumniGroups.length} 期が活動中`} />
        <QuickLink href="/community/board" icon={MessageSquare} label="掲示板" sub="OBの最新トピック" />
      </div>

      {/* 最新の活動 */}
      <section>
        <SectionHeader
          icon={Heart}
          title="後輩たちの活動"
          action={
            <Link href="/feed" className="text-xs text-yell-600 font-bold flex items-center">
              すべて見る <ChevronRight size={13} />
            </Link>
          }
        />
        <div className="space-y-4">
          {posts.slice(0, 2).map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  const { role } = useStore();
  return <div className="px-4 py-4">{role === "ob" ? <ObHome /> : <ActiveHome />}</div>;
}
