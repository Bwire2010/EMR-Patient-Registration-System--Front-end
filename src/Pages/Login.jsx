import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); //loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // start loading

        try {
            const response = await axios.post(`${BASE_URL}/token/`, form);
            const { access_token } = response.data;

            if (access_token) {
                localStorage.setItem('access_token', access_token);
                navigate('/');
            } else {
                setError('Invalid response from server');
            }
        } catch (err) {
            setError('Login failed: ' + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false); // stop loading
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 ">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-12 shadow-md w-full max-w-md space-y-5 rounded-xl"
            >
                <div className="flex justify-center mb-4">
                    <img src="/logo2.jpg" alt="Logo" className="h-32 rounded-xl" />
                </div>

                <h2 className="text-2xl font-bold py-3 text-center text-primary">Medipro</h2>

                {error && (
                    <p className="text-red-700 text-center font-serif text-sm bg-red-100 border border-red-400 rounded p-2">
                        {error}
                    </p>
                )}

                <div>
                    <label htmlFor="username" className="block text-xl font-semibold font-serif text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-xl font-semibold font-serif text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>
        </div>
    );
}

