export interface AljazeeraNews {
  data: Data;
}

export interface Data {
  homepage: Homepage;
}

export interface Homepage {
  feedPost: FeedPost[];
  curatedCollection: CuratedCollection[];
  automatedCollection: AutomatedCollection[];
}

export interface FeedPost {
  title: string;
  excerpt: string;
  date: string;
}

export interface CuratedCollection {
  posts: Post[];
}

export interface Post {
  title: string;
  excerpt: string;
  date: string;
}

export interface AutomatedCollection {
  posts: Post2[];
}

export interface Post2 {
  title: string;
  excerpt: string;
  date: string;
}
