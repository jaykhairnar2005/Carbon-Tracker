
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft } from 'lucide-react';

const AddActivity = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category: 'Transport',
        type: 'Car',
        value: ''
    });
    const [loading, setLoading] = useState(false);

    const categories = {
        Transport: ['Car', 'Bike', 'Bus', 'Train'],
        Food: ['Veg', 'NonVeg'],
        Electricity: ['Default'],
        Shopping: ['Clothes', 'Electronics', 'Other']
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // Reset type if category changes
            if (name === 'category') {
                newData.type = categories[value][0];
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3000`;
            await axios.post(`${API_BASE}/api/activities`, formData);
            navigate('/');
        } catch (error) {
            console.error("Error adding activity", error);
            alert("Failed to save activity. Backend might be down.");
        } finally {
            setLoading(false);
        }
    };

    // Simple preview calculation (must match backend logically for UX)
    const getPreview = () => {
        const val = parseFloat(formData.value) || 0;
        let rate = 0;
        if (formData.category === 'Transport') rate = formData.type === 'Bike' ? 0.05 : 0.12;
        if (formData.category === 'Food') rate = formData.type === 'NonVeg' ? 3.0 : 1.5;
        if (formData.category === 'Electricity') rate = 0.82;
        if (formData.category === 'Shopping') rate = 2.0;

        return (val * rate).toFixed(2);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto"
        >
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm text-gray-600">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold">Add Activity</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.keys(categories).map(cat => (
                                <button
                                    type="button"
                                    key={cat}
                                    onClick={() => setFormData({ ...formData, category: cat, type: categories[cat][0] })}
                                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${formData.category === cat
                                        ? 'bg-nature-500 text-white shadow-lg shadow-nature-200'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-nature-500"
                        >
                            {categories[formData.category].map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {formData.category === 'Transport' ? 'Distance (km)' :
                                formData.category === 'Food' ? 'Quantity (meals)' :
                                    formData.category === 'Electricity' ? 'Usage (kWh)' : 'Items'}
                        </label>
                        <input
                            type="number"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                            placeholder="0"
                            required
                            step="0.1"
                            className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-nature-500 text-lg font-bold"
                        />
                    </div>

                    <div className="bg-nature-50 p-4 rounded-xl flex justify-between items-center text-nature-800">
                        <span className="font-medium">Est. Emission</span>
                        <span className="text-2xl font-bold">{getPreview()} kg</span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-nature-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-nature-200 hover:bg-nature-700 transition-transform active:scale-95 flex justify-center items-center gap-2"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Activity'}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default AddActivity;
