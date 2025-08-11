import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobFeed from "./pages/JobFeed";
import PostJob from "./pages/PostJob";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<JobFeed />} />
        <Route path="/post-job" element={<PostJob />} />
      </Routes>
    </BrowserRouter>
  );
}