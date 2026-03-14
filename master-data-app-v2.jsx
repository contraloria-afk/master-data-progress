import { useState, useEffect, useCallback, useRef } from "react";

const ADVAN_LOGO = "data:image/png;base64,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";
const ADVANONE_LOGO = "data:image/png;base64,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";

// ── SUPABASE ──────────────────────────────────────────────────────────────────
const SB_URL = "https://ipeevphsyjjsycddvang.supabase.co";
const SB_KEY = "sb_publishable_q-fH9Y2uU7ir4pB3R9weaw_J8WeaP_q";

async function sbFetch(table, opts = {}) {
  const { select = "*", filters = [], order = null } = opts;
  let url = `${SB_URL}/rest/v1/${table}?select=${select}`;
  filters.forEach(([col, val]) => { url += `&${col}=eq.${encodeURIComponent(val)}`; });
  if (order) url += `&order=${order.col}.${order.asc ? "asc" : "desc"}`;
  const res = await fetch(url, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } });
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
const calcPct = (cats) => !cats.length ? 0 : Math.round(cats.filter(c => c.status === "Completado").length / cats.length * 100);
const calcQuality = (cat) => Math.round(QUALITY_FIELDS.filter(f => cat[f.key]).length / QUALITY_FIELDS.length * 100);
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

