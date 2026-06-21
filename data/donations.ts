import type { Donation } from "@/lib/types";

/** ログイン中OB（山路さん）の支援履歴 */
export const donations: Donation[] = [
  {
    id: "don-1",
    date: "2026-06-20T19:10:00+09:00",
    type: "金額支援",
    label: "金額支援（試合勝利お祝い）",
    emoji: "💴",
    amount: 5000,
  },
  {
    id: "don-2",
    date: "2026-06-10T12:30:00+09:00",
    type: "物品支援",
    label: "ラグビーボール（試合球）",
    emoji: "🏉",
    amount: 6800,
  },
  {
    id: "don-3",
    date: "2026-05-22T20:00:00+09:00",
    type: "物品支援",
    label: "プロテイン（部全体用）",
    emoji: "🥤",
    amount: 4500,
  },
  {
    id: "don-4",
    date: "2026-04-15T09:45:00+09:00",
    type: "金額支援",
    label: "金額支援（新年度応援）",
    emoji: "💴",
    amount: 3000,
  },
  {
    id: "don-5",
    date: "2026-03-03T18:20:00+09:00",
    type: "物品支援",
    label: "キッキングティー",
    emoji: "🎯",
    amount: 3200,
  },
  {
    id: "don-6",
    date: "2025-12-25T10:00:00+09:00",
    type: "金額支援",
    label: "金額支援（冬季合宿サポート）",
    emoji: "💴",
    amount: 10000,
  },
];
