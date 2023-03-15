import React from "react";

const UserOpTable = ({ columns, rows }) => {
    if (rows == []) return () => <div>no data</div>;
    return (
        <div>
            <table className=" w-[410px] shadow-xl border-collapse	border-b-2">
                <thead>
                    <tr>
                        {columns.map((col) => {
                            return <th className="w-[181px]">{col.name}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => {
                        console.log(idx)
                        return <tr key={idx} className="border-b-2">
                            {columns.map((col) => {
                                console.log(row[col.id]);
                                return <td className="text-center">{row[col.id]}</td>;
                            })}
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UserOpTable;
