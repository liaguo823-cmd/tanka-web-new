"use client";

/**
 * Four "create new …" modals invoked from the Menu sidebar's hover-`+`
 * buttons (Memos / Follow-ups / Votes / Calendar). Each renders a
 * full-screen overlay with a centered card and form fields per the
 * latest Figma design.
 */

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Maximize2,
  PictureInPicture2,
  ChevronDown,
  ChevronRight,
  Edit3,
  Plus,
  Flag,
  Circle,
} from "lucide-react";

export type PlusModalKind = "memo" | "follow-up" | "vote" | "calendar";

const SHELL_FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

/* ----------------------------------------------------------------- */
/*  Shared overlay shell                                              */
/* ----------------------------------------------------------------- */

function ModalShell({
  open,
  onClose,
  width = 640,
  children,
}: {
  open: boolean;
  onClose: () => void;
  width?: number;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-[2px] flex items-center justify-center"
      style={{ fontFamily: SHELL_FONT }}
      onMouseDown={onClose}
    >
      <div
        className="bg-white rounded-[16px] shadow-[0_24px_60px_rgba(15,41,77,0.18)] flex flex-col max-h-[85vh] overflow-hidden"
        style={{ width }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

function ModalHeader({
  title,
  onClose,
  rightActions,
}: {
  title: string;
  onClose: () => void;
  rightActions?: ReactNode;
}) {
  return (
    <div className="h-[60px] shrink-0 flex items-center justify-between px-6">
      <h2 className="text-[18px] font-semibold text-[#020617]">{title}</h2>
      <div className="flex items-center gap-2">
        {rightActions}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-7 h-7 flex items-center justify-center text-[#8793ab] hover:text-[#020617] hover:bg-[#f5f5f7] rounded-md transition-colors"
        >
          <X size={18} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

function PrimaryCreateButton({
  enabled,
  label = "Create",
}: {
  enabled?: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      disabled={!enabled}
      className={`flex items-center gap-1.5 px-5 h-9 rounded-full text-[14px] font-medium transition-colors ${
        enabled
          ? "bg-[#006dff] text-white hover:bg-[#0058d3]"
          : "bg-[#f1f3f7] text-[#8793ab] cursor-not-allowed"
      }`}
    >
      <Plus size={14} strokeWidth={2.4} />
      {label}
    </button>
  );
}

/* ----------------------------------------------------------------- */
/*  1. Calendar — "New event"                                         */
/* ----------------------------------------------------------------- */

export function CalendarModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [allDay, setAllDay] = useState(false);
  const valid = title.trim().length > 0;
  return (
    <ModalShell open={open} onClose={onClose} width={620}>
      <ModalHeader title="New" onClose={onClose} />
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <FieldTextarea
          value={title}
          onChange={setTitle}
          placeholder="Start writing…"
          maxLength={250}
          minHeight={140}
        />

        <Row label="All-day">
          <Toggle on={allDay} onChange={setAllDay} />
        </Row>

        <Row label="Starts">
          <div className="flex items-center gap-3">
            <DateTimePiece value="05/28/2026" />
            <span className="text-[#d0dae8]">|</span>
            <DateTimePiece value="11:30" />
          </div>
        </Row>

        <Row label="Ends">
          <div className="flex items-center gap-3">
            <DateTimePiece value="05/28/2026" />
            <span className="text-[#d0dae8]">|</span>
            <DateTimePiece value="12:00" />
          </div>
        </Row>

        <Row label="Repeat">
          <button
            type="button"
            className="flex items-center gap-1 text-[14px] text-[#8793ab] hover:text-[#020617]"
          >
            Never
            <ChevronDown size={14} strokeWidth={1.8} />
          </button>
        </Row>

        <div className="mt-4">
          <FieldTextarea
            placeholder="Location or Meeting Links"
            maxLength={250}
            minHeight={120}
          />
        </div>

        <div className="mt-3">
          <FieldTextarea
            placeholder="Add additional description for this event"
            maxLength={1000}
            minHeight={120}
          />
        </div>
      </div>
      <div className="px-6 py-3 flex items-center justify-end">
        <PrimaryCreateButton enabled={valid} />
      </div>
    </ModalShell>
  );
}

/* ----------------------------------------------------------------- */
/*  2. Memos — "Untitled Memo"                                        */
/* ----------------------------------------------------------------- */

export function MemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <ModalShell open={open} onClose={onClose} width={920}>
      <ModalHeader
        title="Memos"
        onClose={onClose}
        rightActions={
          <>
            <button
              type="button"
              aria-label="Expand"
              className="w-7 h-7 flex items-center justify-center text-[#8793ab] hover:text-[#020617] hover:bg-[#f5f5f7] rounded-md"
            >
              <Maximize2 size={16} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              aria-label="Pop out"
              className="w-7 h-7 flex items-center justify-center text-[#8793ab] hover:text-[#020617] hover:bg-[#f5f5f7] rounded-md"
            >
              <PictureInPicture2 size={16} strokeWidth={1.8} />
            </button>
          </>
        }
      />
      <div className="flex-1 overflow-y-auto px-10 pt-4 pb-10 min-h-[520px]">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 h-7 text-[13px] font-medium text-[#006dff] border border-[rgba(0,109,255,0.3)] rounded-full hover:bg-[rgba(0,109,255,0.05)]"
        >
          <Edit3 size={12} strokeWidth={1.8} />
          Manage Labels
        </button>
        <h1 className="mt-4 text-[36px] font-semibold text-[#cbd5e1] leading-[1.1] tracking-tight">
          Untitled Memo
        </h1>
        <p className="mt-3 text-[12px] text-[#8793ab]">
          Creator You <span className="text-[#d0dae8] mx-1">|</span> Updated Today 11:10 by You
        </p>
        <div className="mt-8 text-[15px] text-[#8793ab]">
          <span className="border-l-2 border-[#006dff] pl-2 -ml-2">Start writing…</span>
        </div>
      </div>
    </ModalShell>
  );
}

/* ----------------------------------------------------------------- */
/*  3. Votes — "Vote"                                                 */
/* ----------------------------------------------------------------- */

export function VoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [content, setContent] = useState("");
  const [execute, setExecute] = useState(false);
  return (
    <ModalShell open={open} onClose={onClose} width={620}>
      <ModalHeader title="Vote" onClose={onClose} />
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <FieldTextarea
          value={content}
          onChange={setContent}
          placeholder="Type your vote content"
          maxLength={5000}
          minHeight={150}
        />

        <RowAdd label="Files" />
        <RowAdd label="Pictures" />

        <div className="mt-4 border-t border-[#e7ebf8] pt-4">
          <p className="text-[13px] text-[#8793ab]">
            Please invite one person to verify to create a Vote.
          </p>
        </div>

        <RowDisclose label={<>Invite to Vote <span className="text-[#8793ab]">(optional)</span></>} />
        <RowDisclose label="Invite to Verify" />

        <button
          type="button"
          onClick={() => setExecute((v) => !v)}
          className="mt-2 flex items-center gap-2 py-3 text-[15px] text-[#020617]"
        >
          {execute ? (
            <span className="w-4 h-4 rounded-full bg-[#006dff] flex items-center justify-center">
              <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2,6 5,9 10,3" />
              </svg>
            </span>
          ) : (
            <Circle size={16} strokeWidth={1.8} className="text-[#cbd5e1]" />
          )}
          Invite to Execute
        </button>
      </div>
      <div className="px-6 py-3 flex items-center justify-end">
        <button
          type="button"
          disabled={!content.trim()}
          className={`px-6 h-9 rounded-full text-[14px] font-medium transition-colors ${
            content.trim()
              ? "bg-[#006dff] text-white hover:bg-[#0058d3]"
              : "bg-[#f1f3f7] text-[#8793ab] cursor-not-allowed"
          }`}
        >
          Create
        </button>
      </div>
    </ModalShell>
  );
}

/* ----------------------------------------------------------------- */
/*  4. Follow-ups — "New follow-up"                                   */
/* ----------------------------------------------------------------- */

export function FollowUpModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [content, setContent] = useState("");
  return (
    <ModalShell open={open} onClose={onClose} width={620}>
      <ModalHeader title="New" onClose={onClose} />
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <FieldTextarea
          value={content}
          onChange={setContent}
          placeholder="Enter follow-up"
          maxLength={250}
          minHeight={140}
        />

        <RowDisclose label={<>Assigned to <span className="text-[#8793ab]">(optional)</span></>} />

        <Row label="Follow-up Level">
          <button type="button" className="flex items-center gap-1 text-[14px] text-[#455871] hover:text-[#020617]">
            <Flag size={16} strokeWidth={1.8} className="text-[#7dd3fc]" fill="#7dd3fc" />
            <ChevronDown size={14} strokeWidth={1.8} className="text-[#8793ab]" />
          </button>
        </Row>

        <Row label="Remind at">
          <button type="button" className="flex items-center gap-1 text-[14px] text-[#8793ab] hover:text-[#020617]">
            No reminder
            <ChevronDown size={14} strokeWidth={1.8} />
          </button>
        </Row>

        <Row label="Categorize">
          <button type="button" className="flex items-center text-[#8793ab] hover:text-[#020617]">
            <ChevronDown size={16} strokeWidth={1.8} />
          </button>
        </Row>
      </div>
      <div className="px-6 py-3 flex items-center justify-end">
        <PrimaryCreateButton enabled={content.trim().length > 0} />
      </div>
    </ModalShell>
  );
}

/* ----------------------------------------------------------------- */
/*  Building blocks                                                   */
/* ----------------------------------------------------------------- */

function FieldTextarea({
  value,
  onChange,
  placeholder,
  maxLength,
  minHeight = 100,
}: {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  maxLength: number;
  minHeight?: number;
}) {
  const [internal, setInternal] = useState("");
  const v = value ?? internal;
  const set = onChange ?? setInternal;
  return (
    <div className="relative">
      <textarea
        value={v}
        onChange={(e) => set(e.target.value.slice(0, maxLength))}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-4 pb-7 rounded-[12px] bg-[#f7f8fc] border border-[#e7ebf8] text-[15px] text-[#020617] placeholder:text-[#8793ab] resize-none outline-none focus:border-[#006dff] transition-colors"
        style={{ minHeight }}
      />
      <span className="absolute bottom-3 right-4 text-[12px] text-[#8793ab]">
        {v.length}/{maxLength}
      </span>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#f1f3f7] last:border-b-0 first:border-t-0">
      <span className="text-[15px] text-[#020617]">{label}</span>
      <div>{children}</div>
    </div>
  );
}

function RowAdd({ label }: { label: string }) {
  return (
    <Row label={label}>
      <button type="button" className="text-[14px] text-[#006dff] font-medium hover:text-[#0058d3]">
        Add
      </button>
    </Row>
  );
}

function RowDisclose({ label }: { label: ReactNode }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-between py-3 border-b border-[#f1f3f7] last:border-b-0 hover:bg-[#fafbff] -mx-2 px-2 rounded-md"
    >
      <span className="text-[15px] text-[#020617]">{label}</span>
      <ChevronRight size={16} strokeWidth={1.8} className="text-[#8793ab]" />
    </button>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      aria-pressed={on}
      className={`relative w-[40px] h-[22px] rounded-full transition-colors ${
        on ? "bg-[#006dff]" : "bg-[#e7ebf8]"
      }`}
    >
      <span
        className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform ${
          on ? "translate-x-[20px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}

function DateTimePiece({ value }: { value: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 text-[14px] text-[#020617] hover:text-[#006dff]"
    >
      {value}
      <ChevronDown size={14} strokeWidth={1.8} className="text-[#8793ab]" />
    </button>
  );
}
