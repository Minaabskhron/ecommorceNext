import ClientLayout from "./_components/ClientLayout";
import Footer from "./_components/Footer";
import NavBar from "./_components/NavBar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <NavBar />
          <div className="mt-15 p-5">
            <div>{children}</div>
          </div>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
