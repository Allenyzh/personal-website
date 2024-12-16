import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function HomePageLayout() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-200 dark:bg-gray-600">
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
}
