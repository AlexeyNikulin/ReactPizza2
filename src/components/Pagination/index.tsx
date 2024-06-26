import React, { FC } from 'react';

import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage - 1}
            />
        </>
    );
};

export default Pagination;
