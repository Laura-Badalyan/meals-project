'use client'

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

    const prev = () => { setPage(prev => Math.max(1, prev - 1))};

    const next = () => { setPage(prev => Math.min(prev + 1, totalPages))};

}