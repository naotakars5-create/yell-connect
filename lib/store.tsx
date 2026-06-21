"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Role,
  Post,
  Comment,
  WishItem,
  Donation,
  ObEvent,
  ScheduleEvent,
} from "./types";
import { currentActiveUser, currentObUser } from "@/data/club";
import { posts as seedPosts } from "@/data/posts";
import { wishlist as seedWishlist } from "@/data/wishlist";
import { donations as seedDonations } from "@/data/donations";
import { obEvents as seedEvents } from "@/data/events";
import { schedule as seedSchedule } from "@/data/schedule";

const ROLE_KEY = "yell-connect:role";

interface SupportResult {
  label: string;
  emoji: string;
  amount: number;
}

interface Store {
  role: Role;
  setRole: (r: Role) => void;
  toggleRole: () => void;
  currentUser: typeof currentActiveUser;

  // フィード
  posts: Post[];
  likedPosts: Set<string>;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, body: string) => void;
  addPost: (input: { category: Post["category"]; body: string; imageEmoji?: string }) => void;

  // 欲しい物リスト
  wishlist: WishItem[];
  supportItem: (itemId: string) => SupportResult;

  // 金額支援
  donate: (amount: number) => SupportResult;

  // 支援履歴・集計
  donations: Donation[];
  yearlyTotal: number;

  // イベント
  events: ObEvent[];
  toggleJoinEvent: (eventId: string) => void;

  // スケジュール観戦
  schedule: ScheduleEvent[];
  watchedEvents: Set<string>;
  toggleWatch: (eventId: string) => void;
}

const StoreContext = createContext<Store | null>(null);

let cidSeq = 1000;
const newId = (prefix: string) => `${prefix}-${++cidSeq}`;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("ob");
  const [posts, setPosts] = useState<Post[]>(seedPosts);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [wishlist, setWishlist] = useState<WishItem[]>(seedWishlist);
  const [donations, setDonations] = useState<Donation[]>(seedDonations);
  const [events, setEvents] = useState<ObEvent[]>(seedEvents);
  const [schedule] = useState<ScheduleEvent[]>(seedSchedule);
  const [watchedEvents, setWatchedEvents] = useState<Set<string>>(new Set());

  // ロールの永続化（localStorage）
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(ROLE_KEY) : null;
    if (saved === "active" || saved === "ob") setRoleState(saved);
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    if (typeof window !== "undefined") window.localStorage.setItem(ROLE_KEY, r);
  };
  const toggleRole = () => setRole(role === "ob" ? "active" : "ob");

  const currentUser = role === "ob" ? currentObUser : currentActiveUser;

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      const liked = next.has(postId);
      if (liked) next.delete(postId);
      else next.add(postId);
      setPosts((ps) =>
        ps.map((p) =>
          p.id === postId ? { ...p, likeCount: p.likeCount + (liked ? -1 : 1) } : p
        )
      );
      return next;
    });
  };

  const addComment = (postId: string, body: string) => {
    const comment: Comment = {
      id: newId("c"),
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      body,
      createdAt: new Date().toISOString(),
    };
    setPosts((ps) =>
      ps.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p))
    );
  };

  const addPost: Store["addPost"] = ({ category, body, imageEmoji }) => {
    const post: Post = {
      id: newId("post"),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      createdAt: new Date().toISOString(),
      category,
      body,
      imageEmoji: imageEmoji || undefined,
      imageBg: imageEmoji ? "from-yell-400 to-ember-500" : undefined,
      likeCount: 0,
      comments: [],
    };
    setPosts((ps) => [post, ...ps]);
  };

  const supportItem: Store["supportItem"] = (itemId) => {
    const item = wishlist.find((w) => w.id === itemId)!;
    setWishlist((ws) =>
      ws.map((w) =>
        w.id === itemId ? { ...w, funded: Math.min(w.needed, w.funded + 1) } : w
      )
    );
    const donation: Donation = {
      id: newId("don"),
      date: new Date().toISOString(),
      type: "物品支援",
      label: item.name,
      emoji: item.emoji,
      amount: item.price,
    };
    setDonations((ds) => [donation, ...ds]);
    return { label: item.name, emoji: item.emoji, amount: item.price };
  };

  const donate: Store["donate"] = (amount) => {
    const donation: Donation = {
      id: newId("don"),
      date: new Date().toISOString(),
      type: "金額支援",
      label: "金額支援",
      emoji: "💴",
      amount,
    };
    setDonations((ds) => [donation, ...ds]);
    return { label: "金額支援", emoji: "💴", amount };
  };

  const yearlyTotal = useMemo(
    () => donations.reduce((sum, d) => sum + d.amount, 0),
    [donations]
  );

  const toggleJoinEvent = (eventId: string) => {
    setEvents((es) =>
      es.map((e) =>
        e.id === eventId
          ? {
              ...e,
              joined: !e.joined,
              participants: e.participants + (e.joined ? -1 : 1),
            }
          : e
      )
    );
  };

  const toggleWatch = (eventId: string) => {
    setWatchedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  };

  const value: Store = {
    role,
    setRole,
    toggleRole,
    currentUser,
    posts,
    likedPosts,
    toggleLike,
    addComment,
    addPost,
    wishlist,
    supportItem,
    donate,
    donations,
    yearlyTotal,
    events,
    toggleJoinEvent,
    schedule,
    watchedEvents,
    toggleWatch,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
