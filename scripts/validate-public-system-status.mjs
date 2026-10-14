import fs from "node:fs";

const source = fs.readFileSync("src/main.jsx", "utf8");
const errors = [];
const forbidden = ["PublicIntakeForm", "supabase.co", "public-intake", "kawasan-masjid-core", "Founder-OS", "CORE", "Saweria", "system-lock.json", "SpatialMapV2"];
for (const token of forbidden) {
  if (source.includes(token)) errors.push("Public content source must not depend on legacy backend: " + token);
}
for (const required of ["belajar-islam-digital.html", "artikel.html", "research.html", "privacy-policy.html"]) {
  if (!source.includes(required)) errors.push("Expected public learning route is missing: " + required);
}
if (fs.existsSync("src/PublicIntakeForm.jsx")) errors.push("Obsolete backend intake component still exists.");
if (fs.existsSync("integration/system-lock.json")) errors.push("Obsolete cross-repository lock still exists.");
if (errors.length) {
  console.error("Public content boundary validation failed:");
  for (const error of errors) console.error(" - " + error);
  process.exit(1);
}
console.log("PASS: public site source is content-focused and independent of CORE/Founder-OS backend services.");
