"use client";

import { CalendarHeart, MapPin, Users, Clock, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import type { ObEvent } from "@/lib/types";
import { formatDateTime, isPast } from "@/lib/format";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CommunityNav } from "@/components/community/CommunityNav";

const kindBadge: Record<ObEvent["kind"], string> = {
  観戦会: "bg-ember-100 text-ember-700",
  OB戦: "bg-yell-100 text-yell-700",
  懇親会: "bg-violet-100 text-violet-700",
};

function EventCard({ ev }: { ev: ObEvent }) {
  const { role, toggleJoinEvent } = useStore();
  const full = ev.participants >= ev.capacity && !ev.joined;
  const past = isPast(ev.date);

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="flex items-center gap-3 bg-yell-gradient-soft p-3.5">
        <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white text-2xl shadow-sm">
          {ev.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${kindBadge[ev.kind]}`}>
            {ev.kind}
          </span>
          <h3 className="font-bold text-sm text-gray-800 leading-snug mt-1">{ev.title}</h3>
        </div>
      </div>

      <div className="p-3.5 space-y-2">
        <div className="flex items-center gap-1.5 text-[12px] text-gray-600">
          <Clock size={13} className="text-gray-400" />
          {formatDateTime(ev.date)}
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-gray-600">
          <MapPin size={13} className="text-gray-400" />
          {ev.place}
        </div>
        <div className="text-[11px] text-gray-400">主催：{ev.hostName}</div>

        {/* 参加状況 */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="flex items-center gap-1 text-gray-500">
              <Users size={12} />
              参加 <span className="font-bold text-gray-700">{ev.participants}</span> / {ev.capacity}名
            </span>
            {full && <span className="text-ember-600 font-bold">満員間近</span>}
          </div>
          <ProgressBar value={ev.participants} max={ev.capacity} />
        </div>

        {role === "ob" ? (
          <button
            onClick={() => toggleJoinEvent(ev.id)}
            disabled={past || full}
            className={`w-full text-sm font-bold py-2.5 rounded-full mt-1 transition active:scale-95 ${
              past
                ? "bg-gray-100 text-gray-400"
                : ev.joined
                  ? "bg-emerald-500 text-white"
                  : full
                    ? "bg-gray-100 text-gray-400"
                    : "bg-yell-gradient text-white shadow-card"
            }`}
          >
            {past ? (
              "開催終了"
            ) : ev.joined ? (
              <span className="flex items-center justify-center gap-1">
                <Check size={15} /> 参加予定（タップで取消）
              </span>
            ) : full ? (
              "満員です"
            ) : (
              "このイベントに参加する"
            )}
          </button>
        ) : (
          <div className="text-center text-[11px] text-gray-400 mt-1 py-2">
            OB/OG限定のイベントです
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const { events } = useStore();
  const sorted = [...events].sort((a, b) => +new Date(a.date) - +new Date(b.date));

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-2">
        <CalendarHeart size={22} className="text-yell-500" />
        <h1 className="text-lg font-extrabold text-gray-800">OB/OGイベント</h1>
      </div>

      <CommunityNav />

      <div className="space-y-3">
        {sorted.map((ev) => (
          <EventCard key={ev.id} ev={ev} />
        ))}
      </div>
    </div>
  );
}
