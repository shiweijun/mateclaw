(function(a,l){typeof exports=="object"&&typeof module<"u"?l(exports):typeof define=="function"&&define.amd?define(["exports"],l):(a=typeof globalThis<"u"?globalThis:a||self,l(a.MateClawWebChat={}))})(this,(function(a){"use strict";const l={position:"bottom-right",primaryColor:"#409eff",title:"MateClaw",placeholder:"Type a message..."};let o,r,m,s=[],d=!1,h=!1;function b(e){o={...l,...e},m=localStorage.getItem("mc-webchat-visitor")||E(),localStorage.setItem("mc-webchat-visitor",m),S(),T()}function E(){return"v_"+Math.random().toString(36).substring(2,10)+Date.now().toString(36)}function S(){const e=document.createElement("style");e.textContent=`
    .mc-webchat-bubble {
      position: fixed;
      ${o.position==="bottom-left"?"left: 20px":"right: 20px"};
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
      ${o.position==="bottom-left"?"left: 20px":"right: 20px"};
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
  `,document.head.appendChild(e)}function T(){r=document.createElement("div"),r.id="mc-webchat-root";const e=document.createElement("button");e.className="mc-webchat-bubble",e.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',e.onclick=()=>g(),r.appendChild(e),document.body.appendChild(r)}function g(){d=!d;const e=r.querySelector(".mc-webchat-panel");d&&!e?$():!d&&e&&e.remove()}function $(){const e=document.createElement("div");e.className="mc-webchat-panel",e.innerHTML=`
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
  `,e.querySelector(".mc-webchat-close").addEventListener("click",g);const t=e.querySelector("#mc-input"),n=e.querySelector("#mc-send");t.addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),y(t.value))}),n.addEventListener("click",()=>y(t.value)),r.appendChild(e),M()}function M(){const e=document.getElementById("mc-messages");e&&(e.innerHTML="",s.forEach(t=>{const n=document.createElement("div");n.className=`mc-webchat-msg mc-webchat-msg--${t.role}`,n.textContent=t.content,e.appendChild(n)}),e.scrollTop=e.scrollHeight)}function w(e,t){s.push({role:e,content:t});const n=document.getElementById("mc-messages");if(!n)return;const i=document.createElement("div");return i.className=`mc-webchat-msg mc-webchat-msg--${e}`,i.textContent=t,n.appendChild(i),n.scrollTop=n.scrollHeight,i}function x(e){const t=document.getElementById("mc-messages");if(!t)return;const n=t.querySelector(".mc-webchat-msg--assistant:last-child");n&&(n.textContent=e,t.scrollTop=t.scrollHeight)}async function y(e){var i;if(e=e.trim(),!e||h)return;const t=document.getElementById("mc-input");t&&(t.value=""),w("user",e),h=!0,w("assistant","...");let n="";try{const c=await fetch(`${o.server}/api/v1/channels/webchat/stream`,{method:"POST",headers:{"Content-Type":"application/json","X-MC-Key":o.apiKey,Accept:"text/event-stream"},body:JSON.stringify({message:e,visitorId:m})});if(!c.ok)throw new Error(`HTTP ${c.status}`);const v=(i=c.body)==null?void 0:i.getReader(),I=new TextDecoder;if(!v)throw new Error("No response body");let u="";for(;;){const{done:B,value:H}=await v.read();if(B)break;u+=I.decode(H,{stream:!0});const C=u.split(`
`);u=C.pop()||"";for(const p of C)if(p.startsWith("data:")){const f=p.slice(5).trim();if(!f)continue;try{const k=JSON.parse(f);k.text&&(n+=k.text,x(n))}catch{}}else if(p.startsWith("event:")&&p.slice(6).trim()==="done")break}s.length>0&&(s[s.length-1].content=n||"(no response)")}catch(c){x(`Error: ${c.message}`),s.length>0&&(s[s.length-1].content=`Error: ${c.message}`)}finally{h=!1}}typeof window<"u"&&(window.MateClawWebChat={init:b}),a.init=b,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})}));
