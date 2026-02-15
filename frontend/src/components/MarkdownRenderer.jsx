import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold mt-3 mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-md font-semibold mt-2 mb-1">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="leading-relaxed my-2">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc ml-5 my-2 space-y-1">{children}</ul>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-primary">
            {children}
          </strong>
        ),

        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const [copied, setCopied] = useState(false);

          const handleCopy = () => {
            navigator.clipboard.writeText(String(children));
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          };

          if (!inline && match) {
            return (
              <div className="relative my-4 rounded-xl overflow-hidden border border-base-300">
                
                {/* Header */}
                <div className="flex justify-between items-center bg-base-300 px-3 py-1 text-xs uppercase tracking-wide">
                  <span>{match[1]}</span>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs hover:text-primary transition"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                {/* Code */}
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: "14px",
                    background: "transparent"
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            );
          }

          return (
            <code className="bg-base-300 px-1.5 py-0.5 rounded-md text-sm">
              {children}
            </code>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
