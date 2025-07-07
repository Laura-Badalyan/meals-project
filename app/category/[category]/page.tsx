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
        <div className="CategoryPage">
            <h1>Meals in {category}</h1>
            <ul className="grid md:grid-cols-2 lg:grid-cols-4">
              {
                data.meals.map(item => <li key={item.idMeal}>
                    <img src={item.strMealThumb} alt={item.strMeal}/>
                    <Link href={`/meal/${item.idMeal}`}>{item.strMeal}</Link>
                </li>)
            }  
            </ul>
        </div>
    )
}
