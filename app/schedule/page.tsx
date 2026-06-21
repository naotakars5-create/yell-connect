"use client";

import { ArrowLeft, MapPin, Eye, Trophy, Dumbbell, Swords, Award } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatDateTime, isPast } from "@/lib/format";
import type { ScheduleEvent } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";

const typeMeta: Record<ScheduleEvent["type"], { icon: typeof Trophy; color: string }> = {
  練習: { icon: Dumbbell, color: "bg-yell-100 text-yell-700" },
  試合: { icon: Swords, color: "bg-ember-100 text-ember-700" },
  大会: { icon: Award, color: "bg-violet-100 text-violet-700" },
};

function UpcomingCard({ ev }: { ev: ScheduleEvent }) {
  const { role, watchedEvents, toggleWatch } = useStore();
  const watched = watchedEvents.has(ev.id);
  const meta = typeMeta[ev.type];
  const Icon = meta.icon;
  const watchers = ev.watchers + (watched ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl shadow-card p-3.5">
      <div className="flex items-center gap-2 mb-2">
        <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${meta.color}`}>
          <Icon size={12} />
          {ev.type}
        </span>
        <span className="text-xs font-bold text-gray-600">{formatDateTime(ev.date)}</span>
      </div>
      <h3 className="font-bold text-sm text-gray-800 leading-snug">{ev.title}</h3>
      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
        <MapPin size={12} />
        {ev.place}
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="flex items-center gap-1 text-[11px] text-gray-500">
          <Eye size={13} />
          観戦予定 <span className="font-bold text-gray-700">{watchers}</span>名
        </span>
        {role === "ob" && (
          <button
            onClick={() => toggleWatch(ev.id)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full transition active:scale-95 ${
              watched
                ? "bg-emerald-500 text-white"
                : "bg-yell-gradient text-white shadow-card"
            }`}
          >
            {watched ? "観戦予定に登録済み ✓" : "観戦予定にする"}
          </button>
        )}
      </div>
    </div>
  );
}

function ResultCard({ ev }: { ev: ScheduleEvent }) {
  const outcomeColor =
    ev.result?.outcome === "勝"
      ? "bg-ember-500"
      : ev.result?.outcome === "負"
        ? "bg-gray-400"
        : "bg-yell-500";
  return (
    <div className="bg-white rounded-2xl shadow-card p-3.5 flex items-center gap-3">
      <div className={`grid place-items-center w-11 h-11 rounded-xl text-white font-extrabold ${outcomeColor}`}>
        {ev.result?.outcome}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-[13px] text-gray-800 truncate">{ev.title}</h3>
        <div className="text-[11px] text-gray-400">{formatDateTime(ev.date)}</div>
        {ev.result?.note && (
          <div className="text-[11px] text-yell-600 mt-0.5">{ev.result.note}</div>
        )}
      </div>
      <div className="text-right shrink-0">
        <div className="text-base font-extrabold text-gray-800">{ev.result?.score}</div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  const { schedule } = useStore();
  const upcoming = schedule
    .filter((e) => !isPast(e.date))
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const past = schedule
    .filter((e) => isPast(e.date))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className="px-4 py-4 space-y-5">
      <div className="flex items-center gap-2">
        <Link href="/feed" className="grid place-items-center w-8 h-8 rounded-full hover:bg-white">
          <ArrowLeft size={18} className="text-gray-600" />
        </Link>
        <h1 className="text-lg font-extrabold text-gray-800">スケジュール</h1>
      </div>

      <section>
        <SectionHeader title="今後の予定" />
        <div className="space-y-3">
          {upcoming.map((ev) => (
            <UpcomingCard key={ev.id} ev={ev} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader icon={Trophy} title="過去の結果（アーカイブ）" />
        <div className="space-y-2.5">
          {past.map((ev) => (
            <ResultCard key={ev.id} ev={ev} />
          ))}
        </div>
      </section>
    </div>
  );
}
