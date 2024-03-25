import React, { useEffect, useState } from 'react';
import Chip, { ChipProps } from '../chip/Chip';
import CopyButton from '../copy_button/CopyButton';
import { getFee } from '../utils';

export default function DisplayFee({ item, network }: any) {
  const [fee, setFee] = useState(getFee(item, network));
  useEffect(() => {
    setFee(getFee(item, network));
  }, [item, network]);

  return (
    <div>
      <div className="flex items-center gap-2 mt-2 text-rgiht">
        <span>{typeof fee?.value == "object" ? parseInt(fee?.value.hex) : fee.value}</span>
        <Chip variant="outlined" color={fee?.gas?.color as ChipProps['color']}>
          {fee?.gas?.children}
        </Chip>
      </div>
    </div>
  );
}
