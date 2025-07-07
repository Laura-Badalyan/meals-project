
type Params = {
    params: Promise<{ id: string }>
}

export default async function MealPage({ params }: Params) {
    const { id } = await params;

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error(`Failed to fetch meal with id ${id}`)

    const data = res.json()

    return (
        <div className="MealPage">
            MealPage {id}
        </div>
    )
}
