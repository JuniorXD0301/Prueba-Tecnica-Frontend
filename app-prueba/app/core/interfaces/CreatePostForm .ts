export interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostForm {
  title: string;
  body: string;
  userId: string;
}
 
export type CreatePostStatus = "idle" | "loading" | "success" | "error";