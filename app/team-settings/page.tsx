"use client";

/**
 * Team Settings — reached from the OrgRail's gear icon (left rail
 * bottom). Sub-nav (376px) shows the active team's avatar, name,
 * Team ID, member-count card, and grouped settings rows (Members
 * Management, Knowledge Management) plus a destructive Disband Team
 * row. Main area is the same faded chat-bubble watermark as the
 * user-Settings page.
 */

import { useState } from "react";
import {
  Pencil,
  Lock,
  Users,
  UserCheck,
  Hourglass,
  ArrowLeftRight,
  UserCog,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import OrgRail from "../chat/_components/OrgRail";
import Menu, { ResizeHandle } from "../chat/_components/Menu";

const FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

const SUBNAV_MIN_VISIBLE = 280;
const SUBNAV_MAX = 600;
const SUBNAV_DEFAULT = 376;

const TEAM_NAME = "lia";
const TEAM_ID = "6485517";
const MEMBERS_USED = 1;
const MEMBERS_TOTAL = 50;

type Row = { icon: React.ReactNode; label: string };

const MEMBER_ROWS: Row[] = [
  { icon: <Users size={18} strokeWidth={1.6} />, label: "Tags & Members" },
  { icon: <UserCheck size={18} strokeWidth={1.6} />, label: "Join Requests" },
  { icon: <Hourglass size={18} strokeWidth={1.6} />, label: "Pending Invitations" },
  { icon: <ArrowLeftRight size={18} strokeWidth={1.6} />, label: "Transfer Ownership" },
];

const KNOWLEDGE_ROWS: Row[] = [
  { icon: <UserCog size={18} strokeWidth={1.6} />, label: "Archived Members & Memory Transfer" },
  { icon: <BookOpen size={18} strokeWidth={1.6} />, label: "Wiki Management" },
];

export default function TeamSettingsPage() {
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
      <TeamSettingsSidebar
        width={subNavWidth}
        onResize={setSubNavWidth}
        onDragStart={() => setDraggingSubNav(true)}
        onDragEnd={() => setDraggingSubNav(false)}
        dragging={draggingSubNav}
      />
      <TeamSettingsMain />
    </div>
  );
}

/* ====================================================================== */
/*  TEAM SETTINGS SUB-NAV                                                  */
/* ====================================================================== */
function TeamSettingsSidebar({
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
          Team Settings
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-5 pt-5 pb-6 flex flex-col gap-4">
        {/* Avatar + team name + ID */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="size-[72px] rounded-full bg-[#6d28d9] flex items-center justify-center shadow-[0_2px_8px_rgba(109,40,217,0.25)]">
            <span className="text-white text-[28px] font-semibold">L</span>
          </div>
          <div className="flex items-center gap-1.5">
            <p className="text-[16px] font-semibold text-[#020617]">{TEAM_NAME}</p>
            <button
              type="button"
              aria-label="Edit team name"
              className="w-5 h-5 flex items-center justify-center text-[#8793ab] hover:text-[#020617]"
            >
              <Pencil size={12} strokeWidth={1.8} />
            </button>
          </div>
          <p className="text-[12px] text-[#8793ab]">Team ID:{TEAM_ID}</p>
        </div>

        {/* Team progress card */}
        <div className="rounded-[12px] bg-white border border-[#e7ebf8] px-4 py-3">
          <p className="text-[15px] font-semibold text-[#020617] mb-2">Team</p>
          <div className="relative h-1 rounded-full bg-[#e7ebf8] overflow-hidden mb-2">
            <div
              className="absolute top-0 left-0 h-full bg-[#005eff] rounded-full"
              style={{ width: `${(MEMBERS_USED / MEMBERS_TOTAL) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[#475569]">Team Members</span>
            <span className="font-semibold text-[#005eff]">
              {MEMBERS_USED}/{MEMBERS_TOTAL}
            </span>
          </div>
        </div>

        {/* Security row — top-level, no section header */}
        <SettingsRow
          icon={<Lock size={18} strokeWidth={1.6} />}
          label="Security & Permissions"
        />

        <SectionHeader>Members Management</SectionHeader>
        {MEMBER_ROWS.map((r) => (
          <SettingsRow key={r.label} icon={r.icon} label={r.label} />
        ))}

        <SectionHeader>Knowledge Management</SectionHeader>
        {KNOWLEDGE_ROWS.map((r) => (
          <SettingsRow key={r.label} icon={r.icon} label={r.label} />
        ))}

        {/* Destructive row */}
        <button
          type="button"
          className="w-full mt-2 px-2 py-3 text-left text-[15px] font-medium text-[#ef4444] hover:bg-[#fef2f2] rounded-[8px] transition-colors"
        >
          Disband Team
        </button>
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

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] text-[#8793ab] mt-1 mb-0.5 px-2 uppercase tracking-wide">
      {children}
    </p>
  );
}

function SettingsRow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 px-2 py-3 rounded-[8px] hover:bg-[#eef1f7] transition-colors"
    >
      <span className="size-9 flex items-center justify-center text-[#0f294d] shrink-0">
        {icon}
      </span>
      <span className="flex-1 text-left text-[15px] font-medium text-[#020617]">
        {label}
      </span>
      <ChevronRight
        size={16}
        strokeWidth={1.8}
        className="text-[#8793ab] shrink-0"
      />
    </button>
  );
}

/* ====================================================================== */
/*  MAIN — faded chat-bubble watermark                                     */
/* ====================================================================== */
function TeamSettingsMain() {
  return (
    <div className="flex-1 min-w-0 h-full bg-white flex items-center justify-center relative overflow-hidden">
      <svg
        aria-hidden
        viewBox="0 0 240 200"
        className="w-[240px] h-[200px] opacity-[0.12]"
      >
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
