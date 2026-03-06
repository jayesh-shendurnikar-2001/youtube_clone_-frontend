import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import ChannelPage from "./pages/ChannelPage";
import CreateEditVideo from "./pages/CreateEditVideo";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-white">
      {/* HEADER */}
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex pt-14 ">
        {/* SIDEBAR */}
        <Sidebar isOpen={sidebarOpen} />
        {/* MAIN CONTENT */}
        <main
          className={`flex-1 p-4 transition-all duration-300 min-w-0
           ${sidebarOpen ? "lg:ml-60" : "lg:ml-16"}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/channel/:id" element={<ChannelPage />} />
            <Route path="/channel/:channelId/upload" element={<CreateEditVideo />} />
            <Route path="/channel/:channelId/edit/:videoId" element={<CreateEditVideo />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
