export interface GuestRecord {
  token: string;
  name: string;
  attendance?: string;
  soup_choice?: string;
  meal_choice?: string;
  alcohol_choice?: string;
  alcohol_other?: string;
  second_day?: string;
  transport_offer?: string;
  transport_details?: string;
  additional_notes?: string;
  rsvp_completed?: string;
  rsvp_last_step?: string;
  drive_folder_url?: string;
  guest_description?: string;
  image_name?: string;
  party_order?: string;
  last_updated?: string;
  [key: string]: string | undefined;
}

export interface GuestRow {
  rowIndex: number;
  data: GuestRecord;
}

export interface PartyMember {
  name: string;
  description: string;
  imageName?: string;
  status: "pending" | "accepted" | "declined";
}

export interface DrivePhoto {
  id: string;
  name: string;
  thumbnailLink?: string;
  webViewLink?: string;
  mimeType: string;
}
