import "server-only";
import { UPLOAD } from "@/lib/quote";

/** Identify image type from magic bytes — never trust the client-declared MIME type or filename. */
export function sniffImage(buf: Uint8Array): { mime: string; ext: string } | null {
  const b = buf;
  if (b.length < 12) return null;
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { mime: "image/jpeg", ext: "jpg" };
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return { mime: "image/png", ext: "png" };
  const ascii = (s: number, e: number) => String.fromCharCode(...b.slice(s, e));
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return { mime: "image/webp", ext: "webp" };
  if (ascii(4, 8) === "ftyp" && /^(heic|heix|hevc|heim|heis|mif1|msf1)$/.test(ascii(8, 12))) return { mime: "image/heic", ext: "heic" };
  return null;
}

export type CleanFile = { filename: string; mime: string; content: Buffer };

export async function readPhotos(files: File[]): Promise<{ files: CleanFile[]; error?: string }> {
  if (files.length > UPLOAD.maxFiles) return { files: [], error: `Please attach up to ${UPLOAD.maxFiles} photos.` };
  let total = 0;
  const out: CleanFile[] = [];
  for (const [i, f] of files.entries()) {
    if (f.size > UPLOAD.maxFileBytes) return { files: [], error: "One of the photos is too large." };
    total += f.size;
    if (total > UPLOAD.maxTotalBytes) return { files: [], error: "Photos are too large in total — please attach fewer." };
    const buf = Buffer.from(await f.arrayBuffer());
    const t = sniffImage(buf);
    if (!t) return { files: [], error: "Photos must be JPG, PNG, WebP or HEIC images." };
    // Server-generated name: user filenames are discarded entirely.
    out.push({ filename: `photo-${i + 1}.${t.ext}`, mime: t.mime, content: buf });
  }
  return { files: out };
}
