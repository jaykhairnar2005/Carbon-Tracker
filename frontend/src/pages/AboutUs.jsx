import React from 'react';

const AboutUs = () => {
    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-nature-800 mb-4">About CarbonTracker</h1>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                    CarbonTracker is a dedicated tool designed to help you monitor and reduce your personal carbon footprint.
                    We believe that small individual actions can collectively lead to significant environmental impact.
                </p>

                <h2 className="text-xl font-semibold text-nature-700 mt-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                    Our mission is to empower individuals with data and insights to make eco-friendly choices in their daily lives.
                    By tracking activities across transport, food, electricity, and shopping, we provide a comprehensive view of your environmental impact.
                </p>

                <h2 className="text-xl font-semibold text-nature-700 mt-4">Key Features</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Real-time carbon emission tracking</li>
                    <li>Visual reports and analytics</li>
                    <li>Personalized eco-tips</li>
                    <li>Secure user accounts to save your progress</li>
                </ul>
            </div>
        </div>
    );
};

export default AboutUs;
