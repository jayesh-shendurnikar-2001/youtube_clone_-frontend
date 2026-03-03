// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import {
  MdExplore,
  MdSubscriptions,
  MdVideoLibrary,
  MdHistory,
  MdWatchLater,
  MdThumbUp,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";

const sidebarItems = [
  { icon: <AiFillHome />, label: "Home", path: "/" },
  { icon: <MdExplore />, label: "Explore", path: "/?category=All" },
  { icon: <SiYoutubeshorts />, label: "Shorts", path: "/Shorts" },
  { icon: <MdSubscriptions />, label: "Subscriptions", path: "/Subscriptions" },
  { divider: true },
  { icon: <MdVideoLibrary />, label: "Library", path: "/Library" },
  { icon: <MdHistory />, label: "History", path: "/History" },
  { icon: <MdWatchLater />, label: "Watch Later", path: "/Watch Later" },
  { icon: <MdThumbUp />, label: "Liked Videos", path: "/Liked" },
];

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay - mobile only */}
      {isOpen && <div className="fixed inset-0 bg-black/50 lg:hidden z-40" />}

      <aside
        className={`fixed top-14 left-0 bottom-0
        bg-[oklch(0.2_0_0)] text-white overflow-y-auto 
                   overflow-x-hidden transition-all duration-300 z-50
        ${
          isOpen
            ? "w-60 translate-x-0"
            : "w-16 -translate-x-full lg:translate-x-0" // hidden on mobile, mini on desktop
        }`}
      >
        {sidebarItems.map((item, index) => {
          if (item.divider) {
            return isOpen ? (
              <div key={index} className="border-t border-gray-700 my-3 mx-4" />
            ) : null;
          }

          const isActive = location.pathname === item.path && !location.search;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-2 py-3 text-sm hover:bg-gray-800 transition
                  ${isOpen ? "flex-row gap-4 px-6 py-2" : ""}
                  ${isActive ? "bg-gray-800 font-medium" : ""}`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen ? (
                <span>{item.label}</span>
              ) : (
                <span className="text-[10px] text-gray-400 text-center mt-1">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </aside>
    </>
  );
};

export default Sidebar;
