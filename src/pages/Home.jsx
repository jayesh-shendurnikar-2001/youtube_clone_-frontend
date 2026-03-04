// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/api.js";
import VideoCard from "../components/VideoCard.jsx";
import FilterButtons from "../components/FilterButtons.jsx";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const params = {};
        
        if (searchQuery) params.search = searchQuery;

        if (activeCategory && activeCategory !== "All")
          params.category = activeCategory;

        const { data } = await API.get("/videos", { params });
        console.log(data);
        setVideos(data.videos);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="max-w-7xl mx-auto px-4" id="home-page">
      
      {/* Filter buttons */}
      <FilterButtons
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px] w-full">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-16 px-5 text-gray-400">
          <h2 className="text-xl mb-2 text-white">
            No videos found
          </h2>
          <p className="text-sm">
            {searchQuery
              ? `No results for "${searchQuery}"`
              : "No videos available for this category."}
          </p>
        </div>
      ) : (
        /* Video grid */
        <div
          className="grid gap-x-4 gap-y-10 
                     grid-cols-1 
                     sm:grid-cols-2 
                     md:grid-cols-3 
                     lg:grid-cols-4"
          id="video-grid"
        >
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;