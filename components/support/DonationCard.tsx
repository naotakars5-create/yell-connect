"use client";

import { useState } from "react";
import { Coins, Heart } from "lucide-react";
import { yen } from "@/lib/format";

const presets = [1000, 3000, 5000];

export function DonationCard({ onDonate }: { onDonate: (amount: number) => void }) {
  const [custom, setCustom] = useState("");

  const submitCustom = () => {
    const n = parseInt(custom, 10);
    if (!Number.isFinite(n) || n < 100) return;
    onDonate(n);
    setCustom("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-card p-4">
      <div className="flex items-center gap-1.5 mb-1">
        <Coins size={18} className="text-yell-500" />
        <h3 className="font-bold text-sm text-gray-800">金額で応援する</h3>
      </div>
      <p className="text-[11px] text-gray-400 mb-3">
        1,000円から、ワンタップで気持ちを届けられます。
      </p>

      <div className="grid grid-cols-3 gap-2">
        {presets.map((amount) => (
          <button
            key={amount}
            onClick={() => onDonate(amount)}
            className="rounded-xl border-2 border-yell-200 bg-yell-50 py-3 text-center active:scale-95 transition hover:border-yell-400"
          >
            <div className="text-base font-extrabold text-yell-700">{yen(amount)}</div>
            <div className="text-[10px] text-gray-400">タップで支援</div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1 flex items-center rounded-xl bg-warm-bg border border-warm-border px-3">
          <span className="text-gray-400 text-sm">¥</span>
          <input
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && submitCustom()}
            inputMode="numeric"
            placeholder="自由入力"
            className="w-full bg-transparent py-2.5 px-1 text-sm outline-none"
          />
        </div>
        <button
          onClick={submitCustom}
          disabled={!custom}
          className="flex items-center gap-1 rounded-xl bg-yell-gradient px-4 py-2.5 text-white text-sm font-bold disabled:opacity-40 active:scale-95 transition"
        >
          <Heart size={14} />
          支援
        </button>
      </div>
    </div>
  );
}
