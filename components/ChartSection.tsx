"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DeforestationRecord } from "../lib/types";

const pieColors = ["#38bdf8", "#60a5fa", "#2563eb", "#4338ca", "#8b5cf6"];

type ChartSectionProps = {
  trendData: Array<{ year: number; areaHa: number; carbonEmissionTon: number }>;
  regionData: Array<{
    province: string;
    areaHa: number;
    carbonEmissionTon: number;
  }>;
};

export default function ChartSection({
  trendData,
  regionData,
}: ChartSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-xl shadow-slate-900/30 hover-lift glass bg-gradient-to-br from-slate-900/50 to-slate-800/50 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <h3 className="mb-6 text-xl font-bold text-white gradient-text">
              Tren Deforestasi per Tahun
            </h3>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="year"
                    stroke="#94a3b8"
                    fontSize={12}
                    tick={{ fill: "#94a3b8" }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tick={{ fill: "#94a3b8" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#e2e8f0",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="areaHa"
                    name="Luas (ha)"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    dot={{ fill: "#38bdf8", strokeWidth: 2, r: 4 }}
                    activeDot={{
                      r: 6,
                      stroke: "#38bdf8",
                      strokeWidth: 2,
                      fill: "#0f172a",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="carbonEmissionTon"
                    name="Emisi CO₂"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={{ fill: "#60a5fa", strokeWidth: 2, r: 4 }}
                    activeDot={{
                      r: 6,
                      stroke: "#60a5fa",
                      strokeWidth: 2,
                      fill: "#0f172a",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Decorative gradient overlay */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="group relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-xl shadow-slate-900/30 hover-lift glass bg-gradient-to-br from-slate-900/50 to-slate-800/50 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <h3 className="mb-6 text-xl font-bold text-white gradient-text">
              Komposisi Emisi per Wilayah
            </h3>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData}
                    dataKey="carbonEmissionTon"
                    nameKey="province"
                    innerRadius={65}
                    outerRadius={110}
                    paddingAngle={5}
                    stroke="#0f172a"
                  >
                    {regionData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.province}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#e2e8f0",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Decorative gradient overlay */}
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-xl shadow-slate-900/30 hover-lift glass bg-gradient-to-br from-slate-900/50 to-slate-800/50 animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <h3 className="mb-6 text-xl font-bold text-white gradient-text">
            Laju Deforestasi per Tahun
          </h3>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="year"
                  stroke="#94a3b8"
                  fontSize={12}
                  tick={{ fill: "#94a3b8" }}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tick={{ fill: "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#e2e8f0",
                    backdropFilter: "blur(10px)",
                  }}
                />
                <Bar
                  dataKey="areaHa"
                  name="Luas (ha)"
                  fill="#60a5fa"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}
