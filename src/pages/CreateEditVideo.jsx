// src/pages/CreateEditVideo.jsx – Create or Edit a video
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import API from '../api/api.js';

const categories = [
    'Music',
    'Gaming',
    'Education',
    'Sports',
    'News',
    'Entertainment',
    'Science & Tech',
    'Comedy',
];

const CreateEditVideo = () => {
    const { channelId, videoId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const isEditing = Boolean(videoId);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoUrl: '',
        thumbnailUrl: '',
        category: 'Education',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // If editing, fetch existing video data
    useEffect(() => {
        if (isEditing) {
            const fetchVideo = async () => {
                try {
                    const { data } = await API.get(`/videos/${videoId}`);
                    setFormData({
                        title: data.title,
                        description: data.description || '',
                        videoUrl: data.videoUrl,
                        thumbnailUrl: data.thumbnailUrl,
                        category: data.category,
                    });
                } catch (err) {
                    console.error('Failed to fetch video for editing:', err);
                }
            };
            fetchVideo();
        }
    }, [videoId, isEditing]);

    // Redirect if not logged in
    if (!user) {
        navigate('/login');
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.title.trim() || !formData.videoUrl.trim() || !formData.thumbnailUrl.trim()) {
            setError('Title, Video URL, and Thumbnail URL are required');
            return;
        }

        try {
            setLoading(true);
            if (isEditing) {
                await API.put(`/videos/${videoId}`, formData);
            } else {
                await API.post('/videos', { ...formData, channelId });
            }
            navigate(`/channel/${channelId}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save video');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[700px] mx-auto p-6" id="create-edit-video-page">
            <h1 className="text-2xl font-semibold mb-8 text-yt-text-primary">{isEditing ? 'Edit Video' : 'Upload Video'}</h1>

            {error && <div className="bg-yt-error/10 border border-yt-error rounded-md-yt p-3 text-center text-yt-error text-sm mb-4">{error}</div>}

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="title" className="text-sm font-medium text-yt-text-secondary">Title <span className="text-yt-error">*</span></label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter video title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-yt-bg-tertiary border border-yt-border rounded-md-yt text-yt-text-primary text-[0.95rem] focus:border-yt-blue transition-colors duration-fast"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="description" className="text-sm font-medium text-yt-text-secondary">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Tell viewers about your video"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-yt-bg-tertiary border border-yt-border rounded-md-yt text-yt-text-primary text-[0.95rem] min-h-[100px] resize-y focus:border-yt-blue transition-colors duration-fast"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="videoUrl" className="text-sm font-medium text-yt-text-secondary">Video URL <span className="text-yt-error">*</span></label>
                    <input
                        type="text"
                        id="videoUrl"
                        name="videoUrl"
                        placeholder="e.g. https://www.youtube.com/embed/dQw4w9WgXcQ"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-yt-bg-tertiary border border-yt-border rounded-md-yt text-yt-text-primary text-[0.95rem] focus:border-yt-blue transition-colors duration-fast"
                    />
                    <span className="text-xs text-yt-text-muted mt-1">Use a YouTube embed URL (e.g. https://www.youtube.com/embed/VIDEO_ID)</span>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="thumbnailUrl" className="text-sm font-medium text-yt-text-secondary">Thumbnail URL <span className="text-yt-error">*</span></label>
                    <input
                        type="text"
                        id="thumbnailUrl"
                        name="thumbnailUrl"
                        placeholder="e.g. https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
                        value={formData.thumbnailUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-yt-bg-tertiary border border-yt-border rounded-md-yt text-yt-text-primary text-[0.95rem] focus:border-yt-blue transition-colors duration-fast"
                    />
                    <span className="text-xs text-yt-text-muted mt-1">Use a direct image URL for the video thumbnail</span>
                    {formData.thumbnailUrl && (
                        <div className="mt-2 w-[200px] aspect-video rounded-md-yt overflow-hidden bg-yt-bg-tertiary">
                            <img
                                src={formData.thumbnailUrl}
                                alt="Thumbnail preview"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="category" className="text-sm font-medium text-yt-text-secondary">Category <span className="text-yt-error">*</span></label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-yt-bg-tertiary border border-yt-border rounded-md-yt text-yt-text-primary text-[0.95rem] cursor-pointer appearance-auto focus:border-yt-blue transition-colors duration-fast [&>option]:bg-yt-bg-tertiary [&>option]:text-yt-text-primary"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-3 justify-end pt-3">
                    <button
                        type="button"
                        className="px-6 py-3 rounded-md-yt text-[0.95rem] font-medium text-yt-text-primary hover:bg-yt-bg-hover transition-colors duration-fast"
                        onClick={() => navigate(`/channel/${channelId}`)}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="px-6 py-3 bg-yt-blue text-yt-bg-primary rounded-md-yt text-[0.95rem] font-semibold hover:bg-yt-blue-hover transition-colors duration-fast disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading} id="save-video-btn">
                        {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Upload Video'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEditVideo;
