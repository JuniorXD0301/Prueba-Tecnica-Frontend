
import { notFound } from "next/navigation";
import { getPostById } from "../core/services/getpost";
import { BackButton } from "./Backbutoon";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostDetailPageProps) {
  const { id } = await params;
  const postId = Number(id);
  if (isNaN(postId)) return { title: "Post no encontrado" };

  try {
    const post = await getPostById(postId);
    return { title: `Post #${post.id} — ${post.title}` };
  } catch {
    return { title: "Post no encontrado" };
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const postId = Number(id);

  if (isNaN(postId) || postId < 1) notFound();

  let post;
  try {
    post = await getPostById(postId);
  } catch {
    return (
      <main className="page">
        <div className="container detail-container">
          <BackButton />
          <div className="detail-error">
            <span className="detail-error-icon">⚠️</span>
            <h2>No se pudo cargar el post</h2>
            <p>Hubo un problema al obtener el post #{postId}. Intenta de nuevo.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container detail-container">
        <BackButton />

        <article className="detail-card">
          <header className="detail-header">
            <span className="detail-badge">Post #{post.id}</span>
            <span className="detail-user">Usuario {post.userId}</span>
          </header>

          <h1 className="detail-title">{post.title}</h1>

          <div className="detail-divider" />

          <p className="detail-body">{post.body}</p>
        </article>
      </div>
    </main>
  );
}