"use client";

import { PageSize, usePosts } from "./core/services/usepost";
import { PostsTable } from "./components/Poststable";
import { PostModal } from "./components/Postmodal";
import { Pagination } from "./components/Pagination";
import { useState } from "react";
import { CreatePostModal } from "./components/CreatePostModal";

export default function Home() {
  const {
    posts,
    totalPosts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    handleSort,
    currentPage,
    setCurrentPage,
    pageSize,
    handlePageSizeChange,
    totalPages,
    PAGE_SIZE_OPTIONS,
    selectedPost,
    setSelectedPost,
  } = usePosts();

    const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <main className="page">
      <div className="container">
        <header className="page-header">
          <div className="header-row">
            <div>
              <h1 className="page-title">Biblioteca</h1>
              <p className="page-subtitle">Listado de libros</p>
            </div>
            <button
              className="btn-create"
              onClick={() => setShowCreateModal(true)}
            >
              + Nuevo post
            </button>
          </div>
        </header>

        <div className="controls">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por título…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar posts por título"
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          <div className="page-size-selector">
            <label htmlFor="pageSize">Mostrar:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) =>
                handlePageSizeChange(Number(e.target.value) as PageSize)
              }
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* loading */}
        {loading && (
          <div className="state-message">
            <div className="spinner" />
            <p>Cargando posts…</p>
          </div>
        )}

        {error && (
          <div className="state-message error">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="results-info">
              {totalPosts} {totalPosts === 1 ? "resultado" : "resultados"}
              {searchQuery && ` para "${searchQuery}"`}
            </div>

            <PostsTable
              posts={posts}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              onSelectPost={setSelectedPost}
            />

            <div className="footer-controls">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      {/* Modal crear post */}
      {showCreateModal && (
        <CreatePostModal onClose={() => setShowCreateModal(false)} />
      )}
    </main>
  );
}
