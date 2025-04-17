import { getServerSession } from "next-auth";
import { baseUrl } from "../_lib/const";
import { authOptions } from "../api/auth/[...nextauth]/route";
import WishListClient from "../_components/WishListClient";

const page = async () => {
  try {
    const session = await getServerSession(authOptions);

    const token = session.accessToken;

    if (!token) throw new Error("User is not authenticated");

    const WishlistRes = await fetch(`${baseUrl}/api/v1/wishlist`, {
      headers: { token },
    });

    if (!WishlistRes.ok)
      throw new Error(WishlistRes.message || "failed to fetch wishlist");

    const wishListData = await WishlistRes.json();

    return (
      <div className="mx-30">
        <WishListClient token={token} wishListData={wishListData} />
      </div>
    );
  } catch (error) {
    console.error("Error loading wishlist:", error.message);
  }
};

export default page;
