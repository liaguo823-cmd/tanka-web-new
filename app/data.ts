export type WorkspaceItem = {
  id: string;
  letter: string;
  name: string;
  color: string;
  textColor?: string;
  badge?: number;
  faded?: boolean;
  active?: boolean;
  avatar?: string;
};

export const workspaces: WorkspaceItem[] = [
  {
    id: "s1",
    letter: "S",
    name: "Studio",
    color: "#ffffff",
    textColor: "#26201c",
    badge: 2,
    faded: true,
    avatar:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=120&fit=crop&q=80",
  },
  { id: "t", letter: "T", name: "Tanka", color: "#26201c", textColor: "#ffffff", active: true },
  {
    id: "n",
    letter: "N",
    name: "Notes",
    color: "#7f1d1d",
    textColor: "#ffffff",
    badge: 12,
    avatar:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=120&h=120&fit=crop&q=80",
  },
  {
    id: "a",
    letter: "A",
    name: "Acme",
    color: "#a36464",
    textColor: "#ffffff",
    faded: true,
    avatar:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=120&h=120&fit=crop&q=80",
  },
  { id: "s2", letter: "S", name: "Sales", color: "#047857", textColor: "#ffffff", badge: 3, faded: true },
  { id: "k", letter: "L", name: "Lab", color: "#6d28d9", textColor: "#ffffff", faded: true },
];

export type NavGroup = {
  id: string;
  items: NavItem[];
};

export type NavItem = {
  id: string;
  label: string;
  icon: string;
  children?: NavItem[];
  badge?: number;
};

export const navGroups: NavGroup[] = [
  {
    id: "main",
    items: [
      {
        id: "flow",
        label: "Flow",
        icon: "LayoutGrid",
        children: [
          { id: "sop", label: "SOP", icon: "BookOpen" },
          { id: "agent", label: "Agent", icon: "Box" },
        ],
      },
      { id: "chat", label: "Chat", icon: "MessageSquare" },
      { id: "link", label: "Link", icon: "Link2" },
    ],
  },
  {
    id: "more",
    items: [
      { id: "memos", label: "Memos", icon: "BookOpenText" },
      { id: "followups", label: "Follow-ups", icon: "Flag" },
      { id: "votes", label: "Votes", icon: "Check" },
      { id: "calendar", label: "Calendar", icon: "Calendar" },
    ],
  },
];

export type FlowItem = {
  id: string;
  title: string;
  preview: string;
  date: string;
  month: string;
  unread?: boolean;
  status?: "active" | "completed";
  forYou?: boolean;
  pinned?: boolean;
};

export const flowItems: FlowItem[] = [
  {
    id: "1",
    title: "Product roadmap",
    preview: "The team identified that users drop off when ...",
    date: "9:00 AM",
    month: "MAY",
    unread: true,
    status: "active",
    pinned: true,
  },
  {
    id: "2",
    title: "Tanka 监控告警处理跟进 SOP",
    preview: "05-11 每日告警扫描完成。今日结论：全绿，无需担心",
    date: "9:00 AM",
    month: "MAY",
    status: "active",
  },
  {
    id: "3",
    title: "跟进修改优先级交互优化报告",
    preview: "SOP 流程已总结，待确认保存",
    date: "Yesterday",
    month: "MAY",
    status: "active",
    forYou: true,
  },
  {
    id: "4",
    title: "从需求到交付，一个设计师的完整工作流清单",
    preview: "从接需求到上线，每个节点该做什么",
    date: "Yesterday",
    month: "MAY",
    status: "active",
  },
  {
    id: "5",
    title: "跟进修改优先级交互优化报告",
    preview: "SOP 流程已总结，待确认保存",
    date: "May 12",
    month: "MAY",
    status: "completed",
  },
  {
    id: "6",
    title: "Tanka 监控告警处理跟进 SOP",
    preview: "05-11 每日告警扫描完成。今日结论：全绿，无需担心",
    date: "May 11",
    month: "MAY",
    status: "completed",
  },
  {
    id: "7",
    title: "Tanka 监控告警处理跟进 SOP",
    preview: "05-11 每日告警扫描完成。今日结论：全绿，无需担心",
    date: "May 10",
    month: "MAY",
    status: "completed",
  },
  {
    id: "8",
    title: "跟进修改优先级交互优化报告",
    preview: "SOP 流程已总结，待确认保存",
    date: "May 09",
    month: "MAY",
    status: "completed",
    forYou: true,
  },
  {
    id: "9",
    title: "跟进修改优先级交互优化报告",
    preview: "SOP 流程已总结，待确认保存",
    date: "May 08",
    month: "MAY",
    status: "completed",
  },
];

export type ChatItem = {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  avatarUrl?: string;
  preview: string;
  time: string;
  pinned?: boolean;
  unread?: boolean;
  isGroup?: boolean;
  memberCount?: number;
  muted?: boolean;
};

const designTeamAvatar =
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&q=80";
const adamAvatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80";
const sarahAvatar =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80";
const marcusAvatar =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80";
const elenaAvatar =
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&q=80";
const davidAvatar =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80";
const priyaAvatar =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&q=80";
const huaAvatar =
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&q=80";
const naomiAvatar =
  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=120&h=120&fit=crop&q=80";
const jordanAvatar =
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=120&h=120&fit=crop&q=80";
const meiAvatar =
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120&h=120&fit=crop&q=80";
const liamAvatar =
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop&q=80";
const aliyaAvatar =
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=120&h=120&fit=crop&q=80";
const tomohiroAvatar =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&q=80";
const kavyaAvatar =
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=120&h=120&fit=crop&q=80";
const leoAvatar =
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=120&h=120&fit=crop&q=80";
const ninaAvatar =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&q=80";
const rohanAvatar =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80&sat=-20";

export const chatItems: ChatItem[] = [
  // Pinned
  {
    id: "design-team",
    name: "Design team",
    avatar: "D",
    avatarColor: "#7c6fb8",
    avatarUrl: designTeamAvatar,
    preview: "Sarah: Let's review the new onboarding flow tomorrow at 10",
    time: "9:42 AM",
    pinned: true,
    unread: true,
    isGroup: true,
    memberCount: 6,
  },
  {
    id: "founders",
    name: "Founders",
    avatar: "F",
    avatarColor: "#26201c",
    preview: "Marcus: Series A deck is ready for review",
    time: "9:18 AM",
    pinned: true,
    unread: true,
    isGroup: true,
    memberCount: 4,
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    avatar: "S",
    avatarColor: "#5b5fd6",
    avatarUrl: sarahAvatar,
    preview: "Sounds good, I'll send you the latest mocks",
    time: "9:08 AM",
    pinned: true,
  },

  // Today
  {
    id: "marcus-lee",
    name: "Marcus Lee",
    avatar: "M",
    avatarColor: "#10a37f",
    avatarUrl: marcusAvatar,
    preview: "You: I'm ready when you are",
    time: "8:51 AM",
    unread: true,
  },
  {
    id: "engineering",
    name: "Engineering",
    avatar: "E",
    avatarColor: "#0ea5e9",
    preview: "David: Deployed v2.4.1 to staging — please verify the auth fix",
    time: "8:30 AM",
    isGroup: true,
    memberCount: 12,
    unread: true,
  },
  {
    id: "elena-park",
    name: "Elena Park",
    avatar: "E",
    avatarColor: "#e89a8a",
    avatarUrl: elenaAvatar,
    preview: "Got the PRD draft, will send feedback by EOD",
    time: "Yesterday",
  },
  {
    id: "growth-pod",
    name: "Growth pod",
    avatar: "G",
    avatarColor: "#f59e0b",
    preview: "Priya: New activation experiment is live 🚀",
    time: "Yesterday",
    isGroup: true,
    memberCount: 5,
    muted: true,
  },
  {
    id: "david-li",
    name: "David Li",
    avatar: "D",
    avatarColor: "#047857",
    avatarUrl: davidAvatar,
    preview: "Updated the SOP doc — link in the message",
    time: "Yesterday",
  },
  {
    id: "all-hands",
    name: "All hands",
    avatar: "A",
    avatarColor: "#9333ea",
    preview: "Friday recap: this week's wins & next week's focus",
    time: "Mon",
    isGroup: true,
    memberCount: 17,
    muted: true,
  },
  {
    id: "priya-shah",
    name: "Priya Shah",
    avatar: "P",
    avatarColor: "#dc2626",
    avatarUrl: priyaAvatar,
    preview: "Quick sync on the launch — 15 min works?",
    time: "Mon",
  },
  {
    id: "product-leads",
    name: "Product leads",
    avatar: "P",
    avatarColor: "#5e6ad2",
    preview: "Elena: Roadmap q4 is shared in Memos",
    time: "Mon",
    isGroup: true,
    memberCount: 8,
  },
  {
    id: "hua-zhang",
    name: "Hua Zhang",
    avatar: "H",
    avatarColor: "#0891b2",
    preview: "Sent over the compliance checklist",
    time: "Fri",
  },
  {
    id: "design-critique",
    name: "Design critique",
    avatar: "D",
    avatarColor: "#a855f7",
    preview: "Sarah: New comp ready for review at 3 PM",
    time: "Fri",
    isGroup: true,
    memberCount: 7,
  },
];

