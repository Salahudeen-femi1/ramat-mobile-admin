export function convertTo24Hour(time: string) {
  const [value, modifier] = time.split(" ");

  if (!modifier) return value;

  let [hours, minutes] = value.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }

  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
};

export function convertToDisplayTime(time: string) {
  const [hoursString, minutes] = time.split(":");

  let hours = Number(hoursString);

  const modifier = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${minutes} ${modifier}`;
}