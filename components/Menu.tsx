'use client'

import Link from "next/link";

export const Menu = () => {
    return (
        <menu>
            <ul className="w-[250px] flex justify-between">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/">Categories</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </menu>
    )
}
