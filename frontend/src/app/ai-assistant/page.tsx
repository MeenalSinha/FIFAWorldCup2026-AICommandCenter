"use client";

import Topbar from "@/components/layout/Topbar";
import AIAssistantCard from "@/components/dashboard/AIAssistantCard";

export default function AIAssistantPage() {
  return (
    <>
      <Topbar title="AI Assistant" subtitle="Ask about navigation, schedules, tickets, and stadium services" />
      <div className="px-8 pb-10 max-w-2xl">
        <AIAssistantCard />
      </div>
    </>
  );
}
