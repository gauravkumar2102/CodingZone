import {Routes, Route ,Navigate,} from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "./authSlice";
import { useEffect } from "react";
import AdminPanel from "./components/AdminPanel";
import ProblemPage from "./pages/ProblemPage"
import Admin from "./pages/Admin";
import Landing from "./pages/landingpage";
import AdminUpload from "./components/AdminUpload"
import AdminVideo from "./components/AdminVideo"
import UpdateProblem from "./components/UpdateProblem"
import AdminUpdate from "./components/AdminUpdate"
import AdminDelete from "./components/AdminDelete"
import ProfilePage from "./pages/profile"; 
import AboutPage from "./pages/about";
function App(){
  
  const dispatch = useDispatch();
  const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);

  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }


  return(
  <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/login" />}></Route>
      <Route path="/login" element={isAuthenticated?<Navigate to="/home" />:<Login></Login>}></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/home" />:<Signup></Signup>}></Route>
      <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
      <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
      <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
      <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} />
      <Route path="/admin/upload/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} />
      <Route path="/admin/update" element={isAuthenticated && user?.role === 'admin' ? <UpdateProblem /> : <Navigate to="/" />} />
      <Route path="/admin/update/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpdate/> : <Navigate to="/" />} />

      <Route path="/problem/:problemId" element={<ProblemPage/>}></Route> 
      <Route path="/about" element={<AboutPage/>}></Route>
    </Routes>
  </>
  )
}

export default App;