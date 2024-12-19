import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";
import "./_styles/globals.css";


export const metadata = {
  title: {
    template: "%s - The Wild Oasis ",
    default: "The Wild Oasis",
  },
  description: {
    default: "A place to find your inner peace",
  },
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
