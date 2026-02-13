import React, { useState } from 'react';
import { Phone, MapPin, Send, AlertTriangle } from 'lucide-react';
import { INDIAN_STATES_DISTRICTS } from '../data/indian_states_districts';

const Helpline = () => {
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // Mock function to get helpline number based on state/district
    // In a real app, this would query a database
    const getHelplineNumber = (selectedState) => {
        // Generic logic or mock map
        // For hackathon, returning a consistent mocked number format or specific ones for major states
        if (selectedState === 'Maharashtra') return '1800-123-4567';
        if (selectedState === 'Delhi') return '1800-11-2345';
        if (selectedState === 'Karnataka') return '080-2222-3333';
        return '1800-11-5555 (National/State)';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            setLocation('');
            setDescription('');
            // Reset success message after 3 seconds
            setTimeout(() => setSubmitted(false), 5000);
        }, 1000);
    };

    return (
        <div className="p-4 space-y-6 max-w-2xl mx-auto pb-24 md:pb-8">
            <h1 className="text-2xl font-bold text-nature-800 flex items-center gap-2">
                <Phone className="text-nature-600" /> Government Helpline
            </h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-nature-100 space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Select State</label>
                    <select
                        value={state}
                        onChange={(e) => {
                            setState(e.target.value);
                            setDistrict(''); // Reset district on state change
                        }}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nature-500 outline-none"
                    >
                        <option value="">-- Choose State --</option>
                        {Object.keys(INDIAN_STATES_DISTRICTS).map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                {state && (
                    <div className="animate-fadeIn">
                        <label className="block text-gray-700 font-medium mb-2">Select District</label>
                        <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nature-500 outline-none"
                        >
                            <option value="">-- Choose District --</option>
                            {INDIAN_STATES_DISTRICTS[state].map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                )}

                {state && (
                    <div className="mt-6 bg-nature-50 p-4 rounded-lg flex items-center gap-4 animate-fadeIn">
                        <div className="bg-nature-100 p-3 rounded-full text-nature-600">
                            <Phone size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Helpline Number for {district ? `${district}, ${state}` : state}</p>
                            <p className="text-xl font-bold text-nature-700">{getHelplineNumber(state)}</p>
                        </div>
                        <a href={`tel:${getHelplineNumber(state)}`} className="ml-auto bg-nature-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-nature-700">
                            Call Now
                        </a>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-orange-500" /> Report Waste / Request Cleanup
                </h2>

                {submitted ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
                        <p className="font-bold">Request Submitted Successfully!</p>
                        <p className="text-sm">Ticket #REQ-{Math.floor(Math.random() * 10000)} has been created.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-600 text-sm mb-1">Location / Landmark</label>
                            <div className="relative">
                                <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nature-500 outline-none"
                                    placeholder="e.g. Near Central Park, Main Road"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600 text-sm mb-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nature-500 outline-none h-24 resize-none"
                                placeholder="Describe the waste issue..."
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <Send size={18} /> Submit Request
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Helpline;
