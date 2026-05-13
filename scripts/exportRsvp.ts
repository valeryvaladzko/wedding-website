import fs from "fs";
import path from "path";
import { getAllGuests } from "./lib/sheets";

const OUTPUT = path.resolve(__dirname, "rsvp-export.csv");

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

async function main(): Promise<void> {
  const guests = await getAllGuests();

  const headers = [
    "token",
    "name",
    "attendance",
    "meal_choice",
    "plus_one_name",
    "additional_notes",
    "last_updated",
  ];

  const lines = [headers.join(",")];
  for (const g of guests) {
    const row = headers.map((h) => csvEscape(g.data[h] ?? ""));
    lines.push(row.join(","));
  }

  fs.writeFileSync(OUTPUT, lines.join("\n"), "utf8");

  const attending = guests.filter((g) => g.data.attendance === "yes").length;
  const declined = guests.filter((g) => g.data.attendance === "no").length;
  const meat = guests.filter((g) => g.data.meal_choice === "meat").length;
  const veg = guests.filter((g) => g.data.meal_choice === "veg").length;

  console.log(`Exported ${guests.length} guests to ${OUTPUT}`);
  console.log(
    `  attending=${attending}  declined=${declined}  meat=${meat}  veg=${veg}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
