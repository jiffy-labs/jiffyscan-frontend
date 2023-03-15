export default function RecentMetrics() {
    return (
        <div className="overflow-auto w-full">
            <div className="flex flex-row relative">
                <h1 className="text-xl font-semibold pb-4 w-1/3">
                    Recent Metrics
                </h1>
                <div className="absolute flex flex-row right-0 space-x-4 hidden lg:block">
                    <button className="rounded-xl border-2 px-4">Goerli</button>
                    <button className=" rounded-xl border-2 px-4">
                        <span>Mumbai</span>
                    </button>
                    <button className=" rounded-xl border-2 px-4">
                        <span>Optimism Goerli</span>
                    </button>
                    <button className=" rounded-xl border-2 px-4">
                        <span>More</span>
                    </button>
                </div>
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
