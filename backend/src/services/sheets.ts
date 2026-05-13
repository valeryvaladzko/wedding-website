import { sheets } from "../config/google";
import { env } from "../config/env";
import type { GuestRecord, GuestRow, PartyMember } from "../types/guest";

function attendanceToStatus(value: string | undefined): PartyMember["status"] {
  if (value === "yes") return "accepted";
  if (value === "no") return "declined";
  return "pending";
}

function isTruthy(value: string | undefined): boolean {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes" || v === "y";
}

async function readAllRows(): Promise<{
  headers: string[];
  rows: string[][];
}> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: env.spreadsheetId,
    range: env.sheetName,
  });
  const all = res.data.values ?? [];
  const headers = (all[0] ?? []) as string[];
  const rows = all.slice(1) as string[][];
  return { headers, rows };
}

function rowToRecord(headers: string[], row: string[]): GuestRecord {
  const obj: GuestRecord = { token: "", name: "" };
  headers.forEach((h, i) => {
    obj[h] = row[i] ?? "";
  });
  return obj;
}

export async function findGuestByToken(
  token: string,
): Promise<GuestRow | null> {
  const { headers, rows } = await readAllRows();
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;
    const data = rowToRecord(headers, row);
    if (data.token === token) {
      return { rowIndex: i + 2, data };
    }
  }
  return null;
}

export async function updateGuestRow(
  rowIndex: number,
  updated: GuestRecord,
): Promise<void> {
  const headersRes = await sheets.spreadsheets.values.get({
    spreadsheetId: env.spreadsheetId,
    range: `${env.sheetName}!1:1`,
  });
  const headers = (headersRes.data.values?.[0] ?? []) as string[];
  if (headers.length === 0) {
    throw new Error("Spreadsheet has no header row");
  }
  const row = headers.map((h) => updated[h] ?? "");
  await sheets.spreadsheets.values.update({
    spreadsheetId: env.spreadsheetId,
    range: `${env.sheetName}!A${rowIndex}`,
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}

export async function getAllGuests(): Promise<GuestRecord[]> {
  const { headers, rows } = await readAllRows();
  return rows.map((row) => rowToRecord(headers, row));
}

export async function getPartyMembers(): Promise<PartyMember[]> {
  const guests = await getAllGuests();
  guests.sort((a, b) => {
    const ao = parseInt(a.party_order ?? "", 10);
    const bo = parseInt(b.party_order ?? "", 10);
    const aValid = !Number.isNaN(ao);
    const bValid = !Number.isNaN(bo);
    if (aValid && bValid) return ao - bo;
    if (aValid) return -1;
    if (bValid) return 1;
    return a.name.localeCompare(b.name);
  });
  return guests.map((g) => {
    const member: PartyMember = {
      name: g.name,
      description: g.guest_description ?? "",
      status: attendanceToStatus(g.attendance),
    };
    if (g.image_name) member.imageName = g.image_name;
    return member;
  });
}
