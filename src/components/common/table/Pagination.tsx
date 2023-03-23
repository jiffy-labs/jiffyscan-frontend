import { parse } from 'path';
import React, { useEffect, useState } from 'react';
import { tableDataT } from './Table';

interface PaginationProps {
    table: tableDataT;
    pageDetails: {
        pageNo: number;
        setPageNo: React.Dispatch<React.SetStateAction<number>>;
        pageSize: number;
        setPageSize: (size: number) => void;
        totalRows: number;
    };
}

function Pagination(props: PaginationProps) {
    const [show, setShow] = useState<string>('10');
    const [page, setPage] = useState(0);

    const totalRows = props.pageDetails.totalRows;

    const isMaxPage = (page + 1) * parseInt(show) >= totalRows;
    const isMinPage = page <= 0;

    const fromPage = page * parseInt(show) + 1;
    const toPage = isMaxPage ? totalRows : (page + 1) * parseInt(show);

    const handleShow = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setShow(value);
        props.pageDetails.setPageNo(0);
        props.pageDetails.setPageSize(parseInt(value));
    };

    const hanlePrevBackward = () => {
        setPage(0);
        props.pageDetails.setPageNo(0);
    };

    const hanlePrev = () => {
        const newPageNo = isMinPage ? 1 : page - 1;
        setPage(newPageNo);
        props.pageDetails.setPageNo(newPageNo);
    };

    const hanleNext = () => {
        const newPageNo = isMaxPage ? totalRows / parseInt(show) : page + 1;
        setPage(newPageNo);
        props.pageDetails.setPageNo(newPageNo);
    };

    const hanleNextForward = () => {
        const newPageNo = Math.max(1, Math.ceil(totalRows / parseInt(show))) - 1;
        setPage(newPageNo);
        props.pageDetails.setPageNo(newPageNo);
    };

    return (
        <div className="flex flex-wrap justify-end items-center gap-2 md:gap-4 text-sm mt-2">
            <div className="flex items-center">
                <p>Rows per page:</p>
                <select onChange={handleShow} value={show} name="" id="" className="pl-3 pr-1">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="70">70</option>
                </select>
            </div>
            <p>
                {fromPage}–{toPage} of {totalRows}
            </p>
            <div className="flex items-center gap-1">
                <button onClick={hanlePrevBackward} disabled={isMinPage} className={`${isMinPage ? 'opacity-40' : ''}`} type="button">
                    <img src="/images/icon-container (27).svg" alt="" />
                </button>
                <button onClick={hanlePrev} disabled={isMinPage} className={`${isMinPage ? 'opacity-40' : ''}`} type="button">
                    <img src="/images/icon-container (26).svg" alt="" />
                </button>
                <button onClick={hanleNext} disabled={isMaxPage} className={`${isMaxPage ? 'opacity-40' : ''}`} type="button">
                    <img src="/images/icon-container (20).svg" alt="" />
                </button>
                <button onClick={hanleNextForward} disabled={isMaxPage} className={`${isMaxPage ? 'opacity-40' : ''}`} type="button">
                    <img src="/images/icon-container (21).svg" alt="" />
                </button>
            </div>
        </div>
    );
}

export default Pagination;
