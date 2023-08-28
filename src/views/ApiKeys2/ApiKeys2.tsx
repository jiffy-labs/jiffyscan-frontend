import ApiKeybutton from '@/components/common/buttons/ApiKeybutton';
import Table, { tableDataT } from '@/components/common/table/Table';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useState } from 'react';
import key_table from '../home/key_table.json';

const ApiKeys2Component = () => {
    const [bundlesTable, setBundlesTable] = useState<tableDataT>(key_table as tableDataT);
    return (
        <>
            <Navbar searchbar />
            <div className="py-3 px-[16px] container  items-center">
                <h1 className=" font-[700] text-[34px]">API Keys</h1>
                <ApiKeybutton />
            </div>
            <div className=" px-[16px] container  items-center">
                <Table {...(bundlesTable as tableDataT)} />
            </div>
        </>
    );
};

export default ApiKeys2Component;
