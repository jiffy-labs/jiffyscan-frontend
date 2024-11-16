import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import {
    getAddressActivity,
    UserOp,
    AddressActivity,
    tokenBalance,
    getAddressBalances,
    getAddressERC20Transfers,
    getAddressERC721Transfers,
    tokenTransferAlchemy,
    getAddressTransactions,
    Transaction,
    fetchNetworkData,
    NetworkResponse,
} from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link, Box, Tab, Tabs, Typography, Tooltip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import Token from '@/components/common/Token';
import { NETWORK_ICON_MAP, NETWORK_SCANNER_MAP, NETWORK_LIST } from '@/components/common/constants';
import Skeleton from 'react-loading-skeleton-2';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Table, { tableDataT } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
import TransactionDetails from './TransactionDetails';
import HeaderSection from './HeaderSection';
import HeaderSectionGlobal from '@/components/global/HeaderSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConfig } from '@/context/config';
import { set } from 'lodash';
import LinkAndCopy from '@/components/common/LinkAndCopy';
import { SlHome } from 'react-icons/sl';
import { MdContentCopy } from 'react-icons/md';
import Image from 'next/image';

// import Skeleton from '@/components/Skeleton';
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

const DEFAULT_PAGE_SIZE = 10;

const userOpColumns = [
    { name: 'UserOp Hash', sort: true },
    { name: 'Age', sort: true },
    { name: 'Sender', sort: false },
    { name: 'Target', sort: false },
    { name: 'Fee', sort: true },
];

const TransactionColumns = [
    { name: 'Transaction Hash', sort: true },
    { name: 'Age', sort: true },
    { name: 'Sender', sort: false },
    { name: 'Target', sort: false },
    { name: 'Fee', sort: true },
];

const erc20TransferColumns = [
    { name: 'Transaction Hash', sort: true },
    { name: 'Block Number', sort: true },
    { name: 'From', sort: false },
    { name: 'To', sort: false },
    { name: 'Value', sort: true },
];

const erc721TransferColumns = [
    { name: 'Transaction Hash', sort: true },
    { name: 'Block Number', sort: true },
    { name: 'From', sort: false },
    { name: 'To', sort: false },
    { name: 'Token ID', sort: true },
];

const constructValueRowForTokenTransfer = (erc20Transfer: tokenTransferAlchemy, network: string) => {
    let value = calculateTokenValue(
        parseInt(erc20Transfer.rawContract.value ? erc20Transfer.rawContract.value : '0'),
        erc20Transfer.rawContract.decimal,
    );
    let asset = erc20Transfer.asset
        ? erc20Transfer.asset.length > 5
            ? erc20Transfer.asset.slice(0, 4) + '...'
            : erc20Transfer.asset
        : shortenString(erc20Transfer.rawContract.address);
    let component = (
        <LinkAndCopy text={asset} link={NETWORK_SCANNER_MAP[network] + '/address/' + erc20Transfer.rawContract.address} copyText={null} />
    );
    return { value, component };
};

const constructTokenIdRowForTokenTransfer = (erc721Transfer: tokenTransferAlchemy, network: string) => {
    let value = erc721Transfer.tokenId ? erc721Transfer.tokenId : '0';
    let asset = erc721Transfer.asset ? erc721Transfer.asset : '0';
    asset = asset.length > 5 ? asset.slice(0, 5) + '...' : asset;
    let component = (
        <LinkAndCopy text={asset} link={NETWORK_SCANNER_MAP[network] + '/address/' + erc721Transfer.rawContract.address} copyText={null} />
    );
    return { value: parseInt(value).toString(), component };
};

const getAgoFromAssetTransfer = (assetTransfer: tokenTransferAlchemy) => {
    if (assetTransfer.metadata?.blockTimestamp) return getTimePassed(new Date(assetTransfer.metadata?.blockTimestamp).getTime() / 1000);
    else return parseInt(assetTransfer.blockNum).toString();
};

