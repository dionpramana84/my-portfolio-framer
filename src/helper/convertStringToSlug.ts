export default function ConvertStringToSlug(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}