export const designTeamAvatarUrl = designTeamAvatar;

export type GroupMember = {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  avatarColor: string;
  initials: string;
  status?: "online" | "away" | "offline";
};

export const groupMembers: Record<string, GroupMember[]> = {
  "design-team": [
    { id: "sarah", name: "Sarah Chen", role: "Design lead", avatarUrl: sarahAvatar, avatarColor: "#5b5fd6", initials: "SC", status: "online" },
    { id: "marcus", name: "Marcus Lee", role: "Product designer", avatarUrl: marcusAvatar, avatarColor: "#10a37f", initials: "ML", status: "online" },
    { id: "elena", name: "Elena Park", role: "Brand designer", avatarUrl: elenaAvatar, avatarColor: "#e89a8a", initials: "EP", status: "away" },
    { id: "naomi", name: "Naomi Iwasaki", role: "UX researcher", avatarUrl: naomiAvatar, avatarColor: "#a855f7", initials: "NI", status: "online" },
    { id: "leo", name: "Leo Martin", role: "Design engineer", avatarUrl: leoAvatar, avatarColor: "#0891b2", initials: "LM", status: "offline" },
    { id: "yiran", name: "Yiran Guo", role: "Founder", avatarColor: "#26201c", initials: "YG", status: "online" },
  ],
  "founders": [
    { id: "marcus", name: "Marcus Lee", role: "CEO", avatarUrl: marcusAvatar, avatarColor: "#10a37f", initials: "ML", status: "online" },
    { id: "elena", name: "Elena Park", role: "CPO", avatarUrl: elenaAvatar, avatarColor: "#e89a8a", initials: "EP", status: "online" },
    { id: "david", name: "David Li", role: "CTO", avatarUrl: davidAvatar, avatarColor: "#047857", initials: "DL", status: "online" },
    { id: "yiran", name: "Yiran Guo", role: "Founder", avatarColor: "#26201c", initials: "YG", status: "online" },
  ],
  "engineering": [
    { id: "david", name: "David Li", role: "Tech lead", avatarUrl: davidAvatar, avatarColor: "#047857", initials: "DL", status: "online" },
    { id: "priya", name: "Priya Shah", role: "Staff engineer", avatarUrl: priyaAvatar, avatarColor: "#dc2626", initials: "PS", status: "online" },
    { id: "hua", name: "Hua Zhang", role: "Backend engineer", avatarUrl: huaAvatar, avatarColor: "#0891b2", initials: "HZ", status: "online" },
    { id: "jordan", name: "Jordan Reyes", role: "Frontend engineer", avatarUrl: jordanAvatar, avatarColor: "#7856ff", initials: "JR", status: "away" },
    { id: "mei", name: "Mei Tanaka", role: "Platform engineer", avatarUrl: meiAvatar, avatarColor: "#f59e0b", initials: "MT", status: "online" },
    { id: "liam", name: "Liam O'Connor", role: "SRE", avatarUrl: liamAvatar, avatarColor: "#1473ff", initials: "LO", status: "offline" },
    { id: "aliya", name: "Aliya Khan", role: "ML engineer", avatarUrl: aliyaAvatar, avatarColor: "#ea4335", initials: "AK", status: "online" },
    { id: "tomo", name: "Tomohiro Sato", role: "Mobile engineer", avatarUrl: tomohiroAvatar, avatarColor: "#5e6ad2", initials: "TS", status: "offline" },
    { id: "kavya", name: "Kavya Rao", role: "Security engineer", avatarUrl: kavyaAvatar, avatarColor: "#7c3aed", initials: "KR", status: "online" },
    { id: "rohan", name: "Rohan Patel", role: "Junior engineer", avatarUrl: rohanAvatar, avatarColor: "#0079bf", initials: "RP", status: "online" },
    { id: "nina", name: "Nina Petrova", role: "QA lead", avatarUrl: ninaAvatar, avatarColor: "#d97706", initials: "NP", status: "away" },
    { id: "yiran", name: "Yiran Guo", role: "Founder", avatarColor: "#26201c", initials: "YG", status: "online" },
  ],
  "growth-pod": [
    { id: "priya", name: "Priya Shah", role: "Growth lead", avatarUrl: priyaAvatar, avatarColor: "#dc2626", initials: "PS", status: "online" },
    { id: "marcus", name: "Marcus Lee", role: "PM", avatarUrl: marcusAvatar, avatarColor: "#10a37f", initials: "ML", status: "online" },
    { id: "kavya", name: "Kavya Rao", role: "Data analyst", avatarUrl: kavyaAvatar, avatarColor: "#7c3aed", initials: "KR", status: "online" },
    { id: "jordan", name: "Jordan Reyes", role: "Engineer", avatarUrl: jordanAvatar, avatarColor: "#7856ff", initials: "JR", status: "away" },
    { id: "yiran", name: "Yiran Guo", role: "Founder", avatarColor: "#26201c", initials: "YG", status: "online" },
  ],
  "all-hands": [
    { id: "marcus", name: "Marcus Lee", role: "CEO", avatarUrl: marcusAvatar, avatarColor: "#10a37f", initials: "ML", status: "online" },
    { id: "elena", name: "Elena Park", role: "CPO", avatarUrl: elenaAvatar, avatarColor: "#e89a8a", initials: "EP", status: "online" },
    { id: "david", name: "David Li", role: "CTO", avatarUrl: davidAvatar, avatarColor: "#047857", initials: "DL", status: "online" },
    { id: "sarah", name: "Sarah Chen", role: "Design lead", avatarUrl: sarahAvatar, avatarColor: "#5b5fd6", initials: "SC", status: "online" },
    { id: "priya", name: "Priya Shah", role: "Growth", avatarUrl: priyaAvatar, avatarColor: "#dc2626", initials: "PS", status: "online" },
    { id: "hua", name: "Hua Zhang", role: "Engineering", avatarUrl: huaAvatar, avatarColor: "#0891b2", initials: "HZ", status: "online" },
    { id: "naomi", name: "Naomi Iwasaki", role: "Research", avatarUrl: naomiAvatar, avatarColor: "#a855f7", initials: "NI", status: "online" },
    { id: "leo", name: "Leo Martin", role: "Design eng", avatarUrl: leoAvatar, avatarColor: "#0891b2", initials: "LM", status: "online" },
    { id: "jordan", name: "Jordan Reyes", role: "Engineering", avatarUrl: jordanAvatar, avatarColor: "#7856ff", initials: "JR", status: "online" },
    { id: "mei", name: "Mei Tanaka", role: "Engineering", avatarUrl: meiAvatar, avatarColor: "#f59e0b", initials: "MT", status: "online" },
    { id: "aliya", name: "Aliya Khan", role: "ML", avatarUrl: aliyaAvatar, avatarColor: "#ea4335", initials: "AK", status: "online" },
    { id: "kavya", name: "Kavya Rao", role: "Data", avatarUrl: kavyaAvatar, avatarColor: "#7c3aed", initials: "KR", status: "online" },
    { id: "yiran", name: "Yiran Guo", role: "Founder", avatarColor: "#26201c", initials: "YG", status: "online" },
    { id: "tomo", name: "Tomohiro Sato", role: "Mobile", avatarUrl: tomohiroAvatar, avatarColor: "#5e6ad2", initials: "TS", status: "away" },
    { id: "liam", name: "Liam O'Connor", role: "SRE", avatarUrl: liamAvatar, avatarColor: "#1473ff", initials: "LO", status: "online" },
    { id: "nina", name: "Nina Petrova", role: "QA", avatarUrl: ninaAvatar, avatarColor: "#d97706", initials: "NP", status: "away" },
    { id: "rohan", name: "Rohan Patel", role: "Engineering", avatarUrl: rohanAvatar, avatarColor: "#0079bf", initials: "RP", status: "online" },
  ],
  "product-leads": [
    { id: "elena", name: "Elena Park", role: "CPO", avatarUrl: elenaAvatar, avatarColor: "#e89a8a", initials: "EP", status: "online" },
    { id: "sarah", name: "Sarah Chen", role: "Design lead", avatarUrl: sarahAvatar, avatarColor: "#5b5fd6", initials: "SC", status: "online" },
    { id: "marcus", name: "Marcus Lee", role: "PM", avatarUrl: marcusAvatar, avatarColor: "#10a37f", initials: "ML", status: "online" },
    { id: "david", name: "David Li", role: "CTO", avatarUrl: davidAvatar, avatarColor: "#047857", initials: "DL", status: "online" },
    { id: "priya", name: "Priya Shah", role: "Growth lead", avatarUrl: priyaAvatar, avatarColor: "#dc2626", initials: "PS", status: "online" },
    { id: "naomi", name: "Naomi Iwasaki", role: "Research", avatarUrl: naomiAvatar, avatarColor: "#a855f7", initials: "NI", status: "online" },
    { id: "hua", name: "Hua Zhang", role: "Eng manager", avatarUrl: huaAvatar, avatarColor: "#0891b2", initials: "HZ", status: "online" },
    { id: "yiran", name: "Yiran Guo", role: "Founder", avatarColor: "#26201c", initials: "YG", status: "online" },
  ],
  "design-critique": [
    { id: "sarah", name: "Sarah Chen", role: "Design lead", avatarUrl: sarahAvatar, avatarColor: "#5b5fd6", initials: "SC", status: "online" },
    { id: "marcus", name: "Marcus Lee", role: "Product designer", avatarUrl: marcusAvatar, avatarColor: "#10a37f", initials: "ML", status: "online" },
    { id: "elena", name: "Elena Park", role: "Brand designer", avatarUrl: elenaAvatar, avatarColor: "#e89a8a", initials: "EP", status: "online" },
    { id: "naomi", name: "Naomi Iwasaki", role: "UX researcher", avatarUrl: naomiAvatar, avatarColor: "#a855f7", initials: "NI", status: "online" },
    { id: "leo", name: "Leo Martin", role: "Design engineer", avatarUrl: leoAvatar, avatarColor: "#0891b2", initials: "LM", status: "online" },
    { id: "david", name: "David Li", role: "CTO", avatarUrl: davidAvatar, avatarColor: "#047857", initials: "DL", status: "away" },
    { id: "yiran", name: "Yiran Guo", role: "Founder", avatarColor: "#26201c", initials: "YG", status: "online" },
  ],
};

