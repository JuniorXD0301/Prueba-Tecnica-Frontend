import { CreatePostForm } from "../../components/CreatePostForm";

 
export const metadata = {
  title: "Crear nuevo post",
};
 
export default function CreatePostPage() {
  return (
    <main className="page">
      <div className="container detail-container">
        <CreatePostForm />
      </div>
    </main>
  );
}
 