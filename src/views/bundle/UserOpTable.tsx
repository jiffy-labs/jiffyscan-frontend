import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { formatDistanceToNow } from 'date-fns';
import CopyButton from '@/components/common/copy_button/CopyButton';
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import Link from 'next/link';

interface Column {
  id: 'hash' | 'age' | 'sender' | 'target' | 'fee';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'hash', label: 'UserOp Hash', minWidth: 170 },
  { id: 'age', label: 'Age', minWidth: 100 },
  { id: 'sender', label: 'Sender', minWidth: 170 },
  { id: 'target', label: 'Target', minWidth: 170 },
  { id: 'fee', label: 'Fee (ETH)', minWidth: 170, align: 'right' },
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const contractAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead style={{ backgroundColor: '#5A5A62' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: '#9E9E9E' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userOps.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.hash}>
                  {columns.map((column) => {
                    const value = row[column.id as keyof UserOpData];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'hash' || column.id === 'sender' || column.id === 'target' ? (
                          <div className="flex items-center">
                            <img src={NETWORK_ICON_MAP[network as string]} alt="" className="h-[20px] mr-2" />
                            <Link href={column.id === 'hash' ?`https://jiffyscan.xyz/userOpHash/${value}?network=${network}` :`https://jiffyscan.xyz/account/${value}?network=${network}`} target="_blank">      <p className='text-[#195BDF]'>{contractAddress(value as string)}</p>  </Link>
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userOps.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UserOpsTable;
