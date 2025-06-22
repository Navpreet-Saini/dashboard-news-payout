'use client';

import { useEffect, useState } from 'react';

type Article = {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  author?: string;
  publishedAt: string;
};

export default function NewsList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const categories = ["general", "technology", "business", "health", "science", "sports", "entertainment"];

  const fetchNews = async () => {
    const res = await fetch(`/api/news?category=${category}`);
    const data = await res.json();
    setArticles(data.articles);
    setLastUpdated(new Date().toLocaleString());
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  const filteredArticles = articles.filter(article =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      {/* Dashboard Title */}
      <h1 className="text-4xl font-bold mb-2">News Dashboard</h1>
      <hr className="mb-6" />

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-2xl font-semibold">Latest News</h2>
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-3 py-2 w-40 shadow-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 w-64 shadow-sm"
          />
          <button
            onClick={fetchNews}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow flex items-center"
          >
            <span className="material-icons mr-1">refresh</span>
            Refresh
          </button>
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            Last updated at {lastUpdated}
          </span>
        </div>
      )}

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow hover:shadow-lg rounded-xl overflow-hidden flex flex-col transition duration-300 hover:scale-[1.02]"
            style={{ height: '480px' }}
          >
            {article.urlToImage ? (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-[150px] object-cover rounded-t-xl"
              />
            ) : (
              <div className="w-full h-[150px] bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                No Image
              </div>
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                {article.description?.slice(0, 100) || 'No description available.'}
              </p>
              <div className="text-xs text-gray-500 mt-auto">
                <p>By {article.author || 'Unknown'}</p>
                <p>{new Date(article.publishedAt).toLocaleString()}</p>
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 mt-2 hover:underline text-sm"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
