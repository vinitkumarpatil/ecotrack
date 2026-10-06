import { Link } from 'react-router-dom';
import { Leaf, Activity, BarChart3, Target } from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
              <Leaf className="w-6 h-6" />
              <span>EcoTrack</span>
            </div>
            <Link
              to="/dashboard"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-8">
          <Leaf className="w-4 h-4" />
          Smart Environmental Impact Tracker
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Track Your Impact.<br />Build a Greener Future.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          EcoTrack helps you understand how your everyday choices affect the environment. Log activities, see your estimated carbon footprint, and build better habits.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/log"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium text-lg transition-colors"
          >
            Start Tracking
          </Link>
          <Link
            to="/dashboard"
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-full font-medium text-lg transition-colors"
          >
            View Dashboard
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 text-left">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">1. Track</h3>
            <p className="text-gray-600">Log everyday environmental activities like your commute, energy usage, and waste reduction.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">2. Measure</h3>
            <p className="text-gray-600">Understand your estimated environmental impact through intuitive charts and a unified score.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">3. Improve</h3>
            <p className="text-gray-600">Get practical recommendations based on your habits to further reduce your carbon footprint.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
