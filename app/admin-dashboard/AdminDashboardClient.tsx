"use client";

import { useState, useTransition, useRef } from "react";
import { updateConfig } from "@/app/actions/config";
import type { SiteConfig } from "@/app/actions/config";

function SaveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

export default function AdminDashboardClient({ config }: { config: SiteConfig }) {
  const [companyName, setCompanyName] = useState(config.companyName);
  const [primaryColor, setPrimaryColor] = useState(config.primaryColor);
  const [logoUrl, setLogoUrl] = useState(config.logoUrl);
  const [watermarkEnabled, setWatermarkEnabled] = useState(config.watermarkEnabled);
  const [watermarkText, setWatermarkText] = useState(config.watermarkText);
  const [contactLabel, setContactLabel] = useState(config.contactLabel);
  const [contactEmail, setContactEmail] = useState(config.contactEmail);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSave() {
    setSaveError(null);
    startTransition(async () => {
      const result = await updateConfig({
        companyName,
        primaryColor,
        logoUrl,
        watermarkEnabled,
        watermarkText,
        contactLabel,
        contactEmail,
      });
      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setSaveError(result.error ?? "Save failed. Please try again.");
      }
    });
  }

  // Convert uploaded image file to base64 data URL for logoUrl
  // Limit to 200 KB to avoid exceeding Vercel's response size limits
  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const MAX_SIZE = 200 * 1024; // 200 KB
    if (file.size > MAX_SIZE) {
      alert("Image is too large. Please upload an image under 200 KB.\n\nTip: You can compress your image at squoosh.app or tinypng.com before uploading.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setLogoUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #ebebeb", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: primaryColor, display: "grid", placeItems: "center", color: "#fff", fontSize: "18px" }}>⌂</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "16px", letterSpacing: "-0.02em" }}>Admin Dashboard</div>
            <div style={{ fontSize: "12px", color: "#888" }}>apex-roofing · Site Configuration</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {saved && (
            <span style={{ fontSize: "13px", color: "#22c55e", fontWeight: 600 }}>✓ Saved successfully</span>
          )}
          {saveError && (
            <span style={{ fontSize: "13px", color: "#ef4444", fontWeight: 600, maxWidth: "320px" }}>{saveError}</span>
          )}
          <button
            onClick={handleSave}
            disabled={isPending}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: primaryColor, color: "#fff", border: "none",
              borderRadius: "999px", padding: "10px 20px", fontWeight: 700,
              fontSize: "14px", cursor: isPending ? "not-allowed" : "pointer",
              opacity: isPending ? 0.7 : 1, transition: "opacity .2s",
            }}
          >
            <SaveIcon />
            {isPending ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "860px", margin: "40px auto", padding: "0 24px", display: "grid", gap: "20px" }}>

        {/* Branding */}
        <Card title="Branding" subtitle="Company name and logo shown across the site">
          <Field label="Company Name">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              style={inputStyle}
              placeholder="apex"
            />
          </Field>

          <Field label="Logo">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="Logo preview" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid #ebebeb" }} />
              ) : (
                <span style={{ width: "48px", height: "48px", borderRadius: "50%", background: primaryColor, display: "grid", placeItems: "center", color: "#fff", fontSize: "22px", flexShrink: 0 }}>⌂</span>
              )}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button onClick={() => fileInputRef.current?.click()} style={secondaryBtnStyle}>
                  Upload image
                </button>
                {logoUrl && (
                  <button onClick={() => { setLogoUrl(""); if (fileInputRef.current) fileInputRef.current.value = ""; }} style={{ ...secondaryBtnStyle, color: "#ef4444", borderColor: "#fca5a5" }}>
                    Remove
                  </button>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: "none" }} />
            </div>
            <p style={{ marginTop: "8px", fontSize: "12px", color: "#aaa" }}>
              Recommended: square image, at least 64×64px. Stored as base64.
            </p>
          </Field>
        </Card>

        {/* Colour Theme */}
        <Card title="Colour Theme" subtitle="Primary accent colour used for buttons, highlights, and icons">
          <Field label="Primary Colour">
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                style={{ width: "52px", height: "52px", border: "2px solid #ebebeb", borderRadius: "10px", cursor: "pointer", padding: "2px", background: "none" }}
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                style={{ ...inputStyle, width: "130px", fontFamily: "monospace", fontSize: "14px" }}
                placeholder="#ff673d"
              />
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["#ff673d","#3b82f6","#10b981","#8b5cf6","#f59e0b","#ef4444","#1d4ed8","#0f172a"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setPrimaryColor(c)}
                    title={c}
                    style={{ width: "28px", height: "28px", borderRadius: "50%", background: c, border: primaryColor === c ? "3px solid #333" : "2px solid transparent", cursor: "pointer", transition: "border .15s" }}
                  />
                ))}
              </div>
            </div>
            <div style={{ marginTop: "14px", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", color: "#888" }}>Preview:</span>
              <span style={{ background: primaryColor, color: "#fff", borderRadius: "999px", padding: "7px 16px", fontSize: "13px", fontWeight: 700 }}>Book a Call ↗</span>
              <span style={{ color: primaryColor, fontWeight: 700, fontSize: "14px" }}>apex<span style={{ color: primaryColor }}>.</span></span>
            </div>
          </Field>
        </Card>

        {/* Watermark */}
        <Card title="Watermark Protection" subtitle="Show diagonal watermark text over all pages to prevent design copying">
          <Field label="Enable Watermark">
            <div
              onClick={() => setWatermarkEnabled((v) => !v)}
              style={{
                width: "52px", height: "28px", borderRadius: "999px",
                background: watermarkEnabled ? primaryColor : "#d1d5db",
                cursor: "pointer", position: "relative", transition: "background .25s",
                flexShrink: 0,
              }}
            >
              <div style={{
                position: "absolute", top: "3px",
                left: watermarkEnabled ? "27px" : "3px",
                width: "22px", height: "22px", borderRadius: "50%",
                background: "#fff", transition: "left .25s",
                boxShadow: "0 1px 4px rgba(0,0,0,.2)",
              }} />
            </div>
            <span style={{ marginLeft: "12px", fontSize: "14px", color: watermarkEnabled ? "#111" : "#888", fontWeight: 500 }}>
              {watermarkEnabled ? "Watermark is ON" : "Watermark is OFF"}
            </span>
          </Field>

          <Field label="Watermark Text">
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              style={inputStyle}
              placeholder="Velmora Softlab"
            />
          </Field>

          {/* Live preview */}
          <div style={{ position: "relative", marginTop: "4px", borderRadius: "12px", overflow: "hidden", height: "80px", background: "#f0f0f0", border: "1px solid #e0e0e0" }}>
            <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", padding: "10px", pointerEvents: "none" }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} style={{ fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.1)", whiteSpace: "nowrap", transform: "rotate(-35deg)", transformOrigin: "center", letterSpacing: "0.04em" }}>
                  {watermarkText || "Velmora Softlab"}
                </span>
              ))}
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", color: "#aaa" }}>Preview</span>
            </div>
          </div>
        </Card>

        {/* Contact Button */}
        <Card title="Contact Button" subtitle="The call-to-action button shown in the site navigation header">
          <Field label="Button Label">
            <input
              type="text"
              value={contactLabel}
              onChange={(e) => setContactLabel(e.target.value)}
              style={inputStyle}
              placeholder="Contact Us"
            />
          </Field>
          <Field label="Email Address">
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              style={inputStyle}
              placeholder="hello@apexroofing.com"
            />
            <p style={{ marginTop: "6px", fontSize: "12px", color: "#aaa" }}>Clicking the button will open the user's mail client with this address.</p>
          </Field>
          <div style={{ marginTop: "4px" }}>
            <span style={{ fontSize: "12px", color: "#888", marginRight: "10px" }}>Preview:</span>
            <span style={{ background: primaryColor, color: "#fff", borderRadius: "999px", padding: "10px 18px", fontSize: "14px", fontWeight: 700 }}>
              {contactLabel || "Contact Us"} ↗
            </span>
          </div>
        </Card>

        {/* Bottom save */}
        <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "40px" }}>
          <button
            onClick={handleSave}
            disabled={isPending}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: primaryColor, color: "#fff", border: "none",
              borderRadius: "999px", padding: "13px 28px", fontWeight: 700,
              fontSize: "15px", cursor: isPending ? "not-allowed" : "pointer",
              opacity: isPending ? 0.7 : 1, transition: "opacity .2s",
            }}
          >
            <SaveIcon />
            {isPending ? "Saving…" : "Save All Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Small reusable layout helpers ── */

function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ebebeb", overflow: "hidden" }}>
      <div style={{ padding: "20px 28px 16px", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em" }}>{title}</div>
        <div style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>{subtitle}</div>
      </div>
      <div style={{ padding: "24px 28px", display: "grid", gap: "20px" }}>{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: 600, fontSize: "13px", marginBottom: "8px", color: "#444" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid #e0e0e0",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
  fontFamily: "inherit",
  color: "#111",
  background: "#fafafa",
  transition: "border-color .2s",
};

const secondaryBtnStyle: React.CSSProperties = {
  padding: "8px 16px",
  border: "1.5px solid #e0e0e0",
  borderRadius: "999px",
  background: "#fff",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#333",
};
