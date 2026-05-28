"use client";

/**
 * Link page — same chrome (Org rail + Menu) as /chat and /flow, with
 * Link as the selected menu tab. Shows a Linked Tools list column and a
 * tools catalog grid on the right, per the latest Figma design.
 */

import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import OrgRail from "../chat/_components/OrgRail";
import Menu from "../chat/_components/Menu";


const FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

type LinkedTool = {
  name: string;
  account: string;
  icon: string;
  badgeIcon?: string;
};

const LINKED_TOOLS: LinkedTool[] = [
  { name: "AI Work Memory", account: "Claude Code、Codex", icon: "/figma/link-open-ai.svg" },
  { name: "AI Work Memory", account: "Claude Code、Codex", icon: "/figma/link-open-ai.svg" },
  { name: "AI Work Memory", account: "Claude Code、Codex", icon: "/figma/link-open-ai.svg" },
  { name: "AI Work Memory", account: "Claude Code、Codex", icon: "/figma/link-open-ai.svg" },
  { name: "Outlook", account: "tankatest@tanka.ai", icon: "/figma/link-outlook.svg", badgeIcon: "envelope" },
  { name: "ChatGPT", account: "tankatest@tanka.ai", icon: "/figma/link-open-ai.svg", badgeIcon: "chat" },
  { name: "Zoom", account: "tankatest@tanka.ai", icon: "/figma/link-mask-group.svg", badgeIcon: "doc" },
  { name: "Google Calendar", account: "tankatest@tanka.ai,test_0111...", icon: "/figma/link-gcalendar.svg", badgeIcon: "calendar" },
  { name: "Google Sheets", account: "tankatest@tanka.ai", icon: "/figma/link-sheets.svg" },
  { name: "Google Slides", account: "tankatest@tanka.ai", icon: "/figma/link-slides.svg" },
];

type Integration = {
  name: string;
  icon: string;
  status: "Linked" | "Unlinked";
};

const INTEGRATIONS: Integration[] = [
  { name: "Google Calendar", icon: "/figma/link-gcalendar.svg", status: "Linked" },
  { name: "Outlook Calendar", icon: "/figma/link-calendar.svg", status: "Unlinked" },
  { name: "OneDrive", icon: "/figma/link-onedrive11.svg", status: "Unlinked" },
  { name: "Outlook", icon: "/figma/link-outlook.svg", status: "Unlinked" },
  { name: "Notion", icon: "/figma/link-memo.svg", status: "Linked" },
  { name: "Google Drive", icon: "/figma/link-gdrive.svg", status: "Unlinked" },
  { name: "Google Sheets", icon: "/figma/link-sheets.svg", status: "Linked" },
  { name: "Google Docs", icon: "/figma/link-docs.svg", status: "Unlinked" },
  { name: "Google Slides", icon: "/figma/link-slides.svg", status: "Linked" },
  { name: "Zoom", icon: "/figma/link-mask-group.svg", status: "Linked" },
];

const TAB_CATEGORIES = [
  "Featured",
  "Files & Docs",
  "Emails & Messengers",
  "Calendars",
  "Meeting",
  "AI Models",
  "Data & Analytics",
  "Tanka Official",
  "Others",
];

export default function LinkPage() {
  return (
    <div
      className="h-screen w-screen flex bg-[#eef1f7] overflow-hidden"
      style={{ fontFamily: FONT }}
    >
      <OrgRail />
      <Menu />
      <LinkedToolsList />
      <ToolsCatalog />
    </div>
  );
}

