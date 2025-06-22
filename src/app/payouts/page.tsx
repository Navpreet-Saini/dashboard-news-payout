'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import PayoutCalculator from '../../components/PayoutCalculator';
import { Article } from '../../types';

export default function PayoutsPage() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data.articles);
    };
    fetchArticles();
  }, []);

  if (!session || session.user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Payout Management</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          You must be an admin to access this page.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Payout Management</h1>
      <PayoutCalculator articles={articles} />
    </div>
  );
}
