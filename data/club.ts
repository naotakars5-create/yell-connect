import type { Club, AppUser } from "@/lib/types";

export const club: Club = {
  id: "chibahigashi-rugby",
  schoolName: "千葉東高等学校",
  clubName: "ラグビーフットボール部",
  emblem: "🏉",
  established: "1965年",
  memberCount: 28,
  obCount: 412,
  catchphrase: "One for All, All for One.",
  description:
    "千葉東高校ラグビー部は創部60年。文武両道を掲げ、県大会上位を目標に日々グラウンドで汗を流しています。現役生の活動を発信し、全国のOB・OGの皆さんと「応援が循環する部活」を目指しています。",
  coverColor: "from-yell-500 to-ember-500",
};

/** ログイン中ユーザー（現役生として見るとき） */
export const currentActiveUser: AppUser = {
  id: "active-self",
  name: "佐藤 蓮",
  role: "active",
  avatar: "🧑‍🎓",
  grade: "2年 / SO",
  position: "スタンドオフ・副キャプテン",
  bio: "県ベスト8を全員で超える。応援、いつもありがとうございます！",
};

/** ログイン中ユーザー（OBとして見るとき） */
export const currentObUser: AppUser = {
  id: "ob-self",
  name: "山路 直卓",
  role: "ob",
  avatar: "🧑‍💼",
  graduationYear: 2008,
  position: "第43期 / 元主将",
  bio: "千葉市在住。後輩たちの挑戦を本気で応援しています。",
};
