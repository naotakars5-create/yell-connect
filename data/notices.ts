import type { Notice } from "@/lib/types";

export const notices: Notice[] = [
  {
    id: "no-1",
    icon: "support",
    title: "支援が届きました",
    body: "高橋 健一さんがタックルバッグを3つ支援しました。ありがとうございます！",
    createdAt: "2026-06-21T08:30:00+09:00",
    unread: true,
    audience: "all",
  },
  {
    id: "no-2",
    icon: "comment",
    title: "応援コメントが届きました",
    body: "あなたの投稿「県予選2回戦」に山路 直卓さんがコメントしました。",
    createdAt: "2026-06-20T19:05:00+09:00",
    unread: true,
    audience: "active",
  },
  {
    id: "no-3",
    icon: "event",
    title: "観戦会のお知らせ",
    body: "6/28「県予選3回戦 OB合同観戦会」の参加者が30名を超えました。",
    createdAt: "2026-06-19T17:00:00+09:00",
    unread: false,
    audience: "ob",
  },
  {
    id: "no-4",
    icon: "schedule",
    title: "次の試合が近づいています",
    body: "6/28（日）13:00 県予選3回戦 vs 流通経済大柏。観戦予定はお済みですか？",
    createdAt: "2026-06-18T10:00:00+09:00",
    unread: false,
    audience: "all",
  },
  {
    id: "no-5",
    icon: "system",
    title: "年間支援ランクが更新されました",
    body: "今年の支援額が30,000円を超え、シルバーランクになりました🥈",
    createdAt: "2026-06-10T12:35:00+09:00",
    unread: false,
    audience: "ob",
  },
];
