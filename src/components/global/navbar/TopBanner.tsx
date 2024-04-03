import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function TopBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full z-50 bg-gradient-to-r from-indigo-800 via-purple-800 to-purple-900 relative">
    <div className="flex justify-center items-center text-white py-2 px-4">
      <Image src="/rocket.svg" alt="rocket" width={24} height={24} />
      <p className="mx-2">
        Stay Updated and Share Your Ideas! Join our Telegram channel for updates and feature requests.
      </p>
      <Link href="https://t.me/+ZJejkXFlMAA4NzZl" target="_blank" rel="noopener noreferrer" className="underline">
        Open Telegram
      </Link>
      <Image src="/link.svg" alt="link" width={24} height={24} />
    </div>
    <button onClick={() => setVisible(false)} className="absolute right-4 top-1/2 transform -translate-y-1/2">
      <Image src="/cross.svg" alt="close" width={24} height={24} />
    </button>
  </div>
  


  );
}

export default TopBanner;
