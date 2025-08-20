import { useState, useMemo, useEffect, useCallback } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  initialItemsPerPage?: number;
}

export function usePagination<T>({ data, initialItemsPerPage = 25 }: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage) || 1;
  }, [data.length, itemsPerPage]);

  // Sayfa sınırlarını kontrol et
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const changeItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    // Mevcut pozisyonu korumaya çalış
    const currentFirstItem = (currentPage - 1) * itemsPerPage + 1;
    const newTotalPages = Math.ceil(data.length / newItemsPerPage);
    const newPage = Math.ceil(currentFirstItem / newItemsPerPage);
    setCurrentPage(Math.max(1, Math.min(newPage, newTotalPages)));
  };

  // Veri değiştiğinde ilk sayfaya dön
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    goToPage,
    changeItemsPerPage,
    resetPage,
    totalItems: data.length
  };
}