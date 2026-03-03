// src/pages/Home.jsx

import VideoCard from "../components/VideoCard.jsx";
import FilterButtons from "../components/FilterButtons.jsx";

const Home = () => {
  const dummyVideos = [];

  return (
    <div className="max-w-7xl mx-auto px-4" id="home-page">
      
      <FilterButtons />

      <div className="grid gap-x-4 gap-y-10 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4"
           id="video-grid">

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