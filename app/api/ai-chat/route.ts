import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/ai";

export const runtime = "edge";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };
    if (!messages?.length) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt();
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 500,
        system: systemPrompt,
        messages: [{ role: "user", content: userQuery }],
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const text = decoder.decode(value);
            const lines = text.split("\n").filter((l) => l.startsWith("data: "));
            for (const line of lines) {
              const json = JSON.parse(line.slice(6));
              if (json.type === "content_block_delta" && json.delta?.text) {
                controller.enqueue(encoder.encode(json.delta.text));
              }
            }
          }
        } catch {
          controller.enqueue(encoder.encode("I apologize, but I encountered an error. Please try again."));
        } finally {
          controller.close();
          reader?.releaseLock();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Service temporarily unavailable" },
      { status: 503 },
    );
  }
}
