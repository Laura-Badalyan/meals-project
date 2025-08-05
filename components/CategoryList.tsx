'use client'

import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

type Category = {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
};

type CategoryResponse = {
    categories: Category[];
};

export function CategoryList({ categories }: CategoryResponse) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    return (
        <div>
            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                {categories.map((c) => <li
                    key={c.idCategory}
                    className="shadow-md p-4 bg-green-100 rounded-md"
                >
                    <Image
                        src={c.strCategoryThumb}
                        alt={c.strCategoryDescription}
                        width={300}
                        height={300}
                    />
                    <h4 className="text-green-700 font-bold text-2xl ">{c.strCategory}</h4>
                    <p className="text-green-600 py-2">{
                        c.strCategoryDescription.length > 200 ? <>
                            {c.strCategoryDescription.slice(0, 200)}
                            <button
                                className="cursor-pointer"
                                onClick={() => setSelectedCategory(c)}
                            >...</button>
                        </>
                            :
                            c.strCategoryDescription}</p>
                    <Link className="text-green-900 font-bold px-4 border-2 bg-green-50 rounded-md hover:bg-green-900 hover:text-white " href={`/category/${c.strCategory}`}>View details</Link>
                </li>)}
            </ul>

            {selectedCategory && <div
                className="fixed text-white bg-green-900/90 w-[40%] min-h-[40vh] rounded-2xl top-1/6 left-1/2 -translate-x-1/2 flex flex-col items-center p-4">
                <span
                    className=" absolute top-2 right-2 text-3xl cursor-pointer"
                    onClick={() => setSelectedCategory(null)}>
                    X</span>
                <Image
                    src={selectedCategory.strCategoryThumb}
                    alt={selectedCategory.strCategory}
                    width='300'
                    height='50'
                />
                <h4 className=' text-green-50 font-bold py-6'>{selectedCategory.strCategory}</h4>
                <p>{selectedCategory.strCategoryDescription}</p>
            </div>
            }
        </div>
    )
}
