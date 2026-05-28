"use client";

/**
 * Shared placeholder for menu items that don't have their own Figma
 * design yet (SOP / Memos / Follow-ups / Votes / Calendar). Same chrome
 * as /chat /flow /link so navigating to them feels consistent.
 */

import OrgRail from "../chat/_components/OrgRail";
import Menu from "../chat/_components/Menu";

const FONT =
  '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

export default function PlaceholderPage({
  title,
  description,
  nodeId,
  icon,
}: {
  title: string;
  description: string;
  nodeId?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className="h-screen w-screen flex bg-[#eef1f7] overflow-hidden"
      style={{ fontFamily: FONT }}
    >
      <OrgRail />
      <Menu />
      <div className="flex-1 min-w-0 h-full flex items-center justify-center bg-[#f7f8fc]">
        <div className="max-w-[480px] text-center px-8">
          {icon && (
            <div className="w-16 h-16 mx-auto mb-6 rounded-[16px] bg-white border border-[#e7ebf8] flex items-center justify-center text-[#006dff]">
              {icon}
            </div>
          )}
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#8793ab] font-medium mb-2">
            Coming soon{nodeId ? ` · Figma ${nodeId}` : ""}
          </p>
          <h1 className="text-[28px] font-semibold text-[#020617] tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-[14px] text-[#455871] leading-[1.6]">
            {description}
          </p>
          <p className="mt-6 text-[12px] text-[#8793ab]">
            把 Figma 里这个 screen 的 <code className="px-1.5 py-0.5 rounded bg-[#eef1f7] border border-[#d8dfed] font-mono text-[11px]">node-id</code> 发给我，我建出来。
          </p>
        </div>
      </div>
    </div>
  );
}
