import { headers } from "next/headers";
import type { Currency } from "./products";
import { site } from "./site";

/**
 * The visitor's country from the host's geo-IP header (Vercel or Cloudflare).
 * In development, DEV_COUNTRY can stand in for it, since localhost has no geo data.
 */
async function getCountry(): Promise<string | null> {
  const h = await headers();
  const country = h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry");
  if (country) return country.toUpperCase();
  if (process.env.NODE_ENV !== "production" && process.env.DEV_COUNTRY) return process.env.DEV_COUNTRY.toUpperCase();
  return null;
}

// The UK and the Crown Dependencies pay in pounds.
const GBP_COUNTRIES = new Set(["GB", "IM", "JE", "GG"]);

/** GBP in the UK, INR in India when site.inrForIndia is on, USD everywhere else (including when the country is unknown). */
export async function getCurrency(): Promise<Currency> {
  const country = await getCountry();
  if (country && GBP_COUNTRIES.has(country)) return "GBP";
  if (site.inrForIndia && country === "IN") return "INR";
  return "USD";
}
