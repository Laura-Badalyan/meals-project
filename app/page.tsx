import Link from "next/link";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type CategoryResponse = {
  categories: Category[];
};


export default async function HomePage() {

  const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php', { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch categories')

  // const data = (await res.json()) as CategoryResponse;
  const data: CategoryResponse = await res.json();

  return (
    <div className="HomePage container mx-auto" >
      <h1 className="text-center text-3xl text-green-900 font-bold italic p-4">Meal  Categories</h1>
      <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.categories.map((c) => <li
          key={c.idCategory}
          className="shadow-md p-4 bg-green-100 rounded-md"
        >
          <img className="w-full" src={c.strCategoryThumb} alt={c.strCategoryDescription} />
          <h4 className="text-green-700 font-bold text-2xl ">{c.strCategory}</h4>
          <p className="text-green-600">{c.strCategoryDescription.length > 200 ?
            c.strCategoryDescription.slice(0, 200) + "..." :
            c.strCategoryDescription}</p>
          <Link className="text-green-900 p-4" href={`/category/${c.strCategory}`}>View detail...</Link>
        </li>)}
      </ul>
    </div>
  );
}
