export default function getPublicIdFromUrl(url: string): string | null {
  try {
    const parts = url.split("/");
    const filename = parts.pop()?.split(".")[0]; // remove file extension
    const folder = parts.slice(parts.indexOf("upload") + 1).join("/"); // everything after 'upload/'
    return folder + "/" + filename;
  } catch {
    return null;
  }
}
