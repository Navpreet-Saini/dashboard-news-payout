import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category") || "general";
  const query = searchParams.get("q") || "";

  const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&category=${category}&q=${query}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Api-Key": process.env.NEWS_API_KEY!,
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}
