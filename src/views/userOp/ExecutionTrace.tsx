import LinkAndCopy from '@/components/common/LinkAndCopy';
import { shortenString } from '@/components/common/utils';
import React from 'react';
import { ExecutionTraceType } from './TransactionDetails';


const ExecutionTrace = ({ traceCallToDisplay }: any) => {
    return (
        <div className="md:flex block justify-between">
            <div className="flex flex-col gap-[10px] w-full">
                {traceCallToDisplay.map(({ traceData, next }: ExecutionTraceType, index: number) => {
                    return (
                        <div key={index} className="flex items-center">
                            Target: <LinkAndCopy link={null} text={shortenString(traceData.to)} copyText={traceData.to} /> Invoked:{' '}
                            {traceData.method ? (
                                <LinkAndCopy link={null} text={traceData.method} copyText={traceData.method} />
                            ) : (
                                traceData.input.slice(0, 10) + '...' + traceData.method
                            )}{" "}
                            Value: {parseInt(traceData.value, 16)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExecutionTrace;
