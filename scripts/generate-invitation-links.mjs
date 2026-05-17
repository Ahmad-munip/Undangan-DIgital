import fs from "node:fs";
import path from "node:path";

const [, , inputFile = "guests.csv", baseUrl = "https://domain-undangan-kamu.com/"] = process.argv;
const inputPath = path.resolve(inputFile);
const outputPath = path.resolve("invitation-links.csv");

if (!fs.existsSync(inputPath)) {
  console.error(`File tidak ditemukan: ${inputPath}`);
  console.error("Export Excel ke CSV dulu, lalu jalankan:");
  console.error("npm run links -- guests.csv https://domain-undangan-kamu.com/");
  process.exit(1);
}

const parseCsvLine = (line) => {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
};

const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`;
const cleanName = (name) => String(name ?? "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim();

const lines = fs.readFileSync(inputPath, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
const rows = lines.map(parseCsvLine);
const headers = rows.shift()?.map((header) => header.toLowerCase().trim()) ?? [];
const nameIndex = headers.findIndex((header) => ["nama", "name", "tamu", "guest", "kepada"].includes(header));
const targetNameIndex = nameIndex >= 0 ? nameIndex : 0;

const output = [["nama", "link"]];

for (const row of rows) {
  const name = cleanName(row[targetNameIndex]);
  if (!name) continue;

  const url = new URL(baseUrl);
  url.searchParams.set("to", name);
  output.push([name, url.toString()]);
}

fs.writeFileSync(outputPath, output.map((row) => row.map(escapeCsv).join(",")).join("\n"));
console.log(`Selesai: ${output.length - 1} link dibuat di ${outputPath}`);
