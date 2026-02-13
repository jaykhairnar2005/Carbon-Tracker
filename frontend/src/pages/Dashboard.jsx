
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Leaf, Activity } from 'lucide-react';
import axios from 'axios';
import API_BASE from '../config';

const Dashboard = () => {
    const [activities, setActivities] = useState([]);
    const [totalEmission, setTotalEmission] = useState(0);
    const [loading, setLoading] = useState(true);

    // Mock data for fallback
    const mockActivities = [
        { id: 1, category: 'Transport', type: 'Car', value: 15, carbonEmission: 1.8, createdAt: new Date().toISOString() },
        { id: 2, category: 'Food', type: 'Veg', value: 1, carbonEmission: 1.5, createdAt: new Date().toISOString() }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                const res = await axios.get(`${API_BASE}/api/activities`);
                setActivities(res.data);
                const total = res.data.reduce((acc, curr) => acc + curr.carbonEmission, 0);
                setTotalEmission(total);
            } catch (error) {
                console.error("Failed to fetch data, using mock", error);
                setActivities(mockActivities);
                setTotalEmission(3.3);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6 pt-4"
        >
            <motion.div variants={item} className="flex justify-between items-center px-2">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Hello, Eco-Warrior! 👋</h2>
                    <p className="text-gray-500">Let's save the planet today.</p>
                </div>
                <div className="w-10 h-10 bg-nature-100 rounded-full flex items-center justify-center text-nature-600">
                    <Leaf size={20} />
                </div>
            </motion.div>

            {/* Main Stats Card */}
            <motion.div variants={item} className="bg-gradient-to-br from-nature-500 to-nature-600 rounded-3xl p-6 text-white shadow-lg shadow-nature-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-nature-100 font-medium mb-1">Total Carbon Footprint</p>
                        <h3 className="text-4xl font-bold">{totalEmission.toFixed(2)} <span className="text-lg font-normal">kg CO₂</span></h3>
                    </div>
                    <div className="bg-white/20 p-2 rounded-xl">
                        <Activity className="text-white" />
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2 text-nature-100">
                        <span>Daily Goal</span>
                        <span>10 kg</span>
                    </div>
                    <div className="w-full bg-black/20 rounded-full h-2">
                        <div
                            className="bg-white h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min((totalEmission / 10) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats or Tips maybe? */}

            {/* Recent Activity */}
            <motion.div variants={item}>
                <div className="flex justify-between items-center mb-4 px-2">
                    <h3 className="font-bold text-lg text-gray-800">Recent Activity</h3>
                    <button className="text-nature-600 text-sm font-medium">View All</button>
                </div>

                <div className="space-y-3">
                    {activities.slice(0, 5).map((act, i) => (
                        <motion.div
                            key={act.id || i}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-full ${act.category === 'Transport' ? 'bg-blue-50 text-blue-500' :
                                    act.category === 'Food' ? 'bg-orange-50 text-orange-500' :
                                        act.category === 'Electricity' ? 'bg-yellow-50 text-yellow-500' :
                                            'bg-purple-50 text-purple-500'
                                    }`}>
                                    {act.category === 'Transport' && '🚗'}
                                    {act.category === 'Food' && '🍔'}
                                    {act.category === 'Electricity' && '⚡'}
                                    {act.category === 'Shopping' && '🛍️'}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">{act.category}</h4>
                                    <p className="text-xs text-gray-400">{new Date(act.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block font-bold text-gray-800">{act.carbonEmission} kg</span>
                                <span className="text-xs text-gray-400">{act.type}</span>
                            </div>
                        </motion.div>
                    ))}
                    {activities.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                            No activities yet. Start tracking!
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
