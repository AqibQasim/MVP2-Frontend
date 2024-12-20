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
  Chicago: "America/Chicago",
  // North America
  Chicago: "America/Chicago",
  Houston: "America/Houston",
  Toronto: "America/Toronto",
  "Mexico City": "America/Mexico_City",
  Denver: "America/Denver",
  Phoenix: "America/Phoenix",
  Anchorage: "America/Anchorage",
  Honolulu: "America/Honolulu",
  "New York": "America/New_York",
  "Los Angeles": "America/Los_Angeles",

  // South America
  "São Paulo": "America/Sao_Paulo",
  "Buenos Aires": "America/Argentina/Buenos_Aires",
  Lima: "America/Lima",
  Bogotá: "America/Bogota",
  Santiago: "America/Santiago",
  Caracas: "America/Caracas",
  Montevideo: "America/Montevideo",

  // Europe
  London: "Europe/London",
  Paris: "Europe/Paris",
  Berlin: "Europe/Berlin",
  Madrid: "Europe/Madrid",
  Rome: "Europe/Rome",
  Moscow: "Europe/Moscow",
  Istanbul: "Europe/Istanbul",
  Amsterdam: "Europe/Amsterdam",
  Brussels: "Europe/Brussels",
  Zurich: "Europe/Zurich",

  // Africa
  Cairo: "Africa/Cairo",
  Lagos: "Africa/Lagos",
  Johannesburg: "Africa/Johannesburg",
  Nairobi: "Africa/Nairobi",
  Casablanca: "Africa/Casablanca",
  Accra: "Africa/Accra",
  Abidjan: "Africa/Abidjan",

  // Asia
  "Delhi, Mumbai, Bengaluru, Chennai, Kolkata": "Asia/Kolkata",
  "Islamabad, Karachi": "Asia/Karachi",
  Dhaka: "Asia/Dhaka",
  Tokyo: "Asia/Tokyo",
  Seoul: "Asia/Seoul",
  Beijing: "Asia/Shanghai",
  Jakarta: "Asia/Jakarta",
  Bangkok: "Asia/Bangkok",
  Singapore: "Asia/Singapore",
  Manila: "Asia/Manila",
  "Hong Kong": "Asia/Hong_Kong",
  "Kuwait City": "Asia/Kuwait",
  Tehran: "Asia/Tehran",

  // Oceania
  Sydney: "Australia/Sydney",
  Melbourne: "Australia/Melbourne",
  Brisbane: "Australia/Brisbane",
  Auckland: "Pacific/Auckland",
  Wellington: "Pacific/Wellington",

  // Middle East
  Dubai: "Asia/Dubai",
  Riyadh: "Asia/Riyadh",

  // Additional Global Cities
  Reykjavik: "Atlantic/Reykjavik",
  Honolulu: "Pacific/Honolulu",
  Anchorage: "America/Anchorage",
  "Cape Town": "Africa/Johannesburg",

  // Other Regions
  Belgrade: "Europe/Belgrade",
  Edmonton: "America/Edmonton",
  Detroit: "America/Detroit",
  Guayaquil: "America/Guayaquil",
  Dakar: "Africa/Dakar",
  Sofia: "Europe/Sofia",
  Damascus: "Asia/Damascus",
  Kathmandu: "Asia/Kathmandu",
  "Port Moresby": "Pacific/Port_Moresby",
  Chisinau: "Europe/Chisinau",
  Bucharest: "Europe/Bucharest",
  Vilnius: "Europe/Vilnius",
  "San Juan": "America/Puerto_Rico",
  Yerevan: "Asia/Yerevan",
  Samara: "Europe/Samara",
  Guatemala: "America/Guatemala",
  "Los Angeles": "America/Los_Angeles",
};

export function getTimeZone(city) {
  const cityPreName = city?.at(0)?.trim();
  const cityName = cityPreName?.charAt(0).toUpperCase() + cityPreName?.slice(1);
  return cityTimezones[city];
}

export function calculateTimeZoneOffset(city1, city2, view = "city1") {
  if (!city1 || !city2) {
    return "Both cities must be provided.";
  }

  const city1Timezone = getTimeZone(city1);
  const city2Timezone = getTimeZone(city2);

  if (!city1Timezone || !city2Timezone) {
    return `Timezone not found for ${!city1Timezone ? city1 : city2}.`;
  }

  const now = DateTime.now();
  const city1TimezoneOffset = now.setZone(city1Timezone).offset / 60;
  const city2TimezoneOffset = now.setZone(city2Timezone).offset / 60;

  // const offsetDifference = city1TimezoneOffset - city2TimezoneOffset;
  const offsetDifference =
    view === "city1"
      ? city2TimezoneOffset - city1TimezoneOffset
      : city1TimezoneOffset - city2TimezoneOffset;
  const difference = Math.abs(offsetDifference);

  if (view === "city1") {
    const direction = offsetDifference > 0 ? "ahead" : "behind";
    return `${city2}, ${difference} hrs ${direction}`;
  } else if (view === "city2") {
    const direction = offsetDifference < 0 ? "ahead" : "behind";
    return `${city1}, ${difference} hrs ${direction}`;
  } else {
    return "Invalid view parameter. Use 'city1' or 'city2'.";
  }
}

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

//candidateTimezone = "Asia/Kolkata"
//clientTimezone = "America/New_York"
//for fetching the current user's timezone: Intl.DateTimeFormat().resolvedOptions().timeZone // "America/New_York"

export function relateCandidateTimezoneWithClientTimezone(city) {
  // const candidateTimezoneOffset = DateTime.now().setZone(candidateTimezone).offset / 60;
  // const clientTimezoneOffset = DateTime.now().setZone(clientTimezone).offset / 60;
  const location = city?.split(",");
  const cityPreName = location?.at(0)?.trim();
  const cityName = cityPreName?.charAt(0).toUpperCase() + cityPreName?.slice(1);
  // const cityTimezone = moment.tz.guess(false);
  const cityTimezone = cityTimezones[cityName];

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
