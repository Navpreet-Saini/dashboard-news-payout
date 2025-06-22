'use client';

import { useEffect, useState } from 'react';

type Article = {
  title: string;
  author?: string;
  publishedAt: string;
  url: string;
  urlToImage?: string;
  description?: string;
};

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news', { cache: 'no-store' });
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error('Failed to fetch news:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Latest News</h2>
        <button
          onClick={fetchNews}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
          🔄 Refresh
        </button>
      </div>
      

      {loading && <p>Loading news...</p>}

      <div className="space-y-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="border p-3 rounded shadow-sm bg-white"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt="news"
                className="w-full h-48 object-cover mb-2 rounded"
              />
            )}
            <h3 className="text-md font-bold mb-1">{article.title}</h3>
            <p className="text-sm text-gray-600">
              {article.author ? `By ${article.author} • ` : ''}
              {new Date(article.publishedAt).toLocaleString()}
            </p>
            {article.description && (
              <p className="text-sm mt-2">{article.description}</p>
            )}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm mt-2 inline-block"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
