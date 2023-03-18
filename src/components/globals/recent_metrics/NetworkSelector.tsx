import React from 'react'
import Chip from "@/components/common/chip/Chip";

function NetworkSelector({ selectedNetwork }: { selectedNetwork: string }) {
  return (
    <div className="flex items-center gap-1">
            <Chip startIcon="/images/icon-container (4).svg">Goerli</Chip>
            <div className="hidden md:flex items-center gap-1 ">
              <Chip color="white" startIcon="/images/icon-container (5).svg">
                Mumbai
              </Chip>
              <Chip color="white" startIcon="/images/icon-container (6).svg">
                Optimism Goerli
              </Chip>
            </div>
            <Chip color="white" endIcon="/images/icon-container (7).svg">
              More
            </Chip>
          </div>
  )
}

export default NetworkSelector
