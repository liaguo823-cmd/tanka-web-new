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
} from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { createPortal } from "react-dom";
import { useMenuCollapse, type Workspace } from "./MenuContext";
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

const APPS_NAV: NavItem[] = [
  { href: "/sop", label: "SOP", iconActive: asset("/figma/menu-sop-active.svg"), iconInactive: asset("/figma/menu-sop-inactive.svg") },
  { href: "/memos", label: "Memos", iconActive: asset("/figma/menu-memos-active.svg"), iconInactive: asset("/figma/menu-memos-inactive.svg"), plusModal: "memo" },
  { href: "/follow-ups", label: "Follow-ups", iconActive: asset("/figma/menu-followups-active.svg"), iconInactive: asset("/figma/menu-followups-inactive.svg"), plusModal: "follow-up" },
  { href: "/votes", label: "Votes", iconActive: asset("/figma/menu-votes-active.svg"), iconInactive: asset("/figma/menu-votes-inactive.svg"), plusModal: "vote" },
  { href: "/calendar", label: "Calendar", iconActive: asset("/figma/menu-calendar-active.svg"), iconInactive: asset("/figma/menu-calendar-inactive.svg"), plusModal: "calendar" },
];

export default function Menu() {
  const pathname = usePathname() || "/";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const {
    collapsed,
    toggle,
    menuWidth,
    setMenuWidth,
    menuCollapsed,
    toggleMenu,
    activeWorkspace,
  } = useMenuCollapse();
  const [dragging, setDragging] = useState(false);

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
      className={`group/menu backdrop-blur-[2px] bg-[#eef1f7] flex flex-col items-stretch justify-between pb-[16px] relative h-full shrink-0 overflow-hidden ${
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

        {/* Top nav: Flow / Chat / Link */}
        <div className="flex flex-col items-center pb-[16px] shrink-0 w-full">
          <div className="flex flex-col gap-[6px] items-center">
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
          className={`border-[#d0dae8] border-solid border-t h-px shrink-0 mx-auto ${
            menuCollapsed ? "w-[60px]" : "w-[151px]"
          }`}
        />

        {/* Apps section */}
        <div className="flex flex-col gap-[12px] items-center py-[12px] shrink-0 w-full">
          {!menuCollapsed && (
            <div
              className={`${FONT_SF_PRO} font-[400] h-[17px] leading-[0] shrink-0 text-[#6f7f94] text-[12px] tracking-[0.48px] w-[138px]`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <p className="leading-[21.6px]">Apps</p>
            </div>
          )}
          <div className="flex flex-col gap-[6px] items-center">
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
    return (
      <img
        alt=""
        src={active ? item.iconActive : item.iconInactive}
        className="block w-6 h-6"
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
  if (collapsed) {
    return (
      <div ref={wrapRef} className="relative">
        <Link
          href={item.href}
          aria-label={item.label}
          className={`${bg} flex items-center justify-center w-[36px] h-[36px] rounded-[8px] transition-colors`}
          data-name="tab-collapsed"
        >
          <NavIconRender item={item} active={active} />
        </Link>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative">
      <Link
        href={item.href}
        className={`${bg} group/tab flex flex-col items-center justify-center px-[6px] relative rounded-[8px] shrink-0 w-[156px] h-[36px] cursor-pointer transition-colors`}
        data-name="tab"
      >
        <div className="flex gap-[12px] items-center relative shrink-0 w-[139px]">
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
