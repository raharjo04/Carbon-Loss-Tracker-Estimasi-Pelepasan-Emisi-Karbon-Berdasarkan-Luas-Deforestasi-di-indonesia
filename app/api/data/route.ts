import { NextResponse } from "next/server";
import { sampleDeforestationData } from "../../../lib/data";
import { getDeforestationData } from "../../../lib/db";
import { getDeforestationDataFromZip } from "../../../lib/csvLoader";

export async function GET() {
  if (process.env.POSTGRES_URL) {
    try {
      const rows = await getDeforestationData();
      return NextResponse.json(rows);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("PostgreSQL query failed:", message);
    }
  }

  try {
    const zipRows = await getDeforestationDataFromZip();
    return NextResponse.json(zipRows);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("CSV zip fallback failed:", message);
  }

  return NextResponse.json(sampleDeforestationData);
}
