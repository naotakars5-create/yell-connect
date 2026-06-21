/** 写真の代替: グラデーション背景 + 絵文字のプレースホルダー（ネット接続不要） */
export function MediaPlaceholder({
  emoji,
  bg = "from-yell-400 to-ember-500",
  className = "",
  ratio = "aspect-[4/3]",
  size = "text-6xl",
}: {
  emoji: string;
  bg?: string;
  className?: string;
  ratio?: string;
  size?: string;
}) {
  return (
    <div
      className={`relative ${ratio} w-full bg-gradient-to-br ${bg} flex items-center justify-center overflow-hidden ${className}`}
    >
      <span className={`${size} drop-shadow-sm select-none`}>{emoji}</span>
      <div className="absolute top-2 right-2 text-[10px] font-medium text-white/80 bg-black/15 px-1.5 py-0.5 rounded">
        PHOTO
      </div>
    </div>
  );
}
