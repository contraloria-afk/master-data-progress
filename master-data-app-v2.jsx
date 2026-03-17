import { useState, useEffect, useCallback, useRef } from "react";

const ADVAN_LOGO = "data:image/png;base64,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";
const ADVANONE_LOGO = "data:image/png;base64,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";

// ── MODULE SVG ICONS ──────────────────────────────────────────────────────────
const MODULE_ICONS = {
  CONT: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 8V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8"/><path d="M23 3H1v5h22V3z"/><line x1="10" y1="12" x2="14" y2="12"/></svg>`,
  TRA:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  LIQ:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  INT:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="4" height="4" rx="1"/><rect x="10" y="3" width="4" height="4" rx="1"/><rect x="18" y="3" width="4" height="4" rx="1"/><rect x="2" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/><rect x="18" y="10" width="4" height="4" rx="1"/><rect x="2" y="17" width="4" height="4" rx="1"/><rect x="10" y="17" width="4" height="4" rx="1"/><rect x="18" y="17" width="4" height="4" rx="1"/></svg>`,
  ADM:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>`,
  AF:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  CON:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  BAN:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><circle cx="12" cy="15" r="2"/></svg>`,
  CCH:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/><line x1="12" y1="6" x2="12" y2="6.01"/></svg>`,
  CXP:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="12" y1="7" x2="12" y2="13"/></svg>`,
  CXC:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="9" y1="18" x2="15" y2="18"/></svg>`,
  MAN:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 19.07a10 10 0 0 1 0-14.14"/><path d="M14.12 9.88a3 3 0 0 1 0 4.24"/><path d="M9.88 14.12a3 3 0 0 1 0-4.24"/></svg>`,
  COM:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  ALM:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 8h14M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/><line x1="10" y1="12" x2="14" y2="12"/></svg>`,
  LLA:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/></svg>`,
  VIG:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
};

