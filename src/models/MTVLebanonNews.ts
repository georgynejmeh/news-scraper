export interface MTVLebanonNews {
  hasNextPage: boolean;
  articles: Article[];
}

export interface Article {
  name: string;
  description: string;
  date: string;
}
