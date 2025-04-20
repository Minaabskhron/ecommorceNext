import Product from "./_components/Product";
import { baseUrl, getTopSellingProducts } from "./_lib/const";

const page = async () => {
  const res = await fetch(`${baseUrl}/api/v1/products`);

  if (!res.ok) throw new Error("failed to fetch products");

  const { data } = await res.json();

  const products = getTopSellingProducts(data);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-10 text-gray-500">
        Most selling products
      </h1>
      <div className="grid grid-cols-4 gap-8">
        {products.map((product) => (
          <div className="rounded-xl shadow-xl " key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
