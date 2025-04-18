import ClientLayout from "./_components/ClientLayout";
import Footer from "./_components/Footer";
import NavBar from "./_components/NavBar";
import { CartProvider } from "./_context/CartContext";
import { WishListProvider } from "./_context/WishListContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <CartProvider>
            <WishListProvider>
              <NavBar />
              <div className="mt-15 p-5">
                <div>{children}</div>
              </div>
              <Footer />
            </WishListProvider>
          </CartProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