// ── PROGRESS RING ─────────────────────────────────────────────────────────────
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
function Login({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [sel, setSel] = useState(null);
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sbFetch("profiles", { order: { col: "role", asc: true } }).then(d => { setUsers(d); setLoading(false); });
  }, []);

  const go = () => {
    const u = users.find(x => x.id === sel);
    if (!u) return;
    if (u.pin && u.pin !== pin) { setErr("PIN incorrecto"); return; }
    onLogin(u);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#EFF6FF 0%,#F0F9FF 50%,#F0FDF4 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <div style={{ width: 440, background: "#fff", borderRadius: 20, border: "1px solid #E2E8F0", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div style={{ background: "#1E3A5F", padding: "28px 32px", textAlign: "center" }}>
          <img src={ADVANONE_LOGO} alt="ADVAN ONE" style={{ height: 52, objectFit: "contain", marginBottom: 8 }} />
          <div style={{ color: "#93C5FD", fontSize: 12, marginTop: 8, letterSpacing: "0.05em" }}>Master Data Progress Report</div>
        </div>
        <div style={{ padding: "28px 32px" }}>
          {loading ? (
            <div style={{ textAlign: "center", color: "#94A3B8", padding: 24 }}>Cargando usuarios...</div>
          ) : (
            <>
              <div style={{ marginBottom: 16 }}>
                {users.map(u => (
                  <button key={u.id} onClick={() => { setSel(u.id); setPin(""); setErr(""); }}
                    style={{ width: "100%", textAlign: "left", background: sel === u.id ? "#EFF6FF" : "#F8FAFC", border: `1.5px solid ${sel === u.id ? "#3B82F6" : "#E2E8F0"}`, borderRadius: 10, padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, marginBottom: 8, transition: "all 0.15s" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: sel === u.id ? "#1D4ED8" : "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: sel === u.id ? "#fff" : "#94A3B8", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{u.avatar || u.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#1E293B" }}>{u.name}</div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>{ROLES[u.role] || u.role}{u.client_id ? ` · ${u.client_id}` : ""}</div>
                    </div>
                  </button>
                ))}
              </div>
              {sel && (
                <div style={{ marginBottom: 14 }}>
                  <label style={lbl}>PIN de acceso</label>
                  <input type="password" value={pin} maxLength={6}
                    onChange={e => { setPin(e.target.value); setErr(""); }}
                    onKeyDown={e => e.key === "Enter" && go()}
                    placeholder="••••"
                    style={{ ...inp(), textAlign: "center", letterSpacing: "0.4em", fontSize: 20 }} />
                  {err && <div style={{ color: "#EF4444", fontSize: 12, marginTop: 5, textAlign: "center" }}>{err}</div>}
                </div>
              )}
              <button onClick={go} disabled={!sel}
                style={{ ...btnStyle("primary"), width: "100%", justifyContent: "center", padding: "12px", opacity: sel ? 1 : 0.5 }}>
                Ingresar →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── CATALOG MODAL ─────────────────────────────────────────────────────────────
function CatalogModal({ cat, user, clientId, modules, onSave, onClose }) {
  const [f, setF] = useState({ ...cat });
  const [comments, setComments] = useState([]);
  const [cmtText, setCmtText] = useState("");
  const [saving, setSaving] = useState(false);
  const readonly = user.role === "cliente";
  const mod = modules.find(m => m.id === cat.module_id);

  useEffect(() => {
    if (cat.id) sbFetch("comments", { filters: [["catalog_id", cat.id]], order: { col: "created_at", asc: true } }).then(setComments);
  }, [cat.id]);

  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  const addComment = async () => {
    if (!cmtText.trim()) return;
    const c = await sbInsert("comments", { catalog_id: cat.id, client_id: clientId, author_name: user.name, author_role: user.role, text: cmtText.trim() });
    if (c?.id) setComments(p => [...p, c]);
    setCmtText("");
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      status: f.status, consultor: f.consultor, responsable: f.responsable,
      fecha_revision: f.fecha_revision || null, meta: f.meta, quantitative: f.quantitative,
      quality_veracidad: !!f.quality_veracidad, quality_actualizacion: !!f.quality_actualizacion,
      quality_cobertura: !!f.quality_cobertura, quality_consistencia: !!f.quality_consistencia,
      quality_autorizado: !!f.quality_autorizado, completeness: f.completeness,
      calificacion_data: f.calificacion_data, observaciones: f.observaciones,
      updated_by: user.name, updated_at: new Date().toISOString(),
    };
    const updated = await sbUpdate("catalogs", payload, [["id", cat.id]]);
    if (cat.status !== f.status) {
      await sbInsert("activity_log", { client_id: clientId, module_id: cat.module_id, catalog_key: cat.catalog_key, catalog_name: cat.catalog_name, action: "Cambio de status", old_value: cat.status, new_value: f.status, author_name: user.name });
    }
    onSave(updated || { ...cat, ...payload });
    setSaving(false);
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 720, maxHeight: "92vh", overflow: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}>
        {/* Header */}
        <div style={{ background: mod?.color || "#1D4ED8", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginBottom: 3 }}>{mod?.icon} {mod?.name} · {cat.catalog_key}</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>{cat.catalog_name}</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <div style={{ padding: "22px 24px" }}>
          {/* Status */}
          <div style={{ marginBottom: 18 }}>
            <label style={lbl}>Status</label>
            <StatusBadge status={f.status} onChange={v => set("status", v)} readonly={readonly} />
          </div>
          {/* Grid fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
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
            <div>
              <label style={lbl}>Fecha de Revisión</label>
              <input type="date" value={f.fecha_revision || ""} onChange={e => set("fecha_revision", e.target.value)} readOnly={readonly} style={readonly ? inpRO : inp()} />
            </div>
            <div>
              <label style={lbl}>Meta (%)</label>
              <input type="number" min="0" max="100" value={f.meta || ""} onChange={e => set("meta", e.target.value)} readOnly={readonly} style={readonly ? inpRO : inp()} placeholder="0-100" />
            </div>
            <div>
              <label style={lbl}>Quantitative (%)</label>
              <input type="number" min="0" max="100" value={f.quantitative || ""} onChange={e => set("quantitative", e.target.value)} readOnly={readonly} style={readonly ? inpRO : inp()} placeholder="0-100" />
            </div>
            <div>
              <label style={lbl}>Completeness</label>
              {readonly ? <div style={inpRO}>{f.completeness || "—"}</div> : (
                <select value={f.completeness || "No Aplica"} onChange={e => set("completeness", e.target.value)} style={{ ...inp(), cursor: "pointer" }}>
                  {COMPLETENESS_OPTS.map(o => <option key={o}>{o}</option>)}
                </select>
              )}
            </div>
          </div>
          {/* Calificacion */}
          <div style={{ marginBottom: 18 }}>
            <label style={lbl}>Calificación de la Data</label>
            {readonly ? <div style={{ ...inpRO, maxWidth: 320 }}>{f.calificacion_data || "—"}</div> : (
              <select value={f.calificacion_data || "Data Inexistente"} onChange={e => set("calificacion_data", e.target.value)} style={{ ...inp(), maxWidth: 320, cursor: "pointer" }}>
                {CALIFICACION_OPTS.map(o => <option key={o}>{o}</option>)}
              </select>
            )}
          </div>
          {/* Quality checkboxes */}
          <div style={{ marginBottom: 18 }}>
            <label style={lbl}>Criterios de Calidad</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {QUALITY_FIELDS.map(qf => {
                const active = !!f[qf.key];
                return (
                  <label key={qf.key} onClick={() => !readonly && set(qf.key, !active)}
                    style={{ display: "flex", alignItems: "center", gap: 6, background: active ? "#F0FDF4" : "#F8FAFC", border: `1.5px solid ${active ? "#22C55E" : "#E2E8F0"}`, borderRadius: 8, padding: "6px 14px", cursor: readonly ? "default" : "pointer", fontSize: 12, color: active ? "#15803D" : "#64748B", userSelect: "none" }}>
                    <span style={{ width: 14, height: 14, borderRadius: 3, background: active ? "#22C55E" : "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", flexShrink: 0 }}>
                      {active ? "✓" : ""}
                    </span>
                    {qf.label}
                  </label>
                );
              })}
            </div>
          </div>
          {/* Observaciones */}
          <div style={{ marginBottom: 18 }}>
            <label style={lbl}>Observaciones</label>
            <textarea value={f.observaciones || ""} onChange={e => set("observaciones", e.target.value)} readOnly={readonly} rows={3}
              style={{ ...(readonly ? inpRO : inp()), resize: "vertical", fontFamily: "inherit" }} />
          </div>
          {/* Comments */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ ...lbl, marginBottom: 10 }}>Comentarios ({comments.length})</label>
            <div style={{ maxHeight: 180, overflowY: "auto", border: "1px solid #E2E8F0", borderRadius: 10, padding: 12, marginBottom: 10, background: "#F8FAFC" }}>
              {comments.map(c => (
                <div key={c.id} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                    <span style={{ fontWeight: 700, fontSize: 12, color: "#1D4ED8" }}>{c.author_name}</span>
                    <span style={{ fontSize: 10, color: "#94A3B8", background: "#F1F5F9", borderRadius: 4, padding: "1px 6px" }}>{c.author_role}</span>
                    <span style={{ fontSize: 10, color: "#CBD5E1", marginLeft: "auto" }}>{new Date(c.created_at).toLocaleString("es-MX")}</span>
                  </div>
                  <div style={{ color: "#374151", fontSize: 13 }}>{c.text}</div>
                </div>
              ))}
              {!comments.length && <div style={{ textAlign: "center", color: "#CBD5E1", fontSize: 12, padding: "12px 0" }}>Sin comentarios</div>}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={cmtText} onChange={e => setCmtText(e.target.value)} onKeyDown={e => e.key === "Enter" && addComment()}
                placeholder="Escribe un comentario..." style={{ ...inp(true), flex: 1 }} />
              <button onClick={addComment} style={{ ...btnStyle("primary"), padding: "6px 14px", flexShrink: 0 }}>Enviar</button>
            </div>
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
function ModuleView({ module, catalogs, user, clientId, modules, onUpdate, onBack }) {
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
      {sel && <CatalogModal cat={sel} user={user} clientId={clientId} modules={modules}
        onSave={updated => onUpdate(updated)} onClose={() => setModal(null)} />}
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22, flexWrap: "wrap" }}>
        <button onClick={onBack} style={{ ...btnStyle("ghost"), border: "1px solid #E2E8F0", padding: "7px 14px" }}>← Volver</button>
        <div style={{ width: 4, height: 40, background: module.color, borderRadius: 2 }} />
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{module.icon} {module.name}</h2>
          <div style={{ color: "#94A3B8", fontSize: 12 }}>{catalogs.length} catálogos · {catalogs.filter(c => c.status === "Completado").length} completados</div>
        </div>
        <div style={{ marginLeft: "auto" }}><Ring pct={pct} color={module.color} size={56} /></div>
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
              {["Clave", "Catálogo", "Status", "Consultor", "Responsable", "Calidad", "Acción"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#64748B", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #E2E8F0" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const qs = calcQuality(c);
              return (
                <tr key={c.id} style={{ borderBottom: "1px solid #F1F5F9" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 14px", fontFamily: "monospace", fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>{c.catalog_key}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 500, color: "#1E293B" }}>{c.catalog_name}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <StatusBadge status={c.status} readonly={user.role === "cliente"}
                      onChange={async v => {
                        const upd = await sbUpdate("catalogs", { status: v, updated_by: user.name, updated_at: new Date().toISOString() }, [["id", c.id]]);
                        if (c.status !== v) await sbInsert("activity_log", { client_id: clientId, module_id: c.module_id, catalog_key: c.catalog_key, catalog_name: c.catalog_name, action: "Cambio de status", old_value: c.status, new_value: v, author_name: user.name });
                        onUpdate(upd || { ...c, status: v });
                      }} />
                  </td>
                  <td style={{ padding: "10px 14px", color: "#64748B", fontSize: 12 }}>{c.consultor || <span style={{ color: "#CBD5E1" }}>—</span>}</td>
                  <td style={{ padding: "10px 14px", color: "#64748B", fontSize: 12 }}>{c.responsable || <span style={{ color: "#CBD5E1" }}>—</span>}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 56, height: 5, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${qs}%`, background: qs === 100 ? "#22C55E" : qs > 60 ? "#3B82F6" : "#F59E0B", transition: "width 0.4s" }} />
                      </div>
                      <span style={{ fontSize: 11, color: "#94A3B8" }}>{qs}%</span>
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
  const [newMod, setNewMod] = useState({ id: "", name: "", icon: "📁", color: "#6366F1" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { sbFetch("clients").then(setClients); }, []);

  const createClient = async () => {
    if (!newClient.id || !newClient.name || !newClient.pin) { setMsg("⚠️ Completa ID, nombre y PIN"); return; }
    setBusy(true);
    const cid = newClient.id.toLowerCase().replace(/\s+/g, "_");
    await sbInsert("clients", { id: cid, name: newClient.name });
    await sbInsert("profiles", { name: newClient.contactName || newClient.name, role: "cliente", client_id: cid, pin: newClient.pin, avatar: newClient.name.slice(0, 2).toUpperCase() });
    await sbRpc("init_client_catalogs", { p_client_id: cid });
    const updated = await sbFetch("clients");
    setClients(updated);
    setMsg("✓ Cliente creado e inicializado con 130 catálogos");
    setNewClient({ id: "", name: "", pin: "", contactName: "" });
    setBusy(false);
  };

  const createModule = async () => {
    if (!newMod.id || !newMod.name) { setMsg("⚠️ ID y nombre son requeridos"); return; }
    await sbInsert("modules", { id: newMod.id.toUpperCase(), name: newMod.name, icon: newMod.icon, color: newMod.color, sort_order: modules.length + 1 });
    setMsg("✓ Módulo creado. Los catálogos para clientes existentes deberán agregarse manualmente.");
    onModuleAdded();
    setNewMod({ id: "", name: "", icon: "📁", color: "#6366F1" });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 640, maxHeight: "88vh", overflow: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ background: "#1E3A5F", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>⚙️ Panel de Administración</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
        <div style={{ padding: "20px 24px" }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#F1F5F9", borderRadius: 10, padding: 4 }}>
            {[["clients", "👥 Clientes"], ["modules", "📦 Módulos"]].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)}
                style={{ flex: 1, background: tab === k ? "#fff" : "transparent", border: "none", borderRadius: 8, padding: "8px", cursor: "pointer", fontWeight: tab === k ? 700 : 400, color: tab === k ? "#1D4ED8" : "#64748B", fontSize: 13 }}>{l}</button>
            ))}
          </div>
          {msg && <div style={{ background: msg.startsWith("⚠️") ? "#FEF2F2" : "#F0FDF4", border: `1px solid ${msg.startsWith("⚠️") ? "#FCA5A5" : "#86EFAC"}`, borderRadius: 8, padding: "10px 14px", color: msg.startsWith("⚠️") ? "#B91C1C" : "#15803D", fontSize: 13, marginBottom: 16 }}>{msg}</div>}

          {tab === "clients" && <>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#1E293B" }}>Crear nuevo cliente</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              {[["id", "ID / Slug (ej: empresa_abc)"], ["name", "Nombre completo de la empresa"], ["contactName", "Nombre del contacto principal"], ["pin", "PIN de acceso (4 dígitos)"]].map(([k, l]) => (
                <div key={k}>
                  <label style={lbl}>{l}</label>
                  <input value={newClient[k] || ""} onChange={e => setNewClient(p => ({ ...p, [k]: e.target.value }))} style={inp(true)} />
                </div>
              ))}
            </div>
            <button onClick={createClient} disabled={busy} style={{ ...btnStyle("primary"), marginBottom: 24, opacity: busy ? 0.7 : 1 }}>
              {busy ? "Creando..." : "+ Crear cliente e inicializar 130 catálogos"}
            </button>
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
          </>}

          {tab === "modules" && <>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#1E293B" }}>Crear nuevo módulo</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div><label style={lbl}>ID (ej: NUE)</label><input value={newMod.id} onChange={e => setNewMod(p => ({ ...p, id: e.target.value.toUpperCase() }))} style={inp(true)} /></div>
              <div><label style={lbl}>Nombre</label><input value={newMod.name} onChange={e => setNewMod(p => ({ ...p, name: e.target.value }))} style={inp(true)} /></div>
              <div><label style={lbl}>Ícono (emoji)</label><input value={newMod.icon} onChange={e => setNewMod(p => ({ ...p, icon: e.target.value }))} style={{ ...inp(true), width: 80 }} /></div>
              <div><label style={lbl}>Color del módulo</label><input type="color" value={newMod.color} onChange={e => setNewMod(p => ({ ...p, color: e.target.value }))} style={{ ...inp(true), width: 60, padding: 4, cursor: "pointer" }} /></div>
            </div>
            <button onClick={createModule} style={{ ...btnStyle("primary"), marginBottom: 24 }}>+ Crear módulo</button>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Módulos existentes ({modules.length})</h3>
            {modules.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#F8FAFC", borderRadius: 8, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontFamily: "monospace", color: "#64748B", width: 50 }}>{m.id}</span>
                <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{m.icon} {m.name}</span>
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
  const [view, setView] = useState("dashboard");
  const [activeMod, setActiveMod] = useState(null);
  const [activity, setActivity] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const pollRef = useRef(null);

  const clientId = user?.role === "cliente" ? user.client_id : (selClient || null);

  const loadAll = useCallback(async (cid) => {
    setLoading(true);
    const [cats, acts] = await Promise.all([
      sbFetch("catalogs", { filters: [["client_id", cid]], order: { col: "catalog_key", asc: true } }),
      sbFetch("activity_log", { filters: [["client_id", cid]], order: { col: "created_at", asc: false } }),
    ]);
    setCatalogs(cats);
    setActivity(acts.slice(0, 30));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user) return;
    sbFetch("modules", { order: { col: "sort_order", asc: true } }).then(setModules);
    if (user.role !== "cliente") {
      sbFetch("clients").then(d => { setClients(d); if (d.length) setSelClient(d[0].id); });
    }
  }, [user]);

  useEffect(() => {
    if (!clientId || !user) return;
    loadAll(clientId);
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => loadAll(clientId), 8000);
    return () => clearInterval(pollRef.current);
  }, [clientId, user, loadAll]);

  const handleUpdate = useCallback(u => { if (u?.id) setCatalogs(p => p.map(c => c.id === u.id ? u : c)); }, []);

  if (!user) return <Login onLogin={u => setUser(u)} />;

  const modCats = (mid) => catalogs.filter(c => c.module_id === mid);
  const totalDone = catalogs.filter(c => c.status === "Completado").length;
  const totalPct = catalogs.length ? Math.round(totalDone / catalogs.length * 100) : 0;
  const currentClientName = clients.find(c => c.id === clientId)?.name || clientId || "";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Segoe UI',system-ui,sans-serif", color: "#1E293B" }}>
      {showAdmin && <AdminPanel modules={modules} onModuleAdded={() => sbFetch("modules", { order: { col: "sort_order", asc: true } }).then(setModules)} onClose={() => setShowAdmin(false)} />}

      {/* SIDEBAR */}
      <div style={{ width: 256, background: "#1E3A5F", display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh", position: "sticky", top: 0, overflow: "hidden" }}>
        {/* Logo */}
        <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "center", background: "rgba(0,0,0,0.15)" }}>
          <img src={ADVAN_LOGO} alt="ADVAN" style={{ height: 36, objectFit: "contain", filter: "brightness(1.3)" }} />
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, marginTop: 8, letterSpacing: "0.12em", textTransform: "uppercase" }}>Master Data Progress</div>
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
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
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
                ? `${modules.find(m => m.id === activeMod)?.icon} ${modules.find(m => m.id === activeMod)?.name}`
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
                  <div style={{ height: "100%", width: `${totalPct}%`, background: "linear-gradient(90deg,#1D4ED8,#3B82F6)", borderRadius: 6, transition: "width 0.8s ease" }} />
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
                          <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
                          <div style={{ fontWeight: 700, fontSize: 13, color: "#1E293B" }}>{m.name}</div>
                          <div style={{ color: "#94A3B8", fontSize: 11, marginTop: 2 }}>{cats.length} catálogos</div>
                        </div>
                        <Ring pct={pct} color={m.color} size={50} sw={4} />
                      </div>
                      <div style={{ height: 4, background: "#F1F5F9", borderRadius: 2, overflow: "hidden", marginBottom: 8 }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: m.color, borderRadius: 2, transition: "width 0.6s" }} />
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
              user={user} clientId={clientId} modules={modules}
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
