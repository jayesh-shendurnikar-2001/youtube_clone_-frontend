// src/components/CommentSection.jsx – Comments with CRUD
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api.js';
import { useAuth } from '../context/authContext.jsx';

// Format relative time
const timeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
    return `${Math.floor(diff / 2592000)} months ago`;
};

const CommentSection = ({ videoId }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const { data } = await API.get(`/comments/${videoId}`);
                setComments(data);
            } catch (err) {
                console.error('Failed to fetch comments:', err);
            } finally {
                setLoading(false);
            }
        };
        if (videoId) fetchComments();
    }, [videoId]);

    // Add comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
            const { data } = await API.post(`/comments/${videoId}`, { text: newComment });
            setComments([data, ...comments]);
            setNewComment('');
        } catch (err) {
            console.error('Failed to add comment:', err);
        }
    };

    // Edit comment
    const handleEditComment = async (commentId) => {
        if (!editText.trim()) return;
        try {
            const { data } = await API.put(`/comments/${commentId}`, { text: editText });
            setComments(comments.map((c) => (c._id === commentId ? data : c)));
            setEditingId(null);
            setEditText('');
        } catch (err) {
            console.error('Failed to edit comment:', err);
        }
    };

    // Delete comment
    const handleDeleteComment = async (commentId) => {
        try {
            await API.delete(`/comments/${commentId}`);
            setComments(comments.filter((c) => c._id !== commentId));
        } catch (err) {
            console.error('Failed to delete comment:', err);
        }
    };

    // Start editing
    const startEditing = (comment) => {
        setEditingId(comment._id);
        setEditText(comment.text);
    };

    return (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-6 text-white">
            {comments.length} Comments
          </h3>
      
          {/* Add Comment */}
          {user ? (
            <div className="flex gap-3 mb-6 items-start">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff`
                }
                alt={user.username}
              />
      
              <form className="flex-1" onSubmit={handleAddComment}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full py-2 border-b border-gray-600 text-sm text-white bg-transparent focus:outline-none focus:border-white"
                />
      
                {newComment.trim() && (
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setNewComment("")}
                      className="px-4 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
      
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 disabled:opacity-50"
                    >
                      Comment
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className="text-center text-gray-400 text-sm">
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>{" "}
              to add a comment
            </div>
          )}
      
          {/* Loader */}
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            comments.map((comment) => (
              <div className="flex gap-3 mb-4" key={comment._id}>
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={
                    comment.user?.avatar ||
                    `https://ui-avatars.com/api/?name=${
                      comment.user?.username || "U"
                    }&background=333&color=fff`
                  }
                  alt={comment.user?.username}
                />
      
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-white">
                      @{comment.user?.username}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
      
                  {editingId === comment._id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleEditComment(comment._id);
                      }}
                    >
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full mt-2 border-b border-gray-600 bg-transparent text-white focus:outline-none"
                      />
      
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="text-sm text-gray-400 hover:text-white"
                        >
                          Cancel
                        </button>
      
                        <button
                          type="submit"
                          disabled={!editText.trim()}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 disabled:opacity-50"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="text-sm text-white mt-1">
                        {comment.text}
                      </p>
      
                      {user && user._id === comment.user?._id && (
                        <div className="flex gap-3 mt-1 text-xs text-gray-400">
                          <button
                            onClick={() => startEditing(comment)}
                            className="hover:text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteComment(comment._id)
                            }
                            className="hover:text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      );
};

export default CommentSection;
