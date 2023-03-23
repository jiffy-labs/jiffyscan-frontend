import IconButton from '@/components/common/icon_button/IconButton'
import Token from '@/components/common/Token'
import Link from 'next/link'
import React from 'react'
import BacktoTop from './BacktoTop'
import Copyright from './Copyright'
import Donations from './Donations'
import pages from './pages.json'
import socials from './social.json'

function Footer() {
  return (
    <footer className="bg-dark-600 py-8 md:py-12 text-white">
      <div className="container flex flex-col gap-8 md:gap-12">
        <div className=" flex md:flex-row flex-col md:justify-between md:items-center">
          <div className="flex items-center gap-1 md:ml-0 -ml-3">
            {socials.map(({ icon, id, url }) => (
              <Link
                className="w-14 h-14 grid place-content-center"
                href={url}
                key={id}
              >
                <img src={icon} alt="" />
              </Link>
            ))}
          </div>
          <div className="">
            <BacktoTop />
          </div>
        </div>
        <hr className="border-dark-300" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="mb-6">
              <Link href="/">
                <img src="/images/Frame 22.svg" alt="" />
              </Link>
            </div>
            <p className="text-sm">
              A block explorer and analytics platform for Account Abstraction on
              EVM chains using EIP-4337.
            </p>
          </div>
          {pages.map(({ id, lists, name }) => (
            <div key={id} className="md:place-self-center md:self-start">
              <b className="font-normal text-sm text-dark-200 block mb-6">
                {name}
              </b>
              <div className="flex flex-col gap-3 md:gap-5">
                {lists.map(([name, url], index) => (
                  <Link
                    className="flex items-center gap-2 font-bold group text-white"
                    key={index}
                    href={url}
                  >
                    <span>{name}</span>
                    <img
                      className="group-hover:translate-x-1 duration-100"
                      src="/images/icon-container (17).svg"
                      alt=""
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <hr className="border-dark-300" />
        <div className="flex flex-wrap gap-3 md:gap-10 justify-between ">
          <Copyright />
          <Donations />
        </div>
      </div>
    </footer>
  )
}

export default Footer
