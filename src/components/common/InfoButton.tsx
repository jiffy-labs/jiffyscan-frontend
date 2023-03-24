import React from 'react';
import Tooltip from '@mui/material/Tooltip';

function InfoButton({ data }: { data?: string }) {
    return (
        <>
            {/* <Tooltip id="my-tooltip" style={{ borderRadius: '0.35rem' }} /> */}
            <Tooltip title={data} placement="top">
                <button type="button">
                    <img src="/images/icon-container (3).svg" alt="" />
                </button>
            </Tooltip>
        </>
    );
}

export default InfoButton;
