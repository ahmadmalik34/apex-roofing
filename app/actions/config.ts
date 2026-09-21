"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type SiteConfig = {
  id: number;
  companyName: string;
  primaryColor: string;
  logoUrl: string;
  watermarkEnabled: boolean;
  watermarkText: string;
  contactLabel: string;
  contactEmail: string;
};

const DEFAULT_CONFIG: SiteConfig = {
  id: 1,
  companyName: "apex",
  primaryColor: "#ff673d",
  logoUrl: "",
  watermarkEnabled: false,
  watermarkText: "Velmora Softlab",
  contactLabel: "Contact Us",
  contactEmail: "hello@apexroofing.com",
};

export async function getConfig(): Promise<SiteConfig> {
  try {
    const config = await prisma.siteConfig.findUnique({ where: { id: 1 } });
    if (!config) return DEFAULT_CONFIG;
    return config;
  } catch {
    // If DB not yet configured, return defaults so the site still renders
    return DEFAULT_CONFIG;
  }
}

export async function updateConfig(data: Partial<Omit<SiteConfig, "id">>) {
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: data,
    create: { ...DEFAULT_CONFIG, ...data },
  });
  revalidatePath("/");
  revalidatePath("/admin-dashboard");
}