const constructERC20TransferRows = (erc20Transfers: tokenTransferAlchemy[], network: string): tableDataT['rows'] => {
    let newRows = [] as tableDataT['rows'];
    if (!erc20Transfers) return newRows;
    erc20Transfers.forEach((erc20Transfer) => {
        let { value, component } = constructValueRowForTokenTransfer(erc20Transfer, network);
        newRows.push({
            token: {
                text: erc20Transfer.hash,
                icon: NETWORK_ICON_MAP[network],
                type: 'erc20Transfer',
            },
            ago: getAgoFromAssetTransfer(erc20Transfer),
            sender: erc20Transfer.from,
            target: [erc20Transfer.to],
            fee: { value, component },
            status: true,
        });
    });
    return newRows;
};

const constructERC721TransferRows = (erc721Transfers: tokenTransferAlchemy[], network: string): tableDataT['rows'] => {
    let newRows = [] as tableDataT['rows'];
    if (!erc721Transfers) return newRows;
    erc721Transfers.forEach((erc721Transfer) => {
        let { value, component } = constructTokenIdRowForTokenTransfer(erc721Transfer, network);
        newRows.push({
            token: {
                text: erc721Transfer.hash,
                icon: NETWORK_ICON_MAP[network],
                type: 'erc721Transfer',
            },
            ago: getAgoFromAssetTransfer(erc721Transfer),
            sender: erc721Transfer.from,
            target: [erc721Transfer.to],
            fee: { value: value, component: component },
            status: true,
        });
    });
    return newRows;
};

const createUserOpsTableRows = (userOps: UserOp[]): tableDataT['rows'] => {
    let newRows = [] as tableDataT['rows'];
    if (!userOps) return newRows;
    userOps.forEach((userOp) => {
        newRows.push({
            token: {
                text: userOp.userOpHash,
                icon: NETWORK_ICON_MAP[userOp.network],
                type: 'userOp',
            },
            ago: getTimePassed(userOp.blockTime!),
            sender: userOp.sender,
            target: userOp.target ? userOp.target : ['Unavailable!'],
            fee: getFee(userOp.actualGasCost, userOp.network as string),
            status: userOp.success!,
        });
    });
    return newRows;
};

const createTransactionTableRows = (transactions: Transaction[], network: string): tableDataT['rows'] => {
    let newRows = [] as tableDataT['rows'];
    if (!transactions) return newRows;
    transactions.forEach((transaction) => {
        newRows.push({
            token: {
                text: transaction.tx_hash,
                icon: NETWORK_ICON_MAP[network],
                type: 'transaction',
            },
            ago: getTimePassed(new Date(transaction.block_signed_at).getTime() / 1000),
            sender: transaction.from_address,
            target: [transaction.to_address],
            fee: getFee(transaction.gas_price, network),
            status: transaction.successful,
        });
    });
    return newRows;
};

interface AccountInfo {
    address: string;
    totalDeposit: number;
    userOpsCount: number;
    userOpHash: string;
    blockTime: number;
    factory: string;
    ethBalance?: string;
    tokenBalances?: tokenBalance[];
}

interface NetworkItem {
    name: string;
    key: string;
    iconPath: string;
    iconPathInverted: string;
}

