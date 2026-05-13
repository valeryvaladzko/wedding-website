import type { Request, Response } from "express";
import { findGuestByToken } from "../services/sheets";
import { extractFolderId, listFolderImages } from "../services/drive";
import { HttpError } from "../middleware/errorHandler";

export async function listGuestPhotos(
  req: Request,
  res: Response,
): Promise<void> {
  const token = req.query.token;
  if (typeof token !== "string" || token.length === 0) {
    throw new HttpError(400, "Missing token");
  }

  const guest = await findGuestByToken(token);
  if (!guest) {
    throw new HttpError(404, "Guest not found");
  }

  const folderUrl = guest.data.drive_folder_url;
  if (!folderUrl) {
    res.json({ photos: [] });
    return;
  }

  const folderId = extractFolderId(folderUrl);
  if (!folderId) {
    throw new HttpError(500, "Invalid drive folder URL on guest record");
  }

  const photos = await listFolderImages(folderId);
  res.json({ photos });
}
