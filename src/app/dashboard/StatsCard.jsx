"use client";

export default function StatsCard({
  title,
  value,
  icon,
  color = "text-cyan-500",
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <span className={`text-xl ${color}`}>
          {icon}
        </span>

        <h3 className="text-sm font-medium text-slate-600">
          {title}
        </h3>
      </div>

      <h2 className="text-4xl font-black text-slate-900">
        {value}
      </h2>
    </div>
  );
}