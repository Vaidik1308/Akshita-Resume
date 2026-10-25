"use client";

import { ChevronUp, FileText, LayoutGrid, Mail, Search as SearchIcon } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { linkFor, profile } from "@/lib/portfolio";
import { describeWeather } from "@/lib/weather";
import { AppIcon } from "../AppIcon";
import { useNow, useOS } from "../context";
import { APPS, type AppId } from "../registry";
import { city, NowWidget, ProfileWidget, useWeather, WeatherIcon } from "../widgets";
import { NavBar } from "./NavBar";

export type Origin = { top: number; left: number; width: number; height: number } | null;

const rectOf = (e: MouseEvent) => {
  const r = (e.currentTarget.querySelector("[data-icon]") ?? e.currentTarget).getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
};

function AtAGlance() {
  const now = useNow(60_000);
  const weather = useWeather();
  return (
    <section aria-label="At a glance" className="px-2 pt-2 text-white [text-shadow:0_1px_4px_rgb(0_0_0/0.45)]">
      <p className="text-2xl font-normal">{now ? now.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }) : " "}</p>
      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/90">
        {weather ? (
          <>
            <WeatherIcon weather={weather} className="size-4" /> {weather.temp}°C · {describeWeather(weather.code).label} in {city}
          </>
        ) : (
          city
        )}
      </p>
    </section>
  );
}

export function HomeScreen({ onLaunch, onDrawer, onHome }: { onLaunch: (id: AppId, origin: Origin) => void; onDrawer: () => void; onHome: () => void }) {
  const { openSearch } = useOS();
  const resume = linkFor("resume");
  const linkedin = linkFor("linkedin");
  const swipe = useRef<number | null>(null);
  const external = (href: string) => window.open(href, "_blank", "noopener,noreferrer");

  const dock = [
    { key: "mail", label: "Email", icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
    ...(linkedin ? [{ key: "li", label: "LinkedIn", icon: FaLinkedin, run: () => external(linkedin.href) }] : []),
    ...(resume ? [{ key: "cv", label: "Résumé", icon: FileText, run: () => external(resume.href) }] : []),
    { key: "all", label: "All apps", icon: LayoutGrid, run: onDrawer },
  ];

  return (
    <div className="flex h-full flex-col pt-[calc(32px+env(safe-area-inset-top))]">
      <div className="scroll-thin min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-3">
        <AtAGlance />
        <ProfileWidget />
        <NowWidget />
        <ul className="grid grid-cols-4 gap-x-2 gap-y-4 pt-2" aria-label="Apps">
          {APPS.map((a) => (
            <li key={a.id}>
              <button onClick={(e) => onLaunch(a.id, rectOf(e))} className="flex w-full flex-col items-center gap-1.5">
                <span data-icon>
                  <AppIcon id={a.id} compact />
                </span>
                <span className="w-full truncate text-center text-xs text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.6)]">{a.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Search, dock and nav share one flex column so they can never overlap */}
      <div
        className="flex shrink-0 flex-col gap-3 px-4 pb-[max(4px,env(safe-area-inset-bottom))] pt-1"
        style={{ touchAction: "pan-x" }}
        onPointerDown={(e) => (swipe.current = e.clientY)}
        onPointerUp={(e) => {
          if (swipe.current !== null && swipe.current - e.clientY > 50) onDrawer();
          swipe.current = null;
        }}
      >
        <button aria-label="Open all apps" onClick={onDrawer} className="mx-auto -mb-1 grid h-5 w-16 place-items-center text-white drop-shadow">
          <ChevronUp className="size-5" />
        </button>
        <button
          onClick={openSearch}
          className="flex h-14 w-full items-center gap-3 rounded-full bg-md-surface-container-high/85 px-5 text-left text-md-on-surface-variant backdrop-blur-xl"
        >
          <SearchIcon className="size-5" aria-hidden />
          <span className="flex-1">Search {profile.firstName}&apos;s portfolio</span>
        </button>
        <div className="flex justify-around">
          {dock.map((d) => (
            <button key={d.key} onClick={d.run} aria-label={d.label} className="flex justify-center">
              <span className="grid size-14 place-items-center rounded-full bg-md-surface-container-highest/85 text-md-on-surface backdrop-blur-xl">
                <d.icon className="size-6" />
              </span>
            </button>
          ))}
        </div>
        <NavBar onHome={onHome} />
      </div>
    </div>
  );
}
