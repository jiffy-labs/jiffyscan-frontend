import React from 'react';
import { IconChevronRight } from '@tabler/icons-react';

export default function ViewAllBundlesButton() {
    return (
        <button className="w-[200px]  lg:w-2/5 text-black font-semibold pl-4 lg:px-4 rounded h-12 uppercase border-2 border-[#B0BEC5]">
            <div className="flex">
                View All Bundles
                <IconChevronRight size={20} className="my-auto" />
            </div>
        </button>
    );
}
