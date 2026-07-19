"use client";

import { useState } from "react";
import { Sparkles, Send, MoreVertical } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { api } from "@/lib/api";

const SUGGESTIONS = ["Crowd Prediction", "Incident Report", "SOP Generator", "Translation"];

export default function AIAssistantCard() {
  const [messages, setMessages] = useState<{ role: "assistant" | "user"; text: string }[]>([
    { role: "assistant", text: "How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const result = await api.askFanAgent(text);
      setMessages((prev) => [...prev, { role: "assistant", text: result.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "I could not reach the AI service right now. Please try again shortly." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader
        title="AI Assistant"
        action={
          <button aria-label="More options" className="text-[var(--text-secondary)]">
            <MoreVertical size={16} />
          </button>
        }
      />
      <div className="flex flex-1 flex-col gap-3 px-5 pb-4 max-h-56 overflow-y-auto">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 text-sm ${message.role === "user" ? "justify-end" : ""}`}
          >
            {message.role === "assistant" && (
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Sparkles size={14} />
              </span>
            )}
            <p
              className={`rounded-xl px-3 py-2 max-w-[85%] ${
                message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-white/5"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
        {loading && <p className="text-xs text-[var(--text-secondary)] pl-9">Thinking...</p>}
      </div>

      <div className="flex flex-wrap gap-2 px-5 pb-3">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => send(s)}
            className="rounded-full border border-[var(--border-soft)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-slate-50 dark:hover:bg-white/5"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        className="flex items-center gap-2 border-t border-[var(--border-soft)] px-5 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-secondary)]"
          aria-label="Ask the AI assistant"
        />
        <button
          type="submit"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          aria-label="Send message"
        >
          <Send size={14} />
        </button>
      </form>
    </Card>
  );
}
