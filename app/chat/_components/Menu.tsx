"use client";

/**
 * Menu — secondary nav, 180px expanded / 88px collapsed.
 *
 * Two independent collapse axes:
 *
 *  1. OrgRail's `collapsed` — the workspace rail (60px) to the left
 *     hides. When it's gone, the menu owns the top-left `«` toggle
 *     (rendered to the LEFT of the Tanka logo in our header) so the
 *     user can re-expand the rail.
 *
 *  2. Menu's own `menuCollapsed` — width shrinks 180 → 88, content
 *     reflows to centered icons (no labels, no +). The fold/expand
 *     button at the bottom appears on hover ANY blank area of the
 *     menu (group-hover/menu), not just the bottom photo row.
 *
 * The Tanka logo + workspace label in the header reads the active
 * workspace from MenuContext — clicking a workspace tile in the
 * OrgRail switches both.
 */

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  ChevronsLeft,
  Settings,
  LogOut,
  ArrowRight,
  FileText,
  PlusCircle,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { createPortal } from "react-dom";
import {
  useMenuCollapse,
  MENU_WIDTH_COLLAPSED,
  MENU_WIDTH_EXPANDED,
  MENU_WIDTH_MIN,
  MENU_WIDTH_MAX,
  MENU_COLLAPSE_THRESHOLD,
  type Workspace,
} from "./MenuContext";
import {
  CalendarModal,
  MemoModal,
  VoteModal,
  FollowUpModal,
  type PlusModalKind,
} from "../../_components/PlusModals";
import { asset } from "../../_lib/asset";

const imgPhoto = asset("/figma/user-photo.png");
const imgTankaMark = asset("/figma/tanka-mark-menu.svg");
const imgT = asset("/figma/t-letter.svg");
const imgX = asset("/figma/org-x.svg");

const FONT_SF_PRO =
  "font-['SF_Pro',-apple-system,'BlinkMacSystemFont','Helvetica_Neue',sans-serif]";

type NavIcon = ComponentType<IconProps>;
type NavItem = {
  href: string;
  label: string;
  /** Phosphor icon (Flow/Chat/Link). For Apps we use img src pairs. */
  Icon?: NavIcon;
  /** Active SVG src (filled, dark). */
  iconActive?: string;
  /** Inactive SVG src (outlined, lighter). */
  iconInactive?: string;
  /** Override the rendered size (px) of the ACTIVE icon. Defaults to 24.
   *  Used by Chat — its filled bubble fills its 24×24 viewBox much
   *  more than the other active icons, so it needs a smaller box to
   *  read at the same visual weight. */
  iconActiveSize?: number;
  plusItems?: string[];
  plusModal?: PlusModalKind;
  /** When true, the + button is shown but simply navigates to `href`
   *  instead of opening a dropdown or modal. Used by Flow. */
  plusGoesToHref?: boolean;
};

const TOP_NAV: NavItem[] = [
  { href: "/flow", label: "Flow", iconActive: asset("/figma/menu-flow-active.svg"), iconInactive: asset("/figma/menu-flow-inactive.svg"), plusGoesToHref: true },
  { href: "/chat", label: "Chat", iconActive: asset("/figma/menu-chat-active.svg"), iconInactive: asset("/figma/menu-chat-inactive.svg"), plusItems: ["New Chat", "New Folder", "New Broadcast"] },
  { href: "/link", label: "Link", iconActive: asset("/figma/menu-link-active.svg"), iconInactive: asset("/figma/menu-link-inactive.svg") },
];

/** A doc pinned in the menu's bottom half. Only one document
 *  type for now — every pinned item renders as the blue file
 *  glyph and the tooltip uses the `<name>-memo` shorthand. */
type PinnedItem = {
  /** Visible truncated title in the row. */
  shortName: string;
  /** Full title shown in the tooltip on hover. */
  fullName: string;
};

const PINNED: PinnedItem[] = [
  { shortName: "设计资料总结 Copy", fullName: "设计资料总结 Copy-memo" },
  { shortName: "Tanka 设计-2026", fullName: "Tanka 设计-2026-memo" },
];

