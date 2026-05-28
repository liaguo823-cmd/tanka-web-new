"use client";

/**
 * Memos page — three columns: chrome / notebook list / memo list,
 * with title bar at top and a search + "New Memo" affordance.
 */

import { useState } from "react";
import {
  Search, Plus, MoreHorizontal, Home, Users2, Mic, ChevronDown, ChevronRight,
  BookOpen, Briefcase, Pin, Lock, Star, Share2, Trash2,
} from "lucide-react";
import OrgRail from "../chat/_components/OrgRail";
import Menu from "../chat/_components/Menu";

const FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

type Folder = { id: string; label: string; icon: React.ReactNode; count?: number };

const FOLDERS: Folder[] = [
  { id: "home", label: "Home", icon: <Home size={16} strokeWidth={1.8} /> },
  { id: "shared", label: "Shared with You", icon: <Users2 size={16} strokeWidth={1.8} />, count: 12 },
  { id: "meeting", label: "Meeting", icon: <Mic size={16} strokeWidth={1.8} />, count: 2 },
  { id: "collab", label: "Collaboration", icon: <Users2 size={16} strokeWidth={1.8} />, count: 2 },
  { id: "wiki", label: "wiki", icon: <BookOpen size={16} strokeWidth={1.8} />, count: 2 },
];

const NOTEBOOKS: Folder[] = [
  { id: "audio", label: "Audio", icon: <Mic size={16} strokeWidth={1.8} />, count: 1 },
  { id: "arena", label: "Arena", icon: <Star size={16} strokeWidth={1.8} />, count: 2 },
  { id: "work", label: "Work", icon: <Briefcase size={16} strokeWidth={1.8} />, count: 2 },
];

type Memo = {
  title: string;
  body: string;
  tags: string[];
  date: string;
  badge?: "pinned" | "shared" | "lock-star";
  thumb?: "phone" | "closet" | "studio";
  internet?: boolean;
};

const MEMOS: Memo[] = [
  {
    title: "Travel opens our eyes to the wonders of the world, inviting us become storytellers of …",
    body: "Memo is a very unique product. It can record your inspirations and very unique product. It can record yourMemo is a very unique product. It can record your inspirations and very unique product. It can record",
    tags: ["Work", "Adam Thompson"],
    date: "3/20/2023",
    badge: "pinned",
    thumb: "phone",
  },
  {
    title: "Changes to Tanka updated version",
    body: "Greetings to all, we would like to inform you of some notable changes with the recent Tanka updated version. Modifications on your Tanka profile page:Name Editing: With the Tanka updated version, the option to edit names will no longer be available.",
    tags: ["Work", "Adam Thompson"],
    date: "3/20/2023",
    badge: "lock-star",
    internet: true,
  },
  {
    title: "Changes to Tanka updated version",
    body: "Greetings to all, we would like to inform you of some notable changes with the recent Tanka updated version. Modifications on your Tanka profile page:Name Editing: With the Tanka updated version, the option to edit names will no…",
    tags: ["From Internet", "Inspiration", "Record"],
    date: "3/20/2023",
    badge: "shared",
    thumb: "studio",
  },
  {
    title: "Travel opens our eyes to the wonders of the world, inviting us become storytellers of …",
    body: "Greetings to all, we would like to inform you of some notable changes with the recent Tanka updated version. Modifications on your Tanka profile page:Name Editing: With the Tanka updated version, the option to edit names will no…",
    tags: [],
    date: "3/20/2023",
    thumb: "closet",
  },
  {
    title: "Travel opens our eyes to the wonders of the world, inviting us become storytellers of …",
    body: "Greetings to all, we would like to inform you of some notable changes with the recent Tanka updated version. Modifications on your Tanka profile page:Name Editing: With the Tanka updated version, the option to edit names will no longer be available.",
    tags: [],
    date: "3/20/2023",
    badge: "shared",
  },
  {
    title: "Changes to Tanka updated version",
    body: "Greetings to all, we would like to inform you of some notable changes with the recent Tanka updated version. Modifications on your Tanka profile page:Name Editing: With the Tanka updated version, the option to edit names will no…",
    tags: ["Inspiration", "Record"],
    date: "3/20/2023",
    thumb: "studio",
  },
];

