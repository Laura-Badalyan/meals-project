'use client'
import { useSearch } from '@/context/SearchContext'
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react'

export const GlobalSearch = () => {
  const { query, setQuery, meals, isLoading } = useSearch();
  const [open, setOpen] = useState(false);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  }

  let blurTimeout: NodeJS.Timeout;

  const handleFocus = () => {
    clearTimeout(blurTimeout)
    setOpen(true)
  }

  const handleBlur = () => {
    blurTimeout = setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  return (
    <div className="relative w-full max-w-xl mx-auto ">
      <input
        type="text"
        placeholder="Search Meal..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full text-lg md:text-md border border-amber-500 rounded-t-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className=' absolute top-2 right-2 cursor-pointer'>
          X
        </button>
      )}
      {open && (
        <ul className="absolute w-full bg-white border border-t-0 border-amber-500 rounded-b-2xl shadow-lg  overflow-y-auto">
          {isLoading && (
            <li className="p-4 text-center text-gray-500">Loading...</li>
          )}
          {!isLoading && meals?.length === 0 && query?.trim().length > 0 && (
            <li className="p-4 text-center text-gray-500">No meals found</li>
          )}
          {!isLoading &&
            meals?.slice(0, 5).map((meal) => (
              <li
                key={meal.idMeal}
                className="border-t last:rounded-b-2xl hover:bg-amber-50 transition-colors"
              >
                <Link
                  href={`/meal/${meal.idMeal}`}
                  className="flex gap-4 items-center p-4"
                >
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={50}
                    height={50}
                    className="rounded-full shadow-md"
                  />
                  <p className="text-lg font-medium text-gray-800">
                    {meal.strMeal}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );

}
