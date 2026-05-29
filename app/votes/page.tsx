"use client";

/**
 * Votes page — list of votes grouped by date, with tabs and filter chips.
 */

import { useState } from "react";
import {
  ChevronDown, Download, Plus, X, CheckCircle2,
} from "lucide-react";
import OrgRail from "../chat/_components/OrgRail";
import Menu from "../chat/_components/Menu";

const FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

type Vote = {
  initiator: string;
  body: string[];
  voted?: { total: number; of: number; up: number; down: number };
  verification?: string;
  state: "completed" | "ongoing";
  time: string;
};

type Group = { date: string; votes: Vote[] };

const GROUPS: Group[] = [
  {
    date: "TODAY",
    votes: [
      {
        initiator: "Liam Scott",
        body: ["Liam Scott: text", "Liam Scott: [Audio] 5:00", "Liam Scott: [Contact Card] Cameron Williamson..."],
        voted: { total: 20, of: 20, up: 9, down: 6 },
        verification: "Agree let's go, move forward",
        state: "completed",
        time: "9:00 AM",
      },
    ],
  },
  {
    date: "2025/5/26",
    votes: [
      {
        initiator: "Liam Scott",
        body: ["Liam Scott: text", "Liam Scott: [Audio] 5:00", "Liam Scott: [Contact Card] Cameron Williamson..."],
        verification: "Agree let's go, move forward",
        state: "completed",
        time: "9:00 AM",
      },
      {
        initiator: "Liam Scott",
        body: ["Liam Scott: text", "Liam Scott: [Audio] 5:00", "Liam Scott: [Contact Card] Cameron Williamson..."],
        verification: undefined,
        state: "ongoing",
        time: "9:00 AM",
      },
    ],
  },
];

