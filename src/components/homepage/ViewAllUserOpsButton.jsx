import React from 'react';
import { IconChevronRight } from '@tabler/icons-react';

export default function ViewAllUserOpsButton() {
    return (
        <button className="w-[280px] lg:w-1/2 text-black font-semibold px-4 rounded h-12 uppercase border-2 border-[#B0BEC5]">
            <div className="flex ">
                View All User Operations
                <IconChevronRight size={20} className="my-auto" />
            </div>
        </button>
    );
}
