"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Atom,
  BookOpen,
  BookOpenText,
  BarChart3,
  Bookmark,
  Box,
  Bell,
  Briefcase,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle,
  CheckCircle2,
  ClipboardList,
  Coins,
  Clock,
  Mail,
  ListTodo,
  Pencil,
  Rocket,
  Zap,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Circle,
  Copy,
  Download,
  FileText,
  Flag,
  Folder,
  FolderPlus,
  Image as ImageIcon,
  LayoutGrid,
  Link2,
  ListFilter,
  Maximize2,
  Megaphone,
  MessageSquare,
  Mic,
  MoreVertical,
  PanelLeftClose,
  PanelLeftOpen,
  Paperclip,
  Phone,
  Plus,
  RefreshCw,
  Scissors,
  Search,
  Settings,
  Sparkles,
  ArrowRight,
  ArrowUp,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  Users,
  Vote,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  chatItems,
  getChatConversation,
  designTeamAvatarUrl,
  flowItems,
  getFlowActionScenario,
  getFlowDetail,
  getGroupMembers,
  linkCategories,
  linkTools,
  navGroups,
  sampleConversation,
  suggestedTasks,
  workspaces,
  type ChatItem,
  type ChatMessage,
  type FlowDetail,
  type FlowItem,
  type GroupMember,
  type LinkCategoryKey,
  type LinkTool,
  type WorkspaceItem,
} from "./data";

const iconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  BookOpen,
  Box,
  MessageSquare,
  Link2,
  BookOpenText,
  Flag,
  Check,
  Calendar,
};

type NavKey =
  | "flow"
  | "sop"
  | "agent"
  | "chat"
  | "link"
  | "memos"
  | "followups"
  | "votes"
  | "calendar";
type FilterKey = "all" | "active" | "completed" | "foryou";

function hasListColumn(nav: NavKey): boolean {
  // Pages that own the full main area without the dual-column list+detail layout
  return !["link", "memos", "followups", "votes", "calendar", "sop", "agent"].includes(
    nav,
  );
}

const NAV_DEFAULT = 180;
const NAV_MIN = 160;
const NAV_MAX = 320;
const NAV_COLLAPSE_THRESHOLD = 120;
const NAV_COLLAPSED_WIDTH = 48;
const LIST_DEFAULT = 290;
const LIST_MIN = 240;
const LIST_MAX = 460;
const LIST_COLLAPSE_THRESHOLD = 180;
const LIST_COLLAPSED_WIDTH = 44;

function startColumnResize(
  e: React.MouseEvent,
  startWidth: number,
  setWidth: (w: number) => void,
  opts: {
    threshold: number;
    collapsedWidth: number;
    min: number;
    max: number;
  },
) {
  e.preventDefault();
  const startX = e.clientX;
  const onMove = (ev: MouseEvent) => {
    const next = startWidth + (ev.clientX - startX);
    if (next < opts.threshold) {
      setWidth(opts.collapsedWidth);
    } else {
      setWidth(Math.max(opts.min, Math.min(opts.max, next)));
    }
  };
  const onUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
  document.body.style.cursor = "ew-resize";
  document.body.style.userSelect = "none";
}

