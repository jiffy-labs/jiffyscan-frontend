import React, { useEffect, useState } from 'react';
import ViewAllBundlesButton from '@/components/homepage/ViewAllBundlesButton';
import UserOpTable from '../shared/UserOpTable';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DataTable from '../shared/DataTable';
import { getIcon } from '@/utils';

const cols = [
    {
        name: 'Hash',
        id: 'hash',
        width: 'w-3/5',
    },
    {
        name: 'Age',
        id: 'age',
        width: 'w-1/5',
    },
    {
        name: '#UserOp',
        id: 'userOp',
        width: 'w-1/5',
    },
];

const CopyButtonDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
}));

const getRowsFromBundleResponse = (bundles) => {
    let rows = [];
    if (bundles === undefined) return rows;
    let sortedBundles = bundles.sort((p1, p2) =>
        p1.timestamp < p2.timestamp ? 1 : p1.timestamp > p2.timestamp ? -1 : 0
    ); // TODO: move operation to backend
    sortedBundles = sortedBundles.slice(0, 5);

    for (let idx in sortedBundles) {
        let bundle = sortedBundles[idx];
        console.log('BUNDD', bundle);
        let timePassedInEpoch = new Date().getTime() - bundle.timestamp * 1000;
        let timePassed = moment.duration(timePassedInEpoch);
        rows.push({
            hash: (
                <CopyButtonDiv>
                    <a href={'https://www.google.com'}>
                        {bundle.transactionHash.slice(0, 3) + '...' + bundle.transactionHash.slice(-3)}
                    </a>
                    <IconButton
                        onClick={() => handleCopy(bundle.transactionHash)}
                    >
                        <ContentCopyIcon size="small" />
                    </IconButton>
                </CopyButtonDiv>
            ),
            age: timePassed.humanize() + ' ago',
            userOp: bundle.userOpsLength + ' ops',
            icon: getIcon(bundle.network),
        });
    }
    return rows;
};

export default function LatestBundles({network}) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchUserOps = async () => {
            const response = await fetch(
                'https://api.jiffyscan.xyz/v0/getLatestBundles?network=' + network + '&first='+ 5
            );
            const BundlesFromResponse = await response.json();
            if ('bundles' in BundlesFromResponse) {
                const rows = getRowsFromBundleResponse(
                    BundlesFromResponse.bundles
                );
                setRows(rows);
            }
        };
        fetchUserOps();
    }, [network]);

    return (
        <div className="flex flex-col py-6 lg:px-4 lg:w-1/2">
            <h1 className="text-xl font-semibold pb-4">Latest Bundles</h1>
            <div className="overflow-scroll border-1 shadow-lg rounded">
                <UserOpTable columns={cols} rows={rows} />
                {/* <DataTable /> */}
            </div>
            <div className="py-4">
                <ViewAllBundlesButton />
            </div>
        </div>
    );
}
