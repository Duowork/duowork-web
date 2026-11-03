/** Browser-only helpers for handing a tool's result to the visitor. */

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  // Revoked late: mobile browsers can start reading the blob after the click.
  window.setTimeout(() => URL.revokeObjectURL(url), 60000);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

const LOGO_MAX_EDGE = 480;
const LOGO_MAX_BYTES = 8 * 1024 * 1024;

/**
 * Reads a logo into a small PNG data URL, in the browser only. Shrinking it
 * keeps the draft within session storage, and PNG is a format the PDF renderer
 * can always embed, whatever was uploaded.
 */
export async function readLogo(file: File): Promise<string> {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
    throw new Error("Use a PNG, JPG or WebP image for your logo.");
  }
  if (file.size > LOGO_MAX_BYTES) {
    throw new Error("That image is over 8MB. Try a smaller version of your logo.");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("We couldn't read that image. Try saving it as a PNG first.");
  }

  const scale = Math.min(1, LOGO_MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return canvas.toDataURL("image/png");
}
