"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Illustrative project scenes. They show what each project does, not real measurements.
const W = 480;
const H = 270;

export function ScaledMockup({ slug, className }: { slug: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const Scene = SCENES[slug];
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative w-full overflow-hidden rounded-md bg-neutral-900", className)}
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      {scale > 0 && Scene && (
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
          <BrowserFrame title={TITLES[slug]}>
            <Scene />
          </BrowserFrame>
        </div>
      )}
    </div>
  );
}

function BrowserFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-[#1c1c1f] font-sans text-white">
      <div className="flex h-[26px] shrink-0 items-center gap-2 bg-[#2b2b30] px-2.5">
        <span className="h-[14px] flex-1 truncate rounded-full bg-white/10 px-2 text-[9px] leading-[14px] text-white/60">{title}</span>
        <span className="flex gap-2.5 text-[9px] text-white/50">
          <span>—</span>
          <span>▢</span>
          <span>✕</span>
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

const TITLES: Record<string, string> = {
  "guardian-in-the-bag": "guardian · live tracking",
  "dc-motor-health": "motor-twin · health dashboard",
  "anti-sleep-alarm": "anti-sleep · driver monitor",
  "house-price-prediction": "house_price_prediction.ipynb",
  "music-genre-classification": "genre_classifier.ipynb",
};

function Guardian() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "repeating-linear-gradient(0deg, transparent 0 34px, #ffffff0d 34px 36px), repeating-linear-gradient(90deg, transparent 0 46px, #ffffff0d 46px 48px), #10202b",
      }}
    >
      <svg className="absolute inset-0" width={W} height={H - 26}>
        <path d="M20 210 C 110 190, 120 120, 200 120 S 300 60, 330 90" stroke="#38bdf8" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 9" />
        <circle cx="330" cy="90" r="26" fill="#ef444433" />
        <circle cx="330" cy="90" r="14" fill="#ef444455" />
        <circle cx="330" cy="90" r="6" fill="#ef4444" stroke="white" strokeWidth="2" />
      </svg>
      <div className="absolute left-3 top-3 w-[170px] rounded-lg bg-[#ef4444] p-2.5 shadow-lg">
        <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Panic button held · 5s</p>
        <p className="mt-0.5 text-[15px] font-bold">SOS triggered</p>
        <p className="mt-1 text-[9px] opacity-90">Buzzer on · alerting people nearby</p>
      </div>
      <div className="absolute bottom-3 left-3 flex gap-1.5">
        {["ESP32", "GPS NEO-6M", "GSM SIM800A"].map((c) => (
          <span key={c} className="rounded-full bg-black/50 px-2 py-0.5 text-[9px] text-white/80 ring-1 ring-white/10">
            ● {c}
          </span>
        ))}
      </div>
      <div className="absolute bottom-3 right-3 w-[150px] rounded-2xl bg-[#f4f4f5] p-2 text-[#111] shadow-xl">
        <p className="text-[8px] font-semibold text-neutral-500">SMS · Emergency contact</p>
        <p className="mt-1 rounded-xl rounded-tl-sm bg-white px-2 py-1.5 text-[9px] leading-snug shadow-sm">
          SOS! I need help. My live location:
          <span className="block text-[#2563eb] underline">maps · 12.97° N, 77.59° E</span>
        </p>
        <p className="mt-1.5 text-center text-[8px] font-medium text-green-700">📞 Calling emergency contact…</p>
      </div>
    </div>
  );
}

