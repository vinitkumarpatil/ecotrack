import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createActivity, calculateImpact } from '../utils/api';
import { Leaf, Info } from 'lucide-react';
import { format } from 'date-fns';

const CATEGORIES = {
  Transport: ['Walking', 'Cycling', 'Public Transport', 'Car', 'Bike/Motorcycle'],
  Energy: ['Electricity Usage'],
  Water: ['Water Usage'],
  Waste: ['Plastic Avoided', 'Recycling', 'General Waste'],
  'Eco Actions': ['Tree Planting', 'Reusable Bottle', 'Reusable Bag'],
};

export const LogActivity = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('Transport');
  const [activityType, setActivityType] = useState('Cycling');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('km');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [note, setNote] = useState('');

  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Update units based on type
  const handleTypeChange = (type: string) => {
    setActivityType(type);
    if (type === 'Electricity Usage') setUnit('kWh');
    else if (type === 'Water Usage') setUnit('L');
    else if (['Plastic Avoided', 'Reusable Bottle', 'Reusable Bag'].includes(type)) setUnit('items');
    else if (['Recycling', 'General Waste'].includes(type)) setUnit('kg');
    else if (type === 'Tree Planting') setUnit('trees');
    else setUnit('km'); // transport default
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) return alert('Quantity must be greater than zero.');
    setLoading(true);
    try {
      const result = await calculateImpact({
        category,
        activity_type: activityType,
        quantity,
        unit,
        date,
        note
      });
      setPreview(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await createActivity({
        category,
        activity_type: activityType,
        quantity,
        unit,
        date,
        note
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Log Activity</h1>
        <p className="text-gray-500">Record your everyday environmental activities.</p>
      </header>

      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={category} 
                onChange={(e) => {
                  setCategory(e.target.value);
                  const firstType = CATEGORIES[e.target.value as keyof typeof CATEGORIES][0];
                  handleTypeChange(firstType);
                }}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-green-500 focus:border-green-500"
              >
                {Object.keys(CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
              <select 
                value={activityType} 
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-green-500 focus:border-green-500"
              >
                {CATEGORIES[category as keyof typeof CATEGORIES].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <div className="flex relative">
                <input 
                  type="number" 
                  min="0.1" 
                  step="0.1"
                  value={quantity} 
                  onChange={(e) => setQuantity(parseFloat(e.target.value))}
                  className="w-full rounded-l-lg border-gray-300 border border-r-0 p-2.5 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <span className="inline-flex items-center px-4 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  {unit}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
            <input 
              type="text" 
              value={note} 
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Morning commute"
              className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            {loading ? 'Calculating...' : 'Calculate Impact'}
          </button>
        </form>

        {preview && (
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Leaf className={preview.direction === 'positive' ? 'text-green-500' : 'text-orange-500'} />
              Estimated Environmental Impact
            </h3>
            
            <div className={`p-4 rounded-xl border ${preview.direction === 'positive' ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'} mb-6`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{preview.impactType}</span>
                <span className={`font-bold text-lg ${preview.direction === 'positive' ? 'text-green-700' : 'text-orange-700'}`}>
                  {preview.value} {preview.unit}
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600 mt-3 pt-3 border-t border-gray-200/50">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>{preview.explanation}</p>
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex justify-center"
            >
              {saving ? 'Saving...' : 'Save Activity'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
