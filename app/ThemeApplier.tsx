"use client";

import { useEffect } from "react";
import { useSiteConfig } from "./SiteConfigProvider";

/**
 * Applies dynamic CSS variables from SiteConfig to :root
 * so the entire site picks up the admin-configured primary colour.
 */
export default function ThemeApplier() {
  const { primaryColor } = useSiteConfig();

  useEffect(() => {
    document.documentElement.style.setProperty("--orange", primaryColor);
  }, [primaryColor]);

  // Also inject via a <style> tag for SSR/first-paint (no FOUC)
  return (
    <style
      // biome-ignore lint: needed for dynamic CSS variable injection
      dangerouslySetInnerHTML={{
        __html: `:root { --orange: ${primaryColor}; }`,
      }}
    />
  );
}
