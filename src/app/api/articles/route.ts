import { NextResponse } from 'next/server';
import { Article } from '@/types';

export async function GET() {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    
    // Map to our Article type
    const articles: Article[] = data.articles.map((article: any) => ({
      id: article.title + article.publishedAt,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      author: article.author,
      publishedAt: article.publishedAt,
      source: {
        id: article.source.id,
        name: article.source.name
      }
    }));
    
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
