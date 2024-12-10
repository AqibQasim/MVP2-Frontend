import { DateTime } from "luxon";

const cityTimezones = {
  // North America
  New_York: "America/New_York",
  Los_Angeles: "America/Los_Angeles",
  Chicago: "America/Chicago",
  Houston: "America/Chicago",
  Toronto: "America/Toronto",
  Mexico_City: "America/Mexico_City",
  
  // South America
  São_Paulo: "America/Sao_Paulo",
  Buenos_Aires: "America/Argentina/Buenos_Aires",
  Lima: "America/Lima",
  Bogotá: "America/Bogota",
  Santiago: "America/Santiago",
  
  // Europe
  London: "Europe/London",
  Paris: "Europe/Paris",
  Berlin: "Europe/Berlin",
  Madrid: "Europe/Madrid",
  Rome: "Europe/Rome",
  Moscow: "Europe/Moscow",
  
  // Africa
  Cairo: "Africa/Cairo",
  Lagos: "Africa/Lagos",
  Johannesburg: "Africa/Johannesburg",
  Nairobi: "Africa/Nairobi",
  Casablanca: "Africa/Casablanca",
  
  // Asia
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
  Bangkok: "Asia/Bangkok",
  Singapore: "Asia/Singapore",
  Manila: "Asia/Manila",
  
  // Oceania
  Sydney: "Australia/Sydney",
  Melbourne: "Australia/Melbourne",
  Brisbane: "Australia/Brisbane",
  Auckland: "Pacific/Auckland",
  Wellington: "Pacific/Auckland",
  
  // Middle East
  Dubai: "Asia/Dubai",
  Riyadh: "Asia/Riyadh",
  Tehran: "Asia/Tehran",
  Istanbul: "Europe/Istanbul",
  
  // Additional Global Cities
  Honolulu: "Pacific/Honolulu",
  Anchorage: "America/Anchorage",
  Buenos_Aires: "America/Argentina/Buenos_Aires",
  Reykjavik: "Atlantic/Reykjavik",
  Cape_Town: "Africa/Johannesburg"
};


export function cityTimezoneOffset(city) {
  const location = city?.split(",");
  const cityPreName = location?.at(0)?.trim();
  const cityName = cityPreName?.charAt(0).toUpperCase() + cityPreName?.slice(1);
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
