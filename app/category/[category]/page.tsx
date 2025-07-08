import Link from "next/link";

type Meal = {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
}

type mealResponse = {
    meals: Meal[];
}

type Params = {
    params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: Params) {
    const { category } = await params;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, { next: { revalidate: 60 } })

    if (!res.ok) throw new Error(`Failed to fetch ${category}`)

    const data = await res.json() as mealResponse;
    console.log(data)

    return (
        <div className=" container mx-auto">
            <h1 className=" w-full justify-between text-center text-5xl font-bold mb-6 text-[#3a6648f5]">Meals in {category}</h1>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
                {
                    data.meals.map(item => <li
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
        </div>
    )
}
