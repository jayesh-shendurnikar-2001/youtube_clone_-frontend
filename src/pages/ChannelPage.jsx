// src/pages/ChannelPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/api.js";
import VideoCard from "../components/VideoCard.jsx";
import { FiUpload } from "react-icons/fi";
import { useAuth } from "../context/authContext.jsx";

const ChannelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [channelForm, setChannelForm] = useState({
    channelName: "",
    description: "",
    channelBanner: "",
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchChannel = async () => {
      if (id === "create") {
        setShowCreateForm(true);
        setLoading(false);
        return;
      }

      // reset form view
      setShowCreateForm(false);

      try {
        setLoading(true);

        const { data } = await API.get(`/channels/${id}`);

        setChannel(data);

        if (user && data.owner) {
          const ownerId = data.owner._id || data.owner;
          setIsOwner(ownerId.toString() === user._id.toString());
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [id, user]);

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    setFormError("");
  
    try {
      const res = await API.post("/channels", channelForm);
      const channel = res.data;
  
      if (!channel || !channel._id) {
        throw new Error("Invalid response");
      }
  
      updateUser({ channels: [channel._id] });
  
      navigate(`/channel/${channel._id}`, { replace: true });
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.message || "Channel creation failed");
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await API.delete(`/videos/${videoId}`);
      const { data } = await API.get(`/channels/${id}`);
      setChannel(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (showCreateForm || id === "create") {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">Create Channel</h2>

        {formError && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-3">
            {formError}
          </div>
        )}

        <form onSubmit={handleCreateChannel} className="space-y-3">
          <input
            type="text"
            placeholder="Channel Name"
            className="w-full border p-2 rounded"
            value={channelForm.channelName}
            onChange={(e) =>
              setChannelForm({ ...channelForm, channelName: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={channelForm.description}
            onChange={(e) =>
              setChannelForm({ ...channelForm, description: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Banner URL"
            className="w-full border p-2 rounded"
            value={channelForm.channelBanner}
            onChange={(e) =>
              setChannelForm({
                ...channelForm,
                channelBanner: e.target.value,
              })
            }
          />

          <button className="bg-blue-600 text-white w-full py-2 rounded">
            Create Channel
          </button>
        </form>
      </div>
    );
  }

  if (!channel) {
    return <div className="text-center mt-10">Channel not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Banner */}
      <div className="h-48 w-full overflow-hidden rounded">
        <img
          src={channel.channelBanner || "https://placehold.co/1200x300"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Header */}
      <div className="flex items-center gap-4 mt-6 border-b pb-4">
        <img className="w-20 h-20 rounded-full" src={`${channel.owner?.avatar}`} />

        <div>
          <h1 className="text-2xl font-bold">{channel.channelName}</h1>
          <p className="text-gray-500 text-sm">
            {channel.subscribers} subscribers • {channel.videos?.length} videos
          </p>
        </div>

        {isOwner && (
          <button
            onClick={() => navigate(`/channel/${channel._id}/upload`)}
            className="ml-auto flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            <FiUpload />
            Upload
          </button>
        )}
      </div>

      {/* Videos */}
      <h2 className="text-lg font-semibold mt-6 mb-4">Videos</h2>

      {channel.videos?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {channel.videos.map((video) => (
            <div key={video._id} className="relative group">
            {isOwner && (
              <div className="absolute right-2 top-2 flex gap-2 z-10">
                <button
                  className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                  onClick={() =>
                    navigate(`/channel/${channel._id}/edit/${video._id}`)
                  }
                >
                  Edit
                </button>
          
                <button
                  className="bg-red-500 text-white px-2 py-1 text-xs rounded"
                  onClick={() => handleDeleteVideo(video._id)}
                >
                  Delete
                </button>
              </div>
            )}
          
            <VideoCard video={video} />
          </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No videos uploaded</p>
      )}
    </div>
  );
};

export default ChannelPage;
