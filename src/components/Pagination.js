import React from 'react';

export default function Pagination({ totalPages, newPage }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <>
            {pages.length > 1 && (
                <nav className="ms-3">
                    <ul className="pagination d-flex flex-row flex-nowrap overflow-auto">
                        {pages.map((pageNum) => (
                            <li key={pageNum} className="page-item" onClick={() => newPage(pageNum)}>
                                <a className="page-link" href="#">
                                    {pageNum}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </>
    );
}
