import React from 'react';
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    // Function to handle clicks on the overlay
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Check if the click was on the overlay (not on the modal itself)
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleOverlayClick} // Attach the click handler
            style={{
                height: '200vh', // Ensure it covers the full viewport height
            }}
            
        >
            <div className="-mt-[500px] relative dark:bg-[#1F202B] dark:text-[#DADEF1] bg-white py-6  rounded-lg  shadow-lg w-full max-w-4xl mx-auto">
                {/* Close button in the top right corner */}
                <h1 className='font-gsans px-6 text-base'>Networks</h1>
                <button
                    onClick={onClose}
                    className="absolute top-6 right-4 text-gray-600 hover:text-gray-800"
                    aria-label="Close modal"
                >
                    <IoMdClose className='w-4 h-4 dark:fill-[#DADEF1]' />
                </button>
                
                {children}
            </div>
        </div>
    );
};

export default Modal;
