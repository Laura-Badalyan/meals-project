'use client'
import { useSearch } from '@/context/SearchContext'
import Link from 'next/link';
import React from 'react'

export const GlobalSearch = () => {
    const { query, setQuery, meals, isLoading } = useSearch();
    const [open, setOpen] = React.useState(false)

    return (
        <div>
            <input
                type='text'
                placeholder='Search Meals...'
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
                onFocus={() => setOpen(true)}
            />
            {open && <ul>
                {isLoading && <li>Loading...</li>}
                {!isLoading && meals?.length === 0 && query?.trim().length > 0 && <li> No meals found</li>}
                {!isLoading && meals?.slice(0, 5)?.map(meal => <li key={meal.idMeal}>
                    <Link href="">{meal.strMeal}</Link>
                </li>)}
            </ul>}
        </div >
    )
}