export function getGroupMembers(id: string): GroupMember[] {
  return groupMembers[id] ?? [];
}

export type ChatMessageTone = "urgent" | "celebrate" | "announce" | "idea";

export type ChatMessage = {
  id: string;
  author?: string;
  authorInitials?: string;
  authorColor?: string;
  text: string;
  time: string;
  self?: boolean;
  pinned?: boolean;
  tone?: ChatMessageTone;
  read?: boolean; // shows the green double-tick on sent messages
};

export const sampleConversation: ChatMessage[] = [
  {
    id: "m1",
    text: "What did design team discuss about the new onboarding flow last week in App?",
    time: "",
    self: true,
    pinned: true,
  },
  {
    id: "m2",
    author: "yiran Li",
    authorInitials: "YL",
    authorColor: "#7c6fb8",
    text: "Welcome to Shawn Guo's workspace. I'll be guiding the transition process over the next two weeks. Let's start by documenting your key responsibilities.",
    time: "9:00 AM",
  },
  {
    id: "m3",
    author: "Shawn Guo",
    authorInitials: "KL",
    authorColor: "#047857",
    text: "Hi everyone! Ready to make this a smooth transition.",
    time: "9:08 AM",
  },
  {
    id: "m4",
    text: "I'm ready!",
    time: "",
    self: true,
  },
];

