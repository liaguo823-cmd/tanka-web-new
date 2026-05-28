"use client";

/**
 * Workspace / OrgRail state.
 *
 * `collapsed` controls the OrgRail (workspace rail, 60 ↔ 0).
 * Workspace switching also lives here so the Menu header can react
 * to which workspace is active.
 *
 * The Menu's own width (`menuWidth`) is intentionally NOT in this
 * context — it changes on every mousemove during the resize drag,
 * and putting it here used to re-render every consumer (OrgRail,
 * sub-nav, main content) per frame. It now lives as local state
 * inside the Menu component.
 *
 * The provider value is memoized so workspace consumers don't
 * re-render when an unrelated piece of state ticks.
 */

import {
  createContext,
  useContext,
  useMemo,
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

/** Layout constants for the Menu's resizable width.
 *
 *  The drag is snap-based, not free-form, because intermediate widths
 *  produce ugly layouts (clipped labels, oversized gutters):
 *
 *  - Below COLLAPSE_THRESHOLD the width snaps to COLLAPSED (60).
 *  - Above the threshold the width is clamped to ≥ EXPANDED (180) —
 *    that's the narrowest column the expanded layout fits in without
 *    clipping the Tanka header / divider / labels.
 *  - Beyond 180 the width follows the cursor up to MAX (240). */
export const MENU_WIDTH_COLLAPSED = 60;
export const MENU_WIDTH_EXPANDED = 180;
export const MENU_WIDTH_MIN = 60;
export const MENU_WIDTH_MAX = 240;
/** Below this width the menu snaps to the COLLAPSED layout. */
export const MENU_COLLAPSE_THRESHOLD = 120;

type Ctx = {
  /** OrgRail is collapsed (width 0). */
  collapsed: boolean;
  toggle: () => void;
  /** Currently-active workspace; clicking a tile updates this. */
  activeWorkspaceId: WorkspaceId;
  setActiveWorkspaceId: (id: WorkspaceId) => void;
  activeWorkspace: Workspace;
};

const MenuCollapseContext = createContext<Ctx>({
  collapsed: false,
  toggle: () => {},
  activeWorkspaceId: "tanka",
  setActiveWorkspaceId: () => {},
  activeWorkspace: WORKSPACES[0],
});

export function MenuProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<WorkspaceId>("tanka");
  const toggle = useCallback(() => setCollapsed((c) => !c), []);

  const value = useMemo<Ctx>(() => {
    const activeWorkspace =
      WORKSPACES.find((w) => w.id === activeWorkspaceId) ?? WORKSPACES[0];
    return {
      collapsed,
      toggle,
      activeWorkspaceId,
      setActiveWorkspaceId,
      activeWorkspace,
    };
  }, [collapsed, toggle, activeWorkspaceId]);

  return (
    <MenuCollapseContext.Provider value={value}>
      {children}
    </MenuCollapseContext.Provider>
  );
}

export function useMenuCollapse() {
  return useContext(MenuCollapseContext);
}
