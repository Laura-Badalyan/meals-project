'use client'

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
    const itemsPerPage = 8;

    const totalPages = Math.ceil(meals.length / itemsPerPage);

    const current = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return meals.slice(start, start + itemsPerPage)
    }, [page])

    const prev = () => { setPage(prev => Math.max(1, prev - 1)) };

    const next = () => { setPage(prev => Math.min(prev + 1, totalPages)) };


    return (
        <div>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
                {
                    current?.map(item => <li
                        key={item.idMeal}
                        className=" border-4 border-amber-200 rounded-lg p-6 bg-amber-50"
                    >
                        <Link href={`/meal/${item.idMeal}`}>
                            <img className="" src={item.strMealThumb} alt={item.strMeal} />
                            <p className="pt-4 font-bold text-xl text-center text-amber-800">{item.strMeal}</p>
                        </Link>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={prev}>prev</button>
                <span>{page} / {totalPages}</span>
                <button onClick={next}>next</button>
            </div>
        </div>
    )
}