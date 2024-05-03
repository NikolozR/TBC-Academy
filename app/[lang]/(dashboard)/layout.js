import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import { Inter } from "next/font/google";
import { getDictionary } from "../dictionaries";
import { cookies } from "next/headers.js";
import "../globals.css";
import { redirect } from "next/navigation";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, params }) {
  const dict = await getDictionary(params.lang)
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  if (!cookie) redirect("/login");
  return (
    <>
      <Header dic={dict} locale={params.lang} />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </>
  );
}
