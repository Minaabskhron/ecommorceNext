import Product from "../_components/Product";
import { baseUrl } from "../_lib/const";

const page = async () => {
  const res = await fetch(`${baseUrl}/api/v1/products`);

  if (!res.ok) throw new Error("failed to fetch products");

  const { data } = await res.json();

  return (
    <div className="grid grid-cols-4 gap-8">
      {data.map((product) => (
        <div className="rounded-xl shadow-xl " key={product._id}>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};

export default page;
