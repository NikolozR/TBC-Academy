import { Inter, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { locales } from "../../navigation";
import { ThemeProvider } from "next-themes";
import { unstable_setRequestLocale } from "next-intl/server";
import { AppWrapper } from "../context/index";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-grotesk'
})
const poppins = Poppins({
  subsets: ["latin"],
  weight: '400',
  variable: '--font-poppins'
});
const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: childrenProps<paramsLang>) {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <UserProvider>
        <body className={inter.className + " " + grotesk.variable + " " + poppins.variable}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AppWrapper>{children}</AppWrapper>
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
