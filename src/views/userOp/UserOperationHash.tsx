import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getUserOp, UserOp } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Caption from '@/components/common/table/Caption';
import IconText from '@/components/common/IconText';
import Chip from '@/components/common/chip/Chip';
import sx from './usertable.module.sass';
import { useRouter } from 'next/router';
import { getFee, shortenString } from '@/components/common/utils';
import { NETWORK_ICON_MAP, NETWORK_LIST } from '@/components/common/constants';
import Table from '@/components/common/table/Table';
import Token from '@/components/common/Token';
export const BUTTON_LIST = [
    {
        name: 'Default View',
        key: 'Default View',
    },
    {
        name: 'Original',
        key: 'Original',
    },
];
const columns = [
    { name: 'Hash', sort: true },
    { name: 'Age', sort: true },
    { name: 'UserOps', sort: false },
];
function RecentUserOpsHash(props: any) {
    const router = useRouter();
    const { data } = router.query;
    console.log('🚀 ~ file: UserOperationHash.tsx:34 ~ RecentUserOpsHash ~ router:', data);
    const [open, setOpen] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);
    const hash = props.slug && props.slug[0];
    const network = props.slug && props.slug[1];

    const [selectedColor, setSelectedColor] = useState('#1976D2');
    const [useOpsData, setuserOpsData] = useState<UserOp[]>();

    const refreshUserOpsTable = async (name: string, network: string) => {
        setTableLoading(true);
        const userops = await getUserOp(name || '0x43fe1ef830cbc6447ca8a740963099fe7fb6b137ac7768aa9c8f5913aaf8f91b', network || 'manniet');
        setuserOpsData(userops);
        setTableLoading(false);
    };

    let prevHash = hash;
    let prevNetwork = network;
    useEffect(() => {
        // Check if hash or network have changed
        if (prevHash !== undefined || prevNetwork !== undefined) {
            prevHash = hash;
            prevNetwork = network;
            const refreshTable = () => {
                refreshUserOpsTable(hash as string, network as string);
            };
            refreshTable();
        }
    }, [hash, network]);

    return <></>;
}

export default RecentUserOpsHash;
