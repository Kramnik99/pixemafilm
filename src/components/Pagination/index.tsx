import React from 'react';
import { buildPagination } from '../../utils/pagination';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const allPages = buildPagination(currentPage, totalPages);

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {allPages.map((page, index) => {
        if (page === '...') {
          return <span key={`dots-${index}`} className="pagination__dots">...</span>;
        }

        return (
          <button
            key={index}
            className={`pagination__page-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </button>
        );
      })}

      <button
        className="pagination__button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};