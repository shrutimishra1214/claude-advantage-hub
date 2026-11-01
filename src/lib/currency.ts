import { headers } from "next/headers";
import type { Currency } from "./products";

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

/** INR for visitors in India; USD for everyone else, including when the country is unknown. */
export async function getCurrency(): Promise<Currency> {
  return (await getCountry()) === "IN" ? "INR" : "USD";
}
