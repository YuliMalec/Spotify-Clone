import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Sidebar } from "../../UI/Sidebar";
import SupabaseProvider from "../../providers/SupabaseProvider";
import UserProvider from "../../providers/UserProvider";
import ModalProvider from "../../providers/ModalProvider";
import ToasterProvider from "../../providers/ToasterProvider";
import getSongsByUserId from "../../actoins/getSongsByUserId";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});


export const revalidate = 0;
export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Enjoy the music!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId()
  return (
    <html lang="en">
      <body
        className={`${figtree.variable}  antialiased`}>
        <ToasterProvider/>
        <SupabaseProvider>
           <UserProvider>
            <ModalProvider/>
            <Sidebar songs={userSongs}>
            {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
