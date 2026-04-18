import { getPostById } from "@/app/core/services/getpost";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function PostDetail({ params }: Props) {
  const { id } = await params;

  const post = await getPostById(Number(id));

  return (
    <main className="post-page">
      <div className="post-container">
        <div className="post-card">
          <div className="post-header">
            <span className="post-id">Post #{post.id}</span>
            <h1 className="post-title">{post.title}</h1>
          </div>

          <div className="post-content">
            <p>{post.body}</p>
          </div>

          <div className="post-footer">
            <Link href="/" className="btn-back">
              ← Volver
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
