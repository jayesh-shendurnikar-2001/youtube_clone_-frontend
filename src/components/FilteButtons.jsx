// src/components/FilterButtons.jsx

const categories = [
    "All",
    "Music",
    "Gaming",
    "Education",
    "Sports",
    "News",
    "Entertainment",
    "Science & Tech",
    "Comedy",
  ];
  
  const FilterButtons = ({ activeCategory, onCategoryChange }) => {
    return (
      <div
        className="flex gap-3 overflow-x-auto py-2 pb-4 whitespace-nowrap no-scrollbar"
        id="filter-buttons"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0 transition
              ${
                activeCategory === category
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  };
  
  export default FilterButtons;