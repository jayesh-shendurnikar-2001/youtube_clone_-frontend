import { useState } from "react";

const CommentSection = () => {
    const [comments, setComments] = useState([
        {
          _id: "1",
          text: "Amazing video 🔥",
          createdAt: new Date(),
          user: {
            username: "Jayesh",
            avatar: "",
          },
        },
        {
          _id: "2",
          text: "Very helpful content",
          createdAt: new Date(),
          user: {
            username: "DevUser",
            avatar: "",
          },
        },
      ]);

      const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
      
        const newObj = {
          _id: Date.now().toString(),
          text: newComment,
          createdAt: new Date(),
          user: {
            username: user.username,
            avatar: user.avatar,
          },
        };
      
        setComments((prev) => [newObj, ...prev]);
        setNewComment("");
      };

      const handleDeleteComment = (id) => {
        setComments((prev) =>
          prev.filter((c) => c._id !== id)
        );
      };

      const handleEditComment = (id) => {
        setComments((prev) =>
          prev.map((c) =>
            c._id === id ? { ...c, text: editText } : c
          )
        );
      };

      {comments.map((comment) => (
        <div key={comment._id} className="flex gap-3 mb-4">
          <img
            className="w-10 h-10 rounded-full"
            src={
              comment.user.avatar ||
              `https://ui-avatars.com/api/?name=${comment.user.username}`
            }
            alt={comment.user.username}
          />
          <div>
            <p className="text-sm text-white font-medium">
              @{comment.user.username}
            </p>
            <p className="text-sm text-gray-400">
              {comment.text}
            </p>
          </div>
        </div>
      ))}

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

export default CommentSection