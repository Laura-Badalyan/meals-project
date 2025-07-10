
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
    console.log("meal", meal);


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

            <div className="bg-amber-50 shadow-lg rounded-lg p-4 mb-6 flex flex-col lg:flex-row justify-between gap-6">
                <a
                    href={meal.strYoutube || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
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
    );

}
