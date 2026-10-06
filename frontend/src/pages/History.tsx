import { useEffect, useState } from 'react';
import { fetchActivities, deleteActivity } from '../utils/api';
import { Trash2, Search } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const History = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await fetchActivities();
      setActivities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;
    try {
      await deleteActivity(id);
      await loadActivities();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = activities.filter(a => 
    a.activity_type.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.note && a.note.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Activity History</h1>
        <p className="text-gray-500">View and manage your logged activities.</p>
      </header>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search activities..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No activities found.</div>
          ) : (
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Activity</th>
                  <th className="px-6 py-4 font-medium">Quantity</th>
                  <th className="px-6 py-4 font-medium">Estimated Impact</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(act => (
                  <tr key={act.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {format(parseISO(act.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-medium">
                        {act.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>{act.activity_type}</div>
                      {act.note && <div className="text-xs text-gray-400 mt-1">{act.note}</div>}
                    </td>
                    <td className="px-6 py-4">{act.quantity} {act.unit}</td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${act.impact_value > 0 ? (act.impact_type.toLowerCase().includes('avoided') || act.impact_type.toLowerCase().includes('reduced') || act.impact_type.toLowerCase().includes('diverted') ? 'text-green-600' : 'text-orange-600') : 'text-gray-600'}`}>
                        {act.impact_value} {act.impact_type}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(act.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
