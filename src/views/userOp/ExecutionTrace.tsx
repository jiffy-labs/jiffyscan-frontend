import LinkAndCopy from '@/components/common/LinkAndCopy';
import { shortenString } from '@/components/common/utils';
import React from 'react';

interface ExecutionTraceType {
    traceData: {
        from: string;
        to: string;
        value: string;
        input: string;
        output: string;
        gasUsed: string;
        gas: string;
        type: string;
        method?: string;
        decodedInput?: Array<{
            value: string;
            type: string;
            name: string;
        }>;
    };
    next: Array<ExecutionTraceType>;
}

const ExecutionTrace = ({ executionTrace }: any) => {
    const setTraceToDisplace = () => {
        if (executionTrace.next.length > 0 && executionTrace.next[0].traceData.method?.toLowerCase() == 'multisend') {
            return executionTrace.next[0].next;
        } else {
            return executionTrace.next;
        }
    };

    const [traceCallToDisplay, setTraceCallToDisplay] = React.useState<Array<ExecutionTraceType>>(setTraceToDisplace());

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
                                traceData.input.slice(0, 10)
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
