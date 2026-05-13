import { apiClient } from "./client";
import type { Guest, RsvpForm } from "../types/guest";

export async function fetchGuest(token: string): Promise<Guest> {
  const res = await apiClient.get<Guest>("/guest", { params: { token } });
  return res.data;
}

export type RsvpExtras = Partial<{
  rsvp_completed: string;
  rsvp_last_step: string;
}>;

export async function saveRsvp(
  token: string,
  form: RsvpForm,
  extras: RsvpExtras = {},
): Promise<{ success: boolean }> {
  const res = await apiClient.post<{ success: boolean }>("/guest", {
    token,
    ...form,
    ...extras,
  });
  return res.data;
}
