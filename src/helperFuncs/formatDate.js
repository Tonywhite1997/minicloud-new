export function formatDate(dateStr) {
  if (!dateStr) return "Unknown";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? "Unknown" : date.toLocaleDateString();
}
