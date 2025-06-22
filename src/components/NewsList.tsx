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
  setArticles(Array.isArray(data.articles) ? data.articles : []);
  setLastUpdated(new Date().toLocaleString());
};


  useEffect(() => {
    fetchNews();
  }, [category]);

  const filteredArticles = articles.filter(article =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2">
        <h2 className="text-xl font-semibold">Latest News</h2>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredArticles.map((article, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            style={{ minHeight: "420px" }}
          >
            <div className="w-full aspect-[4/3] bg-gray-100">
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full mb-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.description?.slice(0, 120) || "No description available."}
              </p>
              <div className="mt-auto flex flex-col">
                <span className="text-xs text-gray-500">By {article.author || "Unknown"}</span>
                <span className="text-xs text-gray-400">{new Date(article.publishedAt).toLocaleString()}</span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-blue-600 hover:underline text-sm font-medium"
                >
                  Read more →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
