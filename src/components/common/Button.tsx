import Link from "next/link";
import React, {ReactNode} from "react";

interface ButtonProps {
  href: string;
  children?: ReactNode;
}

function Button(props: ButtonProps) {
  const {href, children} = props;

  return (
    <Link
      href={href}
      className="font-medium border border-dark-200 text-md gap-2 inline-flex items-center tracking-[1.25px] pt-[9px] pb-[5px] px-4 uppercase hover:no-underline rounded bg-white"
    >
      <span>{children}</span>
      <img
        className="-translate-y-[1px]"
        src="/images/chevron-right.svg"
        alt=""
      />
    </Link>
  );
}

export default Button;
