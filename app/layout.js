import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";
import "./_styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Wild Oasis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      className="bg-primary-950 text-primary-100 min-h-screen"
      >
        <header>
          <Logo/>
        <Navigation />
        </header>
        <main>{children}</main>
        <footer>
          Copyright by the Wild Oasis
        </footer>
      </body>
    </html>
  );
}
