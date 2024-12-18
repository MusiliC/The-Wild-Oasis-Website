import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
