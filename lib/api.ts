export async function fetchNews(query = "") {
  const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=YOUR_API_KEY`);
  const data = await res.json();
  return data.articles;
}
