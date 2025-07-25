import PaginatedMeals from "@/components/PaginatedMeals";

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

    return (
        <div className=" container mx-auto">
            <h1 className=" w-full justify-between text-center text-5xl font-bold mb-6 text-[#3a6648f5]">Meals in {category}</h1>
           <PaginatedMeals meals={data.meals}/>
        </div>
    )
}
