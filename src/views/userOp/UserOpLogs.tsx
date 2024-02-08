import React from 'react';
import Skeleton from 'react-loading-skeleton-2';
import Caption from '@/components/common/Caption';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/common/apiCalls/jiffyApis';
import Link from 'next/link';
interface LogEntry {
    address: string;
    data: string;
    event_name?: string;
    topicsDecoded?: Record<string, string>;
    topics: string[];
  }
  
  interface ItemProps {
    userOpHash: string;
    network: string;
  }
  
  interface UserOpLogsProps {
    item: ItemProps;
  }



const UserOpLogs: React.FC<UserOpLogsProps> = ({ item }: any) => {

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
     
        const functionCall = async() => {
            const data = await fetchData(item);
            setLogs(data.logs || []);
            setLoading(false)

        }

        if (item)
        {
            functionCall()
        }
          

    }, [item]);

    // console.log(item)

    // console.log(logs)


    if (loading) {

        return (
            <div className="container px-0 mt-[48px]">
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
        <section className="mt-[48px] px-3 mb-10 break-all">
            <div className="container px-0">
                <div>
                    <Caption icon={'/images/cube.svg'} text={''}>
                        UserOp Logs
                    </Caption>
                </div>
                <div className="my-4  flex flex-col gap-[2rem]">

                    {logs.map((log, index) => (
                        <div key={index} className="bg-white shadow rounded-lg p-4">
                            <div className="flex flex-col md:flex-row md:items-center  md:justify-between mb-2">

                                <div className="mb-2">
                                    <strong>Address:</strong>
                                    <div className="bg-gray-100 rounded px-2 py-1 inline-block ml-2">
                                        {log.address}
                                    </div>
                                </div>
                                <Link href={`https://etherscan.io/address/${log.address}`}>
                                    <div className="text-indigo-600 hover:text-indigo-800">
                                        View Contract
                                    </div>
                                </Link>
                            </div>
                            <h3 className="text-lg font-bold mb-2 md:mb-0">
                                Event Name:
                                <span className="bg-gray-100 rounded px-2 py-1 ml-2">
                                    {log.event_name || 'Unknown Event'}
                                </span>
                            </h3>
                            <div className="mb-2">
                                <strong>Topics:</strong>
                                <div className="flex flex-col gap-2 mt-2">
                                    {log.topicsDecoded ? (
                                        Object.entries(log.topicsDecoded).map(([key, value]) => (
                                            <div key={key} className="bg-gray-100 rounded px-2 py-1">
                                                {key}: {value}
                                            </div>
                                        ))
                                    ) : (
                                        log.topics.map((topic, index) => (
                                            <div key={index} className="bg-gray-100 rounded px-2 py-1">
                                                {index}: {topic}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="mb-2">
                                <strong>Data:</strong>
                                <div className="bg-gray-100 rounded px-2 py-1 mt-2">
                                    {log.data !== '0x' ? log.data : 'None'}
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
