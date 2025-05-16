"use client";

import {
  AssistantRuntimeProvider,
  useAssistantInstructions,
  AssistantCloud,
} from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { AssistantModal } from "@/components/assistant-ui/assistant-modal";
import { AssistantSidebar } from "@/components/assistant-ui/assistant-sidebar";
import { useRef } from "react";

// Via useAssistantInstructions

// Automatically provides component HTML as system context
export const Assistant = () => {
  const cloud = new AssistantCloud({
    baseUrl: process.env["NEXT_PUBLIC_ASSISTANT_BASE_URL"]!,
    anonymous: true,
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runtime = useChatRuntime({
    api: "/api/chat",
    cloud,
    onFinish: () => {
      setTimeout(() => {
        const targetOrigin = process.env.NEXT_PUBLIC_PHP_URL
          ? new URL(process.env.NEXT_PUBLIC_PHP_URL).origin
          : "*";

        iframeRef.current?.contentWindow?.postMessage(
          { type: "reload-preview" },
          targetOrigin
        );
      }, 500);
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {/* <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4"> */}
      {/* <AssistantModal /> */}
      {/* <AssistantModal /> */}
      {/* <ThreadList />
        <Thread /> */}
      <div className="h-full">
        <AssistantSidebar>
          <iframe
            ref={iframeRef}
            src={process.env.PREVIEW_URL}
            width="100%"
            height="100%"
          ></iframe>
        </AssistantSidebar>
      </div>
    </AssistantRuntimeProvider>
  );
};
