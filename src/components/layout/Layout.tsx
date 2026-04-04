import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300 font-sans">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
