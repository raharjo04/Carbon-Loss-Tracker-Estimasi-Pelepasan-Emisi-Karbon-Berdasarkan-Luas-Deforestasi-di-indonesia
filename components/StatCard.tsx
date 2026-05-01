type StatCardProps = {
  label: string;
  value: string;
  accent?: string;
  icon?: string;
  trend?: "up" | "down" | "neutral";
};

export default function StatCard({
  label,
  value,
  accent = "bg-gradient-to-br from-slate-900 to-slate-800",
  icon,
  trend = "neutral",
}: StatCardProps) {
  const trendColor = {
    up: "text-green-400",
    down: "text-red-400",
    neutral: "text-slate-400",
  };

  const trendIcon = {
    up: "↗",
    down: "↘",
    neutral: "→",
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-xl shadow-slate-900/30 hover-lift glass ${accent} animate-fade-in`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400 font-medium">
            {label}
          </p>
          {icon && (
            <div className="text-2xl opacity-60 group-hover:opacity-80 transition-opacity">
              {icon}
            </div>
          )}
        </div>

        <p className="text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-200">
          {value}
        </p>

        <div className={`flex items-center gap-1 text-sm ${trendColor[trend]}`}>
          <span>{trendIcon[trend]}</span>
          <span className="opacity-80">vs periode sebelumnya</span>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