const APPS_NAV: NavItem[] = [
  { href: "/sop", label: "SOP", iconActive: asset("/figma/menu-sop-active.svg"), iconInactive: asset("/figma/menu-sop-inactive.svg") },
  { href: "/memos", label: "Memos", iconActive: asset("/figma/menu-memos-active.svg"), iconInactive: asset("/figma/menu-memos-inactive.svg"), plusModal: "memo" },
  { href: "/follow-ups", label: "Follow-ups", iconActive: asset("/figma/menu-followups-active.svg"), iconInactive: asset("/figma/menu-followups-inactive.svg"), plusModal: "follow-up" },
  { href: "/votes", label: "Votes", iconActive: asset("/figma/menu-votes-active.svg"), iconInactive: asset("/figma/menu-votes-inactive.svg"), plusModal: "vote" },
  { href: "/calendar", label: "Calendar", iconActive: asset("/figma/menu-calendar-active.svg"), iconInactive: asset("/figma/menu-calendar-inactive.svg"), plusModal: "calendar" },
];

/* ---------------------------------------------------------------------- */
/*  Module-level menuWidth store                                            */
/*                                                                          */
/*  Each page renders its own <Menu /> instance, so a per-component         */
/*  useState would reset to MENU_WIDTH_EXPANDED every time the user         */
/*  navigates between routes — annoying because they lose their collapsed   */
/*  preference. Keep the value at the module scope and bridge it into       */
/*  React with useSyncExternalStore so any Menu mount picks up the          */
/*  current width. Also mirror to localStorage so the preference survives   */
/*  reloads.                                                                */
/* ---------------------------------------------------------------------- */

const STORAGE_KEY = "tanka:menuWidth";
let _menuWidth: number = MENU_WIDTH_EXPANDED;
let _hydrated = false;
const _subscribers = new Set<() => void>();

function _readStored(): number {
  if (typeof window === "undefined") return MENU_WIDTH_EXPANDED;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return MENU_WIDTH_EXPANDED;
  const n = Number(raw);
  return Number.isFinite(n) ? n : MENU_WIDTH_EXPANDED;
}

function _setMenuWidth(w: number) {
  _menuWidth = w;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(w));
    } catch {
      /* localStorage unavailable — ignore */
    }
  }
  _subscribers.forEach((fn) => fn());
}

function _subscribe(callback: () => void) {
  _subscribers.add(callback);
  return () => {
    _subscribers.delete(callback);
  };
}

function _getSnapshot() {
  return _menuWidth;
}

function _getServerSnapshot() {
  return MENU_WIDTH_EXPANDED;
}

