import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";
import "./_styles/globals.css";
import {Josefin_Sans} from "next/font/google"

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: {
    template: "%s - The Wild Oasis",
    default: "The Wild Oasis",
  },
  description: "A place to find your inner peace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-100 min-h-screen antialiased  ${josefin.className} flex flex-col`}
      >
        <header className="border-b border-primary-900 px-8 py-5">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <Logo />
            <Navigation />
          </div>
        </header>
        <div className="flex-1 px-8 py-12">

        <main className="max-w-7xl mx-auto">{children}</main>
        </div>
       
      </body>
    </html>
  );
}
