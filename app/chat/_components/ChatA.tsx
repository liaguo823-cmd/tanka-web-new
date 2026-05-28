"use client";

import { asset } from "../../_lib/asset";

const imgImage12 = asset("/figma/chata-image12.png");
const imgAvatarExample = asset("/figma/chata-avatar-1.png");
const imgAvatarExample1 = asset("/figma/chata-avatar-2.png");
const imgAvatarExample2 = asset("/figma/chata-avatar-3.png");
const imgAvatarExample3 = asset("/figma/chata-avatar-4.png");
const imgAvatarExample4 = asset("/figma/chata-avatar-5.png");
const imgAvatarExample5 = asset("/figma/chata-avatar-6.png");
const imgPathStroke = asset("/figma/chata-header-chat.svg");
const imgVector = asset("/figma/chata-header-user.svg");
const imgVector1 = asset("/figma/chata-header-plus.svg");
const imgLine1 = asset("/figma/chata-line1.svg");
const imgUnion = asset("/figma/chata-union.svg");
const imgLine2 = asset("/figma/chata-line2.svg");
const imgVector2 = asset("/figma/chata-vector-time.svg");
const imgVector3 = asset("/figma/chata-vector-mute.svg");
const imgVector4 = asset("/figma/chata-vector-pin.svg");
const img = asset("/figma/chata-icon-misc.svg");

const FONT_SF_PRO = "font-['SF_Pro',-apple-system,'BlinkMacSystemFont','Helvetica_Neue',sans-serif]";
const FONT_SF_PRO_MEDIUM = "font-['SF_Pro',-apple-system,'BlinkMacSystemFont','Helvetica_Neue',sans-serif]";