const createAccountInfoObject = (addressActivity: AddressActivity, address: string): AccountInfo => {
    console.log(addressActivity);
    if (addressActivity && Object.keys(addressActivity).length > 0)
        return {
            address: address,
            totalDeposit: parseInt(addressActivity.accountDetail.totalDeposits),
            userOpsCount: addressActivity.accountDetail.userOps.length,
            userOpHash: addressActivity.accountDetail.userOpHash,
            blockTime: parseInt(addressActivity.accountDetail.blockTime),
            factory: addressActivity.accountDetail.factory,
            // tokenBalances: 'tokenBalances' in addressActivity ? (addressActivity.tokenBalances as tokenBalance[]) : [],
        };
    else
        return {
            address: address,
            totalDeposit: 0,
            userOpsCount: 0,
            userOpHash: '',
            blockTime: 0,
            factory: '',
        };
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function calculateTokenValue(value: number, decimals: string | null): string {
    let responseValue;
    if (decimals == null) responseValue = value / Math.pow(10, 18);
    else responseValue = value / Math.pow(10, parseInt(decimals));

    if (responseValue < 0.0001) return responseValue.toExponential(2);
    else return responseValue.toFixed(4);
}

function Account(props: any) {
    const router = useRouter();
    const [tableLoading, setTableLoading] = useState(true);
    const [tabNo, setTabNo] = useState(0);
    const { addressMapping } = useConfig();
    const hash = props.slug && props.slug[0];
    const network = router.query && (router.query.network as string);
    const [rows, setRows] = useState([] as tableDataT['rows']);
    const [addressInfo, setAddressInfo] = useState<AccountInfo>();
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [tokenBalances, setTokenBalances] = useState<tokenBalance[]>([]);
    const [erc20Transfers, setErc20Transfers] = useState<tokenTransferAlchemy[]>([]);
    const [erc20TransfersTableRows, setErc20TransfersTableRows] = useState<tableDataT['rows']>([]);
    const [erc721TransfersTableRows, setErc721TransfersTableRows] = useState<tableDataT['rows']>([]);
    const [erc721Transfers, setErc721Transfers] = useState<tokenTransferAlchemy[]>([]);
    const [erc20PageNo, setErc20PageNo] = useState(0);
    const [erc721PageNo, setErc721PageNo] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transactionsTableRows, setTransactionsTableRows] = useState<tableDataT['rows']>([]);
    const [transactionsPageNo, setTransactionsPageNo] = useState(0);

    const [mounted, setMounted] = useState(false);

    const [displayNetworkList, setDisplayNetworkList] = useState<NetworkItem[]>([]);
    const [networkListReady, setNetworkListReady] = useState(false);
    const [copyTooltip, setCopyTooltip] = useState('Copy'); // Tooltip state for copy action
    const [isVisible, setIsVisible] = useState(false);

// Set a 7-second timer when the component mounts
useEffect(() => {
    setIsVisible(true); // Show the floating element
    const timeout = setTimeout(() => setIsVisible(false), 5000); // Hide after 7 seconds

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
}, []);

    const totalTabs = 5; // Update this if the number of tabs changes

    // Handler for keyboard events
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'a' || event.key === 'A') {
            // Move to the previous tab (looping back to the last tab if at the start)
            setTabNo((prevTab) => (prevTab === 0 ? totalTabs - 1 : prevTab - 1));
        } else if (event.key === 'd' || event.key === 'D') {
            // Move to the next tab (looping back to the first tab if at the end)
            setTabNo((prevTab) => (prevTab === totalTabs - 1 ? 0 : prevTab + 1));
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    const handleCopy = () => {
        navigator.clipboard.writeText(hash); // Copy the hash to clipboard
        setCopyTooltip('Copied!'); // Change tooltip to indicate success
        setTimeout(() => setCopyTooltip('Copy'), 1500); // Reset tooltip after 1.5s
    };
    useEffect(() => {
        setMounted(true);
    }, []);

    // handling table page change. Everytime the pageNo change, or pageSize change this function will fetch new data and update it.
    const updateRowsData = async (network: string, pageNo: number, pageSize: number) => {
        setTableLoading(true);
        if (addressInfo == undefined) {
            return;
        }
        const addressActivity = await getAddressActivity(addressInfo.address, network ? network : '', pageNo, pageSize, toast);
        const rows = createUserOpsTableRows(addressActivity.accountDetail.userOps);
        setRows(rows);
        if (rows.length > 0) setTableLoading(false);
    };

    // update the page No after changing the pageSize
    const setPageSize = (size: number) => {
        _setPageSize(size);
        setPageNo(0);
        setErc20PageNo(0);
        setErc721PageNo(0);
    };

    // fetch erc 20 balances
    const loadAccountBalances = async (name: string, network: string) => {
        const tokenBalances = await getAddressBalances(name, network ? network : '', DEFAULT_PAGE_SIZE, pageNo, toast);
        setTokenBalances(tokenBalances);
    };

    const loadAccountTransaction = async (name: string, network: string) => {
        const transactions = await getAddressTransactions(name, network ? network : '', DEFAULT_PAGE_SIZE, pageNo, toast);
        setTransactions(transactions);
        const transactionRows = createTransactionTableRows(transactions, network ? network : '');
        setTransactionsTableRows(transactionRows);
    };

    // fetch erc20 transfers
    const loadAccountERC20Transfers = async (name: string, network: string) => {
        const erc20Transfers = await getAddressERC20Transfers(name, network ? network : '', DEFAULT_PAGE_SIZE, pageNo, toast);
        const erc20TableRows = constructERC20TransferRows(erc20Transfers.slice(0, pageSize * (pageNo + 1)), network ? network : '');
        setErc20Transfers(erc20Transfers);
        setErc20TransfersTableRows(erc20TableRows);
    };

    // getch erc721 transfers
    const loadAccountERC721Transfers = async (name: string, network: string) => {
        const erc721Transfers = await getAddressERC721Transfers(name, network ? network : '', DEFAULT_PAGE_SIZE, pageNo, toast);
        const erc721TableRows = constructERC721TransferRows(erc721Transfers.slice(0, pageSize * (pageNo + 1)), network ? network : '');
        setErc721TransfersTableRows(erc721TableRows);
        setErc721Transfers(erc721Transfers);
    };

    // load the account details.
    const loadAccountDetails = async (name: string, network: string) => {
        setTableLoading(true);
        const addressActivity = await getAddressActivity(name, network ? network : '', DEFAULT_PAGE_SIZE, pageNo, toast);
        const accountInfo = createAccountInfoObject(addressActivity, name);
        const rows = createUserOpsTableRows(addressActivity.accountDetail?.userOps);
        setRows(rows);
        setAddressInfo(accountInfo);
        setTableLoading(false);
    };

    useEffect(() => {
        updateRowsData(network ? network : '', pageSize, pageNo);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('pageNo', pageNo.toString());
        urlParams.set('pageSize', pageSize.toString());
        window.history.pushState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
    }, [pageNo]);

    useEffect(() => {
        let erc20RowData = constructERC20TransferRows(
            erc20Transfers.slice(pageSize * erc20PageNo, pageSize * (erc20PageNo + 1)),
            network ? network : '',
        );
        setErc20TransfersTableRows(erc20RowData);
        let erc721RowData = constructERC721TransferRows(
            erc721Transfers.slice(pageSize * erc721PageNo, pageSize * (erc721PageNo + 1)),
            network ? network : '',
        );
        setErc721TransfersTableRows(erc721RowData);
    }, [erc20PageNo, erc721PageNo]);

    let prevHash = hash;
    let prevNetwork = network;
    useEffect(() => {
        // Check if hash or network have changed
        if (prevHash !== undefined || prevNetwork !== undefined) {
            prevHash = hash;
            prevNetwork = network;
            loadAccountDetails(hash as string, network as string);
            loadAccountBalances(hash as string, network as string);
            loadAccountERC20Transfers(hash as string, network as string);
            loadAccountERC721Transfers(hash as string, network as string);
            loadAccountTransaction(hash as string, network as string);
        }
    }, [hash, network]);

    const checkTermInNetworks = React.useCallback(async (term: string) => {
        const networksWithTerm: string[] = [];
        const networkKeys = Object.keys(NETWORK_LIST);

        try {
            const data: NetworkResponse[] = await fetchNetworkData(term);

            data.forEach((networkData: NetworkResponse, index: number) => {
                if (!networkData.message) {
                    const networkValue = networkKeys[index];
                    networksWithTerm.push(networkValue);
                }
            });

            const validNetworksWithTerm = networksWithTerm.filter(
                (index) => typeof index === 'string' && !isNaN(Number(index)) && Number(index) < NETWORK_LIST.length,
            );

            setDisplayNetworkList(validNetworksWithTerm.map((index) => NETWORK_LIST[Number(index)] as NetworkItem));

            setNetworkListReady(true);
        } catch (error) {
            console.error('Error fetching data for networks:', error);
        }
    }, []);

    React.useEffect(() => {
        if (!networkListReady && hash) {
            checkTermInNetworks(hash);
        }
    }, [hash, networkListReady, checkTermInNetworks]);

    if (!mounted) return <></>;

    return (
        <div className="dark:bg-[#191A23]">
            <Navbar searchbar />
            {isVisible &&  (
                <div className="hidden lg:block fixed bottom-64 left-2 z-50 p-2  text-[#20294C] dark:text-[#DADEF1] rounded-md text-sm">
                    <div className='flex flex-col text-md font-gsans gap-2'>
                        <strong>PRESS</strong> 
                        <div className='flex flex-row'>
                            <Image width={48} height={48} src="/images/LightA.svg" alt="" className='dark:hidden block' />  
                            <Image width={48} height={48} src="/images/LightD.svg" alt=""className='dark:hidden block' />
                            <Image width={48} height={48} src="/images/DarkA.svg" alt="" className='dark:block hidden '/>  
                            <Image width={48} height={48} src="/images/DarkD.svg" alt="" className='dark:block hidden '/>  
                        </div> 
                        to switch between tabs
                    </div>
                </div>
            )}
            <section className="px-3 container mx-auto my-6 py-6 bg-white dark:bg-[#1F202B] shadow-lg rounded-xl border border-[#D7DAE0] dark:border-[#3B3C40]">
                <div className="container px-0 sm:px-8 items-center dark:text-[#DADEF1]">
                    <div className="flex flex-row">
                        <Link href="/" className="text-gray-500">
                            <ArrowBackIcon
                                style={{ height: '15px', width: '15px', marginRight: '20px', marginLeft: '10px', marginBottom: '3px' }}
                            />
                        </Link>
                        <Breadcrumbs aria-label="breadcrumb" className="dark:text-[#DADEF1]">
                            <Link underline="hover" color="inherit" href={`/?network=${network ? network : ''}`}>
                            <SlHome />
                            </Link>
                            <Link underline="hover" color="inherit" href="/recentUserOps">
                                Recent User Ops
                            </Link>
                            <Link
                                underline="hover"
                                color="text.primary"
                                href={`/address/${hash}?network=${network ? network : ''}`}
                                aria-current="page"
                                className="text-[#195BDF]"
                            >
                                {shortenString(hash as string)}
                                <Tooltip title={copyTooltip}>
                                    <IconButton onClick={handleCopy} size="small" style={{ marginLeft: '8px' }}>
                                        <MdContentCopy className="w-4 h-4 dark:fill-[#ADB0BC]" />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Breadcrumbs>
                    </div>
                    {/* <h1 className="text-3xl font-bold p-4 font-gsans">Account</h1> */}
                </div>

                <div className="container px-0">
                    <div className="relative mt-4 md:px-10 py-4 border-b border-[#D7DAE0] dark:border-[#3B3C40] font-gsans">
                        <ul className="flex items-center px-1.5 py-1.5 list-none rounded-md bg-[#F0F1F5] dark:bg-[#191A23] border dark:border-[#3B3C40] border-[#D7DAE0] overflow-x-auto md:overflow-visible scrollbar-hide">
                            <li className="flex-none w-1/2 text-center md:flex-auto">
                                <button
                                    onClick={() => setTabNo(0)}
                                    className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-md ${
                                        tabNo === 0 ? 'bg-white border-2 dark:bg-[#1F202B]' : 'bg-inherit'
                                    }`}
                                >
                                    Account Details
                                </button>
                            </li>

                            <li className="flex-none w-1/2 text-center md:flex-auto">
                                <button
                                    onClick={() => setTabNo(1)}
                                    className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-md ${
                                        tabNo === 1 ? 'bg-white border-2 dark:bg-[#1F202B]' : 'bg-inherit'
                                    }`}
                                >
                                    User Ops ({addressInfo?.userOpsCount || 0})
                                </button>
                            </li>

                            <li className="flex-none w-1/2 text-center md:flex-auto">
                                <button
                                    onClick={() => setTabNo(2)}
                                    className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-md ${
                                        tabNo === 2 ? 'bg-white border-2 dark:bg-[#1F202B]' : 'bg-inherit'
                                    }`}
                                >
                                    Transactions ({transactions.length})
                                </button>
                            </li>

                            <li className="flex-none w-1/2 text-center md:flex-auto">
                                <button
                                    onClick={() => setTabNo(3)}
                                    className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-md ${
                                        tabNo === 3 ? 'bg-white border-2 dark:bg-[#1F202B]' : 'bg-inherit'
                                    }`}
                                >
                                    Token Transfers ({erc20Transfers.length})
                                </button>
                            </li>

                            <li className="flex-none w-1/2 text-center md:flex-auto">
                                <button
                                    onClick={() => setTabNo(4)}
                                    className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-md ${
                                        tabNo === 4 ? 'bg-white border-2 dark:bg-[#1F202B]' : 'bg-inherit'
                                    }`}
                                >
                                    NFT Transfers ({erc721Transfers.length})
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        {tabNo === 0 && (
                            <TabPanel value={tabNo} index={0}>
                                {/* <HeaderSectionGlobal
                                    item={addressInfo}
                                    network={network}
                                    displayNetworkList={displayNetworkList}
                                    headerTitle="Account"
                                /> */}
                                <TransactionDetails
                                    item={addressInfo}
                                    network={network}
                                    addressMapping={addressMapping}
                                    tokenBalances={tokenBalances}
                                    tableLoading={tableLoading}
                                />
                            </TabPanel>
                        )}
                        {tabNo === 1 && (
                            <TabPanel value={tabNo} index={1}>
                                <Table rows={rows} columns={userOpColumns} loading={tableLoading} />
                                <Pagination
                                    pageDetails={{
                                        pageNo,
                                        setPageNo,
                                        pageSize,
                                        setPageSize,
                                        totalRows: addressInfo?.userOpsCount || 0,
                                    }}
                                />
                            </TabPanel>
                        )}
                        {tabNo === 2 && (
                            <TabPanel value={tabNo} index={2}>
                                <Table rows={transactionsTableRows} columns={TransactionColumns} loading={tableLoading} />
                                <Pagination
                                    pageDetails={{
                                        pageNo: transactionsPageNo,
                                        setPageNo: setTransactionsPageNo,
                                        pageSize,
                                        setPageSize,
                                        totalRows: transactions.length,
                                        fixedPageSize: 100,
                                    }}
                                />
                            </TabPanel>
                        )}
                        {tabNo === 3 && (
                            <TabPanel value={tabNo} index={3}>
                                <Table rows={erc20TransfersTableRows} columns={erc20TransferColumns} loading={tableLoading} />
                                <Pagination
                                    pageDetails={{
                                        pageNo: erc20PageNo,
                                        setPageNo: setErc20PageNo,
                                        pageSize,
                                        setPageSize,
                                        totalRows: erc20Transfers.length,
                                    }}
                                />
                            </TabPanel>
                        )}
                        {tabNo === 4 && (
                            <TabPanel value={tabNo} index={4}>
                                <Table rows={erc721TransfersTableRows} columns={erc721TransferColumns} loading={tableLoading} />
                                <Pagination
                                    pageDetails={{
                                        pageNo: erc721PageNo,
                                        setPageNo: setErc721PageNo,
                                        pageSize,
                                        setPageSize,
                                        totalRows: erc721Transfers.length,
                                    }}
                                />
                            </TabPanel>
                        )}
                    </div>
                </div>
            </section>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default Account;
