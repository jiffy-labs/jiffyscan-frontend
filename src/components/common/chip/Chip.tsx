import React, {ReactNode} from "react";
import sx from "./chip.module.sass";

export interface ChipProps {
  startIcon?: string;
  endIcon?: string;
  children: ReactNode;
  variant?: "contained" | "outlined";
  color?: "dark-700" | "white" | "info" | "success";
  className?: string;
}

function Chip(props: ChipProps) {
  const {children, endIcon, startIcon, variant = "contained", color = "dark-700", className} = props;

  return (
    <div className={`${sx.wrapper} ${sx[variant]} ${sx[color]} ${className || ""}`}>
      {startIcon && <img src={startIcon} alt="" />}
      <span className="flex-1">{children}</span>
      {endIcon && <img src={endIcon} alt="" />}
    </div>
  );
}

export default Chip;
