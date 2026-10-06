import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Cloud, Recycle, Zap, BarChart3 } from 'lucide-react';
import { fetchDashboard, fetchActivities } from '../utils/api';
import { format, parseISO } from 'date-fns';

export const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dashData, actsData] = await Promise.all([
          fetchDashboard(),
          fetchActivities()
        ]);
        setData(dashData);
        setActivities(actsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Group chart data by date
  const chartDataMap = activities.reduce((acc: any, act: any) => {
    const date = format(parseISO(act.date), 'MMM dd');
    if (!acc[date]) {
      acc[date] = { date, impact: 0 };
    }
    // We plot net CO2 score or something similar. Let's just use impact_value if it's co2 avoided (positive), emitted (negative)
    if (act.impact_type.toLowerCase().includes('co2')) {
      const val = act.impact_type.toLowerCase().includes('avoided') ? act.impact_value : -act.impact_value;
      acc[date].impact += val;
    }
    return acc;
  }, {});

  const chartData = Object.values(chartDataMap).reverse();

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 50) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Good evening, {data?.user_name || 'User'}</h1>
        <p className="text-gray-500">Here is your environmental impact summary.</p>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-green-600 mb-2">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold text-gray-700">Environmental Score</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{data?.metrics?.score ?? 0}/100</div>
          <p className="text-sm text-gray-500">Status: <span className="font-medium text-gray-700">{getScoreStatus(data?.metrics?.score || 0)}</span></p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-blue-600 mb-2">
            <Cloud className="w-5 h-5" />
            <h3 className="font-semibold text-gray-700">Net CO2 Impact</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {(data?.metrics?.co2_impact || 0) > 0 ? '+' : ''}{data?.metrics?.co2_impact ?? 0} kg
          </div>
          <p className="text-sm text-gray-500">Estimated value</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-purple-600 mb-2">
            <Recycle className="w-5 h-5" />
            <h3 className="font-semibold text-gray-700">Waste Reduced</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{data?.metrics?.waste_reduced ?? 0} kg</div>
          <p className="text-sm text-gray-500">Diverted from landfill</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-orange-500 mb-2">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold text-gray-700">Eco Streak</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{data?.metrics?.streak ?? 0} days</div>
          <p className="text-sm text-gray-500">Keep it up!</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Charts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Net CO2 Impact Over Time</h3>
          {chartData.length > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="impact" stroke="#059669" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
              <BarChart3 className="w-12 h-12 mb-2 opacity-20" />
              <p className="text-lg font-medium text-gray-600">Your Environmental Dashboard</p>
              <p className="text-gray-500 mt-1">No activity data yet.</p>
              <p className="text-sm text-gray-400 mt-2">Start tracking your first eco-friendly activity to see your environmental impact here.</p>
            </div>
          )}
        </div>

        {/* Insights & Recommendations */}
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
            <h3 className="text-lg font-bold text-green-900 mb-4">Eco Insights</h3>
            <ul className="space-y-3">
              {data?.insights?.map((insight: any, i: number) => (
                <li key={i} className="flex gap-2 text-green-800 text-sm">
                  <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500" />
                  {insight.message}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Next Best Actions</h3>
            <ul className="space-y-4">
              {data?.recommendations?.map((rec: any, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <Target className="w-5 h-5 text-green-600 flex-shrink-0" />
                  {rec.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