export const chatConversations: Record<string, ChatMessage[]> = {
  "design-team": [
    {
      id: "dt-1",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Morning team! Posting yesterday's research findings shortly.",
      time: "8:45 AM",
    },
    {
      id: "dt-2",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Excited — I want to see the cohort breakdown for cohort C in particular.",
      time: "8:48 AM",
    },
    {
      id: "dt-3",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Quick update: the revised onboarding tested at 67% completion (up from 34%).",
      time: "9:12 AM",
    },
    {
      id: "dt-4",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "That's a huge jump. What was the biggest unlock?",
      time: "9:14 AM",
    },
    {
      id: "dt-5",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Two things: removing the workspace selector early and the new sample data on first run.",
      time: "9:16 AM",
    },
    {
      id: "dt-6",
      text: "Nice — does this hold across the SMB and Enterprise segments?",
      time: "9:18 AM",
      self: true,
    },
    {
      id: "dt-7",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "SMB is at 71%, Enterprise at 58%. Enterprise still gets stuck on the SSO step.",
      time: "9:22 AM",
    },
    {
      id: "dt-8",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "We can swap in the contextual help drawer there — David already prototyped one.",
      time: "9:30 AM",
    },
    {
      id: "dt-9",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Let's review the new onboarding flow tomorrow at 10 — I'll bring the latest comps.",
      time: "9:42 AM",
    },
    {
      id: "dt-10",
      text: "Sounds good. Can we also cover the empty-state copy?",
      time: "9:44 AM",
      self: true,
      read: true,
    },
    {
      id: "dt-11",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "+1 — I'll prep the variant matrix.",
      time: "9:46 AM",
    },
    {
      id: "dt-12",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "I'll grab the room and send a calendar invite.",
      time: "9:48 AM",
    },
    {
      id: "dt-13",
      text: "Perfect. Let's keep it tight — 45 min max.",
      time: "9:50 AM",
      self: true,
      read: true,
    },
    {
      id: "dt-14",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Agreed. I'll post the agenda in here by tonight.",
      time: "9:52 AM",
    },
  ],
  "founders": [
    {
      id: "f-1",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Series A deck is ready for review — link in Drive.",
      time: "9:18 AM",
    },
    {
      id: "f-2",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Reading now. The traction slide looks much sharper.",
      time: "9:20 AM",
    },
    {
      id: "f-3",
      text: "Let me give one more pass before our practice pitch tomorrow.",
      time: "9:24 AM",
      self: true,
    },
    {
      id: "f-4",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "One callout — we should reframe slide 7 around \"design partner momentum\" not \"customer count.\"",
      time: "9:30 AM",
    },
    {
      id: "f-5",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Strong agree. The customer count framing invited the wrong questions last time.",
      time: "9:32 AM",
    },
    {
      id: "f-6",
      text: "Done — pushed the v3 outline. Two new slides: market wedge and 24-month plan.",
      time: "10:01 AM",
      self: true,
    },
    {
      id: "f-7",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Wedge slide is clean. The 24-month plan needs softer milestones — investors will hold us to it.",
      time: "10:14 AM",
    },
    {
      id: "f-8",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Suggest swapping numeric ARR targets for ranges. Less to defend if we miss.",
      time: "10:16 AM",
    },
    {
      id: "f-9",
      text: "Good call. I'll redo it as bands with the base/stretch overlay.",
      time: "10:20 AM",
      self: true,
    },
    {
      id: "f-10",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Sequoia partner meeting confirmed for Thursday 11am. Let's do a dry run Wednesday EOD.",
      time: "10:35 AM",
    },
    {
      id: "f-11",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "On it. I'll book the room and queue up the Q&A flashcards.",
      time: "10:37 AM",
    },
    {
      id: "f-12",
      text: "Thanks both. This is going to be a great one.",
      time: "10:40 AM",
      self: true,
    },
  ],
  "sarah-chen": [
    {
      id: "s-1",
      text: "Hey, do you have the latest mocks for the dashboard?",
      time: "8:58 AM",
      self: true,
    },
    {
      id: "s-2",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Yep, just polishing the hover states.",
      time: "9:01 AM",
    },
    {
      id: "s-3",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Quick question — should the metric tiles use the warm-bg-2 fill or stay on the base canvas?",
      time: "9:03 AM",
    },
    {
      id: "s-4",
      text: "warm-bg-2 — that's what we landed on in last week's crit.",
      time: "9:04 AM",
      self: true,
    },
    {
      id: "s-5",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Got it. Also — for the sparkline color, is the design system still using #635bff?",
      time: "9:05 AM",
    },
    {
      id: "s-6",
      text: "Yes, but only at 80% opacity on light backgrounds.",
      time: "9:06 AM",
      self: true,
    },
    {
      id: "s-7",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Sounds good, I'll send you the latest mocks.",
      time: "9:08 AM",
    },
    {
      id: "s-8",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "By the way — the empty state for the dashboard. Are we going full illustration or staying with the iconography we use in Flow?",
      time: "9:10 AM",
    },
    {
      id: "s-9",
      text: "Stay consistent with Flow for now. We can revisit illustrations once we have a unified style.",
      time: "9:11 AM",
      self: true,
    },
    {
      id: "s-10",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Perfect. Sending the Figma link in a sec.",
      time: "9:13 AM",
    },
  ],
  "marcus-lee": [
    {
      id: "m-1",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Free for a quick sync on the launch timeline?",
      time: "8:40 AM",
    },
    {
      id: "m-2",
      text: "I'm ready when you are.",
      time: "8:51 AM",
      self: true,
    },
    {
      id: "m-3",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Two things — first, the GA window. Are we still aiming for the Tuesday after Memorial Day?",
      time: "8:53 AM",
    },
    {
      id: "m-4",
      text: "That's the plan, assuming the auth migration finishes by then. Engineering is tracking green so far.",
      time: "8:55 AM",
      self: true,
    },
    {
      id: "m-5",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "And second — Sarah wants to do a walkthrough video the week of launch. Worth carving time?",
      time: "8:57 AM",
    },
    {
      id: "m-6",
      text: "Yes. Let's block half a day on the Thursday before. I'll align with comms.",
      time: "8:59 AM",
      self: true,
    },
    {
      id: "m-7",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Great. Last thing — should we hold a private design partner preview a week earlier?",
      time: "9:02 AM",
    },
    {
      id: "m-8",
      text: "I think so. Gives us a final round of feedback and a great moment for them.",
      time: "9:04 AM",
      self: true,
    },
    {
      id: "m-9",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Cool. I'll draft an invite list and run it by you tomorrow.",
      time: "9:06 AM",
    },
    {
      id: "m-10",
      text: "Sounds good. Thanks Marcus.",
      time: "9:07 AM",
      self: true,
    },
  ],
  "engineering": [
    {
      id: "e-1",
      author: "David Li",
      authorInitials: "DL",
      authorColor: "#0ea5e9",
      text: "Deployed v2.4.1 to staging — please verify the auth fix.",
      time: "8:30 AM",
    },
    {
      id: "e-2",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "Running smoke tests now. Will report back in 20.",
      time: "8:33 AM",
    },
    {
      id: "e-3",
      author: "Hua Zhang",
      authorInitials: "HZ",
      authorColor: "#0891b2",
      text: "Tip: the new session cookie path needs the SameSite=Lax flag.",
      time: "8:41 AM",
    },
    {
      id: "e-4",
      text: "Got it. Filing a hotfix PR.",
      time: "8:44 AM",
      self: true,
      read: true,
    },
    {
      id: "e-5",
      author: "David Li",
      authorInitials: "DL",
      authorColor: "#0ea5e9",
      text: "Hotfix merged. Re-deploying staging — should be live in 4 min.",
      time: "8:52 AM",
    },
    {
      id: "e-6",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "Smoke tests green on the first six suites. Auth + workspace switch both passing.",
      time: "9:01 AM",
    },
    {
      id: "e-7",
      author: "Hua Zhang",
      authorInitials: "HZ",
      authorColor: "#0891b2",
      text: "One flake on the websocket reconnect test — re-running.",
      time: "9:04 AM",
    },
    {
      id: "e-8",
      author: "Hua Zhang",
      authorInitials: "HZ",
      authorColor: "#0891b2",
      text: "Reran — passing. Likely the staging redis hiccup again.",
      time: "9:07 AM",
    },
    {
      id: "e-9",
      text: "Nice work team. Let's hold the release until Priya's perf run finishes.",
      time: "9:10 AM",
      self: true,
    },
    {
      id: "e-10",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "P95 is at 142ms, P99 at 410ms. Below thresholds.",
      time: "9:24 AM",
    },
    {
      id: "e-11",
      author: "David Li",
      authorInitials: "DL",
      authorColor: "#0ea5e9",
      text: "Cutting the release branch now. Tagging v2.4.2.",
      time: "9:28 AM",
    },
    {
      id: "e-12",
      text: "Ship it. Thanks all.",
      time: "9:30 AM",
      self: true,
      read: true,
    },
  ],
  "elena-park": [
    {
      id: "ep-1",
      text: "Want to look at the PRD draft before the eng review?",
      time: "Yesterday",
      self: true,
    },
    {
      id: "ep-2",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Yes please — would love to redline section 3 specifically.",
      time: "Yesterday",
    },
    {
      id: "ep-3",
      text: "Sent over the link. Section 3 is where I'm least confident about the success metrics.",
      time: "Yesterday",
      self: true,
    },
    {
      id: "ep-4",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Reading now. The metrics are mostly leading indicators — should we anchor one lagging metric too?",
      time: "Yesterday",
    },
    {
      id: "ep-5",
      text: "Good point. I was thinking time-to-second-task. Lagging enough but still measurable in 30 days.",
      time: "Yesterday",
      self: true,
    },
    {
      id: "ep-6",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Perfect. Adding a note in the doc.",
      time: "Yesterday",
    },
    {
      id: "ep-7",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Also — the user research callouts in section 5 are gold. Quote them in the launch post.",
      time: "Yesterday",
    },
    {
      id: "ep-8",
      text: "Will do. Thanks Elena 🙏",
      time: "Yesterday",
      self: true,
    },
    {
      id: "ep-9",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Got the PRD draft, will send feedback by EOD.",
      time: "Yesterday",
    },
  ],
  "growth-pod": [
    {
      id: "g-1",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "New activation experiment is live — variant B should hit 5% lift if our model is right.",
      time: "Yesterday",
    },
    {
      id: "g-2",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Let's give it 7 days before reading any signal.",
      time: "Yesterday",
    },
    {
      id: "g-3",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "Agreed — though we can peek at the assignment split daily to make sure the experiment is healthy.",
      time: "Yesterday",
    },
    {
      id: "g-4",
      text: "Make sure we're not double-counting users with multiple workspaces.",
      time: "Yesterday",
      self: true,
    },
    {
      id: "g-5",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "Good catch. I added a dedupe on workspace_id in the dashboard query.",
      time: "Yesterday",
    },
    {
      id: "g-6",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Question — are we also tracking the secondary metric (retention at D7)?",
      time: "Yesterday",
    },
    {
      id: "g-7",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "Yes, instrumented. Will set up the alert if D7 drops more than 3% in either arm.",
      time: "Yesterday",
    },
    {
      id: "g-8",
      text: "Perfect. Let's regroup Monday with the first read.",
      time: "Yesterday",
      self: true,
    },
    {
      id: "g-9",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Calendar invite sent.",
      time: "Yesterday",
    },
    {
      id: "g-10",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "Thanks both. Crossing fingers for a clean read.",
      time: "Yesterday",
    },
  ],
  "david-li": [
    {
      id: "d-1",
      author: "David Li",
      authorInitials: "DL",
      authorColor: "#0ea5e9",
      text: "Updated the SOP doc — link in the message thread.",
      time: "Yesterday",
    },
    {
      id: "d-2",
      text: "Thanks, will review tonight.",
      time: "Yesterday",
      self: true,
    },
    {
      id: "d-3",
      author: "David Li",
      authorInitials: "DL",
      authorColor: "#0ea5e9",
      text: "Heads up — I restructured the incident response section. Now starts with severity classification, then on-call rotation.",
      time: "Yesterday",
    },
    {
      id: "d-4",
      text: "That ordering makes more sense. Did you keep the runbook links inline?",
      time: "Yesterday",
      self: true,
    },
    {
      id: "d-5",
      author: "David Li",
      authorInitials: "DL",
      authorColor: "#0ea5e9",
      text: "Yes, but I also added a quick-reference table at the top.",
      time: "Yesterday",
    },
    {
      id: "d-6",
      author: "David Li",
      authorInitials: "DL",
      authorColor: "#0ea5e9",
      text: "One thing I want your eyes on — the section on post-mortem ownership. Currently says \"the on-call engineer\" but maybe it should be the manager?",
      time: "Yesterday",
    },
    {
      id: "d-7",
      text: "Manager makes sense for sev-1, on-call for everything else. Let's call that out.",
      time: "Yesterday",
      self: true,
    },
    {
      id: "d-8",
      author: "David Li",
      authorInitials: "DL",
      authorColor: "#0ea5e9",
      text: "Good split. Updating now.",
      time: "Yesterday",
    },
  ],
  "all-hands": [
    {
      id: "ah-1",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Friday recap is up. Wins this week: +12% activation, shipped the new SOP library, closed 2 enterprise deals.",
      time: "Mon",
    },
    {
      id: "ah-2",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Big shoutout to the eng team on the auth migration 🎉",
      time: "Mon",
    },
    {
      id: "ah-3",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "And to design for the new onboarding — the numbers speak for themselves.",
      time: "Mon",
    },
    {
      id: "ah-4",
      author: "David Li",
      authorInitials: "DL",
      authorColor: "#0ea5e9",
      text: "Quick note: starting next week we're moving the all-hands to Tuesdays at 9am PT to better accommodate APAC.",
      time: "Mon",
    },
    {
      id: "ah-5",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "Appreciate the time shift! Much more friendly for the Singapore folks.",
      time: "Mon",
    },
    {
      id: "ah-6",
      author: "Hua Zhang",
      authorInitials: "HZ",
      authorColor: "#0891b2",
      text: "Big thanks from the Shanghai office too.",
      time: "Mon",
    },
    {
      id: "ah-7",
      text: "Friendly reminder — Q2 OKR check-ins are due Wednesday.",
      time: "Mon",
      self: true,
    },
    {
      id: "ah-8",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Template is pinned in the Memos channel.",
      time: "Mon",
    },
    {
      id: "ah-9",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Reminder: Friday is our team off-site planning session. Bring ideas for the off-site theme.",
      time: "Mon",
    },
    {
      id: "ah-10",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "I have a thought — \"build less, ship more.\" 😄",
      time: "Mon",
    },
    {
      id: "ah-11",
      text: "Love it. Let's hold a quick vote on Friday.",
      time: "Mon",
      self: true,
    },
  ],
  "priya-shah": [
    {
      id: "p-1",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "Quick sync on the launch — 15 min works?",
      time: "Mon",
    },
    {
      id: "p-2",
      text: "Yes, send a calendar invite for 3?",
      time: "Mon",
      self: true,
    },
    {
      id: "p-3",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "Invite sent. Want to focus on the activation funnel and the AB test ramp plan.",
      time: "Mon",
    },
    {
      id: "p-4",
      text: "Great. I want to discuss whether we ramp to 50% or stay at 25% for week one.",
      time: "Mon",
      self: true,
    },
    {
      id: "p-5",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "My instinct is 25% — gives us a clean week of clean data before we expand.",
      time: "Mon",
    },
    {
      id: "p-6",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "But I'd be open to 35% if the early signal is strong.",
      time: "Mon",
    },
    {
      id: "p-7",
      text: "Let's plan for 25% with a clear ramp gate at D3.",
      time: "Mon",
      self: true,
    },
    {
      id: "p-8",
      author: "Priya Shah",
      authorInitials: "PS",
      authorColor: "#dc2626",
      text: "Works for me. I'll prep a decision doc.",
      time: "Mon",
    },
  ],
  "product-leads": [
    {
      id: "pl-1",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Roadmap Q4 is shared in Memos. Review by Wed please.",
      time: "Mon",
    },
    {
      id: "pl-2",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Looking now — quick q on the platform investment bucket.",
      time: "Mon",
    },
    {
      id: "pl-3",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Are we still committing the design system v2 work to Q4 or is it slipping?",
      time: "Mon",
    },
    {
      id: "pl-4",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Committing it. We have a clear line of sight after the recent hire.",
      time: "Mon",
    },
    {
      id: "pl-5",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "I'm worried about the search rewrite scope. It's currently sized as 8 weeks but historically these have doubled.",
      time: "Mon",
    },
    {
      id: "pl-6",
      text: "Let's split it into a phase 1 (relevance) and phase 2 (filters). Ship phase 1 in Q4, phase 2 in Q1.",
      time: "Mon",
      self: true,
    },
    {
      id: "pl-7",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "Smart. I'll restructure the doc and resend.",
      time: "Mon",
    },
    {
      id: "pl-8",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Appreciate it. The phase split also makes the comms story cleaner.",
      time: "Mon",
    },
    {
      id: "pl-9",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Adding a design dependency note on the search work — we'll need new patterns for the filter UI.",
      time: "Mon",
    },
    {
      id: "pl-10",
      text: "Tagging David's team for an early eng feasibility chat. Let's keep this moving.",
      time: "Mon",
      self: true,
    },
  ],
  "hua-zhang": [
    {
      id: "h-1",
      author: "Hua Zhang",
      authorInitials: "HZ",
      authorColor: "#0891b2",
      text: "Sent over the compliance checklist — please confirm receipt.",
      time: "Fri",
    },
    {
      id: "h-2",
      text: "Got it, will sign off by Tuesday.",
      time: "Fri",
      self: true,
    },
    {
      id: "h-3",
      author: "Hua Zhang",
      authorInitials: "HZ",
      authorColor: "#0891b2",
      text: "Thanks. Two items I'd appreciate eyes on — the SOC2 evidence list and the data retention schedule.",
      time: "Fri",
    },
    {
      id: "h-4",
      text: "Will review the retention schedule first — that's where we have the most exposure.",
      time: "Fri",
      self: true,
    },
    {
      id: "h-5",
      author: "Hua Zhang",
      authorInitials: "HZ",
      authorColor: "#0891b2",
      text: "Perfect. Also, our auditor wants a walkthrough of the access control model next week.",
      time: "Fri",
    },
    {
      id: "h-6",
      text: "I can host that — Wednesday afternoon works. Send me their availability.",
      time: "Fri",
      self: true,
    },
    {
      id: "h-7",
      author: "Hua Zhang",
      authorInitials: "HZ",
      authorColor: "#0891b2",
      text: "Will do. Appreciate you taking this on directly.",
      time: "Fri",
    },
  ],
  "design-critique": [
    {
      id: "dc-1",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "New comp ready for review at 3 PM — link in the thread.",
      time: "Fri",
    },
    {
      id: "dc-2",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "Joining from a coffee shop, audio might be spotty.",
      time: "Fri",
    },
    {
      id: "dc-3",
      author: "Elena Park",
      authorInitials: "EP",
      authorColor: "#e89a8a",
      text: "First reaction: love the clarity of the new hierarchy. The header treatment is much stronger.",
      time: "Fri",
    },
    {
      id: "dc-4",
      author: "David Li",
      authorInitials: "DL",
      authorColor: "#0ea5e9",
      text: "Quick concern on the right rail — feels a bit visually heavy compared to the main column.",
      time: "Fri",
    },
    {
      id: "dc-5",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Fair. I'll try reducing the contrast on the divider and dropping the surface fill.",
      time: "Fri",
    },
    {
      id: "dc-6",
      text: "And maybe a touch more breathing room above the AI panel?",
      time: "Fri",
      self: true,
    },
    {
      id: "dc-7",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Agreed — I'll push the panel down by 8px.",
      time: "Fri",
    },
    {
      id: "dc-8",
      author: "Marcus Lee",
      authorInitials: "ML",
      authorColor: "#10a37f",
      text: "One more — the empty state still feels a bit generic. Can we lean into Tanka voice more?",
      time: "Fri",
    },
    {
      id: "dc-9",
      author: "Sarah Chen",
      authorInitials: "SC",
      authorColor: "#5b5fd6",
      text: "Will rewrite. Thanks all — v3 by Monday.",
      time: "Fri",
    },
  ],
};

