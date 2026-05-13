import type { Request, Response } from "express";
import { getPartyMembers } from "../services/sheets";

export async function listParty(_req: Request, res: Response): Promise<void> {
  const members = await getPartyMembers();
  res.json(members);
}
