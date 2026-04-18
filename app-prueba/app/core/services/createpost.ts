import { CreatePostPayload } from "../interfaces/CreatePostForm ";
import { Post } from "../interfaces/Post";


export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Error al crear post: ${res.status} ${res.statusText}`);
  }

  return res.json();
}