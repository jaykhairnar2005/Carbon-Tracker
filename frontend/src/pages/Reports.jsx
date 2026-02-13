
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import { motion } from 'framer-motion';
import API_BASE from '../config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Reports = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock data
    const mockActivities = [
        { category: 'Transport', carbonEmission: 12.5 },
        { category: 'Food', carbonEmission: 5.0 },
        { category: 'Electricity', carbonEmission: 8.2 },
        { category: 'Shopping', carbonEmission: 3.0 },
        { category: 'Transport', carbonEmission: 2.5 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3000`;
                const res = await axios.get(`${API_BASE}/api/activities`);
                processData(res.data);
            } catch (error) {
                console.warn("Using mock data for charts");
                processData(mockActivities);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const processData = (data) => {
        // Pie Chart Data (By Category)
        const categories = {};
        data.forEach(item => {
            categories[item.category] = (categories[item.category] || 0) + item.carbonEmission;
        });

        // Bar Chart Data (Over time - simplified to just items for hackathon)
        // Or we can group by date if we had more data.

        setChartData({
            pie: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: ['#22c55e', '#3b82f6', '#f97316', '#a855f7'],
                }]
            },
            bar: {
                labels: Object.keys(categories),
                datasets: [{
                    label: 'Emissions (kg)',
                    data: Object.values(categories),
                    backgroundColor: '#22c55e',
                    borderRadius: 8,
                }]
            }
        });
    };

    if (loading) return <div className="p-10 text-center">Loading Charts...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 pt-4"
        >
            <h2 className="text-2xl font-bold px-2">Emission Reports</h2>

            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-semibold mb-4 text-gray-700">Emission by Category</h3>
                <div className="h-64 flex justify-center">
                    {chartData && <Pie data={chartData.pie} options={{ responsive: true, maintainAspectRatio: false }} />}
                </div>
            </div>

            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-semibold mb-4 text-gray-700">Total Emissions Breakdown</h3>
                <div className="h-64">
                    {chartData && <Bar data={chartData.bar} options={{ responsive: true, maintainAspectRatio: false }} />}
                </div>
            </div>
        </motion.div>
    );
};

export default Reports;