function Spark({ color, d }: { color: string; d: string }) {
  return (
    <svg width="96" height="22" className="mt-1">
      <path d={d} stroke={color} strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function MotorTwin() {
  const gauges = [
    { k: "Speed", v: "1480 rpm", c: "#38bdf8", d: "M0 14 L12 12 L24 13 L36 10 L48 12 L60 9 L72 11 L84 10 L96 11" },
    { k: "Temperature", v: "42 °C", c: "#f59e0b", d: "M0 18 L12 17 L24 16 L36 15 L48 15 L60 13 L72 13 L84 12 L96 12" },
    { k: "Vibration", v: "0.8 mm/s", c: "#a78bfa", d: "M0 12 L8 8 L16 15 L24 9 L32 14 L40 7 L48 13 L56 10 L64 14 L72 9 L80 12 L88 10 L96 12" },
    { k: "Current", v: "2.1 A", c: "#34d399", d: "M0 11 L12 11 L24 12 L36 10 L48 11 L60 11 L72 10 L84 11 L96 11" },
  ];
  return (
    <div className="absolute inset-0 flex gap-3 bg-[#0f1115] p-3">
      <div className="relative flex w-[170px] flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#1e293b] to-[#0f172a] ring-1 ring-white/10">
        <span className="absolute left-2 top-2 rounded bg-sky-500/20 px-1.5 py-0.5 text-[8px] font-semibold text-sky-300">DIGITAL TWIN</span>
        <svg width="130" height="90" viewBox="0 0 130 90">
          <defs>
            <linearGradient id="mt" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#94a3b8" />
              <stop offset=".5" stopColor="#e2e8f0" />
              <stop offset="1" stopColor="#475569" />
            </linearGradient>
          </defs>
          <rect x="18" y="20" width="80" height="50" rx="8" fill="url(#mt)" />
          {[30, 42, 54, 66, 78].map((x) => (
            <rect key={x} x={x} y="20" width="3" height="50" fill="#64748b" opacity=".6" />
          ))}
          <rect x="98" y="38" width="26" height="14" rx="3" fill="#cbd5e1" />
          <rect x="30" y="70" width="56" height="8" rx="2" fill="#334155" />
        </svg>
        <p className="mt-1 text-[10px] text-white/60">DC Motor · live model</p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5 ring-1 ring-white/10">
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" stroke="#ffffff1a" strokeWidth="5" fill="none" />
            <circle cx="22" cy="22" r="18" stroke="#22c55e" strokeWidth="5" fill="none" strokeDasharray="113" strokeDashoffset="20" strokeLinecap="round" transform="rotate(-90 22 22)" />
          </svg>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-white/50">Motor health</p>
            <p className="text-[14px] font-semibold text-green-400">Healthy</p>
            <p className="text-[9px] text-white/50">No failure predicted</p>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2">
          {gauges.map((g) => (
            <div key={g.k} className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
              <p className="text-[8px] uppercase tracking-wider text-white/50">{g.k}</p>
              <p className="text-[12px] font-semibold">{g.v}</p>
              <Spark color={g.c} d={g.d} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AntiSleep() {
  return (
    <div className="absolute inset-0 flex gap-3 bg-[#0b0d10] p-3">
      <div className="relative flex-1 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_40%,#2b3340,#11151b)] ring-1 ring-white/10">
        <span className="absolute left-2 top-2 flex items-center gap-1 text-[8px] font-semibold text-red-400">
          <span className="size-1.5 rounded-full bg-red-500" /> REC · driver cam
        </span>
        <svg className="absolute inset-0 m-auto" width="150" height="170" viewBox="0 0 150 170">
          <ellipse cx="75" cy="88" rx="52" ry="66" fill="#3b4250" />
          <path d="M45 78 q10 6 20 0" stroke="#0b0d10" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M85 78 q10 6 20 0" stroke="#0b0d10" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="38" y="66" width="34" height="22" rx="3" stroke="#facc15" strokeWidth="1.5" fill="none" />
          <rect x="78" y="66" width="34" height="22" rx="3" stroke="#facc15" strokeWidth="1.5" fill="none" />
          <path d="M62 120 q13 6 26 0" stroke="#0b0d10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-yellow-400 px-1.5 text-[8px] font-bold text-black">EYES CLOSED</span>
      </div>
      <div className="flex w-[165px] flex-col gap-2">
        <div className="rounded-xl bg-red-500 p-2.5 text-center shadow-[0_0_24px_#ef444466]">
          <p className="text-[18px]">⏰</p>
          <p className="text-[13px] font-bold">WAKE UP!</p>
          <p className="text-[9px] opacity-90">Drowsiness detected</p>
        </div>
        <div className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
          <p className="text-[8px] uppercase tracking-wider text-white/50">Eye closure</p>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-yellow-400 to-red-500" />
          </div>
          <p className="mt-1 text-[9px] text-white/60">Above alert threshold</p>
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
          <span className="text-[16px]">🔊</span>
          <div>
            <p className="text-[10px] font-medium">Buzzer</p>
            <p className="text-[9px] text-red-400">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotebookCell({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="w-[34px] shrink-0 pt-1 text-right font-mono text-[8px] text-[#7aa2f7]">In [{n}]:</span>
      <div className="flex-1 rounded border border-white/10 bg-[#24283b] px-2 py-1 font-mono text-[9px] leading-[1.5]">{children}</div>
    </div>
  );
}

function HousePrice() {
  const pts = [
    [30, 150], [48, 138], [60, 140], [74, 120], [86, 126], [98, 108], [112, 104], [124, 92], [138, 96], [150, 78], [162, 74], [176, 62], [188, 66], [200, 48],
  ];
  return (
    <div className="absolute inset-0 space-y-2 bg-[#1a1b26] p-3 text-[#c0caf5]">
      <NotebookCell n={2}>
        <span className="text-[#bb9af7]">import</span> pandas <span className="text-[#bb9af7]">as</span> pd, numpy <span className="text-[#bb9af7]">as</span> np
        <br />
        df = pd.read_csv(<span className="text-[#9ece6a]">&quot;housing.csv&quot;</span>)
      </NotebookCell>
      <NotebookCell n={3}>
        model.fit(X_train, y_train)<span className="text-white/40"> # features → price</span>
      </NotebookCell>
      <div className="flex gap-3 pl-[42px]">
        <svg width="220" height="160" className="rounded bg-white">
          <line x1="24" y1="10" x2="24" y2="150" stroke="#ccc" />
          <line x1="24" y1="150" x2="214" y2="150" stroke="#ccc" />
          {pts.map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3" fill="#3b82f6" opacity=".75" />
          ))}
          <line x1="28" y1="152" x2="208" y2="48" stroke="#ef4444" strokeWidth="2" />
          <text x="120" y="164" fontSize="8" fill="#666" textAnchor="middle">Area (sq ft)</text>
          <text x="10" y="80" fontSize="8" fill="#666" transform="rotate(-90 10 80)" textAnchor="middle">Price</text>
        </svg>
        <div className="flex flex-col justify-center gap-2 text-[9px]">
          <div className="rounded-md bg-[#24283b] p-2 ring-1 ring-white/10">
            <p className="text-white/50">Model</p>
            <p className="font-semibold">Regression</p>
          </div>
          <div className="rounded-md bg-[#24283b] p-2 ring-1 ring-white/10">
            <p className="text-white/50">Predict</p>
            <p className="font-mono">model.predict(new_home)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MusicGenre() {
  const bars = Array.from({ length: 64 }, (_, i) => 8 + Math.abs(Math.sin(i * 0.55) * 26 + Math.sin(i * 1.7) * 10));
  const genres = [
    ["Jazz", 0.71],
    ["Blues", 0.14],
    ["Classical", 0.08],
    ["Rock", 0.05],
    ["Pop", 0.02],
  ] as const;
  return (
    <div className="absolute inset-0 flex flex-col gap-2.5 bg-[#12101a] p-3">
      <div className="rounded-xl bg-white/5 p-2.5 ring-1 ring-white/10">
        <div className="flex items-center justify-between text-[9px] text-white/60">
          <span>🎵 sample_clip.wav · 30s</span>
          <span>MFCC features → KNN / Neural Net</span>
        </div>
        <div className="mt-2 flex h-[54px] items-center gap-[2px]">
          {bars.map((h, i) => (
            <span key={i} className="flex-1 rounded-full bg-gradient-to-t from-fuchsia-500 to-violet-400" style={{ height: h, opacity: i < 40 ? 1 : 0.35 }} />
          ))}
        </div>
      </div>
      <div className="flex flex-1 gap-3">
        <div className="flex flex-1 flex-col justify-center gap-1.5 rounded-xl bg-white/5 p-2.5 ring-1 ring-white/10">
          {genres.map(([g, p]) => (
            <div key={g} className="flex items-center gap-2 text-[9px]">
              <span className="w-[48px] text-white/70">{g}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full rounded-full bg-violet-400" style={{ width: `${p * 100}%`, opacity: g === "Jazz" ? 1 : 0.5 }} />
              </span>
            </div>
          ))}
        </div>
        <div className="flex w-[140px] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-center">
          <p className="text-[9px] uppercase tracking-widest opacity-80">Predicted genre</p>
          <p className="text-[22px] font-bold">Jazz</p>
          <p className="text-[9px] opacity-80">sample prediction</p>
        </div>
      </div>
    </div>
  );
}

const SCENES: Record<string, () => ReactNode> = {
  "guardian-in-the-bag": Guardian,
  "dc-motor-health": MotorTwin,
  "anti-sleep-alarm": AntiSleep,
  "house-price-prediction": HousePrice,
  "music-genre-classification": MusicGenre,
};
