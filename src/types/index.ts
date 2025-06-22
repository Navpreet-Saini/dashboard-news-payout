export type Article = {
  id: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  author?: string;
  publishedAt: string;
  source?: {
    id?: string | null;
    name?: string;
  };
};
