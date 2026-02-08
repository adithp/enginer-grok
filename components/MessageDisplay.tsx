"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  type: "user" | "assistant" | "rephrase";
  content: string;
}

interface MessageDisplayProps {
  message: Message;
}

export default function MessageDisplay({ message }: MessageDisplayProps) {
  const variants = {
    hidden: { opacity: 0, x: message.type === "user" ? 20 : -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  if (message.type === "rephrase") {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="flex justify-start"
      >
        <div className="max-w-[80%] bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700/50 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <svg
              className="w-4 h-4 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
              Rephrased Query
            </span>
          </div>
          <p className="text-gray-200 text-sm italic">{message.content}</p>
        </div>
      </motion.div>
    );
  }

  if (message.type === "user") {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="flex justify-end"
      >
        <div className="max-w-[80%] bg-blue-600 rounded-2xl px-6 py-3 shadow-lg">
          <p className="text-white">{message.content}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="flex justify-start"
    >
      <div className="max-w-[80%] bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Senior AI Engineer
          </span>
        </div>
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              code: ({ node, className, children, ...props }) => {
                const isInline = !className;
                return isInline ? (
                  <code
                    className="bg-gray-900 text-blue-400 px-1.5 py-0.5 rounded text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code
                    className="block bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
