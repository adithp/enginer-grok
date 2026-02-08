"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageDisplay from "./MessageDisplay";

interface Message {
  id: string;
  type: "user" | "assistant" | "rephrase";
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let rephraseMessage: Message | null = null;
      let assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "",
      };

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((line) => line.trim());

          for (const line of lines) {
            try {
              const data = JSON.parse(line);

              if (data.type === "rephrase" && !rephraseMessage) {
                rephraseMessage = {
                  id: (Date.now() + 0.5).toString(),
                  type: "rephrase",
                  content: data.content,
                };
                setMessages((prev) => [...prev, rephraseMessage!]);
              } else if (data.type === "response") {
                assistantMessage.content += data.content;
                setMessages((prev) => {
                  const filtered = prev.filter(
                    (m) => m.id !== assistantMessage.id
                  );
                  return [...filtered, { ...assistantMessage }];
                });
              }
            } catch (err) {
              console.error("Error parsing chunk:", err);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content: "Sorry, an error occurred. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageDisplay key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-gray-400"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4 bg-gray-900/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about engineering..."
            className="flex-1 bg-gray-800 text-white rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500"
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            disabled={isLoading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            Send
          </motion.button>
        </form>
      </div>
    </div>
  );
}
