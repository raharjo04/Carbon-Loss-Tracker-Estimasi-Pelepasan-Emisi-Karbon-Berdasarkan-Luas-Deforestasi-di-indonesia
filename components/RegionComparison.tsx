import { DeforestationRecord } from "../lib/types";

export default function RegionComparison({
  data,
}: {
  data: DeforestationRecord[];
}) {
  const summary = data.reduce<
    Record<string, { areaHa: number; emissionTon: number }>
  >((acc, record) => {
    if (!acc[record.province]) {
      acc[record.province] = { areaHa: 0, emissionTon: 0 };
    }
    acc[record.province].areaHa += record.areaHa;
    acc[record.province].emissionTon += record.carbonEmissionTon;
    return acc;
  }, {});

  const regions = Object.entries(summary).sort(
    (a, b) => b[1].areaHa - a[1].areaHa,
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-slate-900/20">
      <h2 className="text-lg font-semibold text-white">Perbandingan Wilayah</h2>
      <div className="mt-6 space-y-4">
        {regions.map(([province, summaryData]) => (
          <div
            key={province}
            className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold text-white">{province}</p>
              <p>
                {(
                  summaryData.emissionTon / Math.max(summaryData.areaHa, 1)
                ).toFixed(1)}{" "}
                ton CO₂ / ha
              </p>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 text-slate-300 sm:grid-cols-3">
              <span>Total luas: {summaryData.areaHa.toLocaleString()} ha</span>
              <span>
                Total emisi:{" "}
                {summaryData.emissionTon.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}{" "}
                ton
              </span>
              <span>
                Emisi per ha:{" "}
                {(
                  summaryData.emissionTon / Math.max(summaryData.areaHa, 1)
                ).toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
