import type { Role } from "@/lib/types";

export function Avatar({
  emoji,
  role,
  size = "md",
}: {
  emoji: string;
  role?: Role;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "w-8 h-8 text-base",
    md: "w-10 h-10 text-xl",
    lg: "w-14 h-14 text-2xl",
  };
  const ring =
    role === "ob"
      ? "ring-2 ring-yell-300"
      : role === "active"
        ? "ring-2 ring-emerald-300"
        : "";
  return (
    <div
      className={`${sizes[size]} ${ring} shrink-0 rounded-full bg-warm-bg border border-warm-border flex items-center justify-center select-none`}
    >
      {emoji}
    </div>
  );
}
