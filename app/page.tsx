import Image from "next/image";
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
    <div className="HomePage">
      <h1>Meal  Categories</h1>
      <ul>
        {data.categories.map((c) => <li key={c.idCategory}>
          <Image src={c.strCategoryThumb} alt={c.strCategoryDescription} />
          <h4>{c.strCategoryDescription}</h4>
          <p>{c.strCategory}</p>
          <Link href="">View detail...</Link>
        </li>)}
      </ul>
    </div>
  );
}
