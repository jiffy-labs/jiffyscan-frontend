import React, { ReactNode } from 'react'

interface LayoutProps {
  children?: ReactNode
}

function Layout({ children }: LayoutProps) {
  return <div className="bg-dark-50 min-h-screen">{children}</div>
}

export default Layout
