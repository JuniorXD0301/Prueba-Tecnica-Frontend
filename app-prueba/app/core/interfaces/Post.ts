export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type SortField = "id" | "title";
export type SortOrder = "ascending" | "descending";

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}