import React from 'react';
// import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
function InfoButton({ data }: { data?: string }) {
    return (
        <>
            {/* <Tooltip id="my-tooltip" style={{ borderRadius: '0.35rem' }} /> */}
            <div className="flex rounded-full" data-tooltip-id="my-tooltip" data-tooltip-content={data}>
                <button type="button">
                    <img src="/images/icon-container (3).svg" alt="" />
                </button>
            </div>
        </>
    );
}

export default InfoButton;
