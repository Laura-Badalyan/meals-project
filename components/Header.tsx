'use client'

import Link from "next/link"
import { GlobalSearch } from "./GlobalSearch"
import { Menu } from "./Menu"

export const Header = () => {
  return (
    <div className="w-full mx-auto flex justify-between font-bold text-amber-800 p-4">
      <h1 className="text-4xl">
        <Link href={'/'}>Meals</Link>
      </h1>
      <div>
        <Menu />
      </div>

      <div>
        <GlobalSearch />
      </div>
    </div>
  )
}
