import { DateTime } from "luxon";
import moment from "moment-timezone";

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
  Chicago: "America/Chicago",
  "New York": "America/New_York",
  "Los Angeles": "America/Los_Angeles",
};

// const globalTimezones = {
//   // North America
//   "America/New_York": "New York",
//   "America/Los_Angeles": "Los Angeles",
//   "America/Chicago": "Chicago",
//   "America/Houston": "Houston",
//   "America/Toronto": "Toronto",
//   "America/Mexico_City": "Mexico City",
//   "America/Denver": "Denver",
//   "America/Phoenix": "Phoenix",
//   "America/Anchorage": "Anchorage",
//   "America/Honolulu": "Honolulu",

//   // South America
//   "America/Sao_Paulo": "São Paulo",
//   "America/Argentina/Buenos_Aires": "Buenos Aires",
//   "America/Lima": "Lima",
//   "America/Bogota": "Bogotá",
//   "America/Santiago": "Santiago",
//   "America/Caracas": "Caracas",
//   "America/Montevideo": "Montevideo",

//   // Europe
//   "Europe/London": "London",
//   "Europe/Paris": "Paris",
//   "Europe/Berlin": "Berlin",
//   "Europe/Madrid": "Madrid",
//   "Europe/Rome": "Rome",
//   "Europe/Moscow": "Moscow",
//   "Europe/Istanbul": "Istanbul",
//   "Europe/Amsterdam": "Amsterdam",
//   "Europe/Brussels": "Brussels",
//   "Europe/Zurich": "Zurich",

//   // Africa
//   "Africa/Cairo": "Cairo",
//   "Africa/Lagos": "Lagos",
//   "Africa/Johannesburg": "Johannesburg",
//   "Africa/Nairobi": "Nairobi",
//   "Africa/Casablanca": "Casablanca",
//   "Africa/Accra": "Accra",
//   "Africa/Abidjan": "Abidjan",

//   // Asia
//   "Asia/Kolkata": "Delhi, Mumbai, Bengaluru, Chennai, Kolkata",
//   "Asia/Karachi": "Islamabad, Karachi",
//   "Asia/Dhaka": "Dhaka",
//   "Asia/Tokyo": "Tokyo",
//   "Asia/Seoul": "Seoul",
//   "Asia/Shanghai": "Beijing",
//   "Asia/Jakarta": "Jakarta",
//   "Asia/Bangkok": "Bangkok",
//   "Asia/Singapore": "Singapore",
//   "Asia/Manila": "Manila",
//   "Asia/Hong_Kong": "Hong Kong",
//   "Asia/Kuwait": "Kuwait City",
//   "Asia/Tehran": "Tehran",

//   // Oceania
//   "Australia/Sydney": "Sydney",
//   "Australia/Melbourne": "Melbourne",
//   "Australia/Brisbane": "Brisbane",
//   "Pacific/Auckland": "Auckland",
//   "Pacific/Wellington": "Wellington",

//   // Middle East
//   "Asia/Dubai": "Dubai",
//   "Asia/Riyadh": "Riyadh",
//   "Asia/Tehran": "Tehran",
//   "Europe/Istanbul": "Istanbul",

//   // Additional Global Cities
//   "Atlantic/Reykjavik": "Reykjavik",
//   "Pacific/Honolulu": "Honolulu",
//   "America/Anchorage": "Anchorage",
//   "Africa/Johannesburg": "Cape Town",

//   // Other regions
//   "Europe/Belgrade": "Belgrade",
//   "America/Edmonton": "Edmonton",
//   "America/Detroit": "Detroit",
//   "America/Guayaquil": "Guayaquil",
//   "Africa/Dakar": "Dakar",
//   "Europe/Sofia": "Sofia",
//   "Asia/Damascus": "Damascus",
//   "Asia/Kathmandu": "Kathmandu",
//   "Pacific/Port_Moresby": "Port Moresby",
//   "Europe/Chisinau": "Chisinau",
//   "Europe/Bucharest": "Bucharest",
//   "Europe/Vilnius": "Vilnius",
//   "America/Puerto_Rico": "San Juan",
//   "Asia/Yerevan": "Yerevan",
//   "Europe/Samara": "Samara",
//   "America/Guatemala": "Guatemala",
//   "America/Los_Angeles": "Los Angeles",
// };

export function cityTimezoneOffset(city) {
  const location = city?.split(",");
  const cityPreName = location?.at(0)?.trim();
  const cityName = cityPreName?.charAt(0).toUpperCase() + cityPreName?.slice(1);
  const timezone = globalTimezones[cityName];

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

//candidateTimezone = "Asia/Kolkata"
//clientTimezone = "America/New_York"
//for fetching the current user's timezone: Intl.DateTimeFormat().resolvedOptions().timeZone // "America/New_York"

export function relateCandidateTimezoneWithClientTimezone(city) {
  // const candidateTimezoneOffset = DateTime.now().setZone(candidateTimezone).offset / 60;
  // const clientTimezoneOffset = DateTime.now().setZone(clientTimezone).offset / 60;
  console.log("city here", city);
  const location = city?.split(",");
  const cityPreName = location?.at(0)?.trim();
  const cityName = cityPreName?.charAt(0).toUpperCase() + cityPreName?.slice(1);
  // const cityTimezone = moment.tz.guess(false);
  const cityTimezone = cityTimezones[cityName];

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log("Timezone here", timezone);
  const cityTimezoneOffset = DateTime.now().setZone(cityTimezone).offset / 60;
  const clientTimezoneOffset = DateTime.now().setZone(timezone).offset / 60;

  const offsetDifference = clientTimezoneOffset - cityTimezoneOffset;

  if (offsetDifference === 0) {
    return `${cityName}, 0 hrs ahead`;
  }

  const direction = offsetDifference >= 0 ? "ahead" : "behind";
  const absoluteOffset = Math.abs(offsetDifference);

  return `${absoluteOffset} hrs ${direction}`;
}
