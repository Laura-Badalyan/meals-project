import { Meal } from "@/components/Content/Meal"

type Params = {
    params: Promise<{ id: string }>
}

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
}

type MealResponse = {
    meals: Meal[]
}

export default async function MealPage({ params }: Params) {
    const { id } = await params;

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error(`Failed to fetch meal with id ${id}`)

    const data: MealResponse = await res.json();

    if (!data.meals || data.meals.length === 0) {
        return <p>No meal found with id {id}</p>
    }

    const meal = data.meals[0];

    const ingredients: { ingredient: string, measure: string }[] = [];

    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const mea = meal[`strMeasure${i}`];
        if (ing && ing !== '') {
            ingredients.push({
                ingredient: ing as string,
                measure: mea as string
            })
        }
    }


    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4 text-center">{meal.strMeal}</h1>

            <Meal ingredients={ingredients} meal={meal}/>
        </div>
    );

}