export default function Menu() {
  const pathname = usePathname() || "/";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  // Workspace/OrgRail state lives in context — those change rarely so
  // the cross-component re-renders are cheap.
  const { collapsed, toggle, activeWorkspace } = useMenuCollapse();

  // Menu width is shared at the module scope (see _menuWidth above) so
  // it survives the per-page <Menu /> remount on navigation. Mirror
  // it into a local useState via a subscription so only this Menu
  // instance re-renders when the width changes.
  const [menuWidth, setMenuWidthLocal] = useState(_menuWidth);
  useEffect(() => {
    // Hydrate from localStorage exactly once (avoids SSR mismatch).
    if (!_hydrated) {
      _hydrated = true;
      const stored = _readStored();
      if (stored !== _menuWidth) _setMenuWidth(stored);
    }
    // Sync local state with the current module value, then subscribe
    // to future changes.
    setMenuWidthLocal(_menuWidth);
    return _subscribe(() => setMenuWidthLocal(_menuWidth));
  }, []);
  const [dragging, setDragging] = useState(false);
  const menuCollapsed = menuWidth < MENU_COLLAPSE_THRESHOLD;
  // Snap-based drag: no awkward intermediate widths. Below the
  // threshold we land at the collapsed icon-only column; above the
  // threshold the width is clamped to ≥ MENU_WIDTH_EXPANDED so the
  // expanded layout never gets clipped.
  const setMenuWidth = useCallback((w: number) => {
    if (Number.isNaN(w)) return;
    if (w < MENU_COLLAPSE_THRESHOLD) {
      _setMenuWidth(MENU_WIDTH_COLLAPSED);
    } else {
      _setMenuWidth(Math.max(MENU_WIDTH_EXPANDED, Math.min(MENU_WIDTH_MAX, w)));
    }
  }, []);
  const toggleMenu = useCallback(() => {
    _setMenuWidth(
      _menuWidth < MENU_COLLAPSE_THRESHOLD
        ? MENU_WIDTH_EXPANDED
        : MENU_WIDTH_COLLAPSED,
    );
  }, []);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuPos, setUserMenuPos] = useState<{ left: number; bottom: number } | null>(null);
  const photoBtnRef = useRef<HTMLButtonElement>(null);
  const foldBtnRef = useRef<HTMLButtonElement>(null);

  function openUserMenu(anchor: HTMLButtonElement) {
    const r = anchor.getBoundingClientRect();
    setUserMenuPos({
      left: r.right + 8,
      bottom: window.innerHeight - r.top + 8,
    });
    setUserMenuOpen(true);
  }

  // While the user drags the resize handle we disable the width
  // transition so the menu tracks the cursor 1:1.
  return (
    <div
      className={`group/menu backdrop-blur-[2px] bg-[#eef1f7] flex flex-col items-stretch justify-between pb-[16px] relative h-full shrink-0 min-w-0 overflow-hidden ${
        dragging ? "" : "transition-[width] duration-300 ease-out"
      }`}
      style={{ width: menuWidth }}
      data-node-id="8:10210"
      data-name="menu"
    >
      {/* Nav content — relayout (not fade) when menu collapses */}
      <div className="flex flex-col items-stretch justify-start flex-1 min-h-0 w-full">
        {/* Header — 72px — shows the ACTIVE workspace's logo + name.
            When OrgRail is collapsed we also show the `«` toggle at
            the very left so the user can re-expand it. */}
        <div className="h-[72px] shrink-0 flex items-center w-full">
          {menuCollapsed ? (
            <div className="flex justify-center w-full">
              {/* When the Menu is collapsed, the workspace logo is
                  the OrgRail toggle: clicking it expands/collapses
                  the workspace rail. Only active in collapsed mode. */}
              <button
                type="button"
                onClick={toggle}
                aria-label={collapsed ? "Expand workspace bar" : "Collapse workspace bar"}
                className="rounded-[24px] hover:opacity-80 transition-opacity"
              >
                <WorkspaceLogo workspace={activeWorkspace} />
              </button>
            </div>
          ) : (
            <div className="group/header flex items-center px-[14px] w-full relative">
              {/* `«` button — absolute positioned at the left so the
                  Tanka logo+name underneath stays aligned with the
                  menu icons (Flow / Chat / Link) when the button is
                  hidden. Becomes visible on hover; the Tanka content
                  then shifts right via the translate-x below. */}
              {collapsed && (
                <button
                  type="button"
                  onClick={toggle}
                  aria-label="Expand workspace bar"
                  className="absolute left-[14px] top-1/2 -translate-y-1/2 opacity-0 group-hover/header:opacity-100 transition-opacity w-[28px] h-[28px] flex items-center justify-center rounded-md text-[#455871] hover:text-[#020617] hover:bg-white/60"
                >
                  <ChevronsLeft
                    size={18}
                    strokeWidth={1.8}
                    style={{ transform: "rotate(180deg)" }}
                  />
                </button>
              )}
              <div
                className={`flex items-center gap-[8px] transition-transform duration-200 ease-out ${
                  collapsed ? "group-hover/header:translate-x-[36px]" : ""
                }`}
              >
                <WorkspaceLogo workspace={activeWorkspace} />
                <p
                  className={`${FONT_SF_PRO} font-[600] leading-[25.2px] shrink-0 text-[#020617] text-[18px] whitespace-nowrap`}
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {activeWorkspace.name}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Top nav: Flow / Chat / Link. pb-[18px] (vs the natural
            pb-[16px]) lines up our inner divider with the OrgRail's
            short-line divider — accounting for our tabs being 36px
            tall vs the rail's 38px tiles.
            Expanded: inner gets `px-[8px]` so each NavTab stretches
            to (menuWidth - 16) and the hover/active background
            scales with the column. Tab's internal px-[6px] still
            lands the icon at x=14, aligned with the Tanka header
            logo. Collapsed (60px): center the 36×36 tiles. */}
        <div
          className={`flex flex-col pb-[18px] shrink-0 w-full ${
            menuCollapsed ? "items-center" : ""
          }`}
        >
          <div
            className={`flex flex-col gap-[6px] ${
              menuCollapsed ? "" : "self-stretch px-[8px]"
            }`}
          >
            {TOP_NAV.map((n) => (
              <NavTab
                key={n.href}
                item={n}
                active={isActive(n.href)}
                collapsed={menuCollapsed}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className={`bg-[#d0dae8] h-px shrink-0 ${
            menuCollapsed
              ? "w-[28px] mx-auto my-[6px]"
              : "self-stretch mx-[14px]"
          }`}
        />

        {/* Apps section — same stretch rule as the top nav. */}
        <div
          className={`flex flex-col gap-[12px] py-[12px] shrink-0 w-full ${
            menuCollapsed ? "items-center" : ""
          }`}
        >
          {!menuCollapsed && (
            <div
              className={`${FONT_SF_PRO} font-[400] h-[17px] leading-[0] shrink-0 text-[#6f7f94] text-[12px] tracking-[0.48px] self-stretch pl-[14px]`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <p className="leading-[21.6px]">Apps</p>
            </div>
          )}
          <div
            className={`flex flex-col gap-[6px] ${
              menuCollapsed ? "" : "self-stretch px-[8px]"
            }`}
          >
            {APPS_NAV.map((n) => (
              <NavTab
                key={n.href}
                item={n}
                active={isActive(n.href)}
                collapsed={menuCollapsed}
              />
            ))}
          </div>
        </div>

        {/* Divider between Apps and Pinned — same style as the
            Top-nav/Apps divider. The mt-[6px] compensates for the
            Apps section ending with py-[12px] (vs the top nav's
            pb-[18px]) so the Apps→Pinned gap matches Link→Apps. */}
        {!menuCollapsed && (
          <div className="bg-[#d0dae8] h-px shrink-0 self-stretch mx-[14px] mt-[6px]" />
        )}

        {/* Pinned — bottom half of the menu in expanded mode. Each
            item is a small doc shortcut with a tooltip showing the
            full title. Hidden in collapsed mode (no room for labels). */}
        {!menuCollapsed && (
          <div className="flex flex-col gap-[12px] py-[12px] shrink-0 w-full">
            <div
              className={`${FONT_SF_PRO} font-[400] h-[17px] leading-[0] shrink-0 text-[#6f7f94] text-[12px] tracking-[0.48px] self-stretch pl-[14px]`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <p className="leading-[21.6px]">Pinned</p>
            </div>
            <div className="flex flex-col gap-[2px] self-stretch px-[8px]">
              {PINNED.map((item) => (
                <PinnedTab key={item.fullName} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Collapsed-only: short divider + circled-+ create button
            at the bottom of the icon column. Hovering the + reveals
            a portal dropdown with all the "New X" actions that the
            expanded NavTab's + buttons handle individually. */}
        {menuCollapsed && (
          <div className="flex flex-col items-center gap-[8px] shrink-0 w-full pt-[6px] pb-[12px]">
            <div className="bg-[#d0dae8] h-px w-[28px]" />
            <CollapsedCreateButton />
          </div>
        )}
      </div>

      {/* Bottom row — user photo (always visible) + fold/expand icon.
          The icon is hover-revealed in both collapsed and expanded
          states. In collapsed mode the two stack vertically (icon
          above photo) to fit the 60px column. */}
      <div
        className={`relative shrink-0 flex items-center w-full ${
          menuCollapsed
            ? "flex-col gap-3 justify-center"
            : "px-[14px] justify-between"
        }`}
      >
        {menuCollapsed && (
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Expand menu"
            className="w-[28px] h-[28px] rounded-md flex items-center justify-center text-[#455871] hover:text-[#020617] hover:bg-white/60 transition-colors"
          >
            <PanelLeftOpen size={18} strokeWidth={1.8} />
          </button>
        )}
        <button
          ref={photoBtnRef}
          type="button"
          onClick={() => photoBtnRef.current && openUserMenu(photoBtnRef.current)}
          aria-label="Open user menu"
          className="relative rounded-full shrink-0 size-[36px] overflow-hidden focus:outline-none focus:ring-2 focus:ring-[rgba(0,94,255,0.4)]"
          data-name="Photo"
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-full size-full"
            src={imgPhoto}
          />
        </button>
        {!menuCollapsed && (
          <button
            ref={foldBtnRef}
            type="button"
            onClick={toggleMenu}
            aria-label="Collapse menu"
            className="opacity-0 group-hover/menu:opacity-100 w-[28px] h-[28px] rounded-md flex items-center justify-center text-[#455871] hover:text-[#020617] hover:bg-white/60 transition-opacity"
          >
            <PanelLeftClose size={18} strokeWidth={1.8} />
          </button>
        )}
      </div>

      {/* Drag handle on the right edge — invisible 6px strip that
          turns col-resize on hover. Dragging updates menuWidth in
          context; below the collapse threshold the menu reflows to
          icon-only automatically. */}
      <ResizeHandle
        currentWidth={menuWidth}
        onResize={setMenuWidth}
        onStart={() => setDragging(true)}
        onEnd={() => setDragging(false)}
      />

      <UserMenuPopup
        open={userMenuOpen}
        pos={userMenuPos}
        onClose={() => setUserMenuOpen(false)}
      />
    </div>
  );
}

/** Bottom-of-the-collapsed-menu "create" button. A circled +, sized
 *  to match the 36×36 nav-tab hit area. Hovering reveals a portal-
 *  rendered dropdown that bundles every "New X" action the expanded
 *  NavTab + buttons handle individually (Chat / Memo / Follow-up /
 *  Vote / Calendar event). */
function CollapsedCreateButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [modal, setModal] = useState<PlusModalKind | null>(null);
  const closeTimer = useRef<number | null>(null);

  function show() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.top - 8, left: r.right + 12 });
    }
    setOpen(true);
  }
  function scheduleHide() {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  }

  const items: Array<{ label: string; onSelect: () => void }> = [
    { label: "New Chat", onSelect: () => router.push("/chat") },
    { label: "New Memo", onSelect: () => setModal("memo") },
    { label: "New Follow-up", onSelect: () => setModal("follow-up") },
    { label: "New Vote", onSelect: () => setModal("vote") },
    { label: "New Calendar event", onSelect: () => setModal("calendar") },
  ];

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onMouseEnter={show}
        onMouseLeave={scheduleHide}
        onFocus={show}
        onBlur={scheduleHide}
        aria-label="Create new"
        className="w-[36px] h-[36px] flex items-center justify-center rounded-[8px] text-[#455871] hover:text-[#020617] hover:bg-[#d8dfed]/50 transition-colors"
      >
        <PlusCircle size={22} strokeWidth={1.6} />
      </button>
      {open && typeof window !== "undefined" &&
        createPortal(
          <div
            ref={dropdownRef}
            onMouseEnter={show}
            onMouseLeave={scheduleHide}
            className="fixed z-[100] w-[200px] rounded-[12px] bg-white border border-[#e7ebf8] shadow-[0_8px_24px_rgba(15,41,77,0.10),0_2px_4px_rgba(15,41,77,0.04)] overflow-hidden"
            style={{ top: pos.top, left: pos.left }}
            role="menu"
          >
            {items.map((item, i) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(false);
                  item.onSelect();
                }}
                className={`w-full text-left px-4 py-3 text-[14px] text-[#020617] hover:bg-[#f5f5f7] transition-colors ${
                  i !== items.length - 1 ? "border-b border-[#f1f3f7]" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
      <MemoModal open={modal === "memo"} onClose={() => setModal(null)} />
      <FollowUpModal open={modal === "follow-up"} onClose={() => setModal(null)} />
      <VoteModal open={modal === "vote"} onClose={() => setModal(null)} />
      <CalendarModal open={modal === "calendar"} onClose={() => setModal(null)} />
    </>
  );
}

/** A pinned doc row in the bottom-half of the menu. Renders a Feishu-
 *  style file glyph, a truncated label, and a hover-revealed close
 *  button. Long titles get a portal-rendered tooltip on hover/focus. */
function PinnedTab({ item }: { item: PinnedItem }) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  function show() {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setPos({ top: r.top + r.height / 2, left: r.right + 8 });
  }
  function hide() {
    setPos(null);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={item.fullName}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="group/pin flex items-center gap-[12px] px-[6px] h-[36px] w-full rounded-[8px] hover:bg-[#d8dfed]/50 transition-colors"
      >
        <span className="size-[24px] shrink-0 flex items-center justify-center">
          <FileText size={18} strokeWidth={1.8} className="text-[#3b82f6]" />
        </span>
        <span
          className={`${FONT_SF_PRO} font-[400] text-[15px] leading-[21px] text-[#455871] truncate flex-1 text-left`}
        >
          {item.shortName}
        </span>
        <span
          aria-hidden
          className="opacity-0 group-hover/pin:opacity-100 transition-opacity w-[22px] h-[22px] rounded-[6px] flex items-center justify-center text-[#455871] hover:bg-[#c9d3e6]"
        >
          <X size={14} strokeWidth={2.4} />
        </span>
      </button>
      {pos && typeof window !== "undefined" &&
        createPortal(
          <div
            role="tooltip"
            className="fixed z-[100] -translate-y-1/2 whitespace-nowrap rounded-md bg-[#020617] text-white text-[12px] font-medium px-2 py-1 pointer-events-none shadow-[0_2px_8px_rgba(15,41,77,0.15)]"
            style={{ top: pos.top, left: pos.left }}
          >
            {item.fullName}
          </div>,
          document.body,
        )}
    </>
  );
}

/** Icon-only nav tile (rendered when the Menu is collapsed) with a
 *  portal-rendered tooltip showing the item's label on hover/focus.
 *  Portal-positioning keeps the tooltip visible even though the
 *  Menu's outer wrapper has overflow-hidden for the resize animation. */
function CollapsedNavTab({
  href,
  label,
  active,
  bg,
  icon,
}: {
  href: string;
  label: string;
  active: boolean;
  bg: string;
  icon: React.ReactNode;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  function show() {
    if (!linkRef.current) return;
    const r = linkRef.current.getBoundingClientRect();
    setPos({ top: r.top + r.height / 2, left: r.right + 8 });
  }
  function hide() {
    setPos(null);
  }

  return (
    <>
      <Link
        ref={linkRef}
        href={href}
        aria-label={label}
        aria-pressed={active}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className={`${bg} flex items-center justify-center w-[36px] h-[36px] rounded-[8px] transition-colors`}
        data-name="tab-collapsed"
      >
        {icon}
      </Link>
      {pos && typeof window !== "undefined" &&
        createPortal(
          <div
            role="tooltip"
            className="fixed z-[100] -translate-y-1/2 whitespace-nowrap rounded-md bg-[#020617] text-white text-[12px] font-medium px-2 py-1 pointer-events-none shadow-[0_2px_8px_rgba(15,41,77,0.15)]"
            style={{ top: pos.top, left: pos.left }}
          >
            {label}
          </div>,
          document.body,
        )}
    </>
  );
}

/** Generic right-edge drag-to-resize handle. Captures the starting
 *  width at mousedown so subsequent mousemoves compute the new width
 *  from the original drag origin (not the previous frame). */
export function ResizeHandle({
  currentWidth,
  onResize,
  onStart,
  onEnd,
}: {
  /** Width at the moment the user starts dragging. */
  currentWidth: number;
  /** Called on each mousemove with the absolute new width. The
   *  receiver is responsible for any clamping. */
  onResize: (newWidth: number) => void;
  onStart?: () => void;
  onEnd?: () => void;
}) {
  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    const startX = e.clientX;
    const startW = currentWidth;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
    onStart?.();

    function onMove(ev: MouseEvent) {
      onResize(startW + (ev.clientX - startX));
    }
    function onUp() {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      onEnd?.();
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize sidebar"
      className="absolute top-0 right-0 h-full w-[6px] cursor-col-resize z-20 group/handle"
    >
      {/* Hover/active line indicator */}
      <div className="absolute top-0 right-0 h-full w-[2px] bg-[rgba(0,94,255,0.4)] opacity-0 group-hover/handle:opacity-100 transition-opacity" />
    </div>
  );
}

/** Floating user-menu card. Anchored above-right of the photo,
 *  closes on outside click / Esc. */
function UserMenuPopup({
  open,
  pos,
  onClose,
}: {
  open: boolean;
  pos: { left: number; bottom: number } | null;
  onClose: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function onDoc(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDoc);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDoc);
    };
  }, [open, onClose]);

  if (!open || !pos || typeof window === "undefined") return null;
  return createPortal(
    <div
      ref={cardRef}
      role="dialog"
      aria-label="User menu"
      className="fixed z-[100] w-[340px] bg-white rounded-[16px] shadow-[0_12px_32px_rgba(15,41,77,0.12),0_2px_8px_rgba(15,41,77,0.06)] border border-[#e7ebf8] overflow-hidden"
      style={{ left: pos.left, bottom: pos.bottom }}
    >
      {/* Header — avatar + name + email */}
      <div className="p-5 flex items-center gap-4">
        <div className="w-[60px] h-[60px] rounded-full bg-[#94a3b8] flex items-center justify-center shrink-0">
          <span className="text-white text-[18px] font-medium tracking-wide">YG</span>
        </div>
        <div className="min-w-0">
          <p className="text-[16px] font-semibold text-[#020617] truncate">Yiran Guo</p>
          <p className="text-[13px] text-[#8793ab] truncate">yiran.guo@tanka.ai</p>
        </div>
      </div>

      {/* View Profile */}
      <div className="px-5 pb-4">
        <Link
          href="/profile"
          onClick={onClose}
          className="w-full h-[44px] rounded-[10px] border border-[#e7ebf8] flex items-center justify-center gap-2 text-[14px] font-medium text-[#020617] hover:bg-[#f7f8fc] transition-colors"
        >
          View Profile
          <ArrowRight size={16} strokeWidth={1.8} />
        </Link>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#f1f3f7] mx-5" />

      {/* Settings + Log out rows */}
      <div className="py-2">
        <Link
          href="/settings"
          onClick={onClose}
          className="w-full px-5 py-2.5 flex items-center gap-3 text-[14px] text-[#020617] hover:bg-[#f7f8fc] transition-colors"
        >
          <Settings size={18} strokeWidth={1.6} className="text-[#455871]" />
          Settings
        </Link>
        <button
          type="button"
          className="w-full px-5 py-2.5 flex items-center gap-3 text-[14px] text-[#020617] hover:bg-[#f7f8fc] transition-colors"
        >
          <LogOut size={18} strokeWidth={1.6} className="text-[#455871]" />
          Log out
        </button>
      </div>
    </div>,
    document.body,
  );
}

/** Renders the small 32×32 logo for the active workspace in the menu
 *  header. Different workspace identities get different visuals. */
function WorkspaceLogo({ workspace }: { workspace: Workspace }) {
  if (workspace.id === "tanka") {
    return (
      <div
        className="bg-white flex flex-col items-start justify-center p-[6px] rounded-[24px] shrink-0 size-[32px]"
        data-name="tanka logo"
      >
        <div className="h-[17.452px] relative shrink-0 w-[19.796px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTankaMark} />
        </div>
      </div>
    );
  }
  if (workspace.id === "t") {
    return (
      <div className="bg-[#005eff] rounded-full size-[32px] flex items-center justify-center shrink-0">
        <img alt="" className="block w-[10px] h-[13px]" src={imgT} />
      </div>
    );
  }
  return (
    <div className="bg-white rounded-full size-[32px] flex items-center justify-center shrink-0">
      <img alt="" className="block size-[18px]" src={imgX} />
    </div>
  );
}

/** Renders the icon for a nav tab — picks between phosphor (Flow/Chat/
 *  Link) and the img-based active/inactive pair (Apps section). */
function NavIconRender({ item, active }: { item: NavItem; active: boolean }) {
  if (item.iconActive && item.iconInactive) {
    const size = active && item.iconActiveSize ? item.iconActiveSize : 24;
    return (
      <img
        alt=""
        src={active ? item.iconActive : item.iconInactive}
        className="block"
        style={{ width: size, height: size }}
      />
    );
  }
  if (item.Icon) {
    const I = item.Icon;
    return (
      <I
        size={24}
        weight={active ? "fill" : "regular"}
        className={active ? "text-[#0f294d]" : "text-[#455871]"}
      />
    );
  }
  return null;
}

function NavTab({
  item,
  active,
  collapsed,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
}) {
  const bg = active ? "bg-[#d8dfed]" : "hover:bg-[#d8dfed]/50";
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const plusBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      const t = e.target as Node;
      if (
        wrapRef.current && !wrapRef.current.contains(t) &&
        dropdownRef.current && !dropdownRef.current.contains(t)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function handlePlusClick() {
    if (item.plusModal) {
      setModalOpen(true);
      return;
    }
    if (item.plusGoesToHref) {
      router.push(item.href);
      return;
    }
    if (!open && plusBtnRef.current) {
      const r = plusBtnRef.current.getBoundingClientRect();
      setPos({ top: r.top - 8, left: r.right + 16 });
    }
    setOpen((v) => !v);
  }

  const hasPlus = Boolean(item.plusItems || item.plusModal || item.plusGoesToHref);

  // Collapsed: centered 36×36 icon tile, no label, no plus button.
  // Label is shown via a portal tooltip on hover/focus.
  if (collapsed) {
    return (
      <CollapsedNavTab
        href={item.href}
        label={item.label}
        active={active}
        bg={bg}
        icon={<NavIconRender item={item} active={active} />}
      />
    );
  }

  return (
    <div ref={wrapRef} className="relative w-full">
      <Link
        href={item.href}
        className={`${bg} group/tab flex flex-col items-start justify-center px-[6px] relative rounded-[8px] shrink-0 w-full h-[36px] cursor-pointer transition-colors`}
        data-name="tab"
      >
        <div className="flex gap-[12px] items-center relative shrink-0 w-full">
          <span className="size-[24px] shrink-0 flex items-center justify-center">
            <NavIconRender item={item} active={active} />
          </span>
          <p
            className={`${FONT_SF_PRO} ${active ? "font-[500] text-[#0f294d]" : "font-[400] text-[#455871]"} leading-[21px] text-[15px] whitespace-nowrap`}
            style={{ fontVariationSettings: "'wdth' 100", fontWeight: active ? 500 : 400 }}
          >
            {item.label}
          </p>
          {hasPlus && (
            <button
              ref={plusBtnRef}
              type="button"
              aria-label={`New ${item.label}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handlePlusClick();
              }}
              className={`${
                open ? "opacity-100 bg-[#c9d3e6]" : "opacity-0 group-hover/tab:opacity-100"
              } absolute right-0 top-1/2 -translate-y-1/2 transition-opacity w-[22px] h-[22px] rounded-[6px] flex items-center justify-center text-[#455871] hover:bg-[#c9d3e6] focus:outline-none`}
            >
              <Plus size={14} weight="bold" />
            </button>
          )}
        </div>
      </Link>

      {open && item.plusItems && typeof window !== "undefined" &&
        createPortal(
          <PlusDropdown
            ref={dropdownRef}
            items={item.plusItems}
            pos={pos}
            onClose={() => setOpen(false)}
          />,
          document.body,
        )}

      {item.plusModal === "memo" && (
        <MemoModal open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
      {item.plusModal === "follow-up" && (
        <FollowUpModal open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
      {item.plusModal === "vote" && (
        <VoteModal open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
      {item.plusModal === "calendar" && (
        <CalendarModal open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

type DropdownRef = HTMLDivElement;
const PlusDropdown = ({
  ref,
  items,
  pos,
  onClose,
}: {
  ref: React.RefObject<DropdownRef | null>;
  items: string[];
  pos: { top: number; left: number };
  onClose: () => void;
}) => {
  return (
    <div
      ref={ref}
      className="fixed z-[100] w-[200px] rounded-[12px] bg-white border border-[#e7ebf8] shadow-[0_8px_24px_rgba(15,41,77,0.10),0_2px_4px_rgba(15,41,77,0.04)] overflow-hidden"
      style={{ top: pos.top, left: pos.left }}
      role="menu"
    >
      {items.map((label, i) => (
        <button
          key={label}
          type="button"
          role="menuitem"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className={`w-full text-left px-4 py-3 text-[15px] text-[#020617] hover:bg-[#f5f5f7] transition-colors ${
            i !== items.length - 1 ? "border-b border-[#f1f3f7]" : ""
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
