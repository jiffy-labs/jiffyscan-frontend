import React from 'react';
import { NETWORK_ICON_MAP, NETWORK_LIST, NETWORK_SCANNER_MAP } from '@/components/common/constants';
import Skeleton from 'react-loading-skeleton-2';
import Caption from '@/components/common/Caption';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/common/apiCalls/jiffyApis';
import Link from 'next/link';
type LogEntry = {
    logIndex: number | null;
    transactionHash: string;
    transactionLogIndex: number | null;
    topics: string[];
    removed: boolean | null;
    data: string;
    address: string;
    event_name: string;
    eventName: string;
    topicsDecoded: { [key: string]: string };
    dataDecoded: { [key: string]: string | number };
};
interface ItemProps {
    userOpHash: string;
    network: string;
}

interface UserOpLogsProps {
    item: ItemProps;
}



const UserOpLogs: React.FC<UserOpLogsProps> = ({ item ,network}: any) => {

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const functionCall = async () => {
            const data = await fetchData(item);
            setLogs(data.logs || []);
            setLoading(false)

        }

        if (item) {
            functionCall()
        }


    }, [item]);

    // console.log(item)

    // console.log(logs)


    if (loading) {

        return (
            <div className="container px-0 mt-[48px] ">
                <div>
                    <Caption icon={'/images/cube.svg'} text={''}>
                        UserOp Logs
                    </Caption>
                </div>
                <Skeleton height={55} />
            </div>);
    }

    if (!loading && logs.length === 0) {
        return <div className="text-gray-500 text-center my-4">No logs available.</div>;
    }


    return (
        <section className="mt-[15px] px-3 mb-10 break-all">
            <div className="container px-0">
                <div>
                    <Caption icon={'/images/cube.svg'} text={''}>
                        UserOp Logs
                    </Caption>
                </div>
                <div className="my-4  flex flex-col gap-[2rem]">

                    {logs.map((log, index) => (
                        <div key={index} className="bg-white shadow rounded-lg p-4">
                            <div className="flex flex-col gap-4">

                                <div className="flex flex-row md:gap-[2.2rem] max-md:flex-col">
                                    <strong className='md:w-[8%] '>Address:</strong>


                                    <Link href={`${NETWORK_SCANNER_MAP[item.network]}/address/${log.address}`} target='_blank'>
                                        <div className="text-indigo-600 hover:text-indigo-800 w-full px-1 py-1">{log.address}</div>
                                    </Link>

                                </div>

                                <div className="flex flex-row gap-[2rem] max-md:flex-col">
                                    <strong className='md:w-[8%]  '>Event Name:</strong>
                                    <span className="rounded px-2 py-1 md:w-[80%] text-gray-500">
                                        {log.event_name || 'Unknown Event'}
                                    </span>
                                </div>

                                <div className="flex flex-row gap-[2rem] max-md:flex-col">
                                    <strong className='md:w-[8%] '>Topics:</strong>
                                    <div className="flex flex-col gap-2md: w-[80%]">
                                        {log.topicsDecoded ? (
                                            Object.entries(log.topicsDecoded).map(([key, value]) => (
                                                <div key={key} className=" rounded px-1 py-1 flex flex-row gap-[5px]">
                                                    <div className='bg-gray-100 px-[7px] py-[1px] rounded-[3px] text-[12px]'>{key}</div>  {value}
                                                </div>
                                            ))
                                        ) : (
                                            log.topics.map((topic, index) => (
                                                <div key={index} className=" rounded px-2 py-1">
                                                    {index}: {topic}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-row gap-[2rem] max-md:flex-col">
                                    <strong className='md:w-[8%]'>Data:</strong>
                                    <div className="bg-gray-100 rounded px-2 py-1 md:w-[80%]">
                                        {log.dataDecoded && Object.keys(log.dataDecoded).length ? (
                                            <div className="flex flex-col gap-2">
                                                {Object.entries(log.dataDecoded).map(([key, value]) => (
                                                    <div key={key} className="flex gap-[0.1rem]">
                                                        <span>{key}:</span>
                                                        <span>{`${value}`}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span>{log.data !== '0x' ? log.data : 'None'}</span>
                                        )}
                                    </div>
                                </div>


                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section >
    );
};

export default UserOpLogs;
