import Dexie, { Table } from 'dexie';
import type { Article } from '@/types';

export class ArticlesDB extends Dexie {
  articles!: Table<Article, string>; // string = article id

  constructor() {
    super('ArticlesDatabase');
    this.version(1).stores({
      articles: 'id, title, author, publishedAt'
    });
  }
}

export const db = new ArticlesDB();
