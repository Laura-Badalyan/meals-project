'use client'

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string
}

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

export function GlobalSearch2() {

  const ref = useRef<HTMLInputElement>(null)
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onClick)

    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    if (query.trim().length === 0) {
      setMeals([]);
      return;
    }

    setIsLoading(true);
    const ac = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`, {
          signal: ac.signal // հարցումը ընդհատելու համար
        });
        if (!res.ok) throw new Error("Error fetched data");

        const data = await res.json();
        setMeals(data.meals || []);

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error('Unknown error', error);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      ac.abort();
    };

  }, [query]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  }


  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto ">
      <input
        type="text"
        placeholder="Search Meal..."
        value={query}
        onChange={handleInputChange}
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
                    priority
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
