"use client"; 

import { useState, useEffect, useMemo, useCallback } from "react";

import { getPosts } from "./getpost";
import { Post, SortField, SortOrder } from "../interfaces/Post";


const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;
export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascending");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(10);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // debounce para búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handlePageSizeChange = useCallback((size: PageSize) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback(
    (field: SortField) => {
      if (field === sortField) {
        setSortOrder((prev) => (prev === "ascending" ? "descending" : "ascending"));
      } else {
        setSortField(field);
        setSortOrder("ascending");
      }
      setCurrentPage(1);
    },
    [sortField]
  );

  const filteredAndSorted = useMemo(() => {
    let result = [...posts];

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((post) =>
        post.title.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      const valA = sortField === "id" ? a.id : a.title.toLowerCase();
      const valB = sortField === "id" ? b.id : b.title.toLowerCase();

      if (valA < valB) return sortOrder === "ascending" ? -1 : 1;
      if (valA > valB) return sortOrder === "ascending" ? 1 : -1;
      return 0;
    });

    return result;
  }, [posts, debouncedSearch, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSorted.length / pageSize);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSorted.slice(start, start + pageSize);
  }, [filteredAndSorted, currentPage, pageSize]);

  return {
    posts: paginatedPosts,
    totalPosts: filteredAndSorted.length,
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
  };
}