export default function MemosPage() {
  const [activeFolder, setActiveFolder] = useState("home");
  const [tab, setTab] = useState<"created" | "recent" | "favorites">("created");
  return (
    <div className="h-screen w-screen flex bg-[#eef1f7] overflow-hidden" style={{ fontFamily: FONT }}>
      <OrgRail />
      <Menu />
      <div className="flex-1 min-w-0 h-full flex flex-col bg-[#f7f8fc]">
        {/* Header */}
        <header className="h-[72px] shrink-0 flex items-center px-6 border-b border-[#e7ebf8] gap-4">
          <h1 className="text-[18px] font-semibold text-[#020617]">Memos</h1>
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
          <button
            type="button"
            className="bg-[#020617] text-white text-[14px] font-medium px-4 h-9 rounded-full flex items-center gap-1.5 hover:bg-[#0f294d]"
          >
            <Plus size={14} strokeWidth={2.2} />
            New Memo
          </button>
        </header>

        {/* Body: folder column + memo list */}
        <div className="flex-1 min-h-0 flex">
          {/* Folder column */}
          <aside className="w-[260px] shrink-0 h-full border-r border-[#e7ebf8] bg-[#f7f8fc] flex flex-col">
            <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pt-4 pb-2 flex flex-col gap-0.5">
              {FOLDERS.map((f) => (
                <FolderRow key={f.id} folder={f} active={activeFolder === f.id} onClick={() => setActiveFolder(f.id)} />
              ))}
              <div className="flex items-center justify-between px-3 mt-4 mb-1">
                <button type="button" className="flex items-center gap-1 text-[13px] text-[#455871]">
                  Notebook
                  <ChevronDown size={12} strokeWidth={1.8} />
                </button>
                <button type="button" className="w-5 h-5 rounded-md text-[#8793ab] hover:bg-[#f7f8fc] flex items-center justify-center" aria-label="Add notebook">
                  <Plus size={12} strokeWidth={1.8} />
                </button>
              </div>
              {NOTEBOOKS.map((f) => (
                <FolderRow key={f.id} folder={f} active={activeFolder === f.id} onClick={() => setActiveFolder(f.id)} />
              ))}
            </div>
            <div className="border-t border-[#e7ebf8] px-3 py-3">
              <button type="button" className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] text-[#455871] hover:bg-[#f7f8fc]">
                <Trash2 size={16} strokeWidth={1.8} />
                Trash
              </button>
            </div>
          </aside>

          {/* Memo list */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="px-6 pt-5 shrink-0">
              <div className="border-b border-[#e7ebf8] flex items-center gap-8">
                <TabButton active={tab === "created"} onClick={() => setTab("created")} label="Created by you (120)" />
                <TabButton active={tab === "recent"} onClick={() => setTab("recent")} label="Recent (20)" />
                <TabButton active={tab === "favorites"} onClick={() => setTab("favorites")} label="Favorites (20)" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4 flex flex-col gap-3">
              {MEMOS.map((m, i) => (
                <MemoCard key={i} memo={m} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FolderRow({ folder, active, onClick }: { folder: Folder; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[14px] transition-colors ${
        active ? "bg-[#eef1f7] text-[#020617] font-medium" : "text-[#455871] hover:bg-[#f7f8fc]"
      }`}
    >
      <span className="shrink-0">{folder.icon}</span>
      <span className="flex-1 text-left">{folder.label}</span>
      {folder.count !== undefined && (
        <span className="text-[12px] text-[#8793ab]">{folder.count}</span>
      )}
    </button>
  );
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pb-3 text-[15px] font-medium relative ${
        active ? "text-[#020617]" : "text-[#8793ab]"
      }`}
    >
      {label}
      {active && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#020617] rounded-full" />}
    </button>
  );
}

function MemoCard({ memo }: { memo: Memo }) {
  return (
    <div className="bg-white rounded-[12px] border border-[#e7ebf8] hover:shadow-[0_4px_12px_rgba(15,41,77,0.04)] transition-shadow p-4">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <h3 className="flex-1 text-[14px] font-semibold text-[#020617] line-clamp-1">
              {memo.title}
            </h3>
            <MemoBadge kind={memo.badge} />
          </div>
          <p className="mt-1 text-[13px] text-[#8793ab] leading-[1.5] line-clamp-3">
            {memo.body}
          </p>
          <div className="mt-2 flex items-center gap-3 flex-wrap text-[12px] text-[#8793ab]">
            {memo.tags.map((t, i) =>
              t === "From Internet" ? (
                <span key={i} className="px-2 py-0.5 rounded-full bg-[rgba(0,109,255,0.08)] text-[#006dff]">🌐 From Internet</span>
              ) : t === "Inspiration" || t === "Record" ? (
                <span key={i} className="px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a]">{t}</span>
              ) : t === "Work" ? (
                <span key={i} className="flex items-center gap-1">📁 {t}</span>
              ) : (
                <span key={i} className="flex items-center gap-1">👤 {t}</span>
              )
            )}
          </div>
        </div>
        {memo.thumb && <MemoThumb kind={memo.thumb} />}
        <div className="flex flex-col items-end gap-3 shrink-0 min-w-[80px]">
          <span className="text-[12px] text-[#8793ab]">{memo.date}</span>
          <button type="button" className="w-6 h-6 text-[#8793ab] hover:text-[#020617] flex items-center justify-center" aria-label="More">
            <MoreHorizontal size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MemoBadge({ kind }: { kind?: Memo["badge"] }) {
  if (!kind) return null;
  if (kind === "pinned") {
    return <Pin size={14} strokeWidth={1.8} className="text-[#006dff] shrink-0" fill="currentColor" />;
  }
  if (kind === "shared") {
    return <Share2 size={14} strokeWidth={1.8} className="text-[#8793ab] shrink-0" />;
  }
  return (
    <div className="flex items-center gap-1 shrink-0">
      <Star size={14} strokeWidth={1.8} className="text-[#fbbf24]" fill="currentColor" />
      <Lock size={14} strokeWidth={1.8} className="text-[#8793ab]" />
    </div>
  );
}

function MemoThumb({ kind }: { kind: NonNullable<Memo["thumb"]> }) {
  const gradient = (() => {
    switch (kind) {
      case "phone":
        return "linear-gradient(135deg,#7dd3fc,#c4b5fd)";
      case "closet":
        return "linear-gradient(135deg,#bfdbfe,#1e40af)";
      case "studio":
        return "linear-gradient(135deg,#cbd5e1,#475569)";
    }
  })();
  return (
    <div
      className="w-[60px] h-[60px] rounded-[8px] shrink-0 flex items-center justify-center text-white text-[10px] font-medium"
      style={{ background: gradient }}
    >
      {kind === "phone" ? "📱" : kind === "closet" ? "Closet" : "🎙"}
    </div>
  );
}
