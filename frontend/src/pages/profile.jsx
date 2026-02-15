import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { logoutUser } from "../authSlice";
import { Codesandbox, CircleUser } from "lucide-react";

function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get(
          "/problem/solvedProblemByUser"
        );
        setSolvedProblems(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // 📊 Difficulty Stats
  const easyCount = solvedProblems.filter(p => p.difficulty === "easy").length;
  const mediumCount = solvedProblems.filter(p => p.difficulty === "medium").length;
  const hardCount = solvedProblems.filter(p => p.difficulty === "hard").length;

  return (
    <div className="min-h-screen bg-base-200">

      {/* Navbar (Same as Homepage) */}
      <nav className="navbar bg-gray-600/50 sticky top-0 backdrop-blur-md border-b border-base-300/30 shadow-lg px-4 z-50">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-2xl">
            <Codesandbox size={38} color="#bea60e" />
            Coding Zone
          </NavLink>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost bg-yellow-600/90 text-white border-none">
            <CircleUser /> {user?.firstname}
          </div>
          <ul className="mt-3 p-2 shadow menu dropdown-content bg-gray-700/50 rounded-box w-52">
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="container mx-auto p-6">

        {/* Profile Header */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body flex flex-row items-center gap-6">

            <div className="avatar placeholder">
              <div className="bg-primary text-white rounded-full w-20">
                <span className="text-3xl">
                  {user?.firstname?.charAt(0)}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">{user?.firstname}</h2>
              <p className="opacity-70">Coding Zone Profile</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-4">

          {/* Total Solved */}
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Total Solved</div>
            <div className="stat-value text-primary">
              {solvedProblems.length}
            </div>
          </div>

          {/* Easy */}
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Easy</div>
            <div className="stat-value text-green-500">
              {easyCount}
            </div>
          </div>

          {/* Medium */}
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Medium</div>
            <div className="stat-value text-yellow-500">
              {mediumCount}
            </div>
          </div>

          {/* Hard */}
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Hard</div>
            <div className="stat-value text-red-500">
              {hardCount}
            </div>
          </div>
        </div>

        {/* Solved Problem List */}
        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title">Solved Problems</h2>

            <div className="grid gap-3 mt-3">
              {solvedProblems.map((problem) => (
                <NavLink
                  key={problem._id}
                  to={`/problem/${problem._id}`}
                  className="p-3 rounded-lg hover:bg-base-200 transition flex justify-between"
                >
                  <span>{problem.title}</span>

                  <div className={`badge text-white ${
                    problem.difficulty === "easy"
                      ? "bg-green-500"
                      : problem.difficulty === "medium"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}>
                    {problem.difficulty}
                  </div>
                </NavLink>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;