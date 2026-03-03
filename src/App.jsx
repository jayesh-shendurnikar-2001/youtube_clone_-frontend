import { useState } from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Header onToggleSidebar={toggleSidebar} />
  );
}

export default App;
