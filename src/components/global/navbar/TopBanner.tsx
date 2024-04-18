import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function TopBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full z-50 bg-gradient-to-b from-[#0C1179]  to-[#080B4C] relative md:py-[7px] ">
    <div className="flex flex-row justify-center items-center text-white py-2 px-4  max-md:px-[1.6rem] max-md:text-[9px]  max-md:leading-3">
      <Image src="/rocket.svg" alt="rocket" width={24} height={24} className='hidden md:block' />
      <Image src="/rocket.svg" alt="rocket" width={20} height={20} className='md:hidden' />
      <p className="md:mx-2 max-md:pl-[0.5rem]">
        Stay Updated and Share Your Ideas! Join our Telegram channel for updates and feature requests. 
      </p>
      <div className='flex flex-row justify-around items-center max-md:pr-[0.4rem]'>
      <Link href="https://t.me/+ZJejkXFlMAA4NzZl" target="_blank" rel="noopener noreferrer" className="underline">
        Open Telegram  {`(early access)`}
      </Link>
    
      <Link href="https://t.me/+ZJejkXFlMAA4NzZl" target="_blank" rel="noopener noreferrer" className="underline">
      <Image src="/linknew.svg" alt="link" width={24} height={24} />
      </Link>
      </div>
    </div>
    <button onClick={() => setVisible(false)} className="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2">
      <Image src="/cross.svg" alt="close" width={24} height={24} />
    </button>
  </div>
  


  );
}

export default TopBanner;
