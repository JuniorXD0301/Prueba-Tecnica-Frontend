import { Post, SortField, SortOrder } from "./Post";

export interface PostsTableProps {
  posts: Post[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onSelectPost: (post: Post) => void;
}