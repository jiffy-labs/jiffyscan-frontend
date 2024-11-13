import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { formatDistanceToNow } from 'date-fns';
import CopyButton from '@/components/common/copy_button/CopyButton';
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import Link from 'next/link';
import Pagination from '@/components/common/table/Pagination';


interface Column {
  id: 'hash' | 'age' | 'sender' | 'target' | 'fee';
  label: string;
  minWidth?: number;
  align?: 'right'| 'center';
}

const columns: readonly Column[] = [
  { id: 'hash', label: 'USEROP HASH', minWidth: 170 , align: 'center'},
  { id: 'age', label: 'AGE', minWidth: 100, align: 'center' },
  { id: 'sender', label: 'SENDER', minWidth: 170, align: 'center' },
  { id: 'target', label: 'TARGET', minWidth: 170, align: 'center' },
  { id: 'fee', label: 'FEE (ETH)', minWidth: 170, align: 'center' },
];

interface UserOpData {
  hash: string;
  age: string;
  sender: string;
  target: string;
  fee: string;
}

interface UserOpsTableProps {
  userOps: UserOpData[];
  network: string;
}

const UserOpsTable: React.FC<UserOpsTableProps> = ({ userOps, network }) => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const contractAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className='border dark:border-[#3B3C40] dark:bg-[#1F202B]'>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table"className='border-none'>
          <TableHead style={{ backgroundColor: '#5A5A62', border: 'none' }} >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: '#9E9E9E',border: 'none'  }}
                  className='dark:border-[#3B3C40] dark:bg-[#191A23] bg-[#F0F1F5] font-gsans '
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userOps.slice(pageNo * pageSize, pageNo * pageSize + pageSize).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.hash}>
                {columns.map((column) => {
                  const value = row[column.id as keyof UserOpData];
                  return (
                    <TableCell key={column.id} align={column.align} className='font-gsans dark:text-[#DADEF1] dark:border-[#3B3C40]'>
                      {column.id === 'hash' || column.id === 'sender' || column.id === 'target' ? (
                        <div className="flex items-center ml-10">
                          <img src={NETWORK_ICON_MAP[network]} alt="" className="h-[20px] mr-2" />
                          <Link
                            href={
                              column.id === 'hash'
                                ? `https://v2.jiffyscan.xyz/userOpHash/${value}?network=${network}`
                                : `https://v2.jiffyscan.xyz/account/${value}?network=${network}`
                            }
                            target="_blank"
                          >
                            <p className='text-[#195BDF]'>{contractAddress(value as string)}</p>
                          </Link>
                          <CopyButton text={value as string} />
                        </div>
                      ) : column.id === 'age' ? (
                        formatDistanceToNow(new Date(value as string), { addSuffix: true })
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Custom Pagination Component */}
      <div className='z-50 px-4'>
      <Pagination
        pageDetails={{
          pageNo,
          setPageNo,
          pageSize,
          setPageSize,
          totalRows: userOps.length,
        }}
      />
      </div>
    </Paper>
  );
};

export default UserOpsTable;
