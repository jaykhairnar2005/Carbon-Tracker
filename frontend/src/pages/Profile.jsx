
import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 pt-4"
        >
            <div className="flex items-center gap-4 px-2">
                <div className="w-16 h-16 bg-nature-200 rounded-full flex items-center justify-center text-nature-700">
                    <User size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{user ? user.name : 'User'}</h2>
                    <p className="text-gray-500">{user ? user.email : 'No Email'}</p>
                </div>
            </div>

            <div className="bg-nature-600 text-white rounded-3xl p-6 shadow-lg shadow-nature-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-nature-100">Carbon Score</span>
                    <Shield />
                </div>
                <h3 className="text-4xl font-bold mb-4">850 <span className="text-lg font-normal">pts</span></h3>
                <p className="text-sm text-nature-100">You are in the top 5% of eco-friendly users!</p>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-4 px-2">Achievements</h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: 'First Activity', date: 'Jan 12', icon: Award },
                        { label: 'Low Emission', date: 'Feb 10', icon: Award },
                        { label: 'Eco Streak', date: '3 Days', icon: Award },
                        { label: 'Recycler', date: 'Locked', icon: Shield, locked: true },
                    ].map((badge, i) => (
                        <div key={i} className={`bg-white p-4 rounded-2xl border ${badge.locked ? 'border-gray-100 opacity-60' : 'border-nature-100 bg-nature-50'} flex flex-col items-center text-center gap-2`}>
                            <div className={`p-2 rounded-full ${badge.locked ? 'bg-gray-100 text-gray-400' : 'bg-nature-100 text-nature-600'}`}>
                                <badge.icon size={24} />
                            </div>
                            <span className="font-semibold text-sm">{badge.label}</span>
                            <span className="text-xs text-gray-400">{badge.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
