import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { PhoneFrame } from "@/components/layout/PhoneFrame";

export const metadata: Metadata = {
  title: "エールコネクト | 部活動支援プラットフォーム",
  description:
    "応援（Yell）を世代を超えてつなぐ（Connect）。部活動の現役生とOB/OGをつなぐ応援プラットフォームのMVPモックアップ。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f97316",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <StoreProvider>
          <PhoneFrame>{children}</PhoneFrame>
        </StoreProvider>
      </body>
    </html>
  );
}
