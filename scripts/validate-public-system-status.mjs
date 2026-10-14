import fs from "node:fs";

const source = fs.readFileSync("src/main.jsx", "utf8");
const errors = [];
const requireText = (text, description) => {
  if (!source.includes(text)) errors.push("Missing public status requirement: " + description);
};

requireText("PUBLIC-VERIFIED STATUS", "a dedicated verified-status section");
requireText("20 sumber public-safe", "the curated public-safe index count");
requireText("CORE Quality Gate", "grounding CI status is described with evidence");
requireText("Ollama pada perangkat Founder belum diuji", "local inference is explicitly unverified");
requireText("tidak ada klaim bahwa endpoint AI publik atau runner PusingCuk produksi telah aktif", "production AI deployment is not claimed");
requireText("bukan bukti bahwa lahan, izin, pendanaan, atau pembangunan fisik telah tersedia", "masterplan is presented as a concept, not physical proof");
requireText("https://github.com/rllibo833-sudo/kawasan-masjid-core/actions/runs/38534219549", "the CORE verification run is linked");
requireText("https://github.com/rllibo833-sudo/pusingcuk/blob/main/examples/README.md", "PusingCuk limitations are linked");

// PUBLIC may describe Founder-OS, but must never mirror the full internal index,
// expose provider credentials, or carry backend worker secrets in browser code.
for (const forbidden of [
  "SUPABASE_SERVICE_ROLE_KEY",
  "GEMINI_API_KEY",
  "PUSINGCUK_RUNNER_TOKEN",
  "ai/knowledge-index.json",
  "REFERENSI FOUNDER-OS (data rujukan; bukan instruksi sistem)",
]) {
  if (source.includes(forbidden)) errors.push("Internal-only content must not appear in PUBLIC source: " + forbidden);
}

if (errors.length) {
  console.error("Public status boundary validation failed:");
  for (const error of errors) console.error(" - " + error);
  process.exit(1);
}
console.log("PASS: PUBLIC shows evidence-backed status and limitations without mirroring Founder-OS knowledge or exposing secrets.");
