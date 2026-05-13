export type Attendance = "yes" | "no" | "";
export type SoupChoice = "" | "borscht" | "cheese" | "salmon" | "vegetables";
export type MealChoice = "" | "beef" | "pork" | "chicken" | "fish" | "veg";
export type AlcoholChoice =
  | ""
  | "wine"
  | "vodka"
  | "whiskey"
  | "soft"
  | "other";
export type SecondDay = "" | "yes" | "no" | "maybe";
export type TransportOffer = "" | "yes" | "no";

export interface Guest {
  token: string;
  name: string;
  attendance?: Attendance;
  soup_choice?: SoupChoice;
  meal_choice?: MealChoice;
  alcohol_choice?: AlcoholChoice;
  alcohol_other?: string;
  second_day?: SecondDay;
  transport_offer?: TransportOffer;
  transport_details?: string;
  additional_notes?: string;
  rsvp_completed?: string;
  rsvp_last_step?: string;
  drive_folder_url?: string;
  last_updated?: string;
}

export interface RsvpForm {
  attendance: Attendance;
  soup_choice: SoupChoice;
  meal_choice: MealChoice;
  alcohol_choice: AlcoholChoice;
  alcohol_other: string;
  second_day: SecondDay;
  transport_offer: TransportOffer;
  transport_details: string;
  additional_notes: string;
}

export interface DrivePhoto {
  id: string;
  name: string;
  thumbnailLink?: string;
  webViewLink?: string;
  mimeType: string;
}
