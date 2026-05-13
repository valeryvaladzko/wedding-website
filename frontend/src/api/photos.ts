import { apiClient } from "./client";
import type { DrivePhoto } from "../types/guest";

export async function fetchPhotos(token: string): Promise<DrivePhoto[]> {
  const res = await apiClient.get<{ photos: DrivePhoto[] }>("/photos", {
    params: { token },
  });
  return res.data.photos;
}
