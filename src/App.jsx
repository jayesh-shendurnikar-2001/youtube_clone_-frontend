import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import ChannelPage from "./pages/ChannelPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* HEADER */}
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex pt-14">
        {/* SIDEBAR */}
        <Sidebar isOpen={sidebarOpen} />
        {/* MAIN CONTENT */}
        <main
          className={`flex-1 p-4 transition-all duration-300
           ${sidebarOpen ? "lg:ml-60" : "lg:ml-16"}`}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/channel/:id" element={<ChannelPage />} />

            </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
