"use client";

/**
 * Follow-ups page — list of pending action items grouped by date,
 * matching the latest mockup.
 */

import { useState } from "react";
import { ChevronDown, ListFilter, MoreHorizontal, Plus, LayoutGrid } from "lucide-react";
import OrgRail from "../chat/_components/OrgRail";
import Menu from "../chat/_components/Menu";

const FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

type Item = {
  title: string;
  assignee: string;
  unread?: boolean;
  hasFlow?: boolean;
};

type Group = {
  date: string;
  items: Item[];
};

const GROUPS: Group[] = [
  {
    date: "TODAY",
    items: [
      { title: "Prepare a summary of today's client discussion and share it with the team", assignee: "Tanka Product Tanka", unread: true, hasFlow: true },
      { title: "AI-assisted workflow ensuring seamless collaboration and zero-loss transition from design to engineering.", assignee: "Tanka Product Tanka", unread: true, hasFlow: true },
      { title: "Team Operating System (Team OS)", assignee: "Tanka Product Tanka", hasFlow: true },
      { title: "AI-assisted workflow ensuring seamless collaboration and zero-loss transition from design to engineering.", assignee: "Tanka Product Tanka", unread: true, hasFlow: true },
    ],
  },
  {
    date: "2025/5/26",
    items: [
      { title: "Design-to-Development Handoff Protocol", assignee: "Tanka Product Tanka", unread: true, hasFlow: true },
      { title: "Our key differentiator is the powered personalization that no competitor currently offers.\nOur key differentiator is the powered personalization that no competitor currently offers.", assignee: "Tanka Product Tanka", hasFlow: true },
      { title: "AI-assisted workflow ensuring seamless collaboration and zero-loss transition from design to engineering.", assignee: "Tanka Product Tanka", hasFlow: true },
    ],
  },
];

export default function FollowUpsPage() {
  const [tab, setTab] = useState<"me" | "other">("me");
  const [filter, setFilter] = useState<"open" | "completed">("open");
  return (
    <div className="h-screen w-screen flex bg-[#eef1f7] overflow-hidden" style={{ fontFamily: FONT }}>
      <OrgRail />
      <Menu />
      <div className="flex-1 min-w-0 h-full flex flex-col bg-[#f7f8fc]">
        {/* Header */}
        <header className="h-[60px] shrink-0 flex items-center px-6 border-b border-[#e7ebf8]">
          <h1 className="text-[18px] font-semibold text-[#020617]">Follow-ups</h1>
          <button
            type="button"
            className="ml-auto bg-[#020617] text-white text-[14px] font-medium px-4 h-9 rounded-full flex items-center gap-1.5 hover:bg-[#0f294d]"
          >
            <Plus size={14} strokeWidth={2.2} />
            Create
          </button>
        </header>

        {/* Tabs */}
        <div className="px-8 pt-6 shrink-0">
          <div className="border-b border-[#e7ebf8] flex items-center gap-8">
            <button
              type="button"
              onClick={() => setTab("me")}
              className={`pb-3 text-[15px] font-medium relative ${
                tab === "me" ? "text-[#020617]" : "text-[#8793ab]"
              }`}
            >
              To Me (30)
              {tab === "me" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#020617] rounded-full" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setTab("other")}
              className={`pb-3 text-[15px] font-medium relative ${
                tab === "other" ? "text-[#020617]" : "text-[#8793ab]"
              }`}
            >
              To Other (20)
              {tab === "other" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#020617] rounded-full" />
              )}
            </button>
          </div>

          {/* Filter row */}
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => setFilter("open")}
              className={`px-4 h-8 rounded-full text-[13px] font-medium ${
                filter === "open"
                  ? "bg-[#eef1f7] text-[#020617]"
                  : "bg-white border border-[#e7ebf8] text-[#455871]"
              }`}
            >
              Open (10)
            </button>
            <button
              type="button"
              onClick={() => setFilter("completed")}
              className={`px-4 h-8 rounded-full text-[13px] font-medium flex items-center gap-1.5 ${
                filter === "completed"
                  ? "bg-[#eef1f7] text-[#020617]"
                  : "bg-white border border-[#e7ebf8] text-[#455871]"
              }`}
            >
              Completed (10)
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
            </button>
            <button
              type="button"
              className="px-4 h-8 rounded-full text-[13px] font-medium bg-white border border-[#e7ebf8] text-[#455871] flex items-center gap-1.5"
            >
              High
              <ChevronDown size={12} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="ml-auto px-3 h-8 text-[13px] text-[#455871] hover:text-[#020617] flex items-center gap-1.5"
            >
              <ListFilter size={14} strokeWidth={1.8} />
              Select
            </button>
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-8 py-6">
          {GROUPS.map((group) => (
            <div key={group.date} className="mb-6">
              <h2 className="text-[11px] font-medium tracking-[0.04em] text-[#8793ab] mb-3">
                {group.date}
              </h2>
              <div className="flex flex-col gap-2">
                {group.items.map((it, i) => (
                  <ItemCard key={i} item={it} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ItemCard({ item }: { item: Item }) {
  return (
    <div className="relative bg-white rounded-[12px] border border-[#e7ebf8] hover:shadow-[0_4px_12px_rgba(15,41,77,0.04)] transition-shadow">
      <div className="flex items-start gap-3 p-4 pl-5">
        {/* Left priority bar */}
        <span className="absolute left-3 top-4 bottom-4 w-[3px] bg-[#ef4444] rounded-full" />
        <div className="flex-1 min-w-0">
          <p className="text-[14px] text-[#020617] leading-[1.5] whitespace-pre-line">
            {item.title}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#fcd34d] to-[#f59e0b] inline-flex items-center justify-center shrink-0" />
            <span className="text-[12px] text-[#8793ab]">{item.assignee}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {item.hasFlow && (
            <button
              type="button"
              className="w-7 h-7 rounded-md text-[#8793ab] hover:bg-[#f7f8fc] hover:text-[#020617] flex items-center justify-center"
              aria-label="Open in flow"
            >
              <LayoutGrid size={14} strokeWidth={1.8} />
            </button>
          )}
          <button
            type="button"
            className="w-7 h-7 rounded-md text-[#8793ab] hover:bg-[#f7f8fc] hover:text-[#020617] flex items-center justify-center"
            aria-label="More"
          >
            <MoreHorizontal size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
      {item.unread && (
        <span className="absolute right-3 top-3 w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
      )}
    </div>
  );
}
