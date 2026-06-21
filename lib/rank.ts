import type { SupportRank } from "./types";

export const RANK_THRESHOLDS: Record<SupportRank, number> = {
  bronze: 0,
  silver: 30000,
  gold: 70000,
};

export interface RankInfo {
  rank: SupportRank;
  label: string;
  emoji: string;
  colorClass: string; // バッジの背景グラデーション
  /** 次のランクまでの必要額（最高ランクなら null） */
  nextRank: SupportRank | null;
  nextThreshold: number | null;
  remaining: number | null;
}

export function getRankInfo(yearlyTotal: number): RankInfo {
  let rank: SupportRank = "bronze";
  if (yearlyTotal >= RANK_THRESHOLDS.gold) rank = "gold";
  else if (yearlyTotal >= RANK_THRESHOLDS.silver) rank = "silver";

  const meta: Record<SupportRank, { label: string; emoji: string; colorClass: string }> = {
    bronze: {
      label: "ブロンズ",
      emoji: "🥉",
      colorClass: "from-amber-600 to-orange-700",
    },
    silver: {
      label: "シルバー",
      emoji: "🥈",
      colorClass: "from-slate-300 to-slate-500",
    },
    gold: {
      label: "ゴールド",
      emoji: "🥇",
      colorClass: "from-yellow-300 to-amber-500",
    },
  };

  let nextRank: SupportRank | null = null;
  let nextThreshold: number | null = null;
  if (rank === "bronze") {
    nextRank = "silver";
    nextThreshold = RANK_THRESHOLDS.silver;
  } else if (rank === "silver") {
    nextRank = "gold";
    nextThreshold = RANK_THRESHOLDS.gold;
  }

  return {
    rank,
    ...meta[rank],
    nextRank,
    nextThreshold,
    remaining: nextThreshold !== null ? Math.max(0, nextThreshold - yearlyTotal) : null,
  };
}
