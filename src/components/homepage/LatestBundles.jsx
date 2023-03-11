import React from 'react';

const rows = [
    {
        id: 1,
        hash: '0x1234567890',
        age: '1 min ago',
        userOp: '10 ops',
    },

    {
        id: 1,
        hash: '0x1234567890',
        age: '1 min ago',
        userOp: '10 ops',
    },
    {
        id: 1,
        hash: '0x1234567890',
        age: '1 min ago',
        userOp: '10 ops',
    },
    {
        id: 1,
        hash: '0x1234567890',
        age: '1 min ago',
        userOp: '10 ops',
    },
    {
        id: 1,
        hash: '0x1234567890',
        age: '1 min ago',
        userOp: '10 ops',
    },
    {
        id: 1,
        hash: '0x1234567890',
        age: '1 min ago',
        userOp: '10 ops',
    },
];

export default function LatestBundles() {
    return (
        <div className="overflow-scroll border-1 shadow-lg rounded">
            <table className=" w-[410px] shadow-xl border-collapse	border-b-2">
                <thead>
                    <tr>
                        <th className="w-[181px] ">Hash</th>
                        <th className="w-[181px]">Age</th>
                        <th className="w-[181px]">#UserOp</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id} className="border-b-2">
                            <td className="py-4 text-center">{row.hash}</td>
                            <td className="text-center">{row.age}</td>
                            <td className="text-right">{row.userOp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
