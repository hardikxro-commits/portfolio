"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function AIAssistantContent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Hardik's AI assistant. Ask me anything about his skills, projects, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      if (!res.ok) throw new Error("Failed");
      const reader = res.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let assistantContent = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        assistantContent += chunk;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: assistantContent };
          return next;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process that. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary text-white shadow-lg transition-all duration-200 hover:bg-accent-hover hover:scale-105 active:scale-95"
        aria-label="Toggle AI assistant"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-xl border border-border-default bg-bg-secondary shadow-xl">
          <div className="flex items-center gap-3 border-b border-border-default px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
              <Bot size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">AI Assistant</p>
              <p className="text-[10px] text-text-muted">Ask about Hardik</p>
            </div>
          </div>

          <div className="flex h-[320px] flex-col gap-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-accent-primary/10 text-accent-primary"
                      : "bg-bg-tertiary text-text-muted"
                  }`}
                >
                  {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
                </div>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent-primary text-white"
                      : "bg-bg-tertiary text-text-secondary"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg-tertiary text-text-muted">
                  <Bot size={12} />
                </div>
                <div className="rounded-lg bg-bg-tertiary px-3 py-2 text-xs text-text-muted">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-border-default p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about skills, projects..."
                className="flex-1 rounded-lg border border-border-default bg-bg-primary px-3 py-2 text-xs text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent-border"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-primary text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
              >
                <Send size={12} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const AIAssistant = dynamic(() => Promise.resolve(AIAssistantContent), {
  ssr: false,
});
