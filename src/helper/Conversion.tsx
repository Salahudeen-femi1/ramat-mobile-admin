export function convertTo24Hour(time: string) {
  const [value, extra] = time.split(" ");

  if (!extra) return value;

  let [hours, minutes] = value.split(":").map(Number);

  if (extra === "PM" && hours !== 12) {
    hours += 12;
  }

  if (extra === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
};

export function convertToDisplayTime(time: string) {
  const [hoursString, minutes] = time.split(":");

  let hours = Number(hoursString);

  const extra = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${minutes} ${extra}`;
}