function ModIcon({ id, size = 18, color = "currentColor", bg = false }) {
  const svg = MODULE_ICONS[id] || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`;
  const icon = (
    <span style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: svg.replace(/stroke="currentColor"/g, `stroke="${bg ? "#fff" : color}"`) }} />
  );
  if (!bg) return icon;
  return (
    <div style={{ width: size + 16, height: size + 16, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 2px 8px ${color}55` }}>
      {icon}
    </div>
  );
}

const SB_URL = "https://ipeevphsyjjsycddvang.supabase.co";
const SB_KEY = "sb_publishable_q-fH9Y2uU7ir4pB3R9weaw_J8WeaP_q";

async function sbFetch(table, opts = {}) {
  const { select = "*", filters = [], order = null } = opts;
  let url = `${SB_URL}/rest/v1/${table}?select=${select}`;
  filters.forEach(([col, val]) => { url += `&${col}=eq.${encodeURIComponent(val)}`; });
  if (order) url += `&order=${order.col}.${order.asc ? "asc" : "desc"}`;
  const res = await fetch(url, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Accept": "application/json" } });
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function sbInsert(table, row) {
  const res = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(row),
  });
  const d = await res.json();
  return Array.isArray(d) ? d[0] : d;
}

async function sbUpdate(table, row, filters = []) {
  let url = `${SB_URL}/rest/v1/${table}?`;
  filters.forEach(([col, val]) => { url += `${col}=eq.${encodeURIComponent(val)}&`; });
  const res = await fetch(url, {
    method: "PATCH",
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(row),
  });
  const d = await res.json();
  return Array.isArray(d) ? d[0] : d;
}

async function sbRpc(fn, params) {
  const res = await fetch(`${SB_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return res.ok;
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const CONSULTORES = ["Yanet Contreras", "Monserrat Márquez", "Joselyn Trejo", "Paula Valencia", "Gabriel Castro", "Marco Segura"];
const STATUS_OPTS = ["Pendiente", "En Revisión", "En Proceso", "Completado", "Bloqueado"];
const COMPLETENESS_OPTS = ["Si cumple", "No cumple", "No Aplica"];
const CALIFICACION_OPTS = ["Suficiente para Operar", "Data Insuficiente", "Data Inexistente", "Terminada"];
const QUALITY_FIELDS = [
  { key: "quality_veracidad", label: "Veracidad" },
  { key: "quality_actualizacion", label: "Actualización" },
  { key: "quality_cobertura", label: "Cobertura" },
  { key: "quality_consistencia", label: "Consistencia" },
  { key: "quality_autorizado", label: "Autorizado" },
];
const ROLES = { admin: "Administrador", consultor: "Consultor", cliente: "Cliente" };
const STATUS_STYLE = {
  "Pendiente":   { bg: "#F1F5F9", text: "#64748B", border: "#CBD5E1", dot: "#94A3B8" },
  "En Revisión": { bg: "#FFFBEB", text: "#B45309", border: "#FCD34D", dot: "#F59E0B" },
  "En Proceso":  { bg: "#EFF6FF", text: "#1D4ED8", border: "#93C5FD", dot: "#3B82F6" },
  "Completado":  { bg: "#F0FDF4", text: "#15803D", border: "#86EFAC", dot: "#22C55E" },
  "Bloqueado":   { bg: "#FEF2F2", text: "#B91C1C", border: "#FCA5A5", dot: "#EF4444" },
};

// ── UTILS ─────────────────────────────────────────────────────────────────────
const calcPct = (cats) => {
  if (!cats.length) return 0;
  const total = cats.reduce((sum, c) => {
    if (c.status === "Completado") return sum + 100;
    if (c.status === "Bloqueado") return sum + 0;
    const q = Number(c.quantitative) || 0;
    return sum + Math.min(q, 99);
  }, 0);
  return Math.round(total / cats.length);
};
const calcQuality = (cat) => {
  const vals = SEMAPHORE_FIELDS.map(f => {
    const v = cat[f.key];
    return typeof v === "number" ? v : (v ? 3 : 0);
  });
  const max = SEMAPHORE_FIELDS.length * 3;
  return Math.round(vals.reduce((a, b) => a + b, 0) / max * 100);
};
const today = () => new Date().toISOString().slice(0, 10);

// ── EXPORT ────────────────────────────────────────────────────────────────────
function exportCSV(catalogs, modules, clientName) {
  const headers = ["Módulo","Clave","Catálogo","Status","Consultor","Responsable","Fecha Revisión","Meta %","Quantitative %","Veracidad","Actualización","Cobertura","Consistencia","Autorizado","Completeness","Calificación Data","Observaciones"];
  const rows = catalogs.map(c => [
    modules.find(m => m.id === c.module_id)?.name || c.module_id, c.catalog_key, c.catalog_name,
    c.status, c.consultor || "", c.responsable || "", c.fecha_revision || "",
    c.meta || "", c.quantitative || "",
    c.quality_veracidad ? "✓" : "", c.quality_actualizacion ? "✓" : "", c.quality_cobertura ? "✓" : "",
    c.quality_consistencia ? "✓" : "", c.quality_autorizado ? "✓" : "",
    c.completeness || "", c.calificacion_data || "", c.observaciones || "",
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
  a.download = `ProgressReport_${clientName}_${today()}.csv`;
  a.click();
}

function exportPrint(catalogs, modules, clientName) {
  const win = window.open("", "_blank");
  const byMod = {};
  catalogs.forEach(c => { if (!byMod[c.module_id]) byMod[c.module_id] = []; byMod[c.module_id].push(c); });
  let html = `<html><head><title>Progress Report — ${clientName}</title>
  <style>body{font-family:sans-serif;font-size:11px;color:#1e293b}
  h1{font-size:18px;margin:0}.header{display:flex;align-items:center;gap:16px;margin-bottom:20px;padding-bottom:12px;border-bottom:2px solid #e2e8f0}
  h2{font-size:13px;background:#1e40af;color:#fff;padding:7px 12px;margin:16px 0 4px;border-radius:4px}
  table{width:100%;border-collapse:collapse;margin-bottom:8px;font-size:10px}
  th{background:#f1f5f9;color:#475569;padding:5px 8px;text-align:left;border-bottom:2px solid #e2e8f0}
  td{padding:5px 8px;border-bottom:1px solid #f1f5f9}
  .done{color:#15803d;font-weight:bold}.pend{color:#94a3b8}.prog{color:#1d4ed8}.rev{color:#b45309}.blk{color:#b91c1c}
  @media print{h2{-webkit-print-color-adjust:exact;print-color-adjust:exact}th{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body>`;
  const total = catalogs.length, done = catalogs.filter(c => c.status === "Completado").length;
  html += `<div class="header"><div><h1>Master Data Progress Report — ${clientName}</h1>
  <p style="margin:4px 0;color:#64748b">Avance: <b>${Math.round(done / total * 100)}%</b> (${done}/${total}) · Generado: ${new Date().toLocaleString("es-MX")}</p></div></div>`;
  modules.forEach(mod => {
    const cats = byMod[mod.id] || [];
    if (!cats.length) return;
    const d = cats.filter(c => c.status === "Completado").length;
    html += `<h2>${mod.icon} ${mod.name} — ${d}/${cats.length} (${Math.round(d / cats.length * 100)}%)</h2>
    <table><tr><th>Clave</th><th>Catálogo</th><th>Status</th><th>Consultor</th><th>Responsable</th><th>Meta%</th><th>Quant%</th><th>Calificación</th><th>Observaciones</th></tr>`;
    cats.forEach(c => {
      const cls = c.status === "Completado" ? "done" : c.status === "Pendiente" ? "pend" : c.status === "En Proceso" ? "prog" : c.status === "En Revisión" ? "rev" : "blk";
      html += `<tr><td>${c.catalog_key}</td><td>${c.catalog_name}</td><td class="${cls}">${c.status}</td>
      <td>${c.consultor || "—"}</td><td>${c.responsable || "—"}</td><td>${c.meta || "—"}</td>
      <td>${c.quantitative || "—"}</td><td>${c.calificacion_data || "—"}</td><td>${c.observaciones || "—"}</td></tr>`;
    });
    html += `</table>`;
  });
  html += `</body></html>`;
  win.document.write(html); win.document.close();
  setTimeout(() => win.print(), 500);
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const inp = (sm = false) => ({
  width: "100%", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
  padding: sm ? "6px 10px" : "9px 12px", color: "#1E293B", fontSize: sm ? 12 : 13,
  outline: "none", boxSizing: "border-box", fontFamily: "inherit",
});
const inpRO = { ...inp(), background: "#F8FAFC", color: "#94A3B8" };
const lbl = { display: "block", color: "#64748B", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 };
const card = { background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" };
const btnStyle = (v = "primary") => ({
  background: v === "primary" ? "#1D4ED8" : v === "danger" ? "#EF4444" : v === "success" ? "#22C55E" : "#F1F5F9",
  color: v === "ghost" ? "#64748B" : "#fff",
  border: "none", borderRadius: 8, padding: "9px 18px", cursor: "pointer",
  fontWeight: 600, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6,
});

// Status semaphore display (read-only, colored pill)
function StatusPill({ status }) {
  const colors = {
    "Pendiente":   { bg: "#F1F5F9", text: "#64748B", dot: "#94A3B8" },
    "En Revisión": { bg: "#FFFBEB", text: "#B45309", dot: "#F59E0B" },
    "En Proceso":  { bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
    "Completado":  { bg: "#F0FDF4", text: "#15803D", dot: "#22C55E" },
    "Bloqueado":   { bg: "#FEF2F2", text: "#B91C1C", dot: "#EF4444" },
  };
  const s = colors[status] || colors["Pendiente"];
  return (
    <span style={{ background: s.bg, color: s.text, border: `1px solid ${s.dot}33`, padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot, display: "inline-block", flexShrink: 0 }} />
      {status}
    </span>
  );
}
function Ring({ pct, size = 52, color = "#1D4ED8", sw = 5 }) {
  const r = (size - sw * 2) / 2, circ = 2 * Math.PI * r, dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={sw} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 0.6s ease" }} />
      <text x={size / 2} y={size / 2} fill="#1E293B" fontSize={size < 46 ? 9 : 11} fontWeight="700"
        textAnchor="middle" dominantBaseline="central"
        style={{ transform: `rotate(90deg)`, transformOrigin: `${size / 2}px ${size / 2}px` }}>{pct}%</text>
    </svg>
  );
}

// ── STATUS BADGE ──────────────────────────────────────────────────────────────
function StatusBadge({ status, onChange, readonly }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE["Pendiente"];
  if (readonly) return (
    <span style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}`, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block" }} />{status}
    </span>
  );
  return (
    <select value={status} onChange={e => onChange(e.target.value)}
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}`, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", outline: "none" }}>
      {STATUS_OPTS.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({ onLogin, loginLogo, onLogoChange }) {
  const [users, setUsers] = useState([]);
  const [nombre, setNombre] = useState("");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sbFetch("profiles").then(d => { setUsers(d); setLoading(false); });
  }, []);

  const go = () => {
    if (!nombre.trim() || !pin.trim()) { setErr("Ingresa tu nombre y PIN"); return; }
    // Match by name (case insensitive, partial match)
    const match = users.find(u =>
      u.name.toLowerCase().includes(nombre.trim().toLowerCase()) ||
      (u.client_id && u.client_id.toLowerCase().includes(nombre.trim().toLowerCase()))
    );
    if (!match) { setErr("Usuario no encontrado"); return; }
    if (match.pin && match.pin !== pin) { setErr("PIN incorrecto"); return; }
    onLogin(match);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0F2443 0%, #1a3a6b 50%, #0F2443 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      {/* Background decoration */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(59,130,246,0.06)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(99,102,241,0.08)", filter: "blur(60px)" }} />
      </div>

      <div style={{ width: 420, position: "relative", zIndex: 1 }}>
        {/* Logo area — editable */}
        <div style={{ textAlign: "center", marginBottom: 32, position: "relative" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img src={loginLogo} alt="Logo"
              style={{ height: 90, objectFit: "contain", filter: "brightness(1.1) drop-shadow(0 0 20px rgba(59,130,246,0.4))" }} />
            {/* Edit pencil */}
            <button onClick={() => document.getElementById("login-logo-input").click()}
              title="Cambiar logo"
              style={{ position: "absolute", top: -8, right: -8, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              ✏️
            </button>
            <input id="login-logo-input" type="file" accept="image/*" style={{ display: "none" }}
              onChange={e => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => onLogoChange(ev.target.result);
                reader.readAsDataURL(file);
              }} />
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Master Data Progress Report
          </div>
          <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, transparent, #3B82F6, transparent)", margin: "12px auto 0" }} />
        </div>

        {/* Card */}
        <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", padding: "32px 36px", boxShadow: "0 25px 60px rgba(0,0,0,0.4)" }}>
          <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 6, textAlign: "center" }}>Bienvenido</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center", marginBottom: 28 }}>Ingresa tus credenciales para continuar</p>

          {loading ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: 24 }}>Conectando...</div>
          ) : (
            <>
              <div style={{ marginBottom: 16 }}>
                <label style={{ ...lbl, color: "rgba(255,255,255,0.5)" }}>Nombre / Empresa</label>
                <input
                  value={nombre}
                  onChange={e => { setNombre(e.target.value); setErr(""); }}
                  onKeyDown={e => e.key === "Enter" && document.getElementById("pin-input").focus()}
                  placeholder="Escribe tu nombre o empresa..."
                  autoFocus
                  style={{ ...inp(), background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: 10 }}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ ...lbl, color: "rgba(255,255,255,0.5)" }}>PIN de acceso</label>
                <input
                  id="pin-input"
                  type="password"
                  value={pin}
                  maxLength={6}
                  onChange={e => { setPin(e.target.value); setErr(""); }}
                  onKeyDown={e => e.key === "Enter" && go()}
                  placeholder="••••••"
                  style={{ ...inp(), background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", textAlign: "center", letterSpacing: "0.5em", fontSize: 22, borderRadius: 10 }}
                />
              </div>
              {err && (
                <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "8px 14px", color: "#FCA5A5", fontSize: 13, textAlign: "center", marginBottom: 16 }}>
                  {err}
                </div>
              )}
              <button onClick={go}
                style={{ width: "100%", background: "linear-gradient(135deg, #1D4ED8, #3B82F6)", color: "#fff", border: "none", borderRadius: 10, padding: "13px", cursor: "pointer", fontWeight: 700, fontSize: 15, letterSpacing: "0.02em", boxShadow: "0 4px 20px rgba(59,130,246,0.4)", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                Ingresar →
              </button>
              <div style={{ textAlign: "center", marginTop: 16, color: "rgba(255,255,255,0.25)", fontSize: 11 }}>
                ¿No recuerdas tu PIN? Contacta al administrador
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── CATALOG MODAL ─────────────────────────────────────────────────────────────
// Semaphore colors
const SEMAPHORE = [
  { val: 0, color: "#E2E8F0", label: "Sin evaluar", text: "#94A3B8" },
  { val: 1, color: "#EF4444", label: "Bajo / Nulo",  text: "#fff" },
  { val: 2, color: "#F59E0B", label: "Medio",         text: "#fff" },
  { val: 3, color: "#22C55E", label: "Aceptable",     text: "#fff" },
];
const SEMAPHORE_FIELDS = [
  { key: "quality_veracidad",     label: "Veracidad" },
  { key: "quality_actualizacion", label: "Actualizados" },
  { key: "quality_cobertura",     label: "Cobertura" },
  { key: "quality_consistencia",  label: "Consistencia" },
  { key: "quality_autorizado",    label: "Autorizados" },
];

function SemaphoreField({ label, value, onChange, readonly }) {
  const cur = SEMAPHORE.find(s => s.val === (value || 0)) || SEMAPHORE[0];
  return (
    <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 14px" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", gap: 6 }}>
        {SEMAPHORE.map(s => (
          <button key={s.val} onClick={() => !readonly && onChange(s.val)}
            title={s.label}
            style={{
              flex: 1, height: 28, borderRadius: 6, border: `2px solid ${cur.val === s.val ? "#1D4ED8" : "transparent"}`,
              background: s.color, cursor: readonly ? "default" : "pointer",
              opacity: cur.val === s.val ? 1 : 0.4,
              transform: cur.val === s.val ? "scale(1.08)" : "scale(1)",
              transition: "all 0.15s", position: "relative"
            }}>
            {cur.val === s.val && <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: s.text, fontWeight: 700 }}>●</span>}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 10, color: cur.text === "#fff" ? cur.color : "#94A3B8", marginTop: 5, fontWeight: 600, background: cur.val > 0 ? cur.color + "22" : "transparent", borderRadius: 4, padding: "2px 6px", display: "inline-block" }}>
        {cur.label}
      </div>
    </div>
  );
}

// ── META PASSWORD MODAL ───────────────────────────────────────────────────────
function MetaPasswordModal({ onConfirm, onCancel, users }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const verify = () => {
    const match = users.find(u => u.pin === pwd && (u.role === "consultor" || u.role === "admin"));
    if (!match) { setErr("PIN incorrecto o no autorizado"); return; }
    onConfirm(match.name);
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 14, padding: "28px 32px", width: 360, boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
        <div style={{ fontSize: 28, textAlign: "center", marginBottom: 8 }}>🔐</div>
        <h3 style={{ textAlign: "center", margin: "0 0 6px", color: "#1E293B", fontSize: 16, fontWeight: 700 }}>Firma Electrónica</h3>
        <p style={{ textAlign: "center", color: "#64748B", fontSize: 13, marginBottom: 20 }}>Ingresa tu PIN de consultor para modificar la Meta</p>
        <label style={lbl}>PIN de autorización</label>
        <input type="password" value={pwd} onChange={e => { setPwd(e.target.value); setErr(""); }}
          onKeyDown={e => e.key === "Enter" && verify()}
          placeholder="••••••" maxLength={6}
          style={{ ...inp(), textAlign: "center", letterSpacing: "0.4em", fontSize: 20, marginBottom: 10 }} />
        {err && <div style={{ color: "#EF4444", fontSize: 12, textAlign: "center", marginBottom: 10 }}>{err}</div>}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{ ...btnStyle("ghost"), flex: 1, justifyContent: "center", border: "1px solid #E2E8F0" }}>Cancelar</button>
          <button onClick={verify} style={{ ...btnStyle("primary"), flex: 1, justifyContent: "center" }}>Autorizar</button>
        </div>
      </div>
    </div>
  );
}


function CatalogModal({ cat, user, clientId, modules, users, onSave, onClose }) {
  const [f, setF] = useState({
    ...cat,
    // Auto-fill today's date if empty
    fecha_revision: cat.fecha_revision || new Date().toISOString().slice(0, 10),
  });
  const [obsHistory, setObsHistory] = useState([]);
  const [newObs, setNewObs] = useState("");
  const [saving, setSaving] = useState(false);
  const [showMetaPwd, setShowMetaPwd] = useState(false);
  const [metaLocked, setMetaLocked] = useState(!!cat.meta && Number(cat.meta) > 0);
  const [pendingMeta, setPendingMeta] = useState("");
  const readonly = user.role === "cliente";
  const mod = modules.find(m => m.id === cat.module_id);
  const obsRef = useRef(null);

  // Load observation history from comments table with type="obs"
  useEffect(() => {
    if (cat.id) {
      sbFetch("comments", { filters: [["catalog_id", cat.id]], order: { col: "created_at", asc: true } })
        .then(data => setObsHistory(data));
    }
  }, [cat.id]);

  useEffect(() => {
    if (obsRef.current) obsRef.current.scrollTop = obsRef.current.scrollHeight;
  }, [obsHistory]);

  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  const addObs = async () => {
    if (!newObs.trim()) return;
    const c = await sbInsert("comments", {
      catalog_id: cat.id, client_id: clientId,
      author_name: user.name, author_role: user.role, text: newObs.trim()
    });
    if (c?.id) setObsHistory(p => [...p, c]);
    setNewObs("");
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      status: f.status, consultor: f.consultor, responsable: f.responsable,
      fecha_revision: f.fecha_revision || null,
      meta: f.meta ? Number(f.meta) : null,
      quantitative: f.quantitative !== "" && f.quantitative !== null && f.quantitative !== undefined ? Number(f.quantitative) : null,
      quality_veracidad: Number(f.quality_veracidad) || 0,
      quality_actualizacion: Number(f.quality_actualizacion) || 0,
      quality_cobertura: Number(f.quality_cobertura) || 0,
      quality_consistencia: Number(f.quality_consistencia) || 0,
      quality_autorizado: Number(f.quality_autorizado) || 0,
      calificacion_data: f.calificacion_data,
      updated_by: user.name, updated_at: new Date().toISOString(),
    };
    try {
      await sbUpdate("catalogs", payload, [["id", cat.id]]);
      if (cat.status !== f.status) {
        await sbInsert("activity_log", {
          client_id: clientId, module_id: cat.module_id,
          catalog_key: cat.catalog_key, catalog_name: cat.catalog_name,
          action: "Cambio de status", old_value: cat.status,
          new_value: f.status, author_name: user.name
        });
      }
      // Update local state directly with saved values
      onSave({ ...cat, ...payload });
    } catch(e) {
      console.error("Save error:", e);
    }
    setSaving(false);
    onClose();
  };

  // Lock meta once it has a value
  const metaLocked = !!cat.meta && cat.meta !== "" && cat.meta !== "0";

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 680, maxHeight: "94vh", overflow: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.2)" }}>
        {/* Header */}
        <div style={{ background: mod?.color || "#1D4ED8", padding: "16px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, marginBottom: 2 }}>{mod?.icon} {mod?.name} · {cat.catalog_key}</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{cat.catalog_name}</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div style={{ padding: "20px 22px" }}>
          {showMetaPwd && (
            <MetaPasswordModal users={users}
              onConfirm={(authorName) => {
                setF(p => ({ ...p, meta: pendingMeta }));
                setMetaLocked(false);
                setShowMetaPwd(false);
                setPendingMeta("");
              }}
              onCancel={() => { setShowMetaPwd(false); setPendingMeta(""); }}
            />
          )}
          {/* Row 1: Status + Fecha */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <label style={lbl}>Status</label>
              <StatusBadge status={f.status} onChange={v => set("status", v)} readonly={readonly} />
            </div>
            <div>
              <label style={lbl}>Fecha de Revisión</label>
              <input type="date" value={f.fecha_revision || ""} onChange={e => set("fecha_revision", e.target.value)} readOnly={readonly}
                style={readonly ? inpRO : inp()} />
            </div>
          </div>

          {/* Row 2: Consultor + Responsable */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <label style={lbl}>Consultor ADVAN</label>
              {readonly ? <div style={inpRO}>{f.consultor || "—"}</div> : (
                <select value={f.consultor || ""} onChange={e => set("consultor", e.target.value)} style={{ ...inp(), cursor: "pointer" }}>
                  <option value="">— Seleccionar —</option>
                  {CONSULTORES.map(c => <option key={c}>{c}</option>)}
                </select>
              )}
            </div>
            <div>
              <label style={lbl}>Responsable Cliente</label>
              <input value={f.responsable || ""} onChange={e => set("responsable", e.target.value)} readOnly={readonly} style={readonly ? inpRO : inp()} />
            </div>
          </div>

          {/* Row 3: Meta (locked) + Quantitative + Calificacion */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
            <div>
              <label style={lbl}>
                Meta (%) {metaLocked && !readonly && <span style={{ color: "#F59E0B", fontSize: 10, cursor: "pointer" }} onClick={() => { setPendingMeta(String(f.meta || "")); setShowMetaPwd(true); }}>🔒 Cambiar</span>}
              </label>
              {metaLocked && !readonly ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ ...inp(), background: "#FFF7ED", color: "#92400E", fontWeight: 700, flex: 1 }}>{f.meta}%</div>
                  <button onClick={() => { setPendingMeta(String(f.meta || "")); setShowMetaPwd(true); }}
                    style={{ background: "#FFF7ED", border: "1px solid #FCD34D", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 12, color: "#92400E" }}>✏️</button>
                </div>
              ) : (
                <input type="number" min="0" max="100"
                  value={f.meta || ""}
                  onChange={e => {
                    if (metaLocked) { setPendingMeta(e.target.value); setShowMetaPwd(true); }
                    else { set("meta", e.target.value); if (e.target.value) setMetaLocked(true); }
                  }}
                  readOnly={readonly}
                  style={readonly ? inpRO : inp()} placeholder="0-100" />
              )}
            </div>
            <div>
              <label style={lbl}>Quantitative (%)</label>
              <input type="number" min="0" max="100" value={f.quantitative || ""} onChange={e => set("quantitative", e.target.value)} readOnly={readonly}
                style={readonly ? inpRO : inp()} placeholder="0-100" />
            </div>
            <div>
              <label style={lbl}>Calificación</label>
              {readonly ? <div style={inpRO}>{f.calificacion_data || "—"}</div> : (
                <select value={f.calificacion_data || "Data Inexistente"} onChange={e => set("calificacion_data", e.target.value)} style={{ ...inp(), cursor: "pointer" }}>
                  {CALIFICACION_OPTS.map(o => <option key={o}>{o}</option>)}
                </select>
              )}
            </div>
          </div>

          {/* Semaphore quality */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ ...lbl, marginBottom: 10 }}>Criterios de Calidad</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))", gap: 10 }}>
              {SEMAPHORE_FIELDS.map(sf => (
                <SemaphoreField key={sf.key} label={sf.label}
                  value={typeof f[sf.key] === "number" ? f[sf.key] : (f[sf.key] ? 3 : 0)}
                  onChange={v => set(sf.key, v)} readonly={readonly} />
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: "flex", gap: 12, marginTop: 10, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "#94A3B8" }}>Semáforo:</span>
              {SEMAPHORE.slice(1).map(s => (
                <span key={s.val} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#64748B" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, display: "inline-block" }} />
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Observation history */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ ...lbl, marginBottom: 8 }}>
              Historial de Observaciones
              <span style={{ color: "#94A3B8", fontWeight: 400, fontSize: 10, marginLeft: 8, textTransform: "none", letterSpacing: 0 }}>({obsHistory.length} entradas)</span>
            </label>
            <div ref={obsRef} style={{ maxHeight: 220, overflowY: "auto", border: "1px solid #E2E8F0", borderRadius: 10, background: "#F8FAFC", padding: obsHistory.length ? 0 : 12 }}>
              {obsHistory.length === 0 && <div style={{ textAlign: "center", color: "#CBD5E1", fontSize: 12, padding: "16px 0" }}>Sin observaciones aún — agrega la primera</div>}
              {obsHistory.map((o, i) => (
                <div key={o.id} style={{ padding: "12px 14px", borderBottom: i < obsHistory.length - 1 ? "1px solid #E2E8F0" : "none", background: i % 2 === 0 ? "#fff" : "#F8FAFC" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                      {o.author_name.slice(0, 2).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 12, color: "#1D4ED8" }}>{o.author_name}</span>
                    <span style={{ fontSize: 10, color: "#94A3B8", background: "#F1F5F9", borderRadius: 4, padding: "1px 6px" }}>{o.author_role}</span>
                    <span style={{ fontSize: 10, color: "#CBD5E1", marginLeft: "auto" }}>{new Date(o.created_at).toLocaleString("es-MX")}</span>
                  </div>
                  <div style={{ color: "#374151", fontSize: 13, lineHeight: 1.5, paddingLeft: 32 }}>{o.text}</div>
                </div>
              ))}
            </div>
            {!readonly && (
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <textarea value={newObs} onChange={e => setNewObs(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), addObs())}
                  placeholder="Agrega una observación... (Enter para guardar, Shift+Enter para nueva línea)"
                  rows={2}
                  style={{ ...inp(true), flex: 1, resize: "none", fontFamily: "inherit" }} />
                <button onClick={addObs} style={{ ...btnStyle("primary"), padding: "0 16px", flexShrink: 0, alignSelf: "stretch" }}>+</button>
              </div>
            )}
          </div>
          {/* Actions */}
          {!readonly && (
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 8, borderTop: "1px solid #F1F5F9" }}>
              <button onClick={onClose} style={{ ...btnStyle("ghost"), border: "1px solid #E2E8F0" }}>Cancelar</button>
              <button onClick={save} disabled={saving} style={{ ...btnStyle("primary"), opacity: saving ? 0.7 : 1 }}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MODULE VIEW ───────────────────────────────────────────────────────────────
function ModuleView({ module, catalogs, user, clientId, modules, users, onUpdate, onBack }) {
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [fStatus, setFStatus] = useState("Todos");

  const filtered = catalogs.filter(c =>
    (c.catalog_name.toLowerCase().includes(search.toLowerCase()) || c.catalog_key.toLowerCase().includes(search.toLowerCase())) &&
    (fStatus === "Todos" || c.status === fStatus)
  );
  const pct = calcPct(catalogs);
  const sel = modal ? catalogs.find(c => c.id === modal) : null;

  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", color: "#1E293B" }}>
      {sel && <CatalogModal cat={sel} user={user} clientId={clientId} modules={modules} users={users}
        onSave={updated => onUpdate(updated)} onClose={() => setModal(null)} />}
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22, flexWrap: "wrap" }}>
        <button onClick={onBack} style={{ ...btnStyle("ghost"), border: "1px solid #E2E8F0", padding: "7px 14px" }}>← Volver</button>
        <div style={{ width: 4, height: 40, background: module.color, borderRadius: 2 }} />
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}><ModIcon id={module.id} size={20} color={module.color} bg={true} /> {module.name}</h2>
          <div style={{ color: "#94A3B8", fontSize: 12 }}>{catalogs.length} catálogos · {catalogs.filter(c => c.status === "Completado").length} completados</div>
        </div>
        <div style={{ marginLeft: "auto" }}><Ring pct={pct} color={pct >= 81 ? "#22C55E" : pct >= 60 ? "#F59E0B" : pct > 0 ? "#EF4444" : "#E2E8F0"} size={56} /></div>
      </div>
      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar catálogo..."
          style={{ ...inp(true), width: 220 }} />
        <select value={fStatus} onChange={e => setFStatus(e.target.value)} style={{ ...inp(true), width: 160, cursor: "pointer" }}>
          <option>Todos</option>
          {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ color: "#94A3B8", fontSize: 12 }}>{filtered.length} resultados</span>
      </div>
      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Clave", "Catálogo", "Status", "Consultor", "Responsable", "Avance", "Acción"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#64748B", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #E2E8F0" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const qs = calcQuality(c);
              const qpct = Number(c.quantitative) || 0;
              // Semaphore gradient color based on quantitative %
              const gradientColor = qpct === 0
                ? "#E2E8F0"
                : `linear-gradient(90deg, #EF4444 0%, #F59E0B ${Math.min(qpct, 50)}%, #22C55E ${Math.min(qpct * 1.5, 100)}%)`;
              return (
                <tr key={c.id} style={{ borderBottom: "1px solid #F1F5F9" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 14px", fontFamily: "monospace", fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>{c.catalog_key}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 500, color: "#1E293B" }}>{c.catalog_name}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <StatusPill status={c.status} />
                  </td>
                  <td style={{ padding: "10px 14px", color: "#64748B", fontSize: 12 }}>{c.consultor || <span style={{ color: "#CBD5E1" }}>—</span>}</td>
                  <td style={{ padding: "10px 14px", color: "#64748B", fontSize: 12 }}>{c.responsable || <span style={{ color: "#CBD5E1" }}>—</span>}</td>
                  <td style={{ padding: "10px 14px", minWidth: 120 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 8, background: "#F1F5F9", borderRadius: 10, overflow: "hidden", position: "relative" }}>
                        <div style={{
                        height: "100%", width: `${qpct}%`,
                          background: qpct === 0 ? "#E2E8F0" : qpct >= 81 ? "#22C55E" : qpct >= 60 ? "#F59E0B" : "#EF4444",
                          borderRadius: 10,
                          transition: "width 0.6s ease, background 0.4s ease",
                          boxShadow: qpct > 0 ? "0 1px 3px rgba(0,0,0,0.15)" : "none"
                        }} />
                      </div>
                      <span style={{ fontSize: 11, color: qpct === 0 ? "#CBD5E1" : qpct >= 81 ? "#15803D" : qpct >= 60 ? "#B45309" : "#B91C1C", fontWeight: 700, minWidth: 28, textAlign: "right" }}>
                        {qpct > 0 ? `${qpct}%` : "—"}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <button onClick={() => setModal(c.id)}
                      style={{ background: "#F1F5F9", color: "#3B82F6", border: "1px solid #E2E8F0", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                      {user.role === "cliente" ? "Ver ›" : "Editar ›"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!filtered.length && <div style={{ textAlign: "center", padding: 40, color: "#CBD5E1", fontSize: 13 }}>Sin resultados</div>}
      </div>
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────────────────────────
function AdminPanel({ modules, onModuleAdded, onClose }) {
  const [tab, setTab] = useState("clients");
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ id: "", name: "", pin: "", contactName: "" });
  const [selectedModules, setSelectedModules] = useState({});
  const [newMod, setNewMod] = useState({ id: "", name: "", icon: "📁", color: "#6366F1" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(1); // 1=datos, 2=módulos, 3=confirmación

  useEffect(() => {
    sbFetch("clients").then(setClients);
    // Pre-select all modules
    const all = {};
    modules.forEach(m => { all[m.id] = true; });
    setSelectedModules(all);
  }, [modules]);

  const toggleMod = (id) => setSelectedModules(p => ({ ...p, [id]: !p[id] }));
  const selCount = Object.values(selectedModules).filter(Boolean).length;

  const createClient = async () => {
    setBusy(true);
    try {
      const cid = newClient.id.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
      // 1. Create client
      await sbInsert("clients", { id: cid, name: newClient.name });
      // 2. Create user profile
      await sbInsert("profiles", {
        name: newClient.contactName || newClient.name,
        role: "cliente", client_id: cid,
        pin: newClient.pin,
        avatar: newClient.name.slice(0, 2).toUpperCase()
      });
      // 3. Insert catalogs only for selected modules
      // First get all catalog templates from existing client or use init function
      const selectedModIds = Object.entries(selectedModules).filter(([,v])=>v).map(([k])=>k);

      for (const modId of selectedModIds) {
        // Get catalog names from any existing client's data for this module
        const templates = await sbFetch("catalogs", { filters: [["module_id", modId]] });
        const unique = [];
        const seen = new Set();
        templates.forEach(t => {
          // Use catalog_key pattern without client prefix
          const baseKey = t.catalog_key;
          if (!seen.has(baseKey)) { seen.add(baseKey); unique.push(t); }
        });
        // Insert catalogs for new client
        for (const t of unique) {
          await sbInsert("catalogs", {
            client_id: cid, module_id: modId,
            catalog_key: t.catalog_key.replace(/^[^_]+/, cid.slice(0,3).toUpperCase()),
            catalog_name: t.catalog_name
          }).catch(() => {});
        }
      }

      const updated = await sbFetch("clients");
      setClients(updated);
      setMsg(`✓ Cliente "${newClient.name}" creado con ${selectedModIds.length} módulos y sus catálogos`);
      setNewClient({ id: "", name: "", pin: "", contactName: "" });
      setStep(1);
      setBusy(false);
    } catch(e) {
      setMsg("⚠️ Error al crear el cliente. Verifica los datos.");
      setBusy(false);
    }
  };

  const createModule = async () => {
    if (!newMod.id || !newMod.name) { setMsg("⚠️ ID y nombre son requeridos"); return; }
    await sbInsert("modules", { id: newMod.id.toUpperCase(), name: newMod.name, icon: newMod.icon, color: newMod.color, sort_order: modules.length + 1 });
    setMsg("✓ Módulo creado.");
    onModuleAdded();
    setNewMod({ id: "", name: "", icon: "📁", color: "#6366F1" });
  };

  const canNext1 = newClient.id && newClient.name && newClient.pin && newClient.contactName;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 660, maxHeight: "92vh", overflow: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.2)" }}>
        {/* Header */}
        <div style={{ background: "#1E3A5F", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>⚙️ Panel de Administración</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>

        <div style={{ padding: "20px 24px" }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#F1F5F9", borderRadius: 10, padding: 4 }}>
            {[["clients", "👥 Clientes"], ["modules", "📦 Módulos"]].map(([k, l]) => (
              <button key={k} onClick={() => { setTab(k); setStep(1); setMsg(""); }}
                style={{ flex: 1, background: tab === k ? "#fff" : "transparent", border: "none", borderRadius: 8, padding: "8px", cursor: "pointer", fontWeight: tab === k ? 700 : 400, color: tab === k ? "#1D4ED8" : "#64748B", fontSize: 13 }}>{l}</button>
            ))}
          </div>

          {msg && <div style={{ background: msg.startsWith("⚠️") ? "#FEF2F2" : "#F0FDF4", border: `1px solid ${msg.startsWith("⚠️") ? "#FCA5A5" : "#86EFAC"}`, borderRadius: 8, padding: "10px 14px", color: msg.startsWith("⚠️") ? "#B91C1C" : "#15803D", fontSize: 13, marginBottom: 16 }}>{msg}</div>}

          {/* ── CLIENTES TAB ── */}
          {tab === "clients" && <>
            {/* Step indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              {[["1", "Datos del cliente"], ["2", "Seleccionar módulos"], ["3", "Confirmar"]].map(([n, l], i) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: step >= Number(n) ? "#1D4ED8" : "#E2E8F0", color: step >= Number(n) ? "#fff" : "#94A3B8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{n}</div>
                  <span style={{ fontSize: 11, color: step >= Number(n) ? "#1D4ED8" : "#94A3B8", fontWeight: step === Number(n) ? 700 : 400 }}>{l}</span>
                  {i < 2 && <div style={{ flex: 1, height: 2, background: step > Number(n) ? "#1D4ED8" : "#E2E8F0", borderRadius: 2 }} />}
                </div>
              ))}
            </div>

            {/* STEP 1: Client data */}
            {step === 1 && <>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#1E293B" }}>Datos del nuevo cliente</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[
                  ["name", "Nombre completo de la empresa", "text"],
                  ["contactName", "Nombre del contacto principal", "text"],
                  ["id", "ID / Slug (ej: empresa_abc)", "text"],
                  ["pin", "PIN de acceso (4-6 dígitos)", "password"],
                ].map(([k, l, t]) => (
                  <div key={k}>
                    <label style={lbl}>{l}</label>
                    <input type={t} value={newClient[k] || ""} onChange={e => setNewClient(p => ({ ...p, [k]: e.target.value }))}
                      style={inp(true)} placeholder={k === "id" ? "sin espacios ni acentos" : ""} />
                  </div>
                ))}
              </div>
              <button onClick={() => canNext1 && setStep(2)} disabled={!canNext1}
                style={{ ...btnStyle("primary"), width: "100%", justifyContent: "center", opacity: canNext1 ? 1 : 0.5 }}>
                Siguiente → Seleccionar módulos
              </button>
            </>}

            {/* STEP 2: Module selection */}
            {step === 2 && <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", margin: 0 }}>Módulos del cliente</h3>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { const a={}; modules.forEach(m=>{a[m.id]=true}); setSelectedModules(a); }}
                    style={{ fontSize: 11, color: "#1D4ED8", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Seleccionar todos</button>
                  <button onClick={() => setSelectedModules({})}
                    style={{ fontSize: 11, color: "#64748B", background: "none", border: "none", cursor: "pointer" }}>Limpiar</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                {modules.map(m => {
                  const sel = !!selectedModules[m.id];
                  return (
                    <label key={m.id} onClick={() => toggleMod(m.id)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: `2px solid ${sel ? m.color : "#E2E8F0"}`, background: sel ? m.color + "12" : "#F8FAFC", cursor: "pointer", userSelect: "none", transition: "all 0.15s" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: sel ? m.color : "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                        {sel && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
                      </div>
                      <ModIcon id={m.id} size={16} color={sel ? m.color : "#94A3B8"} />
                      <span style={{ fontSize: 12, fontWeight: sel ? 700 : 400, color: sel ? "#1E293B" : "#64748B" }}>{m.name}</span>
                    </label>
                  );
                })}
              </div>
              <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#1D4ED8" }}>
                <strong>{selCount}</strong> de {modules.length} módulos seleccionados
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(1)} style={{ ...btnStyle("ghost"), border: "1px solid #E2E8F0", flex: 1, justifyContent: "center" }}>← Atrás</button>
                <button onClick={() => selCount > 0 && setStep(3)} disabled={selCount === 0}
                  style={{ ...btnStyle("primary"), flex: 2, justifyContent: "center", opacity: selCount > 0 ? 1 : 0.5 }}>
                  Siguiente → Confirmar
                </button>
              </div>
            </>}

            {/* STEP 3: Confirm */}
            {step === 3 && <>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "#1E293B" }}>Confirmar creación</h3>
              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "16px 18px", marginBottom: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                  {[["Empresa", newClient.name], ["Contacto", newClient.contactName], ["ID", newClient.id], ["PIN", "••••"]].map(([l, v]) => (
                    <div key={l}>
                      <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
                      <div style={{ fontSize: 13, color: "#1E293B", fontWeight: 600, marginTop: 2 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 12 }}>
                  <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Módulos asignados ({selCount})</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {modules.filter(m => selectedModules[m.id]).map(m => (
                      <span key={m.id} style={{ background: m.color + "18", color: m.color, border: `1px solid ${m.color}44`, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 600 }}>
                        {m.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(2)} style={{ ...btnStyle("ghost"), border: "1px solid #E2E8F0", flex: 1, justifyContent: "center" }}>← Atrás</button>
                <button onClick={createClient} disabled={busy}
                  style={{ ...btnStyle("success"), flex: 2, justifyContent: "center", opacity: busy ? 0.7 : 1 }}>
                  {busy ? "Creando cliente..." : `✓ Crear cliente con ${selCount} módulos`}
                </button>
              </div>
            </>}

            {/* Existing clients list */}
            {step === 1 && clients.length > 0 && <>
              <div style={{ marginTop: 28, borderTop: "1px solid #F1F5F9", paddingTop: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#1E293B" }}>Clientes existentes ({clients.length})</h3>
                {clients.map(c => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "#F8FAFC", borderRadius: 8, marginBottom: 6 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#0369A1" }}>
                      {c.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "#1E293B" }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>ID: {c.id}</div>
                    </div>
                    <span style={{ fontSize: 11, background: "#F0FDF4", color: "#15803D", border: "1px solid #86EFAC", borderRadius: 6, padding: "2px 8px", fontWeight: 600 }}>Activo</span>
                  </div>
                ))}
              </div>
            </>}
          </>}

          {/* ── MÓDULOS TAB ── */}
          {tab === "modules" && <>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#1E293B" }}>Crear nuevo módulo</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div><label style={lbl}>ID (ej: NUE)</label><input value={newMod.id} onChange={e => setNewMod(p => ({ ...p, id: e.target.value.toUpperCase() }))} style={inp(true)} /></div>
              <div><label style={lbl}>Nombre</label><input value={newMod.name} onChange={e => setNewMod(p => ({ ...p, name: e.target.value }))} style={inp(true)} /></div>
              <div><label style={lbl}>Ícono (emoji)</label><input value={newMod.icon} onChange={e => setNewMod(p => ({ ...p, icon: e.target.value }))} style={{ ...inp(true), width: 80 }} /></div>
              <div><label style={lbl}>Color</label><input type="color" value={newMod.color} onChange={e => setNewMod(p => ({ ...p, color: e.target.value }))} style={{ ...inp(true), width: 60, padding: 4, cursor: "pointer" }} /></div>
            </div>
            <button onClick={createModule} style={{ ...btnStyle("primary"), marginBottom: 24 }}>+ Crear módulo</button>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Módulos existentes ({modules.length})</h3>
            {modules.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#F8FAFC", borderRadius: 8, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontFamily: "monospace", color: "#64748B", width: 50 }}>{m.id}</span>
                <ModIcon id={m.id} size={16} color={m.color} />
                <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{m.name}</span>
              </div>
            ))}
          </>}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [clients, setClients] = useState([]);
  const [selClient, setSelClient] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [clientLogos, setClientLogos] = useState({});
  const [loginLogo, setLoginLogo] = useState(ADVANONE_LOGO);
  const [view, setView] = useState("dashboard");
  const [activeMod, setActiveMod] = useState(null);
  const [activity, setActivity] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const clientId = user?.role === "cliente" ? user.client_id : (selClient || null);

  const normalize = (c) => ({
    ...c,
    quantitative: c.quantitative !== null && c.quantitative !== undefined ? Number(c.quantitative) : null,
    meta: c.meta !== null && c.meta !== undefined ? Number(c.meta) : null,
    quality_veracidad: Number(c.quality_veracidad) || 0,
    quality_actualizacion: Number(c.quality_actualizacion) || 0,
    quality_cobertura: Number(c.quality_cobertura) || 0,
    quality_consistencia: Number(c.quality_consistencia) || 0,
    quality_autorizado: Number(c.quality_autorizado) || 0,
  });

  const loadAll = useCallback(async (cid) => {
    setLoading(true);
    const [cats, acts] = await Promise.all([
      sbFetch("catalogs", { filters: [["client_id", cid]], order: { col: "catalog_key", asc: true } }),
      sbFetch("activity_log", { filters: [["client_id", cid]], order: { col: "created_at", asc: false } }),
    ]);
    setCatalogs(cats.map(normalize));
    setActivity(acts.slice(0, 30));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user) return;
    sbFetch("modules", { order: { col: "sort_order", asc: true } }).then(setModules);
    sbFetch("profiles").then(setAllUsers);
    if (user.role !== "cliente") {
      sbFetch("clients").then(d => { setClients(d); if (d.length) setSelClient(d[0].id); });
    }
  }, [user]);

  useEffect(() => {
    if (!clientId || !user) return;
    loadAll(clientId);
    // NO polling — updates are handled locally on save
  }, [clientId, user, loadAll]);

  // Called after saving a catalog — updates ONLY that one catalog in local state
  const handleUpdate = useCallback((updated) => {
    if (!updated?.id) return;
    setCatalogs(prev => prev.map(c => c.id === updated.id ? normalize(updated) : c));
  }, []);

  if (!user) return <Login onLogin={u => setUser(u)} loginLogo={loginLogo} onLogoChange={setLoginLogo} />;

  const modCats = (mid) => catalogs.filter(c => c.module_id === mid);
  const totalDone = catalogs.filter(c => c.status === "Completado").length;
  const totalPct = calcPct(catalogs);
  const currentClientName = clients.find(c => c.id === clientId)?.name || clientId || "";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Segoe UI',system-ui,sans-serif", color: "#1E293B" }}>
      {showAdmin && <AdminPanel modules={modules} onModuleAdded={() => sbFetch("modules", { order: { col: "sort_order", asc: true } }).then(setModules)} onClose={() => setShowAdmin(false)} />}

      {/* SIDEBAR */}
      <div style={{ width: 256, background: "#1E3A5F", display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh", position: "sticky", top: 0, overflow: "hidden" }}>
        {/* Logo */}
        <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.15)" }}>
          {/* ADVAN PRO SUITE */}
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <img src={ADVAN_LOGO} alt="ADVAN" style={{ height: 38, objectFit: "contain", filter: "brightness(10) invert(0)" }} />
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, marginTop: 3, letterSpacing: "0.12em", textTransform: "uppercase" }}>Master Data Progress</div>
          </div>
          {/* Client logo upload */}
          {clientId && (
            <div title="Clic para cambiar logo del cliente"
              onClick={() => document.getElementById("client-logo-input").click()}
              style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "6px 8px", border: "1px dashed rgba(255,255,255,0.15)", cursor: "pointer", position: "relative", textAlign: "center", minHeight: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {clientLogos[clientId]
                ? <img src={clientLogos[clientId]} alt="Logo cliente" style={{ maxHeight: 36, maxWidth: "90%", objectFit: "contain" }} />
                : <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>✏️ Logo del cliente</span>
              }
              <span style={{ position: "absolute", top: 3, right: 4, fontSize: 9, color: "rgba(255,255,255,0.4)" }}>✏️</span>
            </div>
          )}
          <input id="client-logo-input" type="file" accept="image/*" style={{ display: "none" }}
            onChange={e => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = ev => setClientLogos(prev => ({ ...prev, [clientId]: ev.target.result }));
              reader.readAsDataURL(file);
            }} />
        </div>
        {/* Client selector (admin/consultor only) */}
        {user.role !== "cliente" && (
          <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.08em" }}>Cliente activo</div>
            <select value={selClient || ""} onChange={e => setSelClient(e.target.value)}
              style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: 8, padding: "7px 10px", fontSize: 12, outline: "none", cursor: "pointer" }}>
              {clients.map(c => <option key={c.id} value={c.id} style={{ background: "#1E3A5F" }}>{c.name}</option>)}
            </select>
          </div>
        )}
        {/* Navigation */}
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 8px" }}>
          {[["dashboard", "🏠", "Dashboard"], ["activity", "📜", "Actividad"]].map(([v, icon, label]) => (
            <button key={v} onClick={() => { setView(v); setActiveMod(null); }}
              style={{ width: "100%", textAlign: "left", background: view === v ? "rgba(255,255,255,0.12)" : "transparent", border: "none", borderRadius: 8, padding: "8px 12px", color: view === v ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 13, fontWeight: view === v ? 600 : 400, marginBottom: 2, display: "flex", alignItems: "center", gap: 8 }}>
              <span>{icon}</span>{label}
            </button>
          ))}
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", padding: "10px 12px 4px", fontWeight: 600 }}>Módulos</div>
          {modules.map(m => {
            const cats = modCats(m.id);
            const pct = calcPct(cats);
            const isA = activeMod === m.id && view === "module";
            return (
              <button key={m.id} onClick={() => { setActiveMod(m.id); setView("module"); }}
                style={{ width: "100%", textAlign: "left", background: isA ? "rgba(255,255,255,0.12)" : "transparent", border: isA ? `1px solid ${m.color}66` : "1px solid transparent", borderRadius: 8, padding: "7px 10px", color: isA ? "#fff" : "rgba(255,255,255,0.55)", cursor: "pointer", fontSize: 12, marginBottom: 1, display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}>
                <ModIcon id={m.id} size={14} color={isA ? "#fff" : "rgba(255,255,255,0.55)"} />
                <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: pct === 100 ? "#4ADE80" : pct > 50 ? "#93C5FD" : "rgba(255,255,255,0.3)", flexShrink: 0 }}>{pct}%</span>
              </button>
            );
          })}
        </div>
        {/* Footer */}
        <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {user.role === "admin" && (
            <button onClick={() => setShowAdmin(true)}
              style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "7px 12px", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 12, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
              ⚙️ Administración
            </button>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{user.avatar || user.name[0]}</div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ color: "#fff", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>{ROLES[user.role]}</div>
            </div>
            <button onClick={() => setUser(null)} title="Cerrar sesión" style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 18, padding: 2 }}>↩</button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h1 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
              {view === "module" && activeMod
                ? modules.find(m => m.id === activeMod)?.name || ''
                : view === "activity" ? "📜 Actividad Reciente" : "Dashboard General"}
            </h1>
            {loading && <span style={{ fontSize: 11, color: "#94A3B8", background: "#F1F5F9", borderRadius: 6, padding: "2px 8px" }}>↻ actualizando...</span>}
            {currentClientName && <span style={{ fontSize: 11, color: "#3B82F6", background: "#EFF6FF", borderRadius: 6, padding: "2px 8px", fontWeight: 600 }}>{currentClientName}</span>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => exportCSV(catalogs, modules, clientId || "export")} style={{ ...btnStyle("ghost"), border: "1px solid #E2E8F0", padding: "7px 14px" }}>⬇ CSV</button>
            <button onClick={() => exportPrint(catalogs, modules, currentClientName || clientId || "reporte")} style={{ ...btnStyle("ghost"), border: "1px solid #E2E8F0", padding: "7px 14px" }}>🖨 PDF</button>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>

          {/* DASHBOARD */}
          {view === "dashboard" && (
            <div>
              {/* KPI cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 22 }}>
                {[
                  { l: "Total Catálogos", v: catalogs.length, c: "#3B82F6", i: "📁" },
                  { l: "Completados", v: totalDone, c: "#22C55E", i: "✅" },
                  { l: "En Proceso", v: catalogs.filter(c => c.status === "En Proceso").length, c: "#6366F1", i: "⟳" },
                  { l: "Bloqueados", v: catalogs.filter(c => c.status === "Bloqueado").length, c: "#EF4444", i: "⊘" },
                ].map(s => (
                  <div key={s.l} style={card}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ color: "#94A3B8", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{s.l}</div>
                        <div style={{ color: s.c, fontSize: 28, fontWeight: 800 }}>{s.v}</div>
                      </div>
                      <div style={{ fontSize: 26, opacity: 0.8 }}>{s.i}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Overall progress */}
              <div style={{ ...card, marginBottom: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>Avance General del Proyecto</span>
                  <span style={{ color: "#1D4ED8", fontWeight: 800, fontSize: 18 }}>{totalPct}%</span>
                </div>
                <div style={{ height: 12, background: "#F1F5F9", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${totalPct}%`, background: totalPct === 0 ? "#E2E8F0" : totalPct >= 81 ? "#22C55E" : totalPct >= 60 ? "#F59E0B" : "#EF4444", borderRadius: 6, transition: "width 0.8s ease, background 0.4s ease" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ color: "#94A3B8", fontSize: 11 }}>{totalDone} de {catalogs.length} catálogos completados</span>
                  {currentClientName && <span style={{ color: "#94A3B8", fontSize: 11 }}>{currentClientName}</span>}
                </div>
              </div>
              {/* Module cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
                {modules.map(m => {
                  const cats = modCats(m.id);
                  if (!cats.length) return null;
                  const pct = calcPct(cats);
                  const done = cats.filter(c => c.status === "Completado").length;
                  const inP = cats.filter(c => c.status === "En Proceso").length;
                  const blk = cats.filter(c => c.status === "Bloqueado").length;
                  return (
                    <button key={m.id} onClick={() => { setActiveMod(m.id); setView("module"); }}
                      style={{ ...card, cursor: "pointer", textAlign: "left", position: "relative", overflow: "hidden", transition: "all 0.2s", padding: "16px 18px", border: "1px solid #E2E8F0" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.boxShadow = `0 4px 20px ${m.color}22`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: m.color }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <div>
                        <ModIcon id={m.id} size={28} color={m.color} bg={true} />
                          <div style={{ fontWeight: 700, fontSize: 13, color: "#1E293B" }}>{m.name}</div>
                          <div style={{ color: "#94A3B8", fontSize: 11, marginTop: 2 }}>{cats.length} catálogos</div>
                        </div>
                        <Ring pct={pct} color={pct >= 81 ? "#22C55E" : pct >= 60 ? "#F59E0B" : pct > 0 ? "#EF4444" : "#E2E8F0"} size={50} sw={4} />
                      </div>
                      <div style={{ height: 4, background: "#F1F5F9", borderRadius: 2, overflow: "hidden", marginBottom: 8 }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: pct === 0 ? "#E2E8F0" : pct >= 81 ? "#22C55E" : pct >= 60 ? "#F59E0B" : "#EF4444", borderRadius: 2, transition: "width 0.6s, background 0.4s" }} />
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <span style={{ fontSize: 10, color: "#22C55E", fontWeight: 600 }}>✓ {done}</span>
                        <span style={{ fontSize: 10, color: "#3B82F6", fontWeight: 600 }}>⟳ {inP}</span>
                        {blk > 0 && <span style={{ fontSize: 10, color: "#EF4444", fontWeight: 600 }}>⊘ {blk}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODULE VIEW */}
          {view === "module" && activeMod && (
            <ModuleView
              module={modules.find(m => m.id === activeMod)}
              catalogs={modCats(activeMod)}
              user={user} clientId={clientId} modules={modules} users={allUsers}
              onUpdate={handleUpdate}
              onBack={() => { setView("dashboard"); setActiveMod(null); }} />
          )}

          {/* ACTIVITY */}
          {view === "activity" && (
            <div style={card}>
              <h2 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 16px" }}>Últimos 30 cambios registrados</h2>
              {activity.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#CBD5E1" }}>Sin actividad registrada aún</div>}
              {activity.map((a, i) => (
                <div key={a.id} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", borderBottom: i < activity.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B82F6", marginTop: 5, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 2 }}>
                      <span style={{ fontWeight: 600, fontSize: 13, color: "#1E293B" }}>{a.author_name}</span>
                      <span style={{ color: "#64748B", fontSize: 12 }}>{a.action}</span>
                      <span style={{ color: "#3B82F6", fontSize: 12, fontFamily: "monospace", background: "#EFF6FF", padding: "1px 6px", borderRadius: 4 }}>{a.catalog_key}</span>
                    </div>
                    {a.old_value && <div style={{ color: "#94A3B8", fontSize: 11 }}>{a.old_value} → <span style={{ color: "#22C55E", fontWeight: 600 }}>{a.new_value}</span></div>}
                  </div>
                  <div style={{ color: "#CBD5E1", fontSize: 11, flexShrink: 0 }}>{new Date(a.created_at).toLocaleString("es-MX")}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
