import type { ScheduleEvent } from "@/lib/types";

export const schedule: ScheduleEvent[] = [
  // --- 今後の予定 ---
  {
    id: "sch-1",
    date: "2026-06-28T13:00:00+09:00",
    type: "試合",
    title: "県予選 3回戦 vs 流通経済大柏",
    place: "千葉県総合スポーツセンター",
    watchers: 18,
  },
  {
    id: "sch-2",
    date: "2026-06-24T16:00:00+09:00",
    type: "練習",
    title: "セットプレー強化練習",
    place: "本校グラウンド",
    watchers: 2,
  },
  {
    id: "sch-3",
    date: "2026-07-12T10:00:00+09:00",
    type: "大会",
    title: "関東高校ラグビー大会 千葉県予選 準々決勝",
    place: "柏の葉公園総合競技場",
    watchers: 41,
  },
  // --- 過去の結果（アーカイブ） ---
  {
    id: "sch-4",
    date: "2026-06-20T13:00:00+09:00",
    type: "試合",
    title: "県予選 2回戦 vs 市立船橋",
    place: "千葉県総合スポーツセンター",
    watchers: 26,
    result: { score: "24 - 19", outcome: "勝", note: "ロスタイム逆転トライ！" },
  },
  {
    id: "sch-5",
    date: "2026-06-07T13:00:00+09:00",
    type: "試合",
    title: "県予選 1回戦 vs 千葉北",
    place: "本校グラウンド",
    watchers: 15,
    result: { score: "38 - 7", outcome: "勝" },
  },
  {
    id: "sch-6",
    date: "2026-05-18T11:00:00+09:00",
    type: "試合",
    title: "練習試合 vs 県立柏",
    place: "県立柏高校グラウンド",
    watchers: 8,
    result: { score: "12 - 22", outcome: "負", note: "課題の見つかる一戦に。" },
  },
];
