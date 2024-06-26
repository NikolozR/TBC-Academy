import "./globals.css";
import { Inter, Poppins, Space_Grotesk } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { locales } from "../../navigation";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextUIProvider } from "@nextui-org/react";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});
const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Nikosonic",
  description: "Generated by create next app",
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: childrenProps<paramsLang>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const theme: string = cookies().get("theme")?.value ?? "";
  return (
    <html lang={locale} className={theme} suppressHydrationWarning>
      <UserProvider>
        <body
          className={
            inter.className + " " + grotesk.variable + " " + poppins.variable + ' dark:bg-[#241b33]'
          }
        >
          <NextIntlClientProvider messages={messages}>
              <NextUIProvider>{children}</NextUIProvider>
          </NextIntlClientProvider>
        </body>
      </UserProvider>
    </html>
  );
}
