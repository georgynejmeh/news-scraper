export interface AlqahiraNews {
  data: Data;
  success: boolean;
}

export interface Data {
  posts: Post[];
}

export interface Post {
  title: string;
  summary: string;
  raw_content: string;
}
