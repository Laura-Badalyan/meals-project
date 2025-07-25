'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";


type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string
}

type SearchContextType = {
    query: string;
    setQuery: (q: string) => void;
    meals: Meal[];
    isLoading: boolean
}

const SearchContext = createContext<SearchContextType>({
    query: '',
    setQuery: () => { },
    meals: [],
    isLoading: false
});

export function SearchProvider({ children }: { children: ReactNode }) {
    const [query, setQuery] = useState('');
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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

    }, [query])

    return (
        <SearchContext.Provider value={{ query, setQuery, meals, isLoading }}>
            {children}
        </SearchContext.Provider>
    )

}

export const useSearch = () => useContext(SearchContext)