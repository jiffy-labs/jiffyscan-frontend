import React from "react";
import SaveIcon from "@mui/icons-material/Save";

const ProfileSection = ({ title, children, buttonText,onClick }: any) => (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow sm:p dark:bg-gray-800 dark:border-gray-700 mt-6">
        <div className="px-4 py-2.5 w-full font-bold text-gray-900 dark:text-white border-b text-md">
            {title}
        </div>
        <div className="p-6  mb-4">
            <div className="flex">
                {children}
            </div>
        </div>
        <div className="px-6 py-4 w-full text-gray-900 dark:text-white border-t text-lg" >
            <button className="border rounded-md py-2 px-5 tracking-wider" onClick={onClick}>
                <SaveIcon className="mr-2 text-lg mb-1" />
                {buttonText}
            </button>
        </div>
    </div>
);

export default ProfileSection;
