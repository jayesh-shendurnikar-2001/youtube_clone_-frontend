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
    <div className="sticky top-14 bg-white z-40 flex gap-3 overflow-x-auto py-2 whitespace-nowrap no-scrollbar w-full max-w-full">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0 transition
          ${
            activeCategory === category
              ? "bg-black text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
