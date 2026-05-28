"use client";

/**
 * Profile page — reached from the user-menu popup's "View Profile"
 * link. Same chrome (OrgRail + Menu) as other pages. Sub-nav is the
 * user profile column (avatar, leverage card, role, responsibilities,
 * key achievements). Main is the "A New Way to Build Leverage" hero.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Pencil,
  ChevronRight,
  Plus as PlusIcon,
  MessageSquare,
  LayoutGrid,
} from "lucide-react";
import OrgRail from "../chat/_components/OrgRail";
import Menu, { ResizeHandle } from "../chat/_components/Menu";
import { asset } from "../_lib/asset";

const imgPhoto = asset("/figma/user-photo.png");

const FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

const SUBNAV_MIN_VISIBLE = 240;
const SUBNAV_MAX = 600;
const SUBNAV_DEFAULT = 376;

export default function ProfilePage() {
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
      <ProfileSidebar
        width={subNavWidth}
        onResize={setSubNavWidth}
        onDragStart={() => setDraggingSubNav(true)}
        onDragEnd={() => setDraggingSubNav(false)}
        dragging={draggingSubNav}
      />
      <ProfileHero />
    </div>
  );
}

/* ====================================================================== */
/*  PROFILE SUB-NAV                                                        */
/* ====================================================================== */
function ProfileSidebar({
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
      <div className="flex-1 overflow-y-auto scrollbar-thin px-5 pt-6 pb-6 flex flex-col gap-5">
        {/* Avatar + name + role */}
        <div className="flex items-center gap-3">
          <div className="size-[60px] rounded-full overflow-hidden shrink-0 bg-[#cbd5e1]">
            <img src={imgPhoto} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[18px] font-semibold text-[#020617] truncate">
                Yiran GUO
              </p>
              <button
                type="button"
                aria-label="Edit name"
                className="w-5 h-5 flex items-center justify-center text-[#8793ab] hover:text-[#020617]"
              >
                <Pencil size={12} strokeWidth={1.8} />
              </button>
            </div>
            <p className="text-[13px] text-[#8793ab]">Product Designer</p>
          </div>
        </div>

        {/* Leverage Dashboard card */}
        <div className="rounded-[12px] bg-gradient-to-br from-[#dbeafe] to-[#cce4ff] px-4 py-3.5 cursor-pointer hover:opacity-90 transition-opacity">
          <p className="text-[15px] font-semibold text-[#0891b2] mb-2">
            Leverage Dashboard
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#475569]">
              Overall Leverage Score
            </span>
            <span className="flex items-center gap-1 text-[12px] text-[#020617]">
              Generating
              <ChevronRight size={12} strokeWidth={2} />
            </span>
          </div>
        </div>

        <div className="h-px bg-[#e7ebf8]" />

        {/* Role */}
        <section>
          <h3 className="text-[14px] font-semibold text-[#020617] mb-2.5">
            Role
          </h3>
          <div className="rounded-[10px] border border-[#e7ebf8] px-3.5 py-2.5 text-[13px] text-[#020617]">
            Product Designer · Reports to Ling LV
          </div>
        </section>

        <div className="h-px bg-[#e7ebf8]" />

        {/* Core Responsibilities */}
        <section>
          <h3 className="text-[14px] font-semibold text-[#020617] mb-2.5">
            Core Responsibilities
          </h3>
          <div className="rounded-[10px] border border-[#e7ebf8] px-3.5 py-2.5 text-[13px] text-[#020617] mb-2">
            Tanka chat web design
          </div>
          <button
            type="button"
            className="w-full rounded-[10px] bg-[#e0e7ff]/60 hover:bg-[#e0e7ff] transition-colors py-2 flex items-center justify-center gap-1.5 text-[13px] text-[#006dff] font-medium"
          >
            Add
            <PlusIcon size={14} strokeWidth={2} />
          </button>
        </section>

        <div className="h-px bg-[#e7ebf8]" />

        {/* Key Achievements */}
        <section>
          <h3 className="text-[14px] font-semibold text-[#020617] mb-2.5">
            Key Achievements
          </h3>
          <p className="text-[13px] text-[#8793ab] italic">
            Looking forward to your first key result
          </p>
        </section>
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

/* ====================================================================== */
/*  PROFILE HERO — main area                                               */
/* ====================================================================== */
function ProfileHero() {
  return (
    <div className="flex-1 min-w-0 h-full flex flex-col bg-[#f7f8fc] relative overflow-hidden">
      {/* Header strip */}
      <header className="h-[72px] shrink-0 flex items-center px-8 border-b border-[#e7ebf8]">
        <h1 className="text-[15px] font-medium text-[#020617]">Leverage Dashboard</h1>
      </header>

      {/* Centered hero with concentric rings */}
      <div className="flex-1 relative flex items-center justify-center">
        <Rings />
        <div className="relative z-10 text-center max-w-[560px] px-8">
          <h2 className="text-[42px] font-semibold text-[#020617] tracking-tight leading-[1.1]">
            A New Way to Build
            <br />
            Leverage.
          </h2>
          <p className="mt-4 text-[15px] text-[#8793ab]">
            It starts with how you work with AI.
          </p>
        </div>
      </div>

      {/* Feature list — bottom-right anchored */}
      <div className="shrink-0 px-12 pb-12 flex flex-col gap-5 max-w-[560px] self-end w-full">
        <Feature
          icon={<MessageSquare size={20} strokeWidth={1.6} className="text-[#020617]" />}
          title="Leverage signals"
          desc="Turn conversations into reusable experiences."
        />
        <Feature
          icon={<LayoutGrid size={20} strokeWidth={1.6} className="text-[#020617]" />}
          title="Flow compounds"
          desc="Your outputs compound over time."
        />
        <Feature
          icon={<LadderIcon />}
          title="Built for you"
          desc="Measure progress against your own baseline."
        />
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="size-12 rounded-full bg-white border border-[#e7ebf8] shadow-[0_1px_3px_rgba(15,41,77,0.04)] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="pt-1.5">
        <p className="text-[15px] font-semibold text-[#020617]">{title}</p>
        <p className="text-[13px] text-[#8793ab] mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

/** Decorative concentric ring SVG with two animated dots, behind the
 *  hero text. */
function Rings() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      className="absolute inset-0 m-auto w-[680px] h-[680px] opacity-70 pointer-events-none"
    >
      <defs>
        <radialGradient id="ring-fade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#cce4ff" stopOpacity="0" />
          <stop offset="70%" stopColor="#cce4ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#cce4ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="260" fill="none" stroke="#cce4ff" strokeWidth="1.2" />
      <circle cx="300" cy="300" r="180" fill="none" stroke="#cce4ff" strokeWidth="1.2" />
      <circle cx="300" cy="300" r="120" fill="none" stroke="url(#ring-fade)" strokeWidth="2" />
      {/* Dots on the rings */}
      <circle cx="540" cy="290" r="4" fill="#60a5fa" />
      <circle cx="120" cy="330" r="3" fill="#60a5fa" />
      <circle cx="350" cy="120" r="3" fill="#60a5fa" />
    </svg>
  );
}

function LadderIcon() {
  // Small "ladder" / steps glyph for "Built for you".
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="text-[#020617]"
    >
      <path
        d="M5 4v14M15 4v14M5 8h10M5 12h10M5 16h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
