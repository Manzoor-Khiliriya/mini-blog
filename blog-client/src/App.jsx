import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import PostDetailPage from "./pages/PostDetailPage";
import UpdatePostPage from "./pages/UpdatePostPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/update-post/:id" element={<UpdatePostPage />} />
      </Routes>
    </>
  );
}

export default App;