/* ====================================================================== */
/*  LINKED TOOLS LIST — 280px                                             */
/* ====================================================================== */
function LinkedToolsList() {
  return (
    <div className="w-[376px] shrink-0 h-full bg-[#f7f8fc] flex flex-col border-r border-[#e7ebf8]">
      {/* Title */}
      <div className="h-[72px] shrink-0 flex items-center px-[15px] border-b border-[#e7ebf8]">
        <h2 className="text-[18px] font-semibold text-[#020617] leading-[22.4px]">
          Link
        </h2>
      </div>

      {/* Linked Tools (12) header */}
      <div className="px-[15px] pt-4 pb-2 shrink-0">
        <span className="text-[13px] text-[#8793ab]">Linked Tools (12)</span>
      </div>

      {/* Tool list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-[10px] pb-3 flex flex-col gap-1">
        {LINKED_TOOLS.map((tool, i) => (
          <LinkedToolRow key={i} tool={tool} />
        ))}
      </div>
    </div>
  );
}

function LinkedToolRow({ tool }: { tool: LinkedTool }) {
  return (
    <button
      type="button"
      className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] hover:bg-white/60 transition-colors"
    >
      <div className="w-9 h-9 rounded-[8px] bg-white border border-[#e7ebf8] flex items-center justify-center shrink-0 overflow-hidden">
        <img src={tool.icon} alt="" className="w-6 h-6 object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[#020617] truncate">{tool.name}</p>
        <p className="text-[11px] text-[#8793ab] truncate">{tool.account}</p>
      </div>
      {tool.badgeIcon && <BadgeIcon kind={tool.badgeIcon} />}
    </button>
  );
}

function BadgeIcon({ kind }: { kind: string }) {
  const path = (() => {
    switch (kind) {
      case "envelope":
        return <path d="M3 6.5C3 5.67 3.67 5 4.5 5h11c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-11C3.67 15 3 14.33 3 13.5v-7Z M3 6.5L10 11l7-4.5" />;
      case "chat":
        return <path d="M16 9c0 3.5-3.13 6.3-7 6.3-1.16 0-2.26-.27-3.23-.74L3 16l.74-2.76C3.27 12.26 3 11.16 3 10c0-3.5 3.13-6.3 7-6.3s7 2.8 7 6.3Z" />;
      case "doc":
        return <path d="M5 4h6l4 4v8c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1ZM11 4v4h4" />;
      case "calendar":
        return <path d="M4 5h12c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1ZM3 9h14M7 3v4M13 3v4" />;
      default:
        return null;
    }
  })();
  return (
    <svg
      viewBox="0 0 20 20"
      className="w-4 h-4 shrink-0 text-[#8793ab]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path}
    </svg>
  );
}

/* ====================================================================== */
/*  TOOLS CATALOG — flex-1                                                */
/* ====================================================================== */
function ToolsCatalog() {
  const [activeTab, setActiveTab] = useState("Featured");
  return (
    <div className="flex-1 min-w-0 h-full overflow-y-auto bg-[#f7f8fc]">
      <div className="max-w-[1000px] mx-auto px-10 py-10">
        {/* Header */}
        <h1 className="text-[15px] text-[#006dff] font-medium mb-4">AI sees your work across</h1>

        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <MetricCard label="Data Items" value="38.0K" chart="bars" />
          <MetricCard label="Months" value="9" chart="line" />
        </div>

        {/* All Tools header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold text-[#020617]">
            All Tools <span className="text-[#8793ab] font-normal">(39)</span>
          </h2>
          <div className="h-9 w-[200px] rounded-[8px] bg-white border border-[#e7ebf8] flex items-center gap-2 px-3">
            <Search size={14} className="text-[#8793ab]" strokeWidth={1.8} />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-[13px] text-[#020617] placeholder:text-[#8793ab]"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {TAB_CATEGORIES.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 h-8 rounded-full text-[13px] transition-colors ${
                activeTab === tab
                  ? "bg-[rgba(0,109,255,0.1)] border border-[rgba(0,109,255,0.2)] text-[#006dff] font-medium"
                  : "bg-[#f7f9fa] text-[#455871] hover:bg-[#eef1f7]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Integration grid */}
        <div className="grid grid-cols-2 gap-4">
          {INTEGRATIONS.map((it, i) => (
            <IntegrationCard key={i} item={it} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  chart,
}: {
  label: string;
  value: string;
  chart: "bars" | "line";
}) {
  return (
    <button
      type="button"
      className="bg-white rounded-[14px] border border-[#e7ebf8] p-5 flex items-center justify-between hover:shadow-[0_4px_16px_rgba(15,41,77,0.06)] transition-shadow"
    >
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-1.5 text-[13px] text-[#455871] mb-2">
          <span>{label}</span>
          <ChevronRight size={14} className="text-[#8793ab]" strokeWidth={1.8} />
        </div>
        <span className="text-[28px] font-semibold text-[#020617] leading-none">{value}</span>
      </div>
      <div className="w-[100px] h-[40px] shrink-0">
        {chart === "bars" ? <BarsChart /> : <LineChart />}
      </div>
    </button>
  );
}

function BarsChart() {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      {[20, 28, 18, 32, 22, 12, 26].map((h, i) => (
        <rect
          key={i}
          x={i * 14}
          y={40 - h}
          width="8"
          height={h}
          rx="1.5"
          fill={i === 3 ? "#006dff" : "#cce4ff"}
        />
      ))}
    </svg>
  );
}

function LineChart() {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full" fill="none">
      <path
        d="M0 30 Q15 25, 25 28 T50 18 T75 22 T100 12"
        stroke="#a78bfa"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IntegrationCard({ item }: { item: Integration }) {
  const isLinked = item.status === "Linked";
  return (
    <div className="bg-white rounded-[12px] border border-[#e7ebf8] p-4 flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-[8px] bg-[#f7f8fc] border border-[#e7ebf8] flex items-center justify-center shrink-0 overflow-hidden">
          <img src={item.icon} alt="" className="w-6 h-6 object-contain" />
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-[#020617] truncate">{item.name}</p>
          <p className="text-[11px] text-[#8793ab] flex items-center gap-1">
            <span>🔗</span>
            <span>{item.status}</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        className={`px-3 h-7 rounded-full text-[12px] font-medium border ${
          isLinked
            ? "border-[#e7ebf8] text-[#006dff] hover:bg-[#f7f8fc]"
            : "border-[rgba(0,109,255,0.3)] text-[#006dff] hover:bg-[rgba(0,109,255,0.05)]"
        }`}
      >
        {isLinked ? "View" : "Link"}
      </button>
    </div>
  );
}
