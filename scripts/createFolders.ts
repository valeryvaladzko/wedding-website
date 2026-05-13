import { env } from "./lib/env";
import { getAllGuests, setCell } from "./lib/sheets";
import { createPublicFolder } from "./lib/drive";

const FOLDER_URL_COLUMN = "N";

// async function main(): Promise<void> {
//   const guests = await getAllGuests();
//
//   for (const guest of guests) {
//     const { token, name, drive_folder_url } = guest.data;
//     if (!token || drive_folder_url) continue;
//
//     const folderName = `${name ?? "guest"}_${token}`;
//     const url = await createPublicFolder(folderName, env.driveParentFolderId);
//     console.log(`Created folder for ${name} (${token}): ${url}`);
//
//     await setCell(guest.rowIndex, FOLDER_URL_COLUMN, url);
//   }
//
//   console.log("Done.");
// }

async function main(): Promise<void> {
  const guests = await getAllGuests();

  for (const guest of guests) {
    const { token, name } = guest.data;

    console.log(`someURL?token=${token} ${name}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
