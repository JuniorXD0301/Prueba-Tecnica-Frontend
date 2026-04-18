import { SortField, SortOrder } from "../core/interfaces/Post";
import { PostsTableProps } from "../core/interfaces/PostsTableProps";

import { useRouter } from "next/navigation";

function SortIcon({
  field,
  active,
  order,
}: {
  field: SortField;
  active: boolean;
  order: SortOrder;
}) {
  return (
    <span className={`sort-icon ${active ? "active" : ""}`}>
      {active ? (order === "ascending" ? " ↑" : " ↓") : " ↕"}
    </span>
  );
}

export function PostsTable({
  posts,
  sortField,
  sortOrder,
  onSort,
  onSelectPost,
}: PostsTableProps) {
  

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <span>🔍</span>
        <p>No se encontraron posts con ese título.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="posts-table">
        <thead>
          <tr>
            <th
              className="col-id sortable"
              onClick={() => onSort("id")}
              aria-sort={sortField === "id" ? sortOrder : "none"}
            >
              ID
              <SortIcon
                field="id"
                active={sortField === "id"}
                order={sortOrder}
              />
            </th>
            <th
              className="col-title sortable"
              onClick={() => onSort("title")}
              aria-sort={sortField === "title" ? sortOrder : "none"}
            >
              Título
              <SortIcon
                field="title"
                active={sortField === "title"}
                order={sortOrder}
              />
            </th>
            <th className="col-body">Contenido</th>
            <th className="col-action">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} onClick={() => onSelectPost(post)}>
              <td className="col-id">{post.id}</td>
              <td className="col-title">{post.title}</td>
              <td className="col-body">
                <span className="body-preview">
                  {post.body.slice(0, 50)}

                  {post.body.length > 50 && <span className="ellipsis">…</span>}
                </span>
              </td>
              <td className="col-action">
                <div className="action-btns">
                  <button
                    className="btn-view"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPost(post);
                    }}
                  >
                    Ver más
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
