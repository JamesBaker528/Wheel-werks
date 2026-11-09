import "server-only";
import sharp from "sharp";
import { UPLOAD } from "@/lib/quote";

/** Identify image type from magic bytes — never trust the client-declared MIME type or filename. */
export function sniffImage(b: Uint8Array): "jpeg" | "png" | "webp" | null {
  if (b.length < 12) return null;
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpeg";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "png";
  const ascii = (s: number, e: number) => String.fromCharCode(...b.slice(s, e));
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "webp";
  return null;
}

export type CleanFile = { filename: string; mime: string; content: Buffer };

/**
 * Fully decodes every upload and re-encodes it as a fresh JPEG: proves it is a real image,
 * strips ALL metadata (EXIF, GPS, XMP, ICC) and normalises orientation and size.
 */
export async function readPhotos(files: File[]): Promise<{ files: CleanFile[]; error?: string }> {
  if (files.length > UPLOAD.maxFiles) return { files: [], error: `Please attach up to ${UPLOAD.maxFiles} photos.` };
  let total = 0;
  const out: CleanFile[] = [];
  for (const [i, f] of files.entries()) {
    if (f.size > UPLOAD.maxFileBytes) return { files: [], error: "One of the photos is too large." };
    total += f.size;
    if (total > UPLOAD.maxTotalBytes) return { files: [], error: "Photos are too large in total — please attach fewer." };
    const buf = Buffer.from(await f.arrayBuffer());
    if (!sniffImage(buf)) return { files: [], error: "Photos must be JPG, PNG or WebP images." };
    try {
      const content = await sharp(buf, { limitInputPixels: 40_000_000, failOn: "error" })
        .rotate() // apply EXIF orientation before metadata is dropped
        .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true }) // sharp drops metadata unless .withMetadata() is called
        .toBuffer();
      out.push({ filename: `photo-${i + 1}.jpg`, mime: "image/jpeg", content });
    } catch {
      return { files: [], error: "One of the photos couldn't be read. Please try a different photo." };
    }
  }
  return { files: out };
}
