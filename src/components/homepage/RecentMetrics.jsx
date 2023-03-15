import { useState } from 'react'; 
import NetworkFilter from './NetworkFilter';

export default function RecentMetrics({network, handleNetworkChange}) {
    
    return (
        <div className="overflow-auto w-full">
            <div className="flex flex-row relative">
                <h1 className="text-xl font-semibold pb-4 w-1/3">
                    Recent Metrics
                </h1>
                <NetworkFilter network={network} handleNetworkChange={handleNetworkChange} />
            </div>

            <div className="flex flex-row space-x-2 overflow-auto">
                <div className="w-[167.5px] lg:w-1/4 h-[156px] border-2 rounded shadow-lg">
                    Daily User Ops
                </div>
                <div className="w-[167.5px] lg:w-1/4 h-[156px] border-2 rounded shadow-lg">
                    Daily User Ops
                </div>
                <div className="w-[167.5px] lg:w-1/4 h-[156px] border-2 rounded shadow-lg">
                    Daily User Ops
                </div>
                <div className="w-[167.5px] lg:w-1/4 h-[156px] border-2 rounded shadow-lg">
                    Daily User Ops
                </div>
            </div>
        </div>
    );
}