export function getChatConversation(id: string): ChatMessage[] {
  return chatConversations[id] ?? sampleConversation;
}

export const suggestedTasks = [
  "Turn my marketing numbers into clear visualization",
  "Draft the launch announcement for next week",
  "Summarize the design review from Tuesday",
  "Build a dashboard for our weekly KPIs",
];

export type TableRow = {
  id: string;
  authorInitials: string;
  authorName: string;
  authorColor: string;
  tag: string;
  date: string;
  text: string;
};

export type FlowDetail = {
  id: string;
  title: string;
  query: string;
  tableRows: TableRow[];
  totalResults: number;
  response: string[];
};

export const flowDetails: Record<string, FlowDetail> = {
  "1": {
    id: "1",
    title: "Product roadmap",
    query:
      "What did design team discuss about the new onboarding flow last week in App?",
    tableRows: [
      {
        id: "r1",
        authorInitials: "SC",
        authorName: "Sarah Chen",
        authorColor: "#5b5fd6",
        tag: "#design",
        date: "Nov 12",
        text: "I think the onboarding flow needs to start with the value prop before asking for permissions. Users are dropping off at step 2 because we're hitting them with the notification prompt...",
      },
      {
        id: "r2",
        authorInitials: "SC",
        authorName: "Sarah Chen",
        authorColor: "#5b5fd6",
        tag: "#design-critiques",
        date: "Nov 15",
        text: "Quick update: we tested the revised onboarding with 5 users yesterday. Completion rate improved from 34% to 67%",
      },
    ],
    totalResults: 12,
    response: [
      "The team identified that users drop off when asked for permissions before understanding the app's value. Marcus mocked up a flow that delays the notification prompt until after the first task.",
      "The team identified that users drop off when asked for permissions before understanding the app's value. Marcus mocked up a flow that delays the notification prompt until after the first task.",
    ],
  },
  "2": {
    id: "2",
    title: "Tanka 监控告警处理跟进 SOP",
    query: "今天 Tanka 监控告警的处理情况怎么样？",
    tableRows: [
      {
        id: "r1",
        authorInitials: "DL",
        authorName: "David Li",
        authorColor: "#0ea5e9",
        tag: "#monitoring",
        date: "05-11 09:02",
        text: "每日告警扫描完成。今日共扫描 142 个服务节点，无 P0/P1 级别告警；P2 告警 3 条已自动收敛。",
      },
      {
        id: "r2",
        authorInitials: "TZ",
        authorName: "Tianzhi Zhao",
        authorColor: "#10b981",
        tag: "#sre",
        date: "05-11 09:15",
        text: "确认结论：全绿，无需值班介入。已同步到 #ops-daily 频道。",
      },
    ],
    totalResults: 8,
    response: [
      "今日告警扫描结果：全部 142 个服务节点状态正常，无 P0/P1 告警。3 条 P2 告警已自动收敛，无需人工介入。",
      "建议：维持当前监控阈值；下一次例行扫描将在明日 09:00 自动执行。",
    ],
  },
  "3": {
    id: "3",
    title: "跟进修改优先级交互优化报告",
    query: "目前优先级交互优化的进展如何？还差哪些步骤可以确认保存？",
    tableRows: [
      {
        id: "r1",
        authorInitials: "YG",
        authorName: "yiran guo",
        authorColor: "#7c6fb8",
        tag: "#design-review",
        date: "Yesterday",
        text: "已经把高/中/低三档优先级的视觉权重重新梳理，对应到 chip + 左侧色条两种表达形态。",
      },
      {
        id: "r2",
        authorInitials: "AT",
        authorName: "Adam Thompson",
        authorColor: "#e89a8a",
        tag: "#product",
        date: "Today",
        text: "方向 OK。需要补一份 RICE 评分表的截图、以及在批量操作场景下的交互演示。",
      },
    ],
    totalResults: 6,
    response: [
      "SOP 流程已总结：① 收集设计稿 → ② 跨端走查 → ③ 输出对比表 → ④ 评审通过后归档。当前进度卡在第三步，待补 RICE 评分表截图。",
      "建议：补齐截图后，将完整 SOP 保存到 Memos / Library 中作为后续优先级讨论的引用基线。",
    ],
  },
  "4": {
    id: "4",
    title: "从需求到交付，一个设计师的完整工作流清单",
    query: "从接需求到上线，每个节点设计师应该做什么？",
    tableRows: [
      {
        id: "r1",
        authorInitials: "JM",
        authorName: "Jessie Ma",
        authorColor: "#f59e0b",
        tag: "#workflow",
        date: "Yesterday",
        text: "需求接收 → kickoff 对齐 → 用研验证 → 设计稿 → 评审 → 交付走查 → 上线复盘，共 7 个阶段。",
      },
      {
        id: "r2",
        authorInitials: "YG",
        authorName: "yiran guo",
        authorColor: "#7c6fb8",
        tag: "#design-system",
        date: "Yesterday",
        text: "每个阶段都附了对应的 checklist 模板，可以直接 fork 到当前项目里。",
      },
    ],
    totalResults: 14,
    response: [
      "完整 workflow 一共 7 个阶段：接需求 → kickoff → 用研 → 设计稿 → 评审 → 交付走查 → 上线复盘。每个阶段都配了独立 checklist。",
      "建议把这份清单 pin 到 Flow 顶部，作为新项目启动模板。",
    ],
  },
};

