// Format date in US friendly format
export function formatDate(date: Date | undefined) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long", // Full month name
    day: "numeric", // Day of the month
    year: "numeric", // Full year
    hour: "numeric", // Hour
    minute: "numeric", // Minute
    hour12: true, // Use 12-hour clock
  }).format(date);
}
