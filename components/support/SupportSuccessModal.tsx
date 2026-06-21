"use client";

import { CheckCircle2, X, Heart } from "lucide-react";
import { yen } from "@/lib/format";

export interface SupportPayload {
  label: string;
  emoji: string;
  amount: number;
  kind: "物品支援" | "金額支援";
}

export function SupportSuccessModal({
  payload,
  onClose,
}: {
  payload: SupportPayload | null;
  onClose: () => void;
}) {
  if (!payload) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 pt-8 animate-slide-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="閉じる"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full bg-yell-gradient-soft flex items-center justify-center text-4xl">
              {payload.emoji}
            </div>
            <CheckCircle2
              size={32}
              className="absolute -bottom-1 -right-1 text-emerald-500 fill-white"
            />
          </div>

          <h3 className="text-lg font-bold text-gray-800">支援が完了しました！</h3>
          <p className="mt-1 text-sm text-gray-500">
            {payload.kind === "物品支援"
              ? "メーカーから学校へ直送されます"
              : "あなたの応援が部活に届きました"}
          </p>

          <div className="mt-5 w-full rounded-2xl bg-warm-bg p-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{payload.kind}</span>
              <span className="text-sm font-medium text-gray-700">{payload.label}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-warm-border pt-2">
              <span className="text-sm text-gray-500">支援額</span>
              <span className="text-xl font-bold text-ember-600">{yen(payload.amount)}</span>
            </div>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-xs text-yell-600 font-medium">
            <Heart size={14} className="fill-yell-500 text-yell-500" />
            あなたの応援が、未来の誰かを大きく変える。
          </p>

          <button
            onClick={onClose}
            className="mt-5 w-full rounded-full bg-yell-gradient py-3 text-white font-bold shadow-card active:scale-[0.98] transition"
          >
            閉じる
          </button>
          <p className="mt-2 text-[10px] text-gray-400">
            ※これはデモ用のダミー決済です。実際の課金は発生しません。
          </p>
        </div>
      </div>
    </div>
  );
}
