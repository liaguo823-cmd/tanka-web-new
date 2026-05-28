"use client";

/**
 * Sidebar state.
 *
 * `collapsed` controls the OrgRail (workspace rail, 60 ↔ 0).
 *
 * The Menu (secondary nav) uses a continuous `menuWidth` instead of a
 * binary flag — the user can drag the right edge of the menu to any
 * width between the collapsed icon-only state (60px) and a max width
 * (280px). `menuCollapsed` is derived: anything below the threshold
 * (120px) reflows to the 60px icon-only layout. `toggleMenu` snaps
 * between the two canonical widths.
 *
 * Workspace switching also lives here so the Menu header can react
 * to which workspace is active.
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type WorkspaceId = "tanka" | "t" | "x";
export type Workspace = {
  id: WorkspaceId;
  name: string;
  /** 0 = no badge. Tanka has unread = 3 by default. */
  unread: number;
};

export const WORKSPACES: Workspace[] = [
  { id: "tanka", name: "Tanka", unread: 3 },
  { id: "t", name: "T Team", unread: 0 },
  { id: "x", name: "X Corp", unread: 0 },
];

/** Layout constants for the Menu's resizable width. */
export const MENU_WIDTH_COLLAPSED = 60;
export const MENU_WIDTH_EXPANDED = 180;
export const MENU_WIDTH_MIN = 60;
export const MENU_WIDTH_MAX = 280;
/** Below this width the menu reflows to its icon-only layout. */
export const MENU_COLLAPSE_THRESHOLD = 120;

type Ctx = {
  /** OrgRail is collapsed (width 0). */
  collapsed: boolean;
  toggle: () => void;
  /** Current Menu width in px. Driven by drag-to-resize. */
  menuWidth: number;
  setMenuWidth: (w: number) => void;
  /** Derived: true when menuWidth < MENU_COLLAPSE_THRESHOLD. */
  menuCollapsed: boolean;
  /** Snap-toggle between collapsed (60) and expanded (180). */
  toggleMenu: () => void;
  /** Currently-active workspace; clicking a tile updates this. */
  activeWorkspaceId: WorkspaceId;
  setActiveWorkspaceId: (id: WorkspaceId) => void;
  activeWorkspace: Workspace;
};

const MenuCollapseContext = createContext<Ctx>({
  collapsed: false,
  toggle: () => {},
  menuWidth: MENU_WIDTH_EXPANDED,
  setMenuWidth: () => {},
  menuCollapsed: false,
  toggleMenu: () => {},
  activeWorkspaceId: "tanka",
  setActiveWorkspaceId: () => {},
  activeWorkspace: WORKSPACES[0],
});

export function MenuProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuWidth, setMenuWidthRaw] = useState(MENU_WIDTH_EXPANDED);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<WorkspaceId>("tanka");
  const toggle = useCallback(() => setCollapsed((c) => !c), []);

  // Clamp drag-to-resize updates within [MIN, MAX].
  const setMenuWidth = useCallback((w: number) => {
    if (Number.isNaN(w)) return;
    const clamped = Math.max(MENU_WIDTH_MIN, Math.min(MENU_WIDTH_MAX, w));
    setMenuWidthRaw(clamped);
  }, []);

  const menuCollapsed = menuWidth < MENU_COLLAPSE_THRESHOLD;

  // Toggle between the two canonical widths.
  const toggleMenu = useCallback(() => {
    setMenuWidthRaw((w) =>
      w < MENU_COLLAPSE_THRESHOLD ? MENU_WIDTH_EXPANDED : MENU_WIDTH_COLLAPSED,
    );
  }, []);

  const activeWorkspace =
    WORKSPACES.find((w) => w.id === activeWorkspaceId) ?? WORKSPACES[0];
  return (
    <MenuCollapseContext.Provider
      value={{
        collapsed,
        toggle,
        menuWidth,
        setMenuWidth,
        menuCollapsed,
        toggleMenu,
        activeWorkspaceId,
        setActiveWorkspaceId,
        activeWorkspace,
      }}
    >
      {children}
    </MenuCollapseContext.Provider>
  );
}

export function useMenuCollapse() {
  return useContext(MenuCollapseContext);
}
