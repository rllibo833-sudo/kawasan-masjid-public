import React, { useRef, useState } from "react";

const ENDPOINT = "https://lnpzgrodwnhthcwudebk.supabase.co/functions/v1/public-intake";
const API_KEY = "sb_publishable_Ff0FncyGRGr5afp3PkjNZg__HpqB9qq";
const initial = { name: "", contact: "", contact_preference: "email", need: "", timeline: "", nominal: "0", batas: "0", website: "" };

export default function PublicIntakeForm() {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [tracking, setTracking] = useState(null);
  const [checking, setChecking] = useState(false);
  const key = useRef(null);
  const change = (event) => setForm((old) => ({ ...old, [event.target.name]: event.target.value }));
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    if (!key.current) key.current = crypto.randomUUID();
    setBusy(true);
    setMessage("Mengirim dan memverifikasi penyimpanan…");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: API_KEY, "Idempotency-Key": key.current },
        body: JSON.stringify({ ...form, name: form.name.trim(), contact: form.contact.trim(), need: form.need.trim(), timeline: form.timeline.trim(), nominal: Number(form.nominal), batas: Number(form.batas) }),
      });
      const result = await response.json().catch(() => ({}));
      if ((response.status === 202 && result.status === "accepted") || (response.status === 200 && result.status === "duplicate")) {
        key.current = null;
        setForm(initial);
        setTrackingId(result.intake_id || "");
        setTracking(null);
        setMessage(`Tersimpan di CORE. ID transaksi: ${result.intake_id || "tercatat"}. Status: ${result.transaction_status || "menunggu eksekusi aturan terisolasi"}.`);
      } else if (response.status === 429) {
        setMessage("Batas pengiriman tercapai. Coba lagi setelah satu jam.");
      } else {
        setMessage("CORE belum mengonfirmasi penyimpanan. Data tidak boleh dianggap terkirim; periksa isian atau coba lagi nanti.");
      }
    } catch {
      setMessage("Koneksi terputus sebelum konfirmasi. Kirim ulang untuk mencoba dengan kunci idempotensi yang sama.");
    } finally {
      setBusy(false);
    }
  }
  async function lookupStatus() {
    if (!trackingId || checking) return;
    setChecking(true);
    setTracking(null);
    try {
      const response = await fetch(`${ENDPOINT}?id=${encodeURIComponent(trackingId)}`, {
        method: "GET",
        headers: { apikey: API_KEY, "Cache-Control": "no-store" },
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.status !== "found") {
        setTracking({ error: result.error || "STATUS_LOOKUP_FAILED" });
      } else {
        setTracking(result);
      }
    } catch {
      setTracking({ error: "STATUS_LOOKUP_FAILED" });
    } finally {
      setChecking(false);
    }
  }

  return <form className="publicIntakeForm" onSubmit={submit}>
    <strong>Ajukan kebutuhan konkret</strong>
    <p>Data disimpan di CORE. Pemeriksaan anggaran membandingkan saldo tersedia dengan kebutuhan dana; hasil bukan persetujuan pendanaan.</p>
    <label>Nama<input name="name" minLength="2" maxLength="100" autoComplete="name" required value={form.name} onChange={change}/></label>
    <div className="publicIntakeGrid">
      <label>Kontak<input name="contact" minLength="5" maxLength="254" required value={form.contact} onChange={change} placeholder="Email atau nomor WhatsApp"/></label>
      <label>Preferensi<select name="contact_preference" value={form.contact_preference} onChange={change}><option value="email">Email</option><option value="whatsapp">WhatsApp</option></select></label>
    </div>
    <label>Kebutuhan<textarea name="need" minLength="10" maxLength="2000" required rows="4" value={form.need} onChange={change}/></label>
    <label>Perkiraan waktu<input name="timeline" minLength="2" maxLength="120" required value={form.timeline} onChange={change} placeholder="Contoh: 1–3 bulan"/></label>
    <div className="publicIntakeGrid">
      <label>Saldo tersedia (Rp)<input name="nominal" type="number" min="0" max="1000000000000" step="1" required value={form.nominal} onChange={change}/></label>
      <label>Kebutuhan dana (Rp)<input name="batas" type="number" min="0" max="1000000000000" step="1" required value={form.batas} onChange={change}/></label>
    </div>
    <div className="publicIntakeHoneypot" aria-hidden="true"><label>Website<input name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={change}/></label></div>
    <button className="button buttonGold" type="submit" disabled={busy}>{busy ? "Mengirim…" : "Kirim ke CORE"}</button>
    {message && <p className="publicIntakeStatus" role="status" aria-live="polite">{message}</p>}
    {trackingId && <div className="publicIntakeTracking">
      <button className="button buttonGold" type="button" onClick={lookupStatus} disabled={checking}>{checking ? "Memeriksa…" : "Lihat status & bukti CORE"}</button>
      {tracking && <pre role="status" aria-live="polite">{JSON.stringify(tracking, null, 2)}</pre>}
    </div>}
    <small>Kontak disimpan di area privat CORE dan tidak tersedia melalui API publik. Status sukses hanya muncul setelah konfirmasi penyimpanan. Pemeriksaan status dibatasi hingga lima permintaan per IP per jam bersama pengiriman formulir.</small>
  </form>;
}
