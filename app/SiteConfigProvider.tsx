"use client";

import { createContext, useContext } from "react";
import type { SiteConfig } from "@/app/actions/config";

const DEFAULT: SiteConfig = {
  id: 1,
  companyName: "apex",
  primaryColor: "#ff673d",
  logoUrl: "",
  watermarkEnabled: false,
  watermarkText: "Velmora Softlab",
  contactLabel: "Contact Us",
  contactEmail: "hello@apexroofing.com",
};

const SiteConfigContext = createContext<SiteConfig>(DEFAULT);

export function SiteConfigProvider({
  config,
  children,
}: {
  config: SiteConfig;
  children: React.ReactNode;
}) {
  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
