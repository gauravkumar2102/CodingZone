import { NavLink } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../authSlice";
import { Codesandbox, CircleUser, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import profile from "../assets/profile.jpeg";

function AboutPage() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [query, setQuery] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    // ✅ Send query to backend -> email
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await axiosClient.post("/contact/send-query", query);

            alert("✅ Query sent successfully! Check your email.");

            setQuery({
                name: "",
                email: "",
                message: "",
            });
        } catch (err) {
            console.error(err);
            alert("❌ Failed to send query");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            {/* ⭐ Navbar (Same Theme) */}
            <nav className="navbar bg-gray-600/50 sticky top-0 backdrop-blur-md border-b border-base-300/30 shadow-lg px-4 z-50">
                <div className="flex-1">
                    <NavLink to="/" className="btn btn-ghost text-2xl">
                        <Codesandbox size={38} color="#bea60e" />
                        Coding Zone
                    </NavLink>
                </div>

               
            </nav>

            {/* ⭐ Page Content */}
            <div className="container mx-auto p-6 grid lg:grid-cols-3 gap-6">
                {/* 🔥 Website Info */}
                <div className="card bg-base-100 shadow-xl lg:col-span-2">
                    <div className="card-body">
                        <h2 className="card-title text-2xl">About Coding Zone</h2>

                        <p className="opacity-80">
                            Coding Zone is a coding practice platform where developers solve
                            problems, track submissions, and improve their coding skills with
                            real-time execution and performance insights.
                        </p>

                        <ul className="list-disc ml-6 opacity-80">
                          <li>Practice coding problems</li>
<li>Real-time code execution</li>
<li>Difficulty-based filtering</li>
<li>Submission tracking</li>
<li>Multiple programming language support</li>
<li>Performance insights (runtime & memory)</li>
<li>Admin problem management panel</li>
<li>Interactive learning experience</li>
<li>Structured problem categories (Array, Graph, DP, etc.)</li>
                        </ul>
                    </div>
                </div>

                {/* 🔥 Your Profile Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <div className="avatar">
                            <div className="w-40 rounded-full overflow-hidden">
                                <img
                                    src={profile}
                                    alt="profile"
                                    className="w-full h-full object-cover object-center scale-110"
                                />
                            </div>
                        </div>

                        <h2 className="text-xl font-bold mt-3">
                            Gaurav Kumar
                        </h2>

                        <p className="opacity-70">Full Stack Developer</p>

                        <div className="flex gap-3 mt-4">
                            <a
                                href="https://github.com/gauravkumar2102"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm bg-gray-800 text-white border-none"
                            >
                                <Github size={18} /> GitHub
                            </a>

                            <a
                                href="https://www.linkedin.com/in/gaurav-kumar-b7990b1aa"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm bg-blue-600 text-white border-none"
                            >
                                <Linkedin size={18} /> LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* 🔥 Query Form */}
                <div className="card bg-base-100 shadow-xl lg:col-span-3">
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Ask a Query</h2>

                        <form
                            onSubmit={handleSubmit}
                            className="grid md:grid-cols-2 gap-4 mt-4"
                        >
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                                value={query.name}
                                onChange={(e) =>
                                    setQuery({ ...query, name: e.target.value })
                                }
                                required
                            />

                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full"
                                value={query.email}
                                onChange={(e) =>
                                    setQuery({ ...query, email: e.target.value })
                                }
                                required
                            />

                            <textarea
                                className="textarea textarea-bordered md:col-span-2"
                                placeholder="Write your message..."
                                value={query.message}
                                onChange={(e) =>
                                    setQuery({ ...query, message: e.target.value })
                                }
                                required
                            />

                            <button
                                disabled={loading}
                                className="btn bg-yellow-600 text-white border-none md:col-span-2 hover:scale-105 transition"
                            >
                                {loading ? "Sending..." : "Send Query"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;