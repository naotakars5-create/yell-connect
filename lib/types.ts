// エールコネクト 型定義

export type Role = "active" | "ob";

export type SupportRank = "bronze" | "silver" | "gold";

/** 部活情報 */
export interface Club {
  id: string;
  schoolName: string;
  clubName: string;
  emblem: string; // 絵文字（写真の代替）
  established: string;
  memberCount: number;
  obCount: number;
  catchphrase: string;
  description: string;
  coverColor: string; // Tailwindグラデーション用クラス
}

/** ユーザー（現役生 / OB） */
export interface AppUser {
  id: string;
  name: string;
  role: Role;
  avatar: string; // 絵文字
  /** 現役生: 学年 / OB: 卒業年度 */
  grade?: string;
  graduationYear?: number;
  position?: string; // ポジション・役職
  bio?: string;
}

/** 活動フィードの投稿 */
export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: Role;
  createdAt: string; // ISO
  category: "練習" | "試合結果" | "活動報告" | "お知らせ";
  body: string;
  /** 写真の代替: 絵文字 + グラデーション背景クラス */
  imageEmoji?: string;
  imageBg?: string;
  likeCount: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: Role;
  body: string;
  createdAt: string;
}

/** 欲しい物リストのアイテム */
export interface WishItem {
  id: string;
  name: string;
  emoji: string;
  bg: string;
  price: number;
  needed: number; // 必要数
  funded: number; // 支援済み数
  priority: "高" | "中" | "低";
  reason: string;
}

/** スケジュール（予定・結果） */
export interface ScheduleEvent {
  id: string;
  date: string; // ISO date
  type: "練習" | "試合" | "大会";
  title: string;
  place: string;
  /** 過去の場合の結果 */
  result?: {
    score: string;
    outcome: "勝" | "負" | "分";
    note?: string;
  };
  watchers: number; // 観戦予定人数
}

/** 支援履歴 */
export interface Donation {
  id: string;
  date: string; // ISO
  type: "物品支援" | "金額支援";
  /** 物品支援の場合は商品名、金額支援の場合は「金額支援」 */
  label: string;
  emoji: string;
  amount: number;
}

/** 掲示板スレッド（投稿） */
export interface BoardPost {
  id: string;
  board: "大会情報" | "活動報告" | "雑談";
  authorName: string;
  authorAvatar: string;
  graduationYear?: number;
  title: string;
  body: string;
  createdAt: string;
  replyCount: number;
}

/** 同期コミュニティ（卒業年度グループ） */
export interface AlumniGroup {
  graduationYear: number;
  label: string; // 例: 第40期 (2010年卒)
  memberCount: number;
  members: string[]; // 名前一覧
  recentTopic: string;
  accentEmoji: string;
}

/** OBイベント */
export interface ObEvent {
  id: string;
  title: string;
  kind: "観戦会" | "OB戦" | "懇親会";
  date: string; // ISO
  place: string;
  capacity: number;
  participants: number;
  joined: boolean;
  hostName: string;
  emoji: string;
}

/** お知らせ */
export interface Notice {
  id: string;
  icon: "support" | "comment" | "event" | "schedule" | "system";
  title: string;
  body: string;
  createdAt: string;
  unread: boolean;
  audience: Role | "all";
}
