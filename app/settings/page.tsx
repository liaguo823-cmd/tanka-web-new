"use client";

/**
 * Settings page — reached from the user-menu popup's "Settings" row.
 * Sub-nav (376px): plan card + list of setting categories.
 * Main: faded decorative chat-bubble watermark.
 */

import { useState } from "react";
import {
  Lock,
  Languages,
  Bell,
  Pencil,
  Sparkles,
  LifeBuoy,
  ArrowUpCircle,
  Info,
  ChevronRight,
} from "lucide-react";
import OrgRail from "../chat/_components/OrgRail";
import Menu, { ResizeHandle } from "../chat/_components/Menu";

const FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

const SUBNAV_MIN_VISIBLE = 240;
const SUBNAV_MAX = 600;
const SUBNAV_DEFAULT = 376;

type Row = {
  icon: React.ReactNode;
  label: string;
  trailing?: string;
};

const ROWS: Row[] = [
  { icon: <Lock size={18} strokeWidth={1.6} />, label: "Privacy and Security" },
  { icon: <Languages size={18} strokeWidth={1.6} />, label: "Translation" },
  { icon: <Bell size={18} strokeWidth={1.6} />, label: "Notifications" },
  { icon: <Pencil size={18} strokeWidth={1.6} />, label: "Appearance" },
  { icon: <Sparkles size={18} strokeWidth={1.6} />, label: "AI Settings" },
  { icon: <LifeBuoy size={18} strokeWidth={1.6} />, label: "Support" },
  { icon: <ArrowUpCircle size={18} strokeWidth={1.6} />, label: "Check for Updates" },
  { icon: <Info size={18} strokeWidth={1.6} />, label: "About", trailing: "Version 1.6.7" },
];

export default function SettingsPage() {
  const [subNavWidth, setSubNavWidthRaw] = useState(SUBNAV_DEFAULT);
  const [draggingSubNav, setDraggingSubNav] = useState(false);
  function setSubNavWidth(w: number) {
    if (Number.isNaN(w)) return;
    if (w < SUBNAV_MIN_VISIBLE / 2) {
      setSubNavWidthRaw(0);
      return;
    }
    setSubNavWidthRaw(Math.max(SUBNAV_MIN_VISIBLE, Math.min(SUBNAV_MAX, w)));
  }
  return (
    <div
      className="h-screen w-screen flex bg-[#eef1f7] overflow-hidden"
      style={{ fontFamily: FONT }}
    >
      <OrgRail />
      <Menu />
      <SettingsSidebar
        width={subNavWidth}
        onResize={setSubNavWidth}
        onDragStart={() => setDraggingSubNav(true)}
        onDragEnd={() => setDraggingSubNav(false)}
        dragging={draggingSubNav}
      />
      <SettingsMain />
    </div>
  );
}

/* ====================================================================== */
/*  SETTINGS SUB-NAV                                                       */
/* ====================================================================== */
function SettingsSidebar({
  width,
  onResize,
  onDragStart,
  onDragEnd,
  dragging,
}: {
  width: number;
  onResize: (w: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  dragging: boolean;
}) {
  if (width === 0) return null;
  return (
    <div
      className={`shrink-0 h-full bg-[#f7f8fc] flex flex-col border-r border-[#e7ebf8] relative overflow-hidden ${
        dragging ? "" : "transition-[width] duration-200 ease-out"
      }`}
      style={{ width }}
    >
      <div className="h-[72px] shrink-0 flex items-center px-[15px] border-b border-[#e7ebf8]">
        <h2 className="text-[18px] font-semibold text-[#020617] leading-[22.4px] tracking-tight">
          Settings
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 pt-4 pb-6 flex flex-col gap-3">
        {/* Plan card */}
        <div className="rounded-[12px] bg-[#e8eefc] px-4 py-3.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[15px] font-semibold text-[#020617]">Your Plan</span>
            <span className="px-1.5 py-0.5 rounded-[4px] bg-[#020617] text-white text-[10px] font-semibold uppercase tracking-wide">
              Pro
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#475569]">AI Credits This Month</span>
            <span className="text-[12px] font-semibold italic text-[#020617]">
              Unlimited
            </span>
          </div>
        </div>

        {/* Setting rows */}
        <div className="flex flex-col">
          {ROWS.map((row) => (
            <SettingsRow key={row.label} row={row} />
          ))}
        </div>
      </div>

      <ResizeHandle
        currentWidth={width}
        onResize={onResize}
        onStart={onDragStart}
        onEnd={onDragEnd}
      />
    </div>
  );
}

function SettingsRow({ row }: { row: Row }) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 px-2 py-3 rounded-[8px] hover:bg-[#eef1f7] transition-colors group"
    >
      <span className="size-9 flex items-center justify-center text-[#0f294d] shrink-0">
        {row.icon}
      </span>
      <span className="flex-1 text-left text-[15px] font-medium text-[#020617]">
        {row.label}
      </span>
      {row.trailing && (
        <span className="text-[13px] text-[#8793ab]">{row.trailing}</span>
      )}
      <ChevronRight
        size={16}
        strokeWidth={1.8}
        className="text-[#8793ab] shrink-0"
      />
    </button>
  );
}

/* ====================================================================== */
/*  SETTINGS MAIN — faded chat-bubble watermark                            */
/* ====================================================================== */
function SettingsMain() {
  return (
    <div className="flex-1 min-w-0 h-full bg-[#f7f8fc] flex items-center justify-center relative overflow-hidden">
      <svg
        aria-hidden
        viewBox="0 0 240 200"
        className="w-[240px] h-[200px] opacity-[0.12]"
      >
        {/* Stacked rounded bars — the Tanka chat-bubble mark */}
        <rect x="20" y="20" width="160" height="34" rx="8" fill="#cbd5e1" />
        <rect x="60" y="64" width="160" height="34" rx="8" fill="#cbd5e1" />
        <path
          d="M30 108 H180 a8 8 0 0 1 8 8 v26 a8 8 0 0 1 -8 8 H70 l-22 18 v-18 H30 a8 8 0 0 1 -8 -8 v-26 a8 8 0 0 1 8 -8 z"
          fill="#cbd5e1"
        />
      </svg>
    </div>
  );
}
