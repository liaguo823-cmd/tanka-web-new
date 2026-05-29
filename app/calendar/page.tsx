"use client";

/**
 * Calendar page — month grid with event dots and a list of today's events
 * below.
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown, Plus, Search } from "lucide-react";
import OrgRail from "../chat/_components/OrgRail";
import Menu from "../chat/_components/Menu";

const FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

type Day = { n: number | null; muted?: boolean; events?: ("blue" | "green" | "teal" | "indigo")[]; today?: boolean };

// Dec 2024 grid (Sun-start)
const DAYS: Day[] = [
  { n: 1, events: ["teal"] },
  { n: 2, events: ["blue", "blue"] },
  { n: 3, events: ["teal"] },
  { n: 4, events: ["teal"] },
  { n: 5, events: ["teal", "teal"] },
  { n: 6, events: ["teal", "teal"] },
  { n: 7 },

  { n: 8 },
  { n: 9 },
  { n: 10, events: ["blue", "teal"] },
  { n: 11 },
  { n: 12, events: ["blue"] },
  { n: 13 },
  { n: 14 },

  { n: 15, events: ["blue"] },
  { n: 16 },
  { n: 17, events: ["green", "green"] },
  { n: 18 },
  { n: 19, events: ["blue"] },
  { n: 20, events: ["blue"] },
  { n: 21 },

  { n: 22 },
  { n: 23, events: ["blue", "blue"] },
  { n: 24 },
  { n: 25, events: ["blue", "teal"] },
  { n: 26, events: ["blue"] },
  { n: 27, events: ["teal"], today: true },
  { n: 28 },

  { n: 29 },
  { n: 30 },
  { n: 31, events: ["blue"] },
];

const EVENTS = [
  { title: "Tanka Meeting", time: "10:00 - 11:30AM", color: "#10b981" },
  { title: "Tanka Meeting", time: "10:00 - 11:30AM", color: "#10b981" },
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function CalendarPage() {
  return (
    <div className="h-screen w-screen flex bg-[#eef1f7] overflow-hidden" style={{ fontFamily: FONT }}>
      <OrgRail />
      <Menu />
      <div className="flex-1 min-w-0 h-full flex flex-col bg-[#f7f8fc]">
        {/* Header */}
        <header className="h-[60px] shrink-0 flex items-center px-6 border-b border-[#e7ebf8] gap-4">
          <h1 className="text-[18px] font-semibold text-[#020617]">Calendar</h1>
          <div className="flex-1 max-w-[640px] mx-auto">
            <div className="h-9 rounded-full bg-white border border-[#e7ebf8] flex items-center gap-2 px-4">
              <Search size={14} className="text-[#8793ab]" strokeWidth={1.8} />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent outline-none text-[13px] text-[#020617] placeholder:text-[#8793ab]"
              />
            </div>
          </div>
          <button type="button" className="bg-[#020617] text-white text-[14px] font-medium px-4 h-9 rounded-full flex items-center gap-1.5 hover:bg-[#0f294d]">
            <Plus size={14} strokeWidth={2.2} />
            Create
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-8 py-8">
          {/* Month grid card */}
          <div className="bg-white rounded-[16px] border border-[#e7ebf8] p-6 max-w-[920px] mx-auto">
            {/* Toolbar */}
            <div className="flex items-center mb-5">
              <button type="button" className="flex items-center gap-1 text-[13px] text-[#455871] hover:text-[#020617] px-2 h-8 rounded-md">
                All
                <ChevronDown size={12} strokeWidth={1.8} />
              </button>
              <div className="flex items-center gap-2 ml-4">
                <button type="button" className="w-7 h-7 rounded-md text-[#455871] hover:bg-[#f7f8fc] flex items-center justify-center" aria-label="Previous year"><ChevronsLeft size={14} /></button>
                <button type="button" className="w-7 h-7 rounded-md text-[#455871] hover:bg-[#f7f8fc] flex items-center justify-center" aria-label="Previous month"><ChevronLeft size={14} /></button>
              </div>
              <h2 className="flex-1 text-center text-[18px] font-semibold text-[#020617]">Dec 2024</h2>
              <div className="flex items-center gap-2 mr-4">
                <button type="button" className="w-7 h-7 rounded-md text-[#455871] hover:bg-[#f7f8fc] flex items-center justify-center" aria-label="Next month"><ChevronRight size={14} /></button>
                <button type="button" className="w-7 h-7 rounded-md text-[#455871] hover:bg-[#f7f8fc] flex items-center justify-center" aria-label="Next year"><ChevronsRight size={14} /></button>
              </div>
              <button type="button" className="px-3 h-8 rounded-full text-[13px] text-[#455871] hover:text-[#020617] bg-[#f7f8fc] hover:bg-[#eef1f7]">
                Today
              </button>
            </div>

            {/* Weekday header */}
            <div className="grid grid-cols-7 mb-2">
              {WEEKDAYS.map((d, i) => (
                <div key={i} className="text-center text-[11px] uppercase tracking-[0.04em] text-[#8793ab] font-medium">
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-y-2">
              {DAYS.map((d, i) => <CalDay key={i} day={d} />)}
            </div>
          </div>

          {/* Events list */}
          <div className="max-w-[920px] mx-auto mt-6 flex flex-col gap-3">
            {EVENTS.map((e, i) => (
              <div key={i} className="bg-white rounded-[12px] border border-[#e7ebf8] flex items-center px-5 py-4">
                <span className="w-[3px] h-8 rounded-full mr-4" style={{ background: e.color }} />
                <span className="text-[14px] text-[#020617] font-medium flex-1">{e.title}</span>
                <span className="text-[12px] text-[#8793ab]">{e.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CalDay({ day }: { day: Day }) {
  if (day.n === null) return <div />;
  return (
    <div className="flex flex-col items-center gap-1.5 py-2.5">
      <span
        className={`w-9 h-9 inline-flex items-center justify-center rounded-full text-[14px] tabular-nums ${
          day.today
            ? "bg-[#020617] text-white font-semibold"
            : "text-[#455871]"
        }`}
      >
        {day.n}
      </span>
      <div className="flex items-center gap-0.5 h-1">
        {(day.events || []).map((c, i) => (
          <span
            key={i}
            className="block w-2 h-1 rounded-full"
            style={{
              background:
                c === "blue" ? "#3b82f6" :
                c === "green" ? "#22c55e" :
                c === "teal" ? "#14b8a6" :
                "#6366f1",
            }}
          />
        ))}
      </div>
    </div>
  );
}
