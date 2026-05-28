"use client";

/**
 * OrgRail — 60px workspace switcher rail. Layout:
 *
 *  - 72px header at top: holds the `«` collapse toggle (centered).
 *    Matches the Menu header height so the first workspace tile lines
 *    up vertically with the first nav tab (Flow) in the Menu.
 *  - Workspace tiles below, then a horizontal divider, then the
 *    permanent-white-circle `+` (Add workspace) button.
 *  - Bottom: gear icon only.
 *
 * Collapse: width 60 ↔ 0 over 300ms ease-out, inner opacity 200ms
 * (delay-100 on expand). When collapsed the Menu's header owns the
 * `«` toggle (rendered to the LEFT of the Tanka logo) so this rail's
 * disappearing column doesn't leave the button floating.
 */

import Link from "next/link";
import { ChevronsLeft } from "lucide-react";
import { useMenuCollapse, WORKSPACES, type WorkspaceId } from "./MenuContext";
import { asset } from "../../_lib/asset";

const imgTankaMark = asset("/figma/tanka-mark.svg");
const imgT = asset("/figma/t-letter.svg");
const imgX = asset("/figma/org-x.svg");
const imgPlus = asset("/figma/org-plus.svg");
const imgNut = asset("/figma/nut.svg");

const FONT_SF_PRO_MED =
  "font-['SF_Pro',-apple-system,'BlinkMacSystemFont','Helvetica_Neue',sans-serif]";

export default function OrgRail() {
  const { collapsed, toggle, activeWorkspaceId, setActiveWorkspaceId } =
    useMenuCollapse();
  return (
    <div
      className={`shrink-0 grow-0 min-w-0 h-full overflow-hidden transition-[width] duration-300 ease-out ${
        collapsed ? "w-0" : "w-[60px]"
      }`}
      aria-hidden={collapsed}
    >
      <div
        className={`bg-[#eef1f7] border-[#d0dae8] border-r border-solid h-full w-[60px] flex flex-col items-stretch justify-between pb-[16px] transition-opacity duration-200 ease-out ${
          collapsed ? "opacity-0" : "opacity-100 delay-100"
        }`}
        data-node-id="8:10298"
        data-name="Org"
      >
        <div className="flex flex-col items-center w-full">
          {/* 72px header — `«` toggle centered, matches Menu header. */}
          <div className="h-[72px] w-full flex items-center justify-center shrink-0">
            <button
              type="button"
              onClick={toggle}
              aria-label="Collapse workspace bar"
              className="w-[28px] h-[28px] flex items-center justify-center rounded-md text-[#455871] hover:text-[#020617] hover:bg-white/60"
            >
              <ChevronsLeft size={18} strokeWidth={1.8} />
            </button>
          </div>

          {/* Workspace tiles */}
          <div className="flex flex-col items-center gap-[8px] w-full">
            {WORKSPACES.map((w) => (
              <WorkspaceTile
                key={w.id}
                id={w.id}
                active={activeWorkspaceId === w.id}
                unread={w.unread}
                onClick={() => setActiveWorkspaceId(w.id)}
              />
            ))}

            {/* Divider between workspaces and the Add button */}
            <div className="my-[6px] h-px w-[28px] bg-[#e7ebf8]" />

            {/* Add workspace — permanent white circle */}
            <button
              type="button"
              aria-label="Add workspace"
              className="rounded-full size-[32px] flex items-center justify-center bg-white hover:bg-white shadow-[0_1px_2px_rgba(15,41,77,0.06)] transition-colors"
            >
              <img alt="" className="block size-[16px]" src={imgPlus} />
            </button>
          </div>
        </div>

        {/* Bottom: gear only — links to /team-settings. Hovering
            reveals a tooltip to the right of the icon since the
            gear sits at the left edge of the viewport. */}
        <div className="flex items-center justify-center w-full">
          <div className="relative group/gear">
            <Link
              href="/team-settings"
              aria-label="Team Settings"
              className="size-[36px] flex items-center justify-center text-[#455871] hover:text-[#020617] rounded-md hover:bg-white/50 transition-colors"
            >
              <img alt="" className="block size-[20px]" src={imgNut} />
            </Link>
            <span
              role="tooltip"
              className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#020617] text-white text-[12px] font-medium px-2 py-1 opacity-0 pointer-events-none group-hover/gear:opacity-100 transition-opacity z-50"
            >
              Team Settings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkspaceTile({
  id,
  active,
  unread,
  onClick,
}: {
  id: WorkspaceId;
  active: boolean;
  unread: number;
  onClick: () => void;
}) {
  // Active = outer ring with a transparent gap between avatar and ring.
  const ring = active
    ? "ring-[2px] ring-[rgba(0,94,255,0.55)] ring-offset-[3px] ring-offset-[#eef1f7]"
    : "";
  return (
    <div className="flex flex-col items-center pb-[4px] pt-[2px] w-[46px] relative">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Switch to ${id} workspace`}
        aria-pressed={active}
        className={`relative shrink-0 ${ring} size-[32px] rounded-[24px] overflow-hidden transition-shadow duration-200 ease-out flex items-center justify-center ${tileBgFor(id)}`}
      >
        {id === "tanka" && (
          <img alt="" className="block w-[20px] h-[17px]" src={imgTankaMark} />
        )}
        {id === "t" && (
          <img alt="" className="block w-[10px] h-[13px]" src={imgT} />
        )}
        {id === "x" && (
          <img alt="" className="block w-[18px] h-[18px]" src={imgX} />
        )}
      </button>
      {unread > 0 && (
        <div
          className="absolute bg-[#ef4444] flex items-center justify-center -right-0 top-0 overflow-clip rounded-full size-[16px]"
          data-name="消息数"
        >
          <p
            className={`${FONT_SF_PRO_MED} font-[510] leading-none text-[10px] text-white whitespace-nowrap`}
          >
            {unread}
          </p>
        </div>
      )}
    </div>
  );
}

function tileBgFor(id: WorkspaceId): string {
  switch (id) {
    case "tanka":
      return "bg-[#fdfefe] p-[6px]";
    case "t":
      return "bg-[#005eff]";
    case "x":
      return "bg-white";
  }
}
