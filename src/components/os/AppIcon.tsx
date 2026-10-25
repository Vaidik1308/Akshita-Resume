import { cn } from "@/lib/utils";
import { appById, type AppId } from "./registry";
import { FluentIcon } from "./windows/FluentIcons";

const TONES = {
  primary: "bg-md-primary-container text-md-on-primary-container",
  secondary: "bg-md-secondary-container text-md-on-secondary-container",
  tertiary: "bg-md-tertiary-container text-md-on-tertiary-container",
};

// Fluent glyph on Windows, Material adaptive round icon on Android.
export function AppIcon({ id, compact, className }: { id: AppId; compact?: boolean; className?: string }) {
  if (!compact) return <FluentIcon id={id} className={cn("size-8 shrink-0", className)} />;
  const app = appById(id);
  const Icon = app.icon;
  return (
    <span className={cn("grid size-14 place-items-center rounded-full", TONES[app.tone], className)}>
      <Icon className="size-[45%]" strokeWidth={2} aria-hidden />
    </span>
  );
}
