import type { Metadata } from "next";
import { Providers } from "@/components/shared/Providers";
import { heroPhoto } from "@/content/photos";
import { publicPath } from "@/lib/public-path";
import "./globals.css";
import "./editorial.css";
const title = "Тобольск глазами Ершова";
const description =
  "Авторский маршрут по Тобольску на два или три дня. Групповые и индивидуальные поездки.";
const site = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title,
  description,
  ...(site
    ? { metadataBase: new URL(site), alternates: { canonical: site } }
    : { robots: { index: false, follow: false } }),
  openGraph: {
    title,
    description,
    locale: "ru_RU",
    type: "website",
    ...(site
      ? {
          images: [
            {
              url: new URL(publicPath(heroPhoto.src), site),
              width: heroPhoto.width,
              height: heroPhoto.height,
              alt: heroPhoto.alt,
            },
          ],
        }
      : {}),
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
