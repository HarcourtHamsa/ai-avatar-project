export function extractNumber(text) {
  const match = text.match(/\d+$/);
  return match ? Number(match[0]) : null;
}
