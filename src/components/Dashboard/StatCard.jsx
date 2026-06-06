import { Card } from "@heroui/react";

export default function StatCard({
  icon,
  label,
  value,
  trend = null,
  trendType = "neutral",
  gradientFrom = "from-blue-600",
  gradientTo = "to-purple-600",
  isLoading = false,
  variant = "default",
}) {
  const trendColor = {
    positive: "text-emerald-600 dark:text-emerald-400",
    negative: "text-red-500 dark:text-red-400",
    neutral: "text-gray-400 dark:text-gray-500",
  }[trendType];

  return (
    <Card
      variant={variant}
      className="
        h-full
        bg-white/80 dark:bg-gray-900/60
        backdrop-blur-md
        border border-gray-200/80 dark:border-gray-700/50
        hover:border-gray-300 dark:hover:border-gray-600/70
        hover:shadow-md dark:hover:shadow-purple-500/10
        transition-all duration-300
      "
    >
      {/* ── Header: Icon + Trend ─────────────────────────────────────────── */}

      <Card.Header className="flex items-center justify-between gap-4 pb-2">
        {/* Icon container — gradient bg is separate from icon */}
        <div className="relative w-11 h-11 shrink-0">
          {/* Background layer (low opacity) */}
          <div
            className={`
        absolute inset-0 rounded-xl
        bg-linear-to-br ${gradientFrom} ${gradientTo}
        opacity-20 dark:opacity-15
      `}
          />

          {/* Icon layer (full opacity) */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-700 dark:text-gray-200">
            {icon}
          </div>
        </div>

        {/* Trend badge — Now outside the icon container, so justify-between works perfectly */}
        {trend && (
          <span className={`text-xs font-semibold ${trendColor}`}>{trend}</span>
        )}
      </Card.Header>

      {/* ── Content: Label + Value ────────────────────────────────────────── */}
      <Card.Content className="flex flex-col gap-1 pt-0">
        <Card.Description className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
          {label}
        </Card.Description>

        {isLoading ? (
          <div className="h-9 rounded-md animate-pulse bg-gray-200 dark:bg-gray-800/60" />
        ) : (
          <p className="text-3xl font-bold tabular-nums text-gray-900 dark:text-white">
            {value}
          </p>
        )}
      </Card.Content>
    </Card>
  );
}
