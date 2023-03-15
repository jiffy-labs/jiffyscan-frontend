import React, { useState, useEffect } from 'react';
import ViewAllUserOpsButton from '@/components/homepage/ViewAllUserOpsButton';
import UserOpTable from '../shared/UserOpTable';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getIcon } from '@/utils';

const CopyButtonDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
}));

const cols = [
    {
        name: 'Hash',
        id: 'hash',
        width: 'w-1/4',
    },
    {
        name: 'Age',
        id: 'age',
        width: 'w-1/4',
    },
    {
        name: 'Sender',
        id: 'sender',
        width: 'w-1/4',
    },
    {
        name: 'Target',
        id: 'target',
        width: 'w-1/4',
    },
];

const getRowsFromUserOpResponse = (userOps) => {
    let rows = [];
    if (userOps === undefined) return rows;
    let sortedUserOps = userOps.sort((p1, p2) =>
        p1.blockTime < p2.blockTime ? 1 : p1.blockTime > p2.blockTime ? -1 : 0
    );
    sortedUserOps = sortedUserOps.slice(0, 5);

    for (let idx in sortedUserOps) {
        let userOp = sortedUserOps[idx];
        let timePassedInEpoch = new Date().getTime() - userOp.blockTime * 1000;
        let timePassed = moment.duration(timePassedInEpoch);
        rows.push({
            hash: (
                <CopyButtonDiv>
                    <a href={'https://www.google.com'}>
                        {userOp.userOpHash.slice(0, 5) + '...'}
                    </a>
                    <IconButton onClick={() => handleCopy(userOp.userOpHash)}>
                        <ContentCopyIcon size="small" />
                    </IconButton>
                </CopyButtonDiv>
            ),
            age: timePassed.humanize() + ' ago',
            sender: (
                <CopyButtonDiv>
                    <a href={'https://www.google.com'}>
                        {userOp.sender.slice(0, 5) + '...'}
                    </a>
                    <IconButton onClick={() => handleCopy(userOp.sender)}>
                        <ContentCopyIcon size="small" />
                    </IconButton>
                </CopyButtonDiv>
            ),
            target: (
                <CopyButtonDiv>
                    {}
                    {userOp.target != null && userOp.target.slice(0, 5) + '...'}
                    <IconButton onClick={() => handleCopy(userOp.target || '')}>
                        <ContentCopyIcon size="small" />
                    </IconButton>
                </CopyButtonDiv>
            ),
            icon: getIcon(userOp.network),
        });
    }
    return rows;
};

export default function LatestUserOps() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchUserOps = async () => {
            const response = await fetch(
                'https://api.jiffyscan.xyz/v0/getLatestUserOps'
            );
            const userOpsFromResponse = await response.json();
            if ('userOps' in userOpsFromResponse) {
                const rows = getRowsFromUserOpResponse(
                    userOpsFromResponse.userOps
                );
                setRows(rows);
            }
        };
        fetchUserOps();
    }, []);

    return (
        <div className="flex flex-col py-6 lg:w-1/2">
            <h1 className="text-xl font-semibold pb-4">
                Latest User Operations
            </h1>
            <div className="overflow-scroll border-1 shadow-lg rounded">
                <UserOpTable columns={cols} rows={rows} />
            </div>
            <div className="py-4">
                <ViewAllUserOpsButton />
            </div>
        </div>
    );
}
