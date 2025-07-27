'use client'
import Link from 'next/link';
import React, { useState } from 'react'

type CategoryNames = {
  categoryNames: string[];
}

export const Filters = ({ categoryNames }: CategoryNames) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev: boolean) => !prev);

  return (
    <div>
      <ul>
        <li>
          <button
            className='text-l font-bold text-green-700 text-shadow-md text-shadow-green-200'
            onClick={toggleDropdown}
          >
            Filter by Category
          </button>
          {isOpen && (
            <ul className="absolute mt-2 w-48 h-60 overflow-y-auto bg-green-50 border rounded shadow-lg z-10">
              {categoryNames.map((name, i) => (
                <Link
                  key={i}
                  href={`/category/${name}`}
                >
                  <li
                    key={i}
                    className="px-4 py-1 text-amber-800 font-semibold hover:bg-green-100 cursor-pointer"
                  >
                    {name}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  )
}
