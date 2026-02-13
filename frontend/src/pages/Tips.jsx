
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Droplets, Car, ShoppingBag } from 'lucide-react';

const Tips = () => {
    const tips = [
        { title: "Switch to LED", desc: "LED bulbs use 75% less energy than incandescent lighting.", icon: Lightbulb, color: "bg-yellow-100 text-yellow-600" },
        { title: "Save Water", desc: "Fix leaky faucets and take shorter showers to save water and energy.", icon: Droplets, color: "bg-blue-100 text-blue-600" },
        { title: "Carpool", desc: "Share a ride to reduce your carbon footprint and save gas money.", icon: Car, color: "bg-green-100 text-green-600" },
        { title: "Reusable Bags", desc: "Bring your own bags when shopping to reduce plastic waste.", icon: ShoppingBag, color: "bg-purple-100 text-purple-600" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 pt-4"
        >
            <h2 className="text-2xl font-bold px-2">Eco Tips</h2>

            <div className="grid gap-4">
                {tips.map((tip, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="card-hover bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-start"
                    >
                        <div className={`p-3 rounded-xl ${tip.color}`}>
                            <tip.icon size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">{tip.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{tip.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Tips;
