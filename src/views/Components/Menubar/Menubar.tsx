"use client";

import * as Menubar from "@radix-ui/react-menubar";
import React from "react";

import CodeMenu from "@/views/Components/Menubar/Submenus/CodeMenu"

import Load from "@/views/Components/Menubar/Submenus/Filemenu/LoadFile"
import Save from "@/views/Components/Menubar/Submenus/Filemenu/SaveFile"
import SaveAs from "@/views/Components/Menubar/Submenus/Filemenu/SaveAs"

function MenubarDemo() {
  return (
    <Menubar.Root className="flex border border-b-black bg-white p-[3px]">
      <Menubar.Menu>
        <Menubar.Trigger className="text-violet11 data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4 flex select-none items-center justify-between gap-[2px] rounded px-3 py-2 text-[13px] font-medium leading-none outline-none">
          File
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className="text-violet11 data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gradient-to-br">
              {Load()}
            </Menubar.Item>
            <Menubar.Item className="text-violet11 data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gradient-to-br">
              <Save />
            </Menubar.Item>
            <Menubar.Item className="text-violet11 data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gradient-to-br">
              <SaveAs />
            </Menubar.Item>
            <Menubar.Item className="text-violet11 data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gradient-to-br">
              Exit
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="text-violet11 data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4 flex select-none items-center justify-between gap-[2px] rounded px-3 py-2 text-[13px] font-medium leading-none outline-none">
          Code
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className="text-violet11 data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gradient-to-br">
              <CodeMenu />
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
}

export default MenubarDemo;
