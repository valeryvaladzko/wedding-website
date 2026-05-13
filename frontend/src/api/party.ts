import { apiClient } from "./client";
import type { PartyMember } from "../types/party";

export async function fetchPartyMembers(): Promise<PartyMember[]> {
  const res = await apiClient.get<PartyMember[]>("/party");
  return res.data;
}
