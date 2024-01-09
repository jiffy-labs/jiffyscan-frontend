import React from 'react';

export default function Status({ type, status, ago }: { type?: boolean; status?: string; ago?: string }) {
    return (
        <div>
            {type === true && (
                <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#4CAF50]">
                    <img src="/images/Success.svg" alt="" />
                    <span className="font-normal text-[12px] leading-5 text-dark-600">Success</span>
                </span>
            )}
            {type === false && (
                <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#d81a14]">
                    <img src="/images/failed.svg" alt="" />
                    <span className="font-normal text-[12px] leading-5 text-dark-600">Failed</span>
                </span>
            )}
            {status === 'outstanding' && (
                <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#d81a14]">
                    <img src="/images/pending.svg" alt="" />
                    <span className="font-normal text-[12px] leading-5 text-dark-600">To be Submitted</span>
                </span>
            )}
            {status === 'processing' && (
                <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#d81a14]">
                    <img src="/images/pending.svg" alt="" />
                    <span className="font-normal text-[12px] leading-5 text-dark-600">To be Submitted</span>
                </span>
            )}
            {status === 'submitted' && (
                <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#d81a14]">
                    <img src="/images/pending.svg" alt="" />
                    <span className="font-normal text-[12px] leading-5 text-dark-600">To be Mined</span>
                </span>
            )}
            {status === 'success' && (
                <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#4CAF50]">
                    <img src="/images/Success.svg" alt="" />{' '}
                    <span className="font-normal text-[12px] leading-5 text-dark-600">Success</span>
                </span>
            )}
            {status === 'failure' && (
                <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#d81a14]">
                    <img src="/images/failed.svg" alt="" /> <span className="font-normal text-[12px] leading-5 text-dark-600">Failed</span>
                </span>
            )}
        </div>
    );
}
