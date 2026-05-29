"use client";

/**
 * SOP page — library of standard operating procedures, organized into
 * Featured / Organization / Mine tabs with colorful cards.
 */

import { useState } from "react";
import { Search, Brain, FlaskConical, Telescope, Bot, Lightbulb } from "lucide-react";
import OrgRail from "../chat/_components/OrgRail";
import Menu from "../chat/_components/Menu";

const FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

type Card = {
  title: string;
  blurb: string;
  author: string;
  icon: React.ReactNode;
  bg: string;
};

const CARDS: Card[] = [
  {
    title: "Customer Feedback Loop",
    blurb: "From requirements gathering to priority assessment, ensuring clear",
    author: "Created by Lily",
    icon: <Brain size={22} strokeWidth={1.6} />,
    bg: "#fce7f0",
  },
  {
    title: "Customer Feedback Loop",
    blurb: "From requirements gathering to priority assessment, ensuring clear",
    author: "Created by Lily",
    icon: <FlaskConical size={22} strokeWidth={1.6} />,
    bg: "#fef0e2",
  },
  {
    title: "AI Feature Requirements Review",
    blurb: "From requirements gathering to priority assessment, ensuring clear",
    author: "Created by Lily",
    icon: <Telescope size={22} strokeWidth={1.6} />,
    bg: "#d6f1e0",
  },
  {
    title: "Customer Feedback Loop",
    blurb: "From requirements gathering to priority assessment, ensuring clear",
    author: "Created by Lily",
    icon: <Bot size={22} strokeWidth={1.6} />,
    bg: "#e0e8f6",
  },
  {
    title: "Customer Feedback Loop",
    blurb: "From requirements gathering to priority assessment, ensuring clear",
    author: "Created by Lily",
    icon: <Lightbulb size={22} strokeWidth={1.6} />,
    bg: "#e3e6e8",
  },
];

export default function SopPage() {
  const [tab, setTab] = useState<"featured" | "organization" | "mine">("organization");
  return (
    <div className="h-screen w-screen flex bg-[#eef1f7] overflow-hidden" style={{ fontFamily: FONT }}>
      <OrgRail />
      <Menu />
      <div className="flex-1 min-w-0 h-full flex flex-col bg-[#f7f8fc]">
        {/* Header */}
        <header className="h-[60px] shrink-0 flex items-center px-6 border-b border-[#e7ebf8] gap-4">
          <h1 className="text-[18px] font-semibold text-[#020617]">SOP Library</h1>
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
          <div className="w-[120px]" /> {/* spacer */}
        </header>

        {/* Tabs */}
        <div className="px-8 pt-6 shrink-0">
          <div className="border-b border-[#e7ebf8] flex items-center gap-8">
            <TabBtn label="Featured (20)" active={tab === "featured"} onClick={() => setTab("featured")} />
            <TabBtn label="Organization (30)" active={tab === "organization"} onClick={() => setTab("organization")} />
            <TabBtn label="Mine (20)" active={tab === "mine"} onClick={() => setTab("mine")} />
          </div>
        </div>

        {/* Card grid */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-8 py-6">
          <div className="grid grid-cols-2 gap-4 max-w-[1080px] mx-auto">
            {CARDS.map((c, i) => <SopCard key={i} card={c} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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

function SopCard({ card }: { card: Card }) {
  return (
    <button
      type="button"
      className="rounded-[16px] p-5 text-left hover:shadow-[0_6px_20px_rgba(15,41,77,0.08)] transition-shadow flex flex-col gap-12 min-h-[180px]"
      style={{ background: card.bg }}
    >
      <div className="w-10 h-10 rounded-[10px] bg-white flex items-center justify-center text-[#0f294d]">
        {card.icon}
      </div>
      <div>
        <h3 className="text-[16px] font-semibold text-[#020617] mb-1">{card.title}</h3>
        <p className="text-[13px] text-[#455871] leading-[1.5] mb-3">{card.blurb}</p>
        <p className="text-[11px] text-[#8793ab]">{card.author}</p>
      </div>
    </button>
  );
}
