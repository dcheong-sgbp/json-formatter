/**
 * <json-formatter> — validate + pretty-print or minify JSON. Zero dependencies.
 * Built & maintained by SGBP — Singapore Build Partners (https://sgbp.tech). MIT.
 */
class JsonFormatter extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: "open" }); this.indent = 2; }
  connectedCallback() { this.render(); }
  _run(mode) {
    const $ = (s) => this.shadowRoot.querySelector(s);
    const raw = $("#in").value.trim(); const st = $("#status"); const out = $("#out");
    if (!raw) { st.textContent = ""; st.className = "st"; out.value = ""; return; }
    let data;
    try { data = JSON.parse(raw); }
    catch (e) {
      st.textContent = "Invalid JSON — " + e.message; st.className = "st bad";
      out.value = ""; return;
    }
    st.textContent = "Valid JSON"; st.className = "st ok";
    out.value = mode === "min" ? JSON.stringify(data) : JSON.stringify(data, null, this.indent);
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        *,*::before,*::after{box-sizing:border-box}
        :host{display:block;width:100%;max-width:680px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
        .card{border:1px solid #e2e2e2;border-radius:12px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:16px}
        label{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:600;color:#555;margin-bottom:6px}
        .mini{font:inherit;font-size:11px;font-weight:700;color:#EB0028;background:none;border:0;cursor:pointer}
        textarea{width:100%;min-height:110px;padding:10px;border:1px solid #ccc;border-radius:8px;font-family:ui-monospace,Menlo,monospace;font-size:13px;line-height:1.5;resize:vertical}
        .bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0}
        button.act{font:inherit;font-size:12px;font-weight:700;border-radius:8px;padding:8px 13px;cursor:pointer}
        .fmt{color:#fff;background:#EB0028;border:0}
        .min,.copy{color:#555;background:#fff;border:1px solid #ccc}
        select{font:inherit;font-size:12px;padding:7px 8px;border:1px solid #ccc;border-radius:8px;background:#fff}
        .st{font-size:12.5px;font-weight:700;margin:2px 0 8px;min-height:16px}
        .st.ok{color:#137333}.st.bad{color:#c5221f}
        #out{min-height:120px;background:#1a1a1a;color:#f4f4f4;font-size:13px}
      </style>
      <div class="card">
        <label>Paste JSON <button class="mini" id="clear">Clear</button></label>
        <textarea id="in" placeholder='{"name":"SGBP","services":["web","apps"],"sg":true}' spellcheck="false"></textarea>
        <div class="bar">
          <button class="act fmt" id="fmt">Format</button>
          <button class="act min" id="minify">Minify</button>
          <label style="margin:0;font-weight:600">Indent
            <select id="indent"><option value="2" selected>2</option><option value="4">4</option><option value="tab">Tab</option></select>
          </label>
          <button class="act copy" id="copy">Copy</button>
        </div>
        <div class="st" id="status"></div>
        <textarea id="out" readonly></textarea>
      </div>`;
    const $ = (s) => this.shadowRoot.querySelector(s);
    $("#in").addEventListener("input", () => this._run("fmt"));
    $("#fmt").addEventListener("click", () => this._run("fmt"));
    $("#minify").addEventListener("click", () => this._run("min"));
    $("#indent").addEventListener("change", (e) => { this.indent = e.target.value === "tab" ? "\t" : +e.target.value; this._run("fmt"); });
    $("#clear").addEventListener("click", () => { $("#in").value = ""; this._run("fmt"); $("#in").focus(); });
    $("#copy").addEventListener("click", () => { navigator.clipboard && navigator.clipboard.writeText($("#out").value); const b = $("#copy"), o = b.textContent; b.textContent = "Copied"; setTimeout(() => b.textContent = o, 900); });
  }
}
if (!customElements.get("json-formatter")) customElements.define("json-formatter", JsonFormatter);
