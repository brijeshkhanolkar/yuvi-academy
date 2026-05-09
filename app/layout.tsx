import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Yuvi Gurukul — Excellence in Physics, Chemistry, Biology, Math & Robotics",
  description: "Yuvi Gurukul is a premier online study platform offering expert-led video lectures in Physics, Chemistry, Mathematics, Biology, Robotics & Olympiad preparation. Study smart, score high!",
  keywords: "Yuvi Gurukul, Physics Edupoint, JEE, NEET, MHT-CET, Physics, Chemistry, Mathematics, Kolhapur, online tuition",
  openGraph: {
    title: "Yuvi Gurukul — Excellence in Education",
    description: "Premier online study platform for JEE, NEET, MHT-CET, and Olympiad preparation",
    type: "website",
  },
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

