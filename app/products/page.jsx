import Product from "../_components/Product";
import { baseUrl } from "../_lib/const";

const page = async () => {
  // const session = await getServerSession(authOptions); it is working but for just one page

  // if (!session) {
  //   redirect("/signin");
  // }

  const res = await fetch(`${baseUrl}/api/v1/products`);

  if (!res.ok) throw new Error("failed to fetch products");

  const { data } = await res.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mx-12 sm:gap-5 lg:grid-cols-4 gap-2">
      {data.map((product) => (
        <div className="rounded-xl shadow-xl" key={product._id}>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};

export default page;
