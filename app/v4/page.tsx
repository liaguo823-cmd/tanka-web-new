"use client";

/**
 * Flow page — same chrome (Org rail + Menu) as /chat, with Flow as the
 * selected menu tab. Adds a Flow list column and a "Create a Detailed
 * Outline" detail view per the latest Figma design.
 */

import { useState } from "react";
import {
  ArrowLeft, Search, FolderPlus, Plus, Bookmark, MoreHorizontal,
  CheckCircle2, Sparkles, Zap, Pencil, ArrowUp,
} from "lucide-react";
import OrgRail from "../chat/_components/OrgRail";
import Menu from "../chat/_components/Menu";

type FlowItem = {
  name: string;
  status: string;
  indicator?: "dot" | "loading" | "circle" | "clock" | null;
  active?: boolean;
};

const FLOW_ITEMS: FlowItem[] = [
  { name: "核心流程体验优化", status: "需求已整理完成，等待负责人确认范围", indicator: "dot" },
  { name: "智能 Agent 场景设计", status: "初稿完成，等待你的反馈", indicator: "loading", active: true },
  { name: "AI 功能需求梳理", status: "方案已提交，进入设计评审", indicator: "circle" },
  { name: "Prompt 策略优化准化", status: "已上线测试，收集中", indicator: "clock" },
  { name: "MVP 功能验证", status: "需求已整理完成，等待负责人确认范围" },
  { name: "设计团队交付质量与评审体系", status: "新版已更新，等待效果验证" },
  { name: "任务协作流程标准化", status: "需求已整理完成，等待负责人确认范围" },
  { name: "设计团队交付质量与评审体系", status: "新版已更新，等待效果验证" },
  { name: "任务协作流程标准化", status: "需求已整理完成，等待负责人确认范围" },
];

const RECIPIENTS = ["李欣言", "刘嘉欣", "何裕", "张云熙", "张浩然", "李雨晴"];

const FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

export default function FlowPage() {
  return (
    <div
      className="h-screen w-screen flex bg-[#eef1f7] overflow-hidden"
      style={{ fontFamily: FONT }}
    >
      <OrgRail />
      <Menu />
      <FlowList />
      <FlowDetail />
    </div>
  );
}

