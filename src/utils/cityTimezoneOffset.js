import { DateTime } from "luxon";

const cityTimezones = {
  Delhi: "Asia/Kolkata",
  Mumbai: "Asia/Kolkata",
  Bengaluru: "Asia/Kolkata",
  Chennai: "Asia/Kolkata",
  Kolkata: "Asia/Kolkata",
  Islamabad: "Asia/Karachi",
  Karachi: "Asia/Karachi",
  Dhaka: "Asia/Dhaka",
  Tokyo: "Asia/Tokyo",
  Seoul: "Asia/Seoul",
  Beijing: "Asia/Shanghai",
  Jakarta: "Asia/Jakarta",
};

export function cityTimezoneOffset(city) {
  const timezone = cityTimezones[city];

  if (!timezone) {
    // return `Timezone for city ${city} not found.`;
    return `Timezone not found`;
  }

  // Get the current time in the specified timezone
  const cityTime = DateTime.now().setZone(timezone);

  // Calculate the offset from UTC in hours
  const offsetInHours = cityTime.offset / 60;

  // Format the output
  const direction = offsetInHours >= 0 ? "ahead" : "behind";
  const absoluteOffset = Math.abs(offsetInHours);

  return `${city}, ${absoluteOffset} hrs ${direction}`;
}
