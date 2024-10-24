import React from 'react';
import styles from './PaginationProp.module.scss'; // Import CSS Module

export default function Pagination({ currentPage, totalPages, handlePageChange }) {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      {/* Nút mũi tên lùi */}
      <button
        className={styles.paginationButton}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        aria-label="Trang trước"
      >
        &lt;
      </button>

      {/* Nút số trang */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .slice(Math.max(0, currentPage - 3), Math.min(currentPage + 2, totalPages)) // Hiển thị tối đa 5 nút trang
        .map((page) => (
          <button
            key={page}
            className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}
            onClick={() => handlePageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            aria-label={`Trang ${page}`}
          >
            {page}
          </button>
        ))}

      {/* Nút mũi tên tới */}
      <button
        className={styles.paginationButton}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="Trang tiếp theo"
      >
        &gt;
      </button>
    </div>
  );
}
