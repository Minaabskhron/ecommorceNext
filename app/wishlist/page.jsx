import { getServerSession } from "next-auth";
import { baseUrl } from "../_lib/const";
import { authOptions } from "../api/auth/[...nextauth]/route";
import WishListClient from "../_components/WishListClient";

const page = async () => {
  const session = await getServerSession(authOptions);

  const token = session.accessToken;

  const WishlistRes = await fetch(`${baseUrl}/api/v1/wishlist`, {
    headers: { token },
  });
  const wishListData = await WishlistRes.json();

  // console.log(wishListData.data[0]);

  return (
    <div className="mx-30">
      <WishListClient token={token} wishListData={wishListData} />
    </div>
  );
};

export default page;
