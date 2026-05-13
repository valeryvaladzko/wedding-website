import { drive } from "../config/google";
import type { DrivePhoto } from "../types/guest";

const FOLDER_ID_REGEX = /folders\/([a-zA-Z0-9_-]+)/;

export function extractFolderId(folderUrl: string): string | null {
  const match = folderUrl.match(FOLDER_ID_REGEX);
  return match ? match[1] ?? null : null;
}

export async function listFolderImages(
  folderId: string,
): Promise<DrivePhoto[]> {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
    fields:
      "files(id,name,mimeType,thumbnailLink,webViewLink,webContentLink)",
    pageSize: 200,
    orderBy: "createdTime desc",
  });

  const files = res.data.files ?? [];
  return files
    .filter((f): f is typeof f & { id: string; name: string; mimeType: string } =>
      Boolean(f.id && f.name && f.mimeType),
    )
    .map((f) => {
      const photo: DrivePhoto = {
        id: f.id,
        name: f.name,
        mimeType: f.mimeType,
      };
      if (f.thumbnailLink) photo.thumbnailLink = f.thumbnailLink;
      if (f.webViewLink) photo.webViewLink = f.webViewLink;
      return photo;
    });
}

export async function createGuestFolder(
  name: string,
  parentId: string,
): Promise<string> {
  const res = await drive.files.create({
    requestBody: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId],
    },
  });
  const folderId = res.data.id;
  if (!folderId) throw new Error("Drive did not return folder ID");

  await drive.permissions.create({
    fileId: folderId,
    requestBody: { role: "writer", type: "anyone" },
  });

  return `https://drive.google.com/drive/folders/${folderId}`;
}
