import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

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
            <h1>Main content</h1>
        </main>
      </div>
    </div>
  );
}

export default App;
