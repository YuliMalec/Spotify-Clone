import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Sidebar } from "../../UI/Sidebar";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Enjoy the music!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable}  antialiased`}
      >
        <Sidebar>
        {children}
        </Sidebar>
      </body>
    </html>
  );
}
