import { set, size } from 'lodash';
import React, { useEffect, useState } from 'react';
import { PAGE_SIZE_LIST } from '@/components/common/constants';

interface PaginationProps {
    // table: tableDataT;
    pageDetails: {
        pageNo: number;
        setPageNo: React.Dispatch<React.SetStateAction<number>>;
        pageSize: number;
        setPageSize: (size: number) => void;
        totalRows: number;
        fixedPageSize?: number;
    };
}

function Pagination({ pageDetails: { pageNo, setPageNo, pageSize, setPageSize, totalRows, fixedPageSize } }: PaginationProps) {
    // console.log("🚀 ~ file: Pagination.tsx:15 ~ Pagination ~ pageNo:", pageNo,pageSize,totalRows)
    const [isMaxPage, setIsMaxPage] = useState(false);
    const [isMinPage, setIsMinPage] = useState(false);
    const [fromPage, setFromPage] = useState(0);
    const [toPage, setToPage] = useState(0);

    useEffect(() => {
        if (fixedPageSize) {
            setPageSize(fixedPageSize);
            setIsMaxPage(true);
            setIsMinPage(true);
            setFromPage(1);
            setToPage(totalRows);
        } else {
            let isMaxPage = (pageNo + 1) * pageSize >= totalRows; //
            setIsMaxPage(isMaxPage);
            setIsMinPage(pageNo <= 0);
            setFromPage(pageNo * pageSize + 1);
            setToPage(isMaxPage ? totalRows : (pageNo + 1) * pageSize);
        }
    }, [pageNo, totalRows, totalRows]);
    // console.log("Pgaesss-------->",isMaxPage,isMinPage,fromPage,toPage)

    const handleShow = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setPageSize(parseInt(value));
    };

    const hanlePrevBackward = () => {
        setPageNo(0);
    };

    const hanlePrev = () => {
        const newPageNo = isMinPage ? 1 : pageNo - 1;
        setPageNo(newPageNo);
    };

    const hanleNext = () => {
        const newPageNo = isMaxPage ? totalRows / pageSize : pageNo + 1;
        setPageNo(newPageNo);
    };

    const hanleNextForward = () => {
        const newPageNo = Math.max(1, Math.ceil(totalRows / pageSize)) - 1;
        setPageNo(newPageNo);
    };

    return (
        <div className="flex flex-wrap items-center justify-end gap-2 mt-4 mb-6 text-sm md:gap-4">
            <div className="flex items-center">
                <p>Rows per page:</p>
                {fixedPageSize ? (
                    fixedPageSize
                ) : (
                    <select onChange={handleShow} value={pageSize} name="" id="" className="pl-3 pr-1">
                        {/* <option value="5">5</option> */}
                        {PAGE_SIZE_LIST.map((size: number) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                )}
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
