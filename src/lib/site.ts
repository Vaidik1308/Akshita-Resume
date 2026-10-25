import { profile } from "./portfolio";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

// Search-facing copy. Titles stay under ~60 characters and descriptions under ~160 so results aren't truncated.
export const SITE_TITLE = `${profile.name} | Industrial Automation Engineer, Schneider Electric`;
export const SITE_DESCRIPTION =
  "Akshita Deo, Deputy Manager at Schneider Electric, Bengaluru. Industrial automation with AVEVA System Platform and EcoStruxure; Springer Nature co-author.";

export const SITE_KEYWORDS = [
  profile.name,
  "Akshita",
  "Akshita Deo Schneider Electric",
  "Industrial Automation Engineer",
  "Deputy Manager",
  "Schneider Electric",
  "AVEVA System Platform",
  "EcoStruxure Automation Expert",
  "PLC Programming",
  "Electronics and Instrumentation",
  "Dayananda Sagar College of Engineering",
  "Springer Nature",
  "Women's Safety IoT",
  "Bengaluru",
  "Portfolio",
];

// Shown on the Person entry in JSON-LD
export const SITE_AWARDS: string[] = [];
