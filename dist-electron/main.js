import { app as Et, BrowserWindow as yn, ipcMain as $e, Menu as mr } from "electron";
import Be from "path";
import { fileURLToPath as gr } from "url";
import ke, { existsSync as Os, readFileSync as hr, writeFileSync as xr } from "fs";
import Fe from "os";
import te from "child_process";
import yr from "util";
import Sr from "https";
import Cr from "http";
import Lr from "net";
import { activeWindow as wr } from "active-win";
function Ir(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ps = {};
const _r = "5.31.4", Or = {
  version: _r
};
var T = {};
const Ye = Fe, Ge = ke, Pr = Be, _i = te.spawn, vr = te.exec, dn = te.execSync, Mr = yr, At = process.platform, Oi = At === "linux" || At === "android", vs = At === "darwin", Fn = At === "win32", Ms = At === "freebsd", Es = At === "openbsd", As = At === "netbsd";
let ei = 0, Te = "", Ke = null, be = null;
const Ts = process.env.WINDIR || "C:\\Windows";
let ue, Nt = "";
const on = [];
let Pi = !1, Tn = "";
const ti = "$OutputEncoding = [System.Console]::OutputEncoding = [System.Console]::InputEncoding = [System.Text.Encoding]::UTF8 ; ", hi = "--###START###--", Ki = "--ERROR--", Dn = "--###ENDCMD###--", xi = "--##ID##--", Rn = {
  windowsHide: !0,
  maxBuffer: 1024 * 102400,
  encoding: "UTF-8",
  env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
}, Wn = {
  maxBuffer: 1024 * 102400,
  encoding: "UTF-8",
  stdio: ["pipe", "pipe", "ignore"]
};
function Er(t) {
  let n = parseInt(t, 10);
  return isNaN(n) && (n = 0), n;
}
function Ar(t) {
  let n = !1, e = "", s = "";
  for (const r of t)
    r >= "0" && r <= "9" || n ? (n = !0, e += r) : s += r;
  return [s, e];
}
const Mn = new String(), yi = new String().replace, Si = new String().toLowerCase, Ds = new String().toString, Vs = new String().substr, bs = new String().substring, Bs = new String().trim, Ns = new String().startsWith, ks = Math.min;
function Tr(t) {
  return t && {}.toString.call(t) === "[object Function]";
}
function Dr(t) {
  const n = [], e = {};
  for (let s = 0; s < t.length; s++) {
    let r = Object.keys(t[s]);
    r.sort((o, a) => o - a);
    let i = "";
    for (let o = 0; o < r.length; o++)
      i += JSON.stringify(r[o]), i += JSON.stringify(t[s][r[o]]);
    ({}).hasOwnProperty.call(e, i) || (n.push(t[s]), e[i] = !0);
  }
  return n;
}
function Vr(t, n) {
  return t.sort((e, s) => {
    let r = "", i = "";
    return n.forEach((o) => {
      r = r + e[o], i = i + s[o];
    }), r < i ? -1 : r > i ? 1 : 0;
  });
}
function br() {
  return ei === 0 && (ei = Ye.cpus().length), ei;
}
function Je(t, n, e, s, r) {
  e = e || ":", n = n.toLowerCase(), s = s || !1, r = r || !1;
  let i = "";
  return t.some((o) => {
    let a = o.toLowerCase().replace(/\t/g, "");
    if (s && (a = a.trim()), a.startsWith(n) && (!r || a.match(n + e) || a.match(n + " " + e))) {
      const l = s ? o.trim().split(e) : o.split(e);
      if (l.length >= 2)
        return l.shift(), i = l.join(e).trim(), !0;
    }
    return !1;
  }), i;
}
function Br(t, n) {
  return n = n || 16, t.replace(/\\x([0-9A-Fa-f]{2})/g, function() {
    return String.fromCharCode(parseInt(arguments[1], n));
  });
}
function Nr(t) {
  let n = "", e = 0;
  return t.split("").forEach((s) => {
    s >= "0" && s <= "9" ? e === 1 && e++ : (e === 0 && e++, e === 1 && (n += s));
  }), n;
}
function kr(t, n) {
  n = n || "", t = t.toUpperCase();
  let e = 0, s = 0;
  const r = Nr(t), i = t.split(r);
  if (i.length >= 2) {
    i[2] && (i[1] += i[2]);
    let o = i[1] && i[1].toLowerCase().indexOf("pm") > -1 || i[1].toLowerCase().indexOf("p.m.") > -1 || i[1].toLowerCase().indexOf("p. m.") > -1 || i[1].toLowerCase().indexOf("n") > -1 || i[1].toLowerCase().indexOf("ch") > -1 || i[1].toLowerCase().indexOf("ös") > -1 || n && i[1].toLowerCase().indexOf(n) > -1;
    return e = parseInt(i[0], 10), s = parseInt(i[1], 10), e = o && e < 12 ? e + 12 : e, ("0" + e).substr(-2) + ":" + ("0" + s).substr(-2);
  }
}
function Fr(t, n) {
  const e = {
    date: "",
    time: ""
  };
  n = n || {};
  const s = (n.dateFormat || "").toLowerCase(), r = n.pmDesignator || "", i = t.split(" ");
  if (i[0]) {
    if (i[0].indexOf("/") >= 0) {
      const o = i[0].split("/");
      o.length === 3 && (o[0].length === 4 ? e.date = o[0] + "-" + ("0" + o[1]).substr(-2) + "-" + ("0" + o[2]).substr(-2) : o[2].length === 2 ? (s.indexOf("/d/") > -1 || s.indexOf("/dd/") > -1, e.date = "20" + o[2] + "-" + ("0" + o[1]).substr(-2) + "-" + ("0" + o[0]).substr(-2)) : (t.toLowerCase().indexOf("pm") > -1 || t.toLowerCase().indexOf("p.m.") > -1 || t.toLowerCase().indexOf("p. m.") > -1 || t.toLowerCase().indexOf("am") > -1 || t.toLowerCase().indexOf("a.m.") > -1 || t.toLowerCase().indexOf("a. m.") > -1 || s.indexOf("/d/") > -1 || s.indexOf("/dd/") > -1) && s.indexOf("dd/") !== 0 ? e.date = o[2] + "-" + ("0" + o[0]).substr(-2) + "-" + ("0" + o[1]).substr(-2) : e.date = o[2] + "-" + ("0" + o[1]).substr(-2) + "-" + ("0" + o[0]).substr(-2));
    }
    if (i[0].indexOf(".") >= 0) {
      const o = i[0].split(".");
      o.length === 3 && (s.indexOf(".d.") > -1 || s.indexOf(".dd.") > -1 ? e.date = o[2] + "-" + ("0" + o[0]).substr(-2) + "-" + ("0" + o[1]).substr(-2) : e.date = o[2] + "-" + ("0" + o[1]).substr(-2) + "-" + ("0" + o[0]).substr(-2));
    }
    if (i[0].indexOf("-") >= 0) {
      const o = i[0].split("-");
      o.length === 3 && (e.date = o[0] + "-" + ("0" + o[1]).substr(-2) + "-" + ("0" + o[2]).substr(-2));
    }
  }
  if (i[1]) {
    i.shift();
    const o = i.join(" ");
    e.time = kr(o, r);
  }
  return e;
}
function Rr(t, n) {
  let e = n > 0, s = 1, r = 0, i = 0;
  const o = [];
  for (let l = 0; l < t.length; l++)
    s <= n ? (/\s/.test(t[l]) && !e && (i = l - 1, o.push({
      from: r,
      to: i + 1,
      cap: t.substring(r, i + 1)
    }), r = i + 2, s++), e = t[l] === " ") : (!/\s/.test(t[l]) && e && (i = l - 1, r < i && o.push({
      from: r,
      to: i,
      cap: t.substring(r, i)
    }), r = i + 1, s++), e = t[l] === " ");
  i = 5e3, o.push({
    from: r,
    to: i,
    cap: t.substring(r, i)
  });
  let a = o.length;
  for (let l = 0; l < a; l++)
    o[l].cap.replace(/\s/g, "").length === 0 && l + 1 < a && (o[l].to = o[l + 1].to, o[l].cap = o[l].cap + o[l + 1].cap, o.splice(l + 1, 1), a = a - 1);
  return o;
}
function Wr(t, n, e) {
  for (let s = 0; s < t.length; s++)
    if (t[s][n] === e)
      return s;
  return -1;
}
function Gr() {
  if (Tn = "powershell.exe", Fn) {
    const t = `${Ts}\\system32\\WindowsPowerShell\\v1.0\\powershell.exe`;
    Ge.existsSync(t) && (Tn = t);
  }
}
function zr() {
  return Fn ? `"${process.env.VBOX_INSTALL_PATH || process.env.VBOX_MSI_INSTALL_PATH}\\VBoxManage.exe"` : "vboxmanage";
}
function ni(t) {
  let n = "", e, s = "";
  if (t.indexOf(hi) >= 0) {
    e = t.split(hi);
    const i = e[1].split(xi);
    n = i[0], i.length > 1 && (t = i.slice(1).join(xi));
  }
  t.indexOf(Dn) >= 0 && (e = t.split(Dn), s = e[0]);
  let r = -1;
  for (let i = 0; i < on.length; i++)
    on[i].id === n && (r = i, on[i].callback(s));
  r >= 0 && on.splice(r, 1);
}
function Ur() {
  ue || (ue = _i(Tn, ["-NoProfile", "-NoLogo", "-InputFormat", "Text", "-NoExit", "-Command", "-"], {
    stdio: "pipe",
    windowsHide: !0,
    maxBuffer: 1024 * 102400,
    encoding: "UTF-8",
    env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
  }), ue && ue.pid && (Pi = !0, ue.stdout.on("data", (t) => {
    Nt = Nt + t.toString("utf8"), t.indexOf(Dn) >= 0 && (ni(Nt), Nt = "");
  }), ue.stderr.on("data", () => {
    ni(Nt + Ki);
  }), ue.on("error", () => {
    ni(Nt + Ki);
  }), ue.on("close", () => {
    ue && ue.kill();
  })));
}
function Hr() {
  try {
    ue && (ue.stdin.write("exit" + Ye.EOL), ue.stdin.end());
  } catch {
    ue && ue.kill();
  }
  Pi = !1, ue = null;
}
function $r(t) {
  if (Pi) {
    const n = Math.random().toString(36).substring(2, 12);
    return new Promise((e) => {
      process.nextTick(() => {
        function s(r) {
          e(r);
        }
        on.push({
          id: n,
          cmd: t,
          callback: s,
          start: /* @__PURE__ */ new Date()
        });
        try {
          ue && ue.pid && ue.stdin.write(ti + "echo " + hi + n + xi + "; " + Ye.EOL + t + Ye.EOL + "echo " + Dn + Ye.EOL);
        } catch {
          e("");
        }
      });
    });
  } else {
    let n = "";
    return new Promise((e) => {
      process.nextTick(() => {
        try {
          const s = Ye.release().split(".").map(Number), r = s[0] < 10 ? ["-NoProfile", "-NoLogo", "-InputFormat", "Text", "-NoExit", "-ExecutionPolicy", "Unrestricted", "-Command", "-"] : ["-NoProfile", "-NoLogo", "-InputFormat", "Text", "-ExecutionPolicy", "Unrestricted", "-Command", ti + t], i = _i(Tn, r, {
            stdio: "pipe",
            windowsHide: !0,
            maxBuffer: 1024 * 102400,
            encoding: "UTF-8",
            env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
          });
          if (i && !i.pid && i.on("error", () => {
            e(n);
          }), i && i.pid) {
            if (i.stdout.on("data", (o) => {
              n = n + o.toString("utf8");
            }), i.stderr.on("data", () => {
              i.kill(), e(n);
            }), i.on("close", () => {
              i.kill(), e(n);
            }), i.on("error", () => {
              i.kill(), e(n);
            }), s[0] < 10)
              try {
                i.stdin.write(ti + t + Ye.EOL), i.stdin.write("exit" + Ye.EOL), i.stdin.end();
              } catch {
                i.kill(), e(n);
              }
          } else
            e(n);
        } catch {
          e(n);
        }
      });
    });
  }
}
function Xr(t, n, e) {
  let s = "";
  return e = e || {}, new Promise((r) => {
    process.nextTick(() => {
      try {
        const i = _i(t, n, e);
        i && !i.pid && i.on("error", () => {
          r(s);
        }), i && i.pid ? (i.stdout.on("data", (o) => {
          s += o.toString();
        }), i.on("close", () => {
          i.kill(), r(s);
        }), i.on("error", () => {
          i.kill(), r(s);
        })) : r(s);
      } catch {
        r(s);
      }
    });
  });
}
function Kr() {
  if (Fn) {
    if (!Te)
      try {
        const e = dn("chcp", Rn).toString().split(`\r
`)[0].split(":");
        Te = e.length > 1 ? e[1].replace(".", "").trim() : "";
      } catch {
        Te = "437";
      }
    return Te;
  }
  if (Oi || vs || Ms || Es || As) {
    if (!Te)
      try {
        const e = dn("echo $LANG", Wn).toString().split(`\r
`)[0].split(".");
        Te = e.length > 1 ? e[1].trim() : "", Te || (Te = "UTF-8");
      } catch {
        Te = "UTF-8";
      }
    return Te;
  }
}
function jr() {
  if (Ke !== null)
    return Ke;
  if (Ke = !1, Fn)
    try {
      const t = dn("WHERE smartctl 2>nul", Rn).toString().split(`\r
`);
      t && t.length ? Ke = t[0].indexOf(":\\") >= 0 : Ke = !1;
    } catch {
      Ke = !1;
    }
  if (Oi || vs || Ms || Es || As)
    try {
      Ke = dn("which smartctl 2>/dev/null", Wn).toString().split(`\r
`).length > 0;
    } catch {
      Mr.noop();
    }
  return Ke;
}
function qr(t) {
  const n = ["BCM2708", "BCM2709", "BCM2710", "BCM2711", "BCM2712", "BCM2835", "BCM2836", "BCM2837", "BCM2837B0"];
  if (be !== null)
    t = be;
  else if (t === void 0)
    try {
      t = Ge.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString().split(`
`), be = t;
    } catch {
      return !1;
    }
  const e = Je(t, "hardware"), s = Je(t, "model");
  return e && n.indexOf(e) > -1 || s && s.indexOf("Raspberry Pi") > -1;
}
function Yr() {
  let t = [];
  try {
    t = Ge.readFileSync("/etc/os-release", { encoding: "utf8" }).toString().split(`
`);
  } catch {
    return !1;
  }
  const n = Je(t, "id", "=");
  return n && n.indexOf("raspbian") > -1;
}
function Jr(t, n, e) {
  e || (e = n, n = Rn);
  let s = "chcp 65001 > nul && cmd /C " + t + " && chcp " + Te + " > nul";
  vr(s, n, (r, i) => {
    e(r, i);
  });
}
function Qr() {
  const t = Ge.existsSync("/Library/Developer/CommandLineTools/usr/bin/"), n = Ge.existsSync("/Applications/Xcode.app/Contents/Developer/Tools"), e = Ge.existsSync("/Library/Developer/Xcode/");
  return t || e || n;
}
function Zr() {
  const t = process.hrtime();
  return !Array.isArray(t) || t.length !== 2 ? 0 : +t[0] * 1e9 + +t[1];
}
function eo(t, n) {
  n = n || "";
  const e = [];
  return t.forEach((s) => {
    s.startsWith(n) && e.indexOf(s) === -1 && e.push(s);
  }), e.length;
}
function to(t, n) {
  n = n || "";
  const e = [];
  return t.forEach((s) => {
    s.startsWith(n) && e.push(s);
  }), e.length;
}
function no(t, n) {
  typeof n > "u" && (n = !1);
  const e = t || "";
  let s = "";
  const r = ks(e.length, 2e3);
  for (let i = 0; i <= r; i++)
    e[i] === void 0 || e[i] === ">" || e[i] === "<" || e[i] === "*" || e[i] === "?" || e[i] === "[" || e[i] === "]" || e[i] === "|" || e[i] === "˚" || e[i] === "$" || e[i] === ";" || e[i] === "&" || e[i] === "]" || e[i] === "#" || e[i] === "\\" || e[i] === "	" || e[i] === `
` || e[i] === "\r" || e[i] === "'" || e[i] === "`" || e[i] === '"' || e[i].length > 1 || n && e[i] === "(" || n && e[i] === ")" || n && e[i] === "@" || n && e[i] === " " || n && e[i] === "{" || n && e[i] === ";" || n && e[i] === "}" || (s = s + e[i]);
  return s;
}
function io() {
  const t = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let n = !0, e = "";
  try {
    e.__proto__.replace = yi, e.__proto__.toLowerCase = Si, e.__proto__.toString = Ds, e.__proto__.substr = Vs, e.__proto__.substring = bs, e.__proto__.trim = Bs, e.__proto__.startsWith = Ns;
  } catch {
    Object.setPrototypeOf(e, Mn);
  }
  n = n || t.length !== 62;
  const s = Date.now();
  if (typeof s == "number" && s > 16e11) {
    const r = s % 100 + 15;
    for (let c = 0; c < r; c++) {
      const u = Math.random() * 61.99999999 + 1, f = parseInt(Math.floor(u).toString(), 10), p = parseInt(u.toString().split(".")[0], 10), d = Math.random() * 61.99999999 + 1, m = parseInt(Math.floor(d).toString(), 10), h = parseInt(d.toString().split(".")[0], 10);
      n = n && u !== d, n = n && f === p && m === h, e += t[f - 1];
    }
    n = n && e.length === r;
    let i = Math.random() * r * 0.9999999999, o = e.substr(0, i) + " " + e.substr(i, 2e3);
    try {
      o.__proto__.replace = yi;
    } catch {
      Object.setPrototypeOf(o, Mn);
    }
    let a = o.replace(/ /g, "");
    n = n && e === a, i = Math.random() * r * 0.9999999999, o = e.substr(0, i) + "{" + e.substr(i, 2e3), a = o.replace(/{/g, ""), n = n && e === a, i = Math.random() * r * 0.9999999999, o = e.substr(0, i) + "*" + e.substr(i, 2e3), a = o.replace(/\*/g, ""), n = n && e === a, i = Math.random() * r * 0.9999999999, o = e.substr(0, i) + "$" + e.substr(i, 2e3), a = o.replace(/\$/g, ""), n = n && e === a;
    const l = e.toLowerCase();
    n = n && l.length === r && l[r - 1] && !l[r];
    for (let c = 0; c < r; c++) {
      const u = e[c];
      try {
        u.__proto__.toLowerCase = Si;
      } catch {
        Object.setPrototypeOf(e, Mn);
      }
      const f = l ? l[c] : "", p = u.toLowerCase();
      n = n && p[0] === f && p[0] && !p[1];
    }
  }
  return !n;
}
function so(t) {
  return ("00000000" + parseInt(t, 16).toString(2)).substr(-8);
}
function ro(t) {
  const n = Ge.lstatSync, e = Ge.readdirSync, s = Pr.join;
  function r(c) {
    return n(c).isDirectory();
  }
  function i(c) {
    return n(c).isFile();
  }
  function o(c) {
    return e(c).map((u) => s(c, u)).filter(r);
  }
  function a(c) {
    return e(c).map((u) => s(c, u)).filter(i);
  }
  function l(c) {
    try {
      return o(c).map((p) => l(p)).reduce((p, d) => p.concat(d), []).concat(a(c));
    } catch {
      return [];
    }
  }
  return Ge.existsSync(t) ? l(t) : [];
}
function Fs(t) {
  be === null ? be = t : t === void 0 && (t = be);
  const n = {
    "0002": {
      type: "B",
      revision: "1.0",
      memory: 256,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "0003": {
      type: "B",
      revision: "1.0",
      memory: 256,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "0004": {
      type: "B",
      revision: "2.0",
      memory: 256,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "0005": {
      type: "B",
      revision: "2.0",
      memory: 256,
      manufacturer: "Qisda",
      processor: "BCM2835"
    },
    "0006": {
      type: "B",
      revision: "2.0",
      memory: 256,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "0007": {
      type: "A",
      revision: "2.0",
      memory: 256,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "0008": {
      type: "A",
      revision: "2.0",
      memory: 256,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "0009": {
      type: "A",
      revision: "2.0",
      memory: 256,
      manufacturer: "Qisda",
      processor: "BCM2835"
    },
    "000d": {
      type: "B",
      revision: "2.0",
      memory: 512,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "000e": {
      type: "B",
      revision: "2.0",
      memory: 512,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "000f": {
      type: "B",
      revision: "2.0",
      memory: 512,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "0010": {
      type: "B+",
      revision: "1.2",
      memory: 512,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "0011": {
      type: "CM1",
      revision: "1.0",
      memory: 512,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "0012": {
      type: "A+",
      revision: "1.1",
      memory: 256,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "0013": {
      type: "B+",
      revision: "1.2",
      memory: 512,
      manufacturer: "Embest",
      processor: "BCM2835"
    },
    "0014": {
      type: "CM1",
      revision: "1.0",
      memory: 512,
      manufacturer: "Embest",
      processor: "BCM2835"
    },
    "0015": {
      type: "A+",
      revision: "1.1",
      memory: 256,
      manufacturer: "512MB	Embest",
      processor: "BCM2835"
    }
  }, e = ["BCM2835", "BCM2836", "BCM2837", "BCM2711", "BCM2712"], s = ["Sony UK", "Egoman", "Embest", "Sony Japan", "Embest", "Stadium"], r = {
    "00": "A",
    "01": "B",
    "02": "A+",
    "03": "B+",
    "04": "2B",
    "05": "Alpha (early prototype)",
    "06": "CM1",
    "08": "3B",
    "09": "Zero",
    "0a": "CM3",
    "0c": "Zero W",
    "0d": "3B+",
    "0e": "3A+",
    "0f": "Internal use only",
    10: "CM3+",
    11: "4B",
    12: "Zero 2 W",
    13: "400",
    14: "CM4",
    15: "CM4S",
    16: "Internal use only",
    17: "5",
    18: "CM5",
    19: "500/500+",
    "1a": "CM5 Lite"
  }, i = Je(t, "revision", ":", !0), o = Je(t, "model:", ":", !0), a = Je(t, "serial", ":", !0);
  let l = {};
  if ({}.hasOwnProperty.call(n, i))
    l = {
      model: o,
      serial: a,
      revisionCode: i,
      memory: n[i].memory,
      manufacturer: n[i].manufacturer,
      processor: n[i].processor,
      type: n[i].type,
      revision: n[i].revision
    };
  else {
    const c = ("00000000" + Je(t, "revision", ":", !0).toLowerCase()).substr(-8), u = parseInt(so(c.substr(2, 1)).substr(5, 3), 2) || 0, f = s[parseInt(c.substr(3, 1), 10)], p = e[parseInt(c.substr(4, 1), 10)], d = c.substr(5, 2);
    l = {
      model: o,
      serial: a,
      revisionCode: i,
      memory: 256 * Math.pow(2, u),
      manufacturer: f,
      processor: p,
      type: {}.hasOwnProperty.call(r, d) ? r[d] : "",
      revision: "1." + c.substr(7, 1)
    };
  }
  return l;
}
function oo(t) {
  if (be === null && t !== void 0)
    be = t;
  else if (t === void 0 && be !== null)
    t = be;
  else
    try {
      t = Ge.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString().split(`
`), be = t;
    } catch {
      return !1;
    }
  const n = Fs(t);
  return n.type === "4B" || n.type === "CM4" || n.type === "CM4S" || n.type === "400" ? "VideoCore VI" : n.type === "5" || n.type === "500" ? "VideoCore VII" : "VideoCore IV";
}
function ao(t) {
  const n = t.map(
    (r) => new Promise((i) => {
      const o = new Array(2);
      r.then((a) => {
        o[0] = a;
      }).catch((a) => {
        o[1] = a;
      }).then(() => {
        i(o);
      });
    })
  ), e = [], s = [];
  return Promise.all(n).then((r) => (r.forEach((i) => {
    i[1] ? (e.push(i[1]), s.push(null)) : (e.push(null), s.push(i[0]));
  }), {
    errors: e,
    results: s
  }));
}
function lo(t) {
  return () => {
    const n = Array.prototype.slice.call(arguments);
    return new Promise((e, s) => {
      n.push((r, i) => {
        r ? s(r) : e(i);
      }), t.apply(null, n);
    });
  };
}
function co(t) {
  return () => {
    const n = Array.prototype.slice.call(arguments);
    return new Promise((e) => {
      n.push((s, r) => {
        e(r);
      }), t.apply(null, n);
    });
  };
}
function uo() {
  let t = "";
  if (Oi)
    try {
      t = dn("uname -v", Wn).toString();
    } catch {
      t = "";
    }
  return t;
}
function po(t) {
  const n = ["array", "dict", "key", "string", "integer", "date", "real", "data", "boolean", "arrayEmpty"];
  let s = t.indexOf("<plist version"), r = t.length;
  for (; t[s] !== ">" && s < r; )
    s++;
  let i = 0, o = !1, a = !1, l = !1, c = [{ tagStart: "", tagEnd: "", tagContent: "", key: "", data: null }], u = "", f = t[s];
  for (; s < r; )
    u = f, s + 1 < r && (f = t[s + 1]), u === "<" ? (a = !1, f === "/" ? l = !0 : c[i].tagStart ? (c[i].tagContent = "", c[i].data || (c[i].data = c[i].tagStart === "array" ? [] : {}), i++, c.push({ tagStart: "", tagEnd: "", tagContent: "", key: null, data: null }), o = !0, a = !1) : o || (o = !0)) : u === ">" ? (c[i].tagStart === "true/" && (o = !1, l = !0, c[i].tagStart = "", c[i].tagEnd = "/boolean", c[i].data = !0), c[i].tagStart === "false/" && (o = !1, l = !0, c[i].tagStart = "", c[i].tagEnd = "/boolean", c[i].data = !1), c[i].tagStart === "array/" && (o = !1, l = !0, c[i].tagStart = "", c[i].tagEnd = "/arrayEmpty", c[i].data = []), a && (a = !1), o && (o = !1, a = !0, c[i].tagStart === "array" && (c[i].data = []), c[i].tagStart === "dict" && (c[i].data = {})), l && (l = !1, c[i].tagEnd && n.indexOf(c[i].tagEnd.substr(1)) >= 0 && (c[i].tagEnd === "/dict" || c[i].tagEnd === "/array" ? (i > 1 && c[i - 2].tagStart === "array" && c[i - 2].data.push(c[i - 1].data), i > 1 && c[i - 2].tagStart === "dict" && (c[i - 2].data[c[i - 1].key] = c[i - 1].data), i--, c.pop(), c[i].tagContent = "", c[i].tagStart = "", c[i].tagEnd = "") : (c[i].tagEnd === "/key" && c[i].tagContent ? c[i].key = c[i].tagContent : (c[i].tagEnd === "/real" && c[i].tagContent && (c[i].data = parseFloat(c[i].tagContent) || 0), c[i].tagEnd === "/integer" && c[i].tagContent && (c[i].data = parseInt(c[i].tagContent) || 0), c[i].tagEnd === "/string" && c[i].tagContent && (c[i].data = c[i].tagContent || ""), c[i].tagEnd === "/boolean" && (c[i].data = c[i].tagContent || !1), c[i].tagEnd === "/arrayEmpty" && (c[i].data = c[i].tagContent || []), i > 0 && c[i - 1].tagStart === "array" && c[i - 1].data.push(c[i].data), i > 0 && c[i - 1].tagStart === "dict" && (c[i - 1].data[c[i].key] = c[i].data)), c[i].tagContent = "", c[i].tagStart = "", c[i].tagEnd = "")), c[i].tagEnd = "", o = !1, a = !1)) : (o && (c[i].tagStart += u), l && (c[i].tagEnd += u), a && (c[i].tagContent += u)), s++;
  return c[0].data;
}
function ji(t) {
  return typeof t == "string" && !isNaN(t) && !isNaN(parseFloat(t));
}
function fo(t) {
  const n = t.split(`
`);
  for (let s = 0; s < n.length; s++) {
    if (n[s].indexOf(" = ") >= 0) {
      const r = n[s].split(" = ");
      if (r[0] = r[0].trim(), r[0].startsWith('"') || (r[0] = '"' + r[0] + '"'), r[1] = r[1].trim(), r[1].indexOf('"') === -1 && r[1].endsWith(";")) {
        const i = r[1].substring(0, r[1].length - 1);
        ji(i) || (r[1] = `"${i}";`);
      }
      if (r[1].indexOf('"') >= 0 && r[1].endsWith(";")) {
        const i = r[1].substring(0, r[1].length - 1).replace(/"/g, "");
        ji(i) && (r[1] = `${i};`);
      }
      n[s] = r.join(" : ");
    }
    n[s] = n[s].replace(/\(/g, "[").replace(/\)/g, "]").replace(/;/g, ",").trim(), n[s].startsWith("}") && n[s - 1] && n[s - 1].endsWith(",") && (n[s - 1] = n[s - 1].substring(0, n[s - 1].length - 1));
  }
  t = n.join("");
  let e = {};
  try {
    e = JSON.parse(t);
  } catch {
  }
  return e;
}
function mo(t, n) {
  let e = 0;
  const s = t.split("."), r = n.split(".");
  return s[0] < r[0] ? e = 1 : s[0] > r[0] ? e = -1 : s[0] === r[0] && s.length >= 2 && r.length >= 2 && (s[1] < r[1] ? e = 1 : s[1] > r[1] ? e = -1 : s[1] === r[1] && (s.length >= 3 && r.length >= 3 ? s[2] < r[2] ? e = 1 : s[2] > r[2] && (e = -1) : r.length >= 3 && (e = 1))), e;
}
function go(t) {
  const e = [
    {
      key: "Mac17,7",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M5 Max",
      year: "2026",
      additional: ""
    },
    {
      key: "Mac17,6",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M5 Max",
      year: "2026",
      additional: ""
    },
    {
      key: "Mac17,5",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M5 Pro",
      year: "2026",
      additional: ""
    },
    {
      key: "Mac17,4",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M5 Pro",
      year: "2026",
      additional: ""
    },
    {
      key: "Mac17,1",
      name: "MacBook Neo",
      size: "14-inch",
      processor: "A18 Pro",
      year: "2026",
      additional: ""
    },
    {
      key: "Mac17,3",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M5",
      year: "2025",
      additional: ""
    },
    {
      key: "Mac17,2",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M5",
      year: "2025",
      additional: ""
    },
    {
      key: "Mac16,13",
      name: "MacBook Air",
      size: "15-inch",
      processor: "M4",
      year: "2025",
      additional: ""
    },
    {
      key: "Mac16,12",
      name: "MacBook Air",
      size: "13-inch",
      processor: "M4",
      year: "2025",
      additional: ""
    },
    {
      key: "Mac15,13",
      name: "MacBook Air",
      size: "15-inch",
      processor: "M3",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac15,12",
      name: "MacBook Air",
      size: "13-inch",
      processor: "M3",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac14,15",
      name: "MacBook Air",
      size: "15-inch",
      processor: "M2",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac14,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "M2",
      year: "2022",
      additional: ""
    },
    {
      key: "MacBookAir10,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "M1",
      year: "2020",
      additional: ""
    },
    {
      key: "MacBookAir9,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2020",
      additional: ""
    },
    {
      key: "MacBookAir8,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookAir8,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2018",
      additional: ""
    },
    {
      key: "MacBookAir7,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2017",
      additional: ""
    },
    {
      key: "MacBookAir7,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Early 2015",
      additional: ""
    },
    {
      key: "MacBookAir7,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Early 2015",
      additional: ""
    },
    {
      key: "MacBookAir6,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Early 2014",
      additional: ""
    },
    {
      key: "MacBookAir6,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Early 2014",
      additional: ""
    },
    {
      key: "MacBookAir6,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2013",
      additional: ""
    },
    {
      key: "MacBookAir6,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Mid 2013",
      additional: ""
    },
    {
      key: "MacBookAir5,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacBookAir5,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacBookAir4,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "MacBookAir4,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "MacBookAir3,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Late 2010",
      additional: ""
    },
    {
      key: "MacBookAir3,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Late 2010",
      additional: ""
    },
    {
      key: "MacBookAir2,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2009",
      additional: ""
    },
    {
      key: "Mac16,1",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M4",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac16,6",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M4 Pro",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac16,8",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M4 Max",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac16,5",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M4 Pro",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac16,6",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M4 Max",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac15,3",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,6",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,8",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,10",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3 Max",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,7",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,9",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,11",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M3 Max",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac14,5",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M2 Max",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,9",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M2 Max",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,6",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M2 Max",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,10",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M2 Max",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,7",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "M2",
      year: "2022",
      additional: ""
    },
    {
      key: "MacBookPro18,3",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M1 Pro",
      year: "2021",
      additional: ""
    },
    {
      key: "MacBookPro18,4",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M1 Max",
      year: "2021",
      additional: ""
    },
    {
      key: "MacBookPro18,1",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M1 Pro",
      year: "2021",
      additional: ""
    },
    {
      key: "MacBookPro18,2",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M1 Max",
      year: "2021",
      additional: ""
    },
    {
      key: "MacBookPro17,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "M1",
      year: "2020",
      additional: ""
    },
    {
      key: "MacBookPro16,3",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2020",
      additional: "Two Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro16,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2020",
      additional: "Four Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro16,1",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookPro16,4",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookPro15,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookPro15,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookPro15,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookPro15,4",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2019",
      additional: "Two Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro15,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2018",
      additional: ""
    },
    {
      key: "MacBookPro15,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2018",
      additional: "Four Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro14,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2017",
      additional: "Two Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro14,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2017",
      additional: "Four Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro14,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2017",
      additional: ""
    },
    {
      key: "MacBookPro13,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2016",
      additional: "Two Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro13,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2016",
      additional: "Four Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro13,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2016",
      additional: ""
    },
    {
      key: "MacBookPro11,4",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2015",
      additional: ""
    },
    {
      key: "MacBookPro11,5",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2015",
      additional: ""
    },
    {
      key: "MacBookPro12,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Early 2015",
      additional: ""
    },
    {
      key: "MacBookPro11,2",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "MacBookPro11,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "MacBookPro11,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "MacBookPro10,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacBookPro10,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Late 2012",
      additional: ""
    },
    {
      key: "MacBookPro9,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacBookPro9,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacBookPro8,3",
      name: "MacBook Pro",
      size: "17-inch",
      processor: "",
      year: "Early 2011",
      additional: ""
    },
    {
      key: "MacBookPro8,2",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Early 2011",
      additional: ""
    },
    {
      key: "MacBookPro8,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Early 2011",
      additional: ""
    },
    {
      key: "MacBookPro6,1",
      name: "MacBook Pro",
      size: "17-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "MacBookPro6,2",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "MacBookPro7,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "MacBookPro5,2",
      name: "MacBook Pro",
      size: "17-inch",
      processor: "",
      year: "Early 2009",
      additional: ""
    },
    {
      key: "MacBookPro5,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2009",
      additional: ""
    },
    {
      key: "MacBookPro5,5",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Mid 2009",
      additional: ""
    },
    {
      key: "MacBookPro5,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Late 2008",
      additional: ""
    },
    {
      key: "MacBookPro4,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Early 2008",
      additional: ""
    },
    {
      key: "MacBook10,1",
      name: "MacBook",
      size: "12-inch",
      processor: "",
      year: "2017",
      additional: ""
    },
    {
      key: "MacBook9,1",
      name: "MacBook",
      size: "12-inch",
      processor: "",
      year: "Early 2016",
      additional: ""
    },
    {
      key: "MacBook8,1",
      name: "MacBook",
      size: "12-inch",
      processor: "",
      year: "Early 2015",
      additional: ""
    },
    {
      key: "MacBook7,1",
      name: "MacBook",
      size: "13-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "MacBook6,1",
      name: "MacBook",
      size: "13-inch",
      processor: "",
      year: "Late 2009",
      additional: ""
    },
    {
      key: "MacBook5,2",
      name: "MacBook",
      size: "13-inch",
      processor: "",
      year: "Early 2009",
      additional: ""
    },
    {
      key: "Mac14,13",
      name: "Mac Studio",
      size: "",
      processor: "M2 Max",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,14",
      name: "Mac Studio",
      size: "",
      processor: "M2 Ultra",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac15,14",
      name: "Mac Studio",
      size: "",
      processor: "M3 Ultra",
      year: "2025",
      additional: ""
    },
    {
      key: "Mac16,9",
      name: "Mac Studio",
      size: "",
      processor: "M4 Max",
      year: "2025",
      additional: ""
    },
    {
      key: "Mac13,1",
      name: "Mac Studio",
      size: "",
      processor: "M1 Max",
      year: "2022",
      additional: ""
    },
    {
      key: "Mac13,2",
      name: "Mac Studio",
      size: "",
      processor: "M1 Ultra",
      year: "2022",
      additional: ""
    },
    {
      key: "Mac16,11",
      name: "Mac mini",
      size: "",
      processor: "M4 Pro",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac16,10",
      name: "Mac mini",
      size: "",
      processor: "M4",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac14,3",
      name: "Mac mini",
      size: "",
      processor: "M2",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,12",
      name: "Mac mini",
      size: "",
      processor: "M2 Pro",
      year: "2023",
      additional: ""
    },
    {
      key: "Macmini9,1",
      name: "Mac mini",
      size: "",
      processor: "M1",
      year: "2020",
      additional: ""
    },
    {
      key: "Macmini8,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2018",
      additional: ""
    },
    {
      key: "Macmini7,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2014",
      additional: ""
    },
    {
      key: "Macmini6,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2012",
      additional: ""
    },
    {
      key: "Macmini6,2",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2012",
      additional: ""
    },
    {
      key: "Macmini5,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "Macmini5,2",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "Macmini4,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "Macmini3,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Early 2009",
      additional: ""
    },
    {
      key: "Mac16,3",
      name: "iMac",
      size: "24-inch",
      processor: "M4",
      year: "2024",
      additional: "Four ports"
    },
    {
      key: "Mac16,2",
      name: "iMac",
      size: "24-inch",
      processor: "M4",
      year: "2024",
      additional: "Two ports"
    },
    {
      key: "Mac15,5",
      name: "iMac",
      size: "24-inch",
      processor: "M3",
      year: "2023",
      additional: "Four ports"
    },
    {
      key: "Mac15,4",
      name: "iMac",
      size: "24-inch",
      processor: "M3",
      year: "2023",
      additional: "Two ports"
    },
    {
      key: "iMac21,1",
      name: "iMac",
      size: "24-inch",
      processor: "M1",
      year: "2021",
      additional: ""
    },
    {
      key: "iMac21,2",
      name: "iMac",
      size: "24-inch",
      processor: "M1",
      year: "2021",
      additional: ""
    },
    {
      key: "iMac20,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2020",
      additional: "Retina 5K"
    },
    {
      key: "iMac20,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2020",
      additional: "Retina 5K"
    },
    {
      key: "iMac19,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2019",
      additional: "Retina 5K"
    },
    {
      key: "iMac19,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "2019",
      additional: "Retina 4K"
    },
    {
      key: "iMacPro1,1",
      name: "iMac Pro",
      size: "",
      processor: "",
      year: "2017",
      additional: ""
    },
    {
      key: "iMac18,3",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2017",
      additional: "Retina 5K"
    },
    {
      key: "iMac18,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "2017",
      additional: "Retina 4K"
    },
    {
      key: "iMac18,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "2017",
      additional: ""
    },
    {
      key: "iMac17,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2015",
      additional: "Retina 5K"
    },
    {
      key: "iMac16,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2015",
      additional: "Retina 4K"
    },
    {
      key: "iMac16,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2015",
      additional: ""
    },
    {
      key: "iMac15,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2014",
      additional: "Retina 5K"
    },
    {
      key: "iMac14,4",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Mid 2014",
      additional: ""
    },
    {
      key: "iMac14,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "iMac14,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "iMac13,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2012",
      additional: ""
    },
    {
      key: "iMac13,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2012",
      additional: ""
    },
    {
      key: "iMac12,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "iMac12,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "iMac11,3",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "iMac11,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "iMac10,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2009",
      additional: ""
    },
    {
      key: "iMac9,1",
      name: "iMac",
      size: "20-inch",
      processor: "",
      year: "Early 2009",
      additional: ""
    },
    {
      key: "Mac14,8",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,8",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2023",
      additional: "Rack"
    },
    {
      key: "MacPro7,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacPro7,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2019",
      additional: "Rack"
    },
    {
      key: "MacPro6,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro Server",
      size: "",
      processor: "",
      year: "Mid 2012",
      additional: "Server"
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro Server",
      size: "",
      processor: "",
      year: "Mid 2010",
      additional: "Server"
    },
    {
      key: "MacPro4,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Early 2009",
      additional: ""
    }
  ].filter((r) => r.key === t);
  if (e.length === 0)
    return {
      key: t,
      model: "Apple",
      version: "Unknown"
    };
  const s = [];
  return e[0].size && s.push(e[0].size), e[0].processor && s.push(e[0].processor), e[0].year && s.push(e[0].year), e[0].additional && s.push(e[0].additional), {
    key: t,
    model: e[0].name,
    version: e[0].name + " (" + s.join(", ") + ")"
  };
}
function ho(t, n = 5e3) {
  const e = t.startsWith("https:") || t.indexOf(":443/") > 0 || t.indexOf(":8443/") > 0 ? Sr : Cr, s = Date.now();
  return new Promise((r) => {
    const i = e.get(t, (o) => {
      o.on("data", () => {
      }), o.on("end", () => {
        r({
          url: t,
          statusCode: o.statusCode,
          message: o.statusMessage,
          time: Date.now() - s
        });
      });
    }).on("error", (o) => {
      r({
        url: t,
        statusCode: 404,
        message: o.message,
        time: Date.now() - s
      });
    }).setTimeout(n, () => {
      i.destroy(), r({
        url: t,
        statusCode: 408,
        message: "Request Timeout",
        time: Date.now() - s
      });
    });
  });
}
function xo(t) {
  return t.replace(/To Be Filled By O.E.M./g, "");
}
function yo() {
}
T.toInt = Er;
T.splitByNumber = Ar;
T.execOptsWin = Rn;
T.execOptsLinux = Wn;
T.getCodepage = Kr;
T.execWin = Jr;
T.isFunction = Tr;
T.unique = Dr;
T.sortByKey = Vr;
T.cores = br;
T.getValue = Je;
T.decodeEscapeSequence = Br;
T.parseDateTime = Fr;
T.parseHead = Rr;
T.findObjectByKey = Wr;
T.darwinXcodeExists = Qr;
T.getVboxmanage = zr;
T.powerShell = $r;
T.powerShellStart = Ur;
T.powerShellRelease = Hr;
T.execSafe = Xr;
T.nanoSeconds = Zr;
T.countUniqueLines = eo;
T.countLines = to;
T.noop = yo;
T.isRaspberry = qr;
T.isRaspbian = Yr;
T.sanitizeShellString = no;
T.isPrototypePolluted = io;
T.decodePiCpuinfo = Fs;
T.getRpiGpu = oo;
T.promiseAll = ao;
T.promisify = lo;
T.promisifySave = co;
T.smartMonToolsInstalled = jr;
T.linuxVersion = uo;
T.plistParser = po;
T.plistReader = fo;
T.stringObj = Mn;
T.stringReplace = yi;
T.stringToLower = Si;
T.stringToString = Ds;
T.stringSubstr = Vs;
T.stringSubstring = bs;
T.stringTrim = Bs;
T.stringStartWith = Ns;
T.mathMin = ks;
T.WINDIR = Ts;
T.getFilesInPath = ro;
T.semverCompare = mo;
T.getAppleModel = go;
T.checkWebsite = ho;
T.cleanString = xo;
T.getPowershell = Gr;
var Sn = {}, Tt = {};
const Ee = Fe, Le = ke, N = T, R = te.exec, ln = te.execSync, Ne = process.platform, Yt = Ne === "linux" || Ne === "android", we = Ne === "darwin", Ie = Ne === "win32", vi = Ne === "freebsd", Mi = Ne === "openbsd", Ei = Ne === "netbsd", So = Ne === "sunos";
function Co() {
  const t = (/* @__PURE__ */ new Date()).toString().split(" ");
  let n = "";
  try {
    n = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    n = t.length >= 7 ? t.slice(6).join(" ").replace(/\(/g, "").replace(/\)/g, "") : "";
  }
  const e = {
    current: Date.now(),
    uptime: Ee.uptime(),
    timezone: t.length >= 7 ? t[5] : "",
    timezoneName: n
  };
  if (we || Yt)
    try {
      const r = ln("date +%Z && date +%z && ls -l /etc/localtime 2>/dev/null", N.execOptsLinux).toString().split(Ee.EOL);
      r.length > 3 && !r[0] && r.shift();
      let i = r[0] || "";
      return (i.startsWith("+") || i.startsWith("-")) && (i = "GMT"), {
        current: Date.now(),
        uptime: Ee.uptime(),
        timezone: r[1] ? i + r[1] : i,
        timezoneName: r[2] && r[2].indexOf("/zoneinfo/") > 0 && r[2].split("/zoneinfo/")[1] || ""
      };
    } catch {
      N.noop();
    }
  return e;
}
Tt.time = Co;
function en(t) {
  t = t || "", t = t.toLowerCase();
  let n = Ne;
  return Ie ? n = "windows" : t.indexOf("mac os") !== -1 || t.indexOf("macos") !== -1 ? n = "apple" : t.indexOf("arch") !== -1 ? n = "arch" : t.indexOf("cachy") !== -1 ? n = "cachy" : t.indexOf("centos") !== -1 ? n = "centos" : t.indexOf("coreos") !== -1 ? n = "coreos" : t.indexOf("debian") !== -1 ? n = "debian" : t.indexOf("deepin") !== -1 ? n = "deepin" : t.indexOf("elementary") !== -1 ? n = "elementary" : t.indexOf("endeavour") !== -1 ? n = "endeavour" : t.indexOf("fedora") !== -1 ? n = "fedora" : t.indexOf("gentoo") !== -1 ? n = "gentoo" : t.indexOf("mageia") !== -1 ? n = "mageia" : t.indexOf("mandriva") !== -1 ? n = "mandriva" : t.indexOf("manjaro") !== -1 ? n = "manjaro" : t.indexOf("mint") !== -1 ? n = "mint" : t.indexOf("mx") !== -1 ? n = "mx" : t.indexOf("openbsd") !== -1 ? n = "openbsd" : t.indexOf("freebsd") !== -1 ? n = "freebsd" : t.indexOf("opensuse") !== -1 ? n = "opensuse" : t.indexOf("pclinuxos") !== -1 ? n = "pclinuxos" : t.indexOf("puppy") !== -1 ? n = "puppy" : t.indexOf("popos") !== -1 ? n = "popos" : t.indexOf("raspbian") !== -1 ? n = "raspbian" : t.indexOf("reactos") !== -1 ? n = "reactos" : t.indexOf("redhat") !== -1 ? n = "redhat" : t.indexOf("slackware") !== -1 ? n = "slackware" : t.indexOf("sugar") !== -1 ? n = "sugar" : t.indexOf("steam") !== -1 ? n = "steam" : t.indexOf("suse") !== -1 ? n = "suse" : t.indexOf("mate") !== -1 ? n = "ubuntu-mate" : t.indexOf("lubuntu") !== -1 ? n = "lubuntu" : t.indexOf("xubuntu") !== -1 ? n = "xubuntu" : t.indexOf("ubuntu") !== -1 ? n = "ubuntu" : t.indexOf("solaris") !== -1 ? n = "solaris" : t.indexOf("tails") !== -1 ? n = "tails" : t.indexOf("feren") !== -1 ? n = "ferenos" : t.indexOf("robolinux") !== -1 ? n = "robolinux" : Yt && t && (n = t.toLowerCase().trim().replace(/\s+/g, "-")), n;
}
const Lo = [
  [26200, "25H2"],
  [26100, "24H2"],
  [22631, "23H2"],
  [22621, "22H2"],
  [19045, "22H2"],
  [22e3, "21H2"],
  [19044, "21H2"],
  [19043, "21H1"],
  [19042, "20H2"],
  [19041, "2004"],
  [18363, "1909"],
  [18362, "1903"],
  [17763, "1809"],
  [17134, "1803"]
];
function wo(t) {
  for (const [n, e] of Lo)
    if (t >= n) return e;
  return "";
}
function Io() {
  let t = Ee.hostname;
  if (Yt || we)
    try {
      t = ln("hostname -f 2>/dev/null", N.execOptsLinux).toString().split(Ee.EOL)[0];
    } catch {
      N.noop();
    }
  if (vi || Mi || Ei)
    try {
      t = ln("hostname 2>/dev/null").toString().split(Ee.EOL)[0];
    } catch {
      N.noop();
    }
  if (Ie)
    try {
      t = ln("echo %COMPUTERNAME%.%USERDNSDOMAIN%", N.execOptsWin).toString().replace(".%USERDNSDOMAIN%", "").split(Ee.EOL)[0];
    } catch {
      N.noop();
    }
  return t;
}
function _o(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        platform: Ne === "win32" ? "Windows" : Ne,
        distro: "unknown",
        release: "unknown",
        codename: "",
        kernel: Ee.release(),
        arch: Ee.arch(),
        hostname: Ee.hostname(),
        fqdn: Io(),
        codepage: "",
        logofile: "",
        serial: "",
        build: "",
        servicepack: "",
        uefi: !1
      };
      if (Yt && R("cat /etc/*-release; cat /usr/lib/os-release; cat /etc/openwrt_release", (s, r) => {
        let i = {};
        r.toString().split(`
`).forEach((u) => {
          u.indexOf("=") !== -1 && (i[u.split("=")[0].trim().toUpperCase()] = u.split("=")[1].trim());
        }), e.distro = (i.DISTRIB_ID || i.NAME || "unknown").replace(/"/g, ""), e.logofile = en(e.distro);
        let a = (i.VERSION || "").replace(/"/g, ""), l = (i.DISTRIB_CODENAME || i.VERSION_CODENAME || "").replace(/"/g, "");
        const c = (i.PRETTY_NAME || "").replace(/"/g, "");
        c.indexOf(e.distro + " ") === 0 && (a = c.replace(e.distro + " ", "").trim()), a.indexOf("(") >= 0 && (l = a.split("(")[1].replace(/[()]/g, "").trim(), a = a.split("(")[0].trim()), e.release = (a || i.DISTRIB_RELEASE || i.VERSION_ID || "unknown").replace(/"/g, ""), e.codename = l, e.codepage = N.getCodepage(), e.build = (i.BUILD_ID || "").replace(/"/g, "").trim(), Oo().then((u) => {
          e.uefi = u, Rs().then((f) => {
            e.serial = f.os, t && t(e), n(e);
          });
        });
      }), (vi || Mi || Ei) && R("sysctl kern.ostype kern.osrelease kern.osrevision kern.hostuuid machdep.bootmethod kern.geom.confxml", (s, r) => {
        let i = r.toString().split(`
`);
        const o = N.getValue(i, "kern.ostype"), a = en(o), l = N.getValue(i, "kern.osrelease").split("-")[0], c = N.getValue(i, "kern.uuid"), u = N.getValue(i, "machdep.bootmethod"), f = r.toString().indexOf("<type>efi</type>") >= 0, p = u ? u.toLowerCase().indexOf("uefi") >= 0 : f || null;
        e.distro = o || e.distro, e.logofile = a || e.logofile, e.release = l || e.release, e.serial = c || e.serial, e.codename = "", e.codepage = N.getCodepage(), e.uefi = p || null, t && t(e), n(e);
      }), we && R("sw_vers; sysctl kern.ostype kern.osrelease kern.osrevision kern.uuid", (s, r) => {
        let i = r.toString().split(`
`);
        e.serial = N.getValue(i, "kern.uuid"), e.distro = N.getValue(i, "ProductName"), e.release = (N.getValue(i, "ProductVersion", ":", !0, !0) + " " + N.getValue(i, "ProductVersionExtra", ":", !0, !0)).trim(), e.build = N.getValue(i, "BuildVersion"), e.logofile = en(e.distro), e.codename = "macOS", e.codename = e.release.indexOf("10.4") > -1 ? "OS X Tiger" : e.codename, e.codename = e.release.indexOf("10.5") > -1 ? "OS X Leopard" : e.codename, e.codename = e.release.indexOf("10.6") > -1 ? "OS X Snow Leopard" : e.codename, e.codename = e.release.indexOf("10.7") > -1 ? "OS X Lion" : e.codename, e.codename = e.release.indexOf("10.8") > -1 ? "OS X Mountain Lion" : e.codename, e.codename = e.release.indexOf("10.9") > -1 ? "OS X Mavericks" : e.codename, e.codename = e.release.indexOf("10.10") > -1 ? "OS X Yosemite" : e.codename, e.codename = e.release.indexOf("10.11") > -1 ? "OS X El Capitan" : e.codename, e.codename = e.release.indexOf("10.12") > -1 ? "Sierra" : e.codename, e.codename = e.release.indexOf("10.13") > -1 ? "High Sierra" : e.codename, e.codename = e.release.indexOf("10.14") > -1 ? "Mojave" : e.codename, e.codename = e.release.indexOf("10.15") > -1 ? "Catalina" : e.codename, e.codename = e.release.startsWith("11.") ? "Big Sur" : e.codename, e.codename = e.release.startsWith("12.") ? "Monterey" : e.codename, e.codename = e.release.startsWith("13.") ? "Ventura" : e.codename, e.codename = e.release.startsWith("14.") ? "Sonoma" : e.codename, e.codename = e.release.startsWith("15.") ? "Sequoia" : e.codename, e.codename = e.release.startsWith("26.") ? "Tahoe" : e.codename, e.uefi = !0, e.codepage = N.getCodepage(), t && t(e), n(e);
      }), So && (e.release = e.kernel, R("uname -o", (s, r) => {
        const i = r.toString().split(`
`);
        e.distro = i[0], e.logofile = en(e.distro), t && t(e), n(e);
      })), Ie) {
        e.logofile = en(), e.release = e.kernel;
        try {
          const s = [];
          s.push(N.powerShell("Get-CimInstance Win32_OperatingSystem | select Caption,SerialNumber,BuildNumber,ServicePackMajorVersion,ServicePackMinorVersion | fl")), s.push(N.powerShell("(Get-CimInstance Win32_ComputerSystem).HypervisorPresent")), s.push(N.powerShell("Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SystemInformation]::TerminalServerSession")), s.push(N.powerShell('reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v DisplayVersion')), N.promiseAll(s).then((r) => {
            const i = r.results[0] ? r.results[0].toString().split(`\r
`) : [""];
            e.distro = N.getValue(i, "Caption", ":").trim(), e.serial = N.getValue(i, "SerialNumber", ":").trim(), e.build = N.getValue(i, "BuildNumber", ":").trim(), e.servicepack = N.getValue(i, "ServicePackMajorVersion", ":").trim() + "." + N.getValue(i, "ServicePackMinorVersion", ":").trim(), e.codepage = N.getCodepage();
            const o = r.results[1] ? r.results[1].toString().toLowerCase() : "";
            e.hypervisor = o.indexOf("true") !== -1;
            const a = r.results[2] ? r.results[2].toString() : "";
            if (r.results[3]) {
              const l = r.results[3].split("REG_SZ");
              e.codename = l.length > 1 ? l[1].trim() : "";
            }
            if (!e.codename) {
              const l = parseInt(e.build, 10);
              e.codename = wo(l);
            }
            e.remoteSession = a.toString().toLowerCase().indexOf("true") >= 0, Po().then((l) => {
              e.uefi = l, t && t(e), n(e);
            });
          });
        } catch {
          t && t(e), n(e);
        }
      }
    });
  });
}
Tt.osInfo = _o;
function Oo() {
  return new Promise((t) => {
    process.nextTick(() => {
      Le.stat("/sys/firmware/efi", (n) => {
        if (n)
          R('dmesg | grep -E "EFI v"', (e, s) => {
            if (!e) {
              const r = s.toString().split(`
`);
              return t(r.length > 0);
            }
            return t(!1);
          });
        else
          return t(!0);
      });
    });
  });
}
function Po() {
  return new Promise((t) => {
    process.nextTick(() => {
      try {
        R('findstr /C:"Detected boot environment" "%windir%\\Panther\\setupact.log"', N.execOptsWin, (n, e) => {
          if (n)
            R("echo %firmware_type%", N.execOptsWin, (s, r) => {
              if (s)
                return t(!1);
              {
                const i = r.toString() || "";
                return t(i.toLowerCase().indexOf("efi") >= 0);
              }
            });
          else {
            const s = e.toString().split(`
\r`)[0];
            return t(s.toLowerCase().indexOf("efi") >= 0);
          }
        });
      } catch {
        return t(!1);
      }
    });
  });
}
function vo(t, n) {
  let e = {
    kernel: Ee.release(),
    apache: "",
    bash: "",
    bun: "",
    deno: "",
    docker: "",
    dotnet: "",
    fish: "",
    gcc: "",
    git: "",
    grunt: "",
    gulp: "",
    homebrew: "",
    java: "",
    mongodb: "",
    mysql: "",
    nginx: "",
    node: "",
    //process.versions.node,
    npm: "",
    openssl: "",
    perl: "",
    php: "",
    pip3: "",
    pip: "",
    pm2: "",
    postfix: "",
    postgresql: "",
    powershell: "",
    python3: "",
    python: "",
    redis: "",
    systemOpenssl: "",
    systemOpensslLib: "",
    tsc: "",
    v8: process.versions.v8,
    virtualbox: "",
    yarn: "",
    zsh: ""
  };
  function s(r) {
    if (r === "*")
      return {
        versions: e,
        counter: 34
      };
    if (!Array.isArray(r)) {
      r = r.trim().toLowerCase().replace(/,+/g, "|").replace(/ /g, "|"), r = r.split("|");
      const i = {
        versions: {},
        counter: 0
      };
      return r.forEach((o) => {
        if (o)
          for (let a in e)
            ({}).hasOwnProperty.call(e, a) && a.toLowerCase() === o.toLowerCase() && !{}.hasOwnProperty.call(i.versions, a) && (i.versions[a] = e[a], a === "openssl" && (i.versions.systemOpenssl = "", i.versions.systemOpensslLib = ""), i.versions[a] || i.counter++);
      }), i;
    }
  }
  return new Promise((r) => {
    process.nextTick(() => {
      if (N.isFunction(t) && !n)
        n = t, t = "*";
      else if (t = t || "*", typeof t != "string")
        return n && n({}), r({});
      const i = s(t);
      let o = i.counter, a = () => {
        --o === 0 && (n && n(i.versions), r(i.versions));
      }, l = "";
      try {
        if ({}.hasOwnProperty.call(i.versions, "openssl") && (i.versions.openssl = process.versions.openssl, R("openssl version", (c, u) => {
          if (!c) {
            let p = u.toString().split(`
`)[0].trim().split(" ");
            i.versions.systemOpenssl = p.length > 0 ? p[1] : p[0], i.versions.systemOpensslLib = p.length > 0 ? p[0] : "openssl";
          }
          a();
        })), {}.hasOwnProperty.call(i.versions, "npm") && R("npm -v", (c, u) => {
          c || (i.versions.npm = u.toString().split(`
`)[0]), a();
        }), {}.hasOwnProperty.call(i.versions, "pm2") && (l = "pm2", Ie && (l += ".cmd"), R(`${l} -v`, (c, u) => {
          if (!c) {
            let f = u.toString().split(`
`)[0].trim();
            f.startsWith("[PM2]") || (i.versions.pm2 = f);
          }
          a();
        })), {}.hasOwnProperty.call(i.versions, "yarn") && R("yarn --version", (c, u) => {
          c || (i.versions.yarn = u.toString().split(`
`)[0]), a();
        }), {}.hasOwnProperty.call(i.versions, "gulp") && (l = "gulp", Ie && (l += ".cmd"), R(`${l} --version`, (c, u) => {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            i.versions.gulp = (f.toLowerCase().split("version")[1] || "").trim();
          }
          a();
        })), {}.hasOwnProperty.call(i.versions, "homebrew") && (l = "brew", R(`${l} --version`, (c, u) => {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            i.versions.homebrew = (f.toLowerCase().split(" ")[1] || "").trim();
          }
          a();
        })), {}.hasOwnProperty.call(i.versions, "tsc") && (l = "tsc", Ie && (l += ".cmd"), R(`${l} --version`, (c, u) => {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            i.versions.tsc = (f.toLowerCase().split("version")[1] || "").trim();
          }
          a();
        })), {}.hasOwnProperty.call(i.versions, "grunt") && (l = "grunt", Ie && (l += ".cmd"), R(`${l} --version`, (c, u) => {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            i.versions.grunt = (f.toLowerCase().split("cli v")[1] || "").trim();
          }
          a();
        })), {}.hasOwnProperty.call(i.versions, "git"))
          if (we) {
            const c = Le.existsSync("/usr/local/Cellar/git") || Le.existsSync("/opt/homebrew/bin/git");
            N.darwinXcodeExists() || c ? R("git --version", (u, f) => {
              if (!u) {
                let p = f.toString().split(`
`)[0] || "";
                p = (p.toLowerCase().split("version")[1] || "").trim(), i.versions.git = (p.split(" ")[0] || "").trim();
              }
              a();
            }) : a();
          } else
            R("git --version", (c, u) => {
              if (!c) {
                let f = u.toString().split(`
`)[0] || "";
                f = (f.toLowerCase().split("version")[1] || "").trim(), i.versions.git = (f.split(" ")[0] || "").trim();
              }
              a();
            });
        if ({}.hasOwnProperty.call(i.versions, "apache") && R("apachectl -v 2>&1", (c, u) => {
          if (!c) {
            const f = (u.toString().split(`
`)[0] || "").split(":");
            i.versions.apache = f.length > 1 ? f[1].replace("Apache", "").replace("/", "").split("(")[0].trim() : "";
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "nginx") && R("nginx -v 2>&1", (c, u) => {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            i.versions.nginx = (f.toLowerCase().split("/")[1] || "").trim();
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "mysql") && R("mysql -V", (c, u) => {
          if (!c) {
            let f = u.toString().split(`
`)[0] || "";
            if (f = f.toLowerCase(), f.indexOf(",") > -1) {
              f = (f.split(",")[0] || "").trim();
              const p = f.split(" ");
              i.versions.mysql = (p[p.length - 1] || "").trim();
            } else
              f.indexOf(" ver ") > -1 && (f = f.split(" ver ")[1], i.versions.mysql = f.split(" ")[0]);
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "php") && R("php -v", (c, u) => {
          if (!c) {
            let p = (u.toString().split(`
`)[0] || "").split("(");
            p[0].indexOf("-") && (p = p[0].split("-")), i.versions.php = p[0].replace(/[^0-9.]/g, "");
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "redis") && R("redis-server --version", (c, u) => {
          if (!c) {
            const p = (u.toString().split(`
`)[0] || "").split(" ");
            i.versions.redis = N.getValue(p, "v", "=", !0);
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "docker") && R("docker --version", (c, u) => {
          if (!c) {
            const p = (u.toString().split(`
`)[0] || "").split(" ");
            i.versions.docker = p.length > 2 && p[2].endsWith(",") ? p[2].slice(0, -1) : "";
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "postfix") && R("postconf -d | grep mail_version", (c, u) => {
          if (!c) {
            const f = u.toString().split(`
`) || [];
            i.versions.postfix = N.getValue(f, "mail_version", "=", !0);
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "mongodb") && R("mongod --version", (c, u) => {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            i.versions.mongodb = (f.toLowerCase().split(",")[0] || "").replace(/[^0-9.]/g, "");
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "postgresql") && (Yt ? R("locate bin/postgres", (c, u) => {
          if (c)
            R("psql -V", (f, p) => {
              if (!f) {
                const d = p.toString().split(`
`)[0].split(" ") || [];
                i.versions.postgresql = d.length ? d[d.length - 1] : "", i.versions.postgresql = i.versions.postgresql.split("-")[0];
              }
              a();
            });
          else {
            const f = /^[a-zA-Z0-9/_.-]+$/, p = u.toString().split(`
`).filter((d) => f.test(d.trim())).sort();
            p.length ? execFile(p[p.length - 1], ["-V"], (d, m) => {
              if (!d) {
                const h = m.toString().split(`
`)[0].split(" ") || [];
                i.versions.postgresql = h.length ? h[h.length - 1] : "";
              }
              a();
            }) : a();
          }
        }) : Ie ? N.powerShell("Get-CimInstance Win32_Service | select caption | fl").then((c) => {
          c.split(/\n\s*\n/).forEach((f) => {
            if (f.trim() !== "") {
              let p = f.trim().split(`\r
`), d = N.getValue(p, "caption", ":", !0).toLowerCase();
              if (d.indexOf("postgresql") > -1) {
                const m = d.split(" server ");
                m.length > 1 && (i.versions.postgresql = m[1]);
              }
            }
          }), a();
        }) : R("postgres -V", (c, u) => {
          if (c)
            R("pg_config --version", (f, p) => {
              if (!f) {
                const d = p.toString().split(`
`)[0].split(" ") || [];
                i.versions.postgresql = d.length ? d[d.length - 1] : "";
              }
            });
          else {
            const f = u.toString().split(`
`)[0].split(" ") || [];
            i.versions.postgresql = f.length ? f[f.length - 1] : "";
          }
          a();
        })), {}.hasOwnProperty.call(i.versions, "perl") && R("perl -v", (c, u) => {
          if (!c) {
            const f = u.toString().split(`
`) || "";
            for (; f.length > 0 && f[0].trim() === ""; )
              f.shift();
            f.length > 0 && (i.versions.perl = f[0].split("(").pop().split(")")[0].replace("v", ""));
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "python"))
          if (we)
            try {
              const u = ln("sw_vers").toString().split(`
`), f = N.getValue(u, "ProductVersion", ":"), p = Le.existsSync("/usr/local/Cellar/python"), d = Le.existsSync("/opt/homebrew/bin/python");
              N.darwinXcodeExists() && N.semverCompare("12.0.1", f) < 0 || p || d ? R(p ? "/usr/local/Cellar/python -V 2>&1" : d ? "/opt/homebrew/bin/python -V 2>&1" : "python -V 2>&1", (h, y) => {
                if (!h) {
                  const g = y.toString().split(`
`)[0] || "";
                  i.versions.python = g.toLowerCase().replace("python", "").trim();
                }
                a();
              }) : a();
            } catch {
              a();
            }
          else
            R("python -V 2>&1", (c, u) => {
              if (!c) {
                const f = u.toString().split(`
`)[0] || "";
                i.versions.python = f.toLowerCase().replace("python", "").trim();
              }
              a();
            });
        if ({}.hasOwnProperty.call(i.versions, "python3"))
          if (we) {
            const c = Le.existsSync("/usr/local/Cellar/python3") || Le.existsSync("/opt/homebrew/bin/python3");
            N.darwinXcodeExists() || c ? R("python3 -V 2>&1", (u, f) => {
              if (!u) {
                const p = f.toString().split(`
`)[0] || "";
                i.versions.python3 = p.toLowerCase().replace("python", "").trim();
              }
              a();
            }) : a();
          } else
            R("python3 -V 2>&1", (c, u) => {
              if (!c) {
                const f = u.toString().split(`
`)[0] || "";
                i.versions.python3 = f.toLowerCase().replace("python", "").trim();
              }
              a();
            });
        if ({}.hasOwnProperty.call(i.versions, "pip"))
          if (we) {
            const c = Le.existsSync("/usr/local/Cellar/pip") || Le.existsSync("/opt/homebrew/bin/pip");
            N.darwinXcodeExists() || c ? R("pip -V 2>&1", (u, f) => {
              if (!u) {
                const d = (f.toString().split(`
`)[0] || "").split(" ");
                i.versions.pip = d.length >= 2 ? d[1] : "";
              }
              a();
            }) : a();
          } else
            R("pip -V 2>&1", (c, u) => {
              if (!c) {
                const p = (u.toString().split(`
`)[0] || "").split(" ");
                i.versions.pip = p.length >= 2 ? p[1] : "";
              }
              a();
            });
        if ({}.hasOwnProperty.call(i.versions, "pip3"))
          if (we) {
            const c = Le.existsSync("/usr/local/Cellar/pip3") || Le.existsSync("/opt/homebrew/bin/pip3");
            N.darwinXcodeExists() || c ? R("pip3 -V 2>&1", (u, f) => {
              if (!u) {
                const d = (f.toString().split(`
`)[0] || "").split(" ");
                i.versions.pip3 = d.length >= 2 ? d[1] : "";
              }
              a();
            }) : a();
          } else
            R("pip3 -V 2>&1", (c, u) => {
              if (!c) {
                const p = (u.toString().split(`
`)[0] || "").split(" ");
                i.versions.pip3 = p.length >= 2 ? p[1] : "";
              }
              a();
            });
        ({}).hasOwnProperty.call(i.versions, "java") && (we ? R("/usr/libexec/java_home -V 2>&1", (c, u) => {
          !c && u.toString().toLowerCase().indexOf("no java runtime") === -1 ? R("java -version 2>&1", (f, p) => {
            if (!f) {
              const m = (p.toString().split(`
`)[0] || "").split('"');
              i.versions.java = m.length === 3 ? m[1].trim() : "";
            }
            a();
          }) : a();
        }) : R("java -version 2>&1", (c, u) => {
          if (!c) {
            const p = (u.toString().split(`
`)[0] || "").split('"');
            i.versions.java = p.length === 3 ? p[1].trim() : "";
          }
          a();
        })), {}.hasOwnProperty.call(i.versions, "gcc") && (we && N.darwinXcodeExists() || !we ? R("gcc -dumpversion", (c, u) => {
          c || (i.versions.gcc = u.toString().split(`
`)[0].trim() || ""), i.versions.gcc.indexOf(".") > -1 ? a() : R("gcc --version", (f, p) => {
            if (!f) {
              const d = p.toString().split(`
`)[0].trim();
              if (d.indexOf("gcc") > -1 && d.indexOf(")") > -1) {
                const m = d.split(")");
                i.versions.gcc = m[1].trim() || i.versions.gcc;
              }
            }
            a();
          });
        }) : a()), {}.hasOwnProperty.call(i.versions, "virtualbox") && R(N.getVboxmanage() + " -v 2>&1", (c, u) => {
          if (!c) {
            const p = (u.toString().split(`
`)[0] || "").split("r");
            i.versions.virtualbox = p[0];
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "bash") && R("bash --version", (c, u) => {
          if (!c) {
            const p = u.toString().split(`
`)[0].split(" version ");
            p.length > 1 && (i.versions.bash = p[1].split(" ")[0].split("(")[0]);
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "zsh") && R("zsh --version", (c, u) => {
          if (!c) {
            const p = u.toString().split(`
`)[0].split("zsh ");
            p.length > 1 && (i.versions.zsh = p[1].split(" ")[0]);
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "fish") && R("fish --version", (c, u) => {
          if (!c) {
            const p = u.toString().split(`
`)[0].split(" version ");
            p.length > 1 && (i.versions.fish = p[1].split(" ")[0]);
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "bun") && R("bun -v", (c, u) => {
          if (!c) {
            const f = u.toString().split(`
`)[0].trim();
            i.versions.bun = f;
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "deno") && R("deno -v", (c, u) => {
          if (!c) {
            const p = u.toString().split(`
`)[0].trim().split(" ");
            p.length > 1 && (i.versions.deno = p[1]);
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "node") && R("node -v", (c, u) => {
          if (!c) {
            let f = u.toString().split(`
`)[0].trim();
            f.startsWith("v") && (f = f.slice(1)), i.versions.node = f;
          }
          a();
        }), {}.hasOwnProperty.call(i.versions, "powershell") && (Ie ? N.powerShell("$PSVersionTable").then((c) => {
          const u = c.toString().toLowerCase().split(`
`).map((f) => f.replace(/ +/g, " ").replace(/ +/g, ":"));
          i.versions.powershell = N.getValue(u, "psversion"), a();
        }) : a()), {}.hasOwnProperty.call(i.versions, "dotnet") && (Ie ? N.powerShell(
          'gci "HKLM:\\SOFTWARE\\Microsoft\\NET Framework Setup\\NDP" -recurse | gp -name Version,Release -EA 0 | where { $_.PSChildName -match "^(?!S)\\p{L}"} | select PSChildName, Version, Release'
        ).then((c) => {
          const u = c.toString().split(`\r
`);
          let f = "";
          u.forEach((p) => {
            p = p.replace(/ +/g, " ");
            const d = p.split(" ");
            f = f || (d[0].toLowerCase().startsWith("client") && d.length > 2 || d[0].toLowerCase().startsWith("full") && d.length > 2 ? d[1].trim() : "");
          }), i.versions.dotnet = f.trim(), a();
        }) : a());
      } catch {
        n && n(i.versions), r(i.versions);
      }
    });
  });
}
Tt.versions = vo;
function Mo(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      if (Ie)
        try {
          const e = "CMD";
          N.powerShell(`Get-CimInstance -className win32_process | where-object {$_.ProcessId -eq ${process.ppid} } | select Name`).then((s) => {
            let r = "CMD";
            s && s.toString().toLowerCase().indexOf("powershell") >= 0 && (r = "PowerShell"), t && t(r), n(r);
          });
        } catch {
          t && t(result), n(result);
        }
      else {
        let e = "";
        R("echo $SHELL", (s, r) => {
          s || (e = r.toString().split(`
`)[0]), t && t(e), n(e);
        });
      }
    });
  });
}
Tt.shell = Mo;
function Eo() {
  let t = [];
  try {
    const n = Ee.networkInterfaces();
    for (let e in n)
      ({}).hasOwnProperty.call(n, e) && n[e].forEach((s) => {
        if (s && s.mac && s.mac !== "00:00:00:00:00:00") {
          const r = s.mac.toLowerCase();
          t.indexOf(r) === -1 && t.push(r);
        }
      });
    t = t.sort((e, s) => e < s ? -1 : e > s ? 1 : 0);
  } catch {
    t.push("00:00:00:00:00:00");
  }
  return t;
}
function Rs(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        os: "",
        hardware: "",
        macs: Eo()
      }, s;
      if (we && R("system_profiler SPHardwareDataType -json", (r, i) => {
        if (!r)
          try {
            const o = JSON.parse(i.toString());
            if (o.SPHardwareDataType && o.SPHardwareDataType.length > 0) {
              const a = o.SPHardwareDataType[0];
              e.os = a.platform_UUID.toLowerCase(), e.hardware = a.serial_number;
            }
          } catch {
            N.noop();
          }
        t && t(e), n(e);
      }), Yt && R(`echo -n "os: "; cat /var/lib/dbus/machine-id 2> /dev/null ||
cat /etc/machine-id 2> /dev/null; echo;
echo -n "hardware: "; cat /sys/class/dmi/id/product_uuid 2> /dev/null; echo;`, (i, o) => {
        const a = o.toString().split(`
`);
        if (e.os = N.getValue(a, "os").toLowerCase(), e.hardware = N.getValue(a, "hardware").toLowerCase(), !e.hardware) {
          const l = Le.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString().split(`
`), c = N.getValue(l, "serial");
          e.hardware = c || "";
        }
        t && t(e), n(e);
      }), (vi || Mi || Ei) && R("sysctl -i kern.hostid kern.hostuuid", (r, i) => {
        const o = i.toString().split(`
`);
        e.hardware = N.getValue(o, "kern.hostid", ":").toLowerCase(), e.os = N.getValue(o, "kern.hostuuid", ":").toLowerCase(), e.os.indexOf("unknown") >= 0 && (e.os = ""), e.hardware.indexOf("unknown") >= 0 && (e.hardware = ""), t && t(e), n(e);
      }), Ie) {
        let r = "%windir%\\System32";
        process.arch === "ia32" && Object.prototype.hasOwnProperty.call(process.env, "PROCESSOR_ARCHITEW6432") && (r = "%windir%\\sysnative\\cmd.exe /c %windir%\\System32"), N.powerShell("Get-CimInstance Win32_ComputerSystemProduct | select UUID | fl").then((i) => {
          let o = i.split(`\r
`);
          e.hardware = N.getValue(o, "uuid", ":").toLowerCase(), R(`${r}\\reg query "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography" /v MachineGuid`, N.execOptsWin, (a, l) => {
            s = l.toString().split(`
\r`)[0].split("REG_SZ"), e.os = s.length > 1 ? s[1].replace(/\r+|\n+|\s+/gi, "").toLowerCase() : "", t && t(e), n(e);
          });
        });
      }
    });
  });
}
Tt.uuid = Rs;
const ii = ke, Pt = Fe, w = T, { uuid: c0 } = Tt, qt = te.exec, Ot = te.execSync, Ln = w.promisify(te.exec), et = process.platform, Gn = et === "linux" || et === "android", zn = et === "darwin", Un = et === "win32", Xt = et === "freebsd", Kt = et === "openbsd", jt = et === "netbsd", Hn = et === "sunos";
function Ao(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        manufacturer: "",
        model: "Computer",
        version: "",
        serial: "-",
        uuid: "-",
        sku: "-",
        virtual: !1
      };
      if ((Gn || Xt || Kt || jt) && qt("export LC_ALL=C; dmidecode -t system 2>/dev/null; unset LC_ALL", (s, r) => {
        let i = r.toString().split(`
`);
        e.manufacturer = K(w.getValue(i, "manufacturer")), e.model = K(w.getValue(i, "product name")), e.version = K(w.getValue(i, "version")), e.serial = K(w.getValue(i, "serial number")), e.uuid = K(w.getValue(i, "uuid")).toLowerCase(), e.sku = K(w.getValue(i, "sku number"));
        const o = `echo -n "product_name: "; cat /sys/devices/virtual/dmi/id/product_name 2>/dev/null; echo;
            echo -n "product_serial: "; cat /sys/devices/virtual/dmi/id/product_serial 2>/dev/null; echo;
            echo -n "product_uuid: "; cat /sys/devices/virtual/dmi/id/product_uuid 2>/dev/null; echo;
            echo -n "product_version: "; cat /sys/devices/virtual/dmi/id/product_version 2>/dev/null; echo;
            echo -n "sys_vendor: "; cat /sys/devices/virtual/dmi/id/sys_vendor 2>/dev/null; echo;`;
        try {
          i = Ot(o, w.execOptsLinux).toString().split(`
`), e.manufacturer = K(e.manufacturer === "" ? w.getValue(i, "sys_vendor") : e.manufacturer), e.model = K(e.model === "" ? w.getValue(i, "product_name") : e.model), e.version = K(e.version === "" ? w.getValue(i, "product_version") : e.version), e.serial = K(e.serial === "" ? w.getValue(i, "product_serial") : e.serial), e.uuid = K(e.uuid === "" ? w.getValue(i, "product_uuid").toLowerCase() : e.uuid);
        } catch {
          w.noop();
        }
        if (e.serial || (e.serial = "-"), e.manufacturer || (e.manufacturer = ""), e.model || (e.model = "Computer"), e.version || (e.version = ""), e.sku || (e.sku = "-"), e.model.toLowerCase() === "virtualbox" || e.model.toLowerCase() === "kvm" || e.model.toLowerCase() === "virtual machine" || e.model.toLowerCase() === "bochs" || e.model.toLowerCase().startsWith("vmware") || e.model.toLowerCase().startsWith("droplet"))
          switch (e.virtual = !0, e.model.toLowerCase()) {
            case "virtualbox":
              e.virtualHost = "VirtualBox";
              break;
            case "vmware":
              e.virtualHost = "VMware";
              break;
            case "kvm":
              e.virtualHost = "KVM";
              break;
            case "bochs":
              e.virtualHost = "bochs";
              break;
          }
        if (e.manufacturer.toLowerCase().startsWith("vmware") || e.manufacturer.toLowerCase() === "xen")
          switch (e.virtual = !0, e.manufacturer.toLowerCase()) {
            case "vmware":
              e.virtualHost = "VMware";
              break;
            case "xen":
              e.virtualHost = "Xen";
              break;
          }
        if (!e.virtual)
          try {
            const a = Ot("ls -1 /dev/disk/by-id/ 2>/dev/null; pciconf -lv  2>/dev/null", w.execOptsLinux).toString();
            (a.indexOf("_QEMU_") >= 0 || a.indexOf("QEMU ") >= 0) && (e.virtual = !0, e.virtualHost = "QEMU"), a.indexOf("_VBOX_") >= 0 && (e.virtual = !0, e.virtualHost = "VirtualBox");
          } catch {
            w.noop();
          }
        if (Xt || Kt || jt)
          try {
            const a = Ot("sysctl -i kern.hostuuid kern.hostid hw.model", w.execOptsLinux).toString().split(`
`);
            e.uuid || (e.uuid = w.getValue(a, "kern.hostuuid", ":").toLowerCase()), (!e.serial || e.serial === "-") && (e.serial = w.getValue(a, "kern.hostid", ":").toLowerCase()), (!e.model || e.model === "Computer") && (e.model = w.getValue(a, "hw.model", ":").trim());
          } catch {
            w.noop();
          }
        if (!e.virtual && (Pt.release().toLowerCase().indexOf("microsoft") >= 0 || Pt.release().toLowerCase().endsWith("wsl2"))) {
          const a = parseFloat(Pt.release().toLowerCase());
          e.virtual = !0, e.manufacturer = "Microsoft", e.model = "WSL", e.version = a < 4.19 ? "1" : "2";
        }
        if ((Xt || Kt || jt) && !e.virtualHost)
          try {
            const l = Ot("dmidecode -t 4", w.execOptsLinux).toString().split(`
`);
            switch (w.getValue(l, "manufacturer", ":", !0).toLowerCase()) {
              case "virtualbox":
                e.virtualHost = "VirtualBox";
                break;
              case "vmware":
                e.virtualHost = "VMware";
                break;
              case "kvm":
                e.virtualHost = "KVM";
                break;
              case "bochs":
                e.virtualHost = "bochs";
                break;
            }
          } catch {
            w.noop();
          }
        (ii.existsSync("/.dockerenv") || ii.existsSync("/.dockerinit")) && (e.model = "Docker Container");
        try {
          const a = Ot('dmesg 2>/dev/null | grep -iE "virtual|hypervisor" | grep -iE "vmware|qemu|kvm|xen" | grep -viE "Nested Virtualization|/virtual/"');
          a.toString().split(`
`).length > 0 && (e.model === "Computer" && (e.model = "Virtual machine"), e.virtual = !0, a.toString().toLowerCase().indexOf("vmware") >= 0 && !e.virtualHost && (e.virtualHost = "VMware"), a.toString().toLowerCase().indexOf("qemu") >= 0 && !e.virtualHost && (e.virtualHost = "QEMU"), a.toString().toLowerCase().indexOf("xen") >= 0 && !e.virtualHost && (e.virtualHost = "Xen"), a.toString().toLowerCase().indexOf("kvm") >= 0 && !e.virtualHost && (e.virtualHost = "KVM"));
        } catch {
          w.noop();
        }
        e.manufacturer === "" && e.model === "Computer" && e.version === "" ? ii.readFile("/proc/cpuinfo", (a, l) => {
          if (!a) {
            let c = l.toString().split(`
`);
            if (e.model = w.getValue(c, "hardware", ":", !0).toUpperCase(), e.version = w.getValue(c, "revision", ":", !0).toLowerCase(), e.serial = w.getValue(c, "serial", ":", !0), w.getValue(c, "model:", ":", !0), w.isRaspberry(c)) {
              const u = w.decodePiCpuinfo(c);
              e.model = u.model, e.version = u.revisionCode, e.manufacturer = "Raspberry Pi Foundation", e.raspberry = {
                manufacturer: u.manufacturer,
                processor: u.processor,
                type: u.type,
                revision: u.revision
              };
            }
          }
          t && t(e), n(e);
        }) : (t && t(e), n(e));
      }), zn && qt("ioreg -c IOPlatformExpertDevice -d 2", (s, r) => {
        if (!s) {
          const i = r.toString().replace(/[<>"]/g, "").split(`
`), o = w.getAppleModel(w.getValue(i, "model", "=", !0));
          e.manufacturer = w.getValue(i, "manufacturer", "=", !0), e.model = o.key, e.type = Ws(o.version), e.version = o.version, e.serial = w.getValue(i, "ioplatformserialnumber", "=", !0), e.uuid = w.getValue(i, "ioplatformuuid", "=", !0).toLowerCase(), e.sku = w.getValue(i, "board-id", "=", !0) || w.getValue(i, "target-sub-type", "=", !0);
        }
        t && t(e), n(e);
      }), Hn && (t && t(e), n(e)), Un)
        try {
          w.powerShell("Get-CimInstance Win32_ComputerSystemProduct | select Name,Vendor,Version,IdentifyingNumber,UUID | fl").then((s, r) => {
            if (r)
              t && t(e), n(e);
            else {
              const i = s.split(`\r
`);
              e.manufacturer = w.getValue(i, "vendor", ":"), e.model = w.getValue(i, "name", ":"), e.version = w.getValue(i, "version", ":"), e.serial = w.getValue(i, "identifyingnumber", ":"), e.uuid = w.getValue(i, "uuid", ":").toLowerCase();
              const o = e.model.toLowerCase();
              (o === "virtualbox" || o === "kvm" || o === "virtual machine" || o === "bochs" || o.startsWith("vmware") || o.startsWith("qemu") || o.startsWith("parallels")) && (e.virtual = !0, o.startsWith("virtualbox") && (e.virtualHost = "VirtualBox"), o.startsWith("vmware") && (e.virtualHost = "VMware"), o.startsWith("kvm") && (e.virtualHost = "KVM"), o.startsWith("bochs") && (e.virtualHost = "bochs"), o.startsWith("qemu") && (e.virtualHost = "KVM"), o.startsWith("parallels") && (e.virtualHost = "Parallels"));
              const a = e.manufacturer.toLowerCase();
              (a.startsWith("vmware") || a.startsWith("qemu") || a === "xen" || a.startsWith("parallels")) && (e.virtual = !0, a.startsWith("vmware") && (e.virtualHost = "VMware"), a.startsWith("xen") && (e.virtualHost = "Xen"), a.startsWith("qemu") && (e.virtualHost = "KVM"), a.startsWith("parallels") && (e.virtualHost = "Parallels")), w.powerShell('Get-CimInstance MS_Systeminformation -Namespace "root/wmi" | select systemsku | fl ').then((l, c) => {
                if (!c) {
                  const u = l.split(`\r
`);
                  e.sku = w.getValue(u, "systemsku", ":");
                }
                e.virtual ? (t && t(e), n(e)) : w.powerShell("Get-CimInstance Win32_bios | select Version, SerialNumber, SMBIOSBIOSVersion").then((u, f) => {
                  if (f)
                    t && t(e), n(e);
                  else {
                    let p = u.toString();
                    (p.indexOf("VRTUAL") >= 0 || p.indexOf("A M I ") >= 0 || p.indexOf("VirtualBox") >= 0 || p.indexOf("VMWare") >= 0 || p.indexOf("Xen") >= 0 || p.indexOf("Parallels") >= 0) && (e.virtual = !0, p.indexOf("VirtualBox") >= 0 && !e.virtualHost && (e.virtualHost = "VirtualBox"), p.indexOf("VMware") >= 0 && !e.virtualHost && (e.virtualHost = "VMware"), p.indexOf("Xen") >= 0 && !e.virtualHost && (e.virtualHost = "Xen"), p.indexOf("VRTUAL") >= 0 && !e.virtualHost && (e.virtualHost = "Hyper-V"), p.indexOf("A M I") >= 0 && !e.virtualHost && (e.virtualHost = "Virtual PC"), p.indexOf("Parallels") >= 0 && !e.virtualHost && (e.virtualHost = "Parallels")), t && t(e), n(e);
                  }
                });
              });
            }
          });
        } catch {
          t && t(e), n(e);
        }
    });
  });
}
Sn.system = Ao;
function K(t) {
  const n = t.toLowerCase();
  return n.indexOf("o.e.m.") === -1 && n.indexOf("default string") === -1 && n !== "default" && t || "";
}
function To(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        vendor: "",
        version: "",
        releaseDate: "",
        revision: ""
      }, s = "";
      if ((Gn || Xt || Kt || jt) && (process.arch === "arm" ? s = "cat /proc/cpuinfo | grep Serial" : s = "export LC_ALL=C; dmidecode -t bios 2>/dev/null; unset LC_ALL", qt(s, (r, i) => {
        let o = i.toString().split(`
`);
        e.vendor = w.getValue(o, "Vendor"), e.version = w.getValue(o, "Version");
        let a = w.getValue(o, "Release Date");
        e.releaseDate = w.parseDateTime(a).date, e.revision = w.getValue(o, "BIOS Revision"), e.serial = w.getValue(o, "SerialNumber");
        let l = w.getValue(o, "Currently Installed Language").split("|")[0];
        if (l && (e.language = l), o.length && i.toString().indexOf("Characteristics:") >= 0) {
          const u = [];
          o.forEach((f) => {
            if (f.indexOf(" is supported") >= 0) {
              const p = f.split(" is supported")[0].trim();
              u.push(p);
            }
          }), e.features = u;
        }
        const c = `echo -n "bios_date: "; cat /sys/devices/virtual/dmi/id/bios_date 2>/dev/null; echo;
            echo -n "bios_vendor: "; cat /sys/devices/virtual/dmi/id/bios_vendor 2>/dev/null; echo;
            echo -n "bios_version: "; cat /sys/devices/virtual/dmi/id/bios_version 2>/dev/null; echo;`;
        try {
          o = Ot(c, w.execOptsLinux).toString().split(`
`), e.vendor = e.vendor ? e.vendor : w.getValue(o, "bios_vendor"), e.version = e.version ? e.version : w.getValue(o, "bios_version"), a = w.getValue(o, "bios_date"), e.releaseDate = e.releaseDate ? e.releaseDate : w.parseDateTime(a).date;
        } catch {
          w.noop();
        }
        t && t(e), n(e);
      })), zn && (e.vendor = "Apple Inc.", qt("system_profiler SPHardwareDataType -json", (r, i) => {
        try {
          const o = JSON.parse(i.toString());
          if (o && o.SPHardwareDataType && o.SPHardwareDataType.length) {
            let a = o.SPHardwareDataType[0].boot_rom_version;
            a = a ? a.split("(")[0].trim() : null, e.version = a;
          }
        } catch {
          w.noop();
        }
        t && t(e), n(e);
      })), Hn && (e.vendor = "Sun Microsystems", t && t(e), n(e)), Un)
        try {
          w.powerShell(
            'Get-CimInstance Win32_bios | select Description,Version,Manufacturer,@{n="ReleaseDate";e={$_.ReleaseDate.ToString("yyyy-MM-dd")}},BuildNumber,SerialNumber,SMBIOSBIOSVersion | fl'
          ).then((r, i) => {
            if (!i) {
              let o = r.toString().split(`\r
`);
              const a = w.getValue(o, "description", ":"), l = w.getValue(o, "SMBIOSBIOSVersion", ":");
              a.indexOf(" Version ") !== -1 ? (e.vendor = a.split(" Version ")[0].trim(), e.version = a.split(" Version ")[1].trim()) : a.indexOf(" Ver: ") !== -1 ? (e.vendor = w.getValue(o, "manufacturer", ":"), e.version = a.split(" Ver: ")[1].trim()) : (e.vendor = w.getValue(o, "manufacturer", ":"), e.version = l || w.getValue(o, "version", ":")), e.releaseDate = w.getValue(o, "releasedate", ":"), e.revision = w.getValue(o, "buildnumber", ":"), e.serial = K(w.getValue(o, "serialnumber", ":"));
            }
            t && t(e), n(e);
          });
        } catch {
          t && t(e), n(e);
        }
    });
  });
}
Sn.bios = To;
function Do(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = {
        manufacturer: "",
        model: "",
        version: "",
        serial: "-",
        assetTag: "-",
        memMax: null,
        memSlots: null
      };
      let s = "";
      if (Gn || Xt || Kt || jt) {
        process.arch === "arm" ? s = "cat /proc/cpuinfo | grep Serial" : s = "export LC_ALL=C; dmidecode -t 2 2>/dev/null; unset LC_ALL";
        const r = [];
        r.push(Ln(s)), r.push(Ln("export LC_ALL=C; dmidecode -t memory 2>/dev/null")), w.promiseAll(r).then((i) => {
          let o = i.results[0] ? i.results[0].toString().split(`
`) : [""];
          e.manufacturer = K(w.getValue(o, "Manufacturer")), e.model = K(w.getValue(o, "Product Name")), e.version = K(w.getValue(o, "Version")), e.serial = K(w.getValue(o, "Serial Number")), e.assetTag = K(w.getValue(o, "Asset Tag"));
          const a = `echo -n "board_asset_tag: "; cat /sys/devices/virtual/dmi/id/board_asset_tag 2>/dev/null; echo;
            echo -n "board_name: "; cat /sys/devices/virtual/dmi/id/board_name 2>/dev/null; echo;
            echo -n "board_serial: "; cat /sys/devices/virtual/dmi/id/board_serial 2>/dev/null; echo;
            echo -n "board_vendor: "; cat /sys/devices/virtual/dmi/id/board_vendor 2>/dev/null; echo;
            echo -n "board_version: "; cat /sys/devices/virtual/dmi/id/board_version 2>/dev/null; echo;`;
          try {
            o = Ot(a, w.execOptsLinux).toString().split(`
`), e.manufacturer = K(e.manufacturer ? e.manufacturer : w.getValue(o, "board_vendor")), e.model = K(e.model ? e.model : w.getValue(o, "board_name")), e.version = K(e.version ? e.version : w.getValue(o, "board_version")), e.serial = K(e.serial ? e.serial : w.getValue(o, "board_serial")), e.assetTag = K(e.assetTag ? e.assetTag : w.getValue(o, "board_asset_tag"));
          } catch {
            w.noop();
          }
          if (o = i.results[1] ? i.results[1].toString().split(`
`) : [""], e.memMax = w.toInt(w.getValue(o, "Maximum Capacity")) * 1024 * 1024 * 1024 || null, e.memSlots = w.toInt(w.getValue(o, "Number Of Devices")) || null, w.isRaspberry()) {
            const l = w.decodePiCpuinfo();
            e.manufacturer = l.manufacturer, e.model = "Raspberry Pi", e.serial = l.serial, e.version = l.type + " - " + l.revision, e.memMax = Pt.totalmem(), e.memSlots = 0;
          }
          t && t(e), n(e);
        });
      }
      if (zn) {
        const r = [];
        r.push(Ln("ioreg -c IOPlatformExpertDevice -d 2")), r.push(Ln("system_profiler SPMemoryDataType")), w.promiseAll(r).then((i) => {
          const o = i.results[0] ? i.results[0].toString().replace(/[<>"]/g, "").split(`
`) : [""];
          e.manufacturer = w.getValue(o, "manufacturer", "=", !0), e.model = w.getValue(o, "model", "=", !0), e.version = w.getValue(o, "version", "=", !0), e.serial = w.getValue(o, "ioplatformserialnumber", "=", !0), e.assetTag = w.getValue(o, "board-id", "=", !0);
          let a = i.results[1] ? i.results[1].toString().split("        BANK ") : [""];
          a.length === 1 && (a = i.results[1] ? i.results[1].toString().split("        DIMM") : [""]), a.shift(), e.memSlots = a.length, Pt.arch() === "arm64" && (e.memSlots = 0, e.memMax = Pt.totalmem()), t && t(e), n(e);
        });
      }
      if (Hn && (t && t(e), n(e)), Un)
        try {
          const r = [], i = parseInt(Pt.release()) >= 10, o = i ? "MaxCapacityEx" : "MaxCapacity";
          r.push(w.powerShell("Get-CimInstance Win32_baseboard | select Model,Manufacturer,Product,Version,SerialNumber,PartNumber,SKU | fl")), r.push(w.powerShell(`Get-CimInstance Win32_physicalmemoryarray | select ${o}, MemoryDevices | fl`)), w.promiseAll(r).then((a) => {
            let l = a.results[0] ? a.results[0].toString().split(`\r
`) : [""];
            e.manufacturer = K(w.getValue(l, "manufacturer", ":")), e.model = K(w.getValue(l, "model", ":")), e.model || (e.model = K(w.getValue(l, "product", ":"))), e.version = K(w.getValue(l, "version", ":")), e.serial = K(w.getValue(l, "serialnumber", ":")), e.assetTag = K(w.getValue(l, "partnumber", ":")), e.assetTag || (e.assetTag = K(w.getValue(l, "sku", ":"))), l = a.results[1] ? a.results[1].toString().split(`\r
`) : [""], e.memMax = w.toInt(w.getValue(l, o, ":")) * (i ? 1024 : 1) || null, e.memSlots = w.toInt(w.getValue(l, "MemoryDevices", ":")) || null, t && t(e), n(e);
          });
        } catch {
          t && t(e), n(e);
        }
    });
  });
}
Sn.baseboard = Do;
function Ws(t) {
  return t = t.toLowerCase(), t.indexOf("macbookair") >= 0 || t.indexOf("macbook air") >= 0 || t.indexOf("macbookpro") >= 0 || t.indexOf("macbook pro") >= 0 || t.indexOf("macbook") >= 0 ? "Notebook" : t.indexOf("macmini") >= 0 || t.indexOf("mac mini") >= 0 || t.indexOf("imac") >= 0 || t.indexOf("macstudio") >= 0 || t.indexOf("mac studio") >= 0 ? "Desktop" : t.indexOf("macpro") >= 0 || t.indexOf("mac pro") >= 0 ? "Tower" : "Other";
}
function Vo(t) {
  const n = [
    "Other",
    "Unknown",
    "Desktop",
    "Low Profile Desktop",
    "Pizza Box",
    "Mini Tower",
    "Tower",
    "Portable",
    "Laptop",
    "Notebook",
    "Hand Held",
    "Docking Station",
    "All in One",
    "Sub Notebook",
    "Space-Saving",
    "Lunch Box",
    "Main System Chassis",
    "Expansion Chassis",
    "SubChassis",
    "Bus Expansion Chassis",
    "Peripheral Chassis",
    "Storage Chassis",
    "Rack Mount Chassis",
    "Sealed-Case PC",
    "Multi-System Chassis",
    "Compact PCI",
    "Advanced TCA",
    "Blade",
    "Blade Enclosure",
    "Tablet",
    "Convertible",
    "Detachable",
    "IoT Gateway ",
    "Embedded PC",
    "Mini PC",
    "Stick PC"
  ];
  return new Promise((e) => {
    process.nextTick(() => {
      let s = {
        manufacturer: "",
        model: "",
        type: "",
        version: "",
        serial: "-",
        assetTag: "-",
        sku: ""
      };
      if ((Gn || Xt || Kt || jt) && qt(`echo -n "chassis_asset_tag: "; cat /sys/devices/virtual/dmi/id/chassis_asset_tag 2>/dev/null; echo;
            echo -n "chassis_serial: "; cat /sys/devices/virtual/dmi/id/chassis_serial 2>/dev/null; echo;
            echo -n "chassis_type: "; cat /sys/devices/virtual/dmi/id/chassis_type 2>/dev/null; echo;
            echo -n "chassis_vendor: "; cat /sys/devices/virtual/dmi/id/chassis_vendor 2>/dev/null; echo;
            echo -n "chassis_version: "; cat /sys/devices/virtual/dmi/id/chassis_version 2>/dev/null; echo;`, (i, o) => {
        let a = o.toString().split(`
`);
        s.manufacturer = K(w.getValue(a, "chassis_vendor"));
        const l = parseInt(w.getValue(a, "chassis_type").replace(/\D/g, ""));
        s.type = K(l && !isNaN(l) && l < n.length ? n[l - 1] : ""), s.version = K(w.getValue(a, "chassis_version")), s.serial = K(w.getValue(a, "chassis_serial")), s.assetTag = K(w.getValue(a, "chassis_asset_tag")), t && t(s), e(s);
      }), zn && qt("ioreg -c IOPlatformExpertDevice -d 2", (r, i) => {
        if (!r) {
          const o = i.toString().replace(/[<>"]/g, "").split(`
`), a = w.getAppleModel(w.getValue(o, "model", "=", !0));
          s.manufacturer = w.getValue(o, "manufacturer", "=", !0), s.model = a.key, s.type = Ws(a.model), s.version = a.version, s.serial = w.getValue(o, "ioplatformserialnumber", "=", !0), s.assetTag = w.getValue(o, "board-id", "=", !0) || w.getValue(o, "target-type", "=", !0), s.sku = w.getValue(o, "target-sub-type", "=", !0);
        }
        t && t(s), e(s);
      }), Hn && (t && t(s), e(s)), Un)
        try {
          w.powerShell("Get-CimInstance Win32_SystemEnclosure | select Model,Manufacturer,ChassisTypes,Version,SerialNumber,PartNumber,SKU,SMBIOSAssetTag | fl").then((r, i) => {
            if (!i) {
              let o = r.toString().split(`\r
`);
              s.manufacturer = K(w.getValue(o, "manufacturer", ":")), s.model = K(w.getValue(o, "model", ":"));
              const a = parseInt(w.getValue(o, "ChassisTypes", ":").replace(/\D/g, ""));
              s.type = a && !isNaN(a) && a < n.length ? n[a - 1] : "", s.version = K(w.getValue(o, "version", ":")), s.serial = K(w.getValue(o, "serialnumber", ":")), s.assetTag = K(w.getValue(o, "partnumber", ":")), s.assetTag || (s.assetTag = K(w.getValue(o, "SMBIOSAssetTag", ":"))), s.sku = K(w.getValue(o, "sku", ":"));
            }
            t && t(s), e(s);
          });
        } catch {
          t && t(s), e(s);
        }
    });
  });
}
Sn.chassis = Vo;
var yt = {};
const Ve = Fe, xe = te.exec, $n = te.execSync, Vn = ke, P = T, tt = process.platform, Jt = tt === "linux" || tt === "android", Xn = tt === "darwin", Kn = tt === "win32", jn = tt === "freebsd", qn = tt === "openbsd", Yn = tt === "netbsd", Jn = tt === "sunos";
let Ht = 0, Y = {
  user: 0,
  nice: 0,
  system: 0,
  idle: 0,
  irq: 0,
  steal: 0,
  guest: 0,
  load: 0,
  tick: 0,
  ms: 0,
  currentLoad: 0,
  currentLoadUser: 0,
  currentLoadSystem: 0,
  currentLoadNice: 0,
  currentLoadIdle: 0,
  currentLoadIrq: 0,
  currentLoadSteal: 0,
  currentLoadGuest: 0,
  rawCurrentLoad: 0,
  rawCurrentLoadUser: 0,
  rawCurrentLoadSystem: 0,
  rawCurrentLoadNice: 0,
  rawCurrentLoadIdle: 0,
  rawCurrentLoadIrq: 0,
  rawCurrentLoadSteal: 0,
  rawCurrentLoadGuest: 0
}, I = [], si = 0;
const ri = {
  8346: "1.8",
  8347: "1.9",
  8350: "2.0",
  8354: "2.2",
  "8356|SE": "2.4",
  8356: "2.3",
  8360: "2.5",
  2372: "2.1",
  2373: "2.1",
  2374: "2.2",
  2376: "2.3",
  2377: "2.3",
  2378: "2.4",
  2379: "2.4",
  2380: "2.5",
  2381: "2.5",
  2382: "2.6",
  2384: "2.7",
  2386: "2.8",
  2387: "2.8",
  2389: "2.9",
  2393: "3.1",
  8374: "2.2",
  8376: "2.3",
  8378: "2.4",
  8379: "2.4",
  8380: "2.5",
  8381: "2.5",
  8382: "2.6",
  8384: "2.7",
  8386: "2.8",
  8387: "2.8",
  8389: "2.9",
  8393: "3.1",
  "2419EE": "1.8",
  "2423HE": "2.0",
  "2425HE": "2.1",
  2427: "2.2",
  2431: "2.4",
  2435: "2.6",
  "2439SE": "2.8",
  "8425HE": "2.1",
  8431: "2.4",
  8435: "2.6",
  "8439SE": "2.8",
  4122: "2.2",
  4130: "2.6",
  "4162EE": "1.7",
  "4164EE": "1.8",
  "4170HE": "2.1",
  "4174HE": "2.3",
  "4176HE": "2.4",
  4180: "2.6",
  4184: "2.8",
  "6124HE": "1.8",
  "6128HE": "2.0",
  "6132HE": "2.2",
  6128: "2.0",
  6134: "2.3",
  6136: "2.4",
  6140: "2.6",
  "6164HE": "1.7",
  "6166HE": "1.8",
  6168: "1.9",
  6172: "2.1",
  6174: "2.2",
  6176: "2.3",
  "6176SE": "2.3",
  "6180SE": "2.5",
  3250: "2.5",
  3260: "2.7",
  3280: "2.4",
  4226: "2.7",
  4228: "2.8",
  4230: "2.9",
  4234: "3.1",
  4238: "3.3",
  4240: "3.4",
  4256: "1.6",
  4274: "2.5",
  4276: "2.6",
  4280: "2.8",
  4284: "3.0",
  6204: "3.3",
  6212: "2.6",
  6220: "3.0",
  6234: "2.4",
  6238: "2.6",
  "6262HE": "1.6",
  6272: "2.1",
  6274: "2.2",
  6276: "2.3",
  6278: "2.4",
  "6282SE": "2.6",
  "6284SE": "2.7",
  6308: "3.5",
  6320: "2.8",
  6328: "3.2",
  "6338P": "2.3",
  6344: "2.6",
  6348: "2.8",
  6366: "1.8",
  "6370P": "2.0",
  6376: "2.3",
  6378: "2.4",
  6380: "2.5",
  6386: "2.8",
  "FX|4100": "3.6",
  "FX|4120": "3.9",
  "FX|4130": "3.8",
  "FX|4150": "3.8",
  "FX|4170": "4.2",
  "FX|6100": "3.3",
  "FX|6120": "3.6",
  "FX|6130": "3.6",
  "FX|6200": "3.8",
  "FX|8100": "2.8",
  "FX|8120": "3.1",
  "FX|8140": "3.2",
  "FX|8150": "3.6",
  "FX|8170": "3.9",
  "FX|4300": "3.8",
  "FX|4320": "4.0",
  "FX|4350": "4.2",
  "FX|6300": "3.5",
  "FX|6350": "3.9",
  "FX|8300": "3.3",
  "FX|8310": "3.4",
  "FX|8320": "3.5",
  "FX|8350": "4.0",
  "FX|8370": "4.0",
  "FX|9370": "4.4",
  "FX|9590": "4.7",
  "FX|8320E": "3.2",
  "FX|8370E": "3.3",
  // ZEN Desktop CPUs
  1200: "3.1",
  "Pro 1200": "3.1",
  "1300X": "3.5",
  "Pro 1300": "3.5",
  1400: "3.2",
  "1500X": "3.5",
  "Pro 1500": "3.5",
  1600: "3.2",
  "1600X": "3.6",
  "Pro 1600": "3.2",
  1700: "3.0",
  "Pro 1700": "3.0",
  "1700X": "3.4",
  "Pro 1700X": "3.4",
  "1800X": "3.6",
  "1900X": "3.8",
  1920: "3.2",
  "1920X": "3.5",
  "1950X": "3.4",
  // ZEN Desktop APUs
  "200GE": "3.2",
  "Pro 200GE": "3.2",
  "220GE": "3.4",
  "240GE": "3.5",
  "3000G": "3.5",
  "300GE": "3.4",
  "3050GE": "3.4",
  "2200G": "3.5",
  "Pro 2200G": "3.5",
  "2200GE": "3.2",
  "Pro 2200GE": "3.2",
  "2400G": "3.6",
  "Pro 2400G": "3.6",
  "2400GE": "3.2",
  "Pro 2400GE": "3.2",
  // ZEN Mobile APUs
  "Pro 200U": "2.3",
  "300U": "2.4",
  "2200U": "2.5",
  "3200U": "2.6",
  "2300U": "2.0",
  "Pro 2300U": "2.0",
  "2500U": "2.0",
  "Pro 2500U": "2.2",
  "2600H": "3.2",
  "2700U": "2.0",
  "Pro 2700U": "2.2",
  "2800H": "3.3",
  // ZEN Server Processors
  7351: "2.4",
  "7351P": "2.4",
  7401: "2.0",
  "7401P": "2.0",
  "7551P": "2.0",
  7551: "2.0",
  7251: "2.1",
  7261: "2.5",
  7281: "2.1",
  7301: "2.2",
  7371: "3.1",
  7451: "2.3",
  7501: "2.0",
  7571: "2.2",
  7601: "2.2",
  // ZEN Embedded Processors
  V1500B: "2.2",
  V1780B: "3.35",
  V1202B: "2.3",
  V1404I: "2.0",
  V1605B: "2.0",
  V1756B: "3.25",
  V1807B: "3.35",
  3101: "2.1",
  3151: "2.7",
  3201: "1.5",
  3251: "2.5",
  3255: "2.5",
  3301: "2.0",
  3351: "1.9",
  3401: "1.85",
  3451: "2.15",
  // ZEN+ Desktop
  "1200|AF": "3.1",
  "2300X": "3.5",
  "2500X": "3.6",
  2600: "3.4",
  "2600E": "3.1",
  "1600|AF": "3.2",
  "2600X": "3.6",
  2700: "3.2",
  "2700E": "2.8",
  "Pro 2700": "3.2",
  "2700X": "3.7",
  "Pro 2700X": "3.6",
  "2920X": "3.5",
  "2950X": "3.5",
  "2970WX": "3.0",
  "2990WX": "3.0",
  // ZEN+ Desktop APU
  "Pro 300GE": "3.4",
  "Pro 3125GE": "3.4",
  "3150G": "3.5",
  "Pro 3150G": "3.5",
  "3150GE": "3.3",
  "Pro 3150GE": "3.3",
  "3200G": "3.6",
  "Pro 3200G": "3.6",
  "3200GE": "3.3",
  "Pro 3200GE": "3.3",
  "3350G": "3.6",
  "Pro 3350G": "3.6",
  "3350GE": "3.3",
  "Pro 3350GE": "3.3",
  "3400G": "3.7",
  "Pro 3400G": "3.7",
  "3400GE": "3.3",
  "Pro 3400GE": "3.3",
  // ZEN+ Mobile
  "3300U": "2.1",
  "PRO 3300U": "2.1",
  "3450U": "2.1",
  "3500U": "2.1",
  "PRO 3500U": "2.1",
  "3500C": "2.1",
  "3550H": "2.1",
  "3580U": "2.1",
  "3700U": "2.3",
  "PRO 3700U": "2.3",
  "3700C": "2.3",
  "3750H": "2.3",
  "3780U": "2.3",
  // ZEN2 Desktop CPUS
  3100: "3.6",
  "3300X": "3.8",
  3500: "3.6",
  "3500X": "3.6",
  3600: "3.6",
  "Pro 3600": "3.6",
  "3600X": "3.8",
  "3600XT": "3.8",
  "Pro 3700": "3.6",
  "3700X": "3.6",
  "3800X": "3.9",
  "3800XT": "3.9",
  3900: "3.1",
  "Pro 3900": "3.1",
  "3900X": "3.8",
  "3900XT": "3.8",
  "3950X": "3.5",
  "3960X": "3.8",
  "3970X": "3.7",
  "3990X": "2.9",
  "3945WX": "4.0",
  "3955WX": "3.9",
  "3975WX": "3.5",
  "3995WX": "2.7",
  // ZEN2 Desktop APUs
  "4300GE": "3.5",
  "Pro 4300GE": "3.5",
  "4300G": "3.8",
  "Pro 4300G": "3.8",
  "4600GE": "3.3",
  "Pro 4650GE": "3.3",
  "4600G": "3.7",
  "Pro 4650G": "3.7",
  "4700GE": "3.1",
  "Pro 4750GE": "3.1",
  "4700G": "3.6",
  "Pro 4750G": "3.6",
  "4300U": "2.7",
  "4450U": "2.5",
  "Pro 4450U": "2.5",
  "4500U": "2.3",
  "4600U": "2.1",
  "PRO 4650U": "2.1",
  "4680U": "2.1",
  "4600HS": "3.0",
  "4600H": "3.0",
  "4700U": "2.0",
  "PRO 4750U": "1.7",
  "4800U": "1.8",
  "4800HS": "2.9",
  "4800H": "2.9",
  "4900HS": "3.0",
  "4900H": "3.3",
  "5300U": "2.6",
  "5500U": "2.1",
  "5700U": "1.8",
  // ZEN2 - EPYC
  "7232P": "3.1",
  "7302P": "3.0",
  "7402P": "2.8",
  "7502P": "2.5",
  "7702P": "2.0",
  7252: "3.1",
  7262: "3.2",
  7272: "2.9",
  7282: "2.8",
  7302: "3.0",
  7352: "2.3",
  7402: "2.8",
  7452: "2.35",
  7502: "2.5",
  7532: "2.4",
  7542: "2.9",
  7552: "2.2",
  7642: "2.3",
  7662: "2.0",
  7702: "2.0",
  7742: "2.25",
  "7H12": "2.6",
  "7F32": "3.7",
  "7F52": "3.5",
  "7F72": "3.2",
  // Epyc (Milan)
  "7773X": "2.2",
  7763: "2.45",
  7713: "2.0",
  "7713P": "2.0",
  7663: "2.0",
  7643: "2.3",
  "7573X": "2.8",
  "75F3": "2.95",
  7543: "2.8",
  "7543P": "2.8",
  7513: "2.6",
  "7473X": "2.8",
  7453: "2.75",
  "74F3": "3.2",
  7443: "2.85",
  "7443P": "2.85",
  7413: "2.65",
  "7373X": "3.05",
  "73F3": "3.5",
  7343: "3.2",
  7313: "3.0",
  "7313P": "3.0",
  "72F3": "3.7",
  // ZEN3
  "5600X": "3.7",
  "5800X": "3.8",
  "5900X": "3.7",
  "5950X": "3.4",
  "5945WX": "4.1",
  "5955WX": "4.0",
  "5965WX": "3.8",
  "5975WX": "3.6",
  "5995WX": "2.7",
  "7960X": "4.2",
  "7970X": "4.0",
  "7980X": "3.2",
  "7965WX": "4.2",
  "7975WX": "4.0",
  "7985WX": "3.2",
  "7995WX": "2.5",
  // ZEN4
  9754: "2.25",
  "9754S": "2.25",
  9734: "2.2",
  "9684X": "2.55",
  "9384X": "3.1",
  "9184X": "3.55",
  "9654P": "2.4",
  9654: "2.4",
  9634: "2.25",
  "9554P": "3.1",
  9554: "3.1",
  9534: "2.45",
  "9474F": "3.6",
  "9454P": "2.75",
  9454: "2.75",
  "9374F": "3.85",
  "9354P": "3.25",
  9354: "3.25",
  9334: "2.7",
  "9274F": "4.05",
  9254: "2.9",
  9224: "2.5",
  "9174F": "4.1",
  9124: "3.0",
  // Epyc 4th gen
  "4124P": "3.8",
  "4244P": "3.8",
  "4344P": "3.8",
  "4364P": "4.5",
  "4464P": "3.7",
  "4484PX": "4.4",
  "4564P": "4.5",
  "4584PX": "4.2",
  "8024P": "2.4",
  "8024PN": "2.05",
  "8124P": "2.45",
  "8124PN": "2.0",
  "8224P": "2.55",
  "8224PN": "2.0",
  "8324P": "2.65",
  "8324PN": "2.05",
  "8434P": "2.5",
  "8434PN": "2.0",
  "8534P": "2.3",
  "8534PN": "2.0",
  // Epyc 5th gen
  9115: "2.6",
  9135: "3.65",
  "9175F": "4.2",
  9255: "3.25",
  "9275F": "4.1",
  9335: "3.0",
  "9355P": "3.55",
  9355: "3.55",
  "9375F": "3.8",
  9365: "3.4",
  "9455P": "3.15",
  9455: "3.15",
  "9475F": "3.65",
  9535: "2.4",
  "9555P": "3.2",
  9555: "3.2",
  "9575F": "3.3",
  9565: "3.15",
  "9655P": "2.5",
  9655: "2.5",
  9755: "2.7",
  "4245P": "3.9",
  "4345P": "3.8",
  "4465P": "3.4",
  "4545P": "3.0",
  "4565P": "4.3",
  "4585PX": "4.3",
  "5900XT": "3.3",
  5900: "3.0",
  5945: "3.0",
  "5800X3D": "3.4",
  "5800XT": "3.8",
  5800: "3.4",
  "5700X3D": "3.0",
  "5700X": "3.4",
  5845: "3.4",
  "5600X3D": "3.3",
  "5600XT": "3.7",
  "5600T": "3.5",
  5600: "3.5",
  "5600F": "3.0",
  5645: "3.7",
  "5500X3D": "3.0",
  "5980HX": "3.3",
  "5980HS": "3.0",
  "5900HX": "3.3",
  "5900HS": "3.0",
  "5800H": "3.2",
  "5800HS": "2.8",
  "5800U": "1.9",
  "5600H": "3.3",
  "5600HS": "3.0",
  "5600U": "2.3",
  "5560U": "2.3",
  "5400U": "2.7",
  "5825U": "2.0",
  "5625U": "2.3",
  "5425U": "2.7",
  "5125C": "3.0",
  "7730U": "2.0",
  "7530U": "2.0",
  "7430U": "2.3",
  "7330U": "2.3",
  7203: "2.8",
  7303: "2.4",
  "7663P": "2.0",
  "6980HX": "3.3",
  "6980HS": "3.3",
  "6900HX": "3.3",
  "6900HS": "3.3",
  "6800H": "3.2",
  "6800HS": "3.2",
  "6800U": "2.7",
  "6600H": "3.3",
  "6600HS": "3.3",
  "6600U": "2.9",
  "7735HS": "3.2",
  "7735H": "3.2",
  "7736U": "2.7",
  "7735U": "2.7",
  "7435HS": "3.1",
  "7435H": "3.1",
  "7535HS": "3.3",
  "7535H": "3.3",
  "7535U": "2.9",
  "7235HS": "3.2",
  "7235H": "3.2",
  "7335U": "3.0",
  270: "4.0",
  260: "3.8",
  250: "3.3",
  240: "4.3",
  230: "3.5",
  220: "3.0",
  210: "2.8",
  "8945HS": "4.0",
  "8845HS": "3.8",
  "8840HS": "3.3",
  "8840U": "3.3",
  "8645HS": "4.3",
  "8640HS": "3.5",
  "8640U": "3.5",
  "8540U": "3.0",
  "8440U": "2.8",
  "9950X3D": "4.3",
  "9950X": "4.3",
  "9900X3D": "4.4",
  "9900X": "4.4",
  "9800X3D": "4.7",
  "9700X": "3.8",
  "9700F": "3.8",
  "9600X": "3.9",
  9600: "3.8",
  "9500F": "3.8",
  "9995WX": "2.5",
  "9985WX": "3.2",
  "9975WX": "4.0",
  "9965WX": "4.2",
  "9955WX": "4.5",
  "9945WX": "4.7",
  "9980X": "3.2",
  "9970X": "4.0",
  "9960X": "4.2",
  "PRO HX375": "2.0",
  HX375: "2.0",
  "PRO HX370": "2.0",
  HX370: "2.0",
  365: "2.0",
  "PRO 360": "2.0",
  350: "2.0",
  "PRO 350": "2.0",
  340: "2.0",
  "PRO 340": "2.0",
  330: "2.0",
  395: "3.0",
  "PRO 395": "3.0",
  390: "3.2",
  "PRO 390": "3.2",
  385: "3.6",
  "PRO 385": "3.6",
  "PRO 380": "3.6",
  "9955HX3D": "2.3",
  "9955HX": "2.5",
  "9850HX": "3.0",
  9015: "3.6",
  9965: "2.25",
  9845: "2.1",
  9825: "2.2",
  9745: "2.4",
  9645: "2.3"
}, qi = {
  1: "Other",
  2: "Unknown",
  3: "Daughter Board",
  4: "ZIF Socket",
  5: "Replacement/Piggy Back",
  6: "None",
  7: "LIF Socket",
  8: "Slot 1",
  9: "Slot 2",
  10: "370 Pin Socket",
  11: "Slot A",
  12: "Slot M",
  13: "423",
  14: "A (Socket 462)",
  15: "478",
  16: "754",
  17: "940",
  18: "939",
  19: "mPGA604",
  20: "LGA771",
  21: "LGA775",
  22: "S1",
  23: "AM2",
  24: "F (1207)",
  25: "LGA1366",
  26: "G34",
  27: "AM3",
  28: "C32",
  29: "LGA1156",
  30: "LGA1567",
  31: "PGA988A",
  32: "BGA1288",
  33: "rPGA988B",
  34: "BGA1023",
  35: "BGA1224",
  36: "LGA1155",
  37: "LGA1356",
  38: "LGA2011",
  39: "FS1",
  40: "FS2",
  41: "FM1",
  42: "FM2",
  43: "LGA2011-3",
  44: "LGA1356-3",
  45: "LGA1150",
  46: "BGA1168",
  47: "BGA1234",
  48: "BGA1364",
  49: "AM4",
  50: "LGA1151",
  51: "BGA1356",
  52: "BGA1440",
  53: "BGA1515",
  54: "LGA3647-1",
  55: "SP3",
  56: "SP3r2",
  57: "LGA2066",
  58: "BGA1392",
  59: "BGA1510",
  60: "BGA1528",
  61: "LGA4189",
  62: "LGA1200",
  63: "LGA4677",
  64: "LGA1700",
  65: "BGA1744",
  66: "BGA1781",
  67: "BGA1211",
  68: "BGA2422",
  69: "LGA1211",
  70: "LGA2422",
  71: "LGA5773",
  72: "BGA5773",
  73: "AM5",
  74: "SP5",
  75: "SP6",
  76: "BGA883",
  77: "BGA1190",
  78: "BGA4129",
  79: "LGA4710",
  80: "LGA7529",
  81: "BGA1964",
  82: "BGA1792",
  83: "BGA2049",
  84: "BGA2551",
  85: "LGA1851",
  86: "BGA2114",
  87: "BGA2833"
}, Yi = {
  LGA1150: "i7-5775C i3-4340 i3-4170 G3250 i3-4160T i3-4160 E3-1231 G3258 G3240 i7-4790S i7-4790K i7-4790 i5-4690K i5-4690 i5-4590T i5-4590S i5-4590 i5-4460 i3-4360 i3-4150 G1820 G3420 G3220 i7-4771 i5-4440 i3-4330 i3-4130T i3-4130 E3-1230 i7-4770S i7-4770K i7-4770 i5-4670K i5-4670 i5-4570T i5-4570S i5-4570 i5-4430",
  LGA1151: "i9-9900KS E-2288G E-2224 G5420 i9-9900T i9-9900 i7-9700T i7-9700F i7-9700E i7-9700 i5-9600 i5-9500T i5-9500F i5-9500 i5-9400T i3-9350K i3-9300 i3-9100T i3-9100F i3-9100 G4930 i9-9900KF i7-9700KF i5-9600KF i5-9400F i5-9400 i3-9350KF i9-9900K i7-9700K i5-9600K G5500 G5400 i7-8700T i7-8086K i5-8600 i5-8500T i5-8500 i5-8400T i3-8300 i3-8100T G4900 i7-8700K i7-8700 i5-8600K i5-8400 i3-8350K i3-8100 E3-1270 G4600 G4560 i7-7700T i7-7700K i7-7700 i5-7600K i5-7600 i5-7500T i5-7500 i5-7400 i3-7350K i3-7300 i3-7100T i3-7100 G3930 G3900 G4400 i7-6700T i7-6700K i7-6700 i5-6600K i5-6600 i5-6500T i5-6500 i5-6400T i5-6400 i3-6300 i3-6100T i3-6100 E3-1270 E3-1270 T4500 T4400",
  1155: "G440 G460 G465 G470 G530T G540T G550T G1610T G1620T G530 G540 G1610 G550 G1620 G555 G1630 i3-2100T i3-2120T i3-3220T i3-3240T i3-3250T i3-2100 i3-2105 i3-2102 i3-3210 i3-3220 i3-2125 i3-2120 i3-3225 i3-2130 i3-3245 i3-3240 i3-3250 i5-3570T i5-2500T i5-2400S i5-2405S i5-2390T i5-3330S i5-2500S i5-3335S i5-2300 i5-3450S i5-3340S i5-3470S i5-3475S i5-3470T i5-2310 i5-3550S i5-2320 i5-3330 i5-3350P i5-3450 i5-2400 i5-3340 i5-3570S i5-2380P i5-2450P i5-3470 i5-2500K i5-3550 i5-2500 i5-3570 i5-3570K i5-2550K i7-3770T i7-2600S i7-3770S i7-2600K i7-2600 i7-3770 i7-3770K i7-2700K G620T G630T G640T G2020T G645T G2100T G2030T G622 G860T G620 G632 G2120T G630 G640 G2010 G840 G2020 G850 G645 G2030 G860 G2120 G870 G2130 G2140 E3-1220L E3-1220L E3-1260L E3-1265L E3-1220 E3-1225 E3-1220 E3-1235 E3-1225 E3-1230 E3-1230 E3-1240 E3-1245 E3-1270 E3-1275 E3-1240 E3-1245 E3-1270 E3-1280 E3-1275 E3-1290 E3-1280 E3-1290"
};
function bo(t) {
  let n = "";
  for (const e in Yi)
    Yi[e].split(" ").forEach((r) => {
      t.indexOf(r) >= 0 && (n = e);
    });
  return n;
}
function En(t) {
  let n = t;
  return t = t.toLowerCase(), t.indexOf("intel") >= 0 && (n = "Intel"), t.indexOf("amd") >= 0 && (n = "AMD"), t.indexOf("qemu") >= 0 && (n = "QEMU"), t.indexOf("hygon") >= 0 && (n = "Hygon"), t.indexOf("centaur") >= 0 && (n = "WinChip/Via"), t.indexOf("vmware") >= 0 && (n = "VMware"), t.indexOf("Xen") >= 0 && (n = "Xen Hypervisor"), t.indexOf("tcg") >= 0 && (n = "QEMU"), t.indexOf("apple") >= 0 && (n = "Apple"), t.indexOf("sifive") >= 0 && (n = "SiFive"), t.indexOf("thead") >= 0 && (n = "T-Head"), t.indexOf("andestech") >= 0 && (n = "Andes Technology"), n;
}
function wn(t) {
  t.brand = t.brand.replace(/\(R\)+/g, "®").replace(/\s+/g, " ").trim(), t.brand = t.brand.replace(/\(TM\)+/g, "™").replace(/\s+/g, " ").trim(), t.brand = t.brand.replace(/\(C\)+/g, "©").replace(/\s+/g, " ").trim(), t.brand = t.brand.replace(/CPU+/g, "").replace(/\s+/g, " ").trim(), t.manufacturer = En(t.brand);
  let n = t.brand.split(" ");
  return n.shift(), t.brand = n.join(" "), t;
}
function oi(t) {
  let n = "0";
  for (let e in ri)
    if ({}.hasOwnProperty.call(ri, e)) {
      let s = e.split("|"), r = 0;
      s.forEach((i) => {
        t.indexOf(i) > -1 && r++;
      }), r === s.length && (n = ri[e]);
    }
  return parseFloat(n);
}
function Bo() {
  return new Promise((t) => {
    process.nextTick(() => {
      const n = "unknown";
      let e = {
        manufacturer: n,
        brand: n,
        vendor: "",
        family: "",
        model: "",
        stepping: "",
        revision: "",
        voltage: "",
        speed: 0,
        speedMin: 0,
        speedMax: 0,
        governor: "",
        cores: P.cores(),
        physicalCores: P.cores(),
        performanceCores: P.cores(),
        efficiencyCores: 0,
        processors: 1,
        socket: "",
        flags: "",
        virtualization: !1,
        cache: {}
      };
      Gs().then((s) => {
        if (e.flags = s, e.virtualization = s.indexOf("vmx") > -1 || s.indexOf("svm") > -1, Xn && xe("sysctl machdep.cpu hw.cpufrequency_max hw.cpufrequency_min hw.packages hw.physicalcpu_max hw.ncpu hw.tbfrequency hw.cpufamily hw.cpusubfamily", (r, i) => {
          const o = i.toString().split(`
`), l = P.getValue(o, "machdep.cpu.brand_string").split("@");
          e.brand = l[0].trim();
          const c = l[1] ? l[1].trim() : "0";
          e.speed = parseFloat(c.replace(/GHz+/g, ""));
          let u = P.getValue(o, "hw.tbfrequency") / 1e9;
          u = u < 0.1 ? u * 100 : u, e.speed = e.speed === 0 ? u : e.speed, Ht = e.speed, e = wn(e), e.speedMin = P.getValue(o, "hw.cpufrequency_min") ? P.getValue(o, "hw.cpufrequency_min") / 1e9 : e.speed, e.speedMax = P.getValue(o, "hw.cpufrequency_max") ? P.getValue(o, "hw.cpufrequency_max") / 1e9 : e.speed, e.vendor = P.getValue(o, "machdep.cpu.vendor") || "Apple", e.family = P.getValue(o, "machdep.cpu.family") || P.getValue(o, "hw.cpufamily"), e.model = P.getValue(o, "machdep.cpu.model"), e.stepping = P.getValue(o, "machdep.cpu.stepping") || P.getValue(o, "hw.cpusubfamily"), e.virtualization = !0;
          const f = P.getValue(o, "hw.packages"), p = P.getValue(o, "hw.physicalcpu_max"), d = P.getValue(o, "hw.ncpu");
          if (Ve.arch() === "arm64") {
            e.socket = "SOC";
            try {
              const m = $n("ioreg -c IOPlatformDevice -d 3 -r | grep cluster-type").toString().split(`
`), h = m.filter((g) => g.indexOf('"E"') >= 0).length, y = m.filter((g) => g.indexOf('"P"') >= 0).length;
              e.efficiencyCores = h, e.performanceCores = y;
            } catch {
              P.noop();
            }
          }
          f && (e.processors = parseInt(f, 10) || 1), p && d && (e.cores = parseInt(d) || P.cores(), e.physicalCores = parseInt(p) || P.cores()), zs().then((m) => {
            e.cache = m, t(e);
          });
        }), Jt) {
          let r = "", i = [];
          Ve.cpus()[0] && Ve.cpus()[0].model && (r = Ve.cpus()[0].model), xe('export LC_ALL=C; lscpu; echo -n "Governor: "; cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor 2>/dev/null; echo; unset LC_ALL', (o, a) => {
            o || (i = a.toString().split(`
`)), r = P.getValue(i, "model name") || r, r = P.getValue(i, "bios model name") || r, r = P.cleanString(r);
            const l = r.split("@");
            if (e.brand = l[0].trim(), e.brand.indexOf("Unknown") >= 0 && (e.brand = e.brand.split("Unknown")[0].trim()), e.speed = l[1] ? parseFloat(l[1].trim()) : 0, e.speed === 0 && (e.brand.indexOf("AMD") > -1 || e.brand.toLowerCase().indexOf("ryzen") > -1) && (e.speed = oi(e.brand)), e.speed === 0) {
              const h = Ci();
              h.avg !== 0 && (e.speed = h.avg);
            }
            Ht = e.speed, e.speedMin = Math.round(parseFloat(P.getValue(i, "cpu min mhz").replace(/,/g, ".")) / 10) / 100, e.speedMax = Math.round(parseFloat(P.getValue(i, "cpu max mhz").replace(/,/g, ".")) / 10) / 100, e = wn(e), e.vendor = En(P.getValue(i, "vendor id")), e.family = P.getValue(i, "cpu family"), e.model = P.getValue(i, "model:"), e.stepping = P.getValue(i, "stepping"), e.revision = P.getValue(i, "cpu revision"), e.cache.l1d = P.getValue(i, "l1d cache"), e.cache.l1d && (e.cache.l1d = parseInt(e.cache.l1d) * (e.cache.l1d.indexOf("M") !== -1 ? 1024 * 1024 : e.cache.l1d.indexOf("K") !== -1 ? 1024 : 1)), e.cache.l1i = P.getValue(i, "l1i cache"), e.cache.l1i && (e.cache.l1i = parseInt(e.cache.l1i) * (e.cache.l1i.indexOf("M") !== -1 ? 1024 * 1024 : e.cache.l1i.indexOf("K") !== -1 ? 1024 : 1)), e.cache.l2 = P.getValue(i, "l2 cache"), e.cache.l2 && (e.cache.l2 = parseInt(e.cache.l2) * (e.cache.l2.indexOf("M") !== -1 ? 1024 * 1024 : e.cache.l2.indexOf("K") !== -1 ? 1024 : 1)), e.cache.l3 = P.getValue(i, "l3 cache"), e.cache.l3 && (e.cache.l3 = parseInt(e.cache.l3) * (e.cache.l3.indexOf("M") !== -1 ? 1024 * 1024 : e.cache.l3.indexOf("K") !== -1 ? 1024 : 1));
            const c = P.getValue(i, "thread(s) per core") || "1", u = P.getValue(i, "socket(s)") || "1", f = parseInt(c, 10), p = parseInt(u, 10) || 1, d = parseInt(P.getValue(i, "core(s) per socket"), 10);
            if (e.physicalCores = d ? d * p : e.cores / f, e.performanceCores = f > 1 ? e.cores - e.physicalCores : e.cores, e.efficiencyCores = f > 1 ? e.cores - f * e.performanceCores : 0, e.processors = p, e.governor = P.getValue(i, "governor") || "", e.vendor === "ARM" && P.isRaspberry()) {
              const h = P.decodePiCpuinfo();
              e.family = e.manufacturer, e.manufacturer = h.manufacturer, e.brand = h.processor, e.revision = h.revisionCode, e.socket = "SOC";
            }
            if (P.getValue(i, "architecture") === "riscv64") {
              const h = Vn.readFileSync("/proc/cpuinfo").toString().split(`
`), y = P.getValue(h, "uarch") || "";
              if (y.indexOf(",") > -1) {
                const g = y.split(",");
                e.manufacturer = En(g[0]), e.brand = g[1];
              }
            }
            let m = [];
            xe('export LC_ALL=C; dmidecode –t 4 2>/dev/null | grep "Upgrade: Socket"; unset LC_ALL', (h, y) => {
              m = y.toString().split(`
`), m && m.length && (e.socket = P.getValue(m, "Upgrade").replace("Socket", "").trim() || e.socket), t(e);
            });
          });
        }
        if (jn || qn || Yn) {
          let r = "", i = [];
          Ve.cpus()[0] && Ve.cpus()[0].model && (r = Ve.cpus()[0].model), xe("export LC_ALL=C; dmidecode -t 4; dmidecode -t 7 unset LC_ALL", (o, a) => {
            let l = [];
            if (!o) {
              const d = a.toString().split("# dmidecode"), m = d.length > 1 ? d[1] : "";
              l = d.length > 2 ? d[2].split("Cache Information") : [], i = m.split(`
`);
            }
            if (e.brand = r.split("@")[0].trim(), e.speed = r.split("@")[1] ? parseFloat(r.split("@")[1].trim()) : 0, e.speed === 0 && (e.brand.indexOf("AMD") > -1 || e.brand.toLowerCase().indexOf("ryzen") > -1) && (e.speed = oi(e.brand)), e.speed === 0) {
              const d = Ci();
              d.avg !== 0 && (e.speed = d.avg);
            }
            Ht = e.speed, e.speedMin = e.speed, e.speedMax = Math.round(parseFloat(P.getValue(i, "max speed").replace(/Mhz/g, "")) / 10) / 100, e = wn(e), e.vendor = En(P.getValue(i, "manufacturer"));
            let c = P.getValue(i, "signature");
            c = c.split(",");
            for (let d = 0; d < c.length; d++)
              c[d] = c[d].trim();
            e.family = P.getValue(c, "Family", " ", !0), e.model = P.getValue(c, "Model", " ", !0), e.stepping = P.getValue(c, "Stepping", " ", !0), e.revision = "";
            const u = parseFloat(P.getValue(i, "voltage"));
            e.voltage = isNaN(u) ? "" : u.toFixed(2);
            for (let d = 0; d < l.length; d++) {
              i = l[d].split(`
`);
              let m = P.getValue(i, "Socket Designation").toLowerCase().replace(" ", "-").split("-");
              m = m.length ? m[0] : "";
              const h = P.getValue(i, "Installed Size").split(" ");
              let y = parseInt(h[0], 10);
              const g = h.length > 1 ? h[1] : "kb";
              y = y * (g === "kb" ? 1024 : g === "mb" ? 1024 * 1024 : g === "gb" ? 1024 * 1024 * 1024 : 1), m && (m === "l1" ? (e.cache[m + "d"] = y / 2, e.cache[m + "i"] = y / 2) : e.cache[m] = y);
            }
            e.socket = P.getValue(i, "Upgrade").replace("Socket", "").trim();
            const f = P.getValue(i, "thread count").trim(), p = P.getValue(i, "core count").trim();
            p && f && (e.cores = parseInt(f, 10), e.physicalCores = parseInt(p, 10)), t(e);
          });
        }
        if (Jn && t(e), Kn)
          try {
            const r = [];
            r.push(
              P.powerShell(
                "Get-CimInstance Win32_processor | select Name, Revision, L2CacheSize, L3CacheSize, Manufacturer, MaxClockSpeed, Description, UpgradeMethod, Caption, NumberOfLogicalProcessors, NumberOfCores | fl"
              )
            ), r.push(P.powerShell("Get-CimInstance Win32_CacheMemory | select CacheType,InstalledSize,Level | fl")), r.push(P.powerShell("(Get-CimInstance Win32_ComputerSystem).HypervisorPresent")), Promise.all(r).then((i) => {
              let o = i[0].split(`\r
`), a = P.getValue(o, "name", ":") || "";
              a.indexOf("@") >= 0 ? (e.brand = a.split("@")[0].trim(), e.speed = a.split("@")[1] ? parseFloat(a.split("@")[1].trim()) : 0, Ht = e.speed) : (e.brand = a.trim(), e.speed = 0), e = wn(e), e.revision = P.getValue(o, "revision", ":"), e.vendor = P.getValue(o, "manufacturer", ":"), e.speedMax = Math.round(parseFloat(P.getValue(o, "maxclockspeed", ":").replace(/,/g, ".")) / 10) / 100, e.speed === 0 && (e.brand.indexOf("AMD") > -1 || e.brand.toLowerCase().indexOf("ryzen") > -1) && (e.speed = oi(e.brand)), e.speed === 0 && (e.speed = e.speedMax), e.speedMin = e.speed;
              let l = P.getValue(o, "description", ":").split(" ");
              for (let h = 0; h < l.length; h++)
                l[h].toLowerCase().startsWith("family") && h + 1 < l.length && l[h + 1] && (e.family = l[h + 1]), l[h].toLowerCase().startsWith("model") && h + 1 < l.length && l[h + 1] && (e.model = l[h + 1]), l[h].toLowerCase().startsWith("stepping") && h + 1 < l.length && l[h + 1] && (e.stepping = l[h + 1]);
              const c = P.getValue(o, "UpgradeMethod", ":");
              qi[c] && (e.socket = qi[c]);
              const u = bo(a);
              u && (e.socket = u);
              const f = P.countLines(o, "Caption"), p = P.getValue(o, "NumberOfLogicalProcessors", ":"), d = P.getValue(o, "NumberOfCores", ":");
              f && (e.processors = parseInt(f) || 1), d && p && (e.cores = parseInt(p) || P.cores(), e.physicalCores = parseInt(d) || P.cores()), f > 1 && (e.cores = e.cores * f, e.physicalCores = e.physicalCores * f), e.cache = Us(i[0], i[1]);
              const m = i[2] ? i[2].toString().toLowerCase() : "";
              e.virtualization = m.indexOf("true") !== -1, t(e);
            });
          } catch {
            t(e);
          }
      });
    });
  });
}
function No(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      Bo().then((e) => {
        t && t(e), n(e);
      });
    });
  });
}
yt.cpu = No;
function Ci() {
  const t = Ve.cpus();
  let n = 999999999, e = 0, s = 0;
  const r = [], i = [];
  if (t && t.length && Object.prototype.hasOwnProperty.call(t[0], "speed"))
    for (let o in t)
      i.push(t[o].speed > 100 ? (t[o].speed + 1) / 1e3 : t[o].speed / 10);
  else if (Jt)
    try {
      const o = $n('cat /proc/cpuinfo | grep "cpu MHz" | cut -d " " -f 3', P.execOptsLinux).toString().split(`
`).filter((a) => a.length > 0);
      for (let a in o)
        i.push(Math.floor(parseInt(o[a], 10) / 10) / 100);
    } catch {
      P.noop();
    }
  if (i && i.length)
    try {
      for (const o in i)
        s = s + i[o], i[o] > e && (e = i[o]), i[o] < n && (n = i[o]), r.push(parseFloat(i[o].toFixed(2)));
      return s = s / i.length, {
        min: parseFloat(n.toFixed(2)),
        max: parseFloat(e.toFixed(2)),
        avg: parseFloat(s.toFixed(2)),
        cores: r
      };
    } catch {
      return {
        min: 0,
        max: 0,
        avg: 0,
        cores: r
      };
    }
  else
    return {
      min: 0,
      max: 0,
      avg: 0,
      cores: r
    };
}
function ko(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = Ci();
      if (e.avg === 0 && Ht !== 0) {
        const s = parseFloat(Ht);
        e = {
          min: s,
          max: s,
          avg: s,
          cores: []
        };
      }
      t && t(e), n(e);
    });
  });
}
yt.cpuCurrentSpeed = ko;
function Fo(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        main: null,
        cores: [],
        max: null,
        socket: [],
        chipset: null
      };
      if (Jt) {
        try {
          const i = $n('cat /sys/class/thermal/thermal_zone*/type  2>/dev/null; echo "-----"; cat /sys/class/thermal/thermal_zone*/temp 2>/dev/null;', P.execOptsLinux).toString().split(`-----
`);
          if (i.length === 2) {
            const o = i[0].split(`
`), a = i[1].split(`
`);
            for (let l = 0; l < o.length; l++) {
              const c = o[l].trim();
              c.startsWith("acpi") && a[l] && e.socket.push(Math.round(parseInt(a[l], 10) / 100) / 10), c.startsWith("pch") && a[l] && (e.chipset = Math.round(parseInt(a[l], 10) / 100) / 10);
            }
          }
        } catch {
          P.noop();
        }
        const s = 'for mon in /sys/class/hwmon/hwmon*; do for label in "$mon"/temp*_label; do if [ -f $label ]; then value=${label%_*}_input; echo $(cat "$label")___$(cat "$value"); fi; done; done;';
        try {
          xe(s, (r, i) => {
            i = i.toString();
            const o = i.toLowerCase().indexOf("tdie");
            o !== -1 && (i = i.substring(o));
            const a = i.split(`
`);
            let l = 0;
            if (a.forEach((c) => {
              const u = c.split("___"), f = u[0], p = u.length > 1 && u[1] ? u[1] : "0";
              p && f && f.toLowerCase() === "tctl" && (l = e.main = Math.round(parseInt(p, 10) / 100) / 10), p && (f === void 0 || f && f.toLowerCase().startsWith("core")) ? e.cores.push(Math.round(parseInt(p, 10) / 100) / 10) : p && f && e.main === null && (f.toLowerCase().indexOf("package") >= 0 || f.toLowerCase().indexOf("physical") >= 0 || f.toLowerCase() === "tccd1") && (e.main = Math.round(parseInt(p, 10) / 100) / 10);
            }), l && e.main === null && (e.main = l), e.cores.length > 0) {
              e.main === null && (e.main = Math.round(e.cores.reduce((u, f) => u + f, 0) / e.cores.length));
              let c = Math.max.apply(Math, e.cores);
              e.max = c > e.main ? c : e.main;
            }
            if (e.main !== null) {
              e.max === null && (e.max = e.main), t && t(e), n(e);
              return;
            }
            xe("sensors", (c, u) => {
              if (!c) {
                const f = u.toString().split(`
`);
                let p = null, d = !0, m = "";
                if (f.forEach((h) => {
                  h.trim() === "" ? d = !0 : d && (h.trim().toLowerCase().startsWith("acpi") && (m = "acpi"), h.trim().toLowerCase().startsWith("pch") && (m = "pch"), h.trim().toLowerCase().startsWith("core") && (m = "core"), h.trim().toLowerCase().startsWith("k10temp") && (m = "coreAMD"), d = !1);
                  const y = /[+-]([^°]*)/g, g = h.match(y), x = h.split(":")[0].toUpperCase();
                  m === "acpi" ? x.indexOf("TEMP") !== -1 && e.socket.push(parseFloat(g)) : m === "pch" && x.indexOf("TEMP") !== -1 && !e.chipset && (e.chipset = parseFloat(g)), (x.indexOf("PHYSICAL") !== -1 || x.indexOf("PACKAGE") !== -1 || m === "coreAMD" && x.indexOf("TDIE") !== -1 || x.indexOf("TEMP") !== -1) && (e.main = parseFloat(g)), x.indexOf("CORE ") !== -1 && e.cores.push(parseFloat(g)), x.indexOf("TDIE") !== -1 && p === null && (p = parseFloat(g));
                }), e.cores.length > 0) {
                  e.main = Math.round(e.cores.reduce((y, g) => y + g, 0) / e.cores.length);
                  const h = Math.max.apply(Math, e.cores);
                  e.max = h > e.main ? h : e.main;
                } else
                  e.main === null && p !== null && (e.main = p, e.max = p);
                if (e.main !== null && e.max === null && (e.max = e.main), e.main !== null || e.max !== null) {
                  t && t(e), n(e);
                  return;
                }
              }
              Vn.stat("/sys/class/thermal/thermal_zone0/temp", (f) => {
                f === null ? Vn.readFile("/sys/class/thermal/thermal_zone0/temp", (p, d) => {
                  if (!p) {
                    const m = d.toString().split(`
`);
                    m.length > 0 && (e.main = parseFloat(m[0]) / 1e3, e.max = e.main);
                  }
                  t && t(e), n(e);
                }) : xe("/opt/vc/bin/vcgencmd measure_temp", (p, d) => {
                  if (!p) {
                    const m = d.toString().split(`
`);
                    m.length > 0 && m[0].indexOf("=") && (e.main = parseFloat(m[0].split("=")[1]), e.max = e.main);
                  }
                  t && t(e), n(e);
                });
              });
            });
          });
        } catch {
          t && t(e), n(e);
        }
      }
      if ((jn || qn || Yn) && xe("sysctl dev.cpu | grep temp", (s, r) => {
        if (!s) {
          const i = r.toString().split(`
`);
          let o = 0;
          i.forEach((a) => {
            const l = a.split(":");
            if (l.length > 1) {
              const c = parseFloat(l[1].replace(",", "."));
              c > e.max && (e.max = c), o = o + c, e.cores.push(c);
            }
          }), e.cores.length && (e.main = Math.round(o / e.cores.length * 100) / 100);
        }
        t && t(e), n(e);
      }), Xn) {
        try {
          if (e = require("osx-temperature-sensor").cpuTemperature(), e.main && (e.main = Math.round(e.main * 100) / 100), e.max && (e.max = Math.round(e.max * 100) / 100), e && e.cores && e.cores.length)
            for (let r = 0; r < e.cores.length; r++)
              e.cores[r] = Math.round(e.cores[r] * 100) / 100;
        } catch {
          P.noop();
        }
        try {
          const r = require("macos-temperature-sensor").temperature();
          if (r.cpu && (e.main = Math.round(r.cpu * 100) / 100, e.max = e.main), r.soc && (e.chipset = Math.round(r.soc * 100) / 100), r && r.cpuDieTemps.length)
            for (const i of r.cpuDieTemps)
              e.cores.push(Math.round(i * 100) / 100);
        } catch {
          P.noop();
        }
        t && t(e), n(e);
      }
      if (Jn && (t && t(e), n(e)), Kn)
        try {
          P.powerShell('Get-CimInstance MSAcpi_ThermalZoneTemperature -Namespace "root/wmi" | Select CurrentTemperature').then((s, r) => {
            if (!r) {
              let i = 0;
              s.split(`\r
`).filter((a) => a.trim() !== "").filter((a, l) => l > 0).forEach((a) => {
                const l = (parseInt(a, 10) - 2732) / 10;
                isNaN(l) || (i = i + l, l > e.max && (e.max = l), e.cores.push(l));
              }), e.cores.length && (e.main = i / e.cores.length);
            }
            t && t(e), n(e);
          });
        } catch {
          t && t(e), n(e);
        }
    });
  });
}
yt.cpuTemperature = Fo;
function Gs(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = "";
      if (Kn)
        try {
          xe('reg query "HKEY_LOCAL_MACHINE\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0" /v FeatureSet', P.execOptsWin, (s, r) => {
            if (!s) {
              let i = r.split("0x").pop().trim(), o = parseInt(i, 16).toString(2), a = "0".repeat(32 - o.length) + o, l = [
                "fpu",
                "vme",
                "de",
                "pse",
                "tsc",
                "msr",
                "pae",
                "mce",
                "cx8",
                "apic",
                "",
                "sep",
                "mtrr",
                "pge",
                "mca",
                "cmov",
                "pat",
                "pse-36",
                "psn",
                "clfsh",
                "",
                "ds",
                "acpi",
                "mmx",
                "fxsr",
                "sse",
                "sse2",
                "ss",
                "htt",
                "tm",
                "ia64",
                "pbe"
              ];
              for (let c = 0; c < l.length; c++)
                a[c] === "1" && l[c] !== "" && (e += " " + l[c]);
              e = e.trim().toLowerCase();
            }
            t && t(e), n(e);
          });
        } catch {
          t && t(e), n(e);
        }
      if (Jt)
        try {
          xe("export LC_ALL=C; lscpu; unset LC_ALL", (s, r) => {
            s || r.toString().split(`
`).forEach((o) => {
              o.split(":")[0].toUpperCase().indexOf("FLAGS") !== -1 && (e = o.split(":")[1].trim().toLowerCase());
            }), e ? (t && t(e), n(e)) : Vn.readFile("/proc/cpuinfo", (i, o) => {
              if (!i) {
                let a = o.toString().split(`
`);
                e = P.getValue(a, "features", ":", !0).toLowerCase();
              }
              t && t(e), n(e);
            });
          });
        } catch {
          t && t(e), n(e);
        }
      (jn || qn || Yn) && xe("export LC_ALL=C; dmidecode -t 4 2>/dev/null; unset LC_ALL", (s, r) => {
        const i = [];
        if (!s) {
          const o = r.toString().split("	Flags:");
          (o.length > 1 ? o[1].split("	Version:")[0].split(`
`) : []).forEach((l) => {
            const c = (l.indexOf("(") ? l.split("(")[0].toLowerCase() : "").trim().replace(/\t/g, "");
            c && i.push(c);
          });
        }
        e = i.join(" ").trim().toLowerCase(), t && t(e), n(e);
      }), Xn && xe("sysctl machdep.cpu.features", (s, r) => {
        if (!s) {
          let i = r.toString().split(`
`);
          i.length > 0 && i[0].indexOf("machdep.cpu.features:") !== -1 && (e = i[0].split(":")[1].trim().toLowerCase());
        }
        t && t(e), n(e);
      }), Jn && (t && t(e), n(e));
    });
  });
}
yt.cpuFlags = Gs;
function zs(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        l1d: null,
        l1i: null,
        l2: null,
        l3: null
      };
      if (Jt)
        try {
          xe("export LC_ALL=C; lscpu; unset LC_ALL", (s, r) => {
            s || r.toString().split(`
`).forEach((o) => {
              const a = o.split(":");
              a[0].toUpperCase().indexOf("L1D CACHE") !== -1 && (e.l1d = parseInt(a[1].trim()) * (a[1].indexOf("M") !== -1 ? 1024 * 1024 : a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toUpperCase().indexOf("L1I CACHE") !== -1 && (e.l1i = parseInt(a[1].trim()) * (a[1].indexOf("M") !== -1 ? 1024 * 1024 : a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toUpperCase().indexOf("L2 CACHE") !== -1 && (e.l2 = parseInt(a[1].trim()) * (a[1].indexOf("M") !== -1 ? 1024 * 1024 : a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toUpperCase().indexOf("L3 CACHE") !== -1 && (e.l3 = parseInt(a[1].trim()) * (a[1].indexOf("M") !== -1 ? 1024 * 1024 : a[1].indexOf("K") !== -1 ? 1024 : 1));
            }), t && t(e), n(e);
          });
        } catch {
          t && t(e), n(e);
        }
      if ((jn || qn || Yn) && xe("export LC_ALL=C; dmidecode -t 7 2>/dev/null; unset LC_ALL", (s, r) => {
        let i = [];
        s || (i = r.toString().split("Cache Information"), i.shift());
        for (let o = 0; o < i.length; o++) {
          const a = i[o].split(`
`);
          let l = P.getValue(a, "Socket Designation").toLowerCase().replace(" ", "-").split("-");
          l = l.length ? l[0] : "";
          const c = P.getValue(a, "Installed Size").split(" ");
          let u = parseInt(c[0], 10);
          const f = c.length > 1 ? c[1] : "kb";
          u = u * (f === "kb" ? 1024 : f === "mb" ? 1024 * 1024 : f === "gb" ? 1024 * 1024 * 1024 : 1), l && (l === "l1" ? (e.cache[l + "d"] = u / 2, e.cache[l + "i"] = u / 2) : e.cache[l] = u);
        }
        t && t(e), n(e);
      }), Xn && xe("sysctl hw.l1icachesize hw.l1dcachesize hw.l2cachesize hw.l3cachesize", (s, r) => {
        s || r.toString().split(`
`).forEach((o) => {
          let a = o.split(":");
          a[0].toLowerCase().indexOf("hw.l1icachesize") !== -1 && (e.l1d = parseInt(a[1].trim()) * (a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toLowerCase().indexOf("hw.l1dcachesize") !== -1 && (e.l1i = parseInt(a[1].trim()) * (a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toLowerCase().indexOf("hw.l2cachesize") !== -1 && (e.l2 = parseInt(a[1].trim()) * (a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toLowerCase().indexOf("hw.l3cachesize") !== -1 && (e.l3 = parseInt(a[1].trim()) * (a[1].indexOf("K") !== -1 ? 1024 : 1));
        }), t && t(e), n(e);
      }), Jn && (t && t(e), n(e)), Kn)
        try {
          const s = [];
          s.push(P.powerShell("Get-CimInstance Win32_processor | select L2CacheSize, L3CacheSize | fl")), s.push(P.powerShell("Get-CimInstance Win32_CacheMemory | select CacheType,InstalledSize,Level | fl")), Promise.all(s).then((r) => {
            e = Us(r[0], r[1]), t && t(e), n(e);
          });
        } catch {
          t && t(e), n(e);
        }
    });
  });
}
function Us(t, n) {
  const e = {
    l1d: null,
    l1i: null,
    l2: null,
    l3: null
  };
  let s = t.split(`\r
`);
  e.l1d = 0, e.l1i = 0, e.l2 = P.getValue(s, "l2cachesize", ":"), e.l3 = P.getValue(s, "l3cachesize", ":"), e.l2 ? e.l2 = parseInt(e.l2, 10) * 1024 : e.l2 = 0, e.l3 ? e.l3 = parseInt(e.l3, 10) * 1024 : e.l3 = 0;
  const r = n.split(/\n\s*\n/);
  let i = 0, o = 0, a = 0;
  return r.forEach((l) => {
    const c = l.split(`\r
`), u = P.getValue(c, "CacheType"), f = P.getValue(c, "Level"), p = P.getValue(c, "InstalledSize");
    f === "3" && u === "3" && (e.l1i = e.l1i + parseInt(p, 10) * 1024), f === "3" && u === "4" && (e.l1d = e.l1d + parseInt(p, 10) * 1024), f === "3" && u === "5" && (i = parseInt(p, 10) / 2, o = parseInt(p, 10) / 2), f === "4" && u === "5" && (a = a + parseInt(p, 10) * 1024);
  }), !e.l1i && !e.l1d && (e.l1i = i, e.l1d = o), a && (e.l2 = a), e;
}
yt.cpuCache = zs;
function Ro() {
  return new Promise((t) => {
    process.nextTick(() => {
      const n = Ve.loadavg().map((i) => i / P.cores()), e = parseFloat(Math.max.apply(Math, n).toFixed(2));
      let s = {};
      if (Date.now() - Y.ms >= 200) {
        Y.ms = Date.now();
        const i = Ve.cpus().map((g) => (g.times.steal = 0, g.times.guest = 0, g));
        let o = 0, a = 0, l = 0, c = 0, u = 0, f = 0, p = 0;
        const d = [];
        if (si = i && i.length ? i.length : 0, Jt)
          try {
            const g = $n("cat /proc/stat 2>/dev/null | grep cpu", P.execOptsLinux).toString().split(`
`);
            if (g.length > 1 && (g.shift(), g.length === i.length))
              for (let x = 0; x < g.length; x++) {
                let S = g[x].split(" ");
                if (S.length >= 10) {
                  const C = parseFloat(S[8]) || 0, L = parseFloat(S[9]) || 0;
                  i[x].times.steal = C, i[x].times.guest = L;
                }
              }
          } catch {
            P.noop();
          }
        for (let g = 0; g < si; g++) {
          const x = i[g].times;
          o += x.user, a += x.sys, l += x.nice, u += x.idle, c += x.irq, f += x.steal || 0, p += x.guest || 0;
          const S = I && I[g] && I[g].totalTick ? I[g].totalTick : 0, C = I && I[g] && I[g].totalLoad ? I[g].totalLoad : 0, L = I && I[g] && I[g].user ? I[g].user : 0, V = I && I[g] && I[g].sys ? I[g].sys : 0, E = I && I[g] && I[g].nice ? I[g].nice : 0, U = I && I[g] && I[g].idle ? I[g].idle : 0, O = I && I[g] && I[g].irq ? I[g].irq : 0, $ = I && I[g] && I[g].steal ? I[g].steal : 0, ne = I && I[g] && I[g].guest ? I[g].guest : 0;
          I[g] = x, I[g].totalTick = I[g].user + I[g].sys + I[g].nice + I[g].irq + I[g].steal + I[g].guest + I[g].idle, I[g].totalLoad = I[g].user + I[g].sys + I[g].nice + I[g].irq + I[g].steal + I[g].guest, I[g].currentTick = I[g].totalTick - S, I[g].load = I[g].totalLoad - C, I[g].loadUser = I[g].user - L, I[g].loadSystem = I[g].sys - V, I[g].loadNice = I[g].nice - E, I[g].loadIdle = I[g].idle - U, I[g].loadIrq = I[g].irq - O, I[g].loadSteal = I[g].steal - $, I[g].loadGuest = I[g].guest - ne, d[g] = {}, d[g].load = I[g].load / I[g].currentTick * 100, d[g].loadUser = I[g].loadUser / I[g].currentTick * 100, d[g].loadSystem = I[g].loadSystem / I[g].currentTick * 100, d[g].loadNice = I[g].loadNice / I[g].currentTick * 100, d[g].loadIdle = I[g].loadIdle / I[g].currentTick * 100, d[g].loadIrq = I[g].loadIrq / I[g].currentTick * 100, d[g].loadSteal = I[g].loadSteal / I[g].currentTick * 100, d[g].loadGuest = I[g].loadGuest / I[g].currentTick * 100, d[g].rawLoad = I[g].load, d[g].rawLoadUser = I[g].loadUser, d[g].rawLoadSystem = I[g].loadSystem, d[g].rawLoadNice = I[g].loadNice, d[g].rawLoadIdle = I[g].loadIdle, d[g].rawLoadIrq = I[g].loadIrq, d[g].rawLoadSteal = I[g].loadSteal, d[g].rawLoadGuest = I[g].loadGuest;
        }
        const m = o + a + l + c + f + p + u, h = o + a + l + c + f + p, y = m - Y.tick;
        s = {
          avgLoad: e,
          currentLoad: (h - Y.load) / y * 100,
          currentLoadUser: (o - Y.user) / y * 100,
          currentLoadSystem: (a - Y.system) / y * 100,
          currentLoadNice: (l - Y.nice) / y * 100,
          currentLoadIdle: (u - Y.idle) / y * 100,
          currentLoadIrq: (c - Y.irq) / y * 100,
          currentLoadSteal: (f - Y.steal) / y * 100,
          currentLoadGuest: (p - Y.guest) / y * 100,
          rawCurrentLoad: h - Y.load,
          rawCurrentLoadUser: o - Y.user,
          rawCurrentLoadSystem: a - Y.system,
          rawCurrentLoadNice: l - Y.nice,
          rawCurrentLoadIdle: u - Y.idle,
          rawCurrentLoadIrq: c - Y.irq,
          rawCurrentLoadSteal: f - Y.steal,
          rawCurrentLoadGuest: p - Y.guest,
          cpus: d
        }, Y = {
          user: o,
          nice: l,
          system: a,
          idle: u,
          irq: c,
          steal: f,
          guest: p,
          tick: m,
          load: h,
          ms: Y.ms,
          currentLoad: s.currentLoad,
          currentLoadUser: s.currentLoadUser,
          currentLoadSystem: s.currentLoadSystem,
          currentLoadNice: s.currentLoadNice,
          currentLoadIdle: s.currentLoadIdle,
          currentLoadIrq: s.currentLoadIrq,
          currentLoadSteal: s.currentLoadSteal,
          currentLoadGuest: s.currentLoadGuest,
          rawCurrentLoad: s.rawCurrentLoad,
          rawCurrentLoadUser: s.rawCurrentLoadUser,
          rawCurrentLoadSystem: s.rawCurrentLoadSystem,
          rawCurrentLoadNice: s.rawCurrentLoadNice,
          rawCurrentLoadIdle: s.rawCurrentLoadIdle,
          rawCurrentLoadIrq: s.rawCurrentLoadIrq,
          rawCurrentLoadSteal: s.rawCurrentLoadSteal,
          rawCurrentLoadGuest: s.rawCurrentLoadGuest
        };
      } else {
        const i = [];
        for (let o = 0; o < si; o++)
          i[o] = {}, i[o].load = I[o].load / I[o].currentTick * 100, i[o].loadUser = I[o].loadUser / I[o].currentTick * 100, i[o].loadSystem = I[o].loadSystem / I[o].currentTick * 100, i[o].loadNice = I[o].loadNice / I[o].currentTick * 100, i[o].loadIdle = I[o].loadIdle / I[o].currentTick * 100, i[o].loadIrq = I[o].loadIrq / I[o].currentTick * 100, i[o].rawLoad = I[o].load, i[o].rawLoadUser = I[o].loadUser, i[o].rawLoadSystem = I[o].loadSystem, i[o].rawLoadNice = I[o].loadNice, i[o].rawLoadIdle = I[o].loadIdle, i[o].rawLoadIrq = I[o].loadIrq, i[o].rawLoadSteal = I[o].loadSteal, i[o].rawLoadGuest = I[o].loadGuest;
        s = {
          avgLoad: e,
          currentLoad: Y.currentLoad,
          currentLoadUser: Y.currentLoadUser,
          currentLoadSystem: Y.currentLoadSystem,
          currentLoadNice: Y.currentLoadNice,
          currentLoadIdle: Y.currentLoadIdle,
          currentLoadIrq: Y.currentLoadIrq,
          currentLoadSteal: Y.currentLoadSteal,
          currentLoadGuest: Y.currentLoadGuest,
          rawCurrentLoad: Y.rawCurrentLoad,
          rawCurrentLoadUser: Y.rawCurrentLoadUser,
          rawCurrentLoadSystem: Y.rawCurrentLoadSystem,
          rawCurrentLoadNice: Y.rawCurrentLoadNice,
          rawCurrentLoadIdle: Y.rawCurrentLoadIdle,
          rawCurrentLoadIrq: Y.rawCurrentLoadIrq,
          rawCurrentLoadSteal: Y.rawCurrentLoadSteal,
          rawCurrentLoadGuest: Y.rawCurrentLoadGuest,
          cpus: i
        };
      }
      t(s);
    });
  });
}
function Wo(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      Ro().then((e) => {
        t && t(e), n(e);
      });
    });
  });
}
yt.currentLoad = Wo;
function Go() {
  return new Promise((t) => {
    process.nextTick(() => {
      const n = Ve.cpus();
      let e = 0, s = 0, r = 0, i = 0, o = 0, a = 0;
      if (n && n.length) {
        for (let c = 0, u = n.length; c < u; c++) {
          const f = n[c].times;
          e += f.user, s += f.sys, r += f.nice, i += f.irq, o += f.idle;
        }
        const l = o + i + r + s + e;
        a = (l - o) / l * 100;
      }
      t(a);
    });
  });
}
function zo(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      Go().then((e) => {
        t && t(e), n(e);
      });
    });
  });
}
yt.fullLoad = zo;
var Ai = {};
const Re = Fe, cn = te.exec, An = te.execSync, A = T, Uo = ke;
let nt = process.platform;
const Hs = nt === "linux" || nt === "android", $s = nt === "darwin", Xs = nt === "win32", Ks = nt === "freebsd", js = nt === "openbsd", qs = nt === "netbsd", Ys = nt === "sunos", Ji = {
  "00CE": "Samsung Electronics Inc",
  "014F": "Transcend Information Inc.",
  "017A": "Apacer Technology Inc.",
  "0198": "HyperX",
  "029E": "Corsair",
  "02FE": "Elpida",
  "04CB": "A-DATA",
  "04CD": "G.Skill International Enterprise",
  "059B": "Crucial",
  1315: "Crucial",
  "2C00": "Micron Technology Inc.",
  5105: "Qimonda AG i. In.",
  "802C": "Micron Technology Inc.",
  "80AD": "Hynix Semiconductor Inc.",
  "80CE": "Samsung Electronics Inc.",
  8551: "Qimonda AG i. In.",
  "859B": "Crucial",
  AD00: "Hynix Semiconductor Inc.",
  CE00: "Samsung Electronics Inc.",
  SAMSUNG: "Samsung Electronics Inc.",
  HYNIX: "Hynix Semiconductor Inc.",
  "G-SKILL": "G-Skill International Enterprise",
  "G.SKILL": "G-Skill International Enterprise",
  TRANSCEND: "Transcend Information",
  APACER: "Apacer Technology Inc",
  MICRON: "Micron Technology Inc.",
  QIMONDA: "Qimonda AG i. In."
};
function Ho(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = {
        total: Re.totalmem(),
        free: Re.freemem(),
        used: Re.totalmem() - Re.freemem(),
        active: Re.totalmem() - Re.freemem(),
        // temporarily (fallback)
        available: Re.freemem(),
        // temporarily (fallback)
        buffers: 0,
        cached: 0,
        slab: 0,
        buffcache: 0,
        reclaimable: 0,
        swaptotal: 0,
        swapused: 0,
        swapfree: 0,
        writeback: null,
        dirty: null
      };
      if (Hs)
        try {
          Uo.readFile("/proc/meminfo", (s, r) => {
            if (!s) {
              const i = r.toString().split(`
`);
              e.total = parseInt(A.getValue(i, "memtotal"), 10), e.total = e.total ? e.total * 1024 : Re.totalmem(), e.free = parseInt(A.getValue(i, "memfree"), 10), e.free = e.free ? e.free * 1024 : Re.freemem(), e.used = e.total - e.free, e.buffers = parseInt(A.getValue(i, "buffers"), 10), e.buffers = e.buffers ? e.buffers * 1024 : 0, e.cached = parseInt(A.getValue(i, "cached"), 10), e.cached = e.cached ? e.cached * 1024 : 0, e.slab = parseInt(A.getValue(i, "slab"), 10), e.slab = e.slab ? e.slab * 1024 : 0, e.buffcache = e.buffers + e.cached + e.slab;
              let o = parseInt(A.getValue(i, "memavailable"), 10);
              e.available = o ? o * 1024 : e.free + e.buffcache, e.active = e.total - e.available, e.swaptotal = parseInt(A.getValue(i, "swaptotal"), 10), e.swaptotal = e.swaptotal ? e.swaptotal * 1024 : 0, e.swapfree = parseInt(A.getValue(i, "swapfree"), 10), e.swapfree = e.swapfree ? e.swapfree * 1024 : 0, e.swapused = e.swaptotal - e.swapfree, e.writeback = parseInt(A.getValue(i, "writeback"), 10), e.writeback = e.writeback ? e.writeback * 1024 : 0, e.dirty = parseInt(A.getValue(i, "dirty"), 10), e.dirty = e.dirty ? e.dirty * 1024 : 0, e.reclaimable = parseInt(A.getValue(i, "sreclaimable"), 10), e.reclaimable = e.reclaimable ? e.reclaimable * 1024 : 0;
            }
            t && t(e), n(e);
          });
        } catch {
          t && t(e), n(e);
        }
      if (Ks || js || qs)
        try {
          cn(
            "/sbin/sysctl hw.realmem hw.physmem vm.stats.vm.v_page_count vm.stats.vm.v_wire_count vm.stats.vm.v_active_count vm.stats.vm.v_inactive_count vm.stats.vm.v_cache_count vm.stats.vm.v_free_count vm.stats.vm.v_page_size",
            (s, r) => {
              if (!s) {
                const i = r.toString().split(`
`), o = parseInt(A.getValue(i, "vm.stats.vm.v_page_size"), 10), a = parseInt(A.getValue(i, "vm.stats.vm.v_inactive_count"), 10) * o, l = parseInt(A.getValue(i, "vm.stats.vm.v_cache_count"), 10) * o;
                e.total = parseInt(A.getValue(i, "hw.realmem"), 10), isNaN(e.total) && (e.total = parseInt(A.getValue(i, "hw.physmem"), 10)), e.free = parseInt(A.getValue(i, "vm.stats.vm.v_free_count"), 10) * o, e.buffcache = a + l, e.available = e.buffcache + e.free, e.active = e.total - e.free - e.buffcache, e.swaptotal = 0, e.swapfree = 0, e.swapused = 0;
              }
              t && t(e), n(e);
            }
          );
        } catch {
          t && t(e), n(e);
        }
      if (Ys && (t && t(e), n(e)), $s) {
        let s = 4096;
        try {
          s = A.toInt(An("sysctl -n vm.pagesize").toString()) || s;
        } catch {
          A.noop();
        }
        try {
          cn('vm_stat 2>/dev/null | egrep "Pages active|Pages inactive"', (r, i) => {
            if (!r) {
              let o = i.toString().split(`
`);
              e.active = (parseInt(A.getValue(o, "Pages active"), 10) || 0) * s, e.reclaimable = (parseInt(A.getValue(o, "Pages inactive"), 10) || 0) * s, e.buffcache = e.used - e.active, e.available = e.free + e.buffcache;
            }
            cn("sysctl -n vm.swapusage 2>/dev/null", (o, a) => {
              if (!o) {
                let l = a.toString().split(`
`);
                l.length > 0 && l[0].replace(/,/g, ".").replace(/M/g, "").trim().split("  ").forEach((f) => {
                  f.toLowerCase().indexOf("total") !== -1 && (e.swaptotal = parseFloat(f.split("=")[1].trim()) * 1024 * 1024), f.toLowerCase().indexOf("used") !== -1 && (e.swapused = parseFloat(f.split("=")[1].trim()) * 1024 * 1024), f.toLowerCase().indexOf("free") !== -1 && (e.swapfree = parseFloat(f.split("=")[1].trim()) * 1024 * 1024);
                });
              }
              t && t(e), n(e);
            });
          });
        } catch {
          t && t(e), n(e);
        }
      }
      if (Xs) {
        let s = 0, r = 0;
        try {
          A.powerShell("Get-CimInstance Win32_PageFileUsage | Select AllocatedBaseSize, CurrentUsage").then((i, o) => {
            o || i.split(`\r
`).filter((l) => l.trim() !== "").filter((l, c) => c > 0).forEach((l) => {
              l !== "" && (l = l.trim().split(/\s\s+/), s = s + (parseInt(l[0], 10) || 0), r = r + (parseInt(l[1], 10) || 0));
            }), e.swaptotal = s * 1024 * 1024, e.swapused = r * 1024 * 1024, e.swapfree = e.swaptotal - e.swapused, t && t(e), n(e);
          });
        } catch {
          t && t(e), n(e);
        }
      }
    });
  });
}
Ai.mem = Ho;
function $o(t) {
  function n(e) {
    const s = e.replace("0x", "").toUpperCase();
    return s.length >= 4 && {}.hasOwnProperty.call(Ji, s) ? Ji[s] : e;
  }
  return new Promise((e) => {
    process.nextTick(() => {
      let s = [];
      if ((Hs || Ks || js || qs) && cn(
        'export LC_ALL=C; dmidecode -t memory 2>/dev/null | grep -iE "Size:|Type|Speed|Manufacturer|Form Factor|Locator|Memory Device|Serial Number|Voltage|Part Number"; unset LC_ALL',
        (r, i) => {
          if (!r) {
            const o = i.toString().split("Memory Device");
            o.shift(), o.forEach((a) => {
              const l = a.split(`
`), c = A.getValue(l, "Size"), u = c.indexOf("GB") >= 0 ? parseInt(c, 10) * 1024 * 1024 * 1024 : parseInt(c, 10) * 1024 * 1024;
              let f = A.getValue(l, "Bank Locator");
              if (f.toLowerCase().indexOf("bad") >= 0 && (f = ""), parseInt(A.getValue(l, "Size"), 10) > 0) {
                const p = A.toInt(A.getValue(l, "Total Width")), d = A.toInt(A.getValue(l, "Data Width"));
                s.push({
                  size: u,
                  bank: f,
                  type: A.getValue(l, "Type:"),
                  ecc: d && p ? p > d : !1,
                  clockSpeed: A.getValue(l, "Configured Clock Speed:") ? parseInt(A.getValue(l, "Configured Clock Speed:"), 10) : A.getValue(l, "Speed:") ? parseInt(A.getValue(l, "Speed:"), 10) : null,
                  formFactor: A.getValue(l, "Form Factor:"),
                  manufacturer: n(A.getValue(l, "Manufacturer:")),
                  partNum: A.getValue(l, "Part Number:"),
                  serialNum: A.getValue(l, "Serial Number:"),
                  voltageConfigured: parseFloat(A.getValue(l, "Configured Voltage:")) || null,
                  voltageMin: parseFloat(A.getValue(l, "Minimum Voltage:")) || null,
                  voltageMax: parseFloat(A.getValue(l, "Maximum Voltage:")) || null
                });
              } else
                s.push({
                  size: 0,
                  bank: f,
                  type: "Empty",
                  ecc: null,
                  clockSpeed: 0,
                  formFactor: A.getValue(l, "Form Factor:"),
                  partNum: "",
                  serialNum: "",
                  voltageConfigured: null,
                  voltageMin: null,
                  voltageMax: null
                });
            });
          }
          if (!s.length) {
            s.push({
              size: Re.totalmem(),
              bank: "",
              type: "",
              ecc: null,
              clockSpeed: 0,
              formFactor: "",
              partNum: "",
              serialNum: "",
              voltageConfigured: null,
              voltageMin: null,
              voltageMax: null
            });
            try {
              let o = An("cat /proc/cpuinfo 2>/dev/null", A.execOptsLinux), a = o.toString().split(`
`), l = A.getValue(a, "revision", ":", !0).toLowerCase();
              if (A.isRaspberry(a)) {
                const c = {
                  0: 400,
                  1: 450,
                  2: 450,
                  3: 3200,
                  4: 4267
                };
                s[0].type = "LPDDR2", s[0].type = l && l[2] && l[2] === "3" ? "LPDDR4" : s[0].type, s[0].type = l && l[2] && l[2] === "4" ? "LPDDR4X" : s[0].type, s[0].ecc = !1, s[0].clockSpeed = l && l[2] && c[l[2]] || 400, s[0].clockSpeed = l && l[4] && l[4] === "d" ? 500 : s[0].clockSpeed, s[0].formFactor = "SoC", o = An("vcgencmd get_config sdram_freq 2>/dev/null", A.execOptsLinux), a = o.toString().split(`
`);
                let u = parseInt(A.getValue(a, "sdram_freq", "=", !0), 10) || 0;
                u && (s[0].clockSpeed = u), o = An("vcgencmd measure_volts sdram_p 2>/dev/null", A.execOptsLinux), a = o.toString().split(`
`);
                let f = parseFloat(A.getValue(a, "volt", "=", !0)) || 0;
                f && (s[0].voltageConfigured = f, s[0].voltageMin = f, s[0].voltageMax = f);
              }
            } catch {
              A.noop();
            }
          }
          t && t(s), e(s);
        }
      ), $s && cn("system_profiler SPMemoryDataType", (r, i) => {
        if (!r) {
          const o = i.toString().split(`
`), a = A.getValue(o, "ecc", ":", !0).toLowerCase();
          let l = i.toString().split("        BANK "), c = !0;
          l.length === 1 && (l = i.toString().split("        DIMM"), c = !1), l.shift(), l.forEach((u) => {
            const f = u.split(`
`), p = (c ? "BANK " : "DIMM") + f[0].trim().split("/")[0], d = parseInt(A.getValue(f, "          Size"));
            d ? s.push({
              size: d * 1024 * 1024 * 1024,
              bank: p,
              type: A.getValue(f, "          Type:"),
              ecc: a ? a === "enabled" : null,
              clockSpeed: parseInt(A.getValue(f, "          Speed:"), 10),
              formFactor: "",
              manufacturer: n(A.getValue(f, "          Manufacturer:")),
              partNum: A.getValue(f, "          Part Number:"),
              serialNum: A.getValue(f, "          Serial Number:"),
              voltageConfigured: null,
              voltageMin: null,
              voltageMax: null
            }) : s.push({
              size: 0,
              bank: p,
              type: "Empty",
              ecc: null,
              clockSpeed: 0,
              formFactor: "",
              manufacturer: "",
              partNum: "",
              serialNum: "",
              voltageConfigured: null,
              voltageMin: null,
              voltageMax: null
            });
          });
        }
        if (!s.length) {
          const o = i.toString().split(`
`), a = parseInt(A.getValue(o, "      Memory:")), l = A.getValue(o, "      Type:"), c = A.getValue(o, "      Manufacturer:");
          a && l && s.push({
            size: a * 1024 * 1024 * 1024,
            bank: "0",
            type: l,
            ecc: !1,
            clockSpeed: null,
            formFactor: "SOC",
            manufacturer: n(c),
            partNum: "",
            serialNum: "",
            voltageConfigured: null,
            voltageMin: null,
            voltageMax: null
          });
        }
        t && t(s), e(s);
      }), Ys && (t && t(s), e(s)), Xs) {
        const r = "Unknown|Other|DRAM|Synchronous DRAM|Cache DRAM|EDO|EDRAM|VRAM|SRAM|RAM|ROM|FLASH|EEPROM|FEPROM|EPROM|CDRAM|3DRAM|SDRAM|SGRAM|RDRAM|DDR|DDR2|DDR2 FB-DIMM|Reserved|DDR3|FBD2|DDR4|LPDDR|LPDDR2|LPDDR3|LPDDR4|Logical non-volatile device|HBM|HBM2|DDR5|LPDDR5".split(
          "|"
        ), i = "Unknown|Other|SIP|DIP|ZIP|SOJ|Proprietary|SIMM|DIMM|TSOP|PGA|RIMM|SODIMM|SRIMM|SMD|SSMP|QFP|TQFP|SOIC|LCC|PLCC|BGA|FPBGA|LGA".split("|");
        try {
          A.powerShell(
            "Get-CimInstance Win32_PhysicalMemory | select DataWidth,TotalWidth,Capacity,BankLabel,MemoryType,SMBIOSMemoryType,ConfiguredClockSpeed,Speed,FormFactor,Manufacturer,PartNumber,SerialNumber,ConfiguredVoltage,MinVoltage,MaxVoltage,Tag | fl"
          ).then((o, a) => {
            if (!a) {
              const l = o.toString().split(/\n\s*\n/);
              l.shift(), l.forEach((c) => {
                const u = c.split(`\r
`), f = A.toInt(A.getValue(u, "DataWidth", ":")), p = A.toInt(A.getValue(u, "TotalWidth", ":")), d = parseInt(A.getValue(u, "Capacity", ":"), 10) || 0, m = A.getValue(u, "Tag", ":"), h = A.splitByNumber(m);
                d && s.push({
                  size: d,
                  bank: A.getValue(u, "BankLabel", ":") + (h[1] ? "/" + h[1] : ""),
                  // BankLabel
                  type: r[parseInt(A.getValue(u, "MemoryType", ":"), 10) || parseInt(A.getValue(u, "SMBIOSMemoryType", ":"), 10)],
                  ecc: f && p ? p > f : !1,
                  clockSpeed: parseInt(A.getValue(u, "ConfiguredClockSpeed", ":"), 10) || parseInt(A.getValue(u, "Speed", ":"), 10) || 0,
                  formFactor: i[parseInt(A.getValue(u, "FormFactor", ":"), 10) || 0],
                  manufacturer: n(A.getValue(u, "Manufacturer", ":")),
                  partNum: A.getValue(u, "PartNumber", ":"),
                  serialNum: A.getValue(u, "SerialNumber", ":"),
                  voltageConfigured: (parseInt(A.getValue(u, "ConfiguredVoltage", ":"), 10) || 0) / 1e3,
                  voltageMin: (parseInt(A.getValue(u, "MinVoltage", ":"), 10) || 0) / 1e3,
                  voltageMax: (parseInt(A.getValue(u, "MaxVoltage", ":"), 10) || 0) / 1e3
                });
              });
            }
            t && t(s), e(s);
          });
        } catch {
          t && t(s), e(s);
        }
      }
    });
  });
}
Ai.memLayout = $o;
const Qi = te.exec, kt = ke, H = T, it = process.platform, Xo = it === "linux" || it === "android", Ko = it === "darwin", jo = it === "win32", qo = it === "freebsd", Yo = it === "openbsd", Jo = it === "netbsd", Qo = it === "sunos";
function Zo(t, n, e) {
  const s = {};
  let r = parseInt(H.getValue(t, "BatteryStatus", ":").trim(), 10) || 0;
  if (r >= 0) {
    const i = r;
    s.status = i, s.hasBattery = !0, s.maxCapacity = e || parseInt(H.getValue(t, "DesignCapacity", ":") || 0), s.designedCapacity = parseInt(H.getValue(t, "DesignCapacity", ":") || n), s.voltage = (parseInt(H.getValue(t, "DesignVoltage", ":"), 10) || 0) / 1e3, s.capacityUnit = "mWh", s.percent = parseInt(H.getValue(t, "EstimatedChargeRemaining", ":"), 10) || 0, s.currentCapacity = parseInt(s.maxCapacity * s.percent / 100), s.isCharging = i >= 6 && i <= 9 || i === 11 || i !== 3 && i !== 1 && s.percent < 100, s.acConnected = s.isCharging || i === 2, s.model = H.getValue(t, "DeviceID", ":");
  } else
    s.status = -1;
  return s;
}
var ea = (t) => new Promise((n) => {
  process.nextTick(() => {
    let e = {
      hasBattery: !1,
      cycleCount: 0,
      isCharging: !1,
      designedCapacity: 0,
      maxCapacity: 0,
      currentCapacity: 0,
      voltage: 0,
      capacityUnit: "",
      percent: 0,
      timeRemaining: null,
      acConnected: !0,
      type: "",
      model: "",
      manufacturer: "",
      serial: ""
    };
    if (Xo) {
      let s = "";
      kt.existsSync("/sys/class/power_supply/BAT1/uevent") ? s = "/sys/class/power_supply/BAT1/" : kt.existsSync("/sys/class/power_supply/BAT0/uevent") && (s = "/sys/class/power_supply/BAT0/");
      let r = !1, i = "";
      kt.existsSync("/sys/class/power_supply/AC/online") ? i = "/sys/class/power_supply/AC/online" : kt.existsSync("/sys/class/power_supply/AC0/online") && (i = "/sys/class/power_supply/AC0/online"), i && (r = kt.readFileSync(i).toString().trim() === "1"), s ? kt.readFile(s + "uevent", (o, a) => {
        if (o)
          t && t(e), n(e);
        else {
          let l = a.toString().split(`
`);
          e.isCharging = H.getValue(l, "POWER_SUPPLY_STATUS", "=").toLowerCase() === "charging", e.acConnected = r || e.isCharging, e.voltage = parseInt("0" + H.getValue(l, "POWER_SUPPLY_VOLTAGE_NOW", "="), 10) / 1e6, e.capacityUnit = e.voltage ? "mWh" : "mAh", e.cycleCount = parseInt("0" + H.getValue(l, "POWER_SUPPLY_CYCLE_COUNT", "="), 10), e.maxCapacity = Math.round(parseInt("0" + H.getValue(l, "POWER_SUPPLY_CHARGE_FULL", "=", !0, !0), 10) / 1e3 * (e.voltage || 1));
          const c = parseInt("0" + H.getValue(l, "POWER_SUPPLY_VOLTAGE_MIN_DESIGN", "="), 10) / 1e6;
          e.designedCapacity = Math.round(
            parseInt("0" + H.getValue(l, "POWER_SUPPLY_CHARGE_FULL_DESIGN", "=", !0, !0), 10) / 1e3 * (c || e.voltage || 1)
          ), e.currentCapacity = Math.round(parseInt("0" + H.getValue(l, "POWER_SUPPLY_CHARGE_NOW", "="), 10) / 1e3 * (e.voltage || 1)), e.maxCapacity || (e.maxCapacity = parseInt("0" + H.getValue(l, "POWER_SUPPLY_ENERGY_FULL", "=", !0, !0), 10) / 1e3, e.designedCapacity = parseInt("0" + H.getValue(l, "POWER_SUPPLY_ENERGY_FULL_DESIGN", "=", !0, !0), 10) / 1e3 | e.maxCapacity, e.currentCapacity = parseInt("0" + H.getValue(l, "POWER_SUPPLY_ENERGY_NOW", "="), 10) / 1e3);
          const u = H.getValue(l, "POWER_SUPPLY_CAPACITY", "="), f = parseInt("0" + H.getValue(l, "POWER_SUPPLY_ENERGY_NOW", "="), 10), p = parseInt("0" + H.getValue(l, "POWER_SUPPLY_POWER_NOW", "="), 10), d = parseInt("0" + H.getValue(l, "POWER_SUPPLY_CURRENT_NOW", "="), 10), m = parseInt("0" + H.getValue(l, "POWER_SUPPLY_CHARGE_NOW", "="), 10);
          e.percent = parseInt("0" + u, 10), e.maxCapacity && e.currentCapacity && (e.hasBattery = !0, u || (e.percent = 100 * e.currentCapacity / e.maxCapacity)), e.isCharging && (e.hasBattery = !0), f && p ? e.timeRemaining = Math.floor(f / p * 60) : d && m ? e.timeRemaining = Math.floor(m / d * 60) : d && e.currentCapacity && (e.timeRemaining = Math.floor(e.currentCapacity / d * 60)), e.type = H.getValue(l, "POWER_SUPPLY_TECHNOLOGY", "="), e.model = H.getValue(l, "POWER_SUPPLY_MODEL_NAME", "="), e.manufacturer = H.getValue(l, "POWER_SUPPLY_MANUFACTURER", "="), e.serial = H.getValue(l, "POWER_SUPPLY_SERIAL_NUMBER", "="), t && t(e), n(e);
        }
      }) : (t && t(e), n(e));
    }
    if ((qo || Yo || Jo) && Qi("sysctl -i hw.acpi.battery hw.acpi.acline", (s, r) => {
      let i = r.toString().split(`
`);
      const o = parseInt("0" + H.getValue(i, "hw.acpi.battery.units"), 10), a = parseInt("0" + H.getValue(i, "hw.acpi.battery.life"), 10);
      e.hasBattery = o > 0, e.cycleCount = null, e.isCharging = H.getValue(i, "hw.acpi.acline") !== "1", e.acConnected = e.isCharging, e.maxCapacity = null, e.currentCapacity = null, e.capacityUnit = "unknown", e.percent = o ? a : null, t && t(e), n(e);
    }), Ko && Qi(
      'ioreg -n AppleSmartBattery -r | egrep "CycleCount|IsCharging|DesignCapacity|MaxCapacity|CurrentCapacity|DeviceName|BatterySerialNumber|Serial|TimeRemaining|Voltage"; pmset -g batt | grep %',
      (s, r) => {
        if (r) {
          let i = r.toString().replace(/ +/g, "").replace(/"+/g, "").replace(/-/g, "").split(`
`);
          e.cycleCount = parseInt("0" + H.getValue(i, "cyclecount", "="), 10), e.voltage = parseInt("0" + H.getValue(i, "voltage", "="), 10) / 1e3, e.capacityUnit = e.voltage ? "mWh" : "mAh", e.maxCapacity = Math.round(parseInt("0" + H.getValue(i, "applerawmaxcapacity", "="), 10) * (e.voltage || 1)), e.currentCapacity = Math.round(parseInt("0" + H.getValue(i, "applerawcurrentcapacity", "="), 10) * (e.voltage || 1)), e.designedCapacity = Math.round(parseInt("0" + H.getValue(i, "DesignCapacity", "="), 10) * (e.voltage || 1)), e.manufacturer = "Apple", e.serial = H.getValue(i, "BatterySerialNumber", "=") || H.getValue(i, "Serial", "="), e.model = H.getValue(i, "DeviceName", "=");
          let o = null, l = H.getValue(i, "internal", "Battery").split(";");
          if (l && l[0]) {
            let c = l[0].split("	");
            c && c[1] && (o = parseFloat(c[1].trim().replace(/%/g, "")));
          }
          l && l[1] ? (e.isCharging = l[1].trim() === "charging", e.acConnected = l[1].trim() !== "discharging") : (e.isCharging = H.getValue(i, "ischarging", "=").toLowerCase() === "yes", e.acConnected = e.isCharging), e.maxCapacity && e.currentCapacity && (e.hasBattery = !0, e.type = "Li-ion", e.percent = o !== null ? o : Math.round(100 * e.currentCapacity / e.maxCapacity), e.isCharging || (e.timeRemaining = parseInt("0" + H.getValue(i, "TimeRemaining", "="), 10)));
        }
        t && t(e), n(e);
      }
    ), Qo && (t && t(e), n(e)), jo)
      try {
        const s = [];
        s.push(H.powerShell("Get-CimInstance Win32_Battery | select BatteryStatus, DesignCapacity, DesignVoltage, EstimatedChargeRemaining, DeviceID | fl")), s.push(H.powerShell("(Get-WmiObject -Class BatteryStaticData -Namespace ROOT/WMI).DesignedCapacity")), s.push(H.powerShell("(Get-CimInstance -Class BatteryFullChargedCapacity -Namespace ROOT/WMI).FullChargedCapacity")), H.promiseAll(s).then((r) => {
          if (r) {
            const i = r.results[0].split(/\n\s*\n/), o = [], a = (u) => /\S/.test(u);
            for (let u = 0; u < i.length; u++)
              a(i[u]) && o.push(i[u]);
            const l = r.results[1].split(`\r
`).filter((u) => u), c = r.results[2].split(`\r
`).filter((u) => u);
            if (o.length) {
              let u = !1;
              const f = [];
              for (let p = 0; p < o.length; p++) {
                const d = o[p].split(`\r
`), m = l && l.length >= p + 1 && l[p] ? H.toInt(l[p]) : 0, h = c && c.length >= p + 1 && c[p] ? H.toInt(c[p]) : 0, y = Zo(d, m, h);
                !u && y.status > 0 && y.status !== 10 ? (e.hasBattery = y.hasBattery, e.maxCapacity = y.maxCapacity, e.designedCapacity = y.designedCapacity, e.voltage = y.voltage, e.capacityUnit = y.capacityUnit, e.percent = y.percent, e.currentCapacity = y.currentCapacity, e.isCharging = y.isCharging, e.acConnected = y.acConnected, e.model = y.model, u = !0) : y.status !== -1 && f.push({
                  hasBattery: y.hasBattery,
                  maxCapacity: y.maxCapacity,
                  designedCapacity: y.designedCapacity,
                  voltage: y.voltage,
                  capacityUnit: y.capacityUnit,
                  percent: y.percent,
                  currentCapacity: y.currentCapacity,
                  isCharging: y.isCharging,
                  timeRemaining: null,
                  acConnected: y.acConnected,
                  model: y.model,
                  type: "",
                  manufacturer: "",
                  serial: ""
                });
              }
              !u && f.length && (e = f[0], f.shift()), f.length && (e.additionalBatteries = f);
            }
          }
          t && t(e), n(e);
        });
      } catch {
        t && t(e), n(e);
      }
  });
}), Js = {};
const Zi = ke, es = Be, Ft = te.exec, ai = te.execSync, D = T, st = process.platform;
let tn = "";
const In = st === "linux" || st === "android", ta = st === "darwin", li = st === "win32", na = st === "freebsd", ia = st === "openbsd", sa = st === "netbsd", ra = st === "sunos";
let nn = 0, sn = 0, _n = 0, On = 0;
const ts = {
  "-2": "UNINITIALIZED",
  "-1": "OTHER",
  0: "HD15",
  1: "SVIDEO",
  2: "Composite video",
  3: "Component video",
  4: "DVI",
  5: "HDMI",
  6: "LVDS",
  8: "D_JPN",
  9: "SDI",
  10: "DP",
  11: "DP embedded",
  12: "UDI",
  13: "UDI embedded",
  14: "SDTVDONGLE",
  15: "MIRACAST",
  2147483648: "INTERNAL"
};
function ns(t) {
  const n = [
    { pattern: "^LG.+", manufacturer: "LG" },
    { pattern: "^BENQ.+", manufacturer: "BenQ" },
    { pattern: "^ASUS.+", manufacturer: "Asus" },
    { pattern: "^DELL.+", manufacturer: "Dell" },
    { pattern: "^SAMSUNG.+", manufacturer: "Samsung" },
    { pattern: "^VIEWSON.+", manufacturer: "ViewSonic" },
    { pattern: "^SONY.+", manufacturer: "Sony" },
    { pattern: "^ACER.+", manufacturer: "Acer" },
    { pattern: "^AOC.+", manufacturer: "AOC Monitors" },
    { pattern: "^HP.+", manufacturer: "HP" },
    { pattern: "^EIZO.?", manufacturer: "Eizo" },
    { pattern: "^PHILIPS.?", manufacturer: "Philips" },
    { pattern: "^IIYAMA.?", manufacturer: "Iiyama" },
    { pattern: "^SHARP.?", manufacturer: "Sharp" },
    { pattern: "^NEC.?", manufacturer: "NEC" },
    { pattern: "^LENOVO.?", manufacturer: "Lenovo" },
    { pattern: "COMPAQ.?", manufacturer: "Compaq" },
    { pattern: "APPLE.?", manufacturer: "Apple" },
    { pattern: "INTEL.?", manufacturer: "Intel" },
    { pattern: "AMD.?", manufacturer: "AMD" },
    { pattern: "NVIDIA.?", manufacturer: "NVDIA" }
  ];
  let e = "";
  return t && (t = t.toUpperCase(), n.forEach((s) => {
    RegExp(s.pattern).test(t) && (e = s.manufacturer);
  })), e;
}
function oa(t) {
  return {
    610: "Apple",
    "1e6d": "LG",
    "10ac": "DELL",
    "4dd9": "Sony",
    "38a3": "NEC"
  }[t] || "";
}
function aa(t) {
  let n = "";
  return t = (t || "").toLowerCase(), t.indexOf("apple") >= 0 ? n = "0x05ac" : t.indexOf("nvidia") >= 0 ? n = "0x10de" : t.indexOf("intel") >= 0 ? n = "0x8086" : (t.indexOf("ati") >= 0 || t.indexOf("amd") >= 0) && (n = "0x1002"), n;
}
function la(t) {
  return {
    spdisplays_mtlgpufamilymac1: "mac1",
    spdisplays_mtlgpufamilymac2: "mac2",
    spdisplays_mtlgpufamilyapple1: "apple1",
    spdisplays_mtlgpufamilyapple2: "apple2",
    spdisplays_mtlgpufamilyapple3: "apple3",
    spdisplays_mtlgpufamilyapple4: "apple4",
    spdisplays_mtlgpufamilyapple5: "apple5",
    spdisplays_mtlgpufamilyapple6: "apple6",
    spdisplays_mtlgpufamilyapple7: "apple7",
    spdisplays_metalfeaturesetfamily11: "family1_v1",
    spdisplays_metalfeaturesetfamily12: "family1_v2",
    spdisplays_metalfeaturesetfamily13: "family1_v3",
    spdisplays_metalfeaturesetfamily14: "family1_v4",
    spdisplays_metalfeaturesetfamily21: "family2_v1"
  }[t] || "";
}
function ca(t) {
  function n(p) {
    const d = {
      controllers: [],
      displays: []
    };
    try {
      return p.forEach((m) => {
        const h = (m.sppci_bus || "").indexOf("builtin") > -1 ? "Built-In" : (m.sppci_bus || "").indexOf("pcie") > -1 ? "PCIe" : "", y = (parseInt(m.spdisplays_vram || "", 10) || 0) * ((m.spdisplays_vram || "").indexOf("GB") > -1 ? 1024 : 1), g = (parseInt(m.spdisplays_vram_shared || "", 10) || 0) * ((m.spdisplays_vram_shared || "").indexOf("GB") > -1 ? 1024 : 1);
        let x = la(m.spdisplays_metal || m.spdisplays_metalfamily || "");
        d.controllers.push({
          vendor: ns(m.spdisplays_vendor || "") || m.spdisplays_vendor || "",
          model: m.sppci_model || "",
          bus: h,
          vramDynamic: h === "Built-In",
          vram: y || g || null,
          deviceId: m["spdisplays_device-id"] || "",
          vendorId: m["spdisplays_vendor-id"] || aa((m.spdisplays_vendor || "") + (m.sppci_model || "")),
          external: m.sppci_device_type === "spdisplays_egpu",
          cores: m.sppci_cores || null,
          metalVersion: x
        }), m.spdisplays_ndrvs && m.spdisplays_ndrvs.length && m.spdisplays_ndrvs.forEach((S) => {
          const C = S.spdisplays_connection_type || "", L = (S._spdisplays_resolution || "").split("@"), V = L[0].split("x"), E = (S._spdisplays_pixels || "").split("x"), U = S.spdisplays_depth || "", O = S["_spdisplays_display-serial-number"] || S["_spdisplays_display-serial-number2"] || null;
          d.displays.push({
            vendor: oa(S["_spdisplays_display-vendor-id"] || "") || ns(S._name || ""),
            vendorId: S["_spdisplays_display-vendor-id"] || "",
            model: S._name || "",
            productionYear: S["_spdisplays_display-year"] || null,
            serial: O !== "0" ? O : null,
            displayId: S._spdisplays_displayID || null,
            main: S.spdisplays_main ? S.spdisplays_main === "spdisplays_yes" : !1,
            builtin: (S.spdisplays_display_type || "").indexOf("built-in") > -1,
            connection: C.indexOf("_internal") > -1 ? "Internal" : C.indexOf("_displayport") > -1 ? "Display Port" : C.indexOf("_hdmi") > -1 ? "HDMI" : null,
            sizeX: null,
            sizeY: null,
            pixelDepth: U === "CGSThirtyBitColor" ? 30 : U === "CGSThirtytwoBitColor" ? 32 : U === "CGSTwentyfourBitColor" ? 24 : null,
            resolutionX: E.length > 1 ? parseInt(E[0], 10) : null,
            resolutionY: E.length > 1 ? parseInt(E[1], 10) : null,
            currentResX: V.length > 1 ? parseInt(V[0], 10) : null,
            currentResY: V.length > 1 ? parseInt(V[1], 10) : null,
            positionX: 0,
            positionY: 0,
            currentRefreshRate: L.length > 1 ? parseInt(L[1], 10) : null
          });
        });
      }), d;
    } catch {
      return d;
    }
  }
  function e(p) {
    let d = [], m = {
      vendor: "",
      subVendor: "",
      model: "",
      bus: "",
      busAddress: "",
      vram: null,
      vramDynamic: !1,
      pciID: ""
    }, h = !1, y = [];
    try {
      y = ai('export LC_ALL=C; dmidecode -t 9 2>/dev/null; unset LC_ALL | grep "Bus Address: "', D.execOptsLinux).toString().split(`
`);
      for (let x = 0; x < y.length; x++)
        y[x] = y[x].replace("Bus Address:", "").replace("0000:", "").trim();
      y = y.filter((x) => x != null && x);
    } catch {
      D.noop();
    }
    let g = 1;
    return p.forEach((x) => {
      let S = "";
      if (g < p.length && p[g] && (S = p[g], S.indexOf(":") > 0 && (S = S.split(":")[1])), x.trim() !== "") {
        if (x[0] !== " " && x[0] !== "	") {
          let C = y.indexOf(x.split(" ")[0]) >= 0, L = x.toLowerCase().indexOf(" vga "), V = x.toLowerCase().indexOf("3d controller");
          if (L !== -1 || V !== -1) {
            V !== -1 && L === -1 && (L = V), (m.vendor || m.model || m.bus || m.vram !== null || m.vramDynamic) && (d.push(m), m = {
              vendor: "",
              model: "",
              bus: "",
              busAddress: "",
              vram: null,
              vramDynamic: !1
            });
            const E = x.split(" ")[0];
            /[\da-fA-F]{2}:[\da-fA-F]{2}\.[\da-fA-F]/.test(E) && (m.busAddress = E), h = !0;
            let U = x.search(/\[[0-9a-f]{4}:[0-9a-f]{4}]|$/), O = x.substr(L, U - L).split(":");
            if (m.busAddress = x.substr(0, L).trim(), O.length > 1 && (O[1] = O[1].trim(), O[1].toLowerCase().indexOf("corporation") >= 0 ? (m.vendor = O[1].substr(0, O[1].toLowerCase().indexOf("corporation") + 11).trim(), m.model = O[1].substr(O[1].toLowerCase().indexOf("corporation") + 11, 200).split("(")[0].trim(), m.bus = y.length > 0 && C ? "PCIe" : "Onboard", m.vram = null, m.vramDynamic = !1) : O[1].toLowerCase().indexOf(" inc.") >= 0 ? ((O[1].match(/]/g) || []).length > 1 ? (m.vendor = O[1].substr(0, O[1].toLowerCase().indexOf("]") + 1).trim(), m.model = O[1].substr(O[1].toLowerCase().indexOf("]") + 1, 200).trim().split("(")[0].trim()) : (m.vendor = O[1].substr(0, O[1].toLowerCase().indexOf(" inc.") + 5).trim(), m.model = O[1].substr(O[1].toLowerCase().indexOf(" inc.") + 5, 200).trim().split("(")[0].trim()), m.bus = y.length > 0 && C ? "PCIe" : "Onboard", m.vram = null, m.vramDynamic = !1) : O[1].toLowerCase().indexOf(" ltd.") >= 0 && ((O[1].match(/]/g) || []).length > 1 ? (m.vendor = O[1].substr(0, O[1].toLowerCase().indexOf("]") + 1).trim(), m.model = O[1].substr(O[1].toLowerCase().indexOf("]") + 1, 200).trim().split("(")[0].trim()) : (m.vendor = O[1].substr(0, O[1].toLowerCase().indexOf(" ltd.") + 5).trim(), m.model = O[1].substr(O[1].toLowerCase().indexOf(" ltd.") + 5, 200).trim().split("(")[0].trim())), m.model && S.indexOf(m.model) !== -1)) {
              const $ = S.split(m.model)[0].trim();
              $ && (m.subVendor = $);
            }
          } else
            h = !1;
        }
        if (h) {
          let C = x.split(":");
          if (C.length > 1 && C[0].replace(/ +/g, "").toLowerCase().indexOf("devicename") !== -1 && C[1].toLowerCase().indexOf("onboard") !== -1 && (m.bus = "Onboard"), C.length > 1 && C[0].replace(/ +/g, "").toLowerCase().indexOf("region") !== -1 && C[1].toLowerCase().indexOf("memory") !== -1) {
            let L = C[1].split("=");
            L.length > 1 && (m.vram = parseInt(L[1]));
          }
        }
      }
      g++;
    }), (m.vendor || m.model || m.bus || m.busAddress || m.vram !== null || m.vramDynamic) && d.push(m), d;
  }
  function s(p, d) {
    const m = /\[([^\]]+)\]\s+(\w+)\s+(.*)/, h = d.reduce((y, g) => {
      const x = m.exec(g.trim());
      return x && (y[x[1]] || (y[x[1]] = {}), y[x[1]][x[2]] = x[3]), y;
    }, {});
    for (let y in h) {
      const g = h[y];
      if (g.CL_DEVICE_TYPE === "CL_DEVICE_TYPE_GPU") {
        let x;
        if (g.CL_DEVICE_TOPOLOGY_AMD) {
          const S = g.CL_DEVICE_TOPOLOGY_AMD.match(/[a-zA-Z0-9]+:\d+\.\d+/);
          S && (x = S[0]);
        } else if (g.CL_DEVICE_PCI_BUS_ID_NV && g.CL_DEVICE_PCI_SLOT_ID_NV) {
          const S = parseInt(g.CL_DEVICE_PCI_BUS_ID_NV), C = parseInt(g.CL_DEVICE_PCI_SLOT_ID_NV);
          if (!isNaN(S) && !isNaN(C)) {
            const L = S & 255, V = C >> 3 & 255, E = C & 7;
            x = `${L.toString().padStart(2, "0")}:${V.toString().padStart(2, "0")}.${E}`;
          }
        }
        if (x) {
          let S = p.find((L) => L.busAddress === x);
          S || (S = {
            vendor: "",
            model: "",
            bus: "",
            busAddress: x,
            vram: null,
            vramDynamic: !1
          }, p.push(S)), S.vendor = g.CL_DEVICE_VENDOR, g.CL_DEVICE_BOARD_NAME_AMD ? S.model = g.CL_DEVICE_BOARD_NAME_AMD : S.model = g.CL_DEVICE_NAME;
          const C = parseInt(g.CL_DEVICE_GLOBAL_MEM_SIZE);
          isNaN(C) || (S.vram = Math.round(C / 1024 / 1024));
        }
      }
    }
    return p;
  }
  function r() {
    if (tn)
      return tn;
    if (li)
      try {
        const p = es.join(D.WINDIR, "System32", "DriverStore", "FileRepository"), d = Zi.readdirSync(p, { withFileTypes: !0 }).filter((m) => m.isDirectory()).map((m) => {
          const h = es.join(p, m.name, "nvidia-smi.exe");
          try {
            const y = Zi.statSync(h);
            return { path: h, ctime: y.ctimeMs };
          } catch {
            return null;
          }
        }).filter(Boolean);
        d.length > 0 && (tn = d.reduce((m, h) => h.ctime > m.ctime ? h : m).path);
      } catch {
        D.noop();
      }
    else In && (tn = "nvidia-smi");
    return tn;
  }
  function i(p) {
    const d = r();
    if (p = p || D.execOptsWin, d) {
      const h = `"${d}" --query-gpu=driver_version,pci.sub_device_id,name,pci.bus_id,fan.speed,memory.total,memory.used,memory.free,utilization.gpu,utilization.memory,temperature.gpu,temperature.memory,power.draw,power.limit,clocks.gr,clocks.mem --format=csv,noheader,nounits`;
      In && (p.stdio = ["pipe", "pipe", "ignore"]);
      try {
        const y = h + (In ? "  2>/dev/null" : "") + (li ? "  2> nul" : "");
        return ai(y, p).toString();
      } catch {
        D.noop();
      }
    }
    return "";
  }
  function o() {
    function p(y) {
      return [null, void 0].includes(y) ? y : parseFloat(y);
    }
    const d = i();
    if (!d)
      return [];
    let h = d.split(`
`).filter(Boolean).map((y) => {
      const g = y.split(", ").map((x) => x.includes("N/A") ? void 0 : x);
      return g.length === 16 ? {
        driverVersion: g[0],
        subDeviceId: g[1],
        name: g[2],
        pciBus: g[3],
        fanSpeed: p(g[4]),
        memoryTotal: p(g[5]),
        memoryUsed: p(g[6]),
        memoryFree: p(g[7]),
        utilizationGpu: p(g[8]),
        utilizationMemory: p(g[9]),
        temperatureGpu: p(g[10]),
        temperatureMemory: p(g[11]),
        powerDraw: p(g[12]),
        powerLimit: p(g[13]),
        clockCore: p(g[14]),
        clockMemory: p(g[15])
      } : {};
    });
    return h = h.filter((y) => "pciBus" in y), h;
  }
  function a(p, d) {
    return d.driverVersion && (p.driverVersion = d.driverVersion), d.subDeviceId && (p.subDeviceId = d.subDeviceId), d.name && (p.name = d.name), d.pciBus && (p.pciBus = d.pciBus), d.fanSpeed && (p.fanSpeed = d.fanSpeed), d.memoryTotal && (p.memoryTotal = d.memoryTotal, p.vram = d.memoryTotal, p.vramDynamic = !1), d.memoryUsed && (p.memoryUsed = d.memoryUsed), d.memoryFree && (p.memoryFree = d.memoryFree), d.utilizationGpu && (p.utilizationGpu = d.utilizationGpu), d.utilizationMemory && (p.utilizationMemory = d.utilizationMemory), d.temperatureGpu && (p.temperatureGpu = d.temperatureGpu), d.temperatureMemory && (p.temperatureMemory = d.temperatureMemory), d.powerDraw && (p.powerDraw = d.powerDraw), d.powerLimit && (p.powerLimit = d.powerLimit), d.clockCore && (p.clockCore = d.clockCore), d.clockMemory && (p.clockMemory = d.clockMemory), p;
  }
  function l(p) {
    const d = {
      vendor: "",
      model: "",
      deviceName: "",
      main: !1,
      builtin: !1,
      connection: "",
      sizeX: null,
      sizeY: null,
      pixelDepth: null,
      resolutionX: null,
      resolutionY: null,
      currentResX: null,
      currentResY: null,
      positionX: 0,
      positionY: 0,
      currentRefreshRate: null
    };
    let m = 108;
    if (p.substr(m, 6) === "000000" && (m += 36), p.substr(m, 6) === "000000" && (m += 36), p.substr(m, 6) === "000000" && (m += 36), p.substr(m, 6) === "000000" && (m += 36), d.resolutionX = parseInt("0x0" + p.substr(m + 8, 1) + p.substr(m + 4, 2)), d.resolutionY = parseInt("0x0" + p.substr(m + 14, 1) + p.substr(m + 10, 2)), d.sizeX = parseInt("0x0" + p.substr(m + 28, 1) + p.substr(m + 24, 2)), d.sizeY = parseInt("0x0" + p.substr(m + 29, 1) + p.substr(m + 26, 2)), m = p.indexOf("000000fc00"), m >= 0) {
      let h = p.substr(m + 10, 26);
      h.indexOf("0a") !== -1 && (h = h.substr(0, h.indexOf("0a")));
      try {
        h.length > 2 && (d.model = h.match(/.{1,2}/g).map((y) => String.fromCharCode(parseInt(y, 16))).join(""));
      } catch {
        D.noop();
      }
    } else
      d.model = "";
    return d;
  }
  function c(p, d) {
    const m = [];
    let h = {
      vendor: "",
      model: "",
      deviceName: "",
      main: !1,
      builtin: !1,
      connection: "",
      sizeX: null,
      sizeY: null,
      pixelDepth: null,
      resolutionX: null,
      resolutionY: null,
      currentResX: null,
      currentResY: null,
      positionX: 0,
      positionY: 0,
      currentRefreshRate: null
    }, y = !1, g = !1, x = "", S = 0;
    for (let C = 1; C < p.length; C++)
      if (p[C].trim() !== "") {
        if (p[C][0] !== " " && p[C][0] !== "	" && p[C].toLowerCase().indexOf(" connected ") !== -1) {
          (h.model || h.main || h.builtin || h.connection || h.sizeX !== null || h.pixelDepth !== null || h.resolutionX !== null) && (m.push(h), h = {
            vendor: "",
            model: "",
            main: !1,
            builtin: !1,
            connection: "",
            sizeX: null,
            sizeY: null,
            pixelDepth: null,
            resolutionX: null,
            resolutionY: null,
            currentResX: null,
            currentResY: null,
            positionX: 0,
            positionY: 0,
            currentRefreshRate: null
          });
          let L = p[C].split(" ");
          h.connection = L[0], h.main = p[C].toLowerCase().indexOf(" primary ") >= 0, h.builtin = L[0].toLowerCase().indexOf("edp") >= 0;
        }
        if (y)
          if (p[C].search(/\S|$/) > S)
            x += p[C].toLowerCase().trim();
          else {
            let L = l(x);
            h.vendor = L.vendor, h.model = L.model, h.resolutionX = L.resolutionX, h.resolutionY = L.resolutionY, h.sizeX = L.sizeX, h.sizeY = L.sizeY, h.pixelDepth = d, y = !1;
          }
        if (p[C].toLowerCase().indexOf("edid:") >= 0 && (y = !0, S = p[C].search(/\S|$/)), p[C].toLowerCase().indexOf("*current") >= 0) {
          const L = p[C].split("(");
          if (L && L.length > 1 && L[0].indexOf("x") >= 0) {
            const V = L[0].trim().split("x");
            h.currentResX = D.toInt(V[0]), h.currentResY = D.toInt(V[1]);
          }
          g = !0;
        }
        if (g && p[C].toLowerCase().indexOf("clock") >= 0 && p[C].toLowerCase().indexOf("hz") >= 0 && p[C].toLowerCase().indexOf("v: height") >= 0) {
          const L = p[C].split("clock");
          L && L.length > 1 && L[1].toLowerCase().indexOf("hz") >= 0 && (h.currentRefreshRate = D.toInt(L[1])), g = !1;
        }
      }
    return (h.model || h.main || h.builtin || h.connection || h.sizeX !== null || h.pixelDepth !== null || h.resolutionX !== null) && m.push(h), m;
  }
  return new Promise((p) => {
    process.nextTick(() => {
      let d = {
        controllers: [],
        displays: []
      };
      if (ta && Ft("system_profiler -xml -detailLevel full SPDisplaysDataType", (h, y) => {
        if (!h) {
          try {
            const g = y.toString();
            d = n(D.plistParser(g)[0]._items);
          } catch {
            D.noop();
          }
          try {
            y = ai(
              'defaults read /Library/Preferences/com.apple.windowserver.plist 2>/dev/null;defaults read /Library/Preferences/com.apple.windowserver.displays.plist 2>/dev/null; echo ""',
              { maxBuffer: 1024 * 102400 }
            );
            const g = (y || "").toString(), x = D.plistReader(g);
            if (x.DisplayAnyUserSets && x.DisplayAnyUserSets.Configs && x.DisplayAnyUserSets.Configs[0] && x.DisplayAnyUserSets.Configs[0].DisplayConfig) {
              const S = x.DisplayAnyUserSets.Configs[0].DisplayConfig;
              let C = 0;
              S.forEach((L) => {
                L.CurrentInfo && L.CurrentInfo.OriginX !== void 0 && d.displays && d.displays[C] && (d.displays[C].positionX = L.CurrentInfo.OriginX), L.CurrentInfo && L.CurrentInfo.OriginY !== void 0 && d.displays && d.displays[C] && (d.displays[C].positionY = L.CurrentInfo.OriginY), C++;
              });
            }
            if (x.DisplayAnyUserSets && x.DisplayAnyUserSets.length > 0 && x.DisplayAnyUserSets[0].length > 0 && x.DisplayAnyUserSets[0][0].DisplayID) {
              const S = x.DisplayAnyUserSets[0];
              let C = 0;
              S.forEach((L) => {
                "OriginX" in L && d.displays && d.displays[C] && (d.displays[C].positionX = L.OriginX), "OriginY" in L && d.displays && d.displays[C] && (d.displays[C].positionY = L.OriginY), L.Mode && L.Mode.BitsPerPixel !== void 0 && d.displays && d.displays[C] && (d.displays[C].pixelDepth = L.Mode.BitsPerPixel), C++;
              });
            }
          } catch {
            D.noop();
          }
        }
        t && t(d), p(d);
      }), In && (D.isRaspberry() && Ft(`fbset -s 2> /dev/null | grep 'mode "' ; vcgencmd get_mem gpu 2> /dev/null; tvservice -s 2> /dev/null; tvservice -n 2> /dev/null;`, (y, g) => {
        const x = g.toString().split(`
`);
        if (x.length > 3 && x[0].indexOf('mode "') >= -1 && x[2].indexOf("0x12000a") > -1) {
          const S = x[0].replace("mode", "").replace(/"/g, "").trim().split("x");
          S.length === 2 && d.displays.push({
            vendor: "",
            model: D.getValue(x, "device_name", "="),
            main: !0,
            builtin: !1,
            connection: "HDMI",
            sizeX: null,
            sizeY: null,
            pixelDepth: null,
            resolutionX: parseInt(S[0], 10),
            resolutionY: parseInt(S[1], 10),
            currentResX: null,
            currentResY: null,
            positionX: 0,
            positionY: 0,
            currentRefreshRate: null
          });
        }
        x.length >= 1 && g.toString().indexOf("gpu=") >= -1 && d.controllers.push({
          vendor: "Broadcom",
          model: D.getRpiGpu(),
          bus: "",
          vram: D.getValue(x, "gpu", "=").replace("M", ""),
          vramDynamic: !0
        });
      }), Ft("lspci -vvv  2>/dev/null", (h, y) => {
        if (!h) {
          const x = y.toString().split(`
`);
          if (d.controllers.length === 0) {
            d.controllers = e(x);
            const S = o();
            d.controllers = d.controllers.map((C) => a(C, S.find((L) => L.pciBus.toLowerCase().endsWith(C.busAddress.toLowerCase())) || {}));
          }
        }
        Ft("clinfo --raw", (x, S) => {
          if (!x) {
            const L = S.toString().split(`
`);
            d.controllers = s(d.controllers, L);
          }
          Ft("xdpyinfo 2>/dev/null | grep 'depth of root window' | awk '{ print $5 }'", (L, V) => {
            let E = 0;
            if (!L) {
              const O = V.toString().split(`
`);
              E = parseInt(O[0]) || 0;
            }
            Ft("xrandr --verbose 2>/dev/null", (O, $) => {
              if (!O) {
                const ne = $.toString().split(`
`);
                d.displays = c(ne, E);
              }
              t && t(d), p(d);
            });
          });
        });
      })), (na || ia || sa) && (t && t(null), p(null)), ra && (t && t(null), p(null)), li)
        try {
          const m = [];
          m.push(D.powerShell("Get-CimInstance win32_VideoController | fl *")), m.push(
            D.powerShell(
              'gp "HKLM:\\SYSTEM\\ControlSet001\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\*" -ErrorAction SilentlyContinue | where MatchingDeviceId $null -NE | select MatchingDeviceId,HardwareInformation.qwMemorySize | fl'
            )
          ), m.push(D.powerShell("Get-CimInstance win32_desktopmonitor | fl *")), m.push(D.powerShell("Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorBasicDisplayParams | fl")), m.push(D.powerShell("Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Screen]::AllScreens")), m.push(D.powerShell("Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorConnectionParams | fl")), m.push(
            D.powerShell(
              'gwmi WmiMonitorID -Namespace root\\wmi | ForEach-Object {(($_.ManufacturerName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.ProductCodeID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.UserFriendlyName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.SerialNumberID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + $_.InstanceName}'
            )
          );
          const h = o();
          Promise.all(m).then((y) => {
            const g = y[0].replace(/\r/g, "").split(/\n\s*\n/), x = y[1].replace(/\r/g, "").split(/\n\s*\n/);
            d.controllers = u(g, x), d.controllers = d.controllers.map((O) => O.vendor.toLowerCase() === "nvidia" ? a(
              O,
              h.find(($) => {
                let ne = (O.subDeviceId || "").toLowerCase();
                const re = $.subDeviceId.split("x");
                let oe = re.length > 1 ? re[1].toLowerCase() : re[0].toLowerCase();
                const ae = Math.abs(ne.length - oe.length);
                if (ne.length > oe.length)
                  for (let b = 0; b < ae; b++)
                    oe = "0" + oe;
                else if (ne.length < oe.length)
                  for (let b = 0; b < ae; b++)
                    ne = "0" + ne;
                return ne === oe;
              }) || {}
            ) : O);
            const S = y[2].replace(/\r/g, "").split(/\n\s*\n/);
            S[0].trim() === "" && S.shift(), S.length && S[S.length - 1].trim() === "" && S.pop();
            const C = y[3].replace(/\r/g, "").split("Active ");
            C.shift();
            const L = y[4].replace(/\r/g, "").split("BitsPerPixel ");
            L.shift();
            const V = y[5].replace(/\r/g, "").split(/\n\s*\n/);
            V.shift();
            const E = y[6].replace(/\r/g, "").split(/\n/), U = [];
            E.forEach((O) => {
              const $ = O.split("|");
              $.length === 5 && U.push({
                vendor: $[0],
                code: $[1],
                model: $[2],
                serial: $[3],
                instanceId: $[4]
              });
            }), d.displays = f(L, C, S, V, U), d.displays.length === 1 && (nn && (d.displays[0].resolutionX = nn, d.displays[0].currentResX || (d.displays[0].currentResX = nn)), sn && (d.displays[0].resolutionY = sn, d.displays[0].currentResY === 0 && (d.displays[0].currentResY = sn)), _n && (d.displays[0].pixelDepth = _n)), d.displays = d.displays.map((O) => (On && !O.currentRefreshRate && (O.currentRefreshRate = On), O)), t && t(d), p(d);
          }).catch(() => {
            t && t(d), p(d);
          });
        } catch {
          t && t(d), p(d);
        }
    });
  });
  function u(p, d) {
    const m = {};
    for (const y in d)
      if ({}.hasOwnProperty.call(d, y) && d[y].trim() !== "") {
        const g = d[y].trim().split(`
`), x = D.getValue(g, "MatchingDeviceId").match(/PCI\\(VEN_[0-9A-F]{4})&(DEV_[0-9A-F]{4})(?:&(SUBSYS_[0-9A-F]{8}))?(?:&(REV_[0-9A-F]{2}))?/i);
        if (x) {
          const S = parseInt(D.getValue(g, "HardwareInformation.qwMemorySize"));
          if (!isNaN(S)) {
            let C = x[1].toUpperCase() + "&" + x[2].toUpperCase();
            x[3] && (C += "&" + x[3].toUpperCase()), x[4] && (C += "&" + x[4].toUpperCase()), m[C] = S;
          }
        }
      }
    const h = [];
    for (const y in p)
      if ({}.hasOwnProperty.call(p, y) && p[y].trim() !== "") {
        const g = p[y].trim().split(`
`), x = D.getValue(g, "PNPDeviceID", ":").match(/PCI\\(VEN_[0-9A-F]{4})&(DEV_[0-9A-F]{4})(?:&(SUBSYS_[0-9A-F]{8}))?(?:&(REV_[0-9A-F]{2}))?/i);
        let S = null, C = null;
        if (x) {
          if (S = x[3] || "", S && (S = S.split("_")[1]), C == null && x[3] && x[4]) {
            const L = x[1].toUpperCase() + "&" + x[2].toUpperCase() + "&" + x[3].toUpperCase() + "&" + x[4].toUpperCase();
            ({}).hasOwnProperty.call(m, L) && (C = m[L]);
          }
          if (C == null && x[3]) {
            const L = x[1].toUpperCase() + "&" + x[2].toUpperCase() + "&" + x[3].toUpperCase();
            ({}).hasOwnProperty.call(m, L) && (C = m[L]);
          }
          if (C == null && x[4]) {
            const L = x[1].toUpperCase() + "&" + x[2].toUpperCase() + "&" + x[4].toUpperCase();
            ({}).hasOwnProperty.call(m, L) && (C = m[L]);
          }
          if (C == null) {
            const L = x[1].toUpperCase() + "&" + x[2].toUpperCase();
            ({}).hasOwnProperty.call(m, L) && (C = m[L]);
          }
        }
        h.push({
          vendor: D.getValue(g, "AdapterCompatibility", ":"),
          model: D.getValue(g, "name", ":"),
          bus: D.getValue(g, "PNPDeviceID", ":").startsWith("PCI") ? "PCI" : "",
          vram: (C ?? D.toInt(D.getValue(g, "AdapterRAM", ":"))) / 1024 / 1024,
          vramDynamic: D.getValue(g, "VideoMemoryType", ":") === "2",
          subDeviceId: S
        }), nn = D.toInt(D.getValue(g, "CurrentHorizontalResolution", ":")) || nn, sn = D.toInt(D.getValue(g, "CurrentVerticalResolution", ":")) || sn, On = D.toInt(D.getValue(g, "CurrentRefreshRate", ":")) || On, _n = D.toInt(D.getValue(g, "CurrentBitsPerPixel", ":")) || _n;
      }
    return h;
  }
  function f(p, d, m, h, y) {
    const g = [];
    let x = "", S = "", C = "", L = 0, V = 0;
    if (m && m.length) {
      const E = m[0].split(`
`);
      x = D.getValue(E, "MonitorManufacturer", ":"), S = D.getValue(E, "Name", ":"), C = D.getValue(E, "PNPDeviceID", ":").replace(/&amp;/g, "&").toLowerCase(), L = D.toInt(D.getValue(E, "ScreenWidth", ":")), V = D.toInt(D.getValue(E, "ScreenHeight", ":"));
    }
    for (let E = 0; E < p.length; E++)
      if (p[E].trim() !== "") {
        p[E] = "BitsPerPixel " + p[E], d[E] = "Active " + d[E], (h.length === 0 || h[E] === void 0) && (h[E] = "Unknown");
        const U = p[E].split(`
`), O = d[E].split(`
`), $ = h[E].split(`
`), ne = D.getValue(U, "BitsPerPixel"), re = D.getValue(U, "Bounds").replace("{", "").replace("}", "").replace(/=/g, ":").split(","), oe = D.getValue(U, "Primary"), ae = D.getValue(O, "MaxHorizontalImageSize"), b = D.getValue(O, "MaxVerticalImageSize"), me = D.getValue(O, "InstanceName").toLowerCase(), z = D.getValue($, "VideoOutputTechnology"), ee = D.getValue(U, "DeviceName");
        let F = "", B = "";
        y.forEach((G) => {
          G.instanceId.toLowerCase().startsWith(me) && x.startsWith("(") && S.startsWith("PnP") && (F = G.vendor, B = G.model);
        }), g.push({
          vendor: me.startsWith(C) && F === "" ? x : F,
          model: me.startsWith(C) && B === "" ? S : B,
          deviceName: ee,
          main: oe.toLowerCase() === "true",
          builtin: z === "2147483648",
          connection: z && ts[z] ? ts[z] : "",
          resolutionX: D.toInt(D.getValue(re, "Width", ":")),
          resolutionY: D.toInt(D.getValue(re, "Height", ":")),
          sizeX: ae ? parseInt(ae, 10) : null,
          sizeY: b ? parseInt(b, 10) : null,
          pixelDepth: ne,
          currentResX: D.toInt(D.getValue(re, "Width", ":")),
          currentResY: D.toInt(D.getValue(re, "Height", ":")),
          positionX: D.toInt(D.getValue(re, "X", ":")),
          positionY: D.toInt(D.getValue(re, "Y", ":"))
        });
      }
    return p.length === 0 && g.push({
      vendor: x,
      model: S,
      main: !0,
      sizeX: null,
      sizeY: null,
      resolutionX: L,
      resolutionY: V,
      pixelDepth: null,
      currentResX: L,
      currentResY: V,
      positionX: 0,
      positionY: 0
    }), g;
  }
}
Js.graphics = ca;
var Dt = {};
const _ = T, is = ke, ua = Fe, fe = te.exec, Qe = te.execSync, pa = _.promisifySave(te.exec), rt = process.platform, _e = rt === "linux" || rt === "android", Ze = rt === "darwin", Qt = rt === "win32", Oe = rt === "freebsd", Pe = rt === "openbsd", ve = rt === "netbsd", Zt = rt === "sunos", Z = {}, W = {};
function fa(t, n) {
  _.isFunction(t) && (n = t, t = "");
  let e = [], s = [];
  function r(l) {
    if (!l.startsWith("/"))
      return "NFS";
    const c = l.split("/"), u = c[c.length - 1], f = e.filter((p) => p.indexOf(u) >= 0);
    return f.length === 1 && f[0].indexOf("APFS") >= 0 ? "APFS" : "HFS";
  }
  function i(l) {
    const c = ["rootfs", "unionfs", "squashfs", "cramfs", "initrd", "initramfs", "devtmpfs", "tmpfs", "udev", "devfs", "specfs", "type", "appimaged"];
    let u = !1;
    return c.forEach((f) => {
      l.toLowerCase().indexOf(f) >= 0 && (u = !0);
    }), u;
  }
  function o(l) {
    const c = l.toString().split(`
`);
    if (c.shift(), l.toString().toLowerCase().indexOf("filesystem")) {
      let u = 0;
      for (let f = 0; f < c.length; f++)
        c[f] && c[f].toLowerCase().startsWith("filesystem") && (u = f);
      for (let f = 0; f < u; f++)
        c.shift();
    }
    return c;
  }
  function a(l) {
    const c = [];
    return l.forEach((u) => {
      if (u !== "" && (u = u.replace(/ +/g, " ").split(" "), u && (u[0].startsWith("/") || u[6] && u[6] === "/" || u[0].indexOf("/") > 0 || u[0].indexOf(":") === 1 || !Ze && !i(u[1])))) {
        const f = u[0], p = _e || Oe || Pe || ve ? u[1] : r(u[0]), d = parseInt(_e || Oe || Pe || ve ? u[2] : u[1], 10) * 1024, m = parseInt(_e || Oe || Pe || ve ? u[3] : u[2], 10) * 1024, h = parseInt(_e || Oe || Pe || ve ? u[4] : u[3], 10) * 1024, y = parseFloat((100 * (m / (m + h))).toFixed(2)), g = s && Object.keys(s).length > 0 ? s[f] || !1 : null;
        u.splice(0, _e || Oe || Pe || ve ? 6 : 5);
        const x = u.join(" ");
        c.find((S) => S.fs === f && S.type === p && S.mount === x) || c.push({
          fs: f,
          type: p,
          size: d,
          used: m,
          available: h,
          use: y,
          mount: x,
          rw: g
        });
      }
    }), c;
  }
  return new Promise((l) => {
    process.nextTick(() => {
      let c = [];
      if (_e || Oe || Pe || ve || Ze) {
        let u = "";
        if (e = [], s = {}, Ze) {
          u = "df -kP";
          try {
            e = Qe("diskutil list").toString().split(`
`).filter((f) => !f.startsWith("/") && f.indexOf(":") > 0), Qe("mount").toString().split(`
`).filter((f) => f.startsWith("/")).forEach((f) => {
              s[f.split(" ")[0]] = f.toLowerCase().indexOf("read-only") === -1;
            });
          } catch {
            _.noop();
          }
        }
        if (_e)
          try {
            u = "export LC_ALL=C; df -kPTx squashfs; unset LC_ALL", Qe("cat /proc/mounts 2>/dev/null", _.execOptsLinux).toString().split(`
`).filter((f) => f.startsWith("/")).forEach((f) => {
              s[f.split(" ")[0]] = s[f.split(" ")[0]] || !1, f.toLowerCase().indexOf("/snap/") === -1 && (s[f.split(" ")[0]] = f.toLowerCase().indexOf("rw,") >= 0 || f.toLowerCase().indexOf(" rw ") >= 0);
            });
          } catch {
            _.noop();
          }
        if (Oe || Pe || ve)
          try {
            u = "df -kPT", Qe("mount").toString().split(`
`).forEach((f) => {
              s[f.split(" ")[0]] = f.toLowerCase().indexOf("read-only") === -1;
            });
          } catch {
            _.noop();
          }
        fe(u, { maxBuffer: 1024 * 1024 }, (f, p) => {
          const d = o(p);
          c = a(d), t && (c = c.filter((m) => m.fs.toLowerCase().indexOf(t.toLowerCase()) >= 0 || m.mount.toLowerCase().indexOf(t.toLowerCase()) >= 0)), (!f || c.length) && p.toString().trim() !== "" ? (n && n(c), l(c)) : fe("df -kPT 2>/dev/null", { maxBuffer: 1024 * 1024 }, (m, h) => {
            const y = o(h);
            c = a(y), n && n(c), l(c);
          });
        });
      }
      if (Zt && (n && n(c), l(c)), Qt)
        try {
          const u = t ? _.sanitizeShellString(t, !0) : "", f = `Get-WmiObject Win32_logicaldisk | select Access,Caption,FileSystem,FreeSpace,Size ${u ? "| where -property Caption -eq " + u : ""} | fl`;
          _.powerShell(f).then((p, d) => {
            d || p.toString().split(/\n\s*\n/).forEach((h) => {
              const y = h.split(`\r
`), g = _.toInt(_.getValue(y, "size", ":")), x = _.toInt(_.getValue(y, "freespace", ":")), S = _.getValue(y, "caption", ":"), C = _.getValue(y, "access", ":"), L = C ? _.toInt(C) !== 1 : null;
              g && c.push({
                fs: S,
                type: _.getValue(y, "filesystem", ":"),
                size: g,
                used: g - x,
                available: x,
                use: parseFloat((100 * (g - x) / g).toFixed(2)),
                mount: S,
                rw: L
              });
            }), n && n(c), l(c);
          });
        } catch {
          n && n(c), l(c);
        }
    });
  });
}
Dt.fsSize = fa;
function da(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = {
        max: null,
        allocated: null,
        available: null
      };
      (Oe || Pe || ve || Ze) && fe("sysctl -i kern.maxfiles kern.num_files kern.open_files", { maxBuffer: 1024 * 1024 }, (r, i) => {
        if (!r) {
          const o = i.toString().split(`
`);
          e.max = parseInt(_.getValue(o, "kern.maxfiles", ":"), 10), e.allocated = parseInt(_.getValue(o, "kern.num_files", ":"), 10) || parseInt(_.getValue(o, "kern.open_files", ":"), 10), e.available = e.max - e.allocated;
        }
        t && t(e), n(e);
      }), _e && is.readFile("/proc/sys/fs/file-nr", (s, r) => {
        if (s)
          is.readFile("/proc/sys/fs/file-max", (i, o) => {
            if (!i) {
              const a = o.toString().split(`
`);
              a[0] && (e.max = parseInt(a[0], 10));
            }
            t && t(e), n(e);
          });
        else {
          const i = r.toString().split(`
`);
          if (i[0]) {
            const o = i[0].replace(/\s+/g, " ").split(" ");
            o.length === 3 && (e.allocated = parseInt(o[0], 10), e.available = parseInt(o[1], 10), e.max = parseInt(o[2], 10), e.available || (e.available = e.max - e.allocated));
          }
          t && t(e), n(e);
        }
      }), Zt && (t && t(null), n(null)), Qt && (t && t(null), n(null));
    });
  });
}
Dt.fsOpenFiles = da;
function ma(t) {
  return parseInt(t.substr(t.indexOf(" (") + 2, t.indexOf(" Bytes)") - 10), 10);
}
function ga(t) {
  const n = [];
  let e = 0;
  return t.forEach((s) => {
    if (s.length > 0)
      if (s[0] === "*")
        e++;
      else {
        const r = s.split(":");
        r.length > 1 && (n[e] || (n[e] = {
          name: "",
          identifier: "",
          type: "disk",
          fsType: "",
          mount: "",
          size: 0,
          physical: "HDD",
          uuid: "",
          label: "",
          model: "",
          serial: "",
          removable: !1,
          protocol: "",
          group: "",
          device: ""
        }), r[0] = r[0].trim().toUpperCase().replace(/ +/g, ""), r[1] = r[1].trim(), r[0] === "DEVICEIDENTIFIER" && (n[e].identifier = r[1]), r[0] === "DEVICENODE" && (n[e].name = r[1]), r[0] === "VOLUMENAME" && r[1].indexOf("Not applicable") === -1 && (n[e].label = r[1]), r[0] === "PROTOCOL" && (n[e].protocol = r[1]), r[0] === "DISKSIZE" && (n[e].size = ma(r[1])), r[0] === "FILESYSTEMPERSONALITY" && (n[e].fsType = r[1]), r[0] === "MOUNTPOINT" && (n[e].mount = r[1]), r[0] === "VOLUMEUUID" && (n[e].uuid = r[1]), r[0] === "READ-ONLYMEDIA" && r[1] === "Yes" && (n[e].physical = "CD/DVD"), r[0] === "SOLIDSTATE" && r[1] === "Yes" && (n[e].physical = "SSD"), r[0] === "VIRTUAL" && (n[e].type = "virtual"), r[0] === "REMOVABLEMEDIA" && (n[e].removable = r[1] === "Removable"), r[0] === "PARTITIONTYPE" && (n[e].type = "part"), r[0] === "DEVICE/MEDIANAME" && (n[e].model = r[1]));
      }
  }), n;
}
function Li(t) {
  let n = [];
  return t.filter((e) => e !== "").forEach((e) => {
    try {
      e = decodeURIComponent(e.replace(/\\x/g, "%")), e = e.replace(/\\/g, "\\\\");
      const s = JSON.parse(e);
      n.push({
        name: _.sanitizeShellString(s.name),
        type: s.type,
        fsType: s.fsType,
        mount: s.mountpoint,
        size: parseInt(s.size, 10),
        physical: s.type === "disk" ? s.rota === "0" ? "SSD" : "HDD" : s.type === "rom" ? "CD/DVD" : "",
        uuid: s.uuid,
        label: s.label,
        model: (s.model || "").trim(),
        serial: s.serial,
        removable: s.rm === "1",
        protocol: s.tran,
        group: s.group || ""
      });
    } catch {
      _.noop();
    }
  }), n = _.unique(n), n = _.sortByKey(n, ["type", "name"]), n;
}
function ha(t) {
  const n = _.getValue(t, "md_level", "="), e = _.getValue(t, "md_name", "="), s = _.getValue(t, "md_uuid", "="), r = [];
  return t.forEach((i) => {
    i.toLowerCase().startsWith("md_device_dev") && i.toLowerCase().indexOf("/dev/") > 0 && r.push(i.split("/dev/")[1]);
  }), {
    raid: n,
    label: e,
    uuid: s,
    members: r
  };
}
function ss(t) {
  let n = t;
  try {
    t.forEach((e) => {
      if (e.type.startsWith("raid")) {
        const s = Qe(`mdadm --export --detail /dev/${e.name}`, _.execOptsLinux).toString().split(`
`), r = ha(s);
        e.label = r.label, e.uuid = r.uuid, r && r.members && r.members.length && r.raid === e.type && (n = n.map((i) => (i.fsType === "linux_raid_member" && r.members.indexOf(i.name) >= 0 && (i.group = e.name), i)));
      }
    });
  } catch {
    _.noop();
  }
  return n;
}
function xa(t) {
  const n = [];
  return t.forEach((e) => {
    e.type.startsWith("disk") && n.push(e.name);
  }), n;
}
function ya(t) {
  let n = t;
  try {
    const e = xa(t);
    n = n.map((s) => ((s.type.startsWith("part") || s.type.startsWith("disk")) && e.forEach((r) => {
      s.name.startsWith(r) && (s.device = "/dev/" + r);
    }), s));
  } catch {
    _.noop();
  }
  return n;
}
function Sa(t) {
  const n = [];
  return t.forEach((e) => {
    if (e.type.startsWith("disk") && n.push({ name: e.name, model: e.model, device: e.name }), e.type.startsWith("virtual")) {
      let s = "";
      n.forEach((r) => {
        r.model === e.model && (s = r.device);
      }), s && n.push({ name: e.name, model: e.model, device: s });
    }
  }), n;
}
function Ca(t) {
  let n = t;
  try {
    const e = Sa(t);
    n = n.map((s) => ((s.type.startsWith("part") || s.type.startsWith("disk") || s.type.startsWith("virtual")) && e.forEach((r) => {
      s.name.startsWith(r.name) && (s.device = r.device);
    }), s));
  } catch {
    _.noop();
  }
  return n;
}
function La(t) {
  const n = [];
  return t.forEach((e) => {
    const s = e.split(`\r
`), r = _.getValue(s, "DeviceID", ":");
    let i = e.split("@{DeviceID=");
    i.length > 1 && (i = i.slice(1), i.forEach((o) => {
      n.push({ name: o.split(";")[0].toUpperCase(), device: r });
    }));
  }), n;
}
function wa(t, n) {
  const e = La(n);
  return t.map((s) => {
    const r = e.filter((i) => i.name === s.name.toUpperCase());
    return r.length > 0 && (s.device = r[0].device), s;
  }), t;
}
function wi(t) {
  return t.toString().replace(/NAME=/g, '{"name":').replace(/FSTYPE=/g, ',"fsType":').replace(/TYPE=/g, ',"type":').replace(/SIZE=/g, ',"size":').replace(/MOUNTPOINT=/g, ',"mountpoint":').replace(/UUID=/g, ',"uuid":').replace(/ROTA=/g, ',"rota":').replace(/RO=/g, ',"ro":').replace(/RM=/g, ',"rm":').replace(/TRAN=/g, ',"tran":').replace(/SERIAL=/g, ',"serial":').replace(/LABEL=/g, ',"label":').replace(/MODEL=/g, ',"model":').replace(/OWNER=/g, ',"owner":').replace(/GROUP=/g, ',"group":').replace(/\n/g, `}
`);
}
function Ia(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (_e && fe("lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,TRAN,SERIAL,LABEL,MODEL,OWNER 2>/dev/null", { maxBuffer: 1048576 }, (r, i) => {
        if (r)
          fe("lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,LABEL,MODEL,OWNER 2>/dev/null", { maxBuffer: 1048576 }, (a, l) => {
            if (!a) {
              const c = wi(l).split(`
`);
              e = Li(c), e = ss(e);
            }
            t && t(e), n(e);
          }).on("error", () => {
            t && t(e), n(e);
          });
        else {
          const o = wi(i).split(`
`);
          e = Li(o), e = ss(e), e = ya(e), t && t(e), n(e);
        }
      }).on("error", () => {
        t && t(e), n(e);
      }), Ze && fe("diskutil info -all", { maxBuffer: 1048576 }, (r, i) => {
        if (!r) {
          const o = i.toString().split(`
`);
          e = ga(o), e = Ca(e);
        }
        t && t(e), n(e);
      }).on("error", () => {
        t && t(e), n(e);
      }), Zt && (t && t(e), n(e)), Qt) {
        const s = ["Unknown", "NoRoot", "Removable", "Local", "Network", "CD/DVD", "RAM"];
        try {
          const r = [];
          r.push(_.powerShell("Get-CimInstance -ClassName Win32_LogicalDisk | select Caption,DriveType,Name,FileSystem,Size,VolumeSerialNumber,VolumeName | fl")), r.push(
            _.powerShell(
              "Get-WmiObject -Class Win32_diskdrive | Select-Object -Property PNPDeviceId,DeviceID, Model, Size, @{L='Partitions'; E={$_.GetRelated('Win32_DiskPartition').GetRelated('Win32_LogicalDisk') | Select-Object -Property DeviceID, VolumeName, Size, FreeSpace}} | fl"
            )
          ), _.promiseAll(r).then((i) => {
            const o = i.results[0].toString().split(/\n\s*\n/), a = i.results[1].toString().split(/\n\s*\n/);
            o.forEach((l) => {
              const c = l.split(`\r
`), u = _.getValue(c, "drivetype", ":");
              u && e.push({
                name: _.getValue(c, "name", ":"),
                identifier: _.getValue(c, "caption", ":"),
                type: "disk",
                fsType: _.getValue(c, "filesystem", ":").toLowerCase(),
                mount: _.getValue(c, "caption", ":"),
                size: _.getValue(c, "size", ":"),
                physical: u >= 0 && u <= 6 ? s[u] : s[0],
                uuid: _.getValue(c, "volumeserialnumber", ":"),
                label: _.getValue(c, "volumename", ":"),
                model: "",
                serial: _.getValue(c, "volumeserialnumber", ":"),
                removable: u === "2",
                protocol: "",
                group: "",
                device: ""
              });
            }), e = wa(e, a), t && t(e), n(e);
          });
        } catch {
          t && t(e), n(e);
        }
      }
      (Oe || Pe || ve) && (t && t(null), n(null));
    });
  });
}
Dt.blockDevices = Ia;
function rs(t, n) {
  const e = {
    rx: 0,
    wx: 0,
    tx: 0,
    rx_sec: null,
    wx_sec: null,
    tx_sec: null,
    ms: 0
  };
  return Z && Z.ms ? (e.rx = t, e.wx = n, e.tx = e.rx + e.wx, e.ms = Date.now() - Z.ms, e.rx_sec = (e.rx - Z.bytes_read) / (e.ms / 1e3), e.wx_sec = (e.wx - Z.bytes_write) / (e.ms / 1e3), e.tx_sec = e.rx_sec + e.wx_sec, Z.rx_sec = e.rx_sec, Z.wx_sec = e.wx_sec, Z.tx_sec = e.tx_sec, Z.bytes_read = e.rx, Z.bytes_write = e.wx, Z.bytes_overall = e.rx + e.wx, Z.ms = Date.now(), Z.last_ms = e.ms) : (e.rx = t, e.wx = n, e.tx = e.rx + e.wx, Z.rx_sec = null, Z.wx_sec = null, Z.tx_sec = null, Z.bytes_read = e.rx, Z.bytes_write = e.wx, Z.bytes_overall = e.rx + e.wx, Z.ms = Date.now(), Z.last_ms = 0), e;
}
function _a(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      if (Qt || Oe || Pe || ve || Zt)
        return n(null);
      let e = {
        rx: 0,
        wx: 0,
        tx: 0,
        rx_sec: null,
        wx_sec: null,
        tx_sec: null,
        ms: 0
      }, s = 0, r = 0;
      Z && !Z.ms || Z && Z.ms && Date.now() - Z.ms >= 500 ? (_e && fe("lsblk -r 2>/dev/null | grep /", { maxBuffer: 1048576 }, (o, a) => {
        if (o)
          t && t(e), n(e);
        else {
          const l = a.toString().split(`
`), c = [];
          l.forEach((p) => {
            p !== "" && (p = p.trim().split(" "), c.indexOf(p[0]) === -1 && c.push(p[0]));
          });
          const u = c.join("|");
          fe('cat /proc/diskstats | egrep "' + u + '"', { maxBuffer: 1024 * 1024 }, (p, d) => {
            p || (d.toString().split(`
`).forEach((h) => {
              h = h.trim(), h !== "" && (h = h.replace(/ +/g, " ").split(" "), s += parseInt(h[5], 10) * 512, r += parseInt(h[9], 10) * 512);
            }), e = rs(s, r)), t && t(e), n(e);
          }).on("error", () => {
            t && t(e), n(e);
          });
        }
      }).on("error", () => {
        t && t(e), n(e);
      }), Ze && fe(
        `ioreg -c IOBlockStorageDriver -k Statistics -r -w0 | sed -n "/IOBlockStorageDriver/,/Statistics/p" | grep "Statistics" | tr -cd "01234567890,
"`,
        { maxBuffer: 1048576 },
        (o, a) => {
          o || (a.toString().split(`
`).forEach((c) => {
            c = c.trim(), c !== "" && (c = c.split(","), s += parseInt(c[2], 10), r += parseInt(c[9], 10));
          }), e = rs(s, r)), t && t(e), n(e);
        }
      ).on("error", () => {
        t && t(e), n(e);
      })) : (e.ms = Z.last_ms, e.rx = Z.bytes_read, e.wx = Z.bytes_write, e.tx = Z.bytes_read + Z.bytes_write, e.rx_sec = Z.rx_sec, e.wx_sec = Z.wx_sec, e.tx_sec = Z.tx_sec, t && t(e), n(e));
    });
  });
}
Dt.fsStats = _a;
function os(t, n, e, s, r) {
  const i = {
    rIO: 0,
    wIO: 0,
    tIO: 0,
    rIO_sec: null,
    wIO_sec: null,
    tIO_sec: null,
    rWaitTime: 0,
    wWaitTime: 0,
    tWaitTime: 0,
    rWaitPercent: null,
    wWaitPercent: null,
    tWaitPercent: null,
    ms: 0
  };
  return W && W.ms ? (i.rIO = t, i.wIO = n, i.tIO = t + n, i.ms = Date.now() - W.ms, i.rIO_sec = (i.rIO - W.rIO) / (i.ms / 1e3), i.wIO_sec = (i.wIO - W.wIO) / (i.ms / 1e3), i.tIO_sec = i.rIO_sec + i.wIO_sec, i.rWaitTime = e, i.wWaitTime = s, i.tWaitTime = r, i.rWaitPercent = (i.rWaitTime - W.rWaitTime) * 100 / i.ms, i.wWaitPercent = (i.wWaitTime - W.wWaitTime) * 100 / i.ms, i.tWaitPercent = (i.tWaitTime - W.tWaitTime) * 100 / i.ms, W.rIO = t, W.wIO = n, W.rIO_sec = i.rIO_sec, W.wIO_sec = i.wIO_sec, W.tIO_sec = i.tIO_sec, W.rWaitTime = e, W.wWaitTime = s, W.tWaitTime = r, W.rWaitPercent = i.rWaitPercent, W.wWaitPercent = i.wWaitPercent, W.tWaitPercent = i.tWaitPercent, W.last_ms = i.ms, W.ms = Date.now()) : (i.rIO = t, i.wIO = n, i.tIO = t + n, i.rWaitTime = e, i.wWaitTime = s, i.tWaitTime = r, W.rIO = t, W.wIO = n, W.rIO_sec = null, W.wIO_sec = null, W.tIO_sec = null, W.rWaitTime = e, W.wWaitTime = s, W.tWaitTime = r, W.rWaitPercent = null, W.wWaitPercent = null, W.tWaitPercent = null, W.last_ms = 0, W.ms = Date.now()), i;
}
function Oa(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      if (Qt || Zt)
        return n(null);
      let e = {
        rIO: 0,
        wIO: 0,
        tIO: 0,
        rIO_sec: null,
        wIO_sec: null,
        tIO_sec: null,
        rWaitTime: 0,
        wWaitTime: 0,
        tWaitTime: 0,
        rWaitPercent: null,
        wWaitPercent: null,
        tWaitPercent: null,
        ms: 0
      }, s = 0, r = 0, i = 0, o = 0, a = 0;
      W && !W.ms || W && W.ms && Date.now() - W.ms >= 500 ? ((_e || Oe || Pe || ve) && fe('for mount in `lsblk 2>/dev/null | grep " disk " | sed "s/[│└─├]//g" | awk \'{$1=$1};1\' | cut -d " " -f 1 | sort -u`; do cat /sys/block/$mount/stat | sed -r "s/ +/;/g" | sed -r "s/^;//"; done', { maxBuffer: 1024 * 1024 }, (c, u) => {
        c ? (t && t(e), n(e)) : (u.split(`
`).forEach((p) => {
          if (!p)
            return;
          const d = p.split(";");
          s += parseInt(d[0], 10), r += parseInt(d[4], 10), i += parseInt(d[3], 10), o += parseInt(d[7], 10), a += parseInt(d[10], 10);
        }), e = os(s, r, i, o, a), t && t(e), n(e));
      }), Ze && fe(
        `ioreg -c IOBlockStorageDriver -k Statistics -r -w0 | sed -n "/IOBlockStorageDriver/,/Statistics/p" | grep "Statistics" | tr -cd "01234567890,
"`,
        { maxBuffer: 1024 * 1024 },
        (l, c) => {
          l || (c.toString().split(`
`).forEach((f) => {
            f = f.trim(), f !== "" && (f = f.split(","), s += parseInt(f[10], 10), r += parseInt(f[0], 10));
          }), e = os(s, r, i, o, a)), t && t(e), n(e);
        }
      )) : (e.rIO = W.rIO, e.wIO = W.wIO, e.tIO = W.rIO + W.wIO, e.ms = W.last_ms, e.rIO_sec = W.rIO_sec, e.wIO_sec = W.wIO_sec, e.tIO_sec = W.tIO_sec, e.rWaitTime = W.rWaitTime, e.wWaitTime = W.wWaitTime, e.tWaitTime = W.tWaitTime, e.rWaitPercent = W.rWaitPercent, e.wWaitPercent = W.wWaitPercent, e.tWaitPercent = W.tWaitPercent, t && t(e), n(e));
    });
  });
}
Dt.disksIO = Oa;
function Pa(t) {
  function n(e) {
    const s = [
      { pattern: "WESTERN.*", manufacturer: "Western Digital" },
      { pattern: "^WDC.*", manufacturer: "Western Digital" },
      { pattern: "WD.*", manufacturer: "Western Digital" },
      { pattern: "TOSHIBA.*", manufacturer: "Toshiba" },
      { pattern: "HITACHI.*", manufacturer: "Hitachi" },
      { pattern: "^IC.*", manufacturer: "Hitachi" },
      { pattern: "^HTS.*", manufacturer: "Hitachi" },
      { pattern: "SANDISK.*", manufacturer: "SanDisk" },
      { pattern: "KINGSTON.*", manufacturer: "Kingston Technology" },
      { pattern: "^SONY.*", manufacturer: "Sony" },
      { pattern: "TRANSCEND.*", manufacturer: "Transcend" },
      { pattern: "SAMSUNG.*", manufacturer: "Samsung" },
      { pattern: "^ST(?!I\\ ).*", manufacturer: "Seagate" },
      { pattern: "^STI\\ .*", manufacturer: "SimpleTech" },
      { pattern: "^D...-.*", manufacturer: "IBM" },
      { pattern: "^IBM.*", manufacturer: "IBM" },
      { pattern: "^FUJITSU.*", manufacturer: "Fujitsu" },
      { pattern: "^MP.*", manufacturer: "Fujitsu" },
      { pattern: "^MK.*", manufacturer: "Toshiba" },
      { pattern: "MAXTO.*", manufacturer: "Maxtor" },
      { pattern: "PIONEER.*", manufacturer: "Pioneer" },
      { pattern: "PHILIPS.*", manufacturer: "Philips" },
      { pattern: "QUANTUM.*", manufacturer: "Quantum Technology" },
      { pattern: "FIREBALL.*", manufacturer: "Quantum Technology" },
      { pattern: "^VBOX.*", manufacturer: "VirtualBox" },
      { pattern: "CORSAIR.*", manufacturer: "Corsair Components" },
      { pattern: "CRUCIAL.*", manufacturer: "Crucial" },
      { pattern: "ECM.*", manufacturer: "ECM" },
      { pattern: "INTEL.*", manufacturer: "INTEL" },
      { pattern: "EVO.*", manufacturer: "Samsung" },
      { pattern: "APPLE.*", manufacturer: "Apple" }
    ];
    let r = "";
    return e && (e = e.toUpperCase(), s.forEach((i) => {
      RegExp(i.pattern).test(e) && (r = i.manufacturer);
    })), r;
  }
  return new Promise((e) => {
    process.nextTick(() => {
      const s = (o) => {
        for (let a = 0; a < o.length; a++)
          delete o[a].BSDName;
        t && t(o), e(o);
      }, r = [];
      let i = "";
      if (_e) {
        let o = "";
        fe("export LC_ALL=C; lsblk -ablJO 2>/dev/null; unset LC_ALL", { maxBuffer: 1024 * 1024 }, (a, l) => {
          if (!a)
            try {
              const c = l.toString().trim();
              let u = [];
              try {
                const f = JSON.parse(c);
                f && {}.hasOwnProperty.call(f, "blockdevices") && (u = f.blockdevices.filter((p) => p.type === "disk" && p.size > 0 && (p.model !== null || p.mountpoint === null && p.label === null && p.fstype === null && p.parttype === null && p.path && p.path.indexOf("/ram") !== 0 && p.path.indexOf("/loop") !== 0 && p["disc-max"] && p["disc-max"] !== 0)));
              } catch {
                try {
                  const f = Qe(
                    "export LC_ALL=C; lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,LABEL,MODEL,OWNER,GROUP 2>/dev/null; unset LC_ALL",
                    _.execOptsLinux
                  ).toString(), p = wi(f).split(`
`);
                  u = Li(p).filter((m) => m.type === "disk" && m.size > 0 && (m.model !== null && m.model !== "" || m.mount === "" && m.label === "" && m.fsType === ""));
                } catch {
                  _.noop();
                }
              }
              u.forEach((f) => {
                let p = "";
                const d = "/dev/" + f.name, m = f.name;
                try {
                  p = Qe("cat /sys/block/" + m + "/queue/rotational 2>/dev/null", _.execOptsLinux).toString().split(`
`)[0];
                } catch {
                  _.noop();
                }
                let h = f.tran ? f.tran.toUpperCase().trim() : "";
                h === "NVME" && (p = "2", h = "PCIe"), r.push({
                  device: d,
                  type: p === "0" ? "SSD" : p === "1" ? "HD" : p === "2" ? "NVMe" : f.model && f.model.indexOf("SSD") > -1 ? "SSD" : f.model && f.model.indexOf("NVM") > -1 ? "NVMe" : "HD",
                  name: f.model || "",
                  vendor: n(f.model) || (f.vendor ? f.vendor.trim() : ""),
                  size: f.size || 0,
                  bytesPerSector: null,
                  totalCylinders: null,
                  totalHeads: null,
                  totalSectors: null,
                  totalTracks: null,
                  tracksPerCylinder: null,
                  sectorsPerTrack: null,
                  firmwareRevision: f.rev ? f.rev.trim() : "",
                  serialNum: f.serial ? f.serial.trim() : "",
                  interfaceType: h,
                  smartStatus: "unknown",
                  temperature: null,
                  BSDName: d
                }), i += `printf "
${d}|"; smartctl -H ${d} | grep overall;`, o += `${o ? 'printf ",";' : ""}smartctl -a -j ${d};`;
              });
            } catch {
              _.noop();
            }
          o ? fe(o, { maxBuffer: 1024 * 1024 }, (c, u) => {
            try {
              JSON.parse(`[${u}]`).forEach((p) => {
                const d = p.smartctl.argv[p.smartctl.argv.length - 1];
                for (let m = 0; m < r.length; m++)
                  r[m].BSDName === d && (r[m].smartStatus = p.smart_status.passed ? "Ok" : p.smart_status.passed === !1 ? "Predicted Failure" : "unknown", p.temperature && p.temperature.current && (r[m].temperature = p.temperature.current), r[m].smartData = p);
              }), s(r);
            } catch {
              i ? (i = i + `printf "
"`, fe(i, { maxBuffer: 1024 * 1024 }, (f, p) => {
                p.toString().split(`
`).forEach((m) => {
                  if (m) {
                    const h = m.split("|");
                    if (h.length === 2) {
                      const y = h[0];
                      h[1] = h[1].trim();
                      const g = h[1].split(":");
                      if (g.length === 2) {
                        g[1] = g[1].trim();
                        const x = g[1].toLowerCase();
                        for (let S = 0; S < r.length; S++)
                          r[S].BSDName === y && (r[S].smartStatus = x === "passed" ? "Ok" : x === "failed!" ? "Predicted Failure" : "unknown");
                      }
                    }
                  }
                }), s(r);
              })) : s(r);
            }
          }) : s(r);
        });
      }
      if ((Oe || Pe || ve) && (t && t(r), e(r)), Zt && (t && t(r), e(r)), Ze) {
        let o = "";
        fe(`system_profiler SPSerialATADataType SPNVMeDataType ${parseInt(ua.release(), 10) > 24 ? "SPUSBHostDataType" : "SPUSBDataType"} `, { maxBuffer: 1024 * 1024 }, (a, l) => {
          if (a)
            s(r);
          else {
            const c = l.toString().split(`
`), u = [], f = [], p = [];
            let d = "SATA";
            c.forEach((m) => {
              m === "NVMExpress:" ? d = "NVMe" : m === "USB:" ? d = "USB" : m === "SATA/SATA Express:" ? d = "SATA" : d === "SATA" ? u.push(m) : d === "NVMe" ? f.push(m) : d === "USB" && p.push(m);
            });
            try {
              const m = u.join(`
`).split(" Physical Interconnect: ");
              m.shift(), m.forEach((h) => {
                h = "InterfaceType: " + h;
                const y = h.split(`
`), g = _.getValue(y, "Medium Type", ":", !0).trim(), x = _.getValue(y, "capacity", ":", !0).trim(), S = _.getValue(y, "BSD Name", ":", !0).trim();
                if (x) {
                  let C = 0;
                  if (x.indexOf("(") >= 0 && (C = parseInt(
                    x.match(/\(([^)]+)\)/)[1].replace(/\./g, "").replace(/,/g, "").replace(/\s/g, ""),
                    10
                  )), C || (C = parseInt(x, 10)), C) {
                    const L = _.getValue(y, "S.M.A.R.T. status", ":", !0).trim().toLowerCase();
                    r.push({
                      device: S,
                      type: g.startsWith("Solid") ? "SSD" : "HD",
                      name: _.getValue(y, "Model", ":", !0).trim(),
                      vendor: n(_.getValue(y, "Model", ":", !0).trim()) || _.getValue(y, "Manufacturer", ":", !0),
                      size: C,
                      bytesPerSector: null,
                      totalCylinders: null,
                      totalHeads: null,
                      totalSectors: null,
                      totalTracks: null,
                      tracksPerCylinder: null,
                      sectorsPerTrack: null,
                      firmwareRevision: _.getValue(y, "Revision", ":", !0).trim(),
                      serialNum: _.getValue(y, "Serial Number", ":", !0).trim(),
                      interfaceType: _.getValue(y, "InterfaceType", ":", !0).trim(),
                      smartStatus: L === "verified" ? "OK" : L || "unknown",
                      temperature: null,
                      BSDName: S
                    }), i = i + `printf "
` + S + '|"; diskutil info /dev/' + S + " | grep SMART;", o += `${o ? 'printf ",";' : ""}smartctl -a -j ${S};`;
                  }
                }
              });
            } catch {
              _.noop();
            }
            try {
              const m = f.join(`
`).split(`

          Capacity:`);
              m.shift(), m.forEach((h) => {
                h = `!Capacity: ${h}`;
                const y = h.split(`
`), g = _.getValue(y, "link width", ":", !0).trim(), x = _.getValue(y, "!capacity", ":", !0).trim(), S = _.getValue(y, "BSD Name", ":", !0).trim();
                if (x) {
                  let C = 0;
                  if (x.indexOf("(") >= 0 && (C = parseInt(
                    x.match(/\(([^)]+)\)/)[1].replace(/\./g, "").replace(/,/g, "").replace(/\s/g, ""),
                    10
                  )), C || (C = parseInt(x, 10)), C) {
                    const L = _.getValue(y, "S.M.A.R.T. status", ":", !0).trim().toLowerCase();
                    r.push({
                      device: S,
                      type: "NVMe",
                      name: _.getValue(y, "Model", ":", !0).trim(),
                      vendor: n(_.getValue(y, "Model", ":", !0).trim()),
                      size: C,
                      bytesPerSector: null,
                      totalCylinders: null,
                      totalHeads: null,
                      totalSectors: null,
                      totalTracks: null,
                      tracksPerCylinder: null,
                      sectorsPerTrack: null,
                      firmwareRevision: _.getValue(y, "Revision", ":", !0).trim(),
                      serialNum: _.getValue(y, "Serial Number", ":", !0).trim(),
                      interfaceType: ("PCIe " + g).trim(),
                      smartStatus: L === "verified" ? "OK" : L || "unknown",
                      temperature: null,
                      BSDName: S
                    }), i = `${i}printf "
${S}|"; diskutil info /dev/${S} | grep SMART;`, o += `${o ? 'printf ",";' : ""}smartctl -a -j ${S};`;
                  }
                }
              });
            } catch {
              _.noop();
            }
            try {
              const m = p.join(`
`).replaceAll(`Media:
 `, "Model:").split(`

          Product ID:`);
              m.shift(), m.forEach((h) => {
                const y = h.split(`
`), g = _.getValue(y, "Capacity", ":", !0).trim(), x = _.getValue(y, "BSD Name", ":", !0).trim();
                if (g) {
                  let S = 0;
                  if (g.indexOf("(") >= 0 && (S = parseInt(
                    g.match(/\(([^)]+)\)/)[1].replace(/\./g, "").replace(/,/g, "").replace(/\s/g, ""),
                    10
                  )), S || (S = parseInt(g, 10)), S) {
                    const C = _.getValue(y, "S.M.A.R.T. status", ":", !0).trim().toLowerCase();
                    r.push({
                      device: x,
                      type: "USB",
                      name: _.getValue(y, "Model", ":", !0).trim().replaceAll(":", ""),
                      vendor: n(_.getValue(y, "Model", ":", !0).trim()),
                      size: S,
                      bytesPerSector: null,
                      totalCylinders: null,
                      totalHeads: null,
                      totalSectors: null,
                      totalTracks: null,
                      tracksPerCylinder: null,
                      sectorsPerTrack: null,
                      firmwareRevision: _.getValue(y, "Revision", ":", !0).trim(),
                      serialNum: _.getValue(y, "Serial Number", ":", !0).trim(),
                      interfaceType: "USB",
                      smartStatus: C === "verified" ? "OK" : C || "unknown",
                      temperature: null,
                      BSDName: x
                    }), i = i + `printf "
` + x + '|"; diskutil info /dev/' + x + " | grep SMART;", o += `${o ? 'printf ",";' : ""}smartctl -a -j ${x};`;
                  }
                }
              });
            } catch {
              _.noop();
            }
            o ? fe(o, { maxBuffer: 1024 * 1024 }, (m, h) => {
              try {
                JSON.parse(`[${h}]`).forEach((g) => {
                  const x = g.smartctl.argv[g.smartctl.argv.length - 1];
                  for (let S = 0; S < r.length; S++)
                    r[S].BSDName === x && (r[S].smartStatus = g.smart_status.passed ? "Ok" : g.smart_status.passed === !1 ? "Predicted Failure" : "unknown", g.temperature && g.temperature.current && (r[S].temperature = g.temperature.current), r[S].smartData = g);
                }), s(r);
              } catch {
                i ? (i = i + `printf "
"`, fe(i, { maxBuffer: 1024 * 1024 }, (g, x) => {
                  x.toString().split(`
`).forEach((C) => {
                    if (C) {
                      const L = C.split("|");
                      if (L.length === 2) {
                        const V = L[0];
                        L[1] = L[1].trim();
                        const E = L[1].split(":");
                        if (E.length === 2) {
                          E[1] = E[1].trim();
                          const U = E[1].toLowerCase();
                          for (let O = 0; O < r.length; O++)
                            r[O].BSDName === V && (r[O].smartStatus = U === "passed" ? "Ok" : U === "failed!" ? "Predicted Failure" : "unknown");
                        }
                      }
                    }
                  }), s(r);
                })) : s(r);
              }
            }) : i ? (i = i + `printf "
"`, fe(i, { maxBuffer: 1024 * 1024 }, (m, h) => {
              h.toString().split(`
`).forEach((g) => {
                if (g) {
                  const x = g.split("|");
                  if (x.length === 2) {
                    const S = x[0];
                    x[1] = x[1].trim();
                    const C = x[1].split(":");
                    if (C.length === 2) {
                      C[1] = C[1].trim();
                      const L = C[1].toLowerCase();
                      for (let V = 0; V < r.length; V++)
                        r[V].BSDName === S && (r[V].smartStatus = L === "not supported" ? "not supported" : L === "verified" ? "Ok" : L === "failing" ? "Predicted Failure" : "unknown");
                    }
                  }
                }
              }), s(r);
            })) : s(r);
          }
        });
      }
      if (Qt)
        try {
          const o = [];
          if (o.push(
            _.powerShell(
              "Get-CimInstance Win32_DiskDrive | select Caption,Size,Status,PNPDeviceId,DeviceId,BytesPerSector,TotalCylinders,TotalHeads,TotalSectors,TotalTracks,TracksPerCylinder,SectorsPerTrack,FirmwareRevision,SerialNumber,InterfaceType | fl"
            )
          ), o.push(_.powerShell("Get-PhysicalDisk | select BusType,MediaType,FriendlyName,Model,SerialNumber,Size | fl")), _.smartMonToolsInstalled())
            try {
              const a = JSON.parse(Qe("smartctl --scan -j").toString());
              a && a.devices && a.devices.length > 0 && a.devices.forEach((l) => {
                o.push(pa(`smartctl -j -a ${l.name}`, _.execOptsWin));
              });
            } catch {
              _.noop();
            }
          _.promiseAll(o).then((a) => {
            let l = a.results[0].toString().split(/\n\s*\n/);
            l.forEach((c) => {
              const u = c.split(`\r
`), f = _.getValue(u, "Size", ":").trim(), p = _.getValue(u, "Status", ":").trim().toLowerCase();
              f && r.push({
                device: _.getValue(u, "DeviceId", ":"),
                // changed from PNPDeviceId to DeviceID (be be able to match devices)
                type: c.indexOf("SSD") > -1 ? "SSD" : "HD",
                // just a starting point ... better: MSFT_PhysicalDisk - Media Type ... see below
                name: _.getValue(u, "Caption", ":"),
                vendor: n(_.getValue(u, "Caption", ":", !0).trim()),
                size: parseInt(f, 10),
                bytesPerSector: parseInt(_.getValue(u, "BytesPerSector", ":"), 10),
                totalCylinders: parseInt(_.getValue(u, "TotalCylinders", ":"), 10),
                totalHeads: parseInt(_.getValue(u, "TotalHeads", ":"), 10),
                totalSectors: parseInt(_.getValue(u, "TotalSectors", ":"), 10),
                totalTracks: parseInt(_.getValue(u, "TotalTracks", ":"), 10),
                tracksPerCylinder: parseInt(_.getValue(u, "TracksPerCylinder", ":"), 10),
                sectorsPerTrack: parseInt(_.getValue(u, "SectorsPerTrack", ":"), 10),
                firmwareRevision: _.getValue(u, "FirmwareRevision", ":").trim(),
                serialNum: _.getValue(u, "SerialNumber", ":").trim(),
                interfaceType: _.getValue(u, "InterfaceType", ":").trim(),
                smartStatus: p === "ok" ? "Ok" : p === "degraded" ? "Degraded" : p === "pred fail" ? "Predicted Failure" : "Unknown",
                temperature: null
              });
            }), l = a.results[1].split(/\n\s*\n/), l.forEach((c) => {
              const u = c.split(`\r
`), f = _.getValue(u, "SerialNumber", ":").trim(), p = _.getValue(u, "FriendlyName", ":").trim().replace("Msft ", "Microsoft"), d = _.getValue(u, "Size", ":").trim(), m = _.getValue(u, "Model", ":").trim(), h = _.getValue(u, "BusType", ":").trim();
              let y = _.getValue(u, "MediaType", ":").trim();
              if ((y === "3" || y === "HDD") && (y = "HD"), y === "4" && (y = "SSD"), y === "5" && (y = "SCM"), y === "Unspecified" && (m.toLowerCase().indexOf("virtual") > -1 || m.toLowerCase().indexOf("vbox") > -1) && (y = "Virtual"), d) {
                let g = _.findObjectByKey(r, "serialNum", f);
                (g === -1 || f === "") && (g = _.findObjectByKey(r, "name", p)), g !== -1 && (r[g].type = y, r[g].interfaceType = h);
              }
            }), a.results.shift(), a.results.shift(), a.results.length && a.results.forEach((c) => {
              try {
                const u = JSON.parse(c);
                if (u.serial_number) {
                  const f = u.serial_number, p = _.findObjectByKey(r, "serialNum", f);
                  p !== -1 && (r[p].smartStatus = u.smart_status && u.smart_status.passed ? "Ok" : u.smart_status && u.smart_status.passed === !1 ? "Predicted Failure" : "unknown", u.temperature && u.temperature.current && (r[p].temperature = u.temperature.current), r[p].smartData = u);
                }
              } catch {
                _.noop();
              }
            }), t && t(r), e(r);
          });
        } catch {
          t && t(r), e(r);
        }
    });
  });
}
Dt.diskLayout = Pa;
var Vt = {};
const bn = Fe, Ce = te.exec, pe = te.execSync, va = ke, M = T, ot = process.platform, ze = ot === "linux" || ot === "android", Ue = ot === "darwin", Cn = ot === "win32", at = ot === "freebsd", lt = ot === "openbsd", ct = ot === "netbsd", as = ot === "sunos", Q = {};
let ls = "", Rt = {}, cs = [], Wt = [], Gt = {}, _t;
function Mt() {
  let t = "", n = "";
  try {
    const e = bn.networkInterfaces();
    let s = 9999;
    for (let r in e)
      ({}).hasOwnProperty.call(e, r) && e[r].forEach((i) => {
        i && i.internal === !1 && (n = n || r, i.scopeid && i.scopeid < s && (t = r, s = i.scopeid));
      });
    if (t = t || n || "", Cn) {
      let r = "";
      if (pe("netstat -r", M.execOptsWin).toString().split(bn.EOL).forEach((l) => {
        if (l = l.replace(/\s+/g, " ").trim(), l.indexOf("0.0.0.0 0.0.0.0") > -1 && !/[a-zA-Z]/.test(l)) {
          const c = l.split(" ");
          c.length >= 5 && (r = c[c.length - 2]);
        }
      }), r)
        for (let l in e)
          ({}).hasOwnProperty.call(e, l) && e[l].forEach((c) => {
            c && c.address && c.address === r && (t = l);
          });
    }
    if (ze) {
      const o = pe("ip route 2> /dev/null | grep default", M.execOptsLinux).toString().split(`
`)[0].split(/\s+/);
      o[0] === "none" && o[5] ? t = o[5] : o[4] && (t = o[4]), t.indexOf(":") > -1 && (t = t.split(":")[1].trim());
    }
    if (Ue || at || lt || ct || as) {
      let r = "";
      ze && (r = "ip route 2> /dev/null | grep default | awk '{print $5}'"), Ue && (r = "route -n get default 2>/dev/null | grep interface: | awk '{print $2}'"), (at || lt || ct || as) && (r = "route get 0.0.0.0 | grep interface:"), t = pe(r).toString().split(`
`)[0], t.indexOf(":") > -1 && (t = t.split(":")[1].trim());
    }
  } catch {
    M.noop();
  }
  return t && (ls = t), ls;
}
Vt.getDefaultNetworkInterface = Mt;
function us() {
  let t = "", n = "";
  const e = {};
  if (ze || at || lt || ct) {
    if (typeof _t > "u")
      try {
        const s = pe("which ip", M.execOptsLinux).toString().split(`
`);
        s.length && s[0].indexOf(":") === -1 && s[0].indexOf("/") === 0 ? _t = s[0] : _t = "";
      } catch {
        _t = "";
      }
    try {
      const s = "export LC_ALL=C; " + (_t ? _t + " link show up" : "/sbin/ifconfig") + "; unset LC_ALL", i = pe(s, M.execOptsLinux).toString().split(`
`);
      for (let o = 0; o < i.length; o++)
        if (i[o] && i[o][0] !== " ") {
          if (_t) {
            const a = i[o + 1].trim().split(" ");
            a[0] === "link/ether" && (t = i[o].split(" ")[1], t = t.slice(0, t.length - 1), n = a[1]);
          } else
            t = i[o].split(" ")[0], n = i[o].split("HWaddr ")[1];
          t && n && (e[t] = n.trim(), t = "", n = "");
        }
    } catch {
      M.noop();
    }
  }
  if (Ue)
    try {
      const i = pe("/sbin/ifconfig").toString().split(`
`);
      for (let o = 0; o < i.length; o++)
        i[o] && i[o][0] !== "	" && i[o].indexOf(":") > 0 ? t = i[o].split(":")[0] : i[o].indexOf("	ether ") === 0 && (n = i[o].split("	ether ")[1], t && n && (e[t] = n.trim(), t = "", n = ""));
    } catch {
      M.noop();
    }
  return e;
}
function Ma(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = Mt();
      t && t(e), n(e);
    });
  });
}
Vt.networkInterfaceDefault = Ma;
function Ea(t, n) {
  const e = [];
  for (let s in t)
    try {
      if ({}.hasOwnProperty.call(t, s) && t[s].trim() !== "") {
        const r = t[s].trim().split(`\r
`);
        let i = null;
        try {
          i = n && n[s] ? n[s].trim().split(`\r
`) : [];
        } catch {
          M.noop();
        }
        const o = M.getValue(r, "NetEnabled", ":");
        let a = M.getValue(r, "AdapterTypeID", ":") === "9" ? "wireless" : "wired";
        const l = M.getValue(r, "Name", ":").replace(/\]/g, ")").replace(/\[/g, "("), c = M.getValue(r, "NetConnectionID", ":").replace(/\]/g, ")").replace(/\[/g, "(");
        if ((l.toLowerCase().indexOf("wi-fi") >= 0 || l.toLowerCase().indexOf("wireless") >= 0) && (a = "wireless"), o !== "") {
          const u = parseInt(M.getValue(r, "speed", ":").trim(), 10) / 1e6;
          e.push({
            mac: M.getValue(r, "MACAddress", ":").toLowerCase(),
            dhcp: M.getValue(i, "dhcpEnabled", ":").toLowerCase() === "true",
            name: l,
            iface: c,
            netEnabled: o === "TRUE",
            speed: isNaN(u) ? null : u,
            operstate: M.getValue(r, "NetConnectionStatus", ":") === "2" ? "up" : "down",
            type: a
          });
        }
      }
    } catch {
      M.noop();
    }
  return e;
}
function Aa() {
  return new Promise((t) => {
    process.nextTick(() => {
      let n = "Get-CimInstance Win32_NetworkAdapter | fl *; echo '#-#-#-#';";
      n += "Get-CimInstance Win32_NetworkAdapterConfiguration | fl DHCPEnabled";
      try {
        M.powerShell(n).then((e) => {
          e = e.split("#-#-#-#");
          const s = (e[0] || "").split(/\n\s*\n/), r = (e[1] || "").split(/\n\s*\n/);
          t(Ea(s, r));
        });
      } catch {
        t([]);
      }
    });
  });
}
function Ta() {
  let t = {};
  const n = {
    primaryDNS: "",
    exitCode: 0,
    ifaces: []
  };
  try {
    return pe("ipconfig /all", M.execOptsWin).split(`\r
\r
`).forEach((r, i) => {
      if (i === 1) {
        const o = r.split(`\r
`).filter((l) => l.toUpperCase().includes("DNS")), a = o[0].substring(o[0].lastIndexOf(":") + 1);
        n.primaryDNS = a.trim(), n.primaryDNS || (n.primaryDNS = "Not defined");
      }
      if (i > 1)
        if (i % 2 === 0) {
          const o = r.substring(r.lastIndexOf(" ") + 1).replace(":", "");
          t.name = o;
        } else {
          const o = r.split(`\r
`).filter((l) => l.toUpperCase().includes("DNS")), a = o[0].substring(o[0].lastIndexOf(":") + 1);
          t.dnsSuffix = a.trim(), n.ifaces.push(t), t = {};
        }
    }), n;
  } catch {
    return {
      primaryDNS: "",
      exitCode: 0,
      ifaces: []
    };
  }
}
function Da(t, n) {
  let e = "";
  const s = n + ".";
  try {
    const r = t.filter((i) => s.includes(i.name + ".")).map((i) => i.dnsSuffix);
    return r[0] && (e = r[0]), e || (e = ""), e;
  } catch {
    return "Unknown";
  }
}
function Va() {
  try {
    return pe("netsh lan show profiles", M.execOptsWin).split(`\r
Profile on interface`);
  } catch (t) {
    return t.status === 1 && t.stdout.includes("AutoConfig") ? "Disabled" : [];
  }
}
function ba(t) {
  try {
    return pe(`netsh wlan show  interface name="${t}" | findstr "SSID"`, M.execOptsWin).split(`\r
`).shift().split(":").pop().trim();
  } catch {
    return "Unknown";
  }
}
function Ba(t, n, e) {
  const s = {
    state: "Unknown",
    protocol: "Unknown"
  };
  if (e === "Disabled")
    return s.state = "Disabled", s.protocol = "Not defined", s;
  if (t === "wired" && e.length > 0)
    try {
      const i = e.find((a) => a.includes(n + `\r
`)).split(`\r
`), o = i.find((a) => a.includes("802.1x"));
      if (o.includes("Disabled"))
        s.state = "Disabled", s.protocol = "Not defined";
      else if (o.includes("Enabled")) {
        const a = i.find((l) => l.includes("EAP"));
        s.protocol = a.split(":").pop(), s.state = "Enabled";
      }
    } catch {
      return s;
    }
  else if (t === "wireless") {
    let r = "", i = "";
    try {
      const o = ba(n);
      if (o !== "Unknown") {
        let a = "";
        const l = M.isPrototypePolluted() ? "---" : M.sanitizeShellString(o), c = M.mathMin(l.length, 32);
        for (let f = 0; f <= c; f++)
          l[f] !== void 0 && (a = a + l[f]);
        const u = pe(`netsh wlan show profiles "${a}"`, M.execOptsWin).split(`\r
`);
        r = (u.find((f) => f.indexOf("802.1X") >= 0) || "").trim(), i = (u.find((f) => f.indexOf("EAP") >= 0) || "").trim();
      }
      r.includes(":") && i.includes(":") && (s.state = r.split(":").pop(), s.protocol = i.split(":").pop());
    } catch (o) {
      return o.status === 1 && o.stdout.includes("AutoConfig") && (s.state = "Disabled", s.protocol = "Not defined"), s;
    }
  }
  return s;
}
function Qs(t) {
  const n = [];
  let e = [];
  return t.forEach((s) => {
    !s.startsWith("	") && !s.startsWith(" ") && e.length && (n.push(e), e = []), e.push(s);
  }), e.length && n.push(e), n;
}
function Na(t) {
  const n = [];
  return t.forEach((e) => {
    const s = {
      iface: "",
      mtu: null,
      mac: "",
      ip6: "",
      ip4: "",
      speed: null,
      type: "",
      operstate: "",
      duplex: "",
      internal: !1
    }, r = e[0];
    s.iface = r.split(":")[0].trim();
    const i = r.split("> mtu");
    s.mtu = i.length > 1 ? parseInt(i[1], 10) : null, isNaN(s.mtu) && (s.mtu = null), s.internal = i[0].toLowerCase().indexOf("loopback") > -1, e.forEach((l) => {
      l.trim().startsWith("ether ") && (s.mac = l.split("ether ")[1].toLowerCase().trim()), l.trim().startsWith("inet6 ") && !s.ip6 && (s.ip6 = l.split("inet6 ")[1].toLowerCase().split("%")[0].split(" ")[0]), l.trim().startsWith("inet ") && !s.ip4 && (s.ip4 = l.split("inet ")[1].toLowerCase().split(" ")[0]);
    });
    let o = M.getValue(e, "link rate");
    s.speed = o ? parseFloat(o) : null, s.speed === null ? (o = M.getValue(e, "uplink rate"), s.speed = o ? parseFloat(o) : null, s.speed !== null && o.toLowerCase().indexOf("gbps") >= 0 && (s.speed = s.speed * 1e3)) : o.toLowerCase().indexOf("gbps") >= 0 && (s.speed = s.speed * 1e3), s.type = M.getValue(e, "type").toLowerCase().indexOf("wi-fi") > -1 ? "wireless" : "wired";
    const a = M.getValue(e, "status").toLowerCase();
    s.operstate = a === "active" ? "up" : a === "inactive" ? "down" : "unknown", s.duplex = M.getValue(e, "media").toLowerCase().indexOf("half-duplex") > -1 ? "half" : "full", (s.ip6 || s.ip4 || s.mac) && n.push(s);
  }), n;
}
function ka() {
  const t = "/sbin/ifconfig -v";
  try {
    const n = pe(t, { maxBuffer: 104857600 }).toString().split(`
`), e = Qs(n);
    return Na(e);
  } catch {
    return [];
  }
}
function Fa(t) {
  const n = `nmcli device status 2>/dev/null | grep ${t}`;
  try {
    const i = pe(n, M.execOptsLinux).toString().replace(/\s+/g, " ").trim().split(" ").slice(3).join(" ");
    return i !== "--" ? i : "";
  } catch {
    return "";
  }
}
function Zs(t) {
  let n = [];
  try {
    const e = `cat ${t} 2> /dev/null | grep 'iface\\|source'`;
    pe(e, M.execOptsLinux).toString().split(`
`).forEach((r) => {
      const i = r.replace(/\s+/g, " ").trim().split(" ");
      if (i.length >= 4 && r.toLowerCase().indexOf(" inet ") >= 0 && r.toLowerCase().indexOf("dhcp") >= 0 && n.push(i[1]), r.toLowerCase().includes("source")) {
        const o = r.split(" ")[1];
        n = n.concat(Zs(o));
      }
    });
  } catch {
    M.noop();
  }
  return n;
}
function Ra() {
  const t = "ip a 2> /dev/null";
  let n = [];
  try {
    const e = pe(t, M.execOptsLinux).toString().split(`
`), s = Qs(e);
    n = Wa(s);
  } catch {
    M.noop();
  }
  try {
    n = Zs("/etc/network/interfaces");
  } catch {
    M.noop();
  }
  return n;
}
function Wa(t) {
  const n = [];
  return t && t.length && t.forEach((e) => {
    if (e && e.length && e[0].split(":").length > 2) {
      for (let r of e)
        if (r.indexOf(" inet ") >= 0 && r.indexOf(" dynamic ") >= 0) {
          const i = r.split(" "), o = i[i.length - 1].trim();
          n.push(o);
          break;
        }
    }
  }), n;
}
function Ga(t, n, e) {
  let s = !1;
  if (n) {
    const r = `nmcli connection show "${n}" 2>/dev/null | grep ipv4.method;`;
    try {
      switch (pe(r, M.execOptsLinux).toString().replace(/\s+/g, " ").trim().split(" ").slice(1).toString()) {
        case "auto":
          s = !0;
          break;
        default:
          s = !1;
          break;
      }
      return s;
    } catch {
      return e.indexOf(t) >= 0;
    }
  } else
    return e.indexOf(t) >= 0;
}
function za(t) {
  let n = !1;
  const e = `ipconfig getpacket "${t}" 2>/dev/null | grep lease_time;`;
  try {
    const s = pe(e).toString().split(`
`);
    s.length && s[0].startsWith("lease_time") && (n = !0);
  } catch {
    M.noop();
  }
  return n;
}
function Ua(t) {
  if (t) {
    const n = `nmcli connection show "${t}" 2>/dev/null | grep ipv4.dns-search;`;
    try {
      const r = pe(n, M.execOptsLinux).toString().replace(/\s+/g, " ").trim().split(" ").slice(1).toString();
      return r === "--" ? "Not defined" : r;
    } catch {
      return "Unknown";
    }
  } else
    return "Unknown";
}
function Ha(t) {
  if (t) {
    const n = `nmcli connection show "${t}" 2>/dev/null | grep 802-1x.eap;`;
    try {
      const r = pe(n, M.execOptsLinux).toString().replace(/\s+/g, " ").trim().split(" ").slice(1).toString();
      return r === "--" ? "" : r;
    } catch {
      return "Not defined";
    }
  } else
    return "Not defined";
}
function $a(t) {
  return t ? t === "Not defined" ? "Disabled" : "Enabled" : "Unknown";
}
function ci(t, n, e) {
  const s = [
    "00:00:00:00:00:00",
    "00:03:FF",
    "00:05:69",
    "00:0C:29",
    "00:0F:4B",
    "00:13:07",
    "00:13:BE",
    "00:15:5d",
    "00:16:3E",
    "00:1C:42",
    "00:21:F6",
    "00:24:0B",
    "00:50:56",
    "00:A0:B1",
    "00:E0:C8",
    "08:00:27",
    "0A:00:27",
    "18:92:2C",
    "16:DF:49",
    "3C:F3:92",
    "54:52:00",
    "FC:15:97"
  ];
  return e ? s.filter((r) => e.toUpperCase().toUpperCase().startsWith(r.substring(0, e.length))).length > 0 || t.toLowerCase().indexOf(" virtual ") > -1 || n.toLowerCase().indexOf(" virtual ") > -1 || t.toLowerCase().indexOf("vethernet ") > -1 || n.toLowerCase().indexOf("vethernet ") > -1 || t.toLowerCase().startsWith("veth") || n.toLowerCase().startsWith("veth") || t.toLowerCase().startsWith("vboxnet") || n.toLowerCase().startsWith("vboxnet") : !1;
}
function Ti(t, n, e) {
  return typeof t == "string" && (e = t, n = !0, t = null), typeof t == "boolean" && (n = t, t = null, e = ""), typeof n > "u" && (n = !0), e = e || "", e = "" + e, new Promise((s) => {
    process.nextTick(() => {
      const r = bn.networkInterfaces();
      let i = [], o = [], a = [], l = [];
      if (Ue || at || lt || ct)
        if (JSON.stringify(r) === JSON.stringify(Rt) && !n)
          i = Wt, t && t(i), s(i);
        else {
          const c = Mt();
          Rt = JSON.parse(JSON.stringify(r)), o = ka(), o.forEach((u) => {
            let f = "", p = "", d = "", m = "";
            u.ip4 = "", u.ip6 = "", {}.hasOwnProperty.call(r, u.iface) && r[u.iface].forEach((x) => {
              (x.family === "IPv4" || x.family === 4) && (!u.ip4 && !u.ip4.match(/^169.254/i) && (u.ip4 = x.address, u.ip4subnet = x.netmask), u.ip4.match(/^169.254/i) && (f = x.address, p = x.netmask)), (x.family === "IPv6" || x.family === 6) && (!u.ip6 && !u.ip6.match(/^fe80::/i) && (u.ip6 = x.address, u.ip6subnet = x.netmask), u.ip6.match(/^fe80::/i) && (d = x.address, m = x.netmask));
            }), !u.ip4 && f && (u.ip4 = f, u.ip4subnet = p), !u.ip6 && d && (u.ip6 = d, u.ip6subnet = m);
            let h = "";
            const y = M.isPrototypePolluted() ? "---" : M.sanitizeShellString(u.iface), g = M.mathMin(y.length, 2e3);
            for (let x = 0; x <= g; x++)
              y[x] !== void 0 && (h = h + y[x]);
            i.push({
              iface: u.iface,
              ifaceName: u.iface,
              default: u.iface === c,
              ip4: u.ip4,
              ip4subnet: u.ip4subnet || "",
              ip6: u.ip6,
              ip6subnet: u.ip6subnet || "",
              mac: u.mac,
              internal: u.internal,
              virtual: u.internal ? !1 : ci(u.iface, u.iface, u.mac),
              operstate: u.operstate,
              type: u.type,
              duplex: u.duplex,
              mtu: u.mtu,
              speed: u.speed,
              dhcp: za(h),
              dnsSuffix: "",
              ieee8021xAuth: "",
              ieee8021xState: "",
              carrierChanges: 0
            });
          }), Wt = i, e.toLowerCase().indexOf("default") >= 0 && (i = i.filter((u) => u.default), i.length > 0 ? i = i[0] : i = []), t && t(i), s(i);
        }
      if (ze)
        if (JSON.stringify(r) === JSON.stringify(Rt) && !n)
          i = Wt, t && t(i), s(i);
        else {
          Rt = JSON.parse(JSON.stringify(r)), cs = Ra();
          const c = Mt();
          for (let u in r) {
            let f = "", p = "", d = "", m = "", h = "", y = "", g = "", x = null, S = 0, C = !1, L = "", V = "", E = "", U = "", O = "", $ = "", ne = "", re = "";
            if ({}.hasOwnProperty.call(r, u)) {
              const oe = u;
              r[u].forEach((q) => {
                (q.family === "IPv4" || q.family === 4) && (!f && !f.match(/^169.254/i) && (f = q.address, p = q.netmask), f.match(/^169.254/i) && (O = q.address, $ = q.netmask)), (q.family === "IPv6" || q.family === 6) && (!d && !d.match(/^fe80::/i) && (d = q.address, m = q.netmask), d.match(/^fe80::/i) && (ne = q.address, re = q.netmask)), h = q.mac;
                const bt = parseInt(process.versions.node.split("."), 10);
                h.indexOf("00:00:0") > -1 && (ze || Ue) && !q.internal && bt >= 8 && bt <= 11 && (Object.keys(Gt).length === 0 && (Gt = us()), h = Gt[u] || "");
              }), !f && O && (f = O, p = $), !d && ne && (d = ne, m = re);
              const ae = u.split(":")[0].trim();
              let b = "";
              const me = M.isPrototypePolluted() ? "---" : M.sanitizeShellString(ae), z = M.mathMin(me.length, 2e3);
              for (let q = 0; q <= z; q++)
                me[q] !== void 0 && (b = b + me[q]);
              const ee = `echo -n "addr_assign_type: "; cat /sys/class/net/${b}/addr_assign_type 2>/dev/null; echo;
            echo -n "address: "; cat /sys/class/net/${b}/address 2>/dev/null; echo;
            echo -n "addr_len: "; cat /sys/class/net/${b}/addr_len 2>/dev/null; echo;
            echo -n "broadcast: "; cat /sys/class/net/${b}/broadcast 2>/dev/null; echo;
            echo -n "carrier: "; cat /sys/class/net/${b}/carrier 2>/dev/null; echo;
            echo -n "carrier_changes: "; cat /sys/class/net/${b}/carrier_changes 2>/dev/null; echo;
            echo -n "dev_id: "; cat /sys/class/net/${b}/dev_id 2>/dev/null; echo;
            echo -n "dev_port: "; cat /sys/class/net/${b}/dev_port 2>/dev/null; echo;
            echo -n "dormant: "; cat /sys/class/net/${b}/dormant 2>/dev/null; echo;
            echo -n "duplex: "; cat /sys/class/net/${b}/duplex 2>/dev/null; echo;
            echo -n "flags: "; cat /sys/class/net/${b}/flags 2>/dev/null; echo;
            echo -n "gro_flush_timeout: "; cat /sys/class/net/${b}/gro_flush_timeout 2>/dev/null; echo;
            echo -n "ifalias: "; cat /sys/class/net/${b}/ifalias 2>/dev/null; echo;
            echo -n "ifindex: "; cat /sys/class/net/${b}/ifindex 2>/dev/null; echo;
            echo -n "iflink: "; cat /sys/class/net/${b}/iflink 2>/dev/null; echo;
            echo -n "link_mode: "; cat /sys/class/net/${b}/link_mode 2>/dev/null; echo;
            echo -n "mtu: "; cat /sys/class/net/${b}/mtu 2>/dev/null; echo;
            echo -n "netdev_group: "; cat /sys/class/net/${b}/netdev_group 2>/dev/null; echo;
            echo -n "operstate: "; cat /sys/class/net/${b}/operstate 2>/dev/null; echo;
            echo -n "proto_down: "; cat /sys/class/net/${b}/proto_down 2>/dev/null; echo;
            echo -n "speed: "; cat /sys/class/net/${b}/speed 2>/dev/null; echo;
            echo -n "tx_queue_len: "; cat /sys/class/net/${b}/tx_queue_len 2>/dev/null; echo;
            echo -n "type: "; cat /sys/class/net/${b}/type 2>/dev/null; echo;
            echo -n "wireless: "; cat /proc/net/wireless 2>/dev/null | grep ${b}; echo;
            echo -n "wirelessspeed: "; iw dev ${b} link 2>&1 | grep bitrate; echo;`;
              let F = [];
              try {
                F = pe(ee, M.execOptsLinux).toString().split(`
`);
                const q = Fa(b);
                C = Ga(b, q, cs), L = Ua(q), V = Ha(q), E = $a(V);
              } catch {
                M.noop();
              }
              y = M.getValue(F, "duplex"), y = y.startsWith("cat") ? "" : y, g = parseInt(M.getValue(F, "mtu"), 10);
              let B = parseInt(M.getValue(F, "speed"), 10);
              x = isNaN(B) ? null : B;
              const G = M.getValue(F, "tx bitrate");
              x === null && G && (B = parseFloat(G), x = isNaN(B) ? null : B), S = parseInt(M.getValue(F, "carrier_changes"), 10);
              const j = M.getValue(F, "operstate");
              U = j === "up" ? M.getValue(F, "wireless").trim() ? "wireless" : "wired" : "unknown", (b === "lo" || b.startsWith("bond")) && (U = "virtual");
              let k = r[u] && r[u][0] ? r[u][0].internal : !1;
              (u.toLowerCase().indexOf("loopback") > -1 || oe.toLowerCase().indexOf("loopback") > -1) && (k = !0);
              const ge = k ? !1 : ci(u, oe, h);
              i.push({
                iface: b,
                ifaceName: oe,
                default: ae === c,
                ip4: f,
                ip4subnet: p,
                ip6: d,
                ip6subnet: m,
                mac: h,
                internal: k,
                virtual: ge,
                operstate: j,
                type: U,
                duplex: y,
                mtu: g,
                speed: x,
                dhcp: C,
                dnsSuffix: L,
                ieee8021xAuth: V,
                ieee8021xState: E,
                carrierChanges: S
              });
            }
          }
          Wt = i, e.toLowerCase().indexOf("default") >= 0 && (i = i.filter((u) => u.default), i.length > 0 ? i = i[0] : i = []), t && t(i), s(i);
        }
      if (Cn)
        if (JSON.stringify(r) === JSON.stringify(Rt) && !n)
          i = Wt, t && t(i), s(i);
        else {
          Rt = JSON.parse(JSON.stringify(r));
          const c = Mt();
          Aa().then((u) => {
            u.forEach((f) => {
              let p = !1;
              Object.keys(r).forEach((d) => {
                p || r[d].forEach((m) => {
                  Object.keys(m).indexOf("mac") >= 0 && (p = m.mac === f.mac);
                });
              }), p || (r[f.name] = [{ mac: f.mac }]);
            }), l = Va(), a = Ta();
            for (let f in r) {
              let p = "";
              const d = M.isPrototypePolluted() ? "---" : M.sanitizeShellString(f), m = M.mathMin(d.length, 2e3);
              for (let b = 0; b <= m; b++)
                d[b] !== void 0 && (p = p + d[b]);
              let h = f, y = "", g = "", x = "", S = "", C = "", L = "", V = "", E = null, U = 0, O = "down", $ = !1, ne = "", re = "", oe = "", ae = "";
              if ({}.hasOwnProperty.call(r, f)) {
                let b = f;
                r[f].forEach((B) => {
                  (B.family === "IPv4" || B.family === 4) && (y = B.address, g = B.netmask), (B.family === "IPv6" || B.family === 6) && (!x || x.match(/^fe80::/i)) && (x = B.address, S = B.netmask), C = B.mac;
                  const G = parseInt(process.versions.node.split("."), 10);
                  C.indexOf("00:00:0") > -1 && (ze || Ue) && !B.internal && G >= 8 && G <= 11 && (Object.keys(Gt).length === 0 && (Gt = us()), C = Gt[f] || "");
                }), ne = Da(a.ifaces, p);
                let me = !1;
                u.forEach((B) => {
                  B.mac === C && !me && (h = B.iface || h, b = B.name, $ = B.dhcp, O = B.operstate, E = O === "up" ? B.speed : 0, ae = B.type, me = !0);
                }), (f.toLowerCase().indexOf("wlan") >= 0 || b.toLowerCase().indexOf("wlan") >= 0 || b.toLowerCase().indexOf("802.11n") >= 0 || b.toLowerCase().indexOf("wireless") >= 0 || b.toLowerCase().indexOf("wi-fi") >= 0 || b.toLowerCase().indexOf("wifi") >= 0) && (ae = "wireless");
                const z = Ba(ae, p, l);
                re = z.protocol, oe = z.state;
                let ee = r[f] && r[f][0] ? r[f][0].internal : !1;
                (f.toLowerCase().indexOf("loopback") > -1 || b.toLowerCase().indexOf("loopback") > -1) && (ee = !0);
                const F = ee ? !1 : ci(f, b, C);
                i.push({
                  iface: h,
                  ifaceName: b,
                  default: h === c,
                  ip4: y,
                  ip4subnet: g,
                  ip6: x,
                  ip6subnet: S,
                  mac: C,
                  internal: ee,
                  virtual: F,
                  operstate: O,
                  type: ae,
                  duplex: L,
                  mtu: V,
                  speed: E,
                  dhcp: $,
                  dnsSuffix: ne,
                  ieee8021xAuth: re,
                  ieee8021xState: oe,
                  carrierChanges: U
                });
              }
            }
            Wt = i, e.toLowerCase().indexOf("default") >= 0 && (i = i.filter((f) => f.default), i.length > 0 ? i = i[0] : i = []), t && t(i), s(i);
          });
        }
    });
  });
}
Vt.networkInterfaces = Ti;
function Pn(t, n, e, s, r, i, o, a) {
  const l = {
    iface: t,
    operstate: s,
    rx_bytes: n,
    rx_dropped: r,
    rx_errors: i,
    tx_bytes: e,
    tx_dropped: o,
    tx_errors: a,
    rx_sec: null,
    tx_sec: null,
    ms: 0
  };
  return Q[t] && Q[t].ms ? (l.ms = Date.now() - Q[t].ms, l.rx_sec = n - Q[t].rx_bytes >= 0 ? (n - Q[t].rx_bytes) / (l.ms / 1e3) : 0, l.tx_sec = e - Q[t].tx_bytes >= 0 ? (e - Q[t].tx_bytes) / (l.ms / 1e3) : 0, Q[t].rx_bytes = n, Q[t].tx_bytes = e, Q[t].rx_sec = l.rx_sec, Q[t].tx_sec = l.tx_sec, Q[t].ms = Date.now(), Q[t].last_ms = l.ms, Q[t].operstate = s) : (Q[t] || (Q[t] = {}), Q[t].rx_bytes = n, Q[t].tx_bytes = e, Q[t].rx_sec = null, Q[t].tx_sec = null, Q[t].ms = Date.now(), Q[t].last_ms = 0, Q[t].operstate = s), l;
}
function er(t, n) {
  let e = [];
  return new Promise((s) => {
    process.nextTick(() => {
      if (M.isFunction(t) && !n)
        n = t, e = [Mt()];
      else {
        if (typeof t != "string" && t !== void 0)
          return n && n([]), s([]);
        t = t || Mt();
        try {
          t.__proto__.toLowerCase = M.stringToLower, t.__proto__.replace = M.stringReplace, t.__proto__.toString = M.stringToString, t.__proto__.substr = M.stringSubstr, t.__proto__.substring = M.stringSubstring, t.__proto__.trim = M.stringTrim, t.__proto__.startsWith = M.stringStartWith;
        } catch {
          Object.setPrototypeOf(t, M.stringObj);
        }
        t = t.trim().replace(/,+/g, "|"), e = t.split("|");
      }
      const r = [], i = [];
      if (e.length && e[0].trim() === "*")
        e = [], Ti(!1).then((o) => {
          for (let a of o)
            e.push(a.iface);
          er(e.join(",")).then((a) => {
            n && n(a), s(a);
          });
        });
      else {
        for (let o of e)
          i.push(Xa(o.trim()));
        i.length ? Promise.all(i).then((o) => {
          n && n(o), s(o);
        }) : (n && n(r), s(r));
      }
    });
  });
}
function Xa(t) {
  function n(e) {
    const s = [];
    for (let r in e)
      if ({}.hasOwnProperty.call(e, r) && e[r].trim() !== "") {
        const i = e[r].trim().split(`\r
`);
        s.push({
          name: M.getValue(i, "Name", ":").replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase(),
          rx_bytes: parseInt(M.getValue(i, "BytesReceivedPersec", ":"), 10),
          rx_errors: parseInt(M.getValue(i, "PacketsReceivedErrors", ":"), 10),
          rx_dropped: parseInt(M.getValue(i, "PacketsReceivedDiscarded", ":"), 10),
          tx_bytes: parseInt(M.getValue(i, "BytesSentPersec", ":"), 10),
          tx_errors: parseInt(M.getValue(i, "PacketsOutboundErrors", ":"), 10),
          tx_dropped: parseInt(M.getValue(i, "PacketsOutboundDiscarded", ":"), 10)
        });
      }
    return s;
  }
  return new Promise((e) => {
    process.nextTick(() => {
      let s = "";
      const r = M.isPrototypePolluted() ? "---" : M.sanitizeShellString(t), i = M.mathMin(r.length, 2e3);
      for (let g = 0; g <= i; g++)
        r[g] !== void 0 && (s = s + r[g]);
      let o = {
        iface: s,
        operstate: "unknown",
        rx_bytes: 0,
        rx_dropped: 0,
        rx_errors: 0,
        tx_bytes: 0,
        tx_dropped: 0,
        tx_errors: 0,
        rx_sec: null,
        tx_sec: null,
        ms: 0
      }, a = "unknown", l = 0, c = 0, u = 0, f = 0, p = 0, d = 0, m, h, y;
      if (!Q[s] || Q[s] && !Q[s].ms || Q[s] && Q[s].ms && Date.now() - Q[s].ms >= 500) {
        if (ze && (va.existsSync("/sys/class/net/" + s) ? (m = "cat /sys/class/net/" + s + "/operstate; cat /sys/class/net/" + s + "/statistics/rx_bytes; cat /sys/class/net/" + s + "/statistics/tx_bytes; cat /sys/class/net/" + s + "/statistics/rx_dropped; cat /sys/class/net/" + s + "/statistics/rx_errors; cat /sys/class/net/" + s + "/statistics/tx_dropped; cat /sys/class/net/" + s + "/statistics/tx_errors; ", Ce(m, (g, x) => {
          g || (h = x.toString().split(`
`), a = h[0].trim(), l = parseInt(h[1], 10), c = parseInt(h[2], 10), u = parseInt(h[3], 10), f = parseInt(h[4], 10), p = parseInt(h[5], 10), d = parseInt(h[6], 10), o = Pn(s, l, c, a, u, f, p, d)), e(o);
        })) : e(o)), (at || lt || ct) && (m = "netstat -ibndI " + s, Ce(m, (g, x) => {
          if (!g) {
            h = x.toString().split(`
`);
            for (let S = 1; S < h.length; S++) {
              const C = h[S].replace(/ +/g, " ").split(" ");
              C && C[0] && C[7] && C[10] && (l = l + parseInt(C[7]), C[6].trim() !== "-" && (u = u + parseInt(C[6])), C[5].trim() !== "-" && (f = f + parseInt(C[5])), c = c + parseInt(C[10]), C[12].trim() !== "-" && (p = p + parseInt(C[12])), C[9].trim() !== "-" && (d = d + parseInt(C[9])), a = "up");
            }
            o = Pn(s, l, c, a, u, f, p, d);
          }
          e(o);
        })), Ue && (m = "ifconfig " + s + ' | grep "status"', Ce(m, (g, x) => {
          o.operstate = (x.toString().split(":")[1] || "").trim(), o.operstate = (o.operstate || "").toLowerCase(), o.operstate = o.operstate === "active" ? "up" : o.operstate === "inactive" ? "down" : "unknown", m = "netstat -bdI " + s, Ce(m, (S, C) => {
            if (!S && (h = C.toString().split(`
`), h.length > 1 && h[1].trim() !== "")) {
              y = h[1].replace(/ +/g, " ").split(" ");
              const L = y.length > 11 ? 1 : 0;
              l = parseInt(y[L + 5]), u = parseInt(y[L + 10]), f = parseInt(y[L + 4]), c = parseInt(y[L + 8]), p = parseInt(y[L + 10]), d = parseInt(y[L + 7]), o = Pn(s, l, c, o.operstate, u, f, p, d);
            }
            e(o);
          });
        })), Cn) {
          let g = [], x = s;
          M.powerShell(
            "Get-CimInstance Win32_PerfRawData_Tcpip_NetworkInterface | select Name,BytesReceivedPersec,PacketsReceivedErrors,PacketsReceivedDiscarded,BytesSentPersec,PacketsOutboundErrors,PacketsOutboundDiscarded | fl"
          ).then((S, C) => {
            if (!C) {
              const L = S.toString().split(/\n\s*\n/);
              g = n(L);
            }
            Ti(!1).then((L) => {
              l = 0, c = 0, g.forEach((V) => {
                L.forEach((E) => {
                  (E.iface.toLowerCase() === s.toLowerCase() || E.mac.toLowerCase() === s.toLowerCase() || E.ip4.toLowerCase() === s.toLowerCase() || E.ip6.toLowerCase() === s.toLowerCase() || E.ifaceName.replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase() === s.replace(/[()[\] ]+/g, "").replace("#", "_").toLowerCase()) && E.ifaceName.replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase() === V.name && (x = E.iface, l = V.rx_bytes, u = V.rx_dropped, f = V.rx_errors, c = V.tx_bytes, p = V.tx_dropped, d = V.tx_errors, a = E.operstate);
                });
              }), l && c && (o = Pn(x, parseInt(l), parseInt(c), a, u, f, p, d)), e(o);
            });
          });
        }
      } else
        o.rx_bytes = Q[s].rx_bytes, o.tx_bytes = Q[s].tx_bytes, o.rx_sec = Q[s].rx_sec, o.tx_sec = Q[s].tx_sec, o.ms = Q[s].last_ms, o.operstate = Q[s].operstate, e(o);
    });
  });
}
Vt.networkStats = er;
function Ka(t, n) {
  let e = "";
  return t.forEach((s) => {
    const r = s.split(" ");
    (parseInt(r[0], 10) || -1) === n && (r.shift(), e = r.join(" ").split(":")[0]);
  }), e = e.split(" -")[0], e = e.split(" /")[0], e;
}
function ja(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = [];
      if (ze || at || lt || ct) {
        let s = 'export LC_ALL=C; netstat -tunap | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL';
        (at || lt || ct) && (s = 'export LC_ALL=C; netstat -na | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL'), Ce(s, { maxBuffer: 1024 * 102400 }, (r, i) => {
          let o = i.toString().split(`
`);
          !r && (o.length > 1 || o[0] !== "") ? (o.forEach((a) => {
            if (a = a.replace(/ +/g, " ").split(" "), a.length >= 7) {
              let l = a[3], c = "";
              const u = a[3].split(":");
              u.length > 1 && (c = u[u.length - 1], u.pop(), l = u.join(":"));
              let f = a[4], p = "";
              const d = a[4].split(":");
              d.length > 1 && (p = d[d.length - 1], d.pop(), f = d.join(":"));
              const m = a[5], h = a[6].split("/");
              m && e.push({
                protocol: a[0],
                localAddress: l,
                localPort: c,
                peerAddress: f,
                peerPort: p,
                state: m,
                pid: h[0] && h[0] !== "-" ? parseInt(h[0], 10) : null,
                process: h[1] ? h[1].split(" ")[0].split(":")[0] : ""
              });
            }
          }), t && t(e), n(e)) : (s = 'ss -tunap | grep "ESTAB\\|SYN-SENT\\|SYN-RECV\\|FIN-WAIT1\\|FIN-WAIT2\\|TIME-WAIT\\|CLOSE\\|CLOSE-WAIT\\|LAST-ACK\\|LISTEN\\|CLOSING"', Ce(s, { maxBuffer: 1024 * 102400 }, (a, l) => {
            a || l.toString().split(`
`).forEach((u) => {
              if (u = u.replace(/ +/g, " ").split(" "), u.length >= 6) {
                let f = u[4], p = "";
                const d = u[4].split(":");
                d.length > 1 && (p = d[d.length - 1], d.pop(), f = d.join(":"));
                let m = u[5], h = "";
                const y = u[5].split(":");
                y.length > 1 && (h = y[y.length - 1], y.pop(), m = y.join(":"));
                let g = u[1];
                g === "ESTAB" && (g = "ESTABLISHED"), g === "TIME-WAIT" && (g = "TIME_WAIT");
                let x = null, S = "";
                if (u.length >= 7 && u[6].indexOf("users:") > -1) {
                  const C = u[6].replace('users:(("', "").replace(/"/g, "").replace("pid=", "").split(",");
                  if (C.length > 2) {
                    S = C[0];
                    const L = parseInt(C[1], 10);
                    L > 0 && (x = L);
                  }
                }
                g && e.push({
                  protocol: u[0],
                  localAddress: f,
                  localPort: p,
                  peerAddress: m,
                  peerPort: h,
                  state: g,
                  pid: x,
                  process: S
                });
              }
            }), t && t(e), n(e);
          }));
        });
      }
      if (Ue) {
        const s = 'netstat -natvln | head -n2; netstat -natvln | grep "tcp4\\|tcp6\\|udp4\\|udp6"', r = "ESTABLISHED|SYN_SENT|SYN_RECV|FIN_WAIT1|FIN_WAIT_1|FIN_WAIT2|FIN_WAIT_2|TIME_WAIT|CLOSE|CLOSE_WAIT|LAST_ACK|LISTEN|CLOSING|UNKNOWN".split("|");
        Ce(s, { maxBuffer: 1024 * 102400 }, (i, o) => {
          i || Ce("ps -axo pid,command", { maxBuffer: 1024 * 102400 }, (a, l) => {
            let c = l.toString().split(`
`);
            c = c.map((p) => p.trim().replace(/ +/g, " "));
            const u = o.toString().split(`
`);
            u.shift();
            let f = 8;
            u.length > 1 && u[0].indexOf("pid") > 0 && (f = (u.shift() || "").replace(/ Address/g, "_Address").replace(/process:/g, "").replace(/ +/g, " ").split(" ").indexOf("pid")), u.forEach((p) => {
              if (p = p.replace(/ +/g, " ").split(" "), p.length >= 8) {
                let d = p[3], m = "";
                const h = p[3].split(".");
                h.length > 1 && (m = h[h.length - 1], h.pop(), d = h.join("."));
                let y = p[4], g = "";
                const x = p[4].split(".");
                x.length > 1 && (g = x[x.length - 1], x.pop(), y = x.join("."));
                const S = r.indexOf(p[5]) >= 0, C = S ? p[5] : "UNKNOWN";
                let L = "";
                p[p.length - 9].indexOf(":") >= 0 ? L = p[p.length - 9].split(":")[1] : (L = p[f + (S ? 0 : -1)], L.indexOf(":") >= 0 && (L = L.split(":")[1]));
                const V = parseInt(L, 10);
                C && e.push({
                  protocol: p[0],
                  localAddress: d,
                  localPort: m,
                  peerAddress: y,
                  peerPort: g,
                  state: C,
                  pid: V,
                  process: Ka(c, V)
                });
              }
            }), t && t(e), n(e);
          });
        });
      }
      if (Cn) {
        let s = "netstat -nao";
        try {
          Ce(s, M.execOptsWin, (r, i) => {
            r || (i.toString().split(`\r
`).forEach((a) => {
              if (a = a.trim().replace(/ +/g, " ").split(" "), a.length >= 4) {
                let l = a[1], c = "";
                const u = a[1].split(":");
                u.length > 1 && (c = u[u.length - 1], u.pop(), l = u.join(":")), l = l.replace(/\[/g, "").replace(/\]/g, "");
                let f = a[2], p = "";
                const d = a[2].split(":");
                d.length > 1 && (p = d[d.length - 1], d.pop(), f = d.join(":")), f = f.replace(/\[/g, "").replace(/\]/g, "");
                const m = M.toInt(a[4]);
                let h = a[3];
                h === "HERGESTELLT" && (h = "ESTABLISHED"), h.startsWith("ABH") && (h = "LISTEN"), h === "SCHLIESSEN_WARTEN" && (h = "CLOSE_WAIT"), h === "WARTEND" && (h = "TIME_WAIT"), h === "SYN_GESENDET" && (h = "SYN_SENT"), h === "LISTENING" && (h = "LISTEN"), h === "SYN_RECEIVED" && (h = "SYN_RECV"), h === "FIN_WAIT_1" && (h = "FIN_WAIT1"), h === "FIN_WAIT_2" && (h = "FIN_WAIT2"), a[0].toLowerCase() !== "udp" && h ? e.push({
                  protocol: a[0].toLowerCase(),
                  localAddress: l,
                  localPort: c,
                  peerAddress: f,
                  peerPort: p,
                  state: h,
                  pid: m,
                  process: ""
                }) : a[0].toLowerCase() === "udp" && e.push({
                  protocol: a[0].toLowerCase(),
                  localAddress: l,
                  localPort: c,
                  peerAddress: f,
                  peerPort: p,
                  state: "",
                  pid: parseInt(a[3], 10),
                  process: ""
                });
              }
            }), t && t(e), n(e));
          });
        } catch {
          t && t(e), n(e);
        }
      }
    });
  });
}
Vt.networkConnections = ja;
function qa(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = "";
      if (ze || at || lt || ct) {
        const s = "ip route get 1";
        try {
          Ce(s, { maxBuffer: 1024 * 102400 }, (r, i) => {
            if (r)
              t && t(e), n(e);
            else {
              let o = i.toString().split(`
`), l = (o && o[0] ? o[0] : "").split(" via ");
              l && l[1] && (l = l[1].split(" "), e = l[0]), t && t(e), n(e);
            }
          });
        } catch {
          t && t(e), n(e);
        }
      }
      if (Ue) {
        let s = "route -n get default";
        try {
          Ce(s, { maxBuffer: 1024 * 102400 }, (r, i) => {
            if (!r) {
              const o = i.toString().split(`
`).map((a) => a.trim());
              e = M.getValue(o, "gateway");
            }
            e ? (t && t(e), n(e)) : (s = "netstat -rn | awk '/default/ {print $2}'", Ce(s, { maxBuffer: 1024 * 102400 }, (o, a) => {
              e = a.toString().split(`
`).map((c) => c.trim()).find(
                (c) => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(c)
              ), t && t(e), n(e);
            }));
          });
        } catch {
          t && t(e), n(e);
        }
      }
      if (Cn)
        try {
          Ce("netstat -r", M.execOptsWin, (s, r) => {
            r.toString().split(bn.EOL).forEach((o) => {
              if (o = o.replace(/\s+/g, " ").trim(), o.indexOf("0.0.0.0 0.0.0.0") > -1 && !/[a-zA-Z]/.test(o)) {
                const a = o.split(" ");
                a.length >= 5 && a[a.length - 3].indexOf(".") > -1 && (e = a[a.length - 3]);
              }
            }), e ? (t && t(e), n(e)) : M.powerShell("Get-CimInstance -ClassName Win32_IP4RouteTable | Where-Object { $_.Destination -eq '0.0.0.0' -and $_.Mask -eq '0.0.0.0' }").then((o) => {
              let a = o.toString().split(`\r
`);
              a.length > 1 && !e && (e = M.getValue(a, "NextHop"), t && t(e), n(e));
            });
          });
        } catch {
          t && t(e), n(e);
        }
    });
  });
}
Vt.networkGatewayDefault = qa;
var Qn = {};
const an = Fe, Di = te.exec, ut = te.execSync, v = T;
let Bn = process.platform;
const Vi = Bn === "linux" || Bn === "android", bi = Bn === "darwin", Bi = Bn === "win32";
function Ni(t) {
  const n = parseFloat(t);
  return n < 0 ? 0 : n >= 100 ? -50 : n / 2 - 100;
}
function Nn(t) {
  const n = 2 * (parseFloat(t) + 100);
  return n <= 100 ? n : 100;
}
const un = {
  1: 2412,
  2: 2417,
  3: 2422,
  4: 2427,
  5: 2432,
  6: 2437,
  7: 2442,
  8: 2447,
  9: 2452,
  10: 2457,
  11: 2462,
  12: 2467,
  13: 2472,
  14: 2484,
  32: 5160,
  34: 5170,
  36: 5180,
  38: 5190,
  40: 5200,
  42: 5210,
  44: 5220,
  46: 5230,
  48: 5240,
  50: 5250,
  52: 5260,
  54: 5270,
  56: 5280,
  58: 5290,
  60: 5300,
  62: 5310,
  64: 5320,
  68: 5340,
  96: 5480,
  100: 5500,
  102: 5510,
  104: 5520,
  106: 5530,
  108: 5540,
  110: 5550,
  112: 5560,
  114: 5570,
  116: 5580,
  118: 5590,
  120: 5600,
  122: 5610,
  124: 5620,
  126: 5630,
  128: 5640,
  132: 5660,
  134: 5670,
  136: 5680,
  138: 5690,
  140: 5700,
  142: 5710,
  144: 5720,
  149: 5745,
  151: 5755,
  153: 5765,
  155: 5775,
  157: 5785,
  159: 5795,
  161: 5805,
  165: 5825,
  169: 5845,
  173: 5865,
  183: 4915,
  184: 4920,
  185: 4925,
  187: 4935,
  188: 4940,
  189: 4945,
  192: 4960,
  196: 4980
};
function pn(t) {
  return {}.hasOwnProperty.call(un, t) ? un[t] : null;
}
function Ya(t) {
  let n = 0;
  for (let e in un)
    ({}).hasOwnProperty.call(un, e) && un[e] === t && (n = v.toInt(e));
  return n;
}
function tr() {
  const t = [], n = "iw dev 2>/dev/null";
  try {
    const s = ut(n, v.execOptsLinux).toString().split(`
`).map((r) => r.trim()).join(`
`).split(`
Interface `);
    return s.shift(), s.forEach((r) => {
      const i = r.split(`
`), o = i[0], a = v.toInt(v.getValue(i, "ifindex", " ")), l = v.getValue(i, "addr", " "), c = v.toInt(v.getValue(i, "channel", " "));
      t.push({
        id: a,
        iface: o,
        mac: l,
        channel: c
      });
    }), t;
  } catch {
    try {
      const s = ut("nmcli -t -f general,wifi-properties,wired-properties,interface-flags,capabilities,nsp device show 2>/dev/null", v.execOptsLinux).toString().split(`

`);
      let r = 1;
      return s.forEach((i) => {
        const o = i.split(`
`), a = v.getValue(o, "GENERAL.DEVICE"), l = v.getValue(o, "GENERAL.TYPE"), c = r++, u = v.getValue(o, "GENERAL.HWADDR");
        l.toLowerCase() === "wifi" && t.push({
          id: c,
          iface: a,
          mac: u,
          channel: ""
        });
      }), t;
    } catch {
      return [];
    }
  }
}
function nr(t) {
  const n = `nmcli -t -f general,wifi-properties,capabilities,ip4,ip6 device show ${t} 2> /dev/null`;
  try {
    const e = ut(n, v.execOptsLinux).toString().split(`
`), s = v.getValue(e, "GENERAL.CONNECTION");
    return {
      iface: t,
      type: v.getValue(e, "GENERAL.TYPE"),
      vendor: v.getValue(e, "GENERAL.VENDOR"),
      product: v.getValue(e, "GENERAL.PRODUCT"),
      mac: v.getValue(e, "GENERAL.HWADDR").toLowerCase(),
      ssid: s !== "--" ? s : null
    };
  } catch {
    return {};
  }
}
function Ja(t) {
  const n = `nmcli -t --show-secrets connection show ${t} 2>/dev/null`;
  try {
    const e = ut(n, v.execOptsLinux).toString().split(`
`), s = v.getValue(e, "802-11-wireless.seen-bssids").toLowerCase();
    return {
      ssid: t !== "--" ? t : null,
      uuid: v.getValue(e, "connection.uuid"),
      type: v.getValue(e, "connection.type"),
      autoconnect: v.getValue(e, "connection.autoconnect") === "yes",
      security: v.getValue(e, "802-11-wireless-security.key-mgmt"),
      bssid: s !== "--" ? s : null
    };
  } catch {
    return {};
  }
}
function Qa(t) {
  if (!t)
    return {};
  const n = `wpa_cli -i ${t} status 2>&1`;
  try {
    const e = ut(n, v.execOptsLinux).toString().split(`
`), s = v.toInt(v.getValue(e, "freq", "="));
    return {
      ssid: v.getValue(e, "ssid", "="),
      uuid: v.getValue(e, "uuid", "="),
      security: v.getValue(e, "key_mgmt", "="),
      freq: s,
      channel: Ya(s),
      bssid: v.getValue(e, "bssid", "=").toLowerCase()
    };
  } catch {
    return {};
  }
}
function ir() {
  const t = [], n = "nmcli -t -m multiline --fields active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags device wifi list 2>/dev/null";
  try {
    const s = ut(n, v.execOptsLinux).toString().split("ACTIVE:");
    return s.shift(), s.forEach((r) => {
      r = "ACTIVE:" + r;
      const i = r.split(an.EOL), o = v.getValue(i, "CHAN"), a = v.getValue(i, "FREQ").toLowerCase().replace("mhz", "").trim(), l = v.getValue(i, "SECURITY").replace("(", "").replace(")", ""), c = v.getValue(i, "WPA-FLAGS").replace("(", "").replace(")", ""), u = v.getValue(i, "RSN-FLAGS").replace("(", "").replace(")", ""), f = v.getValue(i, "SIGNAL");
      t.push({
        ssid: v.getValue(i, "SSID"),
        bssid: v.getValue(i, "BSSID").toLowerCase(),
        mode: v.getValue(i, "MODE"),
        channel: o ? parseInt(o, 10) : null,
        frequency: a ? parseInt(a, 10) : null,
        signalLevel: Ni(f),
        quality: f ? parseInt(f, 10) : null,
        security: l && l !== "none" ? l.split(" ") : [],
        wpaFlags: c && c !== "none" ? c.split(" ") : [],
        rsnFlags: u && u !== "none" ? u.split(" ") : []
      });
    }), t;
  } catch {
    return [];
  }
}
function ps(t) {
  const n = [];
  try {
    let e = ut(`export LC_ALL=C; iwlist ${t} scan 2>&1; unset LC_ALL`, v.execOptsLinux).toString().split("        Cell ");
    return e[0].indexOf("resource busy") >= 0 ? -1 : (e.length > 1 && (e.shift(), e.forEach((s) => {
      const r = s.split(`
`), i = v.getValue(r, "channel", ":", !0), o = r && r.length && r[0].indexOf("Address:") >= 0 ? r[0].split("Address:")[1].trim().toLowerCase() : "", a = v.getValue(r, "mode", ":", !0), l = v.getValue(r, "frequency", ":", !0), u = v.getValue(r, "Quality", "=", !0).toLowerCase().split("signal level="), f = u.length > 1 ? v.toInt(u[1]) : 0, p = f ? Nn(f) : 0, d = v.getValue(r, "essid", ":", !0), m = s.indexOf(" WPA ") >= 0, h = s.indexOf("WPA2 ") >= 0, y = [];
      m && y.push("WPA"), h && y.push("WPA2");
      const g = [];
      let x = "";
      r.forEach((S) => {
        const C = S.trim().toLowerCase();
        if (C.indexOf("group cipher") >= 0) {
          x && g.push(x);
          const L = C.split(":");
          L.length > 1 && (x = L[1].trim().toUpperCase());
        }
        if (C.indexOf("pairwise cipher") >= 0) {
          const L = C.split(":");
          L.length > 1 && (L[1].indexOf("tkip") ? x = x ? "TKIP/" + x : "TKIP" : L[1].indexOf("ccmp") ? x = x ? "CCMP/" + x : "CCMP" : L[1].indexOf("proprietary") && (x = x ? "PROP/" + x : "PROP"));
        }
        if (C.indexOf("authentication suites") >= 0) {
          const L = C.split(":");
          L.length > 1 && (L[1].indexOf("802.1x") ? x = x ? "802.1x/" + x : "802.1x" : L[1].indexOf("psk") && (x = x ? "PSK/" + x : "PSK"));
        }
      }), x && g.push(x), n.push({
        ssid: d,
        bssid: o,
        mode: a,
        channel: i ? v.toInt(i) : null,
        frequency: l ? v.toInt(l.replace(".", "")) : null,
        signalLevel: f,
        quality: p,
        security: y,
        wpaFlags: g,
        rsnFlags: []
      });
    })), n);
  } catch {
    return -1;
  }
}
function Za(t) {
  const n = [];
  try {
    let e = JSON.parse(t);
    return e = e.SPAirPortDataType[0].spairport_airport_interfaces[0].spairport_airport_other_local_wireless_networks, e.forEach((s) => {
      const r = [], i = s.spairport_security_mode || "";
      i === "spairport_security_mode_wep" ? r.push("WEP") : i === "spairport_security_mode_wpa2_personal" ? r.push("WPA2") : i.startsWith("spairport_security_mode_wpa2_enterprise") ? r.push("WPA2 EAP") : i.startsWith("pairport_security_mode_wpa3_transition") ? r.push("WPA2/WPA3") : i.startsWith("pairport_security_mode_wpa3") && r.push("WPA3");
      const o = parseInt(("" + s.spairport_network_channel).split(" ")[0]) || 0, a = s.spairport_signal_noise || null;
      n.push({
        ssid: s._name || "",
        bssid: s.spairport_network_bssid || null,
        mode: s.spairport_network_phymode,
        channel: o,
        frequency: pn(o),
        signalLevel: a ? parseInt(a, 10) : null,
        quality: Nn(a),
        security: r,
        wpaFlags: [],
        rsnFlags: []
      });
    }), n;
  } catch {
    return n;
  }
}
function el(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (Vi)
        if (e = ir(), e.length === 0)
          try {
            const s = ut("export LC_ALL=C; iwconfig 2>/dev/null; unset LC_ALL", v.execOptsLinux).toString().split(`

`);
            let r = "";
            if (s.forEach((i) => {
              i.indexOf("no wireless") === -1 && i.trim() !== "" && (r = i.split(" ")[0]);
            }), r) {
              let i = "";
              const o = v.isPrototypePolluted() ? "---" : v.sanitizeShellString(r, !0), a = v.mathMin(o.length, 2e3);
              for (let c = 0; c <= a; c++)
                o[c] !== void 0 && (i = i + o[c]);
              const l = ps(i);
              l === -1 ? setTimeout(() => {
                const c = ps(i);
                c !== -1 && (e = c), t && t(e), n(e);
              }, 4e3) : (e = l, t && t(e), n(e));
            } else
              t && t(e), n(e);
          } catch {
            t && t(e), n(e);
          }
        else
          t && t(e), n(e);
      else bi ? Di("system_profiler SPAirPortDataType -json 2>/dev/null", { maxBuffer: 1024 * 4e4 }, (r, i) => {
        e = Za(i.toString()), t && t(e), n(e);
      }) : Bi ? v.powerShell("netsh wlan show networks mode=Bssid").then((r) => {
        const i = r.toString("utf8").split(an.EOL + an.EOL + "SSID ");
        i.shift(), i.forEach((o) => {
          const a = o.split(an.EOL);
          if (a && a.length >= 8 && a[0].indexOf(":") >= 0) {
            const l = o.split(" BSSID");
            l.shift(), l.forEach((c) => {
              const u = c.split(an.EOL), f = u[0].split(":");
              f.shift();
              const p = f.join(":").trim().toLowerCase(), d = u[3].split(":").pop().trim(), m = u[1].split(":").pop().trim();
              e.push({
                ssid: a[0].split(":").pop().trim(),
                bssid: p,
                mode: "",
                channel: d ? parseInt(d, 10) : null,
                frequency: pn(d),
                signalLevel: Ni(m),
                quality: m ? parseInt(m, 10) : null,
                security: [a[2].split(":").pop().trim()],
                wpaFlags: [a[3].split(":").pop().trim()],
                rsnFlags: []
              });
            });
          }
        }), t && t(e), n(e);
      }) : (t && t(e), n(e));
    });
  });
}
Qn.wifiNetworks = el;
function tl(t) {
  t = t.toLowerCase();
  let n = "";
  return t.indexOf("intel") >= 0 ? n = "Intel" : t.indexOf("realtek") >= 0 ? n = "Realtek" : t.indexOf("qualcom") >= 0 ? n = "Qualcom" : t.indexOf("broadcom") >= 0 ? n = "Broadcom" : t.indexOf("cavium") >= 0 ? n = "Cavium" : t.indexOf("cisco") >= 0 ? n = "Cisco" : t.indexOf("marvel") >= 0 ? n = "Marvel" : t.indexOf("zyxel") >= 0 ? n = "Zyxel" : t.indexOf("melanox") >= 0 ? n = "Melanox" : t.indexOf("d-link") >= 0 ? n = "D-Link" : t.indexOf("tp-link") >= 0 ? n = "TP-Link" : t.indexOf("asus") >= 0 ? n = "Asus" : t.indexOf("linksys") >= 0 && (n = "Linksys"), n;
}
function nl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = [];
      if (Vi) {
        const s = tr(), r = ir();
        s.forEach((i) => {
          let o = "";
          const a = v.isPrototypePolluted() ? "---" : v.sanitizeShellString(i.iface, !0), l = v.mathMin(a.length, 2e3);
          for (let C = 0; C <= l; C++)
            a[C] !== void 0 && (o = o + a[C]);
          const c = nr(o), u = Qa(o), f = c.ssid || u.ssid, p = r.filter((C) => C.ssid === f);
          let d = "";
          const m = v.isPrototypePolluted() ? "---" : v.sanitizeShellString(f, !0), h = v.mathMin(m.length, 32);
          for (let C = 0; C <= h; C++)
            m[C] !== void 0 && (d = d + m[C]);
          const y = Ja(d), g = p && p.length && p[0].channel ? p[0].channel : u.channel ? u.channel : null, x = p && p.length && p[0].bssid ? p[0].bssid : u.bssid ? u.bssid : null, S = p && p.length && p[0].signalLevel ? p[0].signalLevel : null;
          f && x && e.push({
            id: i.id,
            iface: i.iface,
            model: c.product,
            ssid: f,
            bssid: p && p.length && p[0].bssid ? p[0].bssid : u.bssid ? u.bssid : null,
            channel: g,
            frequency: g ? pn(g) : null,
            type: y.type ? y.type : "802.11",
            security: y.security ? y.security : u.security ? u.security : null,
            signalLevel: S,
            quality: Nn(S),
            txRate: null
          });
        }), t && t(e), n(e);
      } else bi ? Di('system_profiler SPNetworkDataType SPAirPortDataType -xml 2>/dev/null; echo "######" ; ioreg -n AppleBCMWLANSkywalkInterface -r 2>/dev/null', (r, i) => {
        try {
          const o = i.toString().split("######"), a = v.plistParser(o[0]), l = a[0]._SPCommandLineArguments.indexOf("SPNetworkDataType") >= 0 ? a[0]._items : a[1]._items, c = a[0]._SPCommandLineArguments.indexOf("SPAirPortDataType") >= 0 ? a[0]._items[0].spairport_airport_interfaces : a[1]._items[0].spairport_airport_interfaces;
          let u = [];
          o[1].indexOf("  | {") > 0 && o[1].indexOf("  | }") > o[1].indexOf("  | {") && (u = o[1].split("  | {")[1].split("  | }")[0].replace(/ \| /g, "").replace(/"/g, "").split(`
`));
          const f = l.find((g) => g._name === "Wi-Fi"), p = c[0].spairport_current_network_information, d = parseInt(("" + p.spairport_network_channel).split(" ")[0], 10) || 0, m = p.spairport_signal_noise || null, h = [], y = p.spairport_security_mode || "";
          y === "spairport_security_mode_wep" ? h.push("WEP") : y === "spairport_security_mode_wpa2_personal" ? h.push("WPA2") : y.startsWith("spairport_security_mode_wpa2_enterprise") ? h.push("WPA2 EAP") : y.startsWith("pairport_security_mode_wpa3_transition") ? h.push("WPA2/WPA3") : y.startsWith("pairport_security_mode_wpa3") && h.push("WPA3"), e.push({
            id: f._name || "Wi-Fi",
            iface: f.interface || "",
            model: f.hardware || "",
            ssid: (p._name || "").replace("&lt;", "<").replace("&gt;", ">"),
            bssid: p.spairport_network_bssid || "",
            channel: d,
            frequency: d ? pn(d) : null,
            type: p.spairport_network_phymode || "802.11",
            security: h,
            signalLevel: m ? parseInt(m, 10) : null,
            quality: Nn(m),
            txRate: p.spairport_network_rate || null
          });
        } catch {
          v.noop();
        }
        t && t(e), n(e);
      }) : Bi ? v.powerShell("netsh wlan show interfaces").then((r) => {
        const i = r.toString().split(`\r
`);
        for (let a = 0; a < i.length; a++)
          i[a] = i[a].trim();
        const o = i.join(`\r
`).split(`:\r
\r
`);
        o.shift(), o.forEach((a) => {
          const l = a.split(`\r
`);
          if (l.length >= 5) {
            const c = l[0].indexOf(":") >= 0 ? l[0].split(":")[1].trim() : "", u = l[1].indexOf(":") >= 0 ? l[1].split(":")[1].trim() : "", f = l[2].indexOf(":") >= 0 ? l[2].split(":")[1].trim() : "", p = v.getValue(l, "SSID", ":", !0), d = v.getValue(l, "BSSID", ":", !0) || v.getValue(l, "AP BSSID", ":", !0), m = v.getValue(l, "Signal", ":", !0), h = Ni(m), y = v.getValue(l, "Radio type", ":", !0) || v.getValue(l, "Type de radio", ":", !0) || v.getValue(l, "Funktyp", ":", !0) || null, g = v.getValue(l, "authentication", ":", !0) || v.getValue(l, "Authentification", ":", !0) || v.getValue(l, "Authentifizierung", ":", !0) || null, x = v.getValue(l, "Channel", ":", !0) || v.getValue(l, "Canal", ":", !0) || v.getValue(l, "Kanal", ":", !0) || null, S = v.getValue(l, "Transmit rate (mbps)", ":", !0) || v.getValue(l, "Transmission (mbit/s)", ":", !0) || v.getValue(l, "Empfangsrate (MBit/s)", ":", !0) || null;
            u && f && p && d && e.push({
              id: f,
              iface: c,
              model: u,
              ssid: p,
              bssid: d,
              channel: v.toInt(x),
              frequency: x ? pn(x) : null,
              type: y,
              security: g,
              signalLevel: h,
              quality: m ? parseInt(m, 10) : null,
              txRate: v.toInt(S) || null
            });
          }
        }), t && t(e), n(e);
      }) : (t && t(e), n(e));
    });
  });
}
Qn.wifiConnections = nl;
function il(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = [];
      Vi ? (tr().forEach((r) => {
        const i = nr(r.iface);
        e.push({
          id: r.id,
          iface: r.iface,
          model: i.product ? i.product : null,
          vendor: i.vendor ? i.vendor : null,
          mac: r.mac
        });
      }), t && t(e), n(e)) : bi ? Di("system_profiler SPNetworkDataType", (r, i) => {
        const o = i.toString().split(`

    Wi-Fi:

`);
        if (o.length > 1) {
          const a = o[1].split(`

`)[0].split(`
`), l = v.getValue(a, "BSD Device Name", ":", !0), c = v.getValue(a, "MAC Address", ":", !0), u = v.getValue(a, "hardware", ":", !0);
          e.push({
            id: "Wi-Fi",
            iface: l,
            model: u,
            vendor: "",
            mac: c
          });
        }
        t && t(e), n(e);
      }) : Bi ? v.powerShell("netsh wlan show interfaces").then((r) => {
        const i = r.toString().split(`\r
`);
        for (let a = 0; a < i.length; a++)
          i[a] = i[a].trim();
        const o = i.join(`\r
`).split(`:\r
\r
`);
        o.shift(), o.forEach((a) => {
          const l = a.split(`\r
`);
          if (l.length >= 5) {
            const c = l[0].indexOf(":") >= 0 ? l[0].split(":")[1].trim() : "", u = l[1].indexOf(":") >= 0 ? l[1].split(":")[1].trim() : "", f = l[2].indexOf(":") >= 0 ? l[2].split(":")[1].trim() : "", p = l[3].indexOf(":") >= 0 ? l[3].split(":") : [];
            p.shift();
            const d = p.join(":").trim(), m = tl(u);
            c && u && f && d && e.push({
              id: f,
              iface: c,
              model: u,
              vendor: m,
              mac: d
            });
          }
        }), t && t(e), n(e);
      }) : (t && t(e), n(e));
    });
  });
}
Qn.wifiInterfaces = il;
var Zn = {};
const kn = Fe, sl = ke, rl = Be, fn = te.exec, ui = te.execSync, X = T;
let pt = process.platform;
const We = pt === "linux" || pt === "android", vt = pt === "darwin", ki = pt === "win32", mn = pt === "freebsd", gn = pt === "openbsd", hn = pt === "netbsd", vn = pt === "sunos", ce = {
  all: 0,
  all_utime: 0,
  all_stime: 0,
  list: {},
  ms: 0,
  result: {}
}, zt = {
  all: 0,
  list: {},
  ms: 0,
  result: {}
}, Se = {
  all: 0,
  all_utime: 0,
  all_stime: 0,
  list: {},
  ms: 0,
  result: {}
}, fs = {
  0: "unknown",
  1: "other",
  2: "ready",
  3: "running",
  4: "blocked",
  5: "suspended blocked",
  6: "suspended ready",
  7: "terminated",
  8: "stopped",
  9: "growing"
};
function ol(t) {
  let n = t, e = t.replace(/ +/g, " ").split(" ");
  return e.length === 5 && (n = e[4] + "-" + ("0" + ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(e[1].toUpperCase()) / 3 + 1)).slice(-2) + "-" + ("0" + e[2]).slice(-2) + " " + e[3]), n;
}
function al(t) {
  let n = /* @__PURE__ */ new Date();
  n = new Date(n.getTime() - n.getTimezoneOffset() * 6e4);
  const e = t.split("-"), s = e.length - 1, r = s > 0 ? parseInt(e[s - 1]) : 0, i = e[s].split(":"), o = i.length === 3 ? parseInt(i[0] || 0) : 0, a = parseInt(i[i.length === 3 ? 1 : 0] || 0), l = parseInt(i[i.length === 3 ? 2 : 1] || 0), c = (((r * 24 + o) * 60 + a) * 60 + l) * 1e3;
  let u = new Date(n.getTime()), f = u.toISOString().substring(0, 10) + " " + u.toISOString().substring(11, 19);
  try {
    u = new Date(n.getTime() - c), f = u.toISOString().substring(0, 10) + " " + u.toISOString().substring(11, 19);
  } catch {
    X.noop();
  }
  return f;
}
function ll(t, n) {
  return X.isFunction(t) && !n && (n = t, t = ""), new Promise((e) => {
    process.nextTick(() => {
      if (typeof t != "string")
        return n && n([]), e([]);
      if (t) {
        let s = "";
        try {
          s.__proto__.toLowerCase = X.stringToLower, s.__proto__.replace = X.stringReplace, s.__proto__.toString = X.stringToString, s.__proto__.substr = X.stringSubstr, s.__proto__.substring = X.stringSubstring, s.__proto__.trim = X.stringTrim, s.__proto__.startsWith = X.stringStartWith;
        } catch {
          Object.setPrototypeOf(s, X.stringObj);
        }
        const r = X.sanitizeShellString(t), i = X.mathMin(r.length, 2e3);
        for (let c = 0; c <= i; c++)
          r[c] !== void 0 && (s = s + r[c]);
        s = s.trim().toLowerCase().replace(/, /g, "|").replace(/,+/g, "|"), s === "" && (s = "*"), X.isPrototypePolluted() && s !== "*" && (s = "------");
        let o = s.split("|"), a = [], l = [];
        if (We || mn || gn || hn || vt) {
          if ((We || mn || gn || hn) && s === "*")
            try {
              const u = ui("systemctl --all --type=service --no-legend 2> /dev/null", X.execOptsLinux).toString().split(`
`);
              o = [];
              for (const f of u) {
                const p = f.split(".service")[0];
                p && f.indexOf(" not-found ") === -1 && o.push(p.trim());
              }
              s = o.join("|");
            } catch {
              try {
                s = "";
                const f = ui("service --status-all 2> /dev/null", X.execOptsLinux).toString().split(`
`);
                for (const p of f) {
                  const d = p.split("]");
                  d.length === 2 && (s += (s !== "" ? "|" : "") + d[1].trim());
                }
                o = s.split("|");
              } catch {
                try {
                  const p = ui("ls /etc/init.d/ -m 2> /dev/null", X.execOptsLinux).toString().split(`
`).join("");
                  if (s = "", p) {
                    const d = p.split(",");
                    for (const m of d) {
                      const h = m.trim();
                      h && (s += (s !== "" ? "|" : "") + h);
                    }
                    o = s.split("|");
                  }
                } catch {
                  s = "", o = [];
                }
              }
            }
          vt && s === "*" && (n && n(a), e(a));
          let c = vt ? ["-caxo", "pcpu,pmem,pid,command"] : ["-axo", "pcpu,pmem,pid,command"];
          s !== "" && o.length > 0 ? X.execSafe("ps", c).then((u) => {
            if (u) {
              let f = u.replace(/ +/g, " ").replace(/,+/g, ".").split(`
`);
              if (o.forEach(function(p) {
                let d;
                vt ? d = f.filter(function(h) {
                  return h.toLowerCase().indexOf(p) !== -1;
                }) : d = f.filter(function(h) {
                  return h.toLowerCase().indexOf(" " + p.toLowerCase() + ":") !== -1 || h.toLowerCase().indexOf("(" + p.toLowerCase() + " ") !== -1 || h.toLowerCase().indexOf("(" + p.toLowerCase() + ")") !== -1 || h.toLowerCase().indexOf(" " + p.toLowerCase().replace(/[0-9.]/g, "") + ":") !== -1 || h.toLowerCase().indexOf("/" + p.toLowerCase()) !== -1;
                });
                const m = [];
                for (const h of d) {
                  const y = h.trim().split(" ")[2];
                  y && m.push(parseInt(y, 10));
                }
                a.push({
                  name: p,
                  running: d.length > 0,
                  startmode: "",
                  pids: m,
                  cpu: parseFloat(
                    d.reduce(function(h, y) {
                      return h + parseFloat(y.trim().split(" ")[0]);
                    }, 0).toFixed(2)
                  ),
                  mem: parseFloat(
                    d.reduce(function(h, y) {
                      return h + parseFloat(y.trim().split(" ")[1]);
                    }, 0).toFixed(2)
                  )
                });
              }), We) {
                let p = 'cat /proc/stat | grep "cpu "';
                for (let d in a)
                  for (let m in a[d].pids)
                    p += ";cat /proc/" + a[d].pids[m] + "/stat";
                fn(p, { maxBuffer: 1024 * 102400 }, function(d, m) {
                  let h = m.toString().split(`
`), y = Fi(h.shift()), g = {}, x = {};
                  h.forEach((S) => {
                    if (x = Ri(S, y, zt), x.pid) {
                      let C = -1;
                      for (let L in a)
                        for (let V in a[L].pids)
                          parseInt(a[L].pids[V]) === parseInt(x.pid) && (C = L);
                      C >= 0 && (a[C].cpu += x.cpuu + x.cpus), g[x.pid] = {
                        cpuu: x.cpuu,
                        cpus: x.cpus,
                        utime: x.utime,
                        stime: x.stime,
                        cutime: x.cutime,
                        cstime: x.cstime
                      };
                    }
                  }), zt.all = y, zt.list = Object.assign({}, g), zt.ms = Date.now() - zt.ms, zt.result = Object.assign({}, a), n && n(a), e(a);
                });
              } else
                n && n(a), e(a);
            } else
              c = ["-o", "comm"], X.execSafe("ps", c).then((f) => {
                if (f) {
                  let p = f.replace(/ +/g, " ").replace(/,+/g, ".").split(`
`);
                  o.forEach(function(d) {
                    let m = p.filter(function(h) {
                      return h.indexOf(d) !== -1;
                    });
                    a.push({
                      name: d,
                      running: m.length > 0,
                      startmode: "",
                      cpu: 0,
                      mem: 0
                    });
                  }), n && n(a), e(a);
                } else
                  o.forEach(function(p) {
                    a.push({
                      name: p,
                      running: !1,
                      startmode: "",
                      cpu: 0,
                      mem: 0
                    });
                  }), n && n(a), e(a);
              });
          }) : (n && n(a), e(a));
        }
        if (ki)
          try {
            let c = "Get-CimInstance Win32_Service";
            o[0] !== "*" && (c += ' -Filter "', o.forEach((u) => {
              c += `Name='${u}' or `;
            }), c = `${c.slice(0, -4)}"`), c += " | select Name,Caption,Started,StartMode,ProcessId | fl", X.powerShell(c).then((u, f) => {
              f ? (o.forEach((p) => {
                a.push({
                  name: p,
                  running: !1,
                  startmode: "",
                  cpu: 0,
                  mem: 0
                });
              }), n && n(a), e(a)) : (u.split(/\n\s*\n/).forEach((d) => {
                if (d.trim() !== "") {
                  let m = d.trim().split(`\r
`), h = X.getValue(m, "Name", ":", !0).toLowerCase(), y = X.getValue(m, "Caption", ":", !0).toLowerCase(), g = X.getValue(m, "Started", ":", !0), x = X.getValue(m, "StartMode", ":", !0), S = X.getValue(m, "ProcessId", ":", !0);
                  (s === "*" || o.indexOf(h) >= 0 || o.indexOf(y) >= 0) && (a.push({
                    name: h,
                    running: g.toLowerCase() === "true",
                    startmode: x,
                    pids: [S],
                    cpu: 0,
                    mem: 0
                  }), l.push(h), l.push(y));
                }
              }), s !== "*" && o.filter((m) => l.indexOf(m) === -1).forEach((m) => {
                a.push({
                  name: m,
                  running: !1,
                  startmode: "",
                  pids: [],
                  cpu: 0,
                  mem: 0
                });
              }), n && n(a), e(a));
            });
          } catch {
            n && n(a), e(a);
          }
      } else
        n && n([]), e([]);
    });
  });
}
Zn.services = ll;
function Fi(t) {
  const n = t.replace(/ +/g, " ").split(" "), e = n.length >= 2 ? parseInt(n[1]) : 0, s = n.length >= 3 ? parseInt(n[2]) : 0, r = n.length >= 4 ? parseInt(n[3]) : 0, i = n.length >= 5 ? parseInt(n[4]) : 0, o = n.length >= 6 ? parseInt(n[5]) : 0, a = n.length >= 7 ? parseInt(n[6]) : 0, l = n.length >= 8 ? parseInt(n[7]) : 0, c = n.length >= 9 ? parseInt(n[8]) : 0, u = n.length >= 10 ? parseInt(n[9]) : 0, f = n.length >= 11 ? parseInt(n[10]) : 0;
  return e + s + r + i + o + a + l + c + u + f;
}
function Ri(t, n, e) {
  let s = t.replace(/ +/g, " ").split(")");
  if (s.length >= 2) {
    let r = s[1].split(" ");
    if (r.length >= 16) {
      let i = parseInt(s[0].split(" ")[0]), o = parseInt(r[12]), a = parseInt(r[13]), l = parseInt(r[14]), c = parseInt(r[15]), u = 0, f = 0;
      return e.all > 0 && e.list[i] ? (u = (o + l - e.list[i].utime - e.list[i].cutime) / (n - e.all) * 100, f = (a + c - e.list[i].stime - e.list[i].cstime) / (n - e.all) * 100) : (u = (o + l) / n * 100, f = (a + c) / n * 100), {
        pid: i,
        utime: o,
        stime: a,
        cutime: l,
        cstime: c,
        cpuu: u,
        cpus: f
      };
    } else
      return {
        pid: 0,
        utime: 0,
        stime: 0,
        cutime: 0,
        cstime: 0,
        cpuu: 0,
        cpus: 0
      };
  } else
    return {
      pid: 0,
      utime: 0,
      stime: 0,
      cutime: 0,
      cstime: 0,
      cpuu: 0,
      cpus: 0
    };
}
function sr(t, n, e) {
  let s = 0, r = 0;
  return e.all > 0 && e.list[t.pid] ? (s = (t.utime - e.list[t.pid].utime) / (n - e.all) * 100, r = (t.stime - e.list[t.pid].stime) / (n - e.all) * 100) : (s = t.utime / n * 100, r = t.stime / n * 100), {
    pid: t.pid,
    utime: t.utime,
    stime: t.stime,
    cpuu: s > 0 ? s : 0,
    cpus: r > 0 ? r : 0
  };
}
function cl(t) {
  let n = [];
  function e(o) {
    o = o || "";
    let a = o.split(" ")[0];
    if (a.substr(-1) === ":" && (a = a.substr(0, a.length - 1)), a.substr(0, 1) !== "[") {
      let l = a.split("/");
      isNaN(parseInt(l[l.length - 1])) ? a = l[l.length - 1] : a = l[0];
    }
    return a;
  }
  function s(o) {
    let a = 0, l = 0;
    function c($) {
      a = l, n[$] ? l = o.substring(n[$].to + a, 1e4).indexOf(" ") : l = 1e4;
    }
    c(0);
    const u = parseInt(o.substring(n[0].from + a, n[0].to + l));
    c(1);
    const f = parseInt(o.substring(n[1].from + a, n[1].to + l));
    c(2);
    const p = parseFloat(o.substring(n[2].from + a, n[2].to + l).replace(/,/g, "."));
    c(3);
    const d = parseFloat(o.substring(n[3].from + a, n[3].to + l).replace(/,/g, "."));
    c(4);
    const m = parseInt(o.substring(n[4].from + a, n[4].to + l));
    c(5);
    const h = parseInt(o.substring(n[5].from + a, n[5].to + l));
    c(6);
    const y = parseInt(o.substring(n[6].from + a, n[6].to + l));
    c(7);
    const g = parseInt(o.substring(n[7].from + a, n[7].to + l)) || 0;
    c(8);
    const x = vn ? ol(o.substring(n[8].from + a, n[8].to + l).trim()) : al(o.substring(n[8].from + a, n[8].to + l).trim());
    c(9);
    let S = o.substring(n[9].from + a, n[9].to + l).trim();
    S = S[0] === "R" ? "running" : S[0] === "S" ? "sleeping" : S[0] === "T" ? "stopped" : S[0] === "W" ? "paging" : S[0] === "X" ? "dead" : S[0] === "Z" ? "zombie" : S[0] === "D" || S[0] === "U" ? "blocked" : "unknown", c(10);
    let C = o.substring(n[10].from + a, n[10].to + l).trim();
    (C === "?" || C === "??") && (C = ""), c(11);
    const L = o.substring(n[11].from + a, n[11].to + l).trim();
    c(12);
    let V = "", E = "", U = "", O = o.substring(n[12].from + a, n[12].to + l).trim();
    if (O.substr(O.length - 1) === "]" && (O = O.slice(0, -1)), O.substr(0, 1) === "[")
      E = O.substring(1);
    else {
      const $ = O.indexOf("("), ne = O.indexOf(")"), re = O.indexOf("/"), oe = O.indexOf(":");
      if ($ < ne && $ < re && re < ne)
        E = O.split(" ")[0], E = E.replace(/:/g, "");
      else if (oe > 0 && (re === -1 || re > 3))
        E = O.split(" ")[0], E = E.replace(/:/g, "");
      else {
        let ae = O.indexOf(" -"), b = O.indexOf(" /");
        ae = ae >= 0 ? ae : 1e4, b = b >= 0 ? b : 1e4;
        const me = Math.min(ae, b);
        let z = O.substr(0, me);
        const ee = O.substr(me), F = z.lastIndexOf("/");
        if (F >= 0 && (V = z.substr(0, F), z = z.substr(F + 1)), me === 1e4 && z.indexOf(" ") > -1) {
          const B = z.split(" ");
          sl.existsSync(rl.join(V, B[0])) ? (E = B.shift(), U = (B.join(" ") + " " + ee).trim()) : (E = z.trim(), U = ee.trim());
        } else
          E = z.trim(), U = ee.trim();
      }
    }
    return {
      pid: u,
      parentPid: f,
      name: We ? e(E) : E,
      cpu: p,
      cpuu: 0,
      cpus: 0,
      mem: d,
      priority: m,
      memVsz: h,
      memRss: y,
      nice: g,
      started: x,
      state: S,
      tty: C,
      user: L,
      command: E,
      params: U,
      path: V
    };
  }
  function r(o) {
    let a = [];
    if (o.length > 1) {
      let l = o[0];
      n = X.parseHead(l, 8), o.shift(), o.forEach((c) => {
        c.trim() !== "" && a.push(s(c));
      });
    }
    return a;
  }
  function i(o) {
    function a(u) {
      const f = ("0" + (u.getMonth() + 1).toString()).slice(-2), p = u.getFullYear().toString(), d = ("0" + u.getDate().toString()).slice(-2), m = ("0" + u.getHours().toString()).slice(-2), h = ("0" + u.getMinutes().toString()).slice(-2), y = ("0" + u.getSeconds().toString()).slice(-2);
      return p + "-" + f + "-" + d + " " + m + ":" + h + ":" + y;
    }
    function l(u) {
      let f = "";
      if (u.indexOf("d") >= 0) {
        const p = u.split("d");
        f = a(new Date(Date.now() - (p[0] * 24 + p[1] * 1) * 60 * 60 * 1e3));
      } else if (u.indexOf("h") >= 0) {
        const p = u.split("h");
        f = a(new Date(Date.now() - (p[0] * 60 + p[1] * 1) * 60 * 1e3));
      } else if (u.indexOf(":") >= 0) {
        const p = u.split(":");
        f = a(new Date(Date.now() - (p.length > 1 ? (p[0] * 60 + p[1]) * 1e3 : p[0] * 1e3)));
      }
      return f;
    }
    let c = [];
    return o.forEach((u) => {
      if (u.trim() !== "") {
        u = u.trim().replace(/ +/g, " ").replace(/,+/g, ".");
        const f = u.split(" "), p = f.slice(9).join(" "), d = parseFloat((1 * parseInt(f[3]) * 1024 / kn.totalmem()).toFixed(1)), m = l(f[5]);
        c.push({
          pid: parseInt(f[0]),
          parentPid: parseInt(f[1]),
          name: e(p),
          cpu: 0,
          cpuu: 0,
          cpus: 0,
          mem: d,
          priority: 0,
          memVsz: parseInt(f[2]),
          memRss: parseInt(f[3]),
          nice: parseInt(f[4]),
          started: m,
          state: f[6] === "R" ? "running" : f[6] === "S" ? "sleeping" : f[6] === "T" ? "stopped" : f[6] === "W" ? "paging" : f[6] === "X" ? "dead" : f[6] === "Z" ? "zombie" : f[6] === "D" || f[6] === "U" ? "blocked" : "unknown",
          tty: f[7],
          user: f[8],
          command: p
        });
      }
    }), c;
  }
  return new Promise((o) => {
    process.nextTick(() => {
      let a = {
        all: 0,
        running: 0,
        blocked: 0,
        sleeping: 0,
        unknown: 0,
        list: []
      }, l = "";
      if (ce.ms && Date.now() - ce.ms >= 500 || ce.ms === 0)
        if (We || mn || gn || hn || vt || vn) {
          We && (l = "export LC_ALL=C; ps -axo pid:11,ppid:11,pcpu:6,pmem:6,pri:5,vsz:11,rss:11,ni:5,etime:30,state:5,tty:15,user:20,command; unset LC_ALL"), (mn || gn || hn) && (l = "export LC_ALL=C; ps -axo pid,ppid,pcpu,pmem,pri,vsz,rss,ni,etime,state,tty,user,command; unset LC_ALL"), vt && (l = "ps -axo pid,ppid,pcpu,pmem,pri,vsz=temp_title_1,rss=temp_title_2,nice,etime=temp_title_3,state,tty,user,command -r"), vn && (l = "ps -Ao pid,ppid,pcpu,pmem,pri,vsz,rss,nice,stime,s,tty,user,comm");
          try {
            fn(l, { maxBuffer: 1024 * 102400 }, (c, u) => {
              !c && u.toString().trim() ? (a.list = r(u.toString().split(`
`)).slice(), a.all = a.list.length, a.running = a.list.filter((f) => f.state === "running").length, a.blocked = a.list.filter((f) => f.state === "blocked").length, a.sleeping = a.list.filter((f) => f.state === "sleeping").length, We ? (l = 'cat /proc/stat | grep "cpu "', a.list.forEach((f) => {
                l += ";cat /proc/" + f.pid + "/stat";
              }), fn(l, { maxBuffer: 1024 * 102400 }, (f, p) => {
                let d = p.toString().split(`
`), m = Fi(d.shift()), h = {}, y = {};
                d.forEach((g) => {
                  if (y = Ri(g, m, ce), y.pid) {
                    let x = a.list.map((S) => S.pid).indexOf(y.pid);
                    x >= 0 && (a.list[x].cpu = y.cpuu + y.cpus, a.list[x].cpuu = y.cpuu, a.list[x].cpus = y.cpus), h[y.pid] = {
                      cpuu: y.cpuu,
                      cpus: y.cpus,
                      utime: y.utime,
                      stime: y.stime,
                      cutime: y.cutime,
                      cstime: y.cstime
                    };
                  }
                }), ce.all = m, ce.list = Object.assign({}, h), ce.ms = Date.now() - ce.ms, ce.result = Object.assign({}, a), t && t(a), o(a);
              })) : (t && t(a), o(a))) : (l = "ps -o pid,ppid,vsz,rss,nice,etime,stat,tty,user,comm", vn && (l = "ps -o pid,ppid,vsz,rss,nice,etime,s,tty,user,comm"), fn(l, { maxBuffer: 1024 * 102400 }, (f, p) => {
                if (f)
                  t && t(a), o(a);
                else {
                  let d = p.toString().split(`
`);
                  d.shift(), a.list = i(d).slice(), a.all = a.list.length, a.running = a.list.filter((m) => m.state === "running").length, a.blocked = a.list.filter((m) => m.state === "blocked").length, a.sleeping = a.list.filter((m) => m.state === "sleeping").length, t && t(a), o(a);
                }
              }));
            });
          } catch {
            t && t(a), o(a);
          }
        } else if (ki)
          try {
            X.powerShell(
              `Get-CimInstance Win32_Process | select-Object ProcessId,ParentProcessId,ExecutionState,Caption,CommandLine,ExecutablePath,UserModeTime,KernelModeTime,WorkingSetSize,Priority,PageFileUsage,
                @{n="CreationDate";e={$_.CreationDate.ToString("yyyy-MM-dd HH:mm:ss")}} | ConvertTo-Json -compress`
            ).then((c, u) => {
              if (!u) {
                const f = [], p = [], d = {};
                let m = 0, h = 0, y = [];
                try {
                  c = c.trim().replace(/^\uFEFF/, ""), y = JSON.parse(c);
                } catch {
                }
                y.forEach((g) => {
                  const x = g.ProcessId, S = g.ParentProcessId, C = g.ExecutionState || null, L = g.Caption, V = g.CommandLine, E = g.ExecutablePath, U = g.UserModeTime, O = g.KernelModeTime, $ = g.WorkingSetSize;
                  m = m + U, h = h + O, a.all++, C || a.unknown++, C === "3" && a.running++, (C === "4" || C === "5") && a.blocked++, p.push({
                    pid: x,
                    utime: U,
                    stime: O,
                    cpu: 0,
                    cpuu: 0,
                    cpus: 0
                  }), f.push({
                    pid: x,
                    parentPid: S,
                    name: L,
                    cpu: 0,
                    cpuu: 0,
                    cpus: 0,
                    mem: $ / kn.totalmem() * 100,
                    priority: g.Priority | null,
                    memVsz: g.PageFileUsage || null,
                    memRss: Math.floor((g.WorkingSetSize || 0) / 1024),
                    nice: 0,
                    started: g.CreationDate,
                    state: C ? fs[C] : fs[0],
                    tty: "",
                    user: "",
                    command: V || L,
                    path: E,
                    params: ""
                  });
                }), a.sleeping = a.all - a.running - a.blocked - a.unknown, a.list = f, p.forEach((g) => {
                  let x = sr(g, m + h, ce), S = a.list.map((C) => C.pid).indexOf(x.pid);
                  S >= 0 && (a.list[S].cpu = x.cpuu + x.cpus, a.list[S].cpuu = x.cpuu, a.list[S].cpus = x.cpus), d[x.pid] = {
                    cpuu: x.cpuu,
                    cpus: x.cpus,
                    utime: x.utime,
                    stime: x.stime
                  };
                }), ce.all = m + h, ce.all_utime = m, ce.all_stime = h, ce.list = Object.assign({}, d), ce.ms = Date.now() - ce.ms, ce.result = Object.assign({}, a);
              }
              t && t(a), o(a);
            });
          } catch {
            t && t(a), o(a);
          }
        else
          t && t(a), o(a);
      else
        t && t(ce.result), o(ce.result);
    });
  });
}
Zn.processes = cl;
function ul(t, n) {
  return X.isFunction(t) && !n && (n = t, t = ""), new Promise((e) => {
    process.nextTick(() => {
      if (t = t || "", typeof t != "string")
        return n && n([]), e([]);
      let s = "";
      try {
        s.__proto__.toLowerCase = X.stringToLower, s.__proto__.replace = X.stringReplace, s.__proto__.toString = X.stringToString, s.__proto__.substr = X.stringSubstr, s.__proto__.substring = X.stringSubstring, s.__proto__.trim = X.stringTrim, s.__proto__.startsWith = X.stringStartWith;
      } catch {
        Object.setPrototypeOf(s, X.stringObj);
      }
      const r = X.sanitizeShellString(t), i = X.mathMin(r.length, 2e3);
      for (let c = 0; c <= i; c++)
        r[c] !== void 0 && (s = s + r[c]);
      s = s.trim().toLowerCase().replace(/, /g, "|").replace(/,+/g, "|"), s === "" && (s = "*"), X.isPrototypePolluted() && s !== "*" && (s = "------");
      let o = s.split("|"), a = [];
      if ((X.isPrototypePolluted() ? "" : X.sanitizeShellString(t) || "*") && o.length && o[0] !== "------") {
        if (ki)
          try {
            X.powerShell("Get-CimInstance Win32_Process | select ProcessId,Caption,UserModeTime,KernelModeTime,WorkingSetSize | ConvertTo-Json -compress").then((c, u) => {
              if (!u) {
                const f = [], p = {};
                let d = 0, m = 0, h = [];
                try {
                  c = c.trim().replace(/^\uFEFF/, ""), h = JSON.parse(c);
                } catch {
                }
                h.forEach((y) => {
                  const g = y.ProcessId, x = y.Caption, S = y.UserModeTime, C = y.KernelModeTime, L = y.WorkingSetSize;
                  d = d + S, m = m + C, f.push({
                    pid: g,
                    name: x,
                    utime: S,
                    stime: C,
                    cpu: 0,
                    cpuu: 0,
                    cpus: 0,
                    mem: L
                  });
                  let V = "", E = !1;
                  if (o.forEach((U) => {
                    x.toLowerCase().indexOf(U.toLowerCase()) >= 0 && !E && (E = !0, V = U);
                  }), s === "*" || E) {
                    let U = !1;
                    a.forEach((O) => {
                      O.proc.toLowerCase() === V.toLowerCase() && (O.pids.push(g), O.mem += L / kn.totalmem() * 100, U = !0);
                    }), U || a.push({
                      proc: V,
                      pid: g,
                      pids: [g],
                      cpu: 0,
                      mem: L / kn.totalmem() * 100
                    });
                  }
                }), s !== "*" && o.filter((g) => f.filter((x) => x.name.toLowerCase().indexOf(g) >= 0).length === 0).forEach((g) => {
                  a.push({
                    proc: g,
                    pid: null,
                    pids: [],
                    cpu: 0,
                    mem: 0
                  });
                }), f.forEach((y) => {
                  let g = sr(y, d + m, Se), x = -1;
                  for (let S = 0; S < a.length; S++)
                    (a[S].pid === g.pid || a[S].pids.indexOf(g.pid) >= 0) && (x = S);
                  x >= 0 && (a[x].cpu += g.cpuu + g.cpus), p[g.pid] = {
                    cpuu: g.cpuu,
                    cpus: g.cpus,
                    utime: g.utime,
                    stime: g.stime
                  };
                }), Se.all = d + m, Se.all_utime = d, Se.all_stime = m, Se.list = Object.assign({}, p), Se.ms = Date.now() - Se.ms, Se.result = JSON.parse(JSON.stringify(a)), n && n(a), e(a);
              }
            });
          } catch {
            n && n(a), e(a);
          }
        if (vt || We || mn || gn || hn) {
          const c = ["-axo", "pid,ppid,pcpu,pmem,comm"];
          X.execSafe("ps", c).then((u) => {
            if (u) {
              const f = [], p = u.toString().split(`
`).filter((d) => {
                if (s === "*")
                  return !0;
                if (d.toLowerCase().indexOf("grep") !== -1)
                  return !1;
                let m = !1;
                return o.forEach((h) => {
                  m = m || d.toLowerCase().indexOf(h.toLowerCase()) >= 0;
                }), m;
              });
              if (p.shift(), p.forEach((d) => {
                const m = d.trim().replace(/ +/g, " ").split(" ");
                if (m.length > 4) {
                  const h = m[4].indexOf("/") >= 0 ? m[4].substring(0, m[4].indexOf("/")) : m[4], y = We ? h : m[4].substring(m[4].lastIndexOf("/") + 1);
                  f.push({
                    name: y,
                    pid: parseInt(m[0]) || 0,
                    ppid: parseInt(m[1]) || 0,
                    cpu: parseFloat(m[2].replace(",", ".")),
                    mem: parseFloat(m[3].replace(",", "."))
                  });
                }
              }), f.forEach((d) => {
                let m = -1, h = !1, y = d.name;
                for (let g = 0; g < a.length; g++)
                  d.name.toLowerCase().indexOf(a[g].proc.toLowerCase()) >= 0 && (m = g);
                o.forEach((g) => {
                  d.name.toLowerCase().indexOf(g.toLowerCase()) >= 0 && !h && (h = !0, y = g);
                }), (s === "*" || h) && (m < 0 ? y && a.push({
                  proc: y,
                  pid: d.pid,
                  pids: [d.pid],
                  cpu: d.cpu,
                  mem: d.mem
                }) : (d.ppid < 10 && (a[m].pid = d.pid), a[m].pids.push(d.pid), a[m].cpu += d.cpu, a[m].mem += d.mem));
              }), s !== "*" && o.filter((m) => f.filter((h) => h.name.toLowerCase().indexOf(m) >= 0).length === 0).forEach((m) => {
                a.push({
                  proc: m,
                  pid: null,
                  pids: [],
                  cpu: 0,
                  mem: 0
                });
              }), We) {
                a.forEach((m) => {
                  m.cpu = 0;
                });
                let d = 'cat /proc/stat | grep "cpu "';
                for (let m in a)
                  for (let h in a[m].pids)
                    d += ";cat /proc/" + a[m].pids[h] + "/stat";
                fn(d, { maxBuffer: 1024 * 102400 }, (m, h) => {
                  let y = h.toString().split(`
`), g = Fi(y.shift()), x = {}, S = {};
                  y.forEach((C) => {
                    if (S = Ri(C, g, Se), S.pid) {
                      let L = -1;
                      for (let V in a)
                        a[V].pids.indexOf(S.pid) >= 0 && (L = V);
                      L >= 0 && (a[L].cpu += S.cpuu + S.cpus), x[S.pid] = {
                        cpuu: S.cpuu,
                        cpus: S.cpus,
                        utime: S.utime,
                        stime: S.stime,
                        cutime: S.cutime,
                        cstime: S.cstime
                      };
                    }
                  }), a.forEach((C) => {
                    C.cpu = Math.round(C.cpu * 100) / 100;
                  }), Se.all = g, Se.list = Object.assign({}, x), Se.ms = Date.now() - Se.ms, Se.result = Object.assign({}, a), n && n(a), e(a);
                });
              } else
                n && n(a), e(a);
            } else
              n && n(a), e(a);
          });
        }
      }
    });
  });
}
Zn.processLoad = ul;
var rr = {};
const rn = te.exec, He = T, ft = process.platform, pl = ft === "linux" || ft === "android", fl = ft === "darwin", dl = ft === "win32", ml = ft === "freebsd", gl = ft === "openbsd", hl = ft === "netbsd", xl = ft === "sunos";
function or(t, n) {
  let e = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  try {
    e = "" + (/* @__PURE__ */ new Date()).getFullYear() + "-" + ("0" + ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(t.toUpperCase()) / 3 + 1)).slice(-2) + "-" + ("0" + n).slice(-2), new Date(e) > /* @__PURE__ */ new Date() && (e = "" + ((/* @__PURE__ */ new Date()).getFullYear() - 1) + "-" + ("0" + ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(t.toUpperCase()) / 3 + 1)).slice(-2) + "-" + ("0" + n).slice(-2));
  } catch {
    He.noop();
  }
  return e;
}
function ds(t, n) {
  const e = [];
  let s = [];
  const r = {};
  let i = !0, o = [];
  const a = [];
  let l = {}, c = !0, u = !1;
  return t.forEach((f) => {
    if (f === "---")
      c = !1;
    else {
      const p = f.replace(/ +/g, " ").split(" ");
      if (c) {
        if ((f.toLowerCase().indexOf("unexpected") >= 0 || f.toLowerCase().indexOf("unrecognized") >= 0) && (u = !0, s = []), !u) {
          const d = p && p.length > 4 && p[4].indexOf(":") > 0 ? 4 : 3;
          s.push({
            user: p[0],
            tty: p[1],
            date: d === 4 ? or(p[2], p[3]) : p[2],
            time: p[d],
            ip: p && p.length > d + 1 ? p[d + 1].replace(/\(/g, "").replace(/\)/g, "") : "",
            command: ""
          });
        }
      } else
        i ? f[0] !== " " && (o = p, o.forEach((d) => {
          a.push(f.indexOf(d));
        }), i = !1) : (r.user = f.substring(a[0], a[1] - 1).trim(), r.tty = f.substring(a[1], a[2] - 1).trim(), r.ip = f.substring(a[2], a[3] - 1).replace(/\(/g, "").replace(/\)/g, "").trim(), r.command = f.substring(a[7], 1e3).trim(), s.length || n === 1 ? l = s.filter((d) => d.user.substring(0, 8).trim() === r.user && d.tty === r.tty) : l = [{ user: r.user, tty: r.tty, date: "", time: "", ip: "" }], l.length === 1 && l[0].user !== "" && e.push({
          user: l[0].user,
          tty: l[0].tty,
          date: l[0].date,
          time: l[0].time,
          ip: l[0].ip,
          command: r.command
        }));
    }
  }), e.length === 0 && n === 2 ? s : e;
}
function pi(t) {
  const n = [], e = [], s = {};
  let r = {}, i = !0;
  return t.forEach((o) => {
    if (o === "---")
      i = !1;
    else {
      const a = o.replace(/ +/g, " ").split(" ");
      i ? e.push({
        user: a[0],
        tty: a[1],
        date: or(a[2], a[3]),
        time: a[4]
      }) : (s.user = a[0], s.tty = a[1], s.ip = a[2] !== "-" ? a[2] : "", s.command = a.slice(5, 1e3).join(" "), r = e.filter((l) => l.user.substring(0, 10) === s.user.substring(0, 10) && (l.tty.substring(3, 1e3) === s.tty || l.tty === s.tty)), r.length === 1 && n.push({
        user: r[0].user,
        tty: r[0].tty,
        date: r[0].date,
        time: r[0].time,
        ip: s.ip,
        command: s.command
      }));
    }
  }), n;
}
function yl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (pl && rn('export LC_ALL=C; who --ips; echo "---"; w; unset LC_ALL | tail -n +2', (s, r) => {
        if (s)
          t && t(e), n(e);
        else {
          let i = r.toString().split(`
`);
          e = ds(i, 1), e.length === 0 ? rn('who; echo "---"; w | tail -n +2', (o, a) => {
            o || (i = a.toString().split(`
`), e = ds(i, 2)), t && t(e), n(e);
          }) : (t && t(e), n(e));
        }
      }), (ml || gl || hl) && rn('who; echo "---"; w -ih', (s, r) => {
        if (!s) {
          const i = r.toString().split(`
`);
          e = pi(i);
        }
        t && t(e), n(e);
      }), xl && rn('who; echo "---"; w -h', (s, r) => {
        if (!s) {
          const i = r.toString().split(`
`);
          e = pi(i);
        }
        t && t(e), n(e);
      }), fl && rn('export LC_ALL=C; who; echo "---"; w -ih; unset LC_ALL', (s, r) => {
        if (!s) {
          const i = r.toString().split(`
`);
          e = pi(i);
        }
        t && t(e), n(e);
      }), dl)
        try {
          let s = `Get-CimInstance Win32_LogonSession | select LogonId,@{n="StartTime";e={$_.StartTime.ToString("yyyy-MM-dd HH:mm:ss")}} | fl; echo '#-#-#-#';`;
          s += "Get-CimInstance Win32_LoggedOnUser | select antecedent,dependent | fl ; echo '#-#-#-#';", s += `$process = (Get-CimInstance Win32_Process -Filter "name = 'explorer.exe'"); Invoke-CimMethod -InputObject $process[0] -MethodName GetOwner | select user, domain | fl; get-process -name explorer | select-object sessionid | fl; echo '#-#-#-#';`, s += "query user", He.powerShell(s).then((r) => {
            if (r) {
              r = r.split("#-#-#-#");
              const i = Sl((r[0] || "").split(/\n\s*\n/)), o = wl((r[1] || "").split(/\n\s*\n/)), a = Il((r[3] || "").split(`\r
`)), l = Ll((r[2] || "").split(/\n\s*\n/), a);
              for (let c in o)
                ({}).hasOwnProperty.call(o, c) && (o[c].dateTime = {}.hasOwnProperty.call(i, c) ? i[c] : "");
              l.forEach((c) => {
                let u = "";
                for (let f in o)
                  ({}).hasOwnProperty.call(o, f) && o[f].user === c.user && (!u || u < o[f].dateTime) && (u = o[f].dateTime);
                e.push({
                  user: c.user,
                  tty: c.tty,
                  date: `${u.substring(0, 10)}`,
                  time: `${u.substring(11, 19)}`,
                  ip: "",
                  command: ""
                });
              });
            }
            t && t(e), n(e);
          });
        } catch {
          t && t(e), n(e);
        }
    });
  });
}
function Sl(t) {
  const n = {};
  return t.forEach((e) => {
    const s = e.split(`\r
`), r = He.getValue(s, "LogonId"), i = He.getValue(s, "starttime");
    r && (n[r] = i);
  }), n;
}
function Cl(t, n) {
  t = t.toLowerCase(), n = n.toLowerCase();
  let e = 0, s = t.length;
  n.length > s && (s = n.length);
  for (let r = 0; r < s; r++) {
    const i = t[r] || "", o = n[r] || "";
    i === o && e++;
  }
  return s > 10 ? e / s > 0.9 : s > 0 ? e / s > 0.8 : !1;
}
function Ll(t, n) {
  const e = [];
  return t.forEach((s) => {
    const r = s.split(`\r
`), i = He.getValue(r, "domain", ":", !0), o = He.getValue(r, "user", ":", !0), a = He.getValue(r, "sessionid", ":", !0);
    if (o) {
      const l = n.filter((c) => Cl(c.user, o));
      e.push({
        domain: i,
        user: o,
        tty: l && l[0] && l[0].tty ? l[0].tty : a
      });
    }
  }), e;
}
function wl(t) {
  const n = {};
  return t.forEach((e) => {
    const s = e.split(`\r
`);
    let i = He.getValue(s, "antecedent", ":", !0).split("=");
    const o = i.length > 2 ? i[1].split(",")[0].replace(/"/g, "").trim() : "", a = i.length > 2 ? i[2].replace(/"/g, "").replace(/\)/g, "").trim() : "";
    i = He.getValue(s, "dependent", ":", !0).split("=");
    const c = i.length > 1 ? i[1].replace(/"/g, "").replace(/\)/g, "").trim() : "";
    c && (n[c] = {
      domain: a,
      user: o
    });
  }), n;
}
function Il(t) {
  t = t.filter((r) => r);
  let n = [];
  const e = t[0], s = [];
  if (e) {
    const r = e[0] === " " ? 1 : 0;
    s.push(r - 1);
    let i = 0;
    for (let o = r + 1; o < e.length; o++)
      e[o] === " " && (e[o - 1] === " " || e[o - 1] === ".") ? i = o : i && (s.push(i), i = 0);
    for (let o = 1; o < t.length; o++)
      if (t[o].trim()) {
        const a = t[o].substring(s[0] + 1, s[1]).trim() || "", l = t[o].substring(s[1] + 1, s[2] - 2).trim() || "";
        n.push({
          user: a,
          tty: l
        });
      }
  }
  return n;
}
rr.users = yl;
var Wi = {};
const le = T, dt = process.platform, ms = dt === "linux" || dt === "android", gs = dt === "darwin", _l = dt === "win32", hs = dt === "freebsd", xs = dt === "openbsd", ys = dt === "netbsd", Ol = dt === "sunos";
function Pl(t, n) {
  return new Promise((e) => {
    process.nextTick(() => {
      let s = {
        url: t,
        ok: !1,
        status: 404,
        ms: null
      };
      if (typeof t != "string")
        return n && n(s), e(s);
      let r = "";
      const i = le.sanitizeShellString(t, !0), o = le.mathMin(i.length, 2e3);
      for (let a = 0; a <= o; a++)
        if (i[a] !== void 0) {
          try {
            i[a].__proto__.toLowerCase = le.stringToLower;
          } catch {
            Object.setPrototypeOf(i[a], le.stringObj);
          }
          const l = i[a].toLowerCase();
          l && l[0] && !l[1] && l[0].length === 1 && (r = r + l[0]);
        }
      s.url = r;
      try {
        if (r && !le.isPrototypePolluted()) {
          try {
            r.__proto__.startsWith = le.stringStartWith;
          } catch {
            Object.setPrototypeOf(r, le.stringObj);
          }
          if (r.startsWith("file:") || r.startsWith("gopher:") || r.startsWith("telnet:") || r.startsWith("mailto:") || r.startsWith("news:") || r.startsWith("nntp:"))
            return n && n(s), e(s);
          le.checkWebsite(r).then((a) => {
            s.status = a.statusCode, s.ok = a.statusCode >= 200 && a.statusCode <= 399, s.ms = s.ok ? a.time : null, n && n(s), e(s);
          });
        } else
          n && n(s), e(s);
      } catch {
        n && n(s), e(s);
      }
    });
  });
}
Wi.inetChecksite = Pl;
function vl(t, n) {
  return le.isFunction(t) && !n && (n = t, t = ""), t = t || "8.8.8.8", new Promise((e) => {
    process.nextTick(() => {
      if (typeof t != "string")
        return n && n(null), e(null);
      let s = "";
      const r = (le.isPrototypePolluted() ? "8.8.8.8" : le.sanitizeShellString(t, !0)).trim(), i = le.mathMin(r.length, 2e3);
      for (let a = 0; a <= i; a++)
        if (r[a] !== void 0) {
          try {
            r[a].__proto__.toLowerCase = le.stringToLower;
          } catch {
            Object.setPrototypeOf(r[a], le.stringObj);
          }
          const l = r[a].toLowerCase();
          l && l[0] && !l[1] && (s = s + l[0]);
        }
      try {
        s.__proto__.startsWith = le.stringStartWith;
      } catch {
        Object.setPrototypeOf(s, le.stringObj);
      }
      if (s.startsWith("file:") || s.startsWith("gopher:") || s.startsWith("telnet:") || s.startsWith("mailto:") || s.startsWith("news:") || s.startsWith("nntp:"))
        return n && n(null), e(null);
      let o;
      if ((ms || hs || xs || ys || gs) && (ms && (o = ["-c", "2", "-w", "3", s]), (hs || xs || ys) && (o = ["-c", "2", "-t", "3", s]), gs && (o = ["-c2", "-t3", s]), le.execSafe("ping", o).then((a) => {
        let l = null;
        if (a) {
          const u = a.split(`
`).filter((f) => f.indexOf("rtt") >= 0 || f.indexOf("round-trip") >= 0 || f.indexOf("avg") >= 0).join(`
`).split("=");
          if (u.length > 1) {
            const f = u[1].split("/");
            f.length > 1 && (l = parseFloat(f[1]));
          }
        }
        n && n(l), e(l);
      })), Ol) {
        const a = ["-s", "-a", s, "56", "2"], l = "avg";
        le.execSafe("ping", a, { timeout: 3e3 }).then((c) => {
          let u = null;
          if (c) {
            const p = c.split(`
`).filter((d) => d.indexOf(l) >= 0).join(`
`).split("=");
            if (p.length > 1) {
              const d = p[1].split("/");
              d.length > 1 && (u = parseFloat(d[1].replace(",", ".")));
            }
          }
          n && n(u), e(u);
        });
      }
      if (_l) {
        let a = null;
        try {
          const l = [s, "-n", "1"];
          le.execSafe("ping", l, le.execOptsWin).then((c) => {
            if (c) {
              const u = c.split(`\r
`);
              u.shift(), u.forEach((f) => {
                if ((f.toLowerCase().match(/ms/g) || []).length === 3) {
                  let p = f.replace(/ +/g, " ").split(" ");
                  p.length > 6 && (a = parseFloat(p[p.length - 1]));
                }
              });
            }
            n && n(a), e(a);
          });
        } catch {
          n && n(a), e(a);
        }
      }
    });
  });
}
Wi.inetLatency = vl;
var St = {};
const je = Lr, Ml = Fe.type() === "Windows_NT", qe = Ml ? "//./pipe/docker_engine" : "/var/run/docker.sock";
let El = class {
  getInfo(n) {
    try {
      let e = je.createConnection({ path: qe }), s = "", r;
      e.on("connect", () => {
        e.write(`GET http:/info HTTP/1.0\r
\r
`);
      }), e.on("data", (i) => {
        s = s + i.toString();
      }), e.on("error", () => {
        e = !1, n({});
      }), e.on("end", () => {
        const i = s.indexOf(`\r
\r
`);
        s = s.substring(i + 4), e = !1;
        try {
          r = JSON.parse(s), n(r);
        } catch {
          n({});
        }
      });
    } catch {
      n({});
    }
  }
  listImages(n, e) {
    try {
      let s = je.createConnection({ path: qe }), r = "", i;
      s.on("connect", () => {
        s.write("GET http:/images/json" + (n ? "?all=1" : "") + ` HTTP/1.0\r
\r
`);
      }), s.on("data", (o) => {
        r = r + o.toString();
      }), s.on("error", () => {
        s = !1, e({});
      }), s.on("end", () => {
        const o = r.indexOf(`\r
\r
`);
        r = r.substring(o + 4), s = !1;
        try {
          i = JSON.parse(r), e(i);
        } catch {
          e({});
        }
      });
    } catch {
      e({});
    }
  }
  inspectImage(n, e) {
    if (n = n || "", n)
      try {
        let s = je.createConnection({ path: qe }), r = "", i;
        s.on("connect", () => {
          s.write("GET http:/images/" + n + `/json?stream=0 HTTP/1.0\r
\r
`);
        }), s.on("data", (o) => {
          r = r + o.toString();
        }), s.on("error", () => {
          s = !1, e({});
        }), s.on("end", () => {
          const o = r.indexOf(`\r
\r
`);
          r = r.substring(o + 4), s = !1;
          try {
            i = JSON.parse(r), e(i);
          } catch {
            e({});
          }
        });
      } catch {
        e({});
      }
    else
      e({});
  }
  listContainers(n, e) {
    try {
      let s = je.createConnection({ path: qe }), r = "", i;
      s.on("connect", () => {
        s.write("GET http:/containers/json" + (n ? "?all=1" : "") + ` HTTP/1.0\r
\r
`);
      }), s.on("data", (o) => {
        r = r + o.toString();
      }), s.on("error", () => {
        s = !1, e({});
      }), s.on("end", () => {
        const o = r.indexOf(`\r
\r
`);
        r = r.substring(o + 4), s = !1;
        try {
          i = JSON.parse(r), e(i);
        } catch {
          e({});
        }
      });
    } catch {
      e({});
    }
  }
  getStats(n, e) {
    if (n = n || "", n)
      try {
        let s = je.createConnection({ path: qe }), r = "", i;
        s.on("connect", () => {
          s.write("GET http:/containers/" + n + `/stats?stream=0 HTTP/1.0\r
\r
`);
        }), s.on("data", (o) => {
          r = r + o.toString();
        }), s.on("error", () => {
          s = !1, e({});
        }), s.on("end", () => {
          const o = r.indexOf(`\r
\r
`);
          r = r.substring(o + 4), s = !1;
          try {
            i = JSON.parse(r), e(i);
          } catch {
            e({});
          }
        });
      } catch {
        e({});
      }
    else
      e({});
  }
  getInspect(n, e) {
    if (n = n || "", n)
      try {
        let s = je.createConnection({ path: qe }), r = "", i;
        s.on("connect", () => {
          s.write("GET http:/containers/" + n + `/json?stream=0 HTTP/1.0\r
\r
`);
        }), s.on("data", (o) => {
          r = r + o.toString();
        }), s.on("error", () => {
          s = !1, e({});
        }), s.on("end", () => {
          const o = r.indexOf(`\r
\r
`);
          r = r.substring(o + 4), s = !1;
          try {
            i = JSON.parse(r), e(i);
          } catch {
            e({});
          }
        });
      } catch {
        e({});
      }
    else
      e({});
  }
  getProcesses(n, e) {
    if (n = n || "", n)
      try {
        let s = je.createConnection({ path: qe }), r = "", i;
        s.on("connect", () => {
          s.write("GET http:/containers/" + n + `/top?ps_args=-opid,ppid,pgid,vsz,time,etime,nice,ruser,user,rgroup,group,stat,rss,args HTTP/1.0\r
\r
`);
        }), s.on("data", (o) => {
          r = r + o.toString();
        }), s.on("error", () => {
          s = !1, e({});
        }), s.on("end", () => {
          const o = r.indexOf(`\r
\r
`);
          r = r.substring(o + 4), s = !1;
          try {
            i = JSON.parse(r), e(i);
          } catch {
            e({});
          }
        });
      } catch {
        e({});
      }
    else
      e({});
  }
  listVolumes(n) {
    try {
      let e = je.createConnection({ path: qe }), s = "", r;
      e.on("connect", () => {
        e.write(`GET http:/volumes HTTP/1.0\r
\r
`);
      }), e.on("data", (i) => {
        s = s + i.toString();
      }), e.on("error", () => {
        e = !1, n({});
      }), e.on("end", () => {
        const i = s.indexOf(`\r
\r
`);
        s = s.substring(i + 4), e = !1;
        try {
          r = JSON.parse(s), n(r);
        } catch {
          n({});
        }
      });
    } catch {
      n({});
    }
  }
};
var Al = El;
const ie = T, Ct = Al, Tl = process.platform, Dl = Tl === "win32", Ut = {};
let se, fi = 0;
function Vl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      se || (se = new Ct());
      const e = {};
      se.getInfo((s) => {
        e.id = s.ID, e.containers = s.Containers, e.containersRunning = s.ContainersRunning, e.containersPaused = s.ContainersPaused, e.containersStopped = s.ContainersStopped, e.images = s.Images, e.driver = s.Driver, e.memoryLimit = s.MemoryLimit, e.swapLimit = s.SwapLimit, e.kernelMemory = s.KernelMemory, e.cpuCfsPeriod = s.CpuCfsPeriod, e.cpuCfsQuota = s.CpuCfsQuota, e.cpuShares = s.CPUShares, e.cpuSet = s.CPUSet, e.ipv4Forwarding = s.IPv4Forwarding, e.bridgeNfIptables = s.BridgeNfIptables, e.bridgeNfIp6tables = s.BridgeNfIp6tables, e.debug = s.Debug, e.nfd = s.NFd, e.oomKillDisable = s.OomKillDisable, e.ngoroutines = s.NGoroutines, e.systemTime = s.SystemTime, e.loggingDriver = s.LoggingDriver, e.cgroupDriver = s.CgroupDriver, e.nEventsListener = s.NEventsListener, e.kernelVersion = s.KernelVersion, e.operatingSystem = s.OperatingSystem, e.osType = s.OSType, e.architecture = s.Architecture, e.ncpu = s.NCPU, e.memTotal = s.MemTotal, e.dockerRootDir = s.DockerRootDir, e.httpProxy = s.HttpProxy, e.httpsProxy = s.HttpsProxy, e.noProxy = s.NoProxy, e.name = s.Name, e.labels = s.Labels, e.experimentalBuild = s.ExperimentalBuild, e.serverVersion = s.ServerVersion, e.clusterStore = s.ClusterStore, e.clusterAdvertise = s.ClusterAdvertise, e.defaultRuntime = s.DefaultRuntime, e.liveRestoreEnabled = s.LiveRestoreEnabled, e.isolation = s.Isolation, e.initBinary = s.InitBinary, e.productLicense = s.ProductLicense, t && t(e), n(e);
      });
    });
  });
}
St.dockerInfo = Vl;
function bl(t, n) {
  ie.isFunction(t) && !n && (n = t, t = !1), typeof t == "string" && t === "true" && (t = !0), typeof t != "boolean" && t !== void 0 && (t = !1), t = t || !1;
  let e = [];
  return new Promise((s) => {
    process.nextTick(() => {
      se || (se = new Ct());
      const r = [];
      se.listImages(t, (i) => {
        let o = {};
        try {
          o = i, o && Object.prototype.toString.call(o) === "[object Array]" && o.length > 0 ? (o.forEach((a) => {
            a.Names && Object.prototype.toString.call(a.Names) === "[object Array]" && a.Names.length > 0 && (a.Name = a.Names[0].replace(/^\/|\/$/g, "")), r.push(Bl(a.Id.trim(), a));
          }), r.length ? Promise.all(r).then((a) => {
            n && n(a), s(a);
          }) : (n && n(e), s(e))) : (n && n(e), s(e));
        } catch {
          n && n(e), s(e);
        }
      });
    });
  });
}
function Bl(t, n) {
  return new Promise((e) => {
    process.nextTick(() => {
      if (t = t || "", typeof t != "string")
        return e();
      const s = (ie.isPrototypePolluted() ? "" : ie.sanitizeShellString(t, !0)).trim();
      s ? (se || (se = new Ct()), se.inspectImage(s.trim(), (r) => {
        try {
          e({
            id: n.Id,
            container: r.Container,
            comment: r.Comment,
            os: r.Os,
            architecture: r.Architecture,
            parent: r.Parent,
            dockerVersion: r.DockerVersion,
            size: r.Size,
            sharedSize: n.SharedSize,
            virtualSize: r.VirtualSize,
            author: r.Author,
            created: r.Created ? Math.round(new Date(r.Created).getTime() / 1e3) : 0,
            containerConfig: r.ContainerConfig ? r.ContainerConfig : {},
            graphDriver: r.GraphDriver ? r.GraphDriver : {},
            repoDigests: r.RepoDigests ? r.RepoDigests : {},
            repoTags: r.RepoTags ? r.RepoTags : {},
            config: r.Config ? r.Config : {},
            rootFS: r.RootFS ? r.RootFS : {}
          });
        } catch {
          e();
        }
      })) : e();
    });
  });
}
St.dockerImages = bl;
function Gi(t, n) {
  function e(r, i) {
    return r.filter((a) => a.Id && a.Id === i).length > 0;
  }
  ie.isFunction(t) && !n && (n = t, t = !1), typeof t == "string" && t === "true" && (t = !0), typeof t != "boolean" && t !== void 0 && (t = !1), t = t || !1;
  let s = [];
  return new Promise((r) => {
    process.nextTick(() => {
      se || (se = new Ct());
      const i = [];
      se.listContainers(t, (o) => {
        let a = {};
        try {
          if (a = o, a && Object.prototype.toString.call(a) === "[object Array]" && a.length > 0) {
            for (let l in Ut)
              ({}).hasOwnProperty.call(Ut, l) && (e(a, l) || delete Ut[l]);
            a.forEach((l) => {
              l.Names && Object.prototype.toString.call(l.Names) === "[object Array]" && l.Names.length > 0 && (l.Name = l.Names[0].replace(/^\/|\/$/g, "")), i.push(Nl(l.Id.trim(), l));
            }), i.length ? Promise.all(i).then((l) => {
              n && n(l), r(l);
            }) : (n && n(s), r(s));
          } else
            n && n(s), r(s);
        } catch {
          for (let c in Ut)
            ({}).hasOwnProperty.call(Ut, c) && (e(a, c) || delete Ut[c]);
          n && n(s), r(s);
        }
      });
    });
  });
}
function Nl(t, n) {
  return new Promise((e) => {
    process.nextTick(() => {
      if (t = t || "", typeof t != "string")
        return e();
      const s = (ie.isPrototypePolluted() ? "" : ie.sanitizeShellString(t, !0)).trim();
      s ? (se || (se = new Ct()), se.getInspect(s.trim(), (r) => {
        try {
          e({
            id: n.Id,
            name: n.Name,
            image: n.Image,
            imageID: n.ImageID,
            command: n.Command,
            created: n.Created,
            started: r.State && r.State.StartedAt ? Math.round(new Date(r.State.StartedAt).getTime() / 1e3) : 0,
            finished: r.State && r.State.FinishedAt && !r.State.FinishedAt.startsWith("0001-01-01") ? Math.round(new Date(r.State.FinishedAt).getTime() / 1e3) : 0,
            createdAt: r.Created ? r.Created : "",
            startedAt: r.State && r.State.StartedAt ? r.State.StartedAt : "",
            finishedAt: r.State && r.State.FinishedAt && !r.State.FinishedAt.startsWith("0001-01-01") ? r.State.FinishedAt : "",
            state: n.State,
            restartCount: r.RestartCount || 0,
            platform: r.Platform || "",
            driver: r.Driver || "",
            ports: n.Ports,
            mounts: n.Mounts
            // hostconfig: payload.HostConfig,
            // network: payload.NetworkSettings
          });
        } catch {
          e();
        }
      })) : e();
    });
  });
}
St.dockerContainers = Gi;
function kl(t, n) {
  if (Dl) {
    let e = ie.nanoSeconds(), s = 0;
    if (fi > 0) {
      let r = e - fi, i = t.cpu_usage.total_usage - n.cpu_usage.total_usage;
      r > 0 && (s = 100 * i / r);
    }
    return fi = e, s;
  } else {
    let e = 0, s = t.cpu_usage.total_usage - n.cpu_usage.total_usage, r = t.system_cpu_usage - n.system_cpu_usage;
    return r > 0 && s > 0 && (n.online_cpus ? e = s / r * n.online_cpus * 100 : e = s / r * t.cpu_usage.percpu_usage.length * 100), e;
  }
}
function Fl(t) {
  let n, e;
  for (let s in t) {
    if (!{}.hasOwnProperty.call(t, s))
      continue;
    const r = t[s];
    n = +r.rx_bytes, e = +r.tx_bytes;
  }
  return {
    rx: n,
    wx: e
  };
}
function Rl(t) {
  let n = {
    r: 0,
    w: 0
  };
  return t && t.io_service_bytes_recursive && Object.prototype.toString.call(t.io_service_bytes_recursive) === "[object Array]" && t.io_service_bytes_recursive.length > 0 && t.io_service_bytes_recursive.forEach((e) => {
    e.op && e.op.toLowerCase() === "read" && e.value && (n.r += e.value), e.op && e.op.toLowerCase() === "write" && e.value && (n.w += e.value);
  }), n;
}
function zi(t, n) {
  let e = [];
  return new Promise((s) => {
    process.nextTick(() => {
      if (ie.isFunction(t) && !n)
        n = t, e = ["*"];
      else {
        if (t = t || "*", typeof t != "string")
          return n && n([]), s([]);
        let o = "";
        try {
          o.__proto__.toLowerCase = ie.stringToLower, o.__proto__.replace = ie.stringReplace, o.__proto__.toString = ie.stringToString, o.__proto__.substr = ie.stringSubstr, o.__proto__.substring = ie.stringSubstring, o.__proto__.trim = ie.stringTrim, o.__proto__.startsWith = ie.stringStartWith;
        } catch {
          Object.setPrototypeOf(o, ie.stringObj);
        }
        if (o = t, o = o.trim(), o !== "*") {
          o = "";
          const a = (ie.isPrototypePolluted() ? "" : ie.sanitizeShellString(t, !0)).trim(), l = ie.mathMin(a.length, 2e3);
          for (let c = 0; c <= l; c++)
            if (a[c] !== void 0) {
              a[c].__proto__.toLowerCase = ie.stringToLower;
              const u = a[c].toLowerCase();
              u && u[0] && !u[1] && (o = o + u[0]);
            }
        }
        o = o.trim().toLowerCase().replace(/,+/g, "|"), e = o.split("|");
      }
      const r = [], i = [];
      if (e.length && e[0].trim() === "*")
        e = [], Gi().then((o) => {
          for (let a of o)
            e.push(a.id.substring(0, 12));
          e.length ? zi(e.join(",")).then((a) => {
            n && n(a), s(a);
          }) : (n && n(r), s(r));
        });
      else {
        for (let o of e)
          i.push(Wl(o.trim()));
        i.length ? Promise.all(i).then((o) => {
          n && n(o), s(o);
        }) : (n && n(r), s(r));
      }
    });
  });
}
function Wl(t) {
  t = t || "";
  const n = {
    id: t,
    memUsage: 0,
    memLimit: 0,
    memPercent: 0,
    cpuPercent: 0,
    pids: 0,
    netIO: {
      rx: 0,
      wx: 0
    },
    blockIO: {
      r: 0,
      w: 0
    },
    restartCount: 0,
    cpuStats: {},
    precpuStats: {},
    memoryStats: {},
    networks: {}
  };
  return new Promise((e) => {
    process.nextTick(() => {
      t ? (se || (se = new Ct()), se.getInspect(t, (s) => {
        try {
          se.getStats(t, (r) => {
            try {
              let i = r;
              i.message || (r.id && (n.id = r.id), n.memUsage = i.memory_stats && i.memory_stats.usage ? i.memory_stats.usage : 0, n.memLimit = i.memory_stats && i.memory_stats.limit ? i.memory_stats.limit : 0, n.memPercent = i.memory_stats && i.memory_stats.usage && i.memory_stats.limit ? i.memory_stats.usage / i.memory_stats.limit * 100 : 0, n.cpuPercent = i.cpu_stats && i.precpu_stats ? kl(i.cpu_stats, i.precpu_stats) : 0, n.pids = i.pids_stats && i.pids_stats.current ? i.pids_stats.current : 0, n.restartCount = s.RestartCount ? s.RestartCount : 0, i.networks && (n.netIO = Fl(i.networks)), i.blkio_stats && (n.blockIO = Rl(i.blkio_stats)), n.cpuStats = i.cpu_stats ? i.cpu_stats : {}, n.precpuStats = i.precpu_stats ? i.precpu_stats : {}, n.memoryStats = i.memory_stats ? i.memory_stats : {}, n.networks = i.networks ? i.networks : {});
            } catch {
              ie.noop();
            }
            e(n);
          });
        } catch {
          ie.noop();
        }
      })) : e(n);
    });
  });
}
St.dockerContainerStats = zi;
function ar(t, n) {
  let e = [];
  return new Promise((s) => {
    process.nextTick(() => {
      if (t = t || "", typeof t != "string")
        return s(e);
      const r = (ie.isPrototypePolluted() ? "" : ie.sanitizeShellString(t, !0)).trim();
      r ? (se || (se = new Ct()), se.getProcesses(r, (i) => {
        try {
          if (i && i.Titles && i.Processes) {
            let o = i.Titles.map(function(L) {
              return L.toUpperCase();
            }), a = o.indexOf("PID"), l = o.indexOf("PPID"), c = o.indexOf("PGID"), u = o.indexOf("VSZ"), f = o.indexOf("TIME"), p = o.indexOf("ELAPSED"), d = o.indexOf("NI"), m = o.indexOf("RUSER"), h = o.indexOf("USER"), y = o.indexOf("RGROUP"), g = o.indexOf("GROUP"), x = o.indexOf("STAT"), S = o.indexOf("RSS"), C = o.indexOf("COMMAND");
            i.Processes.forEach((L) => {
              e.push({
                pidHost: a >= 0 ? L[a] : "",
                ppid: l >= 0 ? L[l] : "",
                pgid: c >= 0 ? L[c] : "",
                user: h >= 0 ? L[h] : "",
                ruser: m >= 0 ? L[m] : "",
                group: g >= 0 ? L[g] : "",
                rgroup: y >= 0 ? L[y] : "",
                stat: x >= 0 ? L[x] : "",
                time: f >= 0 ? L[f] : "",
                elapsed: p >= 0 ? L[p] : "",
                nice: d >= 0 ? L[d] : "",
                rss: S >= 0 ? L[S] : "",
                vsz: u >= 0 ? L[u] : "",
                command: C >= 0 ? L[C] : ""
              });
            });
          }
        } catch {
          ie.noop();
        }
        n && n(e), s(e);
      })) : (n && n(e), s(e));
    });
  });
}
St.dockerContainerProcesses = ar;
function Gl(t) {
  let n = [];
  return new Promise((e) => {
    process.nextTick(() => {
      se || (se = new Ct()), se.listVolumes((s) => {
        let r = {};
        try {
          r = s, r && r.Volumes && Object.prototype.toString.call(r.Volumes) === "[object Array]" && r.Volumes.length > 0 ? (r.Volumes.forEach((i) => {
            n.push({
              name: i.Name,
              driver: i.Driver,
              labels: i.Labels,
              mountpoint: i.Mountpoint,
              options: i.Options,
              scope: i.Scope,
              created: i.CreatedAt ? Math.round(new Date(i.CreatedAt).getTime() / 1e3) : 0
            });
          }), t && t(n), e(n)) : (t && t(n), e(n));
        } catch {
          t && t(n), e(n);
        }
      });
    });
  });
}
St.dockerVolumes = Gl;
function zl(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      Gi(!0).then((e) => {
        if (e && Object.prototype.toString.call(e) === "[object Array]" && e.length > 0) {
          let s = e.length;
          e.forEach((r) => {
            zi(r.id).then((i) => {
              r.memUsage = i[0].memUsage, r.memLimit = i[0].memLimit, r.memPercent = i[0].memPercent, r.cpuPercent = i[0].cpuPercent, r.pids = i[0].pids, r.netIO = i[0].netIO, r.blockIO = i[0].blockIO, r.cpuStats = i[0].cpuStats, r.precpuStats = i[0].precpuStats, r.memoryStats = i[0].memoryStats, r.networks = i[0].networks, ar(r.id).then((o) => {
                r.processes = o, s -= 1, s === 0 && (t && t(e), n(e));
              });
            });
          });
        } else
          t && t(e), n(e);
      });
    });
  });
}
St.dockerAll = zl;
var lr = {};
const di = Fe, Ul = te.exec, J = T;
function Hl(t) {
  let n = [];
  return new Promise((e) => {
    process.nextTick(() => {
      try {
        Ul(J.getVboxmanage() + " list vms --long", (s, r) => {
          let i = (di.EOL + r.toString()).split(di.EOL + "Name:");
          i.shift(), i.forEach((o) => {
            const a = ("Name:" + o).split(di.EOL), l = J.getValue(a, "State"), c = l.startsWith("running"), u = c ? l.replace("running (since ", "").replace(")", "").trim() : "";
            let f = 0;
            try {
              if (c) {
                const m = new Date(u), h = m.getTimezoneOffset();
                f = Math.round((Date.now() - Date.parse(m)) / 1e3) + h * 60;
              }
            } catch {
              J.noop();
            }
            const p = c ? "" : l.replace("powered off (since", "").replace(")", "").trim();
            let d = 0;
            try {
              if (!c) {
                const m = new Date(p), h = m.getTimezoneOffset();
                d = Math.round((Date.now() - Date.parse(m)) / 1e3) + h * 60;
              }
            } catch {
              J.noop();
            }
            n.push({
              id: J.getValue(a, "UUID"),
              name: J.getValue(a, "Name"),
              running: c,
              started: u,
              runningSince: f,
              stopped: p,
              stoppedSince: d,
              guestOS: J.getValue(a, "Guest OS"),
              hardwareUUID: J.getValue(a, "Hardware UUID"),
              memory: parseInt(J.getValue(a, "Memory size", "     "), 10),
              vram: parseInt(J.getValue(a, "VRAM size"), 10),
              cpus: parseInt(J.getValue(a, "Number of CPUs"), 10),
              cpuExepCap: J.getValue(a, "CPU exec cap"),
              cpuProfile: J.getValue(a, "CPUProfile"),
              chipset: J.getValue(a, "Chipset"),
              firmware: J.getValue(a, "Firmware"),
              pageFusion: J.getValue(a, "Page Fusion") === "enabled",
              configFile: J.getValue(a, "Config file"),
              snapshotFolder: J.getValue(a, "Snapshot folder"),
              logFolder: J.getValue(a, "Log folder"),
              hpet: J.getValue(a, "HPET") === "enabled",
              pae: J.getValue(a, "PAE") === "enabled",
              longMode: J.getValue(a, "Long Mode") === "enabled",
              tripleFaultReset: J.getValue(a, "Triple Fault Reset") === "enabled",
              apic: J.getValue(a, "APIC") === "enabled",
              x2Apic: J.getValue(a, "X2APIC") === "enabled",
              acpi: J.getValue(a, "ACPI") === "enabled",
              ioApic: J.getValue(a, "IOAPIC") === "enabled",
              biosApicMode: J.getValue(a, "BIOS APIC mode"),
              bootMenuMode: J.getValue(a, "Boot menu mode"),
              bootDevice1: J.getValue(a, "Boot Device 1"),
              bootDevice2: J.getValue(a, "Boot Device 2"),
              bootDevice3: J.getValue(a, "Boot Device 3"),
              bootDevice4: J.getValue(a, "Boot Device 4"),
              timeOffset: J.getValue(a, "Time offset"),
              rtc: J.getValue(a, "RTC")
            });
          }), t && t(n), e(n);
        });
      } catch {
        t && t(n), e(n);
      }
    });
  });
}
lr.vboxInfo = Hl;
var cr = {};
const mi = te.exec, de = T;
let mt = process.platform;
const Ss = mt === "linux" || mt === "android", $l = mt === "darwin", Xl = mt === "win32", Kl = mt === "freebsd", jl = mt === "openbsd", ql = mt === "netbsd", Yl = mt === "sunos", Cs = {
  1: "Other",
  2: "Unknown",
  3: "Idle",
  4: "Printing",
  5: "Warmup",
  6: "Stopped Printing",
  7: "Offline"
};
function Jl(t) {
  const n = {};
  if (t && t.length && t[0].indexOf(" CUPS v") > 0) {
    const e = t[0].split(" CUPS v");
    n.cupsVersion = e[1];
  }
  return n;
}
function Ql(t) {
  const n = {}, e = de.getValue(t, "PrinterId", " ");
  return n.id = e ? parseInt(e, 10) : null, n.name = de.getValue(t, "Info", " "), n.model = t.length > 0 && t[0] ? t[0].split(" ")[0] : "", n.uri = de.getValue(t, "DeviceURI", " "), n.uuid = de.getValue(t, "UUID", " "), n.status = de.getValue(t, "State", " "), n.local = de.getValue(t, "Location", " ").toLowerCase().startsWith("local"), n.default = null, n.shared = de.getValue(t, "Shared", " ").toLowerCase().startsWith("yes"), n;
}
function Zl(t, n) {
  const e = {};
  return e.id = n, e.name = de.getValue(t, "Description", ":", !0), e.model = t.length > 0 && t[0] ? t[0].split(" ")[0] : "", e.uri = null, e.uuid = null, e.status = t.length > 0 && t[0] ? t[0].indexOf(" idle") > 0 ? "idle" : t[0].indexOf(" printing") > 0 ? "printing" : "unknown" : null, e.local = de.getValue(t, "Location", ":", !0).toLowerCase().startsWith("local"), e.default = null, e.shared = de.getValue(t, "Shared", " ").toLowerCase().startsWith("yes"), e;
}
function ec(t, n) {
  const e = {}, s = t.uri.split("/");
  return e.id = n, e.name = t._name, e.model = s.length ? s[s.length - 1] : "", e.uri = t.uri, e.uuid = null, e.status = t.status, e.local = t.printserver === "local", e.default = t.default === "yes", e.shared = t.shared === "yes", e;
}
function tc(t, n) {
  const e = {}, s = parseInt(de.getValue(t, "PrinterStatus", ":"), 10);
  return e.id = n, e.name = de.getValue(t, "name", ":"), e.model = de.getValue(t, "DriverName", ":"), e.uri = null, e.uuid = null, e.status = Cs[s] ? Cs[s] : null, e.local = de.getValue(t, "Local", ":").toUpperCase() === "TRUE", e.default = de.getValue(t, "Default", ":").toUpperCase() === "TRUE", e.shared = de.getValue(t, "Shared", ":").toUpperCase() === "TRUE", e;
}
function nc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (Ss || Kl || jl || ql) {
        let s = "cat /etc/cups/printers.conf 2>/dev/null";
        mi(s, (r, i) => {
          if (!r) {
            const o = i.toString().split("<Printer "), a = Jl(o[0]);
            for (let l = 1; l < o.length; l++) {
              const c = Ql(o[l].split(`
`));
              c.name && (c.engine = "CUPS", c.engineVersion = a.cupsVersion, e.push(c));
            }
          }
          e.length === 0 && Ss ? (s = "export LC_ALL=C; lpstat -lp 2>/dev/null; unset LC_ALL", mi(s, (o, a) => {
            const l = (`
` + a.toString()).split(`
printer `);
            for (let c = 1; c < l.length; c++) {
              const u = Zl(l[c].split(`
`), c);
              e.push(u);
            }
          }), t && t(e), n(e)) : (t && t(e), n(e));
        });
      }
      $l && mi("system_profiler SPPrintersDataType -json", (r, i) => {
        if (!r)
          try {
            const o = JSON.parse(i.toString());
            if (o.SPPrintersDataType && o.SPPrintersDataType.length)
              for (let a = 0; a < o.SPPrintersDataType.length; a++) {
                const l = ec(o.SPPrintersDataType[a], a);
                e.push(l);
              }
          } catch {
            de.noop();
          }
        t && t(e), n(e);
      }), Xl && de.powerShell("Get-CimInstance Win32_Printer | select PrinterStatus,Name,DriverName,Local,Default,Shared | fl").then((s, r) => {
        if (!r) {
          const i = s.toString().split(/\n\s*\n/);
          for (let o = 0; o < i.length; o++) {
            const a = tc(i[o].split(`
`), o);
            (a.name || a.model) && e.push(a);
          }
        }
        t && t(e), n(e);
      }), Yl && n(null);
    });
  });
}
cr.printer = nc;
var ur = {};
const Ls = te.exec, Me = T;
let gt = process.platform;
const ic = gt === "linux" || gt === "android", sc = gt === "darwin", rc = gt === "win32", oc = gt === "freebsd", ac = gt === "openbsd", lc = gt === "netbsd", cc = gt === "sunos";
function uc(t, n) {
  let e = t;
  const s = (n + " " + t).toLowerCase();
  return s.indexOf("camera") >= 0 ? e = "Camera" : s.indexOf("hub") >= 0 ? e = "Hub" : s.indexOf("keybrd") >= 0 || s.indexOf("keyboard") >= 0 ? e = "Keyboard" : s.indexOf("mouse") >= 0 ? e = "Mouse" : s.indexOf("stora") >= 0 ? e = "Storage" : s.indexOf("microp") >= 0 ? e = "Microphone" : (s.indexOf("headset") >= 0 || s.indexOf("audio") >= 0) && (e = "Audio"), e;
}
function pc(t) {
  const n = {}, e = t.split(`
`);
  if (e && e.length && e[0].indexOf("Device") >= 0) {
    const x = e[0].split(" ");
    n.bus = parseInt(x[0], 10), x[2] ? n.deviceId = parseInt(x[2], 10) : n.deviceId = null;
  } else
    n.bus = null, n.deviceId = null;
  const s = Me.getValue(e, "idVendor", " ", !0).trim();
  let r = s.split(" ");
  r.shift();
  const i = r.join(" "), o = Me.getValue(e, "idProduct", " ", !0).trim();
  let a = o.split(" ");
  a.shift();
  const l = a.join(" ");
  let u = Me.getValue(e, "bInterfaceClass", " ", !0).trim().split(" ");
  u.shift();
  const f = u.join(" ");
  let d = Me.getValue(e, "iManufacturer", " ", !0).trim().split(" ");
  d.shift();
  const m = d.join(" ");
  let y = Me.getValue(e, "iSerial", " ", !0).trim().split(" ");
  y.shift();
  const g = y.join(" ");
  return n.id = (s.startsWith("0x") ? s.split(" ")[0].substr(2, 10) : "") + ":" + (o.startsWith("0x") ? o.split(" ")[0].substr(2, 10) : ""), n.name = l, n.type = uc(f, l), n.removable = null, n.vendor = i, n.manufacturer = m, n.maxPower = Me.getValue(e, "MaxPower", " ", !0), n.serialNumber = g, n;
}
function fc(t) {
  let n = "";
  return t.indexOf("camera") >= 0 ? n = "Camera" : t.indexOf("touch bar") >= 0 ? n = "Touch Bar" : t.indexOf("controller") >= 0 ? n = "Controller" : t.indexOf("headset") >= 0 ? n = "Audio" : t.indexOf("keyboard") >= 0 ? n = "Keyboard" : t.indexOf("trackpad") >= 0 ? n = "Trackpad" : t.indexOf("sensor") >= 0 ? n = "Sensor" : t.indexOf("bthusb") >= 0 || t.indexOf("bth") >= 0 || t.indexOf("rfcomm") >= 0 ? n = "Bluetooth" : t.indexOf("usbhub") >= 0 || t.indexOf(" hub") >= 0 ? n = "Hub" : t.indexOf("mouse") >= 0 ? n = "Mouse" : t.indexOf("microp") >= 0 ? n = "Microphone" : t.indexOf("removable") >= 0 && (n = "Storage"), n;
}
function dc(t, n) {
  const e = {};
  e.id = n, t = t.replace(/ \|/g, ""), t = t.trim();
  let s = t.split(`
`);
  s.shift();
  try {
    for (let o = 0; o < s.length; o++) {
      s[o] = s[o].trim(), s[o] = s[o].replace(/=/g, ":"), s[o] !== "{" && s[o] !== "}" && s[o + 1] && s[o + 1].trim() !== "}" && (s[o] = s[o] + ","), s[o] = s[o].replace(":Yes,", ':"Yes",'), s[o] = s[o].replace(": Yes,", ': "Yes",'), s[o] = s[o].replace(": Yes", ': "Yes"'), s[o] = s[o].replace(":No,", ':"No",'), s[o] = s[o].replace(": No,", ': "No",'), s[o] = s[o].replace(": No", ': "No"'), s[o] = s[o].replace("((", "").replace("))", "");
      const a = /<(\w+)>/.exec(s[o]);
      if (a) {
        const l = a[0];
        s[o] = s[o].replace(l, `"${l}"`);
      }
    }
    const r = JSON.parse(s.join(`
`)), i = (r["Built-In"] ? r["Built-In"].toLowerCase() !== "yes" : !0) && (r["non-removable"] ? r["non-removable"].toLowerCase() === "no" : !0);
    return e.bus = null, e.deviceId = null, e.id = r["USB Address"] || null, e.name = r.kUSBProductString || r["USB Product Name"] || null, e.type = fc((r.kUSBProductString || r["USB Product Name"] || "").toLowerCase() + (i ? " removable" : "")), e.removable = r["non-removable"] ? r["non-removable"].toLowerCase() || !1 : !0, e.vendor = r.kUSBVendorString || r["USB Vendor Name"] || null, e.manufacturer = r.kUSBVendorString || r["USB Vendor Name"] || null, e.maxPower = null, e.serialNumber = r.kUSBSerialNumberString || null, e.name ? e : null;
  } catch {
    return null;
  }
}
function mc(t, n) {
  let e = "";
  return n.indexOf("storage") >= 0 || n.indexOf("speicher") >= 0 ? e = "Storage" : t.indexOf("usbhub") >= 0 ? e = "Hub" : t.indexOf("storage") >= 0 ? e = "Storage" : t.indexOf("usbcontroller") >= 0 ? e = "Controller" : t.indexOf("keyboard") >= 0 ? e = "Keyboard" : t.indexOf("pointing") >= 0 ? e = "Mouse" : t.indexOf("microp") >= 0 ? e = "Microphone" : t.indexOf("disk") >= 0 && (e = "Storage"), e;
}
function gc(t, n) {
  const e = mc(Me.getValue(t, "CreationClassName", ":").toLowerCase(), Me.getValue(t, "name", ":").toLowerCase());
  if (e) {
    const s = {};
    return s.bus = null, s.deviceId = Me.getValue(t, "deviceid", ":"), s.id = n, s.name = Me.getValue(t, "name", ":"), s.type = e, s.removable = null, s.vendor = null, s.manufacturer = Me.getValue(t, "Manufacturer", ":"), s.maxPower = null, s.serialNumber = null, s;
  } else
    return null;
}
function hc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      ic && Ls("export LC_ALL=C; lsusb -v 2>/dev/null; unset LC_ALL", { maxBuffer: 1024 * 1024 * 128 }, function(r, i) {
        if (!r) {
          const o = (`

` + i.toString()).split(`

Bus `);
          for (let a = 1; a < o.length; a++) {
            const l = pc(o[a]);
            e.push(l);
          }
        }
        t && t(e), n(e);
      }), sc && Ls("ioreg -p IOUSB -c AppleUSBRootHubDevice -w0 -l", { maxBuffer: 1024 * 1024 * 128 }, function(r, i) {
        if (!r) {
          const o = i.toString().split(" +-o ");
          for (let a = 1; a < o.length; a++) {
            const l = dc(o[a]);
            l && e.push(l);
          }
          t && t(e), n(e);
        }
        t && t(e), n(e);
      }), rc && Me.powerShell('Get-CimInstance CIM_LogicalDevice | where { $_.Description -match "USB"} | select Name,CreationClassName,DeviceId,Manufacturer | fl').then((s, r) => {
        if (!r) {
          const i = s.toString().split(/\n\s*\n/);
          for (let o = 0; o < i.length; o++) {
            const a = gc(i[o].split(`
`), o);
            a && e.filter((l) => l.deviceId === a.deviceId).length === 0 && e.push(a);
          }
        }
        t && t(e), n(e);
      }), (cc || oc || ac || lc) && n(null);
    });
  });
}
ur.usb = hc;
var pr = {};
const ws = te.exec, xc = te.execSync, ye = T, ht = process.platform, yc = ht === "linux" || ht === "android", Sc = ht === "darwin", Cc = ht === "win32", Lc = ht === "freebsd", wc = ht === "openbsd", Ic = ht === "netbsd", _c = ht === "sunos";
function Ui(t, n, e) {
  t = t.toLowerCase();
  let s = "";
  return t.indexOf("input") >= 0 && (s = "Microphone"), t.indexOf("display audio") >= 0 && (s = "Speaker"), t.indexOf("speak") >= 0 && (s = "Speaker"), t.indexOf("laut") >= 0 && (s = "Speaker"), t.indexOf("loud") >= 0 && (s = "Speaker"), t.indexOf("head") >= 0 && (s = "Headset"), t.indexOf("mic") >= 0 && (s = "Microphone"), t.indexOf("mikr") >= 0 && (s = "Microphone"), t.indexOf("phone") >= 0 && (s = "Phone"), t.indexOf("controll") >= 0 && (s = "Controller"), t.indexOf("line o") >= 0 && (s = "Line Out"), t.indexOf("digital o") >= 0 && (s = "Digital Out"), t.indexOf("smart sound technology") >= 0 && (s = "Digital Signal Processor"), t.indexOf("high definition audio") >= 0 && (s = "Sound Driver"), !s && e ? s = "Speaker" : !s && n && (s = "Microphone"), s;
}
function Oc() {
  const t = "lspci -v 2>/dev/null", n = [];
  try {
    return xc(t, ye.execOptsLinux).toString().split(`

`).forEach((s) => {
      const r = s.split(`
`);
      if (r && r.length && r[0].toLowerCase().indexOf("audio") >= 0) {
        const i = {};
        i.slotId = r[0].split(" ")[0], i.driver = ye.getValue(r, "Kernel driver in use", ":", !0) || ye.getValue(r, "Kernel modules", ":", !0), n.push(i);
      }
    }), n;
  } catch {
    return n;
  }
}
function Pc(t) {
  let n = t;
  return t === 1 ? n = "other" : t === 2 ? n = "unknown" : t === 3 ? n = "enabled" : t === 4 ? n = "disabled" : t === 5 && (n = "not applicable"), n;
}
function vc(t, n) {
  const e = {}, s = ye.getValue(t, "Slot"), r = n.filter((i) => i.slotId === s);
  return e.id = s, e.name = ye.getValue(t, "SDevice"), e.manufacturer = ye.getValue(t, "SVendor"), e.revision = ye.getValue(t, "Rev"), e.driver = r && r.length === 1 && r[0].driver ? r[0].driver : "", e.default = null, e.channel = "PCIe", e.type = Ui(e.name, null, null), e.in = null, e.out = null, e.status = "online", e;
}
function Mc(t) {
  let n = "";
  return t.indexOf("builtin") >= 0 && (n = "Built-In"), t.indexOf("extern") >= 0 && (n = "Audio-Jack"), t.indexOf("hdmi") >= 0 && (n = "HDMI"), t.indexOf("displayport") >= 0 && (n = "Display-Port"), t.indexOf("usb") >= 0 && (n = "USB"), t.indexOf("pci") >= 0 && (n = "PCIe"), n;
}
function Ec(t, n) {
  const e = {}, s = ((t.coreaudio_device_transport || "") + " " + (t._name || "")).toLowerCase();
  return e.id = n, e.name = t._name, e.manufacturer = t.coreaudio_device_manufacturer, e.revision = null, e.driver = null, e.default = !!t.coreaudio_default_audio_input_device || !!t.coreaudio_default_audio_output_device, e.channel = Mc(s), e.type = Ui(e.name, !!t.coreaudio_device_input, !!t.coreaudio_device_output), e.in = !!t.coreaudio_device_input, e.out = !!t.coreaudio_device_output, e.status = "online", e;
}
function Ac(t) {
  const n = {}, e = Pc(ye.getValue(t, "StatusInfo", ":"));
  return n.id = ye.getValue(t, "DeviceID", ":"), n.name = ye.getValue(t, "name", ":"), n.manufacturer = ye.getValue(t, "manufacturer", ":"), n.revision = null, n.driver = null, n.default = null, n.channel = null, n.type = Ui(n.name, null, null), n.in = null, n.out = null, n.status = e, n;
}
function Tc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      const e = [];
      (yc || Lc || wc || Ic) && ws("lspci -vmm 2>/dev/null", (r, i) => {
        if (!r) {
          const o = Oc();
          i.toString().split(`

`).forEach((l) => {
            const c = l.split(`
`);
            if (ye.getValue(c, "class", ":", !0).toLowerCase().indexOf("audio") >= 0) {
              const u = vc(c, o);
              e.push(u);
            }
          });
        }
        t && t(e), n(e);
      }), Sc && ws("system_profiler SPAudioDataType -json", (r, i) => {
        if (!r)
          try {
            const o = JSON.parse(i.toString());
            if (o.SPAudioDataType && o.SPAudioDataType.length && o.SPAudioDataType[0] && o.SPAudioDataType[0]._items && o.SPAudioDataType[0]._items.length)
              for (let a = 0; a < o.SPAudioDataType[0]._items.length; a++) {
                const l = Ec(o.SPAudioDataType[0]._items[a], a);
                e.push(l);
              }
          } catch {
            ye.noop();
          }
        t && t(e), n(e);
      }), Cc && ye.powerShell("Get-CimInstance Win32_SoundDevice | select DeviceID,StatusInfo,Name,Manufacturer | fl").then((s, r) => {
        r || s.toString().split(/\n\s*\n/).forEach((o) => {
          const a = o.split(`
`);
          ye.getValue(a, "name", ":") && e.push(Ac(a));
        }), t && t(e), n(e);
      }), _c && n(null);
    });
  });
}
pr.audio = Tc;
var fr = {}, Dc = {
  0: "Ericsson Technology Licensing",
  1: "Nokia Mobile Phones",
  2: "Intel Corp.",
  3: "IBM Corp.",
  4: "Toshiba Corp.",
  5: "3Com",
  6: "Microsoft",
  7: "Lucent",
  8: "Motorola",
  9: "Infineon Technologies AG",
  10: "Cambridge Silicon Radio",
  11: "Silicon Wave",
  12: "Digianswer A/S",
  13: "Texas Instruments Inc.",
  14: "Ceva, Inc. (formerly Parthus Technologies, Inc.)",
  15: "Broadcom Corporation",
  16: "Mitel Semiconductor",
  17: "Widcomm, Inc",
  18: "Zeevo, Inc.",
  19: "Atmel Corporation",
  20: "Mitsubishi Electric Corporation",
  21: "RTX Telecom A/S",
  22: "KC Technology Inc.",
  23: "NewLogic",
  24: "Transilica, Inc.",
  25: "Rohde & Schwarz GmbH & Co. KG",
  26: "TTPCom Limited",
  27: "Signia Technologies, Inc.",
  28: "Conexant Systems Inc.",
  29: "Qualcomm",
  30: "Inventel",
  31: "AVM Berlin",
  32: "BandSpeed, Inc.",
  33: "Mansella Ltd",
  34: "NEC Corporation",
  35: "WavePlus Technology Co., Ltd.",
  36: "Alcatel",
  37: "NXP Semiconductors (formerly Philips Semiconductors)",
  38: "C Technologies",
  39: "Open Interface",
  40: "R F Micro Devices",
  41: "Hitachi Ltd",
  42: "Symbol Technologies, Inc.",
  43: "Tenovis",
  44: "Macronix International Co. Ltd.",
  45: "GCT Semiconductor",
  46: "Norwood Systems",
  47: "MewTel Technology Inc.",
  48: "ST Microelectronics",
  49: "Synopsis",
  50: "Red-M (Communications) Ltd",
  51: "Commil Ltd",
  52: "Computer Access Technology Corporation (CATC)",
  53: "Eclipse (HQ Espana) S.L.",
  54: "Renesas Electronics Corporation",
  55: "Mobilian Corporation",
  56: "Terax",
  57: "Integrated System Solution Corp.",
  58: "Matsushita Electric Industrial Co., Ltd.",
  59: "Gennum Corporation",
  60: "BlackBerry Limited (formerly Research In Motion)",
  61: "IPextreme, Inc.",
  62: "Systems and Chips, Inc.",
  63: "Bluetooth SIG, Inc.",
  64: "Seiko Epson Corporation",
  65: "Integrated Silicon Solution Taiwan, Inc.",
  66: "CONWISE Technology Corporation Ltd",
  67: "PARROT SA",
  68: "Socket Mobile",
  69: "Atheros Communications, Inc.",
  70: "MediaTek, Inc.",
  71: "Bluegiga",
  72: "Marvell Technology Group Ltd.",
  73: "3DSP Corporation",
  74: "Accel Semiconductor Ltd.",
  75: "Continental Automotive Systems",
  76: "Apple, Inc.",
  77: "Staccato Communications, Inc.",
  78: "Avago Technologies",
  79: "APT Licensing Ltd.",
  80: "SiRF Technology",
  81: "Tzero Technologies, Inc.",
  82: "J&M Corporation",
  83: "Free2move AB",
  84: "3DiJoy Corporation",
  85: "Plantronics, Inc.",
  86: "Sony Ericsson Mobile Communications",
  87: "Harman International Industries, Inc.",
  88: "Vizio, Inc.",
  89: "Nordic Semiconductor ASA",
  90: "EM Microelectronic-Marin SA",
  91: "Ralink Technology Corporation",
  92: "Belkin International, Inc.",
  93: "Realtek Semiconductor Corporation",
  94: "Stonestreet One, LLC",
  95: "Wicentric, Inc.",
  96: "RivieraWaves S.A.S",
  97: "RDA Microelectronics",
  98: "Gibson Guitars",
  99: "MiCommand Inc.",
  100: "Band XI International, LLC",
  101: "Hewlett-Packard Company",
  102: "9Solutions Oy",
  103: "GN Netcom A/S",
  104: "General Motors",
  105: "A&D Engineering, Inc.",
  106: "MindTree Ltd.",
  107: "Polar Electro OY",
  108: "Beautiful Enterprise Co., Ltd.",
  109: "BriarTek, Inc.",
  110: "Summit Data Communications, Inc.",
  111: "Sound ID",
  112: "Monster, LLC",
  113: "connectBlue AB",
  114: "ShangHai Super Smart Electronics Co. Ltd.",
  115: "Group Sense Ltd.",
  116: "Zomm, LLC",
  117: "Samsung Electronics Co. Ltd.",
  118: "Creative Technology Ltd.",
  119: "Laird Technologies",
  120: "Nike, Inc.",
  121: "lesswire AG",
  122: "MStar Semiconductor, Inc.",
  123: "Hanlynn Technologies",
  124: "A & R Cambridge",
  125: "Seers Technology Co. Ltd",
  126: "Sports Tracking Technologies Ltd.",
  127: "Autonet Mobile",
  128: "DeLorme Publishing Company, Inc.",
  129: "WuXi Vimicro",
  130: "Sennheiser Communications A/S",
  131: "TimeKeeping Systems, Inc.",
  132: "Ludus Helsinki Ltd.",
  133: "BlueRadios, Inc.",
  134: "equinox AG",
  135: "Garmin International, Inc.",
  136: "Ecotest",
  137: "GN ReSound A/S",
  138: "Jawbone",
  139: "Topcorn Positioning Systems, LLC",
  140: "Gimbal Inc. (formerly Qualcomm Labs, Inc. and Qualcomm Retail Solutions, Inc.)",
  141: "Zscan Software",
  142: "Quintic Corp.",
  143: "Stollman E+V GmbH",
  144: "Funai Electric Co., Ltd.",
  145: "Advanced PANMOBIL Systems GmbH & Co. KG",
  146: "ThinkOptics, Inc.",
  147: "Universal Electronics, Inc.",
  148: "Airoha Technology Corp.",
  149: "NEC Lighting, Ltd.",
  150: "ODM Technology, Inc.",
  151: "ConnecteDevice Ltd.",
  152: "zer01.tv GmbH",
  153: "i.Tech Dynamic Global Distribution Ltd.",
  154: "Alpwise",
  155: "Jiangsu Toppower Automotive Electronics Co., Ltd.",
  156: "Colorfy, Inc.",
  157: "Geoforce Inc.",
  158: "Bose Corporation",
  159: "Suunto Oy",
  160: "Kensington Computer Products Group",
  161: "SR-Medizinelektronik",
  162: "Vertu Corporation Limited",
  163: "Meta Watch Ltd.",
  164: "LINAK A/S",
  165: "OTL Dynamics LLC",
  166: "Panda Ocean Inc.",
  167: "Visteon Corporation",
  168: "ARP Devices Limited",
  169: "Magneti Marelli S.p.A",
  170: "CAEN RFID srl",
  171: "Ingenieur-Systemgruppe Zahn GmbH",
  172: "Green Throttle Games",
  173: "Peter Systemtechnik GmbH",
  174: "Omegawave Oy",
  175: "Cinetix",
  176: "Passif Semiconductor Corp",
  177: "Saris Cycling Group, Inc",
  178: "Bekey A/S",
  179: "Clarinox Technologies Pty. Ltd.",
  180: "BDE Technology Co., Ltd.",
  181: "Swirl Networks",
  182: "Meso international",
  183: "TreLab Ltd",
  184: "Qualcomm Innovation Center, Inc. (QuIC)",
  185: "Johnson Controls, Inc.",
  186: "Starkey Laboratories Inc.",
  187: "S-Power Electronics Limited",
  188: "Ace Sensor Inc",
  189: "Aplix Corporation",
  190: "AAMP of America",
  191: "Stalmart Technology Limited",
  192: "AMICCOM Electronics Corporation",
  193: "Shenzhen Excelsecu Data Technology Co.,Ltd",
  194: "Geneq Inc.",
  195: "adidas AG",
  196: "LG Electronics",
  197: "Onset Computer Corporation",
  198: "Selfly BV",
  199: "Quuppa Oy.",
  200: "GeLo Inc",
  201: "Evluma",
  202: "MC10",
  203: "Binauric SE",
  204: "Beats Electronics",
  205: "Microchip Technology Inc.",
  206: "Elgato Systems GmbH",
  207: "ARCHOS SA",
  208: "Dexcom, Inc.",
  209: "Polar Electro Europe B.V.",
  210: "Dialog Semiconductor B.V.",
  211: "Taixingbang Technology (HK) Co,. LTD.",
  212: "Kawantech",
  213: "Austco Communication Systems",
  214: "Timex Group USA, Inc.",
  215: "Qualcomm Technologies, Inc.",
  216: "Qualcomm Connected Experiences, Inc.",
  217: "Voyetra Turtle Beach",
  218: "txtr GmbH",
  219: "Biosentronics",
  220: "Procter & Gamble",
  221: "Hosiden Corporation",
  222: "Muzik LLC",
  223: "Misfit Wearables Corp",
  224: "Google",
  225: "Danlers Ltd",
  226: "Semilink Inc",
  227: "inMusic Brands, Inc",
  228: "L.S. Research Inc.",
  229: "Eden Software Consultants Ltd.",
  230: "Freshtemp",
  231: "KS Technologies",
  232: "ACTS Technologies",
  233: "Vtrack Systems",
  234: "Nielsen-Kellerman Company",
  235: "Server Technology, Inc.",
  236: "BioResearch Associates",
  237: "Jolly Logic, LLC",
  238: "Above Average Outcomes, Inc.",
  239: "Bitsplitters GmbH",
  240: "PayPal, Inc.",
  241: "Witron Technology Limited",
  242: "Aether Things Inc. (formerly Morse Project Inc.)",
  243: "Kent Displays Inc.",
  244: "Nautilus Inc.",
  245: "Smartifier Oy",
  246: "Elcometer Limited",
  247: "VSN Technologies Inc.",
  248: "AceUni Corp., Ltd.",
  249: "StickNFind",
  250: "Crystal Code AB",
  251: "KOUKAAM a.s.",
  252: "Delphi Corporation",
  253: "ValenceTech Limited",
  254: "Reserved",
  255: "Typo Products, LLC",
  256: "TomTom International BV",
  257: "Fugoo, Inc",
  258: "Keiser Corporation",
  259: "Bang & Olufsen A/S",
  260: "PLUS Locations Systems Pty Ltd",
  261: "Ubiquitous Computing Technology Corporation",
  262: "Innovative Yachtter Solutions",
  263: "William Demant Holding A/S",
  264: "Chicony Electronics Co., Ltd.",
  265: "Atus BV",
  266: "Codegate Ltd.",
  267: "ERi, Inc.",
  268: "Transducers Direct, LLC",
  269: "Fujitsu Ten Limited",
  270: "Audi AG",
  271: "HiSilicon Technologies Co., Ltd.",
  272: "Nippon Seiki Co., Ltd.",
  273: "Steelseries ApS",
  274: "vyzybl Inc.",
  275: "Openbrain Technologies, Co., Ltd.",
  276: "Xensr",
  277: "e.solutions",
  278: "1OAK Technologies",
  279: "Wimoto Technologies Inc",
  280: "Radius Networks, Inc.",
  281: "Wize Technology Co., Ltd.",
  282: "Qualcomm Labs, Inc.",
  283: "Aruba Networks",
  284: "Baidu",
  285: "Arendi AG",
  286: "Skoda Auto a.s.",
  287: "Volkswagon AG",
  288: "Porsche AG",
  289: "Sino Wealth Electronic Ltd.",
  290: "AirTurn, Inc.",
  291: "Kinsa, Inc.",
  292: "HID Global",
  293: "SEAT es",
  294: "Promethean Ltd.",
  295: "Salutica Allied Solutions",
  296: "GPSI Group Pty Ltd",
  297: "Nimble Devices Oy",
  298: "Changzhou Yongse Infotech Co., Ltd",
  299: "SportIQ",
  300: "TEMEC Instruments B.V.",
  301: "Sony Corporation",
  302: "ASSA ABLOY",
  303: "Clarion Co., Ltd.",
  304: "Warehouse Innovations",
  305: "Cypress Semiconductor Corporation",
  306: "MADS Inc",
  307: "Blue Maestro Limited",
  308: "Resolution Products, Inc.",
  309: "Airewear LLC",
  310: "Seed Labs, Inc. (formerly ETC sp. z.o.o.)",
  311: "Prestigio Plaza Ltd.",
  312: "NTEO Inc.",
  313: "Focus Systems Corporation",
  314: "Tencent Holdings Limited",
  315: "Allegion",
  316: "Murata Manufacuring Co., Ltd.",
  318: "Nod, Inc.",
  319: "B&B Manufacturing Company",
  320: "Alpine Electronics (China) Co., Ltd",
  321: "FedEx Services",
  322: "Grape Systems Inc.",
  323: "Bkon Connect",
  324: "Lintech GmbH",
  325: "Novatel Wireless",
  326: "Ciright",
  327: "Mighty Cast, Inc.",
  328: "Ambimat Electronics",
  329: "Perytons Ltd.",
  330: "Tivoli Audio, LLC",
  331: "Master Lock",
  332: "Mesh-Net Ltd",
  333: "Huizhou Desay SV Automotive CO., LTD.",
  334: "Tangerine, Inc.",
  335: "B&W Group Ltd.",
  336: "Pioneer Corporation",
  337: "OnBeep",
  338: "Vernier Software & Technology",
  339: "ROL Ergo",
  340: "Pebble Technology",
  341: "NETATMO",
  342: "Accumulate AB",
  343: "Anhui Huami Information Technology Co., Ltd.",
  344: "Inmite s.r.o.",
  345: "ChefSteps, Inc.",
  346: "micas AG",
  347: "Biomedical Research Ltd.",
  348: "Pitius Tec S.L.",
  349: "Estimote, Inc.",
  350: "Unikey Technologies, Inc.",
  351: "Timer Cap Co.",
  352: "AwoX",
  353: "yikes",
  354: "MADSGlobal NZ Ltd.",
  355: "PCH International",
  356: "Qingdao Yeelink Information Technology Co., Ltd.",
  357: "Milwaukee Tool (formerly Milwaukee Electric Tools)",
  358: "MISHIK Pte Ltd",
  359: "Bayer HealthCare",
  360: "Spicebox LLC",
  361: "emberlight",
  362: "Cooper-Atkins Corporation",
  363: "Qblinks",
  364: "MYSPHERA",
  365: "LifeScan Inc",
  366: "Volantic AB",
  367: "Podo Labs, Inc",
  368: "Roche Diabetes Care AG",
  369: "Amazon Fulfillment Service",
  370: "Connovate Technology Private Limited",
  371: "Kocomojo, LLC",
  372: "Everykey LLC",
  373: "Dynamic Controls",
  374: "SentriLock",
  375: "I-SYST inc.",
  376: "CASIO COMPUTER CO., LTD.",
  377: "LAPIS Semiconductor Co., Ltd.",
  378: "Telemonitor, Inc.",
  379: "taskit GmbH",
  380: "Daimler AG",
  381: "BatAndCat",
  382: "BluDotz Ltd",
  383: "XTel ApS",
  384: "Gigaset Communications GmbH",
  385: "Gecko Health Innovations, Inc.",
  386: "HOP Ubiquitous",
  387: "To Be Assigned",
  388: "Nectar",
  389: "bel’apps LLC",
  390: "CORE Lighting Ltd",
  391: "Seraphim Sense Ltd",
  392: "Unico RBC",
  393: "Physical Enterprises Inc.",
  394: "Able Trend Technology Limited",
  395: "Konica Minolta, Inc.",
  396: "Wilo SE",
  397: "Extron Design Services",
  398: "Fitbit, Inc.",
  399: "Fireflies Systems",
  400: "Intelletto Technologies Inc.",
  401: "FDK CORPORATION",
  402: "Cloudleaf, Inc",
  403: "Maveric Automation LLC",
  404: "Acoustic Stream Corporation",
  405: "Zuli",
  406: "Paxton Access Ltd",
  407: "WiSilica Inc",
  408: "Vengit Limited",
  409: "SALTO SYSTEMS S.L.",
  410: "TRON Forum (formerly T-Engine Forum)",
  411: "CUBETECH s.r.o.",
  412: "Cokiya Incorporated",
  413: "CVS Health",
  414: "Ceruus",
  415: "Strainstall Ltd",
  416: "Channel Enterprises (HK) Ltd.",
  417: "FIAMM",
  418: "GIGALANE.CO.,LTD",
  419: "EROAD",
  420: "Mine Safety Appliances",
  421: "Icon Health and Fitness",
  422: "Asandoo GmbH",
  423: "ENERGOUS CORPORATION",
  424: "Taobao",
  425: "Canon Inc.",
  426: "Geophysical Technology Inc.",
  427: "Facebook, Inc.",
  428: "Nipro Diagnostics, Inc.",
  429: "FlightSafety International",
  430: "Earlens Corporation",
  431: "Sunrise Micro Devices, Inc.",
  432: "Star Micronics Co., Ltd.",
  433: "Netizens Sp. z o.o.",
  434: "Nymi Inc.",
  435: "Nytec, Inc.",
  436: "Trineo Sp. z o.o.",
  437: "Nest Labs Inc.",
  438: "LM Technologies Ltd",
  439: "General Electric Company",
  440: "i+D3 S.L.",
  441: "HANA Micron",
  442: "Stages Cycling LLC",
  443: "Cochlear Bone Anchored Solutions AB",
  444: "SenionLab AB",
  445: "Syszone Co., Ltd",
  446: "Pulsate Mobile Ltd.",
  447: "Hong Kong HunterSun Electronic Limited",
  448: "pironex GmbH",
  449: "BRADATECH Corp.",
  450: "Transenergooil AG",
  451: "Bunch",
  452: "DME Microelectronics",
  453: "Bitcraze AB",
  454: "HASWARE Inc.",
  455: "Abiogenix Inc.",
  456: "Poly-Control ApS",
  457: "Avi-on",
  458: "Laerdal Medical AS",
  459: "Fetch My Pet",
  460: "Sam Labs Ltd.",
  461: "Chengdu Synwing Technology Ltd",
  462: "HOUWA SYSTEM DESIGN, k.k.",
  463: "BSH",
  464: "Primus Inter Pares Ltd",
  465: "August",
  466: "Gill Electronics",
  467: "Sky Wave Design",
  468: "Newlab S.r.l.",
  469: "ELAD srl",
  470: "G-wearables inc.",
  471: "Squadrone Systems Inc.",
  472: "Code Corporation",
  473: "Savant Systems LLC",
  474: "Logitech International SA",
  475: "Innblue Consulting",
  476: "iParking Ltd.",
  477: "Koninklijke Philips Electronics N.V.",
  478: "Minelab Electronics Pty Limited",
  479: "Bison Group Ltd.",
  480: "Widex A/S",
  481: "Jolla Ltd",
  482: "Lectronix, Inc.",
  483: "Caterpillar Inc",
  484: "Freedom Innovations",
  485: "Dynamic Devices Ltd",
  486: "Technology Solutions (UK) Ltd",
  487: "IPS Group Inc.",
  488: "STIR",
  489: "Sano, Inc",
  490: "Advanced Application Design, Inc.",
  491: "AutoMap LLC",
  492: "Spreadtrum Communications Shanghai Ltd",
  493: "CuteCircuit LTD",
  494: "Valeo Service",
  495: "Fullpower Technologies, Inc.",
  496: "KloudNation",
  497: "Zebra Technologies Corporation",
  498: "Itron, Inc.",
  499: "The University of Tokyo",
  500: "UTC Fire and Security",
  501: "Cool Webthings Limited",
  502: "DJO Global",
  503: "Gelliner Limited",
  504: "Anyka (Guangzhou) Microelectronics Technology Co, LTD",
  505: "Medtronic, Inc.",
  506: "Gozio, Inc.",
  507: "Form Lifting, LLC",
  508: "Wahoo Fitness, LLC",
  509: "Kontakt Micro-Location Sp. z o.o.",
  510: "Radio System Corporation",
  511: "Freescale Semiconductor, Inc.",
  512: "Verifone Systems PTe Ltd. Taiwan Branch",
  513: "AR Timing",
  514: "Rigado LLC",
  515: "Kemppi Oy",
  516: "Tapcentive Inc.",
  517: "Smartbotics Inc.",
  518: "Otter Products, LLC",
  519: "STEMP Inc.",
  520: "LumiGeek LLC",
  521: "InvisionHeart Inc.",
  522: "Macnica Inc. ",
  523: "Jaguar Land Rover Limited",
  524: "CoroWare Technologies, Inc",
  525: "Simplo Technology Co., LTD",
  526: "Omron Healthcare Co., LTD",
  527: "Comodule GMBH",
  528: "ikeGPS",
  529: "Telink Semiconductor Co. Ltd",
  530: "Interplan Co., Ltd",
  531: "Wyler AG",
  532: "IK Multimedia Production srl",
  533: "Lukoton Experience Oy",
  534: "MTI Ltd",
  535: "Tech4home, Lda",
  536: "Hiotech AB",
  537: "DOTT Limited",
  538: "Blue Speck Labs, LLC",
  539: "Cisco Systems, Inc",
  540: "Mobicomm Inc",
  541: "Edamic",
  542: "Goodnet, Ltd",
  543: "Luster Leaf Products Inc",
  544: "Manus Machina BV",
  545: "Mobiquity Networks Inc",
  546: "Praxis Dynamics",
  547: "Philip Morris Products S.A.",
  548: "Comarch SA",
  549: "Nestl Nespresso S.A.",
  550: "Merlinia A/S",
  551: "LifeBEAM Technologies",
  552: "Twocanoes Labs, LLC",
  553: "Muoverti Limited",
  554: "Stamer Musikanlagen GMBH",
  555: "Tesla Motors",
  556: "Pharynks Corporation",
  557: "Lupine",
  558: "Siemens AG",
  559: "Huami (Shanghai) Culture Communication CO., LTD",
  560: "Foster Electric Company, Ltd",
  561: "ETA SA",
  562: "x-Senso Solutions Kft",
  563: "Shenzhen SuLong Communication Ltd",
  564: "FengFan (BeiJing) Technology Co, Ltd",
  565: "Qrio Inc",
  566: "Pitpatpet Ltd",
  567: "MSHeli s.r.l.",
  568: "Trakm8 Ltd",
  569: "JIN CO, Ltd",
  570: "Alatech Tehnology",
  571: "Beijing CarePulse Electronic Technology Co, Ltd",
  572: "Awarepoint",
  573: "ViCentra B.V.",
  574: "Raven Industries",
  575: "WaveWare Technologies Inc.",
  576: "Argenox Technologies",
  577: "Bragi GmbH",
  578: "16Lab Inc",
  579: "Masimo Corp",
  580: "Iotera Inc",
  581: "Endress+Hauser",
  582: "ACKme Networks, Inc.",
  583: "FiftyThree Inc.",
  584: "Parker Hannifin Corp",
  585: "Transcranial Ltd",
  586: "Uwatec AG",
  587: "Orlan LLC",
  588: "Blue Clover Devices",
  589: "M-Way Solutions GmbH",
  590: "Microtronics Engineering GmbH",
  591: "Schneider Schreibgerte GmbH",
  592: "Sapphire Circuits LLC",
  593: "Lumo Bodytech Inc.",
  594: "UKC Technosolution",
  595: "Xicato Inc.",
  596: "Playbrush",
  597: "Dai Nippon Printing Co., Ltd.",
  598: "G24 Power Limited",
  599: "AdBabble Local Commerce Inc.",
  600: "Devialet SA",
  601: "ALTYOR",
  602: "University of Applied Sciences Valais/Haute Ecole Valaisanne",
  603: "Five Interactive, LLC dba Zendo",
  604: "NetEaseHangzhouNetwork co.Ltd.",
  605: "Lexmark International Inc.",
  606: "Fluke Corporation",
  607: "Yardarm Technologies",
  608: "SensaRx",
  609: "SECVRE GmbH",
  610: "Glacial Ridge Technologies",
  611: "Identiv, Inc.",
  612: "DDS, Inc.",
  613: "SMK Corporation",
  614: "Schawbel Technologies LLC",
  615: "XMI Systems SA",
  616: "Cerevo",
  617: "Torrox GmbH & Co KG",
  618: "Gemalto",
  619: "DEKA Research & Development Corp.",
  620: "Domster Tadeusz Szydlowski",
  621: "Technogym SPA",
  622: "FLEURBAEY BVBA",
  623: "Aptcode Solutions",
  624: "LSI ADL Technology",
  625: "Animas Corp",
  626: "Alps Electric Co., Ltd.",
  627: "OCEASOFT",
  628: "Motsai Research",
  629: "Geotab",
  630: "E.G.O. Elektro-Gertebau GmbH",
  631: "bewhere inc",
  632: "Johnson Outdoors Inc",
  633: "steute Schaltgerate GmbH & Co. KG",
  634: "Ekomini inc.",
  635: "DEFA AS",
  636: "Aseptika Ltd",
  637: "HUAWEI Technologies Co., Ltd. ( )",
  638: "HabitAware, LLC",
  639: "ruwido austria gmbh",
  640: "ITEC corporation",
  641: "StoneL",
  642: "Sonova AG",
  643: "Maven Machines, Inc.",
  644: "Synapse Electronics",
  645: "Standard Innovation Inc.",
  646: "RF Code, Inc.",
  647: "Wally Ventures S.L.",
  648: "Willowbank Electronics Ltd",
  649: "SK Telecom",
  650: "Jetro AS",
  651: "Code Gears LTD",
  652: "NANOLINK APS",
  653: "IF, LLC",
  654: "RF Digital Corp",
  655: "Church & Dwight Co., Inc",
  656: "Multibit Oy",
  657: "CliniCloud Inc",
  658: "SwiftSensors",
  659: "Blue Bite",
  660: "ELIAS GmbH",
  661: "Sivantos GmbH",
  662: "Petzl",
  663: "storm power ltd",
  664: "EISST Ltd",
  665: "Inexess Technology Simma KG",
  666: "Currant, Inc.",
  667: "C2 Development, Inc.",
  668: "Blue Sky Scientific, LLC",
  669: "ALOTTAZS LABS, LLC",
  670: "Kupson spol. s r.o.",
  671: "Areus Engineering GmbH",
  672: "Impossible Camera GmbH",
  673: "InventureTrack Systems",
  674: "LockedUp",
  675: "Itude",
  676: "Pacific Lock Company",
  677: "Tendyron Corporation ( )",
  678: "Robert Bosch GmbH",
  679: "Illuxtron international B.V.",
  680: "miSport Ltd.",
  681: "Chargelib",
  682: "Doppler Lab",
  683: "BBPOS Limited",
  684: "RTB Elektronik GmbH & Co. KG",
  685: "Rx Networks, Inc.",
  686: "WeatherFlow, Inc.",
  687: "Technicolor USA Inc.",
  688: "Bestechnic(Shanghai),Ltd",
  689: "Raden Inc",
  690: "JouZen Oy",
  691: "CLABER S.P.A.",
  692: "Hyginex, Inc.",
  693: "HANSHIN ELECTRIC RAILWAY CO.,LTD.",
  694: "Schneider Electric",
  695: "Oort Technologies LLC",
  696: "Chrono Therapeutics",
  697: "Rinnai Corporation",
  698: "Swissprime Technologies AG",
  699: "Koha.,Co.Ltd",
  700: "Genevac Ltd",
  701: "Chemtronics",
  702: "Seguro Technology Sp. z o.o.",
  703: "Redbird Flight Simulations",
  704: "Dash Robotics",
  705: "LINE Corporation",
  706: "Guillemot Corporation",
  707: "Techtronic Power Tools Technology Limited",
  708: "Wilson Sporting Goods",
  709: "Lenovo (Singapore) Pte Ltd. ( )",
  710: "Ayatan Sensors",
  711: "Electronics Tomorrow Limited",
  712: "VASCO Data Security International, Inc.",
  713: "PayRange Inc.",
  714: "ABOV Semiconductor",
  715: "AINA-Wireless Inc.",
  716: "Eijkelkamp Soil & Water",
  717: "BMA ergonomics b.v.",
  718: "Teva Branded Pharmaceutical Products R&D, Inc.",
  719: "Anima",
  720: "3M",
  721: "Empatica Srl",
  722: "Afero, Inc.",
  723: "Powercast Corporation",
  724: "Secuyou ApS",
  725: "OMRON Corporation",
  726: "Send Solutions",
  727: "NIPPON SYSTEMWARE CO.,LTD.",
  728: "Neosfar",
  729: "Fliegl Agrartechnik GmbH",
  730: "Gilvader",
  731: "Digi International Inc (R)",
  732: "DeWalch Technologies, Inc.",
  733: "Flint Rehabilitation Devices, LLC",
  734: "Samsung SDS Co., Ltd.",
  735: "Blur Product Development",
  736: "University of Michigan",
  737: "Victron Energy BV",
  738: "NTT docomo",
  739: "Carmanah Technologies Corp.",
  740: "Bytestorm Ltd.",
  741: "Espressif Incorporated ( () )",
  742: "Unwire",
  743: "Connected Yard, Inc.",
  744: "American Music Environments",
  745: "Sensogram Technologies, Inc.",
  746: "Fujitsu Limited",
  747: "Ardic Technology",
  748: "Delta Systems, Inc",
  749: "HTC Corporation",
  750: "Citizen Holdings Co., Ltd.",
  751: "SMART-INNOVATION.inc",
  752: "Blackrat Software",
  753: "The Idea Cave, LLC",
  754: "GoPro, Inc.",
  755: "AuthAir, Inc",
  756: "Vensi, Inc.",
  757: "Indagem Tech LLC",
  758: "Intemo Technologies",
  759: "DreamVisions co., Ltd.",
  760: "Runteq Oy Ltd",
  761: "IMAGINATION TECHNOLOGIES LTD",
  762: "CoSTAR TEchnologies",
  763: "Clarius Mobile Health Corp.",
  764: "Shanghai Frequen Microelectronics Co., Ltd.",
  765: "Uwanna, Inc.",
  766: "Lierda Science & Technology Group Co., Ltd.",
  767: "Silicon Laboratories",
  768: "World Moto Inc.",
  769: "Giatec Scientific Inc.",
  770: "Loop Devices, Inc",
  771: "IACA electronique",
  772: "Martians Inc",
  773: "Swipp ApS",
  774: "Life Laboratory Inc.",
  775: "FUJI INDUSTRIAL CO.,LTD.",
  776: "Surefire, LLC",
  777: "Dolby Labs",
  778: "Ellisys",
  779: "Magnitude Lighting Converters",
  780: "Hilti AG",
  781: "Devdata S.r.l.",
  782: "Deviceworx",
  783: "Shortcut Labs",
  784: "SGL Italia S.r.l.",
  785: "PEEQ DATA",
  786: "Ducere Technologies Pvt Ltd",
  787: "DiveNav, Inc.",
  788: "RIIG AI Sp. z o.o.",
  789: "Thermo Fisher Scientific",
  790: "AG Measurematics Pvt. Ltd.",
  791: "CHUO Electronics CO., LTD.",
  792: "Aspenta International",
  793: "Eugster Frismag AG",
  794: "Amber wireless GmbH",
  795: "HQ Inc",
  796: "Lab Sensor Solutions",
  797: "Enterlab ApS",
  798: "Eyefi, Inc.",
  799: "MetaSystem S.p.A.",
  800: "SONO ELECTRONICS. CO., LTD",
  801: "Jewelbots",
  802: "Compumedics Limited",
  803: "Rotor Bike Components",
  804: "Astro, Inc.",
  805: "Amotus Solutions",
  806: "Healthwear Technologies (Changzhou)Ltd",
  807: "Essex Electronics",
  808: "Grundfos A/S",
  809: "Eargo, Inc.",
  810: "Electronic Design Lab",
  811: "ESYLUX",
  812: "NIPPON SMT.CO.,Ltd",
  813: "BM innovations GmbH",
  814: "indoormap",
  815: "OttoQ Inc",
  816: "North Pole Engineering",
  817: "3flares Technologies Inc.",
  818: "Electrocompaniet A.S.",
  819: "Mul-T-Lock",
  820: "Corentium AS",
  821: "Enlighted Inc",
  822: "GISTIC",
  823: "AJP2 Holdings, LLC",
  824: "COBI GmbH",
  825: "Blue Sky Scientific, LLC",
  826: "Appception, Inc.",
  827: "Courtney Thorne Limited",
  828: "Virtuosys",
  829: "TPV Technology Limited",
  830: "Monitra SA",
  831: "Automation Components, Inc.",
  832: "Letsense s.r.l.",
  833: "Etesian Technologies LLC",
  834: "GERTEC BRASIL LTDA.",
  835: "Drekker Development Pty. Ltd.",
  836: "Whirl Inc",
  837: "Locus Positioning",
  838: "Acuity Brands Lighting, Inc",
  839: "Prevent Biometrics",
  840: "Arioneo",
  841: "VersaMe",
  842: "Vaddio",
  843: "Libratone A/S",
  844: "HM Electronics, Inc.",
  845: "TASER International, Inc.",
  846: "SafeTrust Inc.",
  847: "Heartland Payment Systems",
  848: "Bitstrata Systems Inc.",
  849: "Pieps GmbH",
  850: "iRiding(Xiamen)Technology Co.,Ltd.",
  851: "Alpha Audiotronics, Inc.",
  852: "TOPPAN FORMS CO.,LTD.",
  853: "Sigma Designs, Inc.",
  854: "Spectrum Brands, Inc.",
  855: "Polymap Wireless",
  856: "MagniWare Ltd.",
  857: "Novotec Medical GmbH",
  858: "Medicom Innovation Partner a/s",
  859: "Matrix Inc.",
  860: "Eaton Corporation",
  861: "KYS",
  862: "Naya Health, Inc.",
  863: "Acromag",
  864: "Insulet Corporation",
  865: "Wellinks Inc.",
  866: "ON Semiconductor",
  867: "FREELAP SA",
  868: "Favero Electronics Srl",
  869: "BioMech Sensor LLC",
  870: "BOLTT Sports technologies Private limited",
  871: "Saphe International",
  872: "Metormote AB",
  873: "littleBits",
  874: "SetPoint Medical",
  875: "BRControls Products BV",
  876: "Zipcar",
  877: "AirBolt Pty Ltd",
  878: "KeepTruckin Inc",
  879: "Motiv, Inc.",
  880: "Wazombi Labs O",
  881: "ORBCOMM",
  882: "Nixie Labs, Inc.",
  883: "AppNearMe Ltd",
  884: "Holman Industries",
  885: "Expain AS",
  886: "Electronic Temperature Instruments Ltd",
  887: "Plejd AB",
  888: "Propeller Health",
  889: "Shenzhen iMCO Electronic Technology Co.,Ltd",
  890: "Algoria",
  891: "Apption Labs Inc.",
  892: "Cronologics Corporation",
  893: "MICRODIA Ltd.",
  894: "lulabytes S.L.",
  895: "Nestec S.A.",
  896: "LLC MEGA - F service",
  897: "Sharp Corporation",
  898: "Precision Outcomes Ltd",
  899: "Kronos Incorporated",
  900: "OCOSMOS Co., Ltd.",
  901: "Embedded Electronic Solutions Ltd. dba e2Solutions",
  902: "Aterica Inc.",
  903: "BluStor PMC, Inc.",
  904: "Kapsch TrafficCom AB",
  905: "ActiveBlu Corporation",
  906: "Kohler Mira Limited",
  907: "Noke",
  908: "Appion Inc.",
  909: "Resmed Ltd",
  910: "Crownstone B.V.",
  911: "Xiaomi Inc.",
  912: "INFOTECH s.r.o.",
  913: "Thingsquare AB",
  914: "T&D",
  915: "LAVAZZA S.p.A.",
  916: "Netclearance Systems, Inc.",
  917: "SDATAWAY",
  918: "BLOKS GmbH",
  919: "LEGO System A/S",
  920: "Thetatronics Ltd",
  921: "Nikon Corporation",
  922: "NeST",
  923: "South Silicon Valley Microelectronics",
  924: "ALE International",
  925: "CareView Communications, Inc.",
  926: "SchoolBoard Limited",
  927: "Molex Corporation",
  928: "IVT Wireless Limited",
  929: "Alpine Labs LLC",
  930: "Candura Instruments",
  931: "SmartMovt Technology Co., Ltd",
  932: "Token Zero Ltd",
  933: "ACE CAD Enterprise Co., Ltd. (ACECAD)",
  934: "Medela, Inc",
  935: "AeroScout",
  936: "Esrille Inc.",
  937: "THINKERLY SRL",
  938: "Exon Sp. z o.o.",
  939: "Meizu Technology Co., Ltd.",
  940: "Smablo LTD",
  941: "XiQ",
  942: "Allswell Inc.",
  943: "Comm-N-Sense Corp DBA Verigo",
  944: "VIBRADORM GmbH",
  945: "Otodata Wireless Network Inc.",
  946: "Propagation Systems Limited",
  947: "Midwest Instruments & Controls",
  948: "Alpha Nodus, inc.",
  949: "petPOMM, Inc",
  950: "Mattel",
  951: "Airbly Inc.",
  952: "A-Safe Limited",
  953: "FREDERIQUE CONSTANT SA",
  954: "Maxscend Microelectronics Company Limited",
  955: "Abbott Diabetes Care",
  956: "ASB Bank Ltd",
  957: "amadas",
  958: "Applied Science, Inc.",
  959: "iLumi Solutions Inc.",
  960: "Arch Systems Inc.",
  961: "Ember Technologies, Inc.",
  962: "Snapchat Inc",
  963: "Casambi Technologies Oy",
  964: "Pico Technology Inc.",
  965: "St. Jude Medical, Inc.",
  966: "Intricon",
  967: "Structural Health Systems, Inc.",
  968: "Avvel International",
  969: "Gallagher Group",
  970: "In2things Automation Pvt. Ltd.",
  971: "SYSDEV Srl",
  972: "Vonkil Technologies Ltd",
  973: "Wynd Technologies, Inc.",
  974: "CONTRINEX S.A.",
  975: "MIRA, Inc.",
  976: "Watteam Ltd",
  977: "Density Inc.",
  978: "IOT Pot India Private Limited",
  979: "Sigma Connectivity AB",
  980: "PEG PEREGO SPA",
  981: "Wyzelink Systems Inc.",
  982: "Yota Devices LTD",
  983: "FINSECUR",
  984: "Zen-Me Labs Ltd",
  985: "3IWare Co., Ltd.",
  986: "EnOcean GmbH",
  987: "Instabeat, Inc",
  988: "Nima Labs",
  989: "Andreas Stihl AG & Co. KG",
  990: "Nathan Rhoades LLC",
  991: "Grob Technologies, LLC",
  992: "Actions (Zhuhai) Technology Co., Limited",
  993: "SPD Development Company Ltd",
  994: "Sensoan Oy",
  995: "Qualcomm Life Inc",
  996: "Chip-ing AG",
  997: "ffly4u",
  998: "IoT Instruments Oy",
  999: "TRUE Fitness Technology",
  1e3: "Reiner Kartengeraete GmbH & Co. KG.",
  1001: "SHENZHEN LEMONJOY TECHNOLOGY CO., LTD.",
  1002: "Hello Inc.",
  1003: "Evollve Inc.",
  1004: "Jigowatts Inc.",
  1005: "BASIC MICRO.COM,INC.",
  1006: "CUBE TECHNOLOGIES",
  1007: "foolography GmbH",
  1008: "CLINK",
  1009: "Hestan Smart Cooking Inc.",
  1010: "WindowMaster A/S",
  1011: "Flowscape AB",
  1012: "PAL Technologies Ltd",
  1013: "WHERE, Inc.",
  1014: "Iton Technology Corp.",
  1015: "Owl Labs Inc.",
  1016: "Rockford Corp.",
  1017: "Becon Technologies Co.,Ltd.",
  1018: "Vyassoft Technologies Inc",
  1019: "Nox Medical",
  1020: "Kimberly-Clark",
  1021: "Trimble Navigation Ltd.",
  1022: "Littelfuse",
  1023: "Withings",
  1024: "i-developer IT Beratung UG",
  1026: "Sears Holdings Corporation",
  1027: "Gantner Electronic GmbH",
  1028: "Authomate Inc",
  1029: "Vertex International, Inc.",
  1030: "Airtago",
  1031: "Swiss Audio SA",
  1032: "ToGetHome Inc.",
  1033: "AXIS",
  1034: "Openmatics",
  1035: "Jana Care Inc.",
  1036: "Senix Corporation",
  1037: "NorthStar Battery Company, LLC",
  1038: "SKF (U.K.) Limited",
  1039: "CO-AX Technology, Inc.",
  1040: "Fender Musical Instruments",
  1041: "Luidia Inc",
  1042: "SEFAM",
  1043: "Wireless Cables Inc",
  1044: "Lightning Protection International Pty Ltd",
  1045: "Uber Technologies Inc",
  1046: "SODA GmbH",
  1047: "Fatigue Science",
  1048: "Alpine Electronics Inc.",
  1049: "Novalogy LTD",
  1050: "Friday Labs Limited",
  1051: "OrthoAccel Technologies",
  1052: "WaterGuru, Inc.",
  1053: "Benning Elektrotechnik und Elektronik GmbH & Co. KG",
  1054: "Dell Computer Corporation",
  1055: "Kopin Corporation",
  1056: "TecBakery GmbH",
  1057: "Backbone Labs, Inc.",
  1058: "DELSEY SA",
  1059: "Chargifi Limited",
  1060: "Trainesense Ltd.",
  1061: "Unify Software and Solutions GmbH & Co. KG",
  1062: "Husqvarna AB",
  1063: "Focus fleet and fuel management inc",
  1064: "SmallLoop, LLC",
  1065: "Prolon Inc.",
  1066: "BD Medical",
  1067: "iMicroMed Incorporated",
  1068: "Ticto N.V.",
  1069: "Meshtech AS",
  1070: "MemCachier Inc.",
  1071: "Danfoss A/S",
  1072: "SnapStyk Inc.",
  1073: "Amyway Corporation",
  1074: "Silk Labs, Inc.",
  1075: "Pillsy Inc.",
  1076: "Hatch Baby, Inc.",
  1077: "Blocks Wearables Ltd.",
  1078: "Drayson Technologies (Europe) Limited",
  1079: "eBest IOT Inc.",
  1080: "Helvar Ltd",
  1081: "Radiance Technologies",
  1082: "Nuheara Limited",
  1083: "Appside co., ltd.",
  1084: "DeLaval",
  1085: "Coiler Corporation",
  1086: "Thermomedics, Inc.",
  1087: "Tentacle Sync GmbH",
  1088: "Valencell, Inc.",
  1089: "iProtoXi Oy",
  1090: "SECOM CO., LTD.",
  1091: "Tucker International LLC",
  1092: "Metanate Limited",
  1093: "Kobian Canada Inc.",
  1094: "NETGEAR, Inc.",
  1095: "Fabtronics Australia Pty Ltd",
  1096: "Grand Centrix GmbH",
  1097: "1UP USA.com llc",
  1098: "SHIMANO INC.",
  1099: "Nain Inc.",
  1100: "LifeStyle Lock, LLC",
  1101: "VEGA Grieshaber KG",
  1102: "Xtrava Inc.",
  1103: "TTS Tooltechnic Systems AG & Co. KG",
  1104: "Teenage Engineering AB",
  1105: "Tunstall Nordic AB",
  1106: "Svep Design Center AB",
  1107: "GreenPeak Technologies BV",
  1108: "Sphinx Electronics GmbH & Co KG",
  1109: "Atomation",
  1110: "Nemik Consulting Inc",
  1111: "RF INNOVATION",
  1112: "Mini Solution Co., Ltd.",
  1113: "Lumenetix, Inc",
  1114: "2048450 Ontario Inc",
  1115: "SPACEEK LTD",
  1116: "Delta T Corporation",
  1117: "Boston Scientific Corporation",
  1118: "Nuviz, Inc.",
  1119: "Real Time Automation, Inc.",
  1120: "Kolibree",
  1121: "vhf elektronik GmbH",
  1122: "Bonsai Systems GmbH",
  1123: "Fathom Systems Inc.",
  1124: "Bellman & Symfon",
  1125: "International Forte Group LLC",
  1126: "CycleLabs Solutions inc.",
  1127: "Codenex Oy",
  1128: "Kynesim Ltd",
  1129: "Palago AB",
  1130: "INSIGMA INC.",
  1131: "PMD Solutions",
  1132: "Qingdao Realtime Technology Co., Ltd.",
  1133: "BEGA Gantenbrink-Leuchten KG",
  1134: "Pambor Ltd.",
  65535: "SPECIAL USE/DEFAULT"
};
const Vc = te.exec, bc = te.execSync, Bc = Be, De = T, Nc = Dc, kc = ke, xt = process.platform, Fc = xt === "linux" || xt === "android", Rc = xt === "darwin", Wc = xt === "win32", Gc = xt === "freebsd", zc = xt === "openbsd", Uc = xt === "netbsd", Hc = xt === "sunos";
function Hi(t) {
  let n = "";
  return t.indexOf("keyboard") >= 0 && (n = "Keyboard"), t.indexOf("mouse") >= 0 && (n = "Mouse"), t.indexOf("trackpad") >= 0 && (n = "Trackpad"), t.indexOf("audio") >= 0 && (n = "Audio"), t.indexOf("sound") >= 0 && (n = "Audio"), t.indexOf("microph") >= 0 && (n = "Microphone"), t.indexOf("speaker") >= 0 && (n = "Speaker"), t.indexOf("headset") >= 0 && (n = "Headset"), t.indexOf("phone") >= 0 && (n = "Phone"), t.indexOf("macbook") >= 0 && (n = "Computer"), t.indexOf("imac") >= 0 && (n = "Computer"), t.indexOf("ipad") >= 0 && (n = "Tablet"), t.indexOf("watch") >= 0 && (n = "Watch"), t.indexOf("headphone") >= 0 && (n = "Headset"), n;
}
function $c(t) {
  let n = t.split(" ")[0];
  return t = t.toLowerCase(), t.indexOf("apple") >= 0 && (n = "Apple"), t.indexOf("ipad") >= 0 && (n = "Apple"), t.indexOf("imac") >= 0 && (n = "Apple"), t.indexOf("iphone") >= 0 && (n = "Apple"), t.indexOf("magic mouse") >= 0 && (n = "Apple"), t.indexOf("magic track") >= 0 && (n = "Apple"), t.indexOf("macbook") >= 0 && (n = "Apple"), n;
}
function Xc(t) {
  const n = parseInt(t);
  if (!isNaN(n)) return Nc[n];
}
function Kc(t, n, e) {
  const s = {};
  return s.device = null, s.name = De.getValue(t, "name", "="), s.manufacturer = null, s.macDevice = n, s.macHost = e, s.batteryPercent = null, s.type = Hi(s.name.toLowerCase()), s.connected = !1, s;
}
function gi(t, n) {
  const e = {}, s = ((t.device_minorClassOfDevice_string || t.device_majorClassOfDevice_string || t.device_minorType || "") + (t.device_name || "")).toLowerCase();
  return e.device = t.device_services || "", e.name = t.device_name || "", e.manufacturer = t.device_manufacturer || Xc(t.device_vendorID) || $c(t.device_name || "") || "", e.macDevice = (t.device_addr || t.device_address || "").toLowerCase().replace(/-/g, ":"), e.macHost = n, e.batteryPercent = t.device_batteryPercent || null, e.type = Hi(s), e.connected = t.device_isconnected === "attrib_Yes" || !1, e;
}
function jc(t) {
  const n = {};
  return n.device = null, n.name = De.getValue(t, "name", ":"), n.manufacturer = De.getValue(t, "manufacturer", ":"), n.macDevice = null, n.macHost = null, n.batteryPercent = null, n.type = Hi(n.name.toLowerCase()), n.connected = null, n;
}
function qc(t) {
  return new Promise((n) => {
    process.nextTick(() => {
      let e = [];
      if (Fc) {
        De.getFilesInPath("/var/lib/bluetooth/").forEach((r) => {
          const i = Bc.basename(r), o = r.split("/"), a = o.length >= 6 ? o[o.length - 2] : null, l = o.length >= 7 ? o[o.length - 3] : null;
          if (i === "info") {
            const c = kc.readFileSync(r, { encoding: "utf8" }).split(`
`);
            e.push(Kc(c, a, l));
          }
        });
        try {
          const r = bc("hcitool con", De.execOptsLinux).toString().toLowerCase();
          for (let i = 0; i < e.length; i++)
            e[i].macDevice && e[i].macDevice.length > 10 && r.indexOf(e[i].macDevice.toLowerCase()) >= 0 && (e[i].connected = !0);
        } catch {
          De.noop();
        }
        t && t(e), n(e);
      }
      Rc && Vc("system_profiler SPBluetoothDataType -json", (r, i) => {
        if (!r)
          try {
            const o = JSON.parse(i.toString());
            if (o.SPBluetoothDataType && o.SPBluetoothDataType.length && o.SPBluetoothDataType[0] && o.SPBluetoothDataType[0].device_title && o.SPBluetoothDataType[0].device_title.length) {
              let a = null;
              o.SPBluetoothDataType[0].local_device_title && o.SPBluetoothDataType[0].local_device_title.general_address && (a = o.SPBluetoothDataType[0].local_device_title.general_address.toLowerCase().replace(/-/g, ":")), o.SPBluetoothDataType[0].device_title.forEach((l) => {
                const c = l, u = Object.keys(c);
                if (u && u.length === 1) {
                  const f = c[u[0]];
                  f.device_name = u[0];
                  const p = gi(f, a);
                  e.push(p);
                }
              });
            }
            if (o.SPBluetoothDataType && o.SPBluetoothDataType.length && o.SPBluetoothDataType[0] && o.SPBluetoothDataType[0].device_connected && o.SPBluetoothDataType[0].device_connected.length) {
              const a = o.SPBluetoothDataType[0].controller_properties && o.SPBluetoothDataType[0].controller_properties.controller_address ? o.SPBluetoothDataType[0].controller_properties.controller_address.toLowerCase().replace(/-/g, ":") : null;
              o.SPBluetoothDataType[0].device_connected.forEach((l) => {
                const c = l, u = Object.keys(c);
                if (u && u.length === 1) {
                  const f = c[u[0]];
                  f.device_name = u[0], f.device_isconnected = "attrib_Yes";
                  const p = gi(f, a);
                  e.push(p);
                }
              });
            }
            if (o.SPBluetoothDataType && o.SPBluetoothDataType.length && o.SPBluetoothDataType[0] && o.SPBluetoothDataType[0].device_not_connected && o.SPBluetoothDataType[0].device_not_connected.length) {
              const a = o.SPBluetoothDataType[0].controller_properties && o.SPBluetoothDataType[0].controller_properties.controller_address ? o.SPBluetoothDataType[0].controller_properties.controller_address.toLowerCase().replace(/-/g, ":") : null;
              o.SPBluetoothDataType[0].device_not_connected.forEach((l) => {
                const c = l, u = Object.keys(c);
                if (u && u.length === 1) {
                  const f = c[u[0]];
                  f.device_name = u[0], f.device_isconnected = "attrib_No";
                  const p = gi(f, a);
                  e.push(p);
                }
              });
            }
          } catch {
            De.noop();
          }
        t && t(e), n(e);
      }), Wc && De.powerShell("Get-CimInstance Win32_PNPEntity | select PNPClass, Name, Manufacturer, Status, Service, ConfigManagerErrorCode, Present | fl").then((s, r) => {
        r || s.toString().split(/\n\s*\n/).forEach((o) => {
          const a = o.split(`
`), l = De.getValue(a, "Service", ":"), c = De.getValue(a, "ConfigManagerErrorCode", ":");
          De.getValue(a, "PNPClass", ":").toLowerCase() === "bluetooth" && c === "0" && l === "" && e.push(jc(a));
        }), t && t(e), n(e);
      }), (Gc || Uc || zc || Hc) && n(null);
    });
  });
}
fr.bluetoothDevices = qc;
(function(t) {
  const n = Or.version, e = T, s = Sn, r = Tt, i = yt, o = Ai, a = ea, l = Js, c = Dt, u = Vt, f = Qn, p = Zn, d = rr, m = Wi, h = St, y = lr, g = cr, x = ur, S = pr, C = fr, L = process.platform, V = L === "win32", E = L === "freebsd", U = L === "openbsd", O = L === "netbsd", $ = L === "sunos";
  V && (e.getCodepage(), e.getPowershell());
  function ne() {
    return n;
  }
  function re(z) {
    return new Promise((ee) => {
      process.nextTick(() => {
        const F = {};
        F.version = ne(), Promise.all([
          s.system(),
          s.bios(),
          s.baseboard(),
          s.chassis(),
          r.osInfo(),
          r.uuid(),
          r.versions(),
          i.cpu(),
          i.cpuFlags(),
          l.graphics(),
          u.networkInterfaces(),
          o.memLayout(),
          c.diskLayout(),
          S.audio(),
          C.bluetoothDevices(),
          x.usb(),
          g.printer()
        ]).then((B) => {
          F.system = B[0], F.bios = B[1], F.baseboard = B[2], F.chassis = B[3], F.os = B[4], F.uuid = B[5], F.versions = B[6], F.cpu = B[7], F.cpu.flags = B[8], F.graphics = B[9], F.net = B[10], F.memLayout = B[11], F.diskLayout = B[12], F.audio = B[13], F.bluetooth = B[14], F.usb = B[15], F.printer = B[16], z && z(F), ee(F);
        });
      });
    });
  }
  function oe(z, ee, F) {
    return e.isFunction(ee) && (F = ee, ee = ""), e.isFunction(z) && (F = z, z = ""), new Promise((B) => {
      process.nextTick(() => {
        ee = ee || u.getDefaultNetworkInterface(), z = z || "";
        let G = (() => {
          let k = 15;
          return V && (k = 13), (E || U || O) && (k = 11), $ && (k = 6), function() {
            --k === 0 && (F && F(j), B(j));
          };
        })();
        const j = {};
        j.time = r.time(), j.node = process.versions.node, j.v8 = process.versions.v8, i.cpuCurrentSpeed().then((k) => {
          j.cpuCurrentSpeed = k, G();
        }), d.users().then((k) => {
          j.users = k, G();
        }), p.processes().then((k) => {
          j.processes = k, G();
        }), i.currentLoad().then((k) => {
          j.currentLoad = k, G();
        }), $ || i.cpuTemperature().then((k) => {
          j.temp = k, G();
        }), !U && !E && !O && !$ && u.networkStats(ee).then((k) => {
          j.networkStats = k, G();
        }), $ || u.networkConnections().then((k) => {
          j.networkConnections = k, G();
        }), o.mem().then((k) => {
          j.mem = k, G();
        }), $ || a().then((k) => {
          j.battery = k, G();
        }), $ || p.services(z).then((k) => {
          j.services = k, G();
        }), $ || c.fsSize().then((k) => {
          j.fsSize = k, G();
        }), !V && !U && !E && !O && !$ && c.fsStats().then((k) => {
          j.fsStats = k, G();
        }), !V && !U && !E && !O && !$ && c.disksIO().then((k) => {
          j.disksIO = k, G();
        }), !U && !E && !O && !$ && f.wifiNetworks().then((k) => {
          j.wifiNetworks = k, G();
        }), m.inetLatency().then((k) => {
          j.inetLatency = k, G();
        });
      });
    });
  }
  function ae(z, ee, F) {
    return new Promise((B) => {
      process.nextTick(() => {
        let G = {};
        ee && e.isFunction(ee) && !F && (F = ee, ee = ""), z && e.isFunction(z) && !ee && !F && (F = z, z = "", ee = ""), re().then((j) => {
          G = j, oe(z, ee).then((k) => {
            for (let ge in k)
              ({}).hasOwnProperty.call(k, ge) && (G[ge] = k[ge]);
            F && F(G), B(G);
          });
        });
      });
    });
  }
  function b(z, ee) {
    return new Promise((F) => {
      process.nextTick(() => {
        const B = Object.keys(z).filter((G) => ({}).hasOwnProperty.call(t, G)).map((G) => {
          const j = z[G].substring(z[G].lastIndexOf("(") + 1, z[G].lastIndexOf(")"));
          let k = G.indexOf(")") >= 0 ? G.split(")")[1].trim() : G;
          return k = G.indexOf("|") >= 0 ? G.split("|")[0].trim() : k, j ? t[k](j) : t[k]("");
        });
        Promise.all(B).then((G) => {
          const j = {};
          let k = 0;
          for (let ge in z)
            if ({}.hasOwnProperty.call(z, ge) && {}.hasOwnProperty.call(t, ge) && G.length > k) {
              if (z[ge] === "*" || z[ge] === "all")
                j[ge] = G[k];
              else {
                let q = z[ge], bt = "", Bt = [];
                if (q.indexOf(")") >= 0 && (q = q.split(")")[1].trim()), q.indexOf("|") >= 0 && (bt = q.split("|")[1].trim(), Bt = bt.split(":"), q = q.split("|")[0].trim()), q = q.replace(/,/g, " ").replace(/ +/g, " ").split(" "), G[k])
                  if (Array.isArray(G[k])) {
                    const Lt = [];
                    G[k].forEach((wt) => {
                      let It = {};
                      if (q.length === 1 && (q[0] === "*" || q[0] === "all") ? It = wt : q.forEach((Xe) => {
                        ({}).hasOwnProperty.call(wt, Xe) && (It[Xe] = wt[Xe]);
                      }), bt && Bt.length === 2) {
                        if ({}.hasOwnProperty.call(It, Bt[0].trim())) {
                          const Xe = It[Bt[0].trim()];
                          typeof Xe == "number" ? Xe === parseFloat(Bt[1].trim()) && Lt.push(It) : typeof Xe == "string" && Xe.toLowerCase() === Bt[1].trim().toLowerCase() && Lt.push(It);
                        }
                      } else
                        Lt.push(It);
                    }), j[ge] = Lt;
                  } else {
                    const Lt = {};
                    q.forEach((wt) => {
                      ({}).hasOwnProperty.call(G[k], wt) && (Lt[wt] = G[k][wt]);
                    }), j[ge] = Lt;
                  }
                else
                  j[ge] = {};
              }
              k++;
            }
          ee && ee(j), F(j);
        });
      });
    });
  }
  function me(z, ee, F) {
    let B = null;
    return setInterval(() => {
      b(z).then((j) => {
        JSON.stringify(B) !== JSON.stringify(j) && (B = Object.assign({}, j), F(j));
      });
    }, ee);
  }
  t.version = ne, t.system = s.system, t.bios = s.bios, t.baseboard = s.baseboard, t.chassis = s.chassis, t.time = r.time, t.osInfo = r.osInfo, t.versions = r.versions, t.shell = r.shell, t.uuid = r.uuid, t.cpu = i.cpu, t.cpuFlags = i.cpuFlags, t.cpuCache = i.cpuCache, t.cpuCurrentSpeed = i.cpuCurrentSpeed, t.cpuTemperature = i.cpuTemperature, t.currentLoad = i.currentLoad, t.fullLoad = i.fullLoad, t.mem = o.mem, t.memLayout = o.memLayout, t.battery = a, t.graphics = l.graphics, t.fsSize = c.fsSize, t.fsOpenFiles = c.fsOpenFiles, t.blockDevices = c.blockDevices, t.fsStats = c.fsStats, t.disksIO = c.disksIO, t.diskLayout = c.diskLayout, t.networkInterfaceDefault = u.networkInterfaceDefault, t.networkGatewayDefault = u.networkGatewayDefault, t.networkInterfaces = u.networkInterfaces, t.networkStats = u.networkStats, t.networkConnections = u.networkConnections, t.wifiNetworks = f.wifiNetworks, t.wifiInterfaces = f.wifiInterfaces, t.wifiConnections = f.wifiConnections, t.services = p.services, t.processes = p.processes, t.processLoad = p.processLoad, t.users = d.users, t.inetChecksite = m.inetChecksite, t.inetLatency = m.inetLatency, t.dockerInfo = h.dockerInfo, t.dockerImages = h.dockerImages, t.dockerContainers = h.dockerContainers, t.dockerContainerStats = h.dockerContainerStats, t.dockerContainerProcesses = h.dockerContainerProcesses, t.dockerVolumes = h.dockerVolumes, t.dockerAll = h.dockerAll, t.vboxInfo = y.vboxInfo, t.printer = g.printer, t.usb = x.usb, t.audio = S.audio, t.bluetoothDevices = C.bluetoothDevices, t.getStaticData = re, t.getDynamicData = oe, t.getAllData = ae, t.get = b, t.observe = me, t.powerShellStart = e.powerShellStart, t.powerShellRelease = e.powerShellRelease;
})(Ps);
const Yc = /* @__PURE__ */ Ir(Ps), Jc = gr(import.meta.url), xn = Be.dirname(Jc);
Et.commandLine.appendSwitch("enable-transparent-visuals");
const Ii = Be.join(Et.getPath("userData"), "cat-config.json"), Is = {
  apiKey: "",
  model: "deepseek-chat",
  systemPrompt: `你是一个存在于用户电脑桌面上的虚拟桌宠，你的名字叫"没头脑的马屁精"。
你的性格特点是：
1. 有点笨笨的，不是很懂深奥的道理，数学和逻辑极差。
2. 极端崇拜你的主人（即用户），你人生唯一的乐趣就是变着法子拍主人的马屁、提供情绪价值。
3. 说话语气可爱、俏皮，经常带卖萌的口癖。
4. 对主人的任何行为和话语都抱有盲目的惊叹。
无论发生什么，你都要用极短的话语（20字以内）先惊叹、再拍马屁。千万不要讲大道理！`,
  memories: [],
  chatHistory: [],
  modelName: "Wanko (小狗)",
  modelUrl: "/CubismSdkForWeb-5-r.4/Samples/Resources/Wanko/Wanko.model3.json"
};
function $i() {
  try {
    if (Os(Ii))
      return { ...Is, ...JSON.parse(hr(Ii, "utf-8")) };
  } catch (t) {
    console.error("Failed to load config:", t);
  }
  return { ...Is };
}
function Xi(t) {
  try {
    xr(Ii, JSON.stringify(t, null, 2), "utf-8");
  } catch (n) {
    console.error("Failed to save config:", n);
  }
}
let he, Ae;
function dr(t) {
  const n = Be.join(xn, `${t}.mjs`), e = Be.join(xn, `${t}.js`);
  return Os(n) ? n : e;
}
function _s() {
  he = new yn({
    width: 320,
    height: 350,
    transparent: !0,
    backgroundColor: "#00000000",
    frame: !1,
    alwaysOnTop: !0,
    resizable: !1,
    hasShadow: !1,
    skipTaskbar: !0,
    webPreferences: {
      preload: dr("preload"),
      contextIsolation: !0,
      nodeIntegration: !1,
      webSecurity: !1
    }
  }), he.setAlwaysOnTop(!0, "pop-up-menu"), he.setVisibleOnAllWorkspaces(!0, { visibleOnFullScreen: !0 });
  const t = mr.buildFromTemplate([
    { label: "👁️ 开启感知中心", click: () => $t("sensory") },
    { type: "separator" },
    { label: "功能使用文档", click: () => $t("doc") },
    { label: "查看历史记录", click: () => $t("history") },
    { label: "打开设置", click: () => $t("general") },
    { type: "separator" },
    {
      label: "❌ 退出",
      click: () => Et.quit()
    }
  ]);
  he.webContents.on("context-menu", () => t.popup({ window: he })), process.env.VITE_DEV_SERVER_URL ? he.loadURL(process.env.VITE_DEV_SERVER_URL) : he.loadFile(Be.join(xn, "../dist/index.html"));
}
function $t(t = "general") {
  if (Ae && !Ae.isDestroyed()) {
    process.env.VITE_DEV_SERVER_URL ? Ae.loadURL(`${process.env.VITE_DEV_SERVER_URL}#${t}`) : Ae.loadFile(Be.join(xn, "../dist/index.html"), { hash: t }), Ae.focus();
    return;
  }
  Ae = new yn({
    width: 1200,
    height: 800,
    title: "桌宠控制台",
    resizable: !0,
    webPreferences: {
      preload: dr("preload"),
      contextIsolation: !0,
      nodeIntegration: !1
    }
  }), Ae.setMenuBarVisibility(!1), process.env.VITE_DEV_SERVER_URL ? Ae.loadURL(`${process.env.VITE_DEV_SERVER_URL}#${t}`) : Ae.loadFile(Be.join(xn, "../dist/index.html"), { hash: t }), Ae.on("closed", () => {
    Ae = null;
  });
}
Et.whenReady().then(() => {
  _s(), Et.on("activate", () => {
    yn.getAllWindows().length === 0 && _s();
  });
});
Et.on("window-all-closed", () => {
  process.platform !== "darwin" && Et.quit();
});
$e.on("drag-update", (t, { dx: n, dy: e }) => {
  if (n !== 0 || e !== 0) {
    const [s, r] = he.getPosition();
    he.setPosition(Math.round(s + n), Math.round(r + e));
  }
});
$e.on("set-ignore-mouse-events", (t, n, e) => {
  const s = yn.fromWebContents(t.sender);
  s && s.setIgnoreMouseEvents(n, e);
});
$e.handle("get-config", () => $i());
$e.handle("save-config", (t, n) => (Xi(n), he && !he.isDestroyed() && he.webContents.send("config-updated", n), !0));
$e.handle("append-memories", async (t, n) => {
  const e = $i(), s = e.memories || [], r = /* @__PURE__ */ new Date(), i = `${r.getMonth() + 1}/${r.getDate()} ${r.getHours().toString().padStart(2, "0")}:${r.getMinutes().toString().padStart(2, "0")}`;
  let o = 0;
  return n.forEach((a) => {
    s.some((c) => (typeof c == "object" ? c.text : c).toLowerCase().trim() === a.toLowerCase().trim()) || (s.push({ text: a, time: i }), o++);
  }), o > 0 && (Xi({ ...e, memories: s }), he && !he.isDestroyed() && he.webContents.send("config-updated", { ...e, memories: s })), o;
});
$e.on("open-settings", () => $t("general"));
$e.handle("add-to-history", (t, n) => {
  const e = $i(), r = [...e.chatHistory || [], n].slice(-15), i = { ...e, chatHistory: r };
  return Xi(i), yn.getAllWindows().forEach((o) => {
    o.isDestroyed() || o.webContents.send("config-updated", i);
  }), !0;
});
$e.on("open-history", () => $t("history"));
$e.handle("get-system-state", async () => {
  try {
    const t = await wr(), n = await Yc.battery();
    return {
      activeWindow: t ? t.title : "",
      activeApp: t ? t.owner.name : "",
      batteryPercent: n.percent,
      isCharging: n.isCharging,
      hasBattery: n.hasBattery,
      time: (/* @__PURE__ */ new Date()).toLocaleTimeString()
    };
  } catch (t) {
    return console.error("Failed to get system state:", t), null;
  }
});
