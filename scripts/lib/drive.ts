import { drive } from "./google";

export async function createPublicFolder(
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
  if (!folderId) throw new Error("Drive did not return a folder id");

  await drive.permissions.create({
    fileId: folderId,
    requestBody: { role: "writer", type: "anyone" },
  });

  return `https://drive.google.com/drive/folders/${folderId}`;
}
