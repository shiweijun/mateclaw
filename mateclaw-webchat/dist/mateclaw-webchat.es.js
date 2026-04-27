const E = {
  position: "bottom-right",
  primaryColor: "#409eff",
  title: "MateClaw",
  placeholder: "Type a message..."
};
let o, r, h, a = [], l = !1, m = !1;
function S(e) {
  o = { ...E, ...e }, h = localStorage.getItem("mc-webchat-visitor") || T(), localStorage.setItem("mc-webchat-visitor", h), $(), M();
}
function T() {
  return "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}
function $() {
  const e = document.createElement("style");
  e.textContent = `
    .mc-webchat-bubble {
      position: fixed;
      ${o.position === "bottom-left" ? "left: 20px" : "right: 20px"};
      bottom: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: ${o.primaryColor};
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      transition: transform 0.2s;
    }
    .mc-webchat-bubble:hover { transform: scale(1.1); }
    .mc-webchat-panel {
      position: fixed;
      ${o.position === "bottom-left" ? "left: 20px" : "right: 20px"};
      bottom: 88px;
      width: 380px;
      height: 520px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      display: flex;
      flex-direction: column;
      z-index: 99999;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .mc-webchat-header {
      padding: 14px 16px;
      background: ${o.primaryColor};
      color: white;
      font-weight: 600;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .mc-webchat-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 18px;
      padding: 0 4px;
      opacity: 0.8;
    }
    .mc-webchat-close:hover { opacity: 1; }
    .mc-webchat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .mc-webchat-msg {
      max-width: 85%;
      padding: 8px 12px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.5;
      word-break: break-word;
      white-space: pre-wrap;
    }
    .mc-webchat-msg--user {
      align-self: flex-end;
      background: ${o.primaryColor};
      color: white;
      border-bottom-right-radius: 4px;
    }
    .mc-webchat-msg--assistant {
      align-self: flex-start;
      background: #f0f2f5;
      color: #333;
      border-bottom-left-radius: 4px;
    }
    .mc-webchat-input-area {
      padding: 10px 12px;
      border-top: 1px solid #eee;
      display: flex;
      gap: 8px;
    }
    .mc-webchat-input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 20px;
      font-size: 14px;
      outline: none;
    }
    .mc-webchat-input:focus { border-color: ${o.primaryColor}; }
    .mc-webchat-send {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: ${o.primaryColor};
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mc-webchat-send:disabled { opacity: 0.5; cursor: not-allowed; }
    @media (max-width: 480px) {
      .mc-webchat-panel { width: calc(100vw - 24px); left: 12px; right: 12px; bottom: 80px; height: 60vh; }
    }
  `, document.head.appendChild(e);
}
function M() {
  r = document.createElement("div"), r.id = "mc-webchat-root";
  const e = document.createElement("button");
  e.className = "mc-webchat-bubble", e.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', e.onclick = () => y(), r.appendChild(e), document.body.appendChild(r);
}
function y() {
  l = !l;
  const e = r.querySelector(".mc-webchat-panel");
  l && !e ? I() : !l && e && e.remove();
}
function I() {
  const e = document.createElement("div");
  e.className = "mc-webchat-panel", e.innerHTML = `
    <div class="mc-webchat-header">
      <span>${o.title}</span>
      <button class="mc-webchat-close">&times;</button>
    </div>
    <div class="mc-webchat-messages" id="mc-messages"></div>
    <div class="mc-webchat-input-area">
      <input class="mc-webchat-input" placeholder="${o.placeholder}" id="mc-input" />
      <button class="mc-webchat-send" id="mc-send">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  `, e.querySelector(".mc-webchat-close").addEventListener("click", y);
  const t = e.querySelector("#mc-input"), n = e.querySelector("#mc-send");
  t.addEventListener("keydown", (i) => {
    i.key === "Enter" && !i.shiftKey && (i.preventDefault(), x(t.value));
  }), n.addEventListener("click", () => x(t.value)), r.appendChild(e), B();
}
function B() {
  const e = document.getElementById("mc-messages");
  e && (e.innerHTML = "", a.forEach((t) => {
    const n = document.createElement("div");
    n.className = `mc-webchat-msg mc-webchat-msg--${t.role}`, n.textContent = t.content, e.appendChild(n);
  }), e.scrollTop = e.scrollHeight);
}
function g(e, t) {
  a.push({ role: e, content: t });
  const n = document.getElementById("mc-messages");
  if (!n) return;
  const i = document.createElement("div");
  return i.className = `mc-webchat-msg mc-webchat-msg--${e}`, i.textContent = t, n.appendChild(i), n.scrollTop = n.scrollHeight, i;
}
function w(e) {
  const t = document.getElementById("mc-messages");
  if (!t) return;
  const n = t.querySelector(".mc-webchat-msg--assistant:last-child");
  n && (n.textContent = e, t.scrollTop = t.scrollHeight);
}
async function x(e) {
  var i;
  if (e = e.trim(), !e || m) return;
  const t = document.getElementById("mc-input");
  t && (t.value = ""), g("user", e), m = !0, g("assistant", "...");
  let n = "";
  try {
    const s = await fetch(`${o.server}/api/v1/channels/webchat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MC-Key": o.apiKey,
        Accept: "text/event-stream"
      },
      body: JSON.stringify({ message: e, visitorId: h })
    });
    if (!s.ok)
      throw new Error(`HTTP ${s.status}`);
    const u = (i = s.body) == null ? void 0 : i.getReader(), v = new TextDecoder();
    if (!u) throw new Error("No response body");
    let d = "";
    for (; ; ) {
      const { done: C, value: k } = await u.read();
      if (C) break;
      d += v.decode(k, { stream: !0 });
      const b = d.split(`
`);
      d = b.pop() || "";
      for (const c of b)
        if (c.startsWith("data:")) {
          const p = c.slice(5).trim();
          if (!p) continue;
          try {
            const f = JSON.parse(p);
            f.text && (n += f.text, w(n));
          } catch {
          }
        } else if (c.startsWith("event:") && c.slice(6).trim() === "done")
          break;
    }
    a.length > 0 && (a[a.length - 1].content = n || "(no response)");
  } catch (s) {
    w(`Error: ${s.message}`), a.length > 0 && (a[a.length - 1].content = `Error: ${s.message}`);
  } finally {
    m = !1;
  }
}
typeof window < "u" && (window.MateClawWebChat = { init: S });
export {
  S as init
};