export default function Home() {
  const [activeWorkspace, setActiveWorkspace] = useState("t");
  const [activeNav, setActiveNav] = useState<NavKey>("flow");
  const [orgRailOpen, setOrgRailOpen] = useState(true);
  const [navWidth, setNavWidth] = useState(NAV_DEFAULT);
  const [listWidth, setListWidth] = useState(LIST_DEFAULT);
  const navCollapsed = navWidth < NAV_COLLAPSE_THRESHOLD;
  const listCollapsed = listWidth < LIST_COLLAPSE_THRESHOLD;
  const [aiAssistantOpen, setAiAssistantOpen] = useState(true);
  const [membersPanelOpen, setMembersPanelOpen] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<string | null>("1");
  const [taskInput, setTaskInput] = useState("");
  const [openedConversation, setOpenedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(sampleConversation);
  const [chatInput, setChatInput] = useState("");
  const suggestionIdx = 0;

  const listLabel = activeNav === "chat" ? "Chat" : "Flow";

  const filteredFlow = useMemo<FlowItem[]>(() => {
    const term = search.trim().toLowerCase();
    return flowItems.filter((item) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && item.status === "active") ||
        (filter === "completed" && item.status === "completed") ||
        (filter === "foryou" && item.forYou);
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.preview.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const filteredChat = useMemo<ChatItem[]>(() => {
    const term = search.trim().toLowerCase();
    return chatItems.filter(
      (c) =>
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.preview.toLowerCase().includes(term),
    );
  }, [search]);

  const groupedFlowItems = useMemo(() => {
    const groups: Record<string, FlowItem[]> = {};
    for (const item of filteredFlow) {
      groups[item.month] = groups[item.month] || [];
      groups[item.month].push(item);
    }
    return Object.entries(groups).map(([month, items]) => ({ month, items }));
  }, [filteredFlow]);

  const groupedChatItems = useMemo(() => {
    const pinned = filteredChat.filter((c) => c.pinned);
    const today = filteredChat.filter((c) => !c.pinned);
    return { pinned, today };
  }, [filteredChat]);

  function handleNavSelect(next: NavKey) {
    setActiveNav(next);
    if (next === "chat") {
      setOpenedConversation("design-team");
      setSelectedItemId("design-team");
      setMessages(getChatConversation("design-team"));
    } else {
      setOpenedConversation(null);
      setSelectedItemId(null);
    }
  }

  function handleTaskSubmit() {
    if (!taskInput.trim()) return;
    setOpenedConversation("new-task");
    setSelectedItemId(null);
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([
      {
        id: `u-${Date.now()}`,
        text: taskInput.trim(),
        time: now,
        self: true,
      },
      {
        id: `a-${Date.now() + 1}`,
        author: "Tanka",
        authorInitials: "T",
        authorColor: "#26201c",
        text: "Got it — I'll start working on that. Want me to pull in any specific data sources?",
        time: now,
      },
    ]);
    setTaskInput("");
  }

  function handleChatSend() {
    if (!chatInput.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      text: chatInput.trim(),
      time: now,
      self: true,
    };
    setMessages((m) => [...m, newMsg]);
    setChatInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          author: "Tanka",
          authorInitials: "T",
          authorColor: "#26201c",
          text: "Thanks — pulling that together now.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 700);
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-warm-bg-2 text-warm-black">
      {orgRailOpen && (
        <WorkspaceRail
          active={activeWorkspace}
          onSelect={setActiveWorkspace}
          onCollapse={() => setOrgRailOpen(false)}
        />
      )}
      <NavSidebar
        active={activeNav}
        onSelect={handleNavSelect}
        workspace={workspaces.find((w) => w.id === activeWorkspace) ?? workspaces[1]}
        orgRailOpen={orgRailOpen}
        onToggleOrgRail={() => setOrgRailOpen((v) => !v)}
        width={navWidth}
        collapsed={navCollapsed}
        onToggleCollapsed={() =>
          setNavWidth(navCollapsed ? NAV_DEFAULT : NAV_COLLAPSED_WIDTH)
        }
        onResize={(e) =>
          startColumnResize(e, navWidth, setNavWidth, {
            threshold: NAV_COLLAPSE_THRESHOLD,
            collapsedWidth: NAV_COLLAPSED_WIDTH,
            min: NAV_MIN,
            max: NAV_MAX,
          })
        }
      />
      {hasListColumn(activeNav) && (
        <ListColumn
          label={listLabel}
          search={search}
          onSearchChange={setSearch}
          activeNav={activeNav}
          filter={filter}
          onFilterChange={setFilter}
          groupedFlowItems={groupedFlowItems}
          groupedChatItems={groupedChatItems}
          selectedItemId={openedConversation ?? selectedItemId}
          onSelect={(id) => {
            setSelectedItemId(id);
            setOpenedConversation(id);
            setMessages(
              activeNav === "chat" ? getChatConversation(id) : sampleConversation,
            );
          }}
          width={listWidth}
          collapsed={listCollapsed}
          onToggleCollapsed={() =>
            setListWidth(listCollapsed ? LIST_DEFAULT : LIST_COLLAPSED_WIDTH)
          }
          onResize={(e) =>
            startColumnResize(e, listWidth, setListWidth, {
              threshold: LIST_COLLAPSE_THRESHOLD,
              collapsedWidth: LIST_COLLAPSED_WIDTH,
              min: LIST_MIN,
              max: LIST_MAX,
            })
          }
        />
      )}
      <main className="flex-1 min-w-0 relative">
        {activeNav === "link" ? (
          <LinkPage />
        ) : activeNav === "memos" ? (
          <PlaceholderPage title="Memos" subtitle="Notes you save from chats and flows" />
        ) : activeNav === "followups" ? (
          <FollowUpsPage />
        ) : activeNav === "votes" ? (
          <PlaceholderPage title="Votes" subtitle="Team decisions and quick polls" />
        ) : activeNav === "calendar" ? (
          <CalendarPage />
        ) : activeNav === "sop" ? (
          <SopsPage />
        ) : activeNav === "agent" ? (
          <AgentPage />
        ) : activeNav === "chat" ? (
          <ConversationView
            messages={messages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            onSend={handleChatSend}
            isChat
            chat={chatItems.find((c) => c.id === (openedConversation ?? "design-team"))}
            aiAssistantOpen={aiAssistantOpen}
            onToggleAiAssistant={() => {
              setAiAssistantOpen((v) => !v);
              if (membersPanelOpen) setMembersPanelOpen(false);
            }}
            membersPanelOpen={membersPanelOpen}
            onToggleMembersPanel={() => {
              setMembersPanelOpen((v) => !v);
              if (aiAssistantOpen) setAiAssistantOpen(false);
            }}
            onClose={() => {
              setOpenedConversation(null);
              setSelectedItemId(null);
            }}
          />
        ) : openedConversation && flowItems.find((f) => f.id === openedConversation) ? (
          <FlowDetailView
            detail={getFlowDetail(flowItems.find((f) => f.id === openedConversation)!)}
            chatInput={chatInput}
            setChatInput={setChatInput}
            onSend={handleChatSend}
            onClose={() => {
              setOpenedConversation(null);
              setSelectedItemId(null);
            }}
          />
        ) : (
          <EmptyTaskView
            value={taskInput}
            onChange={setTaskInput}
            onSubmit={handleTaskSubmit}
            suggestion={suggestedTasks[suggestionIdx]}
          />
        )}
      </main>
    </div>
  );
}

/* ===========================
 * Workspace rail (40px)
 * =========================== */
function TankaLogo({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 258 229"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M72.5 228.126V187.545H0L72.5 228.126Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 130.784L257.778 130.733L257.766 187.546H0V130.784Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 65.8042H257.778V122.617H0V65.8042Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.874023H185.278V57.6868H0V0.874023Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WorkspaceRail({
  active,
  onSelect,
  onCollapse,
}: {
  active: string;
  onSelect: (id: string) => void;
  onCollapse: () => void;
}) {
  return (
    <aside className="w-10 shrink-0 bg-warm-bg border-r border-warm-gray-2 flex flex-col items-center pb-3 relative">
      <div className="h-[60px] w-full flex items-center justify-center shrink-0">
        <button
          onClick={onCollapse}
          className="group/tanka relative w-[28px] h-[28px] flex items-center justify-center text-warm-black hover:bg-warm-gray-2/60 rounded-md transition-colors"
          title="Hide organizations"
        >
          <span className="flex items-center justify-center transition-opacity group-hover/tanka:opacity-0">
            <TankaLogo />
          </span>
          <ChevronsLeft
            className="absolute w-4 h-4 text-warm-2 opacity-0 transition-opacity group-hover/tanka:opacity-100"
            strokeWidth={2}
          />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center gap-2 w-full">
        {workspaces.map((ws) => {
          const isActive = ws.id === active;
          return (
            <div
              key={ws.id}
              className="relative w-full flex items-center justify-center"
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-warm-black rounded-r-full" />
              )}
              <button
                onClick={() => onSelect(ws.id)}
                className={`relative w-[32px] h-[32px] rounded-[10px] flex items-center justify-center text-[11px] font-bold overflow-visible transition-all ${
                  isActive
                    ? "ring-2 ring-warm-black/25 shadow-[0_2px_6px_rgba(38,32,28,0.18)]"
                    : "opacity-55 hover:opacity-100"
                }`}
                style={
                  ws.avatar
                    ? undefined
                    : { background: ws.color, color: ws.textColor ?? "#fff" }
                }
                title={ws.name}
              >
                {ws.avatar ? (
                  <img
                    src={ws.avatar}
                    alt={ws.name}
                    className="w-full h-full rounded-[10px] object-cover"
                  />
                ) : (
                  ws.letter
                )}
                {ws.badge ? (
                  <span className="absolute -top-1 -right-1 z-10 bg-[#dc3545] text-white text-[9px] font-bold leading-none rounded-full min-w-[14px] h-[14px] px-[3px] flex items-center justify-center ring-2 ring-warm-bg">
                    {ws.badge}
                  </span>
                ) : null}
              </button>
            </div>
          );
        })}

        <div className="w-4 border-t border-warm-gray-2 my-1" />

        <button
          className="w-[32px] h-[32px] rounded-[10px] border-[1.5px] border-dashed border-warm-gray-2 flex items-center justify-center text-warm-2 hover:border-warm-border hover:text-warm-black"
          title="Add workspace"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <button
        className="w-[35px] h-[35px] rounded-lg flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/50"
        title="Settings"
      >
        <Settings className="w-4 h-4" strokeWidth={1.8} />
      </button>
    </aside>
  );
}

function navCreateMenu(itemId: string): MenuSection[] | null {
  switch (itemId) {
    case "flow":
      return [
        {
          title: "Create",
          items: [
            {
              id: "new-flow",
              label: "New flow",
              description: "Start a task with Tanka",
              icon: Workflow,
            },
            {
              id: "new-sop",
              label: "New SOP",
              description: "Capture a reusable procedure",
              icon: BookOpen,
            },
          ],
        },
      ];
    case "chat":
      return [
        {
          title: "Create",
          items: [
            { id: "new-chat", label: "New chat", icon: MessageSquare },
            { id: "new-group", label: "New group", icon: Users },
            { id: "new-broadcast", label: "New broadcast", icon: Megaphone },
          ],
        },
      ];
    case "memos":
      return [
        {
          items: [
            {
              id: "new-memo",
              label: "New memo",
              description: "Save a note",
              icon: FileText,
            },
          ],
        },
      ];
    case "followups":
      return [
        {
          items: [
            {
              id: "new-followup",
              label: "New follow-up",
              description: "Track something for later",
              icon: Flag,
            },
          ],
        },
      ];
    case "votes":
      return [
        {
          items: [
            {
              id: "new-vote",
              label: "New vote",
              description: "Ask the team to decide",
              icon: Vote,
            },
          ],
        },
      ];
    case "calendar":
      return [
        {
          items: [
            {
              id: "new-event",
              label: "New event",
              description: "Schedule a meeting",
              icon: Calendar,
            },
          ],
        },
      ];
    case "link":
      return [
        {
          items: [
            {
              id: "new-connector",
              label: "Add connector",
              description: "Bring data in from anywhere",
              icon: Link2,
            },
          ],
        },
      ];
    default:
      return null;
  }
}

function NavRow({
  icon: Icon,
  label,
  active,
  onClick,
  createMenu,
  indent,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
  createMenu?: MenuSection[] | null;
  indent?: boolean;
}) {
  return (
    <div
      className={`group/nav relative w-[156px] mx-3 h-9 rounded-lg flex items-center text-[14px] font-medium transition-colors ${
        active ? "bg-warm-gray-2 text-warm-black" : "text-warm-black hover:bg-warm-gray-2/60"
      }`}
    >
      <button
        onClick={onClick}
        className={`flex-1 flex items-center gap-2.5 h-full min-w-0 ${
          indent ? "pl-7 pr-2" : "px-2.5"
        }`}
      >
        <Icon
          className="w-[18px] h-[18px] shrink-0"
          style={{ color: active ? "#26201c" : "#56534E" }}
          strokeWidth={1.6}
        />
        <span className="flex-1 text-left truncate">{label}</span>
      </button>
      {createMenu && (
        <DropdownTrigger sections={createMenu} align="right-of-trigger" width={240}>
          {({ open, toggle }) => (
            <button
              onClick={toggle}
              className={`w-5 h-5 mr-1.5 rounded flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-bg ${
                open ? "bg-warm-bg text-warm-black opacity-100" : "opacity-0 group-hover/nav:opacity-100"
              }`}
              title={`New ${label.toLowerCase()}`}
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          )}
        </DropdownTrigger>
      )}
    </div>
  );
}

/* ===========================
 * Nav sidebar (180px)
 * =========================== */
function NavSidebar({
  active,
  onSelect,
  workspace,
  orgRailOpen,
  onToggleOrgRail,
  width,
  collapsed,
  onToggleCollapsed,
  onResize,
}: {
  active: NavKey;
  onSelect: (k: NavKey) => void;
  workspace: WorkspaceItem;
  orgRailOpen: boolean;
  onToggleOrgRail: () => void;
  width: number;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onResize: (e: React.MouseEvent) => void;
}) {
  if (collapsed)
    return (
      <NavSidebarCollapsed
        active={active}
        onSelect={onSelect}
        workspace={workspace}
        onExpand={onToggleCollapsed}
        onToggleOrgRail={onToggleOrgRail}
        onResize={onResize}
      />
    );

  return (
    <aside
      style={{ width }}
      className="group/navside relative shrink-0 bg-warm-bg border-r border-warm-gray-2 flex flex-col h-screen"
    >
      <div className="h-[60px] flex items-stretch gap-0">
        {!orgRailOpen && (
          <button
            onClick={onToggleOrgRail}
            className="w-8 h-full flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/40 transition-colors shrink-0"
            title="Show organizations"
          >
            <ChevronsRight className="w-4 h-4" strokeWidth={2} />
          </button>
        )}
        <button className={`flex-1 min-w-0 h-full flex items-center justify-between gap-2 ${orgRailOpen ? "px-3" : "pl-1 pr-3"} hover:bg-warm-gray-2/40 transition-colors`}>
          <div className="flex items-center gap-2 min-w-0">
            {workspace.avatar ? (
              <img
                src={workspace.avatar}
                alt={workspace.name}
                className="w-7 h-7 rounded-lg object-cover shrink-0"
              />
            ) : (
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                style={{
                  background: workspace.color,
                  color: workspace.textColor ?? "#fff",
                  border:
                    workspace.color.toLowerCase() === "#ffffff"
                      ? "1px solid var(--color-warm-gray-2)"
                      : undefined,
                }}
              >
                {workspace.letter}
              </span>
            )}
            <span className="text-[14px] font-medium text-warm-black truncate">
              {workspace.name}
            </span>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-warm-2 shrink-0" />
        </button>
      </div>

      <div className="border-t border-warm-gray-2 mx-3" />

      <nav className="flex-1 overflow-y-auto pt-3.5 scrollbar-thin">
        {navGroups.map((group, idx) => (
          <div key={group.id}>
            {idx > 0 && <div className="border-t border-warm-gray-2 mx-3 my-3.5" />}
            <ul className="space-y-0">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] ?? LayoutGrid;
                const isActive = item.id === active;
                const hasChildren = item.children && item.children.length > 0;
                return (
                  <li key={item.id}>
                    <NavRow
                      icon={Icon}
                      label={item.label}
                      active={isActive}
                      onClick={() => onSelect(item.id as NavKey)}
                      createMenu={navCreateMenu(item.id)}
                    />
                    {hasChildren && (
                      <ul className="mt-0.5">
                        {item.children!.map((child) => {
                          const ChildIcon = iconMap[child.icon] ?? Box;
                          const isChildActive = child.id === active;
                          return (
                            <li key={child.id}>
                              <NavRow
                                icon={ChildIcon}
                                label={child.label}
                                active={isChildActive}
                                onClick={() => onSelect(child.id as NavKey)}
                                indent
                              />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-warm-gray-2" />

      <div className="h-[60px] flex items-stretch gap-0">
        <button className="flex-1 min-w-0 h-full flex items-center justify-between gap-2 px-3 hover:bg-warm-gray-2/40 transition-colors">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-7 h-7 rounded-full bg-[#827d73] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
              YG
            </span>
            <span className="text-[14px] font-medium text-warm-black truncate">yiran guo</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-warm-2 shrink-0" />
        </button>
        <button
          onClick={onToggleCollapsed}
          title="Hide navigation"
          className="w-9 flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/40 transition-opacity opacity-0 group-hover/navside:opacity-100 shrink-0"
        >
          <PanelLeftClose className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </div>
      <div
        onMouseDown={onResize}
        title="Drag to resize"
        className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-warm-black/10 active:bg-warm-black/15 transition-colors z-20"
      />
    </aside>
  );
}

function NavSidebarCollapsed({
  active,
  onSelect,
  workspace,
  onExpand,
  onToggleOrgRail,
  onResize,
}: {
  active: NavKey;
  onSelect: (k: NavKey) => void;
  workspace: WorkspaceItem;
  onExpand: () => void;
  onToggleOrgRail: () => void;
  onResize: (e: React.MouseEvent) => void;
}) {
  const flat: { id: NavKey; label: string; icon: LucideIcon }[] = [];
  for (const g of navGroups) {
    for (const it of g.items) {
      flat.push({ id: it.id as NavKey, label: it.label, icon: iconMap[it.icon] ?? LayoutGrid });
      if (it.children) {
        for (const c of it.children) {
          flat.push({ id: c.id as NavKey, label: c.label, icon: iconMap[c.icon] ?? Box });
        }
      }
    }
  }

  return (
    <aside className="group/navside relative w-12 shrink-0 bg-warm-bg border-r border-warm-gray-2 flex flex-col h-screen items-center">
      <div className="h-[60px] flex items-center justify-center">
        <button
          onClick={onToggleOrgRail}
          title={`Toggle organizations (${workspace.name})`}
          className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center text-[10px] font-bold hover:opacity-80 transition-opacity"
          style={
            workspace.avatar
              ? undefined
              : {
                  background: workspace.color,
                  color: workspace.textColor ?? "#fff",
                  border:
                    workspace.color.toLowerCase() === "#ffffff"
                      ? "1px solid var(--color-warm-gray-2)"
                      : undefined,
                }
          }
        >
          {workspace.avatar ? (
            <img
              src={workspace.avatar}
              alt={workspace.name}
              className="w-full h-full object-cover"
            />
          ) : (
            workspace.letter
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto pt-3.5 scrollbar-thin w-full">
        <ul className="space-y-0 flex flex-col items-center">
          {flat.map((it) => {
            const isActive = it.id === active;
            return (
              <li key={it.id}>
                <button
                  onClick={() => onSelect(it.id)}
                  title={it.label}
                  className={`w-8 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-warm-gray-2 text-warm-black"
                      : "text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/60"
                  }`}
                >
                  <it.icon className="w-4 h-4" strokeWidth={1.8} />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="pb-2 flex items-center justify-center">
        <button
          onClick={onExpand}
          title="Show menu"
          className="w-6 h-6 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/60 transition-colors"
        >
          <PanelLeftOpen className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </div>
      <div className="border-t border-warm-gray-2 w-full" />
      <div className="h-[60px] w-full flex items-center justify-center hover:bg-warm-gray-2/40 transition-colors">
        <span className="w-7 h-7 rounded-full bg-[#827d73] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
          YG
        </span>
      </div>
      <div
        onMouseDown={onResize}
        title="Drag to resize"
        className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-warm-black/10 active:bg-warm-black/15 transition-colors z-20"
      />
    </aside>
  );
}

/* ===========================
 * List column (290px)
 * =========================== */
function ListColumn({
  label,
  search,
  onSearchChange,
  activeNav,
  filter,
  onFilterChange,
  groupedFlowItems,
  groupedChatItems,
  selectedItemId,
  onSelect,
  width,
  collapsed,
  onToggleCollapsed,
  onResize,
}: {
  label: string;
  search: string;
  onSearchChange: (s: string) => void;
  activeNav: NavKey;
  filter: FilterKey;
  onFilterChange: (f: FilterKey) => void;
  groupedFlowItems: Array<{ month: string; items: FlowItem[] }>;
  groupedChatItems: { pinned: ChatItem[]; today: ChatItem[] };
  selectedItemId: string | null;
  onSelect: (id: string) => void;
  width: number;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onResize: (e: React.MouseEvent) => void;
}) {
  if (collapsed) {
    return (
      <section className="relative w-11 shrink-0 bg-warm-bg-2 border-r border-warm-gray-2 flex flex-col items-center">
        <div className="h-[60px] flex items-center">
          <button
            onClick={onToggleCollapsed}
            title={`Show ${activeNav === "chat" ? "Chat" : "Flow"} list`}
            className="w-7 h-7 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/60 transition-colors"
          >
            <ChevronsRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
        <div
          onMouseDown={onResize}
          title="Drag to resize"
          className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-warm-black/10 active:bg-warm-black/15 transition-colors z-20"
        />
      </section>
    );
  }
  const filters: { id: FilterKey; label: string }[] =
    activeNav === "chat"
      ? [
          { id: "all", label: "Starred" },
          { id: "active", label: "Archived" },
          { id: "completed", label: "Groups" },
          { id: "foryou", label: "@" },
        ]
      : [
          { id: "all", label: "All" },
          { id: "active", label: "Active" },
          { id: "completed", label: "Completed" },
          { id: "foryou", label: "For you" },
        ];

  const newMenuSections: MenuSection[] =
    activeNav === "chat"
      ? [
          {
            title: "Create",
            items: [
              {
                id: "new-chat",
                label: "New chat",
                description: "Start a 1:1 conversation",
                icon: MessageSquare,
              },
              {
                id: "new-group",
                label: "New group",
                description: "Channel for a project or team",
                icon: Users,
              },
              {
                id: "new-broadcast",
                label: "New broadcast",
                description: "Announcement to many people",
                icon: Megaphone,
              },
            ],
          },
          {
            items: [
              { id: "new-folder", label: "New folder", icon: FolderPlus },
            ],
          },
        ]
      : [
          {
            title: "Create",
            items: [
              {
                id: "new-flow",
                label: "New flow",
                description: "Start a task with Tanka",
                icon: Workflow,
              },
              {
                id: "new-sop",
                label: "New SOP",
                description: "Capture a reusable procedure",
                icon: BookOpen,
              },
            ],
          },
          {
            items: [
              { id: "new-folder", label: "New folder", icon: FolderPlus },
            ],
          },
        ];

  return (
    <section
      style={{ width }}
      className="relative shrink-0 bg-warm-bg-2 border-r border-warm-gray-2 flex flex-col h-screen"
    >
      <div className="px-3.5 pt-0">
        <div className="h-[60px] flex items-center justify-between">
          <h2 className="text-base font-medium tracking-tight">{label}</h2>
          <div className="flex items-center gap-1 text-warm-2">
            {activeNav === "chat" ? (
              <>
                <button
                  className="w-7 h-7 rounded-md hover:bg-warm-gray-2/60 flex items-center justify-center"
                  title="Filter"
                >
                  <Atom className="w-[18px] h-[18px]" strokeWidth={1.6} />
                </button>
                <button
                  className="w-7 h-7 rounded-md hover:bg-warm-gray-2/60 flex items-center justify-center"
                  title="Members"
                >
                  <Users className="w-[18px] h-[18px]" strokeWidth={1.6} />
                </button>
              </>
            ) : (
              <button
                className="w-7 h-7 rounded-md hover:bg-warm-gray-2/60 flex items-center justify-center"
                title="New folder"
              >
                <FolderPlus className="w-[18px] h-[18px]" strokeWidth={1.6} />
              </button>
            )}
            <DropdownTrigger sections={newMenuSections} align="right" width={240}>
              {({ open, toggle }) => (
                <button
                  onClick={toggle}
                  className={`w-7 h-7 rounded-md flex items-center justify-center ${
                    open ? "bg-warm-gray-2 text-warm-black" : "hover:bg-warm-gray-2/60"
                  }`}
                  title="New"
                >
                  <Plus className="w-[18px] h-[18px]" strokeWidth={1.6} />
                </button>
              )}
            </DropdownTrigger>
          </div>
        </div>

        <div className="h-9 mb-3 rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2">
          <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
          />
        </div>
      </div>

      <div className="px-3.5 flex items-center gap-px mb-2">
        {filters.map((f) => {
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              className={`px-2.5 py-[5px] text-[12px] font-medium rounded-full transition-colors ${
                isActive
                  ? "bg-warm-base text-warm-black"
                  : "text-warm-2 hover:bg-warm-base/60"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 scrollbar-thin">
        {activeNav === "chat" ? (
          <>
            {groupedChatItems.pinned.length > 0 && (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-warm-border font-medium px-1 pt-3 pb-2.5">
                  Pinned
                </div>
                <ul className="space-y-1">
                  {groupedChatItems.pinned.map((item) => (
                    <ChatRow
                      key={item.id}
                      item={item}
                      selected={selectedItemId === item.id}
                      onClick={() => onSelect(item.id)}
                    />
                  ))}
                </ul>
              </div>
            )}
            {groupedChatItems.today.length > 0 && (
              <div className="mt-3">
                <div className="text-[11px] uppercase tracking-wider text-warm-border font-medium px-1 pt-1 pb-2.5">
                  Today
                </div>
                <ul className="space-y-1">
                  {groupedChatItems.today.map((item) => (
                    <ChatRow
                      key={item.id}
                      item={item}
                      selected={selectedItemId === item.id}
                      onClick={() => onSelect(item.id)}
                    />
                  ))}
                </ul>
              </div>
            )}
            {groupedChatItems.pinned.length === 0 &&
              groupedChatItems.today.length === 0 && <EmptyList />}
          </>
        ) : (
          <>
            {groupedFlowItems.length === 0 && <EmptyList />}
            {groupedFlowItems.map((group) => (
              <div key={group.month}>
                <div className="text-[11px] uppercase tracking-wider text-warm-border font-medium px-1 pt-3 pb-2.5">
                  {group.month}
                </div>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isSelected = item.id === selectedItemId;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => onSelect(item.id)}
                          className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                            isSelected ? "bg-warm-base" : "hover:bg-warm-base/60"
                          }`}
                        >
                          <p className="text-[13px] truncate text-warm-black mb-1">
                            {item.title}
                          </p>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[12px] text-warm-2 truncate">{item.preview}</p>
                            {item.unread && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                            )}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
      <div
        onMouseDown={onResize}
        title="Drag to resize"
        className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-warm-black/10 active:bg-warm-black/15 transition-colors z-20"
      />
    </section>
  );
}

function GroupAvatar({
  color,
  size = 36,
}: {
  color: string;
  size?: number;
}) {
  // Reference style: solid colored circle with a Users icon,
  // plus a slightly offset paler duplicate behind for the "group" stacked look.
  const innerIcon = size * 0.5;
  const offset = Math.max(4, Math.round(size * 0.22));
  return (
    <span
      className="relative inline-block shrink-0"
      style={{ width: size + offset, height: size + offset }}
    >
      {/* back ghost circle */}
      <span
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: color,
          opacity: 0.32,
          top: 0,
          right: 0,
        }}
      />
      {/* front solid circle */}
      <span
        className="absolute rounded-full flex items-center justify-center text-white"
        style={{
          width: size,
          height: size,
          background: color,
          bottom: 0,
          left: 0,
        }}
      >
        <Users
          style={{ width: innerIcon, height: innerIcon }}
          strokeWidth={2}
        />
      </span>
    </span>
  );
}

function ChatRow({
  item,
  selected,
  onClick,
}: {
  item: ChatItem;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full text-left rounded-lg px-3 py-2.5 flex gap-3 items-center transition-colors ${
          selected ? "bg-warm-base" : "hover:bg-warm-base/60"
        }`}
      >
        {item.isGroup ? (
          <GroupAvatar color={item.avatarColor} size={36} />
        ) : item.avatarUrl ? (
          <img
            src={item.avatarUrl}
            alt={item.name}
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
        ) : (
          <span
            className="w-9 h-9 rounded-full text-white text-[12px] font-semibold flex items-center justify-center shrink-0"
            style={{ background: item.avatarColor }}
          >
            {item.avatar}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-[13px] truncate text-warm-black">{item.name}</p>
            <span className="text-[11px] text-warm-2 shrink-0">{item.time}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[12px] text-warm-2 truncate">{item.preview}</p>
            {item.unread && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
            )}
          </div>
        </div>
      </button>
    </li>
  );
}

function EmptyList() {
  return <div className="text-center text-warm-2 text-xs py-10">No results</div>;
}

/* ===========================
 * Main content - empty state
 * =========================== */
function EmptyTaskView({
  value,
  onChange,
  onSubmit,
  suggestion,
}: {
  value: string;
  onChange: (s: string) => void;
  onSubmit: () => void;
  suggestion: string;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Tab" && !value) {
      e.preventDefault();
      onChange(suggestion);
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className="h-full w-full bg-warm-bg-2 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[740px] -mt-12">
        <h1 className="text-center text-[36px] leading-[40px] font-semibold tracking-tight mb-6">
          Your task today?
        </h1>

        <div
          className="rounded-3xl border border-warm-gray-2 bg-white shadow-[0_1px_1.5px_rgba(38,32,28,0.02),0_4px_6px_rgba(38,32,28,0.02)] p-4"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(254,254,253) 33%, rgb(253,253,252) 66%, rgb(252,252,250) 100%)",
          }}
        >
          <div className="relative min-h-[28px]">
            <textarea
              ref={inputRef}
              autoFocus
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              className="w-full bg-transparent text-[16px] leading-6 outline-none resize-none placeholder:text-transparent"
              placeholder="Start your task..."
            />
            {!value && (
              <div className="absolute left-0 top-0 flex items-center gap-2 pointer-events-none">
                <span className="text-warm-2 text-[16px]">Start your task...</span>
                <span className="bg-warm-base px-1.5 py-0.5 rounded text-[10px] font-semibold text-warm-2">
                  TAB
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1.5">
              <ComposerOutlineBtn title="Add content">
                <Plus className="w-4 h-4" strokeWidth={1.8} />
              </ComposerOutlineBtn>
              <ComposerOutlineBtn title="AI suggestions">
                <Sparkles className="w-4 h-4" strokeWidth={1.8} />
              </ComposerOutlineBtn>
            </div>
            <SendBtn onClick={onSubmit} disabled={!value.trim()} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===========================
 * Members side panel (Feishu-style)
 * =========================== */
function MembersPanel({
  members,
  memberCount,
  groupName,
  onClose,
}: {
  members: GroupMember[];
  memberCount: number;
  groupName: string;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    (m.role ?? "").toLowerCase().includes(query.toLowerCase()),
  );
  const statusColor: Record<NonNullable<GroupMember["status"]>, string> = {
    online: "#10b981",
    away: "#f59e0b",
    offline: "#a1a1aa",
  };
  // Convention: first member is owner, second is admin (for the demo).
  const ownerId = members[0]?.id;
  const adminId = members[1]?.id;

  return (
    <aside className="w-[320px] shrink-0 border-l border-warm-gray-2 bg-warm-bg-2 flex flex-col">
      <div className="h-[60px] pl-[10px] pr-4 flex items-center gap-2 text-warm-black">
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-warm-gray-2/60 text-warm-2 hover:text-warm-black"
          title="Hide members"
        >
          <PanelLeftClose className="w-4 h-4" strokeWidth={1.8} />
        </button>
        <span className="text-[14px] font-medium">Members</span>
        <span className="text-[12px] text-warm-2">· {memberCount}</span>
      </div>

      <div className="px-4 pb-3">
        <div className="h-9 px-3 flex items-center gap-2 rounded-lg bg-white border border-warm-gray-2">
          <Search className="w-3.5 h-3.5 text-warm-2" strokeWidth={2} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${groupName} members`}
            className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
          />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin">
        {filtered.map((m) => {
          const tag =
            m.id === ownerId ? "Owner" : m.id === adminId ? "Admin" : null;
          return (
            <li key={m.id}>
              <button className="w-full text-left rounded-lg px-2 py-2 flex items-center gap-2.5 hover:bg-warm-gray-2/40 transition-colors">
                <span className="relative shrink-0">
                  {m.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.avatarUrl}
                      alt={m.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="w-8 h-8 rounded-full text-white text-[11px] font-semibold flex items-center justify-center"
                      style={{ background: m.avatarColor }}
                    >
                      {m.initials}
                    </span>
                  )}
                  {m.status && (
                    <span
                      className="absolute -bottom-0 -right-0 w-[9px] h-[9px] rounded-full ring-2 ring-warm-bg-2"
                      style={{ background: statusColor[m.status] }}
                    />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] text-warm-black truncate">{m.name}</p>
                    {tag && (
                      <span
                        className={`shrink-0 text-[10px] leading-none px-1.5 py-[3px] rounded ${
                          tag === "Owner"
                            ? "bg-[#fdf5e0] text-[#a26b00]"
                            : "bg-[#eaf2fc] text-[#1a6fd3]"
                        }`}
                      >
                        {tag}
                      </span>
                    )}
                  </div>
                  {m.role && (
                    <p className="text-[11px] text-warm-2 truncate mt-0.5">{m.role}</p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="py-10 text-center text-[12px] text-warm-2">No matches</li>
        )}
      </ul>
    </aside>
  );
}

/* ===========================
 * Conversation view
 * =========================== */
function ConversationView({
  messages,
  chatInput,
  setChatInput,
  onSend,
  isChat,
  chat,
  aiAssistantOpen,
  onToggleAiAssistant,
  membersPanelOpen,
  onToggleMembersPanel,
  onClose,
}: {
  messages: ChatMessage[];
  chatInput: string;
  setChatInput: (s: string) => void;
  onSend: () => void;
  isChat: boolean;
  chat?: ChatItem;
  aiAssistantOpen: boolean;
  onToggleAiAssistant: () => void;
  membersPanelOpen: boolean;
  onToggleMembersPanel: () => void;
  onClose: () => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const headerName = isChat ? chat?.name ?? "Chat" : "New task";
  const isGroupChat = isChat && !!chat?.isGroup;
  const members = isGroupChat && chat ? getGroupMembers(chat.id) : [];
  const memberCount = chat?.memberCount ?? members.length;

  // Tone overrides (local to this view; cleared on chat switch by remount)
  const [messageTones, setMessageTones] = useState<
    Record<string, ChatMessage["tone"] | null>
  >({});
  // Reset when chat changes
  useEffect(() => {
    setMessageTones({});
  }, [chat?.id]);
  const [actionMenu, setActionMenu] = useState<
    { messageId: string; rect: DOMRect } | null
  >(null);
  const [highlightModal, setHighlightModal] = useState<{
    messageId: string;
  } | null>(null);

  return (
    <div className="h-screen w-full flex bg-warm-bg-2">
      <div className="flex-1 min-w-0 flex flex-col">
      <div className="h-[60px] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          {isGroupChat && chat ? (
            <GroupAvatar color={chat.avatarColor} size={32} />
          ) : isChat && chat?.avatarUrl ? (
            <img
              src={chat.avatarUrl}
              alt={chat.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : isChat && chat ? (
            <span
              className="w-8 h-8 rounded-full text-white text-[12px] font-semibold flex items-center justify-center"
              style={{ background: chat.avatarColor }}
            >
              {chat.avatar}
            </span>
          ) : (
            <span className="w-8 h-8 rounded-full bg-[#7c6fb8] text-white text-[12px] font-semibold flex items-center justify-center">
              T
            </span>
          )}
          {isGroupChat ? (
            <div className="leading-tight min-w-0">
              <p className="text-base truncate">{headerName}</p>
              <button
                onClick={onToggleMembersPanel}
                title="View group members"
                className={`mt-0.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] transition-colors ${
                  membersPanelOpen
                    ? "bg-warm-gray-2 text-warm-black"
                    : "text-warm-2 hover:bg-warm-base hover:text-warm-black"
                }`}
              >
                <Users className="w-3 h-3" strokeWidth={2} />
                <span className="tabular-nums">{memberCount} members</span>
              </button>
            </div>
          ) : (
            <div className="leading-tight min-w-0">
              <p className="text-base truncate">{headerName}</p>
              <p className="text-[11px] text-warm-2">
                {isChat ? "Online" : "Tanka assistant"}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-warm-2">
          <IconBtn title="Call">
            <Phone className="w-4 h-4" strokeWidth={1.8} />
          </IconBtn>
          <IconBtn title="Search">
            <Search className="w-4 h-4" strokeWidth={1.8} />
          </IconBtn>
          <IconBtn title="Filter">
            <ListFilter className="w-4 h-4" strokeWidth={1.8} />
          </IconBtn>
          <button
            onClick={onToggleAiAssistant}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-warm-base"
            title={aiAssistantOpen ? "Hide AI Assistant" : "Show AI Assistant"}
          >
            <SiriOrb />
          </button>
          {!isChat && (
            <button
              onClick={onClose}
              className="text-[12px] text-warm-2 hover:text-warm-black ml-2"
              title="Back"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        {/* Top gradient fade overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-warm-bg-2 to-transparent z-10" />
        <div className="h-full overflow-y-auto px-8 py-6 scrollbar-thin scroll-smooth">
          <div className="max-w-[680px] mx-auto space-y-6">
            {messages.map((m, idx) => (
              <Message
                key={m.id}
                message={m}
                prev={messages[idx - 1]}
                toneOverride={
                  m.id in messageTones ? messageTones[m.id] : undefined
                }
                onOpenMenu={
                  m.self
                    ? (id, rect) => setActionMenu({ messageId: id, rect })
                    : undefined
                }
              />
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      <div className="px-8 pb-6 pt-2">
        <div className="max-w-[768px] mx-auto">
          <div
            className="rounded-2xl border border-warm-gray-2 bg-white shadow-[0_1px_1.5px_rgba(38,32,28,0.02),0_4px_6px_rgba(38,32,28,0.02)] p-3"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(254,254,253) 33%, rgb(253,253,252) 66%, rgb(252,252,250) 100%)",
            }}
          >
            <div className="relative min-h-[24px]">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSend();
                  }
                }}
                rows={1}
                placeholder="Start your task..."
                className="w-full bg-transparent text-[15px] leading-6 outline-none resize-none placeholder:text-transparent"
              />
              {!chatInput && (
                <div className="absolute left-0 top-0 flex items-center gap-2 pointer-events-none">
                  <span className="text-warm-2 text-[15px]">Start your task...</span>
                  <span className="bg-warm-base px-1.5 py-0.5 rounded text-[10px] font-semibold text-warm-2">
                    TAB
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-2 h-8">
              <div className="flex items-center gap-1 text-warm-2">
                <IconBtn title="Attach">
                  <Paperclip className="w-4 h-4" strokeWidth={1.8} />
                </IconBtn>
                <IconBtn title="Image">
                  <ImageIcon className="w-4 h-4" strokeWidth={1.8} />
                </IconBtn>
                <IconBtn title="Files">
                  <Folder className="w-4 h-4" strokeWidth={1.8} />
                </IconBtn>
                <IconBtn title="Snippet">
                  <Scissors className="w-4 h-4" strokeWidth={1.8} />
                </IconBtn>
                <IconBtn title="Chart">
                  <BarChart3 className="w-4 h-4" strokeWidth={1.8} />
                </IconBtn>
                <IconBtn title="Voice">
                  <Mic className="w-4 h-4" strokeWidth={1.8} />
                </IconBtn>
              </div>
              <SendBtn onClick={onSend} disabled={!chatInput.trim()} />
            </div>
          </div>
        </div>
      </div>
      </div>
      {isChat && aiAssistantOpen && !membersPanelOpen && (
        <AIAssistantPanel onCollapse={onToggleAiAssistant} />
      )}
      {isChat && isGroupChat && membersPanelOpen && (
        <MembersPanel
          members={members}
          memberCount={memberCount}
          groupName={chat?.name ?? "Group"}
          onClose={onToggleMembersPanel}
        />
      )}
      {actionMenu && (
        <MessageActionMenu
          anchor={actionMenu.rect}
          onClose={() => setActionMenu(null)}
          onHighlight={() => {
            setHighlightModal({ messageId: actionMenu.messageId });
            setActionMenu(null);
          }}
        />
      )}
      {highlightModal && (
        <HighlightModal
          current={
            highlightModal.messageId in messageTones
              ? messageTones[highlightModal.messageId]
              : messages.find((m) => m.id === highlightModal.messageId)?.tone ?? null
          }
          onClose={() => setHighlightModal(null)}
          onApply={(tone) => {
            setMessageTones((prev) => ({
              ...prev,
              [highlightModal.messageId]: tone,
            }));
            setHighlightModal(null);
          }}
        />
      )}
    </div>
  );
}

function MessageActionMenu({
  anchor,
  onClose,
  onHighlight,
}: {
  anchor: DOMRect;
  onClose: () => void;
  onHighlight: () => void;
}) {
  if (typeof document === "undefined") return null;
  // Position to the LEFT of the anchor (the "..." button on hover toolbar)
  const top = anchor.bottom + 4;
  const left = Math.max(8, anchor.left - 180);
  const items = [
    { id: "reply", label: "Reply" },
    { id: "copy", label: "Copy Text" },
    { id: "followup", label: "Follow-up", trailing: ChevronRight },
    { id: "forward", label: "Forward" },
    { id: "pin", label: "Pin" },
    { id: "highlight", label: "Highlight" },
    { id: "select", label: "Select" },
    { id: "delete", label: "Delete" },
    { id: "vote", label: "Vote", trailing: ChevronRight },
    { id: "schedule", label: "Schedule Meeting" },
  ];
  return createPortal(
    <>
      <div className="fixed inset-0 z-[100]" onClick={onClose} />
      <div
        role="menu"
        style={{ top, left }}
        className="fixed z-[101] w-[200px] rounded-xl bg-white border border-warm-gray-2 shadow-[0_8px_24px_rgba(38,32,28,0.10)] py-1.5"
      >
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => {
              if (it.id === "highlight") onHighlight();
              else onClose();
            }}
            className="w-full px-4 py-2 text-left text-[14px] text-warm-black hover:bg-warm-base flex items-center justify-between"
          >
            <span>{it.label}</span>
            {it.trailing && (
              <it.trailing className="w-4 h-4 text-warm-2" strokeWidth={1.8} />
            )}
          </button>
        ))}
      </div>
    </>,
    document.body,
  );
}

function HighlightModal({
  current,
  onClose,
  onApply,
}: {
  current: ChatMessage["tone"] | null | undefined;
  onClose: () => void;
  onApply: (tone: ChatMessage["tone"] | null) => void;
}) {
  const [selected, setSelected] = useState<ChatMessage["tone"] | null>(
    current ?? null,
  );
  if (typeof document === "undefined") return null;
  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-warm-black/30 p-6">
      <div
        className="w-full max-w-[560px] rounded-2xl bg-white shadow-[0_24px_60px_rgba(38,32,28,0.18)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-5 pb-3 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold tracking-tight">Highlight</h2>
          <button
            onClick={onClose}
            title="Close"
            className="w-8 h-8 rounded-md text-warm-2 hover:text-warm-black hover:bg-warm-base flex items-center justify-center"
          >
            <span className="text-[20px] leading-none">×</span>
          </button>
        </div>
        <div className="px-6 pt-2 pb-4 grid grid-cols-2 gap-x-12 gap-y-7">
          {TONE_ORDER.map((t) => {
            const style = MESSAGE_TONE_STYLES[t];
            const isSelected = selected === t;
            return (
              <button
                key={t}
                onClick={() => setSelected(t)}
                className={`text-left rounded-xl p-2 transition-colors ${
                  isSelected
                    ? "bg-warm-base"
                    : "hover:bg-warm-base/60"
                }`}
              >
                <div className="relative pl-3 pt-1">
                  <span
                    className="absolute -top-1 left-0 text-[22px] leading-none z-10"
                    aria-hidden
                  >
                    {style.emoji}
                  </span>
                  <div
                    className="rounded-xl px-4 py-2.5 text-[15px] text-warm-black w-full"
                    style={{ background: style.bg }}
                  >
                    Hello~
                  </div>
                </div>
                <p className="text-[13px] text-warm-2 text-center mt-3">
                  {style.label}
                </p>
              </button>
            );
          })}
        </div>
        <div className="px-6 pb-5 flex items-center justify-end gap-2">
          {current && (
            <button
              onClick={() => onApply(null)}
              className="h-9 px-4 rounded-full text-[13px] text-warm-2 hover:text-warm-black hover:bg-warm-base"
            >
              Remove
            </button>
          )}
          <button
            onClick={() => selected && onApply(selected)}
            disabled={!selected}
            className={`h-9 px-5 rounded-full text-[13px] font-medium transition ${
              selected
                ? "bg-warm-black text-white hover:bg-warm-black/90"
                : "bg-warm-base text-warm-2 cursor-not-allowed"
            }`}
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function SiriOrb() {
  return (
    <span
      className="block w-6 h-6 rounded-full relative overflow-hidden"
      style={{
        background:
          "conic-gradient(from 200deg at 50% 50%, #5ac8fa 0deg, #34c759 80deg, #ffcc00 160deg, #ff6b6b 230deg, #af52de 290deg, #5ac8fa 360deg)",
        boxShadow:
          "inset 0 0 8px rgba(255,255,255,0.5), 0 1px 3px rgba(38,32,28,0.08)",
      }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.35) 18%, rgba(255,255,255,0) 45%)",
        }}
      />
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 70% 78%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 35%)",
        }}
      />
    </span>
  );
}

function AIAssistantPanel({ onCollapse }: { onCollapse: () => void }) {
  const [msg, setMsg] = useState("");
  return (
    <aside className="w-[320px] shrink-0 border-l border-warm-gray-2 bg-warm-bg-2 flex flex-col">
      <div className="h-[60px] pl-[10px] pr-4 flex items-center gap-2 text-warm-black">
        <button
          onClick={onCollapse}
          className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-warm-gray-2/60 text-warm-2 hover:text-warm-black"
          title="Hide AI Assistant"
        >
          <PanelLeftClose className="w-4 h-4" strokeWidth={1.8} />
        </button>
        <span className="text-[14px] font-medium">AI Assistant</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin" />
      <div className="px-4 pb-6 pt-2">
        <div
          className="rounded-2xl border border-warm-gray-2 bg-white p-3"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(254,254,253) 33%, rgb(253,253,252) 66%, rgb(252,252,250) 100%)",
          }}
        >
          <div className="relative min-h-[24px]">
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={1}
              placeholder="Type a message..."
              className="w-full bg-transparent text-[14px] leading-6 outline-none resize-none placeholder:text-warm-2"
            />
          </div>
          <div className="flex items-center justify-end mt-2 h-8">
            <SendBtn onClick={() => setMsg("")} disabled={!msg.trim()} />
          </div>
        </div>
      </div>
    </aside>
  );
}

const MESSAGE_TONE_STYLES: Record<
  NonNullable<ChatMessage["tone"]>,
  { bg: string; emoji: string; label: string }
> = {
  idea: { bg: "#fbe9c8", emoji: "💡", label: "Idea" },
  announce: { bg: "#d8e7f8", emoji: "📣", label: "Announcement" },
  urgent: { bg: "#fbdcd2", emoji: "❗️", label: "Important" },
  celebrate: { bg: "#d6ecd5", emoji: "🎉", label: "Celebration" },
};
const TONE_ORDER: Array<NonNullable<ChatMessage["tone"]>> = [
  "idea",
  "announce",
  "urgent",
  "celebrate",
];

function Message({
  message,
  prev,
  toneOverride,
  onOpenMenu,
}: {
  message: ChatMessage;
  prev?: ChatMessage;
  toneOverride?: ChatMessage["tone"] | null;
  onOpenMenu?: (id: string, rect: DOMRect) => void;
}) {
  if (message.self) {
    const effectiveTone =
      toneOverride === null ? null : toneOverride ?? message.tone ?? null;
    const toneStyle = effectiveTone ? MESSAGE_TONE_STYLES[effectiveTone] : null;
    return (
      <div className="flex flex-col items-end group/msg">
        <div className="relative max-w-[75%]">
          {toneStyle && (
            <span
              className="absolute -top-3 -left-2 text-[20px] leading-none select-none"
              aria-hidden
            >
              {toneStyle.emoji}
            </span>
          )}
          {/* Hover toolbar */}
          {onOpenMenu && (
            <button
              onClick={(e) => onOpenMenu(message.id, e.currentTarget.getBoundingClientRect())}
              title="More"
              className="opacity-0 group-hover/msg:opacity-100 transition-opacity absolute -left-9 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md bg-white border border-warm-gray-2 shadow-sm flex items-center justify-center text-warm-2 hover:text-warm-black"
            >
              <MoreVertical className="w-3.5 h-3.5" strokeWidth={1.8} />
            </button>
          )}
          {toneStyle ? (
            // Toned bubble: time + read marks live inside the bubble at the bottom
            <div
              className="rounded-2xl px-4 py-3 text-[15px] leading-relaxed text-warm-black"
              style={{ background: toneStyle.bg }}
            >
              <span>{message.text}</span>
              <div className="mt-1 flex items-center justify-end gap-1">
                {message.time && (
                  <span className="text-[11px] text-warm-2">{message.time}</span>
                )}
                {message.read && (
                  <span className="text-[#1faa3a] text-[12px] leading-none font-bold tracking-tighter">
                    ✓✓
                  </span>
                )}
              </div>
            </div>
          ) : (
            // Default bubble: text only inside; time below
            <div className="rounded-2xl px-4 py-3 text-[15px] leading-relaxed bg-warm-base text-warm-black">
              {message.text}
            </div>
          )}
        </div>
        {!toneStyle && message.time && (
          <span className="text-[11px] text-warm-2 mt-1 mr-1">{message.time}</span>
        )}
      </div>
    );
  }
  const sameAuthor = prev && prev.author === message.author;
  return (
    <div className="flex gap-3">
      {!sameAuthor ? (
        <span
          className="w-8 h-8 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0 mt-1"
          style={{ background: message.authorColor ?? "#827d73" }}
        >
          {message.authorInitials}
        </span>
      ) : (
        <span className="w-8 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        {!sameAuthor && (
          <p className="text-[13px] font-semibold mb-1.5 text-warm-black">{message.author}</p>
        )}
        <div className="inline-block max-w-[85%] rounded-2xl bg-white border border-warm-gray-2 px-4 py-3 text-[15px] leading-relaxed text-warm-black">
          {message.text}
        </div>
        {message.time && (
          <p className="text-[11px] text-warm-2 mt-1 ml-1">{message.time}</p>
        )}
      </div>
    </div>
  );
}

function IconBtn({ children, title }: { children: ReactNode; title: string }) {
  return (
    <button
      title={title}
      className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-warm-base text-warm-2 hover:text-warm-black"
    >
      {children}
    </button>
  );
}

function ComposerOutlineBtn({
  children,
  title,
  onClick,
}: {
  children: ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-[30px] h-[30px] rounded-lg border border-warm-gray-2 flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
    >
      {children}
    </button>
  );
}

function SendBtn({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title="Send"
      className={`w-[30px] h-[30px] rounded-lg border flex items-center justify-center transition-colors ${
        disabled
          ? "bg-warm-border border-warm-2 text-white cursor-not-allowed"
          : "bg-warm-black border-warm-black text-white hover:bg-warm-black/85"
      }`}
    >
      <ArrowUp className="w-3.5 h-3.5" strokeWidth={2.2} />
    </button>
  );
}

type MenuItem = {
  id: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  onClick?: () => void;
};

type MenuSection = {
  title?: string;
  items: MenuItem[];
};

type DropdownAlign = "left" | "right" | "right-of-trigger";

function DropdownPortal({
  triggerRect,
  onClose,
  align,
  width,
  sections,
}: {
  triggerRect: DOMRect;
  onClose: () => void;
  align: DropdownAlign;
  width: number;
  sections: MenuSection[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const gap = 6;
    let top = triggerRect.bottom + 4;
    let left: number;
    if (align === "right-of-trigger") {
      // Open to the right of the trigger (used for nav rows where space below is tight)
      top = triggerRect.top;
      left = triggerRect.right + gap;
    } else if (align === "left") {
      left = triggerRect.left;
    } else {
      // 'right' — right edge of dropdown aligns with right edge of trigger
      left = triggerRect.right - width;
    }
    // Clamp inside viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxLeft = vw - width - 8;
    left = Math.max(8, Math.min(left, maxLeft));
    const measuredH = ref.current?.offsetHeight ?? 220;
    if (top + measuredH > vh - 8) top = Math.max(8, vh - measuredH - 8);
    setCoords({ top, left });
  }, [triggerRect, align, width]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const scrollOrResize = () => onClose();
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", esc);
    window.addEventListener("scroll", scrollOrResize, true);
    window.addEventListener("resize", scrollOrResize);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", esc);
      window.removeEventListener("scroll", scrollOrResize, true);
      window.removeEventListener("resize", scrollOrResize);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{ width, top: coords.top, left: coords.left }}
      className="fixed z-[9999] bg-white rounded-xl border border-warm-gray-2 shadow-[0_4px_24px_rgba(38,32,28,0.08),0_1px_3px_rgba(38,32,28,0.06)] py-1.5"
    >
      {sections.map((sec, i) => (
        <div key={i} className={i > 0 ? "border-t border-warm-gray-2/60 mt-1 pt-1" : ""}>
          {sec.title && (
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-warm-2">
              {sec.title}
            </div>
          )}
          {sec.items.map((it) => {
            const Icon = it.icon;
            return (
              <button
                key={it.id}
                onClick={() => {
                  it.onClick?.();
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-warm-base text-left transition-colors"
              >
                {Icon && (
                  <span className="w-6 h-6 rounded-md bg-warm-base flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-warm-2" strokeWidth={1.8} />
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-warm-black">{it.label}</p>
                  {it.description && (
                    <p className="text-[10px] text-warm-2">{it.description}</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

type DropdownToggle = (e: React.MouseEvent) => void;

function DropdownTrigger({
  children,
  sections,
  align = "right",
  width = 220,
}: {
  children: (props: { open: boolean; toggle: DropdownToggle }) => React.ReactNode;
  sections: MenuSection[];
  align?: DropdownAlign;
  width?: number;
}) {
  const [open, setOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const toggle: DropdownToggle = (e) => {
    if (!open) {
      const target = e.currentTarget as HTMLElement;
      setTriggerRect(target.getBoundingClientRect());
    }
    setOpen((v) => !v);
  };

  return (
    <>
      {children({ open, toggle })}
      {typeof document !== "undefined" &&
        open &&
        triggerRect &&
        createPortal(
          <DropdownPortal
            triggerRect={triggerRect}
            onClose={() => setOpen(false)}
            align={align}
            width={width}
            sections={sections}
          />,
          document.body,
        )}
    </>
  );
}

/* ===========================
 * Flow detail view (rich content)
 * =========================== */
function PlaceholderPage({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2">
      <div className="h-[60px] px-6 flex items-center">
        <h1 className="text-[18px] font-medium tracking-tight">{title}</h1>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 -mt-12">
        <span className="w-12 h-12 rounded-2xl bg-warm-base flex items-center justify-center mb-3">
          <Sparkles className="w-5 h-5 text-warm-2" strokeWidth={1.8} />
        </span>
        <p className="text-[15px] font-medium text-warm-black mb-1">{title}</p>
        <p className="text-[13px] text-warm-2 max-w-[320px]">{subtitle}</p>
      </div>
    </div>
  );
}

/* ===========================
 * Link page (connector list)
 * =========================== */
/* ===========================
 * Follow-ups page
 * =========================== */

type FollowUpTab = "ongoing" | "verified" | "expired";
type FollowUpScope = "byyou" | "byothers" | "initiated";

type FollowUpItem = {
  id: string;
  title: string;
  source?: { type: "group" | "person"; name: string; avatarUrl?: string; color?: string; emoji?: string };
  accent: string; // left bar color
  unread?: boolean;
  group: string; // 'Today', 'Yesterday', '04/28/2026', etc.
};

const FOLLOWUP_ITEMS: FollowUpItem[] = [
  {
    id: "fu-1",
    title: "准备周会同步近期重点工作和后续需求",
    source: { type: "group", name: "Design Team", color: "#7c6fb8", emoji: "🪐" },
    accent: "#5b5fd6",
    group: "Today",
  },
  {
    id: "fu-2",
    title: "基于现有文件继续搭建 tanka web 方案",
    source: {
      type: "person",
      name: "Ling LV",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80",
    },
    accent: "#5b5fd6",
    group: "Yesterday",
  },
  {
    id: "fu-3",
    title: "111",
    accent: "#5b5fd6",
    group: "Yesterday",
  },
  {
    id: "fu-4",
    title: "在结构原型中考虑侧边栏创建入口快捷方式",
    source: {
      type: "person",
      name: "Ling LV",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80",
    },
    accent: "#dc2626",
    unread: true,
    group: "Yesterday",
  },
  {
    id: "fu-5",
    title: "Ling LV: 本周新员工使用 Tanka 反馈汇总周报，请各模块负责同学重点关注 👇 https://me...",
    source: { type: "group", name: "Design Team", color: "#7c6fb8", emoji: "🪐" },
    accent: "#dc2626",
    group: "04/28/2026",
  },
  {
    id: "fu-6",
    title: "复盘 Q2 上半季增长实验结果并提炼下一季假设",
    source: { type: "group", name: "Growth pod", color: "#f59e0b", emoji: "🌱" },
    accent: "#5b5fd6",
    group: "04/28/2026",
  },
  {
    id: "fu-7",
    title: "整理客户反馈中的高频问题并同步给产品",
    source: {
      type: "person",
      name: "Sarah Chen",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80",
    },
    accent: "#5b5fd6",
    group: "04/25/2026",
  },
];

function FollowUpsPage() {
  const [tab, setTab] = useState<FollowUpTab>("ongoing");
  const [scope, setScope] = useState<FollowUpScope>("byyou");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const tabs: Array<{ id: FollowUpTab; label: string; count: number }> = [
    { id: "ongoing", label: "Ongoing", count: 3 },
    { id: "verified", label: "Verified", count: 1 },
    { id: "expired", label: "Expired", count: 1 },
  ];
  const scopes: Array<{ id: FollowUpScope; label: string; count: number }> = [
    { id: "byyou", label: "By you", count: 3 },
    { id: "byothers", label: "By others", count: 0 },
    { id: "initiated", label: "Initiated by you", count: 0 },
  ];

  const items = FOLLOWUP_ITEMS.filter((i) => {
    if (!query.trim()) return true;
    return i.title.toLowerCase().includes(query.trim().toLowerCase());
  });

  // Group by .group field, in original order
  const grouped: Array<{ group: string; rows: FollowUpItem[] }> = [];
  for (const item of items) {
    const last = grouped[grouped.length - 1];
    if (last && last.group === item.group) {
      last.rows.push(item);
    } else {
      grouped.push({ group: item.group, rows: [item] });
    }
  }

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2 overflow-hidden">
      <div className="h-[60px] shrink-0" />

      <div className="shrink-0">
        <div className="max-w-[1080px] mx-auto px-10">
          <div className="flex items-start justify-between mb-1">
            <h1 className="text-[28px] font-bold tracking-tight">Follow-ups</h1>
            <div className="flex items-center gap-2 mt-1">
              {searchOpen ? (
                <div className="h-9 w-[240px] rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2 bg-white">
                  <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => !query && setSearchOpen(false)}
                    placeholder="Search..."
                    className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
                  title="Search"
                >
                  <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </button>
              )}
              <button className="h-9 px-4 inline-flex items-center gap-1.5 rounded-full bg-warm-black text-white text-[13px] font-medium hover:bg-warm-black/90">
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                New Follow-up
              </button>
            </div>
          </div>
          <p className="text-[13px] text-warm-2 mb-5">
            Track action items captured from chats, meetings, and docs.
          </p>

          <div className="border-b border-warm-gray-2 flex gap-6 mb-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative py-2.5 text-[14px] transition-colors ${
                  tab === t.id
                    ? "text-warm-black font-semibold"
                    : "text-warm-2 hover:text-warm-black"
                }`}
              >
                {t.label} ({t.count})
                {tab === t.id && (
                  <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-warm-black" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 text-[13px]">
              {scopes.map((s, i) => (
                <span key={s.id} className="flex items-center gap-3">
                  <button
                    onClick={() => setScope(s.id)}
                    className={`transition-colors ${
                      scope === s.id ? "text-warm-black font-medium" : "text-warm-2 hover:text-warm-black"
                    }`}
                  >
                    {s.label} ({s.count})
                  </button>
                  {i < scopes.length - 1 && (
                    <span className="text-warm-gray-2">|</span>
                  )}
                </span>
              ))}
            </div>
            <button className="flex items-center gap-1.5 text-[13px] text-warm-2 hover:text-warm-black">
              <ListTodo className="w-3.5 h-3.5" strokeWidth={1.8} />
              Select
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        <div className="max-w-[1080px] mx-auto px-10 pb-10">
          {grouped.map((g) => (
            <div key={g.group} className="mt-5">
              <p className="text-[12px] text-warm-2 mb-2.5">{g.group}</p>
              <div className="flex flex-col gap-2">
                {g.rows.map((it) => (
                  <FollowUpRow key={it.id} item={it} />
                ))}
              </div>
            </div>
          ))}
          {grouped.length === 0 && (
            <div className="text-center text-warm-2 text-[13px] py-20">
              Nothing to follow up on.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FollowUpRow({ item }: { item: FollowUpItem }) {
  return (
    <div className="relative rounded-xl border border-warm-gray-2 bg-white px-4 py-3 flex items-start gap-3 hover:border-warm-border transition">
      <span
        className="absolute left-0 top-2 bottom-2 w-1 rounded-r"
        style={{ background: item.accent }}
      />
      <div className="flex-1 min-w-0 pl-2">
        <p className="text-[14px] text-warm-black leading-relaxed truncate">
          {item.title}
        </p>
        {item.source && (
          <div className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] text-warm-2">
            {item.source.type === "person" && item.source.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.source.avatarUrl}
                alt={item.source.name}
                className="w-4 h-4 rounded-full object-cover"
              />
            ) : (
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                style={{ background: item.source.color ?? "#7c6fb8" }}
              >
                <span className="leading-none">{item.source.emoji ?? "•"}</span>
              </span>
            )}
            <span>{item.source.name}</span>
          </div>
        )}
      </div>
      <div className="flex items-start gap-1 shrink-0 text-warm-2">
        <button
          title="Quick view"
          className="w-7 h-7 rounded-md bg-warm-gray-2/40 hover:bg-warm-gray-2 flex items-center justify-center"
        >
          <LayoutGrid className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
        <button
          title="More"
          className="w-7 h-7 rounded-md hover:bg-warm-base flex items-center justify-center"
        >
          <MoreVertical className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
        {item.unread && (
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        )}
      </div>
    </div>
  );
}

/* ===========================
 * Agent page
 * =========================== */

type AgentStatus = "READY" | "PAUSED";

type AgentSpec = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  count?: number;
  status: AgentStatus;
};

const AGENTS: AgentSpec[] = [
  { id: "email", name: "Email Agent", description: "Triage inboxes, classify, draft replies, and follow up.", icon: Mail, iconBg: "#eef2ff", iconColor: "#4f46e5", count: 2, status: "READY" },
  { id: "schedule", name: "Schedule Agent", description: "Manage meetings, surface conflicts, propose times.", icon: CalendarDays, iconBg: "#fef3c7", iconColor: "#d97706", status: "READY" },
  { id: "knowledge", name: "Knowledge Agent", description: "Search across docs, summarize, answer questions.", icon: BookOpen, iconBg: "#dcfce7", iconColor: "#15803d", status: "READY" },
  { id: "message", name: "Message Agent", description: "Handle Slack/Teams messages, summarize threads.", icon: MessageSquare, iconBg: "#dbeafe", iconColor: "#1d4ed8", count: 1, status: "READY" },
  { id: "project", name: "Project Agent", description: "Track tasks, surface blockers, auto-update.", icon: Briefcase, iconBg: "#f3e8ff", iconColor: "#7e22ce", status: "READY" },
  { id: "sales", name: "Sales Agent", description: "Manage pipeline, update records, draft outreach.", icon: TrendingUp, iconBg: "#fce7f3", iconColor: "#be185d", count: 2, status: "READY" },
  { id: "data", name: "Data Agent", description: "Query warehouses, render charts, explain trends.", icon: BarChart3, iconBg: "#e0f2fe", iconColor: "#0369a1", status: "READY" },
  { id: "finance", name: "Finance Agent", description: "Track spend, generate reports, flag anomalies.", icon: Coins, iconBg: "#ecfccb", iconColor: "#4d7c0f", count: 1, status: "READY" },
  { id: "hr", name: "HR Agent", description: "Recruiting funnel, employee data, policies.", icon: Users, iconBg: "#fff7ed", iconColor: "#c2410c", count: 1, status: "READY" },
];

function AgentPage() {
  const [selectedId, setSelectedId] = useState("email");
  const [query, setQuery] = useState("");
  const selected = AGENTS.find((a) => a.id === selectedId) ?? AGENTS[0];
  const filtered = AGENTS.filter((a) =>
    a.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="h-screen w-full flex bg-warm-bg-2 overflow-hidden">
      {/* Left agents list — mirrors Flow ListColumn styling */}
      <aside className="w-[290px] shrink-0 border-r border-warm-gray-2 bg-warm-bg-2 flex flex-col">
        <div className="px-3.5">
          <div className="h-[60px] flex items-center justify-between">
            <h2 className="text-base font-medium tracking-tight">Agent</h2>
            <div className="flex items-center gap-1 text-warm-2">
              <button
                title="New agent"
                className="w-7 h-7 rounded-md hover:bg-warm-gray-2/60 flex items-center justify-center"
              >
                <Plus className="w-[18px] h-[18px]" strokeWidth={1.6} />
              </button>
            </div>
          </div>
          <div className="h-9 mb-3 rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2">
            <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
            />
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto px-3 pb-3 space-y-1 scrollbar-thin">
          {filtered.map((a) => {
            const Icon = a.icon;
            const isActive = a.id === selectedId;
            return (
              <li key={a.id}>
                <button
                  onClick={() => setSelectedId(a.id)}
                  className={`w-full text-left rounded-lg px-2.5 py-2 flex items-center gap-3 transition-colors ${
                    isActive ? "bg-warm-base" : "hover:bg-warm-base/60"
                  }`}
                >
                  <span className="w-8 h-8 rounded-full bg-white border border-warm-gray-2 flex items-center justify-center shrink-0 text-warm-black">
                    <Icon className="w-4 h-4" strokeWidth={1.8} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] truncate text-warm-black">{a.name}</p>
                      {a.count != null && (
                        <span className="shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-warm-black text-white text-[10px] font-medium flex items-center justify-center">
                          {a.count}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-warm-2 truncate mt-0.5">{a.description}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Right detail */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="h-[60px] shrink-0 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: selected.iconBg, color: selected.iconColor }}
            >
              <selected.icon className="w-4 h-4" strokeWidth={1.8} />
            </span>
            <div className="leading-tight min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <p className="text-base truncate">{selected.name}</p>
                <span className="shrink-0 inline-flex items-center gap-1 px-1.5 py-[2px] rounded text-[10px] font-semibold bg-[#dcfce7] text-[#15803d]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                  {selected.status}
                </span>
              </div>
              <p className="text-[11px] text-warm-2 truncate mt-0.5">{selected.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-warm-2">
            <IconBtn title="Search">
              <Search className="w-4 h-4" strokeWidth={1.8} />
            </IconBtn>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-warm-base"
              title="Ask agent"
            >
              <SiriOrb />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
          <div className="max-w-[920px] mx-auto px-8 py-4">
            {/* Yellow callout */}
            {selected.count != null && (
              <button className="w-full text-left rounded-xl border border-[#fde68a] bg-[#fffaeb] px-4 py-3 flex items-center gap-3 hover:border-[#fcd34d] transition">
                <span className="w-7 h-7 rounded-full bg-[#fde68a] text-[#92400e] flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#92400e]">
                    {selected.count} items with you
                  </p>
                  <p className="text-[12px] text-[#92400e]/80 mt-0.5">
                    Review in Tasks · Awaiting →
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#92400e]" strokeWidth={2} />
              </button>
            )}

            {/* At a glance */}
            <p className="mt-6 mb-3 text-[10.5px] font-semibold tracking-[0.08em] text-warm-2 uppercase">
              At a glance · Today
            </p>
            <div className="grid grid-cols-3 gap-3">
              <StatTile value="47" label="Triaged" />
              <StatTile value="9" label="Drafted" />
              <StatTile value="12" label="Replies sent" />
            </div>
            <p className="mt-3 text-[12px] text-warm-2">
              <span className="font-semibold tracking-[0.06em] text-warm-black/70">THIS WEEK</span>{" "}
              → 287 emails triaged · 94% your-preference match
            </p>

            {/* Now doing */}
            <p className="mt-6 mb-3 text-[10.5px] font-semibold tracking-[0.08em] text-warm-2 uppercase">
              What I&apos;m doing now
            </p>
            <div className="flex flex-col gap-2">
              <AgentTaskRow color="#f59e0b" title="Reply to Globex · David Chen" badge="AWAITING YOU" badgeBg="#fef3c7" badgeFg="#92400e" />
              <AgentTaskRow color="#3b82f6" title="File sales emails from Q1" badge="RUNNING" badgeBg="#dbeafe" badgeFg="#1d4ed8" />
              <AgentTaskRow color="#a855f7" title="Overnight Slack digest" badge="SCHEDULED" badgeBg="#f3e8ff" badgeFg="#7e22ce" />
            </div>

            {/* Capabilities */}
            <p className="mt-6 mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-warm-2 uppercase">
              Capabilities
            </p>
            <ul className="text-[14px] text-warm-black space-y-1.5 list-disc pl-5">
              <li>Triage inboxes and flag urgent threads</li>
              <li>Draft replies in your voice</li>
              <li>Summarize long threads</li>
              <li>Chase unresponded threads</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-warm-gray-2 bg-white px-4 py-3">
      <p className="text-[28px] font-bold tracking-tight text-warm-black leading-none">
        {value}
      </p>
      <p className="text-[10.5px] tracking-[0.08em] uppercase text-warm-2 font-semibold mt-2">
        {label}
      </p>
    </div>
  );
}

function AgentTaskRow({
  color,
  title,
  badge,
  badgeBg,
  badgeFg,
}: {
  color: string;
  title: string;
  badge: string;
  badgeBg: string;
  badgeFg: string;
}) {
  return (
    <div className="rounded-xl border border-warm-gray-2 bg-white px-4 py-3 flex items-center gap-3">
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
      <p className="flex-1 text-[14px] text-warm-black truncate">{title}</p>
      <span
        className="shrink-0 px-2 py-[3px] rounded text-[10px] font-semibold tracking-wide"
        style={{ background: badgeBg, color: badgeFg }}
      >
        {badge}
      </span>
    </div>
  );
}

/* ===========================
 * SOPs page
 * =========================== */

type SopTab = "featured" | "organization" | "mine";

type SopCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  bg: string;
  iconBg: string;
  iconColor: string;
  author: string;
  scope: SopTab;
};

const SOP_CARDS: SopCard[] = [
  { id: "s1", title: "Customer Interview Synthesis", description: "Turns raw transcripts into themed insight report with...", icon: Users, bg: "#fce7eb", iconBg: "#ffffff", iconColor: "#26201c", author: "Amanda", scope: "featured" },
  { id: "s2", title: "Weekly Exec Digest", description: "Compiles key wins, risks, decisions across all active flow...", icon: ClipboardList, bg: "#fde7c8", iconBg: "#ffffff", iconColor: "#26201c", author: "Chen", scope: "featured" },
  { id: "s3", title: "Bug Triage Router", description: "Auto-categorizes incoming bugs by severity and owner, drafts...", icon: Sparkles, bg: "#d8efd1", iconBg: "#ffffff", iconColor: "#26201c", author: "Hua", scope: "featured" },
  { id: "s4", title: "Release Comms Pack", description: "Generates changelog, customer email, and internal Slack post...", icon: Rocket, bg: "#e0dcef", iconBg: "#ffffff", iconColor: "#26201c", author: "Junjie", scope: "featured" },
  { id: "s5", title: "1:1 Meeting Notes", description: "From requirements gathering to priority assessment, ensuring clear", icon: Users, bg: "#e5e7eb", iconBg: "#ffffff", iconColor: "#26201c", author: "Koko", scope: "featured" },
  { id: "s6", title: "Retro Action Items", description: "From requirements gathering to priority assessment, ensuring clear", icon: ClipboardList, bg: "#fbd5dd", iconBg: "#ffffff", iconColor: "#26201c", author: "Hua", scope: "featured" },
  { id: "s7", title: "Onboarding Buddy Brief", description: "Generates day-1 schedule, intro list, and welcome doc.", icon: Users, bg: "#dbeafe", iconBg: "#ffffff", iconColor: "#26201c", author: "Mei", scope: "featured" },
  { id: "s8", title: "Quarterly OKR Rollup", description: "Aggregates progress across teams into a single OKR digest.", icon: ClipboardList, bg: "#fef3c7", iconBg: "#ffffff", iconColor: "#26201c", author: "Priya", scope: "featured" },
];

function SopsPage() {
  const [tab, setTab] = useState<SopTab>("featured");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const tabs: Array<{ id: SopTab; label: string; count: number }> = [
    { id: "featured", label: "Featured", count: 12 },
    { id: "organization", label: "Organization", count: 218 },
    { id: "mine", label: "Mine", count: 12 },
  ];

  const cards = SOP_CARDS.filter((c) => {
    if (tab !== c.scope) return false;
    if (!query.trim()) return true;
    return c.title.toLowerCase().includes(query.trim().toLowerCase());
  });

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2 overflow-hidden">
      <div className="h-[60px] shrink-0" />

      <div className="shrink-0">
        <div className="max-w-[1080px] mx-auto px-10">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-baseline gap-2">
              <h1 className="text-[28px] font-bold tracking-tight">SOPs</h1>
              <span className="text-[16px] text-warm-2 font-medium">230</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {searchOpen ? (
                <div className="h-9 w-[240px] rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2 bg-white">
                  <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => !query && setSearchOpen(false)}
                    placeholder="Search SOPs..."
                    className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
                  title="Search"
                >
                  <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </button>
              )}
              <button className="h-9 px-4 inline-flex items-center gap-1.5 rounded-full bg-warm-black text-white text-[13px] font-medium hover:bg-warm-black/90">
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                New SOP
              </button>
            </div>
          </div>
          <p className="text-[13px] text-warm-2 mb-5">
            Pre-built workflows to automate recurring processes.
          </p>

          <div className="border-b border-warm-gray-2 flex gap-6 mb-5">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative py-2.5 text-[14px] transition-colors ${
                  tab === t.id ? "text-warm-black font-semibold" : "text-warm-2 hover:text-warm-black"
                }`}
              >
                {t.label}{" "}
                <span className={tab === t.id ? "text-warm-2 font-normal" : ""}>{t.count}</span>
                {tab === t.id && (
                  <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-warm-black" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        <div className="max-w-[1080px] mx-auto px-10 pb-10">
          {cards.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {cards.map((c) => (
                <SopCardView key={c.id} card={c} />
              ))}
            </div>
          ) : (
            <div className="text-center text-warm-2 text-[13px] py-20">
              No SOPs here yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SopCardView({ card }: { card: SopCard }) {
  const Icon = card.icon;
  return (
    <button
      className="text-left rounded-2xl p-4 flex flex-col gap-3 transition hover:brightness-[0.98]"
      style={{ background: card.bg }}
    >
      <span
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: card.iconBg, color: card.iconColor }}
      >
        <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
      </span>
      <div className="flex-1">
        <p className="text-[15px] font-semibold text-warm-black">{card.title}</p>
        <p className="text-[13px] text-warm-black/70 mt-1 line-clamp-2">{card.description}</p>
      </div>
      <div className="border-t border-warm-black/10 pt-2.5 mt-1.5">
        <p className="text-[11.5px] text-warm-black/55">Created by {card.author}</p>
      </div>
    </button>
  );
}

/* ===========================
 * Calendar page
 * =========================== */

type CalendarView = "month" | "week" | "agenda";

type CalEvent = {
  id: string;
  title: string;
  dayIndex: number; // 0=Sun, 6=Sat
  startHour: number; // 0-23 (decimal allowed, e.g. 14.5 = 14:30)
  endHour: number;
  color: "orange" | "olive" | "blue" | "purple";
};

const CAL_EVENT_STYLES: Record<
  CalEvent["color"],
  { bg: string; fg: string }
> = {
  orange: { bg: "#e3b08b", fg: "#3d2614" },
  olive: { bg: "#c3cf99", fg: "#3a3f1f" },
  blue: { bg: "#a8c4e0", fg: "#1f2f4a" },
  purple: { bg: "#c7b9e3", fg: "#36254e" },
};

const CAL_EVENTS: CalEvent[] = [
  {
    id: "e1",
    title: "review",
    dayIndex: 2,
    startHour: 15.5,
    endHour: 16.5,
    color: "olive",
  },
  {
    id: "e2",
    title: "product review",
    dayIndex: 3,
    startHour: 14.5,
    endHour: 15.5,
    color: "orange",
  },
];

const CAL_HOUR_HEIGHT = 60; // px per hour
const CAL_START_HOUR = 0;
const CAL_END_HOUR = 24;
const CAL_TIME_COL_WIDTH = 56;

function CalendarPage() {
  const [view, setView] = useState<CalendarView>("week");
  // Use a fixed reference date so the demo always matches "May 10-16, 2026"
  // Today is Fri May 15, 2026 in this snapshot.
  const todayDayIndex = 5; // Fri = 5
  const days = [
    { label: "Sun", date: 10 },
    { label: "Mon", date: 11 },
    { label: "Tue", date: 12 },
    { label: "Wed", date: 13 },
    { label: "Thu", date: 14 },
    { label: "Fri", date: 15 },
    { label: "Sat", date: 16 },
  ];
  const nowHour = 15.5; // 15:30 timeline indicator for "now"

  // Scroll to ~13:00 by default to match the reference framing
  const gridScrollRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (gridScrollRef.current) {
      gridScrollRef.current.scrollTop = 13 * CAL_HOUR_HEIGHT - 10;
    }
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2 overflow-hidden">
      {/* Empty top — 60px non-scrollable */}
      <div className="h-[60px] shrink-0" />

      {/* Fixed page header (title + view toggle + New event) */}
      <div className="shrink-0 px-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-[28px] font-semibold tracking-tight leading-none">
              Calendar
            </h1>
            <p className="text-[13px] text-warm-2">
              Schedule recurring and one-time tasks for your agents.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="inline-flex items-center p-[3px] rounded-lg bg-warm-base">
              {(["month", "week", "agenda"] as CalendarView[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`h-7 px-3 rounded-md text-[12px] font-medium transition-colors ${
                    view === v
                      ? "bg-warm-black text-white"
                      : "text-warm-2 hover:text-warm-black"
                  }`}
                >
                  {v[0].toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
            <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-lg border border-warm-gray-2 bg-white text-[13px] font-medium text-warm-black hover:bg-warm-base">
              <Plus className="w-3.5 h-3.5" strokeWidth={2} />
              New event
            </button>
          </div>
        </div>

        {/* Date range bar */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-[15px] font-medium text-warm-black">
            May 10–16, 2026
          </p>
          <div className="flex items-center gap-1">
            <button
              className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
              title="Previous week"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.8} />
            </button>
            <button className="h-8 px-3 rounded-md text-[13px] font-medium text-warm-2 hover:text-warm-black hover:bg-warm-base">
              Today
            </button>
            <button
              className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base"
              title="Next week"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.8} />
            </button>
            <button className="ml-2 h-8 px-3 inline-flex items-center gap-1.5 rounded-md border border-warm-gray-2 bg-white text-[13px] font-medium text-warm-black hover:bg-warm-base">
              <CalendarDays className="w-3.5 h-3.5" strokeWidth={1.8} />
              2026年5月12日
            </button>
          </div>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 min-h-0 mt-3 px-10 pb-6">
        <div className="h-full rounded-lg border border-warm-gray-2 bg-white overflow-hidden flex flex-col">
          {/* Day header row */}
          <div className="grid border-b border-warm-gray-2 shrink-0"
            style={{
              gridTemplateColumns: `${CAL_TIME_COL_WIDTH}px repeat(7, minmax(0, 1fr))`,
            }}
          >
            <div className="border-r border-warm-gray-2" />
            {days.map((d, i) => {
              const isToday = i === todayDayIndex;
              return (
                <div
                  key={d.label}
                  className={`h-12 flex items-center justify-center text-[12px] ${
                    i < 6 ? "border-r border-warm-gray-2" : ""
                  }`}
                >
                  <span
                    className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md ${
                      isToday
                        ? "bg-warm-black text-white font-medium"
                        : "text-warm-2"
                    }`}
                  >
                    <span>{d.label}</span>
                    <span className={isToday ? "" : "text-warm-black"}>
                      {d.date}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Scrollable time grid */}
          <div ref={gridScrollRef} className="flex-1 overflow-y-auto scrollbar-thin">
            <div
              className="grid relative"
              style={{
                gridTemplateColumns: `${CAL_TIME_COL_WIDTH}px repeat(7, minmax(0, 1fr))`,
                height: `${(CAL_END_HOUR - CAL_START_HOUR) * CAL_HOUR_HEIGHT}px`,
              }}
            >
              {/* Time labels column */}
              <div className="relative border-r border-warm-gray-2">
                {Array.from({ length: CAL_END_HOUR - CAL_START_HOUR }).map(
                  (_, idx) => {
                    const hour = CAL_START_HOUR + idx;
                    if (hour === CAL_START_HOUR) return null; // skip 0:00 label at top edge
                    return (
                      <div
                        key={hour}
                        className="absolute right-3 text-[11px] text-warm-2 -translate-y-1/2"
                        style={{ top: idx * CAL_HOUR_HEIGHT }}
                      >
                        {hour.toString().padStart(2, "0")}:00
                      </div>
                    );
                  },
                )}
              </div>

              {/* Day columns */}
              {days.map((d, dayIdx) => (
                <div
                  key={d.label}
                  className={`relative ${
                    dayIdx < 6 ? "border-r border-warm-gray-2" : ""
                  }`}
                >
                  {/* Hour gridlines */}
                  {Array.from({ length: CAL_END_HOUR - CAL_START_HOUR }).map(
                    (_, idx) => (
                      <div
                        key={idx}
                        className="absolute left-0 right-0 border-t border-warm-gray-2/60"
                        style={{ top: idx * CAL_HOUR_HEIGHT }}
                      />
                    ),
                  )}

                  {/* Events for this day */}
                  {CAL_EVENTS.filter((e) => e.dayIndex === dayIdx).map((e) => {
                    const top = (e.startHour - CAL_START_HOUR) * CAL_HOUR_HEIGHT;
                    const height =
                      (e.endHour - e.startHour) * CAL_HOUR_HEIGHT - 2;
                    const style = CAL_EVENT_STYLES[e.color];
                    return (
                      <button
                        key={e.id}
                        className="absolute left-1.5 right-1.5 rounded-md px-2 py-1 text-[11.5px] font-medium text-left truncate hover:brightness-95 transition"
                        style={{
                          top,
                          height,
                          background: style.bg,
                          color: style.fg,
                        }}
                        title={e.title}
                      >
                        {e.title}
                      </button>
                    );
                  })}

                  {/* "Now" line on today's column */}
                  {dayIdx === todayDayIndex && (
                    <div
                      className="absolute left-0 right-0 flex items-center pointer-events-none"
                      style={{
                        top: (nowHour - CAL_START_HOUR) * CAL_HOUR_HEIGHT,
                      }}
                    >
                      <span className="w-2 h-2 rounded-full bg-warm-2 -ml-1 shrink-0" />
                      <span className="flex-1 h-px bg-warm-2/70" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkPage() {
  const [tab, setTab] = useState<"linked" | "unlinked">("linked");
  const [category, setCategory] = useState<LinkCategoryKey>("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const linkedCount = linkTools.filter((t) => t.linked).length;
  const unlinkedCount = linkTools.length - linkedCount;

  const filtered = linkTools.filter((t) => {
    if (tab === "linked" && !t.linked) return false;
    if (tab === "unlinked" && t.linked) return false;
    if (category !== "all" && t.category !== category) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      if (!t.name.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  // Counts per category (for the active tab only)
  const tabPool = linkTools.filter((t) =>
    tab === "linked" ? t.linked : !t.linked,
  );
  const countFor = (key: LinkCategoryKey): number =>
    key === "all"
      ? tabPool.length
      : tabPool.filter((t) => t.category === key).length;

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2 overflow-hidden">
      {/* Empty top — 60px non-scrollable (matches header height pattern) */}
      <div className="h-[60px] shrink-0" />

      {/* Fixed header: title + subtitle + tabs + chips (does NOT scroll) */}
      <div className="shrink-0">
        <div className="max-w-[1080px] mx-auto px-10">
          {/* Page title + search */}
          <div className="flex items-start justify-between mb-1">
            <h1 className="text-[28px] font-bold tracking-tight">Link</h1>
            {searchOpen ? (
              <div className="h-9 w-[240px] rounded-lg border border-warm-gray-2 px-3 flex items-center gap-2 bg-white mt-2">
                <Search className="w-[15px] h-[15px] text-warm-2" strokeWidth={1.8} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onBlur={() => !query && setSearchOpen(false)}
                  placeholder="Search tools..."
                  className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-warm-2"
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-base mt-2"
                title="Search"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </button>
            )}
          </div>
          <p className="text-[13px] text-warm-2 mb-5">
            Connect tools and accounts to surface the right data when you need it.
          </p>

          {/* Tabs */}
          <div className="border-b border-warm-gray-2 flex gap-6 mb-5">
            <TabButton
              active={tab === "linked"}
              onClick={() => setTab("linked")}
              label="Linked"
              count={linkedCount}
            />
            <TabButton
              active={tab === "unlinked"}
              onClick={() => setTab("unlinked")}
              label="Unlinked"
              count={unlinkedCount}
            />
          </div>

          {/* Category chips */}
          <div className="flex gap-3 overflow-x-auto pb-3 mb-3 scrollbar-thin">
            {linkCategories.map((c) => {
              const isActive = category === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`shrink-0 px-2.5 py-[5px] rounded-full text-[12px] font-medium transition-colors ${
                    isActive
                      ? "bg-warm-base text-warm-black"
                      : "text-warm-2 hover:bg-warm-base/60"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scrollable card grid */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        <div className="max-w-[1080px] mx-auto px-10">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((t) => (
                <LinkCard key={t.id} tool={t} />
              ))}
            </div>
          ) : (
            <div className="text-center text-warm-2 text-[13px] py-20">
              Nothing here yet.
            </div>
          )}
        </div>
      </div>

      {/* Empty bottom — 60px non-scrollable (matches header height) */}
      <div className="h-[60px] shrink-0" />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button onClick={onClick} className="relative pb-3 -mb-px">
      <span
        className={`text-[14px] font-medium ${
          active ? "text-warm-black" : "text-warm-2 hover:text-warm-black"
        }`}
      >
        {label} <span className={active ? "text-warm-black" : "text-warm-2"}>({count})</span>
      </span>
      {active && (
        <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-warm-black rounded-full" />
      )}
    </button>
  );
}

function LinkCard({ tool }: { tool: LinkTool }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className="group/link text-left rounded-xl border border-warm-gray-2 bg-white px-4 py-3 flex items-center gap-3 transition-all hover:border-warm-border hover:shadow-[0_2px_12px_rgba(38,32,28,0.06)]">
      <span
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-[15px] font-bold"
        style={{ background: tool.letterBg, color: tool.letterColor }}
      >
        {imgFailed ? (
          tool.letter
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tool.iconUrl}
            alt={tool.name}
            width={22}
            height={22}
            className="w-[22px] h-[22px] object-contain"
            onError={() => setImgFailed(true)}
          />
        )}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-warm-black truncate">{tool.name}</p>
        <p className="text-[12px] text-warm-2 mt-0.5 flex items-center gap-1">
          {tool.linked ? (
            <>
              <Link2 className="w-3 h-3" strokeWidth={2} />
              Linked
            </>
          ) : (
            "Unlinked"
          )}
        </p>
      </div>
      {!tool.linked && (
        <button className="shrink-0 h-7 px-3 rounded-full text-[12px] font-medium bg-warm-black text-white hover:bg-warm-black/90 transition-colors">
          Link
        </button>
      )}
    </div>
  );
}

/* ===========================
 * Action card (Send Email / Permission / etc.)
 * Matches the user's design language: thin tinted border, uppercase state tag,
 * icon circle, structured fields, primary CTA + optional Dismiss link.
 * =========================== */

type ActionState = "proposed" | "completed" | "expired";

const ACTION_STATE_THEME: Record<
  ActionState,
  { border: string; iconBg: string; iconColor: string; tagText: string; tagLabel: string }
> = {
  proposed: {
    border: "#d8e3f4",
    iconBg: "#dbeafe",
    iconColor: "#2563eb",
    tagText: "#6b7280",
    tagLabel: "PROPOSED ACTION",
  },
  completed: {
    border: "#cfe7c8",
    iconBg: "#d4f0d2",
    iconColor: "#15803d",
    tagText: "#6b7280",
    tagLabel: "COMPLETED",
  },
  expired: {
    border: "#e5e3db",
    iconBg: "#e5e3db",
    iconColor: "#827d73",
    tagText: "#a1a1aa",
    tagLabel: "EXPIRED",
  },
};

type ActionRecipient = {
  id: string;
  name: string;
  avatarUrl?: string;
  color?: string;
};

function SendEmailActionCard({
  state,
  recipients,
  overflowCount,
  subject,
  body,
  attachmentNote,
  onConfirm,
  onDismiss,
}: {
  state: ActionState;
  recipients: ActionRecipient[];
  overflowCount?: number;
  subject: string;
  body: string;
  attachmentNote?: string;
  onConfirm?: () => void;
  onDismiss?: () => void;
}) {
  const theme = ACTION_STATE_THEME[state];
  const Icon = state === "proposed" ? Zap : state === "completed" ? CheckCircle2 : Clock;
  return (
    <div className="mb-4">
      <div className="rounded-2xl border border-warm-gray-2 bg-white overflow-hidden">
        {/* Header — mirrors Table card header pattern */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-warm-gray-2/70">
          <div className="flex items-center gap-2">
            <span
              className="w-5 h-5 rounded flex items-center justify-center shrink-0"
              style={{ background: theme.iconBg, color: theme.iconColor }}
            >
              <Icon className="w-3 h-3" strokeWidth={2.2} />
            </span>
            <span className="text-[13px] font-medium text-warm-black">Send Email</span>
            <span
              className="text-[11px] font-medium tracking-[0.04em]"
              style={{ color: theme.tagText }}
            >
              · {theme.tagLabel}
            </span>
          </div>
          <div className="flex items-center gap-0.5 text-warm-2">
            {state === "proposed" && (
              <IconBtn title="Edit">
                <Pencil className="w-3.5 h-3.5" strokeWidth={1.8} />
              </IconBtn>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-4 py-3">
          {/* Recipients */}
          <p className="text-[11px] text-warm-2 mb-1.5">Send to</p>
          <div className="flex items-center flex-wrap gap-1.5 mb-3">
            {recipients.map((r) => (
              <span
                key={r.id}
                className="inline-flex items-center gap-1 h-6 pl-[2px] pr-2 rounded-full border border-warm-gray-2 bg-white text-[12px] text-warm-black"
              >
                {r.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.avatarUrl}
                    alt={r.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="w-5 h-5 rounded-full text-white text-[9px] font-semibold flex items-center justify-center"
                    style={{ background: r.color ?? "#827d73" }}
                  >
                    {r.name.slice(0, 1)}
                  </span>
                )}
                <span className="truncate max-w-[72px]">{r.name}</span>
              </span>
            ))}
            {overflowCount && overflowCount > 0 && (
              <span className="inline-flex items-center h-6 px-2 rounded-full bg-warm-base text-[12px] text-warm-2">
                +{overflowCount}
              </span>
            )}
          </div>

          {/* Subject */}
          <p className="text-[11px] text-warm-2 mb-1">Subject</p>
          <p className="text-[13px] font-medium text-warm-black mb-3 leading-snug">
            {subject}
          </p>

          {/* Body */}
          <p className="text-[11px] text-warm-2 mb-1">Body</p>
          <p className="text-[13px] text-warm-black/85 leading-snug whitespace-pre-line mb-3">
            {body}
          </p>

          {/* Attachment */}
          {attachmentNote && (
            <div className="flex items-center gap-1 text-[12px] text-warm-2">
              <Paperclip className="w-3 h-3" strokeWidth={1.8} />
              {attachmentNote}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="px-4 py-2.5 border-t border-warm-gray-2/70 bg-warm-bg-2/40">
          {state === "proposed" && (
            <button
              onClick={onConfirm}
              className="w-full text-[13px] font-medium text-warm-black hover:text-warm-black/80 transition"
            >
              Confirm
            </button>
          )}
          {state === "completed" && (
            <button
              onClick={onConfirm}
              className="w-full flex items-center justify-center gap-1 text-[13px] font-medium text-[#3b82f6] hover:underline"
            >
              View Detail <ArrowRight className="w-3 h-3" strokeWidth={2} />
            </button>
          )}
          {state === "expired" && (
            <button
              disabled
              className="w-full text-[13px] font-medium text-warm-2 cursor-not-allowed"
            >
              Expired
            </button>
          )}
        </div>
      </div>

      {state === "proposed" && (
        <button
          onClick={onDismiss}
          className="w-full text-center text-[12px] text-warm-2 hover:text-warm-black mt-2 py-1"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}

function FlowDetailView({
  detail,
  chatInput,
  setChatInput,
  onSend,
  onClose,
}: {
  detail: FlowDetail;
  chatInput: string;
  setChatInput: (s: string) => void;
  onSend: () => void;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"none" | "complete" | "progress">("none");

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2">
      {/* Header */}
      <div className="h-[60px] px-6 flex items-center justify-between">
        <h1 className="text-base tracking-tight">{detail.title}</h1>
        <div className="flex items-center gap-2 text-warm-2">
          <button
            onClick={() => setStatus(status === "complete" ? "none" : "complete")}
            className={`flex items-center gap-1.5 px-2.5 h-8 rounded-md text-[13px] font-medium hover:bg-warm-base ${
              status === "complete" ? "text-[#047857]" : ""
            }`}
          >
            <CheckCircle2 className="w-4 h-4" strokeWidth={1.8} />
            Complete
          </button>
          <button
            onClick={() => setStatus(status === "progress" ? "none" : "progress")}
            className={`flex items-center gap-1.5 px-2.5 h-8 rounded-md text-[13px] font-medium hover:bg-warm-base ${
              status === "progress" ? "text-[#d97706]" : ""
            }`}
          >
            <Circle className="w-4 h-4" strokeWidth={1.8} strokeDasharray="3 2" />
            Progress
          </button>
          <button className="flex items-center gap-1.5 px-2.5 h-8 rounded-md text-[13px] font-medium hover:bg-warm-base">
            <Bookmark className="w-4 h-4" strokeWidth={1.8} />
            Save as SOP
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-warm-base"
            title="More"
          >
            <MoreVertical className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin">
        <div className="max-w-[820px] mx-auto">
          {/* User query bubble */}
          <div className="flex justify-end mb-5">
            <div className="bg-warm-base rounded-2xl px-4 py-3 text-[15px] leading-snug max-w-[85%]">
              {detail.query}
            </div>
          </div>

          {/* Table widget */}
          <div className="rounded-2xl border border-warm-gray-2 bg-white mb-6 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-warm-gray-2/70">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-warm-base border border-warm-gray-2 flex items-center justify-center text-[10px] font-bold">
                  T
                </span>
                <span className="text-[13px] font-medium">Table</span>
              </div>
              <div className="flex items-center gap-0.5 text-warm-2">
                <IconBtn title="Copy">
                  <Copy className="w-3.5 h-3.5" strokeWidth={1.8} />
                </IconBtn>
                <IconBtn title="Download">
                  <Download className="w-3.5 h-3.5" strokeWidth={1.8} />
                </IconBtn>
                <IconBtn title="Expand">
                  <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                </IconBtn>
              </div>
            </div>

            <ul className="divide-y divide-warm-gray-2/70">
              {detail.tableRows.map((row) => (
                <li key={row.id} className="px-4 py-3 flex gap-3 hover:bg-warm-bg-2/60">
                  <span
                    className="w-8 h-8 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0"
                    style={{ background: row.authorColor }}
                  >
                    {row.authorInitials}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[13px] font-medium">{row.authorName}</span>
                        <span className="text-[12px] text-[#5b5fd6]">{row.tag}</span>
                      </div>
                      <span className="text-[11px] text-warm-2 shrink-0">{row.date}</span>
                    </div>
                    <p className="text-[13px] leading-snug text-warm-black/85">{row.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between px-4 py-2.5 border-t border-warm-gray-2/70 bg-warm-bg-2/40">
              <span className="text-[12px] text-warm-2">
                Showing {detail.tableRows.length} of {detail.totalResults} results
              </span>
              <button className="flex items-center gap-1 text-[12px] text-[#3b82f6] hover:underline">
                View in new window <ArrowRight className="w-3 h-3" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Action cards — per-flow scenario */}
          {(() => {
            const scenario = getFlowActionScenario(detail.id);
            if (!scenario) return null;
            return (
              <div className="mb-6 space-y-3">
                {scenario.map((step, i) => {
                  if (step.kind === "narration") {
                    return (
                      <p key={i} className="text-[14px] text-warm-black/85">
                        {step.text}
                      </p>
                    );
                  }
                  if (step.kind === "user") {
                    return (
                      <div key={i} className="flex justify-end">
                        <div className="bg-warm-base rounded-2xl px-4 py-3 text-[15px] leading-snug max-w-[85%] text-warm-black">
                          {step.text}
                        </div>
                      </div>
                    );
                  }
                  if (step.kind === "analysis") {
                    return (
                      <p
                        key={i}
                        className="text-[12px] text-warm-2 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                        {step.label ?? "Analysis completed"}
                        <ChevronRight className="w-3 h-3" strokeWidth={2} />
                      </p>
                    );
                  }
                  if (step.kind === "email-card") {
                    return (
                      <SendEmailActionCard
                        key={i}
                        state={step.state}
                        recipients={step.recipients}
                        overflowCount={step.overflowCount}
                        subject={step.subject}
                        body={step.body}
                        attachmentNote={step.attachmentNote}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            );
          })()}

          {/* Long-form response */}
          <div className="space-y-4 text-[15px] leading-relaxed text-warm-black/90 mb-3">
            {detail.response.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Feedback actions */}
          <div className="flex items-center gap-1 text-warm-2 mb-6">
            <IconBtn title="Helpful">
              <ThumbsUp className="w-4 h-4" strokeWidth={1.8} />
            </IconBtn>
            <IconBtn title="Not helpful">
              <ThumbsDown className="w-4 h-4" strokeWidth={1.8} />
            </IconBtn>
            <IconBtn title="Copy">
              <Copy className="w-4 h-4" strokeWidth={1.8} />
            </IconBtn>
            <IconBtn title="Regenerate">
              <RefreshCw className="w-4 h-4" strokeWidth={1.8} />
            </IconBtn>
          </div>
        </div>
      </div>

      {/* Compose */}
      <div className="px-6 pb-6 pt-2">
        <div className="max-w-[820px] mx-auto">
          <div
            className="rounded-2xl border border-warm-gray-2 bg-white shadow-[0_1px_1.5px_rgba(38,32,28,0.02),0_4px_6px_rgba(38,32,28,0.02)] p-3"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(254,254,253) 33%, rgb(253,253,252) 66%, rgb(252,252,250) 100%)",
            }}
          >
            <div className="relative min-h-[24px]">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSend();
                  }
                }}
                rows={1}
                placeholder="Start your task..."
                className="w-full bg-transparent text-[15px] leading-6 outline-none resize-none placeholder:text-transparent"
              />
              {!chatInput && (
                <div className="absolute left-0 top-0 flex items-center gap-2 pointer-events-none">
                  <span className="text-warm-2 text-[15px]">Start your task...</span>
                  <span className="bg-warm-base px-1.5 py-0.5 rounded text-[10px] font-semibold text-warm-2">
                    TAB
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1.5">
                <ComposerOutlineBtn title="Add">
                  <Plus className="w-4 h-4" strokeWidth={1.8} />
                </ComposerOutlineBtn>
                <ComposerOutlineBtn title="AI">
                  <Sparkles className="w-4 h-4" strokeWidth={1.8} />
                </ComposerOutlineBtn>
              </div>
              <SendBtn onClick={onSend} disabled={!chatInput.trim()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