/* ====================================================================== */
/*  FLOW LIST COLUMN — 280px                                              */
/* ====================================================================== */
function FlowList() {
  return (
    <div className="w-[376px] shrink-0 h-full bg-[#f7f8fc] flex flex-col border-r border-[#e7ebf8]">
      {/* Title bar */}
      <div className="h-[60px] shrink-0 flex items-center justify-between px-[15px] border-b border-[#e7ebf8]">
        <h2 className="text-[18px] font-semibold text-[#020617] leading-[22.4px]">
          Flow
        </h2>
        <div className="flex items-center gap-2">
          <button type="button" className="w-6 h-6 flex items-center justify-center text-[#455871] hover:text-[#020617]" aria-label="All assets">
            <FolderPlus size={18} strokeWidth={1.6} />
          </button>
          <button type="button" className="w-6 h-6 flex items-center justify-center text-[#455871] hover:text-[#020617]" aria-label="New flow">
            <Plus size={18} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-[15px] py-[10px] shrink-0">
        <div className="h-9 rounded-[8px] bg-white border border-[#e7ebf8] flex items-center gap-2 px-3">
          <Search size={14} className="text-[#8793ab]" strokeWidth={1.8} />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent outline-none text-[13px] text-[#020617] placeholder:text-[#8793ab]"
          />
        </div>
      </div>

      {/* All Flows header */}
      <div className="px-[15px] py-2 flex items-center justify-between shrink-0">
        <span className="text-[13px] font-medium text-[#455871]">All Flows</span>
        <button type="button" className="w-6 h-6 flex items-center justify-center text-[#8793ab] hover:text-[#455871]" aria-label="Sort">
          <svg viewBox="0 0 18 18" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 5h12M5 9h8M7 13h4"/>
          </svg>
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-[10px] pb-3 flex flex-col gap-1.5">
        {FLOW_ITEMS.map((item, i) => (
          <FlowListItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function FlowListItem({ item }: { item: FlowItem }) {
  const indicator = (() => {
    switch (item.indicator) {
      case "dot":
        return <span className="w-2 h-2 rounded-full bg-[#006dff] shrink-0" />;
      case "loading":
        return (
          <svg className="w-3 h-3 shrink-0 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#cce4ff" strokeWidth="2.5" />
            <path d="M12 3a9 9 0 0 1 9 9" stroke="#006dff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case "circle":
        return <span className="w-3 h-3 rounded-full border-[2px] border-[#cbd5e1] shrink-0" />;
      case "clock":
        return (
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#8793ab" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4l3 2" />
          </svg>
        );
      default:
        return null;
    }
  })();
  return (
    <button
      type="button"
      className={`w-full text-left rounded-[10px] px-3 py-2.5 transition-colors ${
        item.active ? "bg-white shadow-[0_1px_2px_rgba(15,41,77,0.06)]" : "hover:bg-white/60"
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-[#020617] truncate">
            {item.name}
          </p>
          <p className="mt-1 text-[11px] text-[#8793ab] leading-[1.4] line-clamp-2">
            {item.status}
          </p>
        </div>
        {indicator}
      </div>
    </button>
  );
}

/* ====================================================================== */
/*  FLOW DETAIL — flex-1                                                  */
/* ====================================================================== */
function FlowDetail() {
  const [draft, setDraft] = useState("");
  return (
    <div className="flex-1 min-w-0 h-full flex flex-col bg-[#f7f8fc]">
      {/* Header */}
      <header className="h-[60px] shrink-0 flex items-center px-6 border-b border-[#e7ebf8] bg-[#f7f8fc]">
        <button type="button" className="w-8 h-8 flex items-center justify-center text-[#455871] hover:text-[#020617] -ml-2" aria-label="Back">
          <ArrowLeft size={18} strokeWidth={1.8} />
        </button>
        <h1 className="ml-2 text-[16px] font-semibold text-[#020617]">
          Create a Detailed Outline
        </h1>
        <div className="ml-auto flex items-center gap-3">
          <button type="button" className="flex items-center gap-1.5 px-3 h-8 text-[13px] text-[#455871] hover:text-[#020617]">
            <CheckCircle2 size={14} strokeWidth={1.8} />
            <span>Compete</span>
          </button>
          <button type="button" className="flex items-center gap-1.5 px-3 h-8 text-[13px] text-[#455871] hover:text-[#020617]">
            <Zap size={14} strokeWidth={1.8} fill="currentColor" />
            <span>Progress</span>
          </button>
          <button type="button" className="w-8 h-8 flex items-center justify-center text-[#455871] hover:text-[#020617]" aria-label="Bookmark">
            <Bookmark size={16} strokeWidth={1.8} />
          </button>
          <button type="button" className="w-8 h-8 flex items-center justify-center text-[#455871] hover:text-[#020617]" aria-label="More">
            <MoreHorizontal size={18} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-[760px] mx-auto px-8 py-8 space-y-6 text-[14px] leading-[1.7] text-[#1f2937]">
          {/* Document content */}
          <p>your core value proposition.</p>
          <p>Let's start with one question:</p>
          <p>👉 What is the single most important problem your product must solve?</p>
          <p>
            To define the MVP clearly, we need to focus on the smallest set of features that can validate
            your core value proposition.
          </p>
          <p>Let's start with one question:</p>
          <p>👉 What is the single most important problem your product must solve?</p>

          {/* AI CHECK-IN callout */}
          <div className="rounded-[12px] bg-[#fff7e6] border border-[#ffe5b3] px-4 py-3 max-w-[480px]">
            <div className="flex items-center gap-2 mb-2 text-[#a16207] text-[11px] font-semibold tracking-wide uppercase">
              <Sparkles size={12} fill="currentColor" />
              <span>AI CHECK-IN</span>
            </div>
            <p className="text-[14px] text-[#7c5e10] leading-[1.6]">
              今天是 <span className="font-semibold">Lily Hill</span> 的最后工作日，但权限仍未关闭。需要我通知 Jack Wilson 去回收权限吗？
            </p>
          </div>

          {/* User message bubble */}
          <div className="flex justify-end">
            <div className="bg-[#cce4ff] rounded-[12px] rounded-tr-[2px] px-4 py-3 max-w-[520px] text-[14px] text-[#0f294d] leading-[1.6]">
              可以，帮我发送消息，让大家一起对齐一下，重点是自动化程度和风险控制。
            </div>
          </div>

          {/* AI response */}
          <p>好的，我来帮你创建。</p>
          <div className="flex items-center gap-2 text-[#8793ab] text-[13px]">
            <CheckCircle2 size={14} strokeWidth={2} className="text-[#10b981]" />
            <span>Analysis completed</span>
            <span className="text-[#8793ab]">›</span>
          </div>

          {/* Proposed Action card */}
          <div className="rounded-[14px] bg-[rgba(204,228,255,0.15)] border border-[rgba(0,109,255,0.15)] p-4 max-w-[600px]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-[8px] bg-[#006dff] flex items-center justify-center shrink-0 mt-0.5">
                <Zap size={18} fill="white" className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-[#8793ab] font-medium">
                  PROPOSED ACTION
                </p>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <h3 className="text-[16px] font-semibold text-[#020617]">Create Chat</h3>
                  <button type="button" className="w-7 h-7 flex items-center justify-center text-[#8793ab] hover:text-[#020617]" aria-label="Edit">
                    <Pencil size={13} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3 ml-12">
              <p className="text-[11px] uppercase tracking-wide text-[#8793ab] font-medium mb-1">
                You
              </p>
              <p className="text-[14px] text-[#0f294d] leading-[1.6]">
                我把 AI 自动总结接入 Flow 的方案整理了一版，发出来同步一下，大家可以看下是否有需要补充的地方。
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[12px] text-[#006dff]">
                <span>🔗</span>
                <span>2 assets form this Work</span>
              </div>

              {/* Recipients */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-[12px] text-[#8793ab]">Send to</span>
                {RECIPIENTS.map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 pl-0.5 pr-2 py-0.5 rounded-full bg-white border border-[#e7ebf8]"
                  >
                    <span
                      className="w-5 h-5 rounded-full text-white text-[9px] font-semibold flex items-center justify-center"
                      style={{
                        background: ["#fcd34d", "#a78bfa", "#10b981", "#0ea5e9", "#fb7185", "#f59e0b"][i % 6],
                      }}
                    >
                      {name.slice(0, 1)}
                    </span>
                    <span className="text-[12px] text-[#020617]">{name}</span>
                  </div>
                ))}
                <span className="text-[12px] text-[#8793ab] pl-1">+30</span>
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  className="w-full h-9 rounded-[8px] bg-white border border-[#e7ebf8] text-[14px] font-medium text-[#020617] hover:bg-[#f7f8fc]"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="text-center text-[13px] text-[#8793ab] hover:text-[#020617]"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="shrink-0 px-8 pb-6 pt-2">
        <div className="max-w-[760px] mx-auto">
          <div className="rounded-[14px] bg-white border border-[#e7ebf8] shadow-[0_2px_8px_rgba(15,41,77,0.04)]">
            <div className="px-4 pt-3 pb-2">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Describe the task..."
                className="w-full bg-transparent outline-none text-[14px] text-[#020617] placeholder:text-[#8793ab]"
              />
            </div>
            <div className="px-3 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button type="button" className="w-7 h-7 flex items-center justify-center text-[#8793ab] hover:text-[#020617]" aria-label="Add">
                  <Plus size={16} strokeWidth={1.8} />
                </button>
                <button type="button" className="w-7 h-7 flex items-center justify-center text-[#8793ab] hover:text-[#020617]" aria-label="AI">
                  <Sparkles size={14} strokeWidth={1.8} />
                </button>
              </div>
              <button
                type="button"
                disabled={!draft.trim()}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  draft.trim()
                    ? "bg-[#006dff] text-white hover:bg-[#0055cc]"
                    : "bg-[#f5f5f5] text-[#8d8d8d] cursor-not-allowed"
                }`}
                aria-label="Send"
              >
                <ArrowUp size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
