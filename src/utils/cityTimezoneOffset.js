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
  const location = city.split(",");
  const cityPreName = location.at(0).trim();
  const cityName = cityPreName.charAt(0).toUpperCase() + cityPreName.slice(1);
  const timezone = cityTimezones[cityName];

  if (!timezone) {
    // return `Timezone for city ${city} not found.`;
    return `Timezone not found`;
  }

  const timeInSpecifiedTimezone = DateTime.now().setZone(timezone);

  const offsetInHours = timeInSpecifiedTimezone.offset / 60;

  const direction = offsetInHours >= 0 ? "ahead" : "behind";
  const absoluteOffset = Math.abs(offsetInHours);

  return `${cityName}, ${absoluteOffset} hrs ${direction}`;
}
