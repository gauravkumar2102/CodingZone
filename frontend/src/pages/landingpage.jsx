import { Link } from "react-router";
import { Codesandbox } from "lucide-react";

function Landing() {
  return (
    <div className="relative min-h-screen bg-base-200/60 text-base-content overflow-hidden">

      {/* FLOATING CODE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-[1]">

        {/* Code Chunk 1 */}
        <pre
          className="code-chunk left-[8%] top-[80%]"
          style={{ animationDuration: "26s" }}
        >
          <code>
            <span className="code-key">function</span>{" "}
            <span className="code-fn">solve</span>() {"{"}
            <br />
            {"  "}
            <span className="code-key">return</span>{" "}
            <span className="code-str">"🔥"</span>;
            <br />
            {"}"}
          </code>
        </pre>
        <pre
          className="code-chunk left-[80%] top-[50%]"
          style={{ animationDuration: "30s" }}
        >
          <code>
            <span className="code-key">public</span>{" "}
            <span className="code-fn">static</span>{" "}
            <span className="code-fn">void</span>{" "}
            <span className="code-fn">main</span>() {"{"}
            <br />
            {"  "}
            <span className="code-key">return</span>{" "}
            <span className="code-str">"🔥"</span>;
            <br />
            {"}"}
          </code>
        </pre>

        {/* Code Chunk 2 */}
        <pre
          className="code-chunk left-[65%] top-[90%]"
          style={{ animationDuration: "32s" }}
        >
          <code>
            <span className="code-key">const</span>{" "}
            <span className="code-var">Function</span> ={" "}
            <span className="code-key">async</span> () {"=>"} {"{"}
            <br />
            {"  "}
            <span className="code-fn">fetch</span>();
            <br />
            {"}"}
          </code>
        </pre>

        {/* Code Chunk 3 */}
        <pre
          className="code-chunk left-[30%] top-[85%]"
          style={{ animationDuration: "30s" }}
        >
          <code>
            <span className="code-key">class</span>{" "}
            <span className="code-fn">Solution</span> {"{"}
            <br />
            {"  "}
            <span className="code-fn">run</span>() {"{}"}
            <br />
            {"}"}
          </code>
        </pre>

      </div>

      {/* 🧭 NAVBAR */}
      <div className="navbar px-10 bg-gray-600/50 backdrop-blur-md border-b border-base-300/30 relative z-10">
        <div className="flex-1 text-xl font-bold flex items-center gap-2">
          <Codesandbox size={38} color="#bea60e" /> Coding Zone
        </div>

        <div className="flex gap-3">
          <Link to="/about" className="btn btn-ghost btn-sm">
            About
          </Link>

          <Link to="/login" className="btn btn-ghost btn-sm">
            Login
          </Link>

          <Link
            to="/signup"
            className="btn bg-yellow-600/90 text-black border-none btn-sm shadow-lg hover:scale-105 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* ✨ HERO */}
      <div className="flex flex-col items-center justify-center text-center h-[85vh] px-6 relative z-10">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Welcome to <span className="text-yellow-600/90">Coding Zone</span>
        </h1>

        <p className="mt-5 max-w-xl text-base-content/70">
          Practice coding, solve real problems, and improve your skills
          in a clean and powerful developer environment.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/login"
            className="btn bg-yellow-600/90 text-black border-none hover:scale-105 transition shadow-xl"
          >
            Start Coding
          </Link>

          <Link
            to="/login"
            className="btn btn-outline hover:scale-105 transition"
          >
            Login
          </Link>
        </div>

        {/* Floating Card */}
        <div className="mt-14 float-slow">
          <div className="px-6 py-3 bg-base-200/40 backdrop-blur-md border border-base-300 rounded-xl shadow-xl">
            <code className="text-sm opacity-80">
              {`function solve(){ return "🔥"; }`}
            </code>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Landing;