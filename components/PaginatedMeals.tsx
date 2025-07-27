'use client'

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Meal = {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
}

type Props = {
    meals: Meal[]
}

export default function PaginatedMeals({ meals }: Props) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 9;
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => meals.filter(m => {

        return m.strMeal.toLowerCase().includes(query.toLowerCase());
    }), [query, meals])

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const pagesArr = [];
    for (let i = 1; i <= totalPages; i++) pagesArr.push(i);

    const current = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage)
    }, [page, filtered])

    const prev = () => { setPage(prev => Math.max(1, prev - 1)) };

    const next = () => { setPage(prev => Math.min(prev + 1, totalPages)) };


    return (
        <div className="container">
            <div className=" flex justify-end my-8">
                <input
                    type='text'
                    placeholder="Search Meal..."
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value)
                        setPage(1)
                    }}
                    className=" flex justify-end px-8 py-1 border-2 border-amber-400 rounded-full bg-amber-50 focus:outline-0"
                />
            </div>

            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
                {
                    current?.map(item => <li
                        key={item.idMeal}
                        className=" border-4 border-amber-200 rounded-lg p-6 bg-amber-50"
                    >
                        <Link className=" flex flex-col items-center justify-between" href={`/meal/${item.idMeal}`}>
                            <Image
                                src={item.strMealThumb}
                                alt={item.strMeal}
                                width={200}
                                height={200}
                            />
                            <p className="pt-4 font-bold text-xl text-center text-amber-800">{item.strMeal}</p>
                        </Link>
                    </li>)
                }
            </ul>
            {pagesArr.length > 0 && (
                <div className="flex justify-center w-full p-8 text-2xl text-amber-800">
                    <button
                        onClick={prev}
                        disabled={page === 1}
                        className=" cursor-pointer disabled:text-amber-200 disabled:cursor-not-allowed"
                    >{'<'}</button>
                    {pagesArr.map(p => <button
                        key={p}
                        className={p === page ? " cursor-pointer px-3 border-2 border-amber-400 rounded-full bg-amber-50" : 'cursor-pointer p-1'}
                        onClick={() => setPage(p)}
                    >
                        {p}
                    </button>)}
                    <button
                        onClick={next}
                        disabled={page === totalPages}
                        className=" cursor-pointer disabled:text-amber-200 disabled:cursor-not-allowed"
                    >{'>'}</button>
                </div>
            )}

        </div>
    )
}