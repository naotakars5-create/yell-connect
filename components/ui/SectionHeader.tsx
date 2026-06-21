import type { LucideIcon } from "lucide-react";

export function SectionHeader({
  icon: Icon,
  title,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="flex items-center gap-1.5 text-base font-bold text-gray-800">
        {Icon && <Icon size={18} className="text-yell-500" />}
        {title}
      </h2>
      {action}
    </div>
  );
}
