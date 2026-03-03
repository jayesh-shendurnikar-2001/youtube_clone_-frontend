// src/pages/Register.jsx – Register page with validation
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api.js';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    // Validate form fields
    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            setLoading(true);
            await API.post('/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            // After successful registration, redirect to login page
            navigate('/login');
        } catch (err) {
            setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-56px-48px)] p-6" id="register-page">
            <div className="w-full max-w-[440px] bg-yt-bg-secondary border border-yt-border rounded-xl-yt px-10 py-12 shadow-[0_4px_24px_rgba(0,0,0,0.2)] max-[480px]:px-6 max-[480px]:py-8">
                <h1 className="text-center text-2xl font-medium mb-2 text-yt-text-primary">Create Account</h1>
                <p className="text-center text-[0.95rem] text-yt-text-secondary mb-8">to continue to YouTube</p>

                {serverError && <div className="bg-yt-error/10 border border-yt-error rounded-md-yt p-3 text-center text-yt-error text-sm mb-5">{serverError}</div>}

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="text-[0.85rem] font-medium text-yt-text-secondary">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={handleChange}
                            className="px-4 py-3 bg-yt-bg-tertiary border border-yt-border rounded-md-yt text-yt-text-primary text-[0.95rem] placeholder:text-yt-text-muted focus:border-yt-blue transition-colors duration-fast"
                        />
                        {errors.username && <span className="text-yt-error text-xs">{errors.username}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-[0.85rem] font-medium text-yt-text-secondary">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="px-4 py-3 bg-yt-bg-tertiary border border-yt-border rounded-md-yt text-yt-text-primary text-[0.95rem] placeholder:text-yt-text-muted focus:border-yt-blue transition-colors duration-fast"
                        />
                        {errors.email && <span className="text-yt-error text-xs">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-[0.85rem] font-medium text-yt-text-secondary">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password (min 6 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            className="px-4 py-3 bg-yt-bg-tertiary border border-yt-border rounded-md-yt text-yt-text-primary text-[0.95rem] placeholder:text-yt-text-muted focus:border-yt-blue transition-colors duration-fast"
                        />
                        {errors.password && <span className="text-yt-error text-xs">{errors.password}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword" className="text-[0.85rem] font-medium text-yt-text-secondary">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="px-4 py-3 bg-yt-bg-tertiary border border-yt-border rounded-md-yt text-yt-text-primary text-[0.95rem] placeholder:text-yt-text-muted focus:border-yt-blue transition-colors duration-fast"
                        />
                        {errors.confirmPassword && <span className="text-yt-error text-xs">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="w-full py-3 bg-yt-blue text-yt-bg-primary text-base font-semibold rounded-md-yt hover:bg-yt-blue-hover transition-colors duration-fast disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading} id="register-btn">
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center mt-4 text-sm text-yt-text-secondary">
                    Already have an account? <Link to="/login" className="text-yt-blue font-medium hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
