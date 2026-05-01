import fs from "fs";
import path from "path";
import unzipper from "unzipper";
import { parse } from "csv-parse/sync";
import { DeforestationRecord } from "./types";
import { emissionFactorPerHa } from "./data";

const zipFilePath = path.join(process.cwd(), "csv_indonesia.zip");
const provinceTreeCoverLossCsv = "csv_indonesia/Province_Tree_Cover_Loss.csv";

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return 0;
  const normalized = value.trim().replace(/\./g, "").replace(/,/g, ".");
  return Number(normalized) || 0;
}

export async function getDeforestationDataFromZip(): Promise<
  DeforestationRecord[]
> {
  if (!fs.existsSync(zipFilePath)) {
    throw new Error(`Zip file not found: ${zipFilePath}`);
  }

  const archive = await unzipper.Open.file(zipFilePath);
  const entry = archive.files.find(
    (file) => file.path === provinceTreeCoverLossCsv,
  );
  if (!entry) {
    throw new Error(
      `CSV file not found in archive: ${provinceTreeCoverLossCsv}`,
    );
  }

  const content = await entry.buffer();
  const text = content.toString("utf-8");
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
  }) as Record<string, string>[];

  const yearColumns = Object.keys(records[0] || {})
    .filter((column) => column.startsWith("Tree Loss ha "))
    .map((column) => ({
      column,
      year: Number(column.replace("Tree Loss ha ", "")),
    }))
    .filter((item) => Number.isInteger(item.year));

  const data: DeforestationRecord[] = [];

  for (const record of records) {
    const province = record["Province"]?.trim();
    if (!province || province.toLowerCase() === "indonesia") continue;

    for (const yearColumn of yearColumns) {
      const areaHa = toNumber(record[yearColumn.column]);
      if (areaHa <= 0) continue;

      data.push({
        year: yearColumn.year,
        province,
        areaHa,
        carbonEmissionTon: Number((areaHa * emissionFactorPerHa).toFixed(2)),
      });
    }
  }

  return data;
}
