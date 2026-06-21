import type { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { BottomTabBar } from "./BottomTabBar";

/** デスクトップでもスマホ画面に見えるよう、中央に縦長フレームを置く */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell-bg min-h-screen flex justify-center sm:py-6">
      <div className="relative flex flex-col w-full max-w-md min-h-screen sm:min-h-[calc(100vh-3rem)] sm:max-h-[920px] sm:rounded-[2rem] sm:shadow-2xl sm:border sm:border-warm-border bg-warm-bg overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto no-scrollbar pb-4">{children}</main>
        <BottomTabBar />
      </div>
    </div>
  );
}
