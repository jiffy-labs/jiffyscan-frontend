import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import Table, { tableDataT } from '@/components/common/table/Table';
import table_data from './table_data.json';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function APIKeys() {
    const [apiKeysTable] = useState<tableDataT>( table_data as tableDataT);
    const [tableLoading] = useState(false);
    const [captionText, setCaptionText] = useState('');

    useEffect(() => {
        setCaptionText(`${apiKeysTable.rows.length}  API Keys found`);
    }, []);



    return (
        <div className="">
            <Navbar searchbar />
            <section className="py-10">
                <div className="container">
                    <h1 className="text-3xl font-bold">API Keys</h1>
                </div>
            </section>
            <div className="container">
                <div className="flex flex-wrap items-center gap-3 py-2 mb-4 md:gap-10">
                    <button
                        className="text-sm border border-dark-200 text-md gap-2 inline-flex tracking-[1.25px] pt-[9px] pb-[9px] px-4 uppercase  rounded bg-black text-white"
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <img className="-translate-y-[1px]" src="/images/plus.svg" alt="" />
                        <span>CREATE NEW KEY</span>
                    </button>
                    <button
                        className="text-sm border border-dark-200 text-md gap-2 inline-flex tracking-[1.25px] pt-[9px] pb-[9px] px-4 uppercase  rounded bg-white"
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <img className="-translate-y-[1px]" src="/images/api.svg" alt="" />
                        <span>Check Api Plan</span>
                    </button>
                </div>
            </div>
            <section className="mb-10">
                <div className="container">
                    <div>
                        <Table
                            {...apiKeysTable}
                            loading={tableLoading}
                            hideHeader={true}
                            caption={{
                                children: captionText,
                                icon: '/images/cube.svg',
                                text: 'Approx Number of API Keys Created',
                            }}
                        />
                    </div>
                </div>
            </section>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default APIKeys;
