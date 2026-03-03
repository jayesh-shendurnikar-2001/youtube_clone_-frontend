// src/pages/Home.jsx

import VideoCard from "../components/VideoCard.jsx";
import FilterButtons from "../components/FilterButtons.jsx";
import { useState } from "react";
import { useState, useEffect } from "react";
import API from "../api/api.js";


const Home = () => {
  const dummyVideos = [];
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await API.get("/videos");
        setVideos(data.videos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVideos();
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto px-4" id="home-page">
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px] w-full">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <p className="text-center text-gray-400 py-20">
          Videos will appear here
        </p>
      )}

      <FilterButtons />

      <div
        className="grid gap-x-4 gap-y-10 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4"
        id="video-grid"
      >
        {dummyVideos.length === 0 && (
          <p className="text-center text-gray-400 py-20">
            Videos will appear here
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