export default function VotesPage() {
  const [tab, setTab] = useState<"ongoing" | "verified" | "expired">("verified");
  return (
    <div className="h-screen w-screen flex bg-[#eef1f7] overflow-hidden" style={{ fontFamily: FONT }}>
      <OrgRail />
      <Menu />
      <div className="flex-1 min-w-0 h-full flex flex-col bg-[#f7f8fc]">
        {/* Header */}
        <header className="h-[60px] shrink-0 flex items-center px-6 border-b border-[#e7ebf8] gap-4">
          <h1 className="text-[18px] font-semibold text-[#020617]">Votes</h1>
          <div className="flex-1 max-w-[640px] mx-auto">
            <div className="h-9 rounded-full bg-white border border-[#e7ebf8] flex items-center gap-2 px-4">
              <span className="w-3.5 h-3.5 text-[#8793ab]">🔍</span>
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent outline-none text-[13px] text-[#020617] placeholder:text-[#8793ab]"
              />
            </div>
          </div>
          <button type="button" className="px-3 h-9 text-[13px] text-[#455871] hover:text-[#020617] flex items-center gap-1.5 bg-white border border-[#e7ebf8] rounded-full">
            <Download size={14} strokeWidth={1.8} />
            Export
          </button>
          <button type="button" className="bg-[#020617] text-white text-[14px] font-medium px-4 h-9 rounded-full flex items-center gap-1.5 hover:bg-[#0f294d]">
            <Plus size={14} strokeWidth={2.2} />
            Create
          </button>
        </header>

        {/* Tabs */}
        <div className="px-8 pt-6 shrink-0">
          <div className="border-b border-[#e7ebf8] flex items-center gap-8">
            <Tab label="Ongoing (120)" active={tab === "ongoing"} onClick={() => setTab("ongoing")} />
            <Tab label="Verified (20)" active={tab === "verified"} onClick={() => setTab("verified")} />
            <Tab label="Expired (20)" active={tab === "expired"} onClick={() => setTab("expired")} />
          </div>

          {/* Filter row */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <FilterChip label="2026-05-13 - 2026-06-15" />
            <FilterChip label="State" />
            <FilterChip label="Shared in" />
            <FilterChip label="Initiated by" />
            <FilterChip label="Verified by" />
            <FilterChip label="Vot..." />
            <button type="button" className="px-3 h-7 text-[13px] text-[#8793ab] hover:text-[#020617] flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full border border-[#8793ab] flex items-center justify-center"><X size={9} strokeWidth={2.2} /></span>
              Reset
            </button>
          </div>
        </div>

        {/* Vote list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-8 py-6">
          {GROUPS.map((g) => (
            <div key={g.date} className="mb-6">
              <h2 className="text-[11px] font-medium tracking-[0.04em] text-[#8793ab] mb-3">{g.date}</h2>
              <div className="flex flex-col gap-3">
                {g.votes.map((v, i) => <VoteCard key={i} vote={v} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pb-3 text-[15px] font-medium relative ${active ? "text-[#020617]" : "text-[#8793ab]"}`}
    >
      {label}
      {active && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#020617] rounded-full" />}
    </button>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <button type="button" className="px-3 h-7 rounded-full bg-white border border-[#e7ebf8] text-[12px] text-[#455871] flex items-center gap-1 hover:border-[#8793ab]">
      <span>{label}</span>
      <ChevronDown size={11} strokeWidth={2} className="text-[#8793ab]" />
    </button>
  );
}

function VoteCard({ vote }: { vote: Vote }) {
  return (
    <div className="bg-white rounded-[12px] border border-[#e7ebf8] p-5">
      {/* Initiator */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#fcd34d] to-[#f59e0b] inline-flex items-center justify-center shrink-0" />
        <span className="text-[14px] font-medium text-[#020617]">{vote.initiator}</span>
      </div>

      {/* Body */}
      <div className="ml-9 pl-3 border-l-2 border-[#e7ebf8] text-[13px] text-[#8793ab] leading-[1.7]">
        {vote.body.map((b, i) => <p key={i}>{b}</p>)}
      </div>

      {/* Vote tallies */}
      {vote.voted && (
        <div className="mt-4 ml-9">
          <div className="flex items-center gap-1.5 text-[12px] text-[#8793ab] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8793ab]" />
            {vote.voted.of} of {vote.voted.total} voted
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[14px]">👍 Upvote</span>
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#fcd34d] to-[#f59e0b] ring-2 ring-white" />
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] ring-2 ring-white" />
                  <span className="w-5 h-5 rounded-full bg-[#cbd5e1] text-[10px] text-[#475569] ring-2 ring-white flex items-center justify-center">…</span>
                </div>
                <span className="text-[14px] font-medium text-[#020617] tabular-nums w-4">{vote.voted.up}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px]">👎 Downvote</span>
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#fda4af] to-[#e11d48] ring-2 ring-white" />
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7dd3fc] to-[#0284c7] ring-2 ring-white" />
                  <span className="w-5 h-5 rounded-full bg-[#cbd5e1] text-[10px] text-[#475569] ring-2 ring-white flex items-center justify-center">…</span>
                </div>
                <span className="text-[14px] font-medium text-[#020617] tabular-nums w-4">{vote.voted.down}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification */}
      {vote.verification && (
        <div className="mt-4 ml-9">
          <div className="flex items-center gap-1.5 text-[12px] text-[#8793ab] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8793ab]" />
            Verification
          </div>
          <div className="flex items-center justify-between pl-3 border-l-2 border-[#e7ebf8]">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[12px] font-medium bg-[#dcfce7] text-[#16a34a]">Agree</span>
              <span className="text-[14px] text-[#020617]">{vote.verification}</span>
            </div>
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#fda4af] to-[#e11d48] shrink-0" />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-[#e7ebf8] flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#fcd34d] to-[#f59e0b]" />
        <span className="text-[12px] text-[#8793ab]">Tanka Product Tanka</span>
        <span className="ml-auto flex items-center gap-1.5 text-[12px] text-[#8793ab]">
          <CheckCircle2 size={12} strokeWidth={1.8} className="text-[#16a34a]" />
          Vote
          <span className="text-[#020617]">Completed</span>
        </span>
        <span className="text-[12px] text-[#8793ab]">{vote.time}</span>
      </div>
    </div>
  );
}