export default function ChatA() {
  return (
    <div className="border-[#e7ebf8] border-r border-solid content-stretch flex flex-col items-center px-[0.5px] relative w-[376px] shrink-0 h-full" data-node-id="3:7726" data-name="ChatA">
      <div className="bg-[#f7f8fc] content-stretch flex flex-col h-[1040px] items-start relative shrink-0 w-full" data-node-id="3:7742" data-name="Contants">
        {/* Title bar */}
        <div className="bg-[#f7f8fc] border-[#e7ebf8] border-b border-solid content-stretch flex gap-[9px] h-[72px] items-center min-h-[44px] pb-[3.5px] pt-[3px] px-[15px] relative shrink-0 w-full" data-node-id="26:20913" data-name="Title_2025">
          <div className="flex-[1_0_0] min-w-px relative" data-node-id="I26:20913;1149:2198" data-name="middle">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[9px] items-center relative size-full">
              <div className="flex flex-row items-center self-stretch">
                <div className="content-stretch flex flex-col h-full items-start justify-center min-h-[24px] relative shrink-0" data-node-id="I26:20913;1149:2200" data-name="title">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="I26:20913;1149:2201">
                    <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[600] leading-[22.4px] overflow-hidden relative shrink-0 text-[18px] text-[#020617] text-ellipsis whitespace-nowrap`} data-node-id="I26:20913;1149:2202" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Chat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full min-w-[0.5px] relative shrink-0" data-node-id="I26:20913;1149:2207" data-name="right">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[9px] items-center min-w-[inherit] relative size-full">
              <button type="button" aria-label="Chat" className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 cursor-pointer">
                <div className="relative shrink-0 size-[24px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPathStroke} />
                </div>
              </button>
              <button type="button" aria-label="People" className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 cursor-pointer">
                <div className="relative shrink-0 size-[24px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                </div>
              </button>
              <button type="button" aria-label="New chat" className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 cursor-pointer">
                <div className="relative shrink-0 size-[24px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="bg-[#f7f8fc] content-stretch flex items-center relative shrink-0 w-full" data-node-id="3:7783">
          <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="3:7784">
            <div className="content-stretch flex gap-[0px] items-start px-[15px] py-[0px] relative shrink-0" data-node-id="3:7785" data-name="tab">
              <div className="border-[#006dff] border-b border-solid content-stretch flex items-start py-[9px] relative shrink-0" data-node-id="I3:7785;8:12662" data-name="tab">
                <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[21px] relative shrink-0 text-[#006dff] text-[15px] whitespace-nowrap`} data-node-id="I3:7785;8:12663" style={{ fontVariationSettings: "'wdth' 100" }}>
                  All
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[0px] items-start px-[15px] py-[0px] relative shrink-0" data-node-id="3:7786" data-name="tab">
              <div className="content-stretch flex items-start py-[9px] relative shrink-0" data-node-id="I3:7786;8:12665" data-name="tab">
                <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[21px] relative shrink-0 text-[#8793ab] text-[15px] whitespace-nowrap`} data-node-id="I3:7786;8:12666" style={{ fontVariationSettings: "'wdth' 100" }}>
                  AI Hub
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center self-stretch">
            <div className="content-stretch flex h-full items-center px-[15px] relative shrink-0" data-node-id="3:7787">
              <div className="relative shrink-0 size-[18px]" data-node-id="3:7788" data-name="Tanka/ChatA More Tabs">
                <div className="absolute inset-[19.79%_6.25%_80.21%_6.25%]" data-node-id="I3:7788;44:52391">
                  <div className="absolute inset-[-1.13px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine1} />
                  </div>
                </div>
                <div className="absolute inset-[53.13%_6.25%_46.88%_6.25%]" data-node-id="I3:7788;44:52392">
                  <div className="absolute inset-[-1.13px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine1} />
                  </div>
                </div>
                <div className="absolute inset-[86.46%_6.25%_13.54%_6.25%]" data-node-id="I3:7788;44:52393">
                  <div className="absolute inset-[-1.13px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat list */}
        <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px relative w-[375px]" data-node-id="3:7789">
          {/* Row 1: AI Assistant (SELECTED state, has image 12 overlay) */}
          <div className="bg-[rgba(227,232,242,0.6)] content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full" data-node-id="3:7790" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="I3:7790;1040:34748" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="I3:7790;8:12823" data-name="Content">
                <div className="opacity-0 relative shrink-0 size-[48px]" data-node-id="I3:7790;1054:46235" data-name="Avatar">
                  <div className="absolute bg-[#cce4ff] inset-0 rounded-[999px]" data-node-id="I3:7790;1054:46235;186:43018" data-name="Tanka Service">
                    <div className="absolute inset-[14.91%_14.21%]" data-node-id="I3:7790;1054:46235;186:43018;44:55826" data-name="Union">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUnion} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="I3:7790;8:12827" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="I3:7790;8:12828" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="I3:7790;8:12829" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="I3:7790;118:22202" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:7790;118:22202;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          AI Assistant
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="I3:7790;44:120327" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:7790;44:120327;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        9:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="I3:7790;233:33698" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="I3:7790;233:33699" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[normal] max-w-[335px] min-w-px overflow-hidden relative text-[14px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:7790;233:33699;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="I3:7790;1040:38754" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="I3:7790;1040:42540" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="I3:7790;1040:42541" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="I3:7790;67:5788">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* image 12 absolute overlay (sits over Row 1 / "AI Assistant" avatar position) */}
          <div className="absolute border-[1.333px] border-[rgba(15,41,77,0.05)] border-solid left-[24px] rounded-[342.514px] size-[48px] top-[12px]" data-node-id="3:7791" data-name="image 12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[342.514px]">
              <img alt="" className="absolute left-[1.04%] max-w-none size-full top-[-1.04%]" src={imgImage12} />
            </div>
          </div>

          {/* Row "messages row" (3:7795) — divider-only spacer row from Figma */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:7795" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="3:7796" data-name="Content">
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="3:7823" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="3:7824" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="3:7825" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="3:7826">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Discuss Group (green avatar w/ time icon, gray badge "9", muted icon) - node 3:7832 — SELECTED */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:7832" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="3:7833" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="3:7834" data-name="Content">
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 size-[48px]" data-node-id="3:7835" data-name="头像">
                  <div className="relative shrink-0 size-[48px]" data-node-id="3:7836" data-name="默认">
                    <div className="absolute bg-[#00bc67] left-[14.4px] opacity-30 rounded-[385.701px] size-[38.4px] top-[0px]" data-node-id="3:7837" data-name="Avatar" />
                    <div className="absolute bg-[#00bc67] border-[1.44px] border-white border-solid content-stretch flex items-center left-[4.8px] p-[9.6px] rounded-[479.52px] top-[4.8px]" data-node-id="3:7841">
                      <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-node-id="3:7842" data-name="icon-wrapper-2025">
                        <div className="relative shrink-0 size-[9.216px]" data-node-id="I3:7842;2899:35079" data-name="Format=Outline, Weight=Regular">
                          <div className="absolute inset-[18.74%_0.87%_18.71%_0.85%]" data-node-id="I3:7842;2899:35079;288:89287" data-name="Vector">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="3:7843" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="3:7844" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="3:7845" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="3:7847" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:7847;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Discuss Group
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:7850" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:7850;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        9:30 AM
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="3:7851" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="3:7852" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[normal] max-w-[335px] min-w-px overflow-hidden relative text-[14px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:7852;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[12px]" data-node-id="3:7853" data-name="icon-wrapper-2025/12">
                      <div className="absolute inset-0" data-node-id="I3:7853;732:109609" data-name="Format=Outline, Weight=Fill">
                        <div className="absolute inset-[14.06%_14.06%_10.94%_11.11%]" data-node-id="I3:7853;732:109609;1633:76300" data-name="Vector">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector3} />
                        </div>
                      </div>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[12px]" data-node-id="3:7854" data-name="icon-wrapper-2025/12">
                      <div className="absolute inset-0" data-node-id="I3:7854;732:109609" data-name="Format=Outline, Weight=Fill">
                        <div className="absolute inset-[9.38%_3.13%_9.38%_6.25%]" data-node-id="I3:7854;732:109609;288:37676" data-name="Vector">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} />
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#8793ab] content-stretch flex flex-col h-[16px] items-center justify-center min-w-[15px] px-[3px] relative rounded-[49.5px] shrink-0" data-node-id="3:7855" data-name="Badge">
                      <div className={`[word-break:break-word] flex flex-col ${FONT_SF_PRO} font-[300] justify-center leading-[0] relative shrink-0 text-white text-[11px] text-center whitespace-nowrap`} data-node-id="I3:7855;124:29886" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[14.3px]">9</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="3:7858" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="3:7859" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="3:7860" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="3:7861">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: AI Innovation Hub (cyan avatar "TK", blue badge with mention) - node 3:7797 */}
          <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="3:7797" data-name="Content">
            <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 size-[48px]" data-node-id="3:7798" data-name="头像">
              <div className="relative shrink-0 size-[48px]" data-node-id="3:7799" data-name="默认">
                <div className="absolute bg-[#00b1d1] left-[14.4px] opacity-30 rounded-[385.701px] size-[38.4px] top-[0px]" data-node-id="3:7800" data-name="Avatar" />
                <div className="absolute bg-[#00b1d1] border-[1.44px] border-white border-solid left-[4.8px] rounded-[479.52px] size-[38.4px] top-[4.8px]" data-node-id="3:7804">
                  <div className={`-translate-y-1/2 [word-break:break-word] absolute flex flex-col ${FONT_SF_PRO} font-normal justify-center leading-[0] left-[6.64px] text-[18.24px] text-white top-[19.2px] whitespace-nowrap`} data-node-id="3:7805" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[24.192px]">TK</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="3:7806" data-name="content">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="3:7807" data-name="first line">
                <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="3:7808" data-name="left">
                  <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="3:7810" data-name="Chat Name">
                    <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:7810;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                      AI Innovation Hub
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:7813" data-name="Message Row/Time">
                  <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:7813;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                    9:20 AM
                  </p>
                </div>
              </div>
              <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="3:7814" data-name="second line">
                <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="3:7815" data-name="Second Line">
                  <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[0] max-w-[335px] min-w-px overflow-hidden relative text-[14px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:7815;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <span className={`${FONT_SF_PRO_MEDIUM} font-[510] leading-[normal] text-[#005eff]`} style={{ fontVariationSettings: "'wdth' 100" }}>{`[@You] `}</span>
                    <span className="leading-[normal]">Welcome to Tanka</span>
                  </p>
                </div>
                <div className="overflow-clip relative shrink-0 size-[12px]" data-node-id="3:7817" data-name="icon-wrapper-2025/12">
                  <div className="absolute inset-0" data-node-id="I3:7817;732:109609" data-name="Format=Outline, Weight=Fill">
                    <div className="absolute inset-[9.38%_3.13%_9.38%_6.25%]" data-node-id="I3:7817;732:109609;288:37676" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} />
                    </div>
                  </div>
                </div>
                <div className="bg-[#006dff] content-stretch flex flex-col h-[16px] items-center justify-center min-w-[15px] px-[3px] relative rounded-[49.5px] shrink-0" data-node-id="3:7820" data-name="Badge">
                  <div className={`[word-break:break-word] flex flex-col ${FONT_SF_PRO} font-[300] justify-center leading-[0] relative shrink-0 text-white text-[11px] text-center whitespace-nowrap`} data-node-id="I3:7820;124:29886" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[14.3px]">9</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Tanka team (mint avatar with shape) - node 3:7867 */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:7867" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="I3:7867;1040:34748" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="I3:7867;8:12823" data-name="Content">
                <div className="relative shrink-0 size-[48px]" data-node-id="I3:7867;1054:46235" data-name="Avatar">
                  <div className="absolute bg-[#25d8be] inset-0 rounded-[999px]" data-node-id="I3:7867;1054:46235;186:43018" data-name="Tanka Service">
                    <div className="absolute inset-[30.21%_23.96%_26.04%_26.04%]" data-node-id="I3:7867;1054:46235;186:43018;8:13098" data-name="形状结合">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={img} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="I3:7867;8:12827" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="I3:7867;8:12828" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="I3:7867;8:12829" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="I3:7867;118:22202" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:7867;118:22202;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Tanka team
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="I3:7867;44:120327" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:7867;44:120327;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        9:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="I3:7867;233:33698" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="I3:7867;233:33699" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[normal] max-w-[335px] min-w-px overflow-hidden relative text-[14px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:7867;233:33699;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="I3:7867;1040:38754" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="I3:7867;1040:42540" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="I3:7867;1040:42541" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="I3:7867;67:5788">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 5: Tanka Product Design (lime "TKOF" avatar, [@All] mention, blue badge) - node 3:7868 */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:7868" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="3:7869" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="3:7870" data-name="Content">
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 size-[48px]" data-node-id="3:7871" data-name="头像">
                  <div className="relative shrink-0 size-[48px]" data-node-id="3:7872" data-name="默认">
                    <div className="absolute bg-[#86c021] left-[10px] opacity-30 rounded-[385.701px] size-[38.4px] top-0" data-node-id="3:7873" data-name="Avatar" />
                    <div className="absolute bg-[#86c021] border-[1.44px] border-white border-solid left-[4.8px] rounded-[479.52px] size-[38.4px] top-[4.8px]" data-node-id="3:7877">
                      <div className={`-translate-y-1/2 [word-break:break-word] absolute flex flex-col ${FONT_SF_PRO} font-normal justify-center leading-[0] left-[4.8px] text-[11.52px] text-white top-[19.3px] whitespace-nowrap`} data-node-id="3:7878" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[16.128px]">TKOF</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="3:7879" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="3:7880" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="3:7881" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="3:7883" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:7883;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Tanka Product Design
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:7886" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:7886;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        2/8/2025
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="3:7887" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="3:7888" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[0] max-w-[335px] min-w-px overflow-hidden relative text-[14px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:7888;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <span className={`${FONT_SF_PRO_MEDIUM} font-[510] leading-[normal] text-[#005eff]`} style={{ fontVariationSettings: "'wdth' 100" }}>{`[@All] `}</span>
                        <span className="leading-[normal]">Welcome to Tanka</span>
                      </p>
                    </div>
                    <div className="bg-[#006dff] content-stretch flex flex-col h-[16px] items-center justify-center min-w-[16px] px-[3px] relative rounded-[49.5px] shrink-0" data-node-id="3:7893" data-name="Badge">
                      <div className={`[word-break:break-word] flex flex-col ${FONT_SF_PRO} font-[300] justify-center leading-[0] relative shrink-0 text-white text-[11px] text-center whitespace-nowrap`} data-node-id="I3:7893;44:64326" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[14.3px]">9</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="3:7896" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="3:7897" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="3:7898" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="3:7899">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 6: Tanka Product Design (purple avatar 产品设计) - node 3:7905 */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:7905" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="3:7906" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="3:7907" data-name="Content">
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 size-[48px]" data-node-id="3:7908" data-name="头像">
                  <div className="relative shrink-0 size-[48px]" data-node-id="3:7909" data-name="默认">
                    <div className="absolute bg-[#4d39e9] left-[14.4px] opacity-30 rounded-[385.701px] size-[38.4px] top-[0px]" data-node-id="3:7910" data-name="Avatar" />
                    <div className="absolute bg-[#4d39e9] border-[1.44px] border-white border-solid left-[4.8px] rounded-[479.52px] size-[38.4px] top-[4.8px]" data-node-id="3:7914">
                      <div className={`-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col ${FONT_SF_PRO} font-[400] justify-center leading-[0] left-[19.2px] text-[10.56px] text-white text-center top-[19.72px] tracking-[1.056px] w-[27.36px]`} data-node-id="3:7915" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[normal]">产品设计</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="3:7916" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="3:7917" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="3:7918" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="3:7920" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:7920;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Tanka Product Design
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:7923" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:7923;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        2/8/2025
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="3:7924" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="3:7925" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[normal] max-w-[335px] min-w-px overflow-hidden relative text-[14px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:7925;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="3:7932" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="3:7933" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="3:7934" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="3:7935">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 7: Tanka Product Design (deep blue avatar 产品设计) - node 3:7941 */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:7941" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="3:7942" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="3:7943" data-name="Content">
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 size-[48px]" data-node-id="3:7944" data-name="头像">
                  <div className="relative shrink-0 size-[48px]" data-node-id="3:7945" data-name="默认">
                    <div className="absolute bg-[#0b4594] left-[14.4px] opacity-30 rounded-[385.701px] size-[38.4px] top-[0px]" data-node-id="3:7946" data-name="Avatar" />
                    <div className="absolute bg-[#0b4594] border-[1.44px] border-white border-solid left-[4.8px] rounded-[479.52px] size-[38.4px] top-[4.8px]" data-node-id="3:7950">
                      <div className={`-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col ${FONT_SF_PRO} font-[400] justify-center leading-[0] left-[19.2px] text-[10.56px] text-white text-center top-[19.72px] tracking-[1.056px] w-[27.36px]`} data-node-id="3:7951" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[normal]">产品设计</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="3:7952" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="3:7953" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="3:7954" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="3:7956" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:7956;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Tanka Product Design
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:7959" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:7959;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        2/8/2025
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="3:7960" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="3:7961" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[normal] max-w-[335px] min-w-px overflow-hidden relative text-[14px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:7961;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="3:7968" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="3:7969" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="3:7970" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="3:7971">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 8: Charlotte Miller (photo avatar) - node 3:7977 */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:7977" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="I3:7977;1040:34748" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="I3:7977;8:12823" data-name="Content">
                <div className="overflow-clip relative rounded-[999px] shrink-0 size-[48px]" data-node-id="I3:7977;1054:46235" data-name="Avatar">
                  <div className="absolute inset-0 overflow-clip rounded-[999px]" data-node-id="I3:7977;1054:46235;1085:40500" data-name="Avatar Example">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatarExample} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="I3:7977;8:12827" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="I3:7977;8:12828" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="I3:7977;8:12829" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="I3:7977;118:22202" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:7977;118:22202;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Charlotte Miller
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="I3:7977;44:120327" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:7977;44:120327;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        2/8/2025
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="I3:7977;233:33698" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="I3:7977;233:33699" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[normal] max-w-[335px] min-w-px overflow-hidden relative text-[14px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:7977;233:33699;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="I3:7977;1040:38754" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="I3:7977;1040:42540" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="I3:7977;1040:42541" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="I3:7977;67:5788">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 9: Tanka Product Design dark + nested duplicate row (node 3:7978 contains 2 sub-rows: 3:7980 dark "产品设计" + 3:8005 green "TKOF") */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:7978" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="3:7979" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="3:7980" data-name="Content">
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 size-[48px]" data-node-id="3:7981" data-name="头像">
                  <div className="relative shrink-0 size-[48px]" data-node-id="3:7982" data-name="默认">
                    <div className="absolute bg-[#072955] left-[14.4px] opacity-30 rounded-[385.701px] size-[38.4px] top-[0px]" data-node-id="3:7983" data-name="Avatar" />
                    <div className="absolute bg-[#072955] border-[1.44px] border-white border-solid left-[4.8px] rounded-[479.52px] size-[38.4px] top-[4.8px]" data-node-id="3:7987">
                      <div className={`-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col ${FONT_SF_PRO} font-[400] justify-center leading-[0] left-[19.2px] text-[10.56px] text-white text-center top-[19.72px] tracking-[1.056px] w-[27.36px]`} data-node-id="3:7988" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[normal]">产品设计</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="3:7989" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="3:7990" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="3:7991" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="3:7993" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:7993;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Tanka Product Design
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:7996" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:7996;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        2/8/2025
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="3:7997" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="3:7998" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[normal] max-w-[335px] min-w-px overflow-hidden relative text-[14px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:7998;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="3:8005" data-name="Content">
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 size-[48px]" data-node-id="3:8006" data-name="头像">
                  <div className="relative shrink-0 size-[48px]" data-node-id="3:8007" data-name="默认">
                    <div className="absolute bg-[#096b3f] left-[14.4px] opacity-30 rounded-[385.701px] size-[38.4px] top-[0px]" data-node-id="3:8008" data-name="Avatar" />
                    <div className="absolute bg-[#096b3f] border-[1.44px] border-white border-solid left-[4.8px] rounded-[479.52px] size-[38.4px] top-[4.8px]" data-node-id="3:8012">
                      <div className={`-translate-y-1/2 [word-break:break-word] absolute flex flex-col ${FONT_SF_PRO} font-normal justify-center leading-[0] left-[4.8px] text-[11.52px] text-white top-[19.3px] whitespace-nowrap`} data-node-id="3:8013" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[16.128px]">TKOF</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="3:8014" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="3:8015" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="3:8016" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="3:8018" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:8018;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Tanka Product Design
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="3:8021" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:8021;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        2/8/2025
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="3:8022" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="3:8023" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[normal] max-w-[335px] min-w-px overflow-hidden relative text-[14px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:8023;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="3:8030" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="3:8031" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="3:8032" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="3:8033">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 10: Benjamin Carter (photo avatar 2) - node 3:8039 */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:8039" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="I3:8039;1040:34748" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="I3:8039;8:12823" data-name="Content">
                <div className="overflow-clip relative rounded-[999px] shrink-0 size-[48px]" data-node-id="I3:8039;1054:46235" data-name="Avatar">
                  <div className="absolute inset-0 overflow-clip rounded-[999px]" data-node-id="I3:8039;1054:46235;1085:40500" data-name="Avatar Example">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatarExample1} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="I3:8039;8:12827" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="I3:8039;8:12828" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="I3:8039;8:12829" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="I3:8039;118:22202" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:8039;118:22202;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Benjamin Carter
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="I3:8039;44:120327" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:8039;44:120327;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        9:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="I3:8039;233:33698" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="I3:8039;233:33699" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[normal] max-w-[335px] min-w-px overflow-hidden relative text-[14px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:8039;233:33699;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="I3:8039;1040:38754" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="I3:8039;1040:42540" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="I3:8039;1040:42541" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="I3:8039;67:5788">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 11: Abigail Smith (photo avatar 3, "Yesterday", detail font size) - node 3:8040 */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:8040" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="I3:8040;1040:34748" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="I3:8040;8:12823" data-name="Content">
                <div className="overflow-clip relative rounded-[999px] shrink-0 size-[48px]" data-node-id="I3:8040;1054:46235" data-name="Avatar">
                  <div className="absolute inset-0 overflow-clip rounded-[999px]" data-node-id="I3:8040;1054:46235;1085:40500" data-name="Avatar Example">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatarExample2} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="I3:8040;8:12827" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="I3:8040;8:12828" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="I3:8040;8:12829" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="I3:8040;118:22202" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:8040;118:22202;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Abigail Smith
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="I3:8040;44:120327" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:8040;44:120327;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Yesterday
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="I3:8040;233:33698" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="I3:8040;233:33699" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[16.8px] max-w-[335px] min-w-px overflow-hidden relative text-[12px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:8040;233:33699;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="I3:8040;1040:38754" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="I3:8040;1040:42540" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="I3:8040;1040:42541" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="I3:8040;67:5788">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 12: Charles Anderson (photo avatar 4, blue badge 9) - node 3:8041 */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:8041" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="I3:8041;1040:34748" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="I3:8041;8:12823" data-name="Content">
                <div className="overflow-clip relative rounded-[999px] shrink-0 size-[48px]" data-node-id="I3:8041;1054:46235" data-name="Avatar">
                  <div className="absolute inset-0 overflow-clip rounded-[999px]" data-node-id="I3:8041;1054:46235;1085:40500" data-name="Avatar Example">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatarExample3} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="I3:8041;8:12827" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="I3:8041;8:12828" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="I3:8041;8:12829" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="I3:8041;118:22202" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:8041;118:22202;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Charles Anderson
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="I3:8041;44:120327" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:8041;44:120327;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        2/8/2025
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="I3:8041;233:33698" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="I3:8041;233:33699" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[16.8px] max-w-[335px] min-w-px overflow-hidden relative text-[12px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:8041;233:33699;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                    <div className="bg-[#006dff] content-stretch flex flex-col h-[16px] items-center justify-center min-w-[16px] px-[3px] relative rounded-[49.5px] shrink-0" data-node-id="I3:8041;233:33730" data-name="Badge">
                      <div className={`[word-break:break-word] flex flex-col ${FONT_SF_PRO} font-[300] justify-center leading-[0] relative shrink-0 text-white text-[11px] text-center whitespace-nowrap`} data-node-id="I3:8041;233:33730;44:64326" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[14.3px]">9</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="I3:8041;1040:38754" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="I3:8041;1040:42540" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="I3:8041;1040:42541" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="I3:8041;67:5788">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 13: Test Group (overlapping dual avatar 5+6, pin icon, gray badge "9") - node 3:8042 */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:8042" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="I3:8042;1040:34748" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="I3:8042;8:12823" data-name="Content">
                <div className="relative shrink-0 size-[48px]" data-node-id="I3:8042;1054:46235" data-name="Avatar">
                  <div className="absolute inset-[0_0_33.33%_33.33%] overflow-clip rounded-[1498.5px]" data-node-id="I3:8042;1054:46235;1085:40809" data-name="Avatar Example">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatarExample4} />
                  </div>
                  <div className="absolute border-[2.25px] border-white border-solid inset-[33.33%_33.33%_0_0] overflow-clip rounded-[1498.5px]" data-node-id="I3:8042;1054:46235;1085:40968" data-name="Avatar Example">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatarExample5} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="I3:8042;8:12827" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="I3:8042;8:12828" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="I3:8042;8:12829" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="I3:8042;118:22202" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:8042;118:22202;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Test Group
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="I3:8042;44:120327" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:8042;44:120327;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        9:20 AM
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="I3:8042;233:33698" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="I3:8042;233:33699" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[16.8px] max-w-[335px] min-w-px overflow-hidden relative text-[12px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:8042;233:33699;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[12px]" data-node-id="I3:8042;312:20661" data-name="icon-wrapper-2025/12">
                      <div className="absolute inset-0" data-node-id="I3:8042;312:20661;732:109609" data-name="Format=Outline, Weight=Fill">
                        <div className="absolute inset-[9.38%_3.13%_9.38%_6.25%]" data-node-id="I3:8042;312:20661;732:109609;288:37676" data-name="Vector">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} />
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#8793ab] content-stretch flex flex-col h-[16px] items-center justify-center min-w-[15px] px-[3px] relative rounded-[49.5px] shrink-0" data-node-id="I3:8042;233:33730" data-name="Badge">
                      <div className={`[word-break:break-word] flex flex-col ${FONT_SF_PRO} font-[300] justify-center leading-[0] relative shrink-0 text-white text-[11px] text-center whitespace-nowrap`} data-node-id="I3:8042;233:33730;124:29886" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[14.3px]">9</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="I3:8042;1040:38754" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="I3:8042;1040:42540" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="I3:8042;1040:42541" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="I3:8042;67:5788">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 14: Benjamin Carter (white surface, photo avatar 2) - node 3:8043 */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:8043" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="I3:8043;1040:34748" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="I3:8043;8:12823" data-name="Content">
                <div className="overflow-clip relative rounded-[999px] shrink-0 size-[48px]" data-node-id="I3:8043;1054:46235" data-name="Avatar">
                  <div className="absolute inset-0 overflow-clip rounded-[999px]" data-node-id="I3:8043;1054:46235;1085:40500" data-name="Avatar Example">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatarExample1} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="I3:8043;8:12827" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="I3:8043;8:12828" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="I3:8043;8:12829" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="I3:8043;118:22202" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:8043;118:22202;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Benjamin Carter
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="I3:8043;44:120327" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:8043;44:120327;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        9:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="I3:8043;233:33698" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="I3:8043;233:33699" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[16.8px] max-w-[335px] min-w-px overflow-hidden relative text-[12px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:8043;233:33699;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="I3:8043;1040:38754" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="I3:8043;1040:42540" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="I3:8043;1040:42541" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="I3:8043;67:5788">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 15: Abigail Smith (white surface, photo avatar 3, "Yesterday") - node 3:8044 */}
          <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0 w-full hover:bg-[#eff2fb] cursor-pointer transition-colors" data-node-id="3:8044" data-name="messages row">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative" data-node-id="I3:8044;1040:34748" data-name="Content">
              <div className="content-stretch flex gap-[15px] h-[72px] items-center px-[15px] py-[12px] relative shrink-0 w-full" data-node-id="I3:8044;8:12823" data-name="Content">
                <div className="overflow-clip relative rounded-[999px] shrink-0 size-[48px]" data-node-id="I3:8044;1054:46235" data-name="Avatar">
                  <div className="absolute inset-0 overflow-clip rounded-[999px]" data-node-id="I3:8044;1054:46235;1085:40500" data-name="Avatar Example">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatarExample2} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-w-px relative" data-node-id="I3:8044;8:12827" data-name="content">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="I3:8044;8:12828" data-name="first line">
                    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-node-id="I3:8044;8:12829" data-name="left">
                      <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="I3:8044;118:22202" data-name="Chat Name">
                        <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[22.4px] relative shrink-0 text-[#020617] text-[16px] whitespace-nowrap`} data-node-id="I3:8044;118:22202;118:7214" style={{ fontVariationSettings: "'wdth' 100" }}>
                          Abigail Smith
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="I3:8044;44:120327" data-name="Message Row/Time">
                      <p className={`[word-break:break-word] ${FONT_SF_PRO} font-[400] leading-[14.3px] relative shrink-0 text-[#8793ab] text-[11px] whitespace-nowrap`} data-node-id="I3:8044;44:120327;44:120323" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Yesterday
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full" data-node-id="I3:8044;233:33698" data-name="second line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="I3:8044;233:33699" data-name="Second Line">
                      <p className={`[word-break:break-word] flex-[1_0_0] ${FONT_SF_PRO} font-[400] leading-[16.8px] max-w-[335px] min-w-px overflow-hidden relative text-[12px] text-[#8793ab] text-ellipsis whitespace-nowrap`} data-node-id="I3:8044;233:33699;8:12973" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Welcome to Tanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="I3:8044;1040:38754" data-name="Divider">
                <div className="content-stretch flex flex-col gap-[0px] items-center pl-[15px] pr-[15px] py-[0px] relative shrink-0" data-node-id="I3:8044;1040:42540" data-name="padding">
                  <div className="h-0 relative shrink-0 w-[48px]" data-node-id="I3:8044;1040:42541" data-name="middle" />
                </div>
                <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="I3:8044;67:5788">
                  <div className="absolute inset-[-0.5px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
