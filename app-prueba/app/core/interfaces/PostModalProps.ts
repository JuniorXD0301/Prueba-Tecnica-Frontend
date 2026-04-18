import { Post } from "./Post";

export interface PostModalProps {
  post: Post;
  onClose: () => void;
}