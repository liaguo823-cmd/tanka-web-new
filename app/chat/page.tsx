/**
 * Chat page — 1:1 reproduction of Figma node 3:7689
 * https://www.figma.com/design/g3hP5KN8lZgmJiOKsGqVE3/Web-端导航优化?node-id=3-7689
 *
 * This page is intentionally just a composition of four Figma-exported
 * components. Each component is a near-verbatim port of what the Figma
 * MCP `get_design_context` tool returned, with image URLs swapped to
 * local /figma/… paths and `var(--token, fallback)` references stripped
 * to their fallback values.
 *
 *   ┌──────┬───────┬─────────┬─────────────────────┐
 *   │ Org  │ Menu  │  ChatA  │       ChatC         │
 *   │ 60px │ 180px │  376px  │      flex-1         │
 *   └──────┴───────┴─────────┴─────────────────────┘
 */

import OrgRail from "./_components/OrgRail";
import Menu from "./_components/Menu";
import ChatA from "./_components/ChatA";
import ChatC from "./_components/ChatC";


export default function ChatPage() {
  return (
    <div
      className="h-screen w-screen flex bg-[#eef1f7] overflow-hidden"
      style={{
        fontFamily:
          '"SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif',
      }}
    >
      <OrgRail />
      <Menu />
      <ChatA />
      <ChatC />
    </div>
  );
}
