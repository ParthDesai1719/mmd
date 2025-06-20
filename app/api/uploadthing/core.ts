import { createUploadthing, type FileRouter } from "uploadthing/next";
import { uploadToR2 } from "@/lib/r2";
import { v4 as uuidv4 } from "uuid";
import { saveMetadata } from "@/lib/metadata";

const f = createUploadthing();

export const ourFileRouter = {
  r2Uploader: f({ image: { maxFileSize: "8MB" }, blob: { maxFileSize: "16MB" } })
    .onUploadComplete(async ({ file }) => {
      const uuid = uuidv4();
      const key = `${uuid}/${file.name}`;
      const fileRes = await fetch(file.url);
      const buffer = Buffer.from(await fileRes.arrayBuffer());

      await uploadToR2(buffer, key, file.type);

      saveMetadata({
        uuid,
        filename: file.name,
        size: buffer.length,
        mimetype: file.type,
        createdAt: new Date().toISOString(),
      });

      return { url: `/f/${uuid}/${file.name}` };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// Export handler required by UploadThing (default export for App Router)
import { createRouteHandler } from "uploadthing/next";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
