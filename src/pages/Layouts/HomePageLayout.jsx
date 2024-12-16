import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function HomePageLayout() {
  return (
    <main className="h-screen bg-slate-100 dark:bg-gray-600">
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
}
