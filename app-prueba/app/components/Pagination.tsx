import { PaginationProps } from "../core/interfaces/PaginationProps";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;
 
  // Genera un rango de páginas visible alrededor de la actual
  const getPageRange = () => {
    const delta = 2;
    const range: (number | "...")[] = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
 
    if (left > 1) {
      range.push(1);
      if (left > 2) range.push("...");
    }
 
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
 
    if (right < totalPages) {
      if (right < totalPages - 1) range.push("...");
      range.push(totalPages);
    }
 
    return range;
  };
 
  return (
    <nav className="pagination" aria-label="Paginación">
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ‹
      </button>
 
      {getPageRange().map((item, i) =>
        item === "..." ? (
          <span key={`ellipsis-${i}`} className="page-ellipsis">
            …
          </span>
        ) : (
          <button
            key={item}
            className={`page-btn ${item === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(item as number)}
            aria-current={item === currentPage ? "page" : undefined}
          >
            {item}
          </button>
        )
      )}
 
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >
        ›
      </button>
    </nav>
  );
}