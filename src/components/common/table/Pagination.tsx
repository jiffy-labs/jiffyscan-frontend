import React, { useEffect, useState } from 'react';
import { PAGE_SIZE_LIST } from '@/components/common/constants';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoMdArrowDropdown } from 'react-icons/io';

interface PaginationProps {
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
    const [isMaxPage, setIsMaxPage] = useState(false);
    const [isMinPage, setIsMinPage] = useState(false);
    const [fromPage, setFromPage] = useState(0);
    const [toPage, setToPage] = useState(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownToggle = () => setIsOpen(!isOpen);
    const handleSelect = (size: number) => {
        setPageSize(size);
        setIsOpen(false);
    };
    useEffect(() => {
        if (fixedPageSize) {
            setPageSize(fixedPageSize);
            setIsMaxPage(true);
            setIsMinPage(true);
            setFromPage(1);
            setToPage(totalRows);
        } else {
            let isMaxPage = (pageNo + 1) * pageSize >= totalRows;
            setIsMaxPage(isMaxPage);
            setIsMinPage(pageNo <= 0);
            setFromPage(pageNo * pageSize + 1);
            setToPage(isMaxPage ? totalRows : (pageNo + 1) * pageSize);
            setTotalPages(Math.ceil(totalRows / pageSize));
        }
    }, [pageNo, totalRows, pageSize, fixedPageSize]);

    const handleShow = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setPageSize(parseInt(value));
    };

    const handlePrevBackward = () => setPageNo(0);
    const handlePrev = () => setPageNo(pageNo > 0 ? pageNo - 1 : 0);
    const handleNext = () => setPageNo(pageNo + 1 < totalPages ? pageNo + 1 : pageNo);
    const handleNextForward = () => setPageNo(totalPages - 1);

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(0, pageNo - 2);
        const endPage = Math.min(totalPages - 1, pageNo + 2);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (startPage > 1) {
            pageNumbers.unshift('...');
        }
        if (startPage > 0) {
            pageNumbers.unshift(0);
        }
        if (endPage < totalPages - 2) {
            pageNumbers.push('...');
        }
        if (endPage < totalPages - 1) {
            pageNumbers.push(totalPages - 1);
        }

        return pageNumbers;
    };

    return (
        <div className="flex flex-wrap items-center font-gsans justify-between mt-4 mb-6 text-sm md:gap-4">
            {/* Previous button on the left */}
            <button
                onClick={handlePrev}
                disabled={isMinPage}
                className={`${isMinPage ? 'opacity-40' : ''} gap-2 flex items-center bg-[#F0F1F5] dark:bg-[#191A23] text-[#969CB2] hover:text-white border border-[#D7DAE0] dark:border-[#3B3C40] hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg font-gsans text-md px-5 py-2.5`}
                type="button"
            >
                <GoArrowLeft className='w-4 h-4'/>
                Previous
            </button>

            {/* Page numbers in the middle */}
            <div className="flex items-center gap-1 dark:text-[#666B80]">
                {generatePageNumbers().map((page, index) =>
                    typeof page === 'string' ? (
                        <span key={index} className="px-4 gap-4 text-md ">
                            {page}
                        </span>
                    ) : (
                        <button
                            key={index}
                            className={`py-2.5 px-4 ${pageNo === page ? 'font-bold text-md text-[#195BDF] dark:text-[#598AEB] rounded-full bg-[#EBEDFF] dark:bg-[#333540]' : ''}`}
                            onClick={() => setPageNo(page)}
                        >
                            {page + 1}
                        </button>
                    )
                )}
            </div>

            {/* Next button on the right */}
            <div className="flex items-center gap-2">
                <p className='text-nowrap font-gsans text-[#969CB2] text-sm'>Rows per page:</p>
                <div className="relative inline-block ml-2">
            {fixedPageSize ? (
                fixedPageSize
            ) : (
                <div
                    onClick={handleDropdownToggle}
                    className="flex items-center justify-center text-[#969CB2] dark:bg-[#191A23] bg-[#F0F1F5] border border-[#D7DAE0] dark:border-[#3B3C40] p-2 rounded-md cursor-pointer select-none"
                >
                    <span className="px-4 text-[#969CB2]">{pageSize}</span>
                    <IoMdArrowDropdown className="text-[#646D8F]" />
                </div>
            )}

            {isOpen && (
                <div className="absolute z-10 mt-2 bg-[#F0F1F5] text-[#969CB2] dark:bg-[#191A23] border border-[#D7DAE0] dark:border-[#3B3C40] rounded-md shadow-lg">
                    {PAGE_SIZE_LIST.map((size) => (
                        <div
                            key={size}
                            onClick={() => handleSelect(size)}
                            className="px-4 py-2 cursor-pointer text-center hover:bg-[#D7DAE0] dark:hover:bg-[#3B3C40] transition"
                        >
                            {size}
                        </div>
                    ))}
                </div>
            )}
        </div>
            <button
                onClick={handleNext}
                disabled={isMaxPage}
                className={`${isMaxPage ? 'opacity-40' : ''} gap-2 flex items-center bg-[#F0F1F5] text-[#969CB2] dark:bg-[#191A23] hover:text-white border border-[#D7DAE0] dark:border-[#3B3C40] hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg font-gsans text-md px-5 py-2.5`}
                type="button"
            >
                Next
                <GoArrowRight className='w-4 h-4'/>
            </button>
            </div>
        </div>
    );
}

export default Pagination;
