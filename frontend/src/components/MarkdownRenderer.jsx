import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-6 mb-3 text-base-content border-b border-base-300 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-5 mb-2 text-base-content">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold mt-4 mb-2 text-base-content">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed my-3 text-base-content/90">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-6 my-3 space-y-2 text-base-content/90">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 my-3 space-y-2 text-base-content/90">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-primary">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-base-content/80">{children}</em>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-base-200/30 italic text-base-content/80">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="table table-zebra w-full">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-base-300 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="text-base-content/90">{children}</td>
          ),
          a: ({ children, href }) => (
            <a 
              href={href} 
              className="text-primary hover:text-primary/80 underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          hr: () => (
            <hr className="my-6 border-base-300" />
          ),

          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const [copied, setCopied] = useState(false);

            const handleCopy = () => {
              navigator.clipboard.writeText(String(children));
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            };

            // Block code (with syntax highlighting)
            if (!inline && match) {
              return (
                <div className="my-4 rounded-lg overflow-hidden border border-base-300 shadow-sm">
                  
                  {/* Header */}
                  <div className="flex justify-between items-center bg-gradient-to-r from-base-300 to-base-200 px-4 py-2.5 border-b border-base-300">
                    <span className="text-xs font-semibold uppercase tracking-wider text-base-content/70">
                      {match[1]}
                    </span>

                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-base-100/50 hover:bg-base-100 transition-all duration-200 hover:scale-105"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-success" />
                          <span className="text-success">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Block */}
                  <div className="bg-base-200/40">
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: "1rem",
                        background: "transparent",
                        fontSize: "0.875rem",
                        lineHeight: "1.5",
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily: "'Fira Code', 'Courier New', monospace",
                        }
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                </div>
              );
            }

            // Inline code
            return (
              <code className="bg-base-300/50 text-primary px-1.5 py-0.5 rounded text-sm font-mono border border-base-300/30">
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;