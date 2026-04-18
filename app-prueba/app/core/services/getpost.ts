import { Post } from "../interfaces/Post";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`Error al obtener posts: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getPostById(id: number): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    cache: "force-cache",
  });
console.log(res)
  if (!res.ok) {
    throw new Error(`Error al obtener post ${id}: ${res.status}`);
  }

  return res.json();
}