const fallbackDetail = (item: FlowItem): FlowDetail => ({
  id: item.id,
  title: item.title,
  query: `跟进一下「${item.title}」目前的进展。`,
  tableRows: [
    {
      id: "r1",
      authorInitials: "TK",
      authorName: "Tanka",
      authorColor: "#26201c",
      tag: "#auto-summary",
      date: item.date,
      text: item.preview,
    },
  ],
  totalResults: 4,
  response: [
    item.preview,
    "如需展开完整内容，可以使用底部输入框继续提问 — Tanka 会基于上下文给出更深入的分析。",
  ],
});

export function getFlowDetail(item: FlowItem): FlowDetail {
  return flowDetails[item.id] ?? fallbackDetail(item);
}

/* ===========================
 * Per-flow action scenarios (Send Email cards + surrounding conversation)
 * Each step renders distinctly in FlowDetailView.
 * =========================== */
export type FlowActionStep =
  | { kind: "narration"; text: string }
  | { kind: "user"; text: string }
  | { kind: "analysis"; label?: string }
  | {
      kind: "email-card";
      state: "proposed" | "completed" | "expired";
      recipients: Array<{ id: string; name: string; avatarUrl?: string; color?: string }>;
      overflowCount?: number;
      subject: string;
      body: string;
      attachmentNote?: string;
    };

const sharedRecipients = (variant: 0 | 1) => {
  const photos = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&h=60&fit=crop&q=80",
  ];
  const namesA = ["李欣言", "刘嘉欣", "何裕", "张云熙", "张浩然", "李雨晴"];
  const namesB = ["李欣言", "张雪迎", "李云熙", "张浩然", "王家鑫"];
  const names = variant === 0 ? namesA : namesB;
  return names.map((name, i) => ({
    id: `r${i}`,
    name,
    avatarUrl: photos[i],
  }));
};

