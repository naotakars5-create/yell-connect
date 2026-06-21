import type { Role } from "@/lib/types";

export function RoleBadge({ role }: { role: Role }) {
  if (role === "ob") {
    return (
      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yell-100 text-yell-700">
        OB/OG
      </span>
    );
  }
  return (
    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
      現役生
    </span>
  );
}
