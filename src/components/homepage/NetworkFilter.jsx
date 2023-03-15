import React from "react";
import { SUPPORTED_NETWORKS } from "@/utils/constants";

function NetworkFilter({ network, handleNetworkChange }) {
    return (
        <div className="flex justify-end w-2/3 space-x-4 hidden lg:block">
            {SUPPORTED_NETWORKS.map((supNetwork) => {
                return (
                    <button
                        className={
                            network == supNetwork.id ? "rounded-xl border-2 px-4 bg-black text-gray-100" : "rounded-xl border-2 px-4"
                        }
                        onClick={() => handleNetworkChange(supNetwork.id)}
                    >
                        {supNetwork.name}
                    </button>
                );
            })}
        </div>
    );
}

export default NetworkFilter;
