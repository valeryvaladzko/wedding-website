import type { Request, Response } from "express";
import { findGuestByToken, updateGuestRow } from "../services/sheets";
import { HttpError } from "../middleware/errorHandler";
import type { GuestRecord } from "../types/guest";

const EDITABLE_FIELDS: (keyof GuestRecord)[] = [
  "attendance",
  "soup_choice",
  "meal_choice",
  "alcohol_choice",
  "alcohol_other",
  "second_day",
  "transport_offer",
  "transport_details",
  "additional_notes",
  "rsvp_completed",
  "rsvp_last_step",
];

export async function getGuest(req: Request, res: Response): Promise<void> {
  const token = req.query.token;
  if (typeof token !== "string" || token.length === 0) {
    throw new HttpError(400, "Missing token");
  }

  const guest = await findGuestByToken(token);
  if (!guest) {
    throw new HttpError(404, "Guest not found");
  }

  res.json(guest.data);
}

export async function upsertGuest(req: Request, res: Response): Promise<void> {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const token = body.token;
  if (typeof token !== "string" || token.length === 0) {
    throw new HttpError(400, "Missing token");
  }

  const guest = await findGuestByToken(token);
  if (!guest) {
    throw new HttpError(404, "Guest not found");
  }

  const patch: Partial<GuestRecord> = {};
  for (const key of EDITABLE_FIELDS) {
    const value = body[key];
    if (typeof value === "string") patch[key] = value;
  }

  const updated: GuestRecord = {
    ...guest.data,
    ...patch,
    last_updated: new Date().toISOString(),
  };

  await updateGuestRow(guest.rowIndex, updated);

  res.json({ success: true });
}
