// src/components/Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { useAuth } from "../context/authContext.jsx";

const Header = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleSignOut = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-black flex items-center justify-between px-3 border-b border-gray-700 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="text-white text-xl cursor-pointer">
          <FiMenu />
        </button>

        <Link
          to="/"
          className="flex items-center gap-1 text-white font-bold text-lg"
        >
          <FaYoutube className="text-red-600 text-2xl" />
          <span className="hidden sm:block">YouTube</span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="flex-1 max-w-md mx-2">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-gray-800 text-white border
                   border-gray-700 rounded-l-full focus:outline-none text-sm"
          />
          <button
            type="submit"
            className=" px-3 bg-gray-700 border border-gray-700 rounded-r-full 
                text-white transition-all duration-200hover:bg-gray-600
                active:scale-95 active:bg-gray-800 cursor-pointer"
          >
            <FiSearch />
          </button>
        </form>
      </div>

      {/* RIGHT */}
      <div className="relative">
        {user ? (
          <>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 text-white"
            >
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${user.username}`
                }
                alt={user.username}
                className="w-8 h-8 rounded-full"
              />
              {/* Hide username on mobile */}
              <span className="hidden md:block">{user.username}</span>
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 mt-2 w-44 bg-gray-800 border
               border-gray-700 rounded-md shadow-lg"
              >
                <Link
                  to={`/channel/${user.channels?.[0] || "create"}`}
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-700"
                >
                  <MdVideoLibrary /> My Channel
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-700 w-full text-left"
                >
                  <FiLogOut /> Sign Out
                </button>
              </div>
            )}
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-1 px-3 py-1 border border-blue-500 text-blue-500 rounded-full text-sm"
          >
            <FiUser />
            <span className="hidden sm:block">Sign in</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
