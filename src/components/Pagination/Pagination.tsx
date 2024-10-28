import React from 'react';

import { PaginationProps } from './Pagination.types';

/**
 * Pagination component
 *
 * @param {number} currentPage Current page
 * @param {number} totalPages Total pages
 * @param {number} perPage Results per page
 * @param {React.Dispatch<React.SetStateAction<number>>} setPage Set the current page
 * @param {React.Dispatch<React.SetStateAction<number>>} setPerPage Set the results per page
 *
 * @returns {JSX.Element} Pagination component
 */
const Pagination = ({ currentPage, totalPages, perPage, setPage, setPerPage }: PaginationProps) => {
  return (
    <div className="container mt-3" data-testid="pagination-component">
      <div className="row">
        {/* PERPAGE DROPDOWN */}
        <div className="col dropdown justify-content-end">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {`${perPage} results per page`}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className={`dropdown-item ${perPage === 5 ? 'active' : ''}`}
                type="button"
                onClick={() => setPerPage(5)}
              >
                5 results per page
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${perPage === 10 ? 'active' : ''}`}
                type="button"
                onClick={() => setPerPage(10)}
              >
                10 results per page
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${perPage === 20 ? 'active' : ''}`}
                type="button"
                onClick={() => setPerPage(20)}
              >
                20 results per page
              </button>
            </li>
          </ul>
        </div>
        {/* PAGINATION */}
        <nav className="col">
          <ul className="pagination justify-content-end">
            {/* Previous page button */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(currentPage - 1)}>
                Previous
              </button>
            </li>
            {/* First position */}
            <li className={`page-item ${currentPage === 1 && totalPages !== 1 ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() =>
                  setPage(
                    totalPages === 1
                      ? currentPage
                      : currentPage === totalPages
                        ? currentPage - 2
                        : currentPage - 1
                  )
                }
              >
                {currentPage === 1 || currentPage === 2 ? '1' : currentPage - 2}
              </button>
            </li>
            {/* Second position */}
            {totalPages < 2 ? null : (
              <li
                className={`page-item ${(currentPage !== 1 && currentPage !== totalPages) || (currentPage === 2 && totalPages === 2) ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => setPage(2)}>
                  {totalPages === 2
                    ? 2
                    : currentPage === totalPages
                      ? currentPage - 1
                      : currentPage === 1
                        ? 2
                        : currentPage}
                </button>
              </li>
            )}
            {/* Third position */}
            {totalPages < 3 ? null : (
              <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() =>
                    setPage(
                      currentPage === totalPages || currentPage === totalPages - 1
                        ? totalPages
                        : currentPage + (currentPage == 1 ? 2 : 1)
                    )
                  }
                >
                  {currentPage === totalPages || currentPage === totalPages - 1
                    ? totalPages
                    : currentPage + (currentPage == 1 ? 2 : 1)}
                </button>
              </li>
            )}
            {/* Next page button */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
