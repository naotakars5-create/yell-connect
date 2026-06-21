/** 金額を ¥1,000 形式に */
export function yen(n: number): string {
  return "¥" + n.toLocaleString("ja-JP");
}

/** ISO日時を「6月20日(土) 18:30」形式に */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const w = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${d.getMonth() + 1}月${d.getDate()}日(${w}) ${hh}:${mm}`;
}

/** ISO日時を「6/20(土)」形式に */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  const w = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${d.getMonth() + 1}/${d.getDate()}(${w})`;
}

/** 相対時間「3時間前」など。基準は2026-06-21固定（モック用） */
const NOW = new Date("2026-06-21T12:00:00+09:00").getTime();
export function timeAgo(iso: string): string {
  const diff = NOW - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "たった今";
  if (min < 60) return `${min}分前`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}時間前`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}日前`;
  return formatDate(iso);
}

/** 過去かどうか（スケジュール判定用、基準は固定） */
export function isPast(iso: string): boolean {
  return new Date(iso).getTime() < NOW;
}
