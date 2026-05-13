export type PartyStatus = "pending" | "accepted" | "declined";

export interface PartyMember {
  name: string;
  role: string;
  description: string;
  imageName?: string;
  status: PartyStatus;
}
