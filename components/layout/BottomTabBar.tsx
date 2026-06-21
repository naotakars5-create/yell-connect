"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Newspaper, HandHeart, Users, User, type LucideIcon } from "lucide-react";

interface Tab {
  href: string;
  label: string;
  icon: LucideIcon;
  match: (path: string) => boolean;
}

const tabs: Tab[] = [
  { href: "/", label: "ホーム", icon: Home, match: (p) => p === "/" },
  { href: "/feed", label: "活動", icon: Newspaper, match: (p) => p.startsWith("/feed") || p.startsWith("/schedule") },
  { href: "/support", label: "サポート", icon: HandHeart, match: (p) => p.startsWith("/support") },
  { href: "/community", label: "コミュニティ", icon: Users, match: (p) => p.startsWith("/community") },
  { href: "/mypage", label: "マイページ", icon: User, match: (p) => p.startsWith("/mypage") },
];

export function BottomTabBar() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-30 bg-white/95 backdrop-blur border-t border-warm-border">
      <ul className="flex">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-0.5 py-2 transition ${
                  active ? "text-ember-600" : "text-gray-400"
                }`}
              >
                <Icon size={21} className={active ? "fill-ember-100" : ""} />
                <span className="text-[10px] font-medium leading-none">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
