'use client'

type Meal = {
    idMeal: string,
    strMeal: string,
    strMealAlternate: string,
    strCategory: string,
    strArea: string,
    strInstructions: string,
    strMealThumb: string,
    strTags: string,
    strYoutube: string | null,
    strSource: string,
    strImageSource: string,
    strCreativeCommonsConfirmed: string
    dateModified: string,
    [key: string]: unknown,
};

type Ingredient = {
    ingredient: string,
    measure: string
}

type Props = {
    ingredients: Ingredient[],
    meal: Meal,
}

import Image from 'next/image';
import React from 'react'

export function Meal({ ingredients, meal }: Props) {
    return (
        <div>
            <div className="bg-amber-50 shadow-lg rounded-lg p-4 mb-6 flex flex-col lg:flex-row justify-between gap-6">
                <a
                    href={meal.strYoutube || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        width={200}
                        height={200}
                        priority
                        className="w-full max-w-md mx-auto rounded-[50%] shadow-md mb-4"
                    />
                </a>

                <div>
                    <h2 className="text-xl font-medium mb-2 shadow-md">Ingredients</h2>
                    <ul>
                        {ingredients.map((item, index) => (
                            <li key={index}>
                                <span className="font-semibold">
                                    {item.ingredient} - {item.measure}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {meal.strYoutube && (
                <div className="mb-6">
                    <h2 className="text-xl font-medium mb-2">Watch on YouTube</h2>
                    <div className="aspect-video w-full max-w-2xl mx-auto">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${new URL(meal.strYoutube).searchParams.get("v")}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg shadow-md"
                        ></iframe>
                    </div>
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-medium mb-2">Instructions</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{meal.strInstructions}</p>
            </div>
        </div>
    )
}
