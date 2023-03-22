import React, { useState } from 'react'
import Chip from "@/components/common/chip/Chip";
import { NETWORK_LIST } from '@/components/common/constants';



function NetworkSelector({ selectedNetwork, handleNetworkChange }: { selectedNetwork: string, handleNetworkChange: (network: string) => void }) {


  const [open, setOpen] = useState<boolean>(false);
  const toggler = () => setOpen((v) => !v);

// const [value, setValue] = useState<number>(0);
// const handleValue = (key: number) => {
//   setValue(key);
//   toggler();
// };
    return (
        <>
        <div className="hidden md:flex  flex-wrap items-center gap-1">
            {NETWORK_LIST.map(({ name, key, iconPath, iconPathInverted }, index) => (
                <Chip
                    key={index}
                    onClick={() => handleNetworkChange(key)}
                    startIcon={selectedNetwork === key ? iconPath : iconPathInverted}
                    color={`${selectedNetwork === key ? "dark-700" : "white"}`}
                >
                    {name}
                </Chip>
            ))}
        </div>
        {/* <div className='px-3 py-px  border rounded-full md:hidden border-dark-200 bg-dark-700 flex'> */}
             {/* <img src="" alt="" />
        <span className='flex-1 text-white text-[12px] leading-5'>{selectedNetwork}</span> */}
        {/* <img src={NETWORK_LIST[value].img} alt="" />
        <span>{NETWORK_LIST[value].name}</span> */}
        {/* </div> */}
        {/* <div className='relative md:hidden flex'>

        <div
        className=" px-3 py-px  border rounded-full border-dark-200 bg-white flex items-center gap-1 text-md"
        role="button"
        onClick={toggler}
      >
  
        <span className='text-[12px] flex-1'>More</span>
        <img
          className={`duration-100 w-5 ${open ? "rotate-180" : ""}`}
          src="/images/chevron-down.svg"
          alt=""
        />
      </div>
      {open && (
        <div className="">
          <div
            onClick={toggler}
            className="fixed inset-0 -z-20 bg-transparent"
          />
          <div className="absolute top-6 right-0 min-w-[145px] py-1 bg-white shadow-100">
            <div className="flex flex-col">
            {NETWORK_LIST.map(({ name, key, iconPath, iconPathInverted }, index) => (
                <Chip
                    key={index}
                    onClick={() => handleNetworkChange(key)}
                    startIcon={selectedNetwork === key ? iconPath : iconPathInverted}
                    color={`${selectedNetwork === key ? "dark-700" : "white"}`}
                >
                    {name}
                </Chip>
            ))}
            </div>
          </div>
        </div>
      )}
        </div> */}
        </>
    )
}

export default NetworkSelector
