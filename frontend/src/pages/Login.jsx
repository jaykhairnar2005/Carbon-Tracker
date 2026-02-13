import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_BASE from '../config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            // Using hardcoded URL for debugging to ensure no config/env var issues
            const HARDCODED_API = 'https://carbon-tracker-b4bf.onrender.com';
            const response = await fetch(`${HARDCODED_API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Login failed');

            login(data.token, data.user);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-nature-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-nature-800 mb-6 text-center">Login to CarbonTracker</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:border-nature-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:border-nature-500 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-nature-600 text-white py-2 rounded hover:bg-nature-700 transition"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Don't have an account? <Link to="/register" className="text-nature-600 hover:underline">Register</Link></p>
                </div>
                <div className="mt-8 text-center text-xs text-gray-400">
                    <p>VERSION: V2-HARDCODED</p>
                    <p>DEBUG: Forces connection to: <span className="font-mono">https://carbon-tracker-b4bf.onrender.com</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