export const flowActionScenarios: Record<string, FlowActionStep[]> = {
  // 1 — Product roadmap (onboarding redesign)
  "1": [
    {
      kind: "narration",
      text: "We can also turn this insight into a sync email so the whole team is aligned.",
    },
    {
      kind: "user",
      text: "Good idea. Send it to the product + design pod with the latest completion-rate numbers.",
    },
    { kind: "narration", text: "On it — drafting now." },
    { kind: "analysis" },
    {
      kind: "email-card",
      state: "proposed",
      recipients: sharedRecipients(0),
      overflowCount: 12,
      subject: "Onboarding flow redesign — completion lifted from 34% → 67%",
      body: `Sharing the latest results from the new onboarding flow:
• Completion rate: 34% → 67% (+33pp) across 5-user usability round
• Biggest unlocks: deferred notification prompt + value-prop screen on entry
• Open question: SSO path still drops in Enterprise — proposal attached
We'll cover this in tomorrow's product/design sync — please bring any blockers.`,
      attachmentNote: "2 assets from this Work",
    },
    {
      kind: "email-card",
      state: "completed",
      recipients: sharedRecipients(0),
      overflowCount: 12,
      subject: "Onboarding flow redesign — completion lifted from 34% → 67%",
      body: `Sharing the latest results from the new onboarding flow:
• Completion rate: 34% → 67% (+33pp) across 5-user usability round
• Biggest unlocks: deferred notification prompt + value-prop screen on entry
• Open question: SSO path still drops in Enterprise — proposal attached
We'll cover this in tomorrow's product/design sync — please bring any blockers.`,
      attachmentNote: "2 assets from this Work",
    },
    { kind: "narration", text: "Sent to the product + design pod. Tomorrow's sync invite is pinned." },
    {
      kind: "email-card",
      state: "expired",
      recipients: sharedRecipients(1),
      overflowCount: 8,
      subject: "[Reminder] Onboarding flow review — agenda before tomorrow",
      body: `Quick reminder to flag any open items for the onboarding review tomorrow at 10:00.
If nothing surfaced in the last 24h I'll keep the doc unchanged.`,
      attachmentNote: "1 doc linked",
    },
    { kind: "user", text: "Let it expire — nothing to add from my side." },
    { kind: "narration", text: "Got it. Reminder cancelled." },
  ],

  // 2 — Tanka 监控告警处理跟进 SOP
  "2": [
    {
      kind: "narration",
      text: "今天的扫描结果可以同步给值班组吗？我可以帮你起草。",
    },
    {
      kind: "user",
      text: "可以，发到 #ops-daily，重点说明 142 个节点全绿以及 P2 自动收敛的处理结果。",
    },
    { kind: "narration", text: "好的，我已经把数据整理成日报草稿。" },
    { kind: "analysis" },
    {
      kind: "email-card",
      state: "proposed",
      recipients: [
        { id: "r1", name: "ops-daily", avatarUrl: "https://cdn.simpleicons.org/slack/4a154b" },
        { id: "r2", name: "David Li", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&q=80" },
        { id: "r3", name: "Tianzhi Zhao", color: "#10b981" },
        { id: "r4", name: "Priya Shah", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&q=80" },
      ],
      overflowCount: 6,
      subject: "[Daily] Tanka 监控告警 05-11 扫描汇总",
      body: `今日扫描结果：
• 服务节点: 142 个全绿
• P0 / P1 告警: 0 条
• P2 告警: 3 条 (已自动收敛, 无需介入)
建议保持当前阈值；下一次例行扫描将于明日 09:00 自动执行。`,
      attachmentNote: "扫描日志 + 阈值配置 共 2 份附件",
    },
    {
      kind: "email-card",
      state: "completed",
      recipients: [
        { id: "r1", name: "ops-daily", avatarUrl: "https://cdn.simpleicons.org/slack/4a154b" },
        { id: "r2", name: "David Li", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&q=80" },
        { id: "r3", name: "Tianzhi Zhao", color: "#10b981" },
        { id: "r4", name: "Priya Shah", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&q=80" },
      ],
      overflowCount: 6,
      subject: "[Daily] Tanka 监控告警 05-11 扫描汇总",
      body: `今日扫描结果：
• 服务节点: 142 个全绿
• P0 / P1 告警: 0 条
• P2 告警: 3 条 (已自动收敛, 无需介入)
建议保持当前阈值；下一次例行扫描将于明日 09:00 自动执行。`,
      attachmentNote: "扫描日志 + 阈值配置 共 2 份附件",
    },
    { kind: "narration", text: "已经成功发送到 #ops-daily 并同步给值班组。" },
  ],

  // 3 — 跟进修改优先级交互优化报告
  "3": [
    {
      kind: "narration",
      text: "需要我把这份进展整理成给产品的同步邮件吗？",
    },
    {
      kind: "user",
      text: "可以，重点说明 SOP 已经走到第三步，差 RICE 评分截图。",
    },
    { kind: "narration", text: "好的，邮件草稿已经准备好了。" },
    { kind: "analysis" },
    {
      kind: "email-card",
      state: "proposed",
      recipients: [
        { id: "r1", name: "Adam Thompson", avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&q=80" },
        { id: "r2", name: "yiran guo", color: "#7c6fb8" },
        { id: "r3", name: "Sarah Chen", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&q=80" },
      ],
      overflowCount: 4,
      subject: "优先级交互优化 — 进度同步与待办",
      body: `进度：
1. 高/中/低三档优先级视觉权重已重新梳理
2. 对应 chip + 左侧色条两种表达形态产出完毕
3. SOP 已走完 3/4：收集 → 走查 → 输出对比表 → (待) 评审归档
待办：补 RICE 评分表截图 + 批量操作场景演示。`,
      attachmentNote: "1 doc + 3 mocks linked",
    },
    {
      kind: "email-card",
      state: "completed",
      recipients: [
        { id: "r1", name: "Adam Thompson", avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&q=80" },
        { id: "r2", name: "yiran guo", color: "#7c6fb8" },
        { id: "r3", name: "Sarah Chen", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&q=80" },
      ],
      overflowCount: 4,
      subject: "优先级交互优化 — 进度同步与待办",
      body: `进度：
1. 高/中/低三档优先级视觉权重已重新梳理
2. 对应 chip + 左侧色条两种表达形态产出完毕
3. SOP 已走完 3/4：收集 → 走查 → 输出对比表 → (待) 评审归档
待办：补 RICE 评分表截图 + 批量操作场景演示。`,
      attachmentNote: "1 doc + 3 mocks linked",
    },
    { kind: "narration", text: "邮件已经发出，截图补齐后再追一封确认。" },
  ],

  // 4 — 从需求到交付，一个设计师的完整工作流清单
  "4": [
    {
      kind: "narration",
      text: "需要把这份工作流清单转成给新同学的入门 onboarding 邮件吗？",
    },
    {
      kind: "user",
      text: "可以，发给本期 design intern 团，重点突出每个阶段的 checklist。",
    },
    { kind: "narration", text: "好的，我来组织成入门邮件。" },
    { kind: "analysis" },
    {
      kind: "email-card",
      state: "proposed",
      recipients: [
        { id: "r1", name: "Jessie Ma", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&q=80" },
        { id: "r2", name: "yiran guo", color: "#7c6fb8" },
        { id: "r3", name: "Leo Martin", avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=60&h=60&fit=crop&q=80" },
      ],
      overflowCount: 9,
      subject: "Designer workflow — 7-stage checklist for new joiners",
      body: `Welcome to the design pod. The end-to-end workflow has 7 stages:
1. 接需求 — kickoff alignment
2. Kickoff — scope + success metrics
3. 用研验证 — at least 5 interviews
4. 设计稿 — explore 3 directions
5. 评审 — design crit + product review
6. 交付走查 — handoff + visual QA
7. 上线复盘 — retro + Memo entry
Each stage has its own checklist template — fork into your project doc to start.`,
      attachmentNote: "7 checklist templates linked",
    },
    {
      kind: "email-card",
      state: "completed",
      recipients: [
        { id: "r1", name: "Jessie Ma", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&q=80" },
        { id: "r2", name: "yiran guo", color: "#7c6fb8" },
        { id: "r3", name: "Leo Martin", avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=60&h=60&fit=crop&q=80" },
      ],
      overflowCount: 9,
      subject: "Designer workflow — 7-stage checklist for new joiners",
      body: `Welcome to the design pod. The end-to-end workflow has 7 stages:
1. 接需求 — kickoff alignment
2. Kickoff — scope + success metrics
3. 用研验证 — at least 5 interviews
4. 设计稿 — explore 3 directions
5. 评审 — design crit + product review
6. 交付走查 — handoff + visual QA
7. 上线复盘 — retro + Memo entry
Each stage has its own checklist template — fork into your project doc to start.`,
      attachmentNote: "7 checklist templates linked",
    },
    { kind: "narration", text: "邮件已发送给 12 位新同学，附 checklist 模板可直接 fork。" },
  ],
};

export function getFlowActionScenario(id: string): FlowActionStep[] | null {
  return flowActionScenarios[id] ?? null;
}

export type LinkCategoryKey =
  | "all"
  | "productivity"
  | "communication"
  | "growth"
  | "data"
  | "design"
  | "finance";

export type LinkTool = {
  id: string;
  name: string;
  letter: string;
  letterColor: string;
  letterBg: string;
  iconUrl: string;
  category: Exclude<LinkCategoryKey, "all">;
  linked: boolean;
};

export const linkCategories: Array<{ key: LinkCategoryKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "productivity", label: "Productivity" },
  { key: "communication", label: "Communication" },
  { key: "growth", label: "Customer & Growth" },
  { key: "data", label: "Data & Analytics" },
  { key: "design", label: "Content & Design" },
  { key: "finance", label: "Finance & Management" },
];

export const linkTools: LinkTool[] = [
  // Productivity (5 linked)
  { id: "notion", name: "Notion", letter: "N", letterColor: "#0f1112", letterBg: "#f4f2ee", iconUrl: "https://cdn.simpleicons.org/notion/000000", category: "productivity", linked: true },
  { id: "google-drive", name: "Google Drive", letter: "G", letterColor: "#1a73e8", letterBg: "#eaf2fc", iconUrl: "https://cdn.simpleicons.org/googledrive/1a73e8", category: "productivity", linked: true },
  { id: "google-sheets", name: "Google Sheets", letter: "S", letterColor: "#0f9d58", letterBg: "#e6f5ec", iconUrl: "https://cdn.simpleicons.org/googlesheets/0f9d58", category: "productivity", linked: true },
  { id: "jira", name: "Jira", letter: "J", letterColor: "#2684ff", letterBg: "#e6f0ff", iconUrl: "https://cdn.simpleicons.org/jira/2684ff", category: "productivity", linked: true },
  { id: "github", name: "GitHub", letter: "G", letterColor: "#0f1112", letterBg: "#f4f2ee", iconUrl: "https://cdn.simpleicons.org/github/0f1112", category: "productivity", linked: true },
  // Communication (2 linked)
  { id: "slack", name: "Slack", letter: "S", letterColor: "#4a154b", letterBg: "#f4ecf4", iconUrl: "https://cdn.simpleicons.org/slack/4a154b", category: "communication", linked: true },
  { id: "gmail", name: "Gmail", letter: "G", letterColor: "#ea4335", letterBg: "#fdecea", iconUrl: "https://cdn.simpleicons.org/gmail/ea4335", category: "communication", linked: true },
  // Customer & Growth (1 linked)
  { id: "salesforce", name: "Salesforce", letter: "S", letterColor: "#00a1e0", letterBg: "#e6f5fc", iconUrl: "https://cdn.simpleicons.org/salesforce/00a1e0", category: "growth", linked: true },
  // Data & Analytics (2 linked)
  { id: "mixpanel", name: "Mixpanel", letter: "M", letterColor: "#7856ff", letterBg: "#efebff", iconUrl: "https://cdn.simpleicons.org/mixpanel/7856ff", category: "data", linked: true },
  { id: "google-analytics", name: "Google Analytics", letter: "G", letterColor: "#e8a40f", letterBg: "#fdf5e0", iconUrl: "https://cdn.simpleicons.org/googleanalytics/e8a40f", category: "data", linked: true },
  // Content & Design (1 linked)
  { id: "figma", name: "Figma", letter: "F", letterColor: "#e35d33", letterBg: "#fdecea", iconUrl: "https://cdn.simpleicons.org/figma/e35d33", category: "design", linked: true },
  // Finance & Management (1 linked)
  { id: "stripe", name: "Stripe", letter: "S", letterColor: "#635bff", letterBg: "#eceaff", iconUrl: "https://cdn.simpleicons.org/stripe/635bff", category: "finance", linked: true },

  // Unlinked (17)
  { id: "linear", name: "Linear", letter: "L", letterColor: "#5e6ad2", letterBg: "#ecedfb", iconUrl: "https://cdn.simpleicons.org/linear/5e6ad2", category: "productivity", linked: false },
  { id: "confluence", name: "Confluence", letter: "C", letterColor: "#0052cc", letterBg: "#e0eaff", iconUrl: "https://cdn.simpleicons.org/confluence/0052cc", category: "productivity", linked: false },
  { id: "asana", name: "Asana", letter: "A", letterColor: "#f06a6a", letterBg: "#fdecec", iconUrl: "https://cdn.simpleicons.org/asana/f06a6a", category: "productivity", linked: false },
  { id: "monday", name: "Monday", letter: "M", letterColor: "#ff3d57", letterBg: "#fdeaed", iconUrl: "https://icons.duckduckgo.com/ip3/monday.com.ico", category: "productivity", linked: false },
  { id: "trello", name: "Trello", letter: "T", letterColor: "#0079bf", letterBg: "#e0eef9", iconUrl: "https://cdn.simpleicons.org/trello/0079bf", category: "productivity", linked: false },
  { id: "intercom", name: "Intercom", letter: "I", letterColor: "#286efa", letterBg: "#e6efff", iconUrl: "https://cdn.simpleicons.org/intercom/286efa", category: "communication", linked: false },
  { id: "zoom", name: "Zoom", letter: "Z", letterColor: "#2d8cff", letterBg: "#e6f1ff", iconUrl: "https://cdn.simpleicons.org/zoom/2d8cff", category: "communication", linked: false },
  { id: "discord", name: "Discord", letter: "D", letterColor: "#5865f2", letterBg: "#eceefe", iconUrl: "https://cdn.simpleicons.org/discord/5865f2", category: "communication", linked: false },
  { id: "hubspot", name: "HubSpot", letter: "H", letterColor: "#ff7a59", letterBg: "#ffefe9", iconUrl: "https://cdn.simpleicons.org/hubspot/ff7a59", category: "growth", linked: false },
  { id: "amplitude", name: "Amplitude", letter: "A", letterColor: "#1473ff", letterBg: "#e6eeff", iconUrl: "https://icons.duckduckgo.com/ip3/amplitude.com.ico", category: "data", linked: false },
  { id: "tableau", name: "Tableau", letter: "T", letterColor: "#1f74b8", letterBg: "#e3eef7", iconUrl: "https://icons.duckduckgo.com/ip3/tableau.com.ico", category: "data", linked: false },
  { id: "looker", name: "Looker", letter: "L", letterColor: "#4285f4", letterBg: "#e8efff", iconUrl: "https://cdn.simpleicons.org/looker/4285f4", category: "data", linked: false },
  { id: "sketch", name: "Sketch", letter: "S", letterColor: "#f7b500", letterBg: "#fff5db", iconUrl: "https://cdn.simpleicons.org/sketch/f7b500", category: "design", linked: false },
  { id: "canva", name: "Canva", letter: "C", letterColor: "#00c4cc", letterBg: "#dff9fb", iconUrl: "https://icons.duckduckgo.com/ip3/canva.com.ico", category: "design", linked: false },
  { id: "framer", name: "Framer", letter: "F", letterColor: "#0055ff", letterBg: "#e0eaff", iconUrl: "https://cdn.simpleicons.org/framer/0055ff", category: "design", linked: false },
  { id: "quickbooks", name: "QuickBooks", letter: "Q", letterColor: "#2ca01c", letterBg: "#e7f4e3", iconUrl: "https://cdn.simpleicons.org/quickbooks/2ca01c", category: "finance", linked: false },
  { id: "xero", name: "Xero", letter: "X", letterColor: "#13b5ea", letterBg: "#dff5fc", iconUrl: "https://cdn.simpleicons.org/xero/13b5ea", category: "finance", linked: false },
];

export type Connector = {
  id: string;
  name: string;
  description: string;
  icon: string; // 1-letter monogram fallback
  color: string;
  connected: boolean;
  category: "communication" | "knowledge" | "calendar" | "data" | "code";
};

export const connectors: Connector[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Sync channels & DMs into Tanka",
    icon: "#",
    color: "#4a154b",
    connected: true,
    category: "communication",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Pull threads & draft replies",
    icon: "M",
    color: "#ea4335",
    connected: true,
    category: "communication",
  },
  {
    id: "ws",
    name: "WhatsApp",
    description: "Bring personal chats into your flow",
    icon: "W",
    color: "#25d366",
    connected: false,
    category: "communication",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Read & write across your workspace",
    icon: "N",
    color: "#26201c",
    connected: true,
    category: "knowledge",
  },
  {
    id: "confluence",
    name: "Confluence",
    description: "Mirror spaces and meeting notes",
    icon: "C",
    color: "#0052cc",
    connected: false,
    category: "knowledge",
  },
  {
    id: "drive",
    name: "Google Drive",
    description: "Search & summarize any document",
    icon: "D",
    color: "#1a73e8",
    connected: true,
    category: "knowledge",
  },
  {
    id: "gcal",
    name: "Google Calendar",
    description: "Surface events & prep notes",
    icon: "G",
    color: "#4285f4",
    connected: true,
    category: "calendar",
  },
  {
    id: "outlook",
    name: "Outlook Calendar",
    description: "Two-way sync your Outlook calendar",
    icon: "O",
    color: "#0078d4",
    connected: false,
    category: "calendar",
  },
  {
    id: "linear",
    name: "Linear",
    description: "Pull tickets & status updates",
    icon: "L",
    color: "#5e6ad2",
    connected: true,
    category: "code",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Watch PRs, issues, and reviews",
    icon: "G",
    color: "#0d1117",
    connected: false,
    category: "code",
  },
  {
    id: "jira",
    name: "Jira",
    description: "Sync sprints, epics, and tickets",
    icon: "J",
    color: "#0052cc",
    connected: false,
    category: "code",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Pull revenue, churn, and disputes",
    icon: "S",
    color: "#635bff",
    connected: false,
    category: "data",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Account & opportunity context",
    icon: "S",
    color: "#00a1e0",
    connected: false,
    category: "data",
  },
];

export const connectorCategories: Array<{ key: Connector["category"]; label: string }> = [
  { key: "communication", label: "Communication" },
  { key: "knowledge", label: "Knowledge" },
  { key: "calendar", label: "Calendar" },
  { key: "code", label: "Engineering" },
  { key: "data", label: "Data & Revenue" },
];

