import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href="/">
      <img className="hidden md:block" src="/images/Frame 21.svg" alt="" />
      <img src="/images/Frame 19 (1).svg" className="md:hidden block" alt="" />
    </Link>
  )
}

export default Logo
