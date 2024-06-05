import React from 'react';
import { NETWORK_ICON_MAP, NETWORK_LIST, NETWORK_SCANNER_MAP } from '@/components/common/constants';
import Skeleton from 'react-loading-skeleton-2';
import Caption from '@/components/common/Caption';
import { useEffect, useState } from 'react';
import CopyButton from '@/components/common/copy_button/CopyButton';
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
    logs: LogEntry[];
    network:string;
}

// @ts-ignore 
const formatEventString = (eventString) => {
    // Extract the event name and the arguments string
    const eventNameEndIndex = eventString.indexOf('(');
    const eventName = eventString.substring(0, eventNameEndIndex).trim();
    const argsString = eventString.substring(eventNameEndIndex + 1, eventString.length - 1);
  
    // Split the arguments string into individual arguments
    // @ts-ignore 
    const argsArray = argsString.split(',').map(arg => arg.trim());
  
    return { eventName, argsArray };
  };
//   @ts-ignore 
  const EventFormatter = ({ eventString }) => {
    const { eventName, argsArray } = formatEventString(eventString);
  
    return (
      <div className='text-black'>
        <strong className='font-500'>{eventName}</strong>
        {' ('} 
        {/* @ts-ignore  */}
        {argsArray.map((arg, index) => {
          const [type, field] = arg.split(' ').filter(Boolean);
          return (
            <span key={index}>
              <span style={{ color: '#4CAF50' }}>{type}</span> {field}
              {index < argsArray.length - 1 ? ', ' : ''}
            </span>
          );
        })}
        {')'}
      </div>
    );
  };
  
const UserOpLogs: React.FC<UserOpLogsProps> = ({ logs,network }: any) => {

    // const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true)

    // useEffect(() => {

    //     const functionCall = async () => {
    //         const data = await fetchData(item);
    //         // setLogs(data.logs || []);
    //         setLoading(false)

    //     }

    //     if (item && loading && isLoading) {
    //         console.log("making fetch call again", loading,item,logs)
    //         console.log(isLoading)
    //         functionCall()
    //     }


    // }, [item]);
    useEffect(() => {

       if(logs)
          setLoading(false)


    }, [logs]);

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
{/* @ts-ignore  */}
                    {logs.map((log, index) => (
                        <div key={index} className="bg-white shadow rounded-lg p-4">
                            <div className="flex flex-col gap-4">

                                <div className="flex flex-row md:gap-[16px] max-md:flex-col">
                                <div className='flex flex-row justify-between w-[139px]'>
                                <p className=' text-[#9E9E9E] uppercase  '>Address</p>
                               <p className=' text-[#9E9E9E] uppercase '>:</p>
                               </div>


                                    <Link href={`${NETWORK_SCANNER_MAP[network]}/address/${log.address}`} target='_blank'>
                                        <div className="text-[#195BDF] hover:text-indigo-800 w-full px-1 py-1 text-[16px] font-medium">{log.address}</div>
                                    </Link>

                                </div>

                                <div className="flex flex-row gap-[16px] max-md:flex-col">
                                <div className='flex flex-row justify-between w-[139px]'>
                                <p className=' text-[#9E9E9E] uppercase  '>Event Name</p>
                               <p className=' text-[#9E9E9E] uppercase '>:</p>
                               </div>
                                    <span className="rounded px-2 py-1 md:w-[80%] text-gray-500">
                                        {/* {log.event_name || 'Unknown Event'} */}
                                        <EventFormatter eventString={log.event_name || 'Unknown Event'} />
                                    </span>
                                </div>

                                <div className="flex flex-row gap-[16px] max-md:flex-col">
                                <div className='flex flex-row justify-between w-[139px]'>
                                <p className=' text-[#9E9E9E] uppercase  '>Topics</p>
                               <p className=' text-[#9E9E9E] uppercase '>:</p>
                               </div>
                               
                                    <div className="flex flex-col gap-2md: w-[80%]">
                                        {log.topicsDecoded ? (
                                            Object.entries(log.topicsDecoded).map(([key, value]) => (
                                                <div key={key} className=" rounded px-1 py-1 flex flex-row gap-[5px] text-[16px] ">
                                                    <div className='bg-gray-100 px-[7px] py-[1px] rounded-[4px] text-[12px] w-[104px] h-[24px] text-[12px] text-center text-[#0000008A]'>{key}</div>  
                                                   {/* @ts-ignore  */}
                                                    <div className='flex flex-row'>{value}
                                                    {/* @ts-ignore  */}
                                                    <CopyButton text={value || ""} /></div>
                                                </div>
                                            ))
                                        ) : (
                                            // @ts-ignore 
                                            log.topics.map((topic, index) => (
                                                <div key={index} className=" rounded px-2 py-1">
                                                    {index}: {topic}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-row gap-[16px] max-md:flex-col">
                               <div className='flex flex-row justify-between w-[139px]'>
                                <p className=' text-[#9E9E9E] uppercase '>Data</p>
                               <p className=' text-[#9E9E9E] uppercase '>:</p>
                               </div>
                               
                                    <div className="bg-gray-100 rounded p-4  md:w-[80%]">
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

export default React.memo(UserOpLogs);
