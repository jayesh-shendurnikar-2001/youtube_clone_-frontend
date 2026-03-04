const CommentSection = () => {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-6 text-white">
          Comments
        </h3>
  
        {/* Add Comment UI */}
        <div className="flex gap-3 mb-6">
          <img
            className="w-10 h-10 rounded-full"
            src="https://ui-avatars.com/api/?name=User"
            alt="user"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border-b border-gray-600 bg-transparent text-white focus:outline-none"
          />
        </div>
  
        {/* Single Comment UI */}
        <div className="flex gap-3 mb-4">
          <img
            className="w-10 h-10 rounded-full"
            src="https://ui-avatars.com/api/?name=Jayesh"
            alt="user"
          />
          <div>
            <p className="text-sm text-white font-medium">
              @Jayesh
            </p>
            <p className="text-sm text-gray-400">
              This is a comment
            </p>
          </div>
        </div>
      </div>
    );
  };