'use client';
import { useState, useEffect } from 'react';
import { Article } from '../types';
import { exportPayoutsToPDF, exportPayoutsToCSV } from '../utils/exportPayouts';

type PayoutRates = {
  [key: string]: number;
};

type AuthorPayout = {
  author: string;
  articleCount: number;
  rate: number;
  total: number;
};

export default function PayoutCalculator({ articles }: { articles: Article[] }) {
  const [payoutRates, setPayoutRates] = useState<PayoutRates>({});
  const [authorPayouts, setAuthorPayouts] = useState<AuthorPayout[]>([]);
  const [editingRate, setEditingRate] = useState<{ author: string; rate: number } | null>(null);
  const [globalRate, setGlobalRate] = useState<number>(10);

  // Load rates from localStorage
  useEffect(() => {
    const savedRates = localStorage.getItem('payoutRates');
    if (savedRates) {
      setPayoutRates(JSON.parse(savedRates));
    }
    
    const savedGlobalRate = localStorage.getItem('globalPayoutRate');
    if (savedGlobalRate) {
      setGlobalRate(parseFloat(savedGlobalRate));
    }
  }, []);

  // Calculate payouts when articles or rates change
  useEffect(() => {
    const authorStats: { [key: string]: number } = {};
    
    // Count articles per author
    articles.forEach(article => {
      const author = article.author || 'Unknown';
      authorStats[author] = (authorStats[author] || 0) + 1;
    });

    // Calculate payouts
    const payouts = Object.entries(authorStats).map(([author, count]) => {
      const rate = payoutRates[author] || globalRate;
      return {
        author,
        articleCount: count,
        rate,
        total: count * rate
      };
    });

    setAuthorPayouts(payouts);
  }, [articles, payoutRates, globalRate]);

  // Save rates to localStorage
  useEffect(() => {
    localStorage.setItem('payoutRates', JSON.stringify(payoutRates));
    localStorage.setItem('globalPayoutRate', globalRate.toString());
  }, [payoutRates, globalRate]);

  const handleRateChange = (author: string, rate: number) => {
    setPayoutRates(prev => ({ ...prev, [author]: rate }));
  };

  const handleGlobalRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rate = parseFloat(e.target.value);
    if (!isNaN(rate)) {
      setGlobalRate(rate);
    }
  };

  const startEditing = (author: string, rate: number) => {
    setEditingRate({ author, rate });
  };

  const saveEditing = () => {
    if (editingRate) {
      handleRateChange(editingRate.author, editingRate.rate);
      setEditingRate(null);
    }
  };

  const totalPayout = authorPayouts.reduce((sum, payout) => sum + payout.total, 0);

  return (
    <div className="space-y-6">
      {/* Global Rate Setting */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Global Settings</h2>
        <div className="flex items-center">
          <label className="mr-2">Default Payout Rate:</label>
          <input
            type="number"
            value={globalRate}
            onChange={handleGlobalRateChange}
            min="0"
            step="0.5"
            className="border rounded px-3 py-2 w-24"
          />
          <span className="ml-2">USD per article</span>
        </div>
      </div>

      {/* Payout Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold">Total Articles</h3>
          <p className="text-2xl font-bold">{articles.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold">Unique Authors</h3>
          <p className="text-2xl font-bold">{authorPayouts.length}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold">Total Payout</h3>
          <p className="text-2xl font-bold">${totalPayout.toFixed(2)}</p>
        </div>
      </div>

      {/* Payout Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Articles</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate (USD)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Payout</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {authorPayouts.map((payout) => (
              <tr key={payout.author} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{payout.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payout.articleCount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingRate?.author === payout.author ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={editingRate.rate}
                        onChange={(e) => setEditingRate({
                          author: payout.author,
                          rate: parseFloat(e.target.value) || 0
                        })}
                        className="border rounded px-2 py-1 w-20 mr-2"
                        min="0"
                        step="0.5"
                        autoFocus
                      />
                      <button 
                        onClick={saveEditing}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="cursor-pointer hover:underline"
                      onClick={() => startEditing(payout.author, payout.rate)}
                    >
                      ${payout.rate.toFixed(2)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                  ${payout.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
<div className="flex justify-end space-x-4 mt-6">
  <button
    onClick={() => exportPayoutsToPDF(authorPayouts)}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
  >
    <span className="mr-2">📄</span> Export PDF
  </button>
  <button
    onClick={() => exportPayoutsToCSV(authorPayouts)}
    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
  >
    <span className="mr-2">📊</span> Export CSV
  </button>
</div>

    </div>
  );
}
