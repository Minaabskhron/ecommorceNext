import Category from "../_components/Category";
import { baseUrl } from "../_lib/const";

const page = async () => {
  const res = await fetch(`${baseUrl}/api/v1/categories`);

  if (!res.ok) throw new Error("failed to fetch products");

  const { data } = await res.json();

  return (
    <>
      <p className="text-gray-500 text-3xl font-semibold pt-4">
        Featured Categories
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mx-12 sm:gap-5 lg:grid-cols-4 gap-2">
        {data.map((category) => (
          <div className="rounded-xl shadow-xl " key={category._id}>
            <Category category={category} />
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
