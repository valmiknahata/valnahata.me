import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valmik Nahata",
  description: "AI researcher, UC San Diego",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet" />
        <script src="https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js"></script>

        {/* Preload gallery photos on site start */}
        <link rel="preload" as="image" href="/images/gallery/nyc-subway.jpg" />
        <link rel="preload" as="image" href="/images/gallery/nyc-night.jpg" />
        <link rel="preload" as="image" href="/images/gallery/rockefeller-winter.jpg" />
        <link rel="preload" as="image" href="/images/gallery/jordan-pond-spring.jpg" />
        <link rel="preload" as="image" href="/images/gallery/blue-ridge-summer.jpg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
