"use server";

import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { releaseSpot } from "@/lib/early-readers";
import { sign, verify } from "@/lib/signing";

const COOKIE = "kv_admin";

export async function isAdmin() {
  return Boolean(verify<{ admin: true }>((await cookies()).get(COOKIE)?.value)?.admin);
}

export async function login(_: string, formData: FormData): Promise<string> {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const given = String(formData.get("password") ?? "");
  const ok = expected.length >= 8 && given.length === expected.length && timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return "Wrong password.";
  (await cookies()).set(COOKIE, sign({ admin: true }, 60 * 60 * 12), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });
  revalidatePath("/admin/early-readers");
  return "";
}

export async function release(formData: FormData) {
  if (!(await isAdmin())) return;
  await releaseSpot(String(formData.get("email") ?? ""));
  revalidatePath("/admin/early-readers");
  revalidatePath("/early-readers");
  revalidatePath("/");
}
