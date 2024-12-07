import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <section className="h-screen bg-slate-100 dark:bg-gray-600">
      <NavBar />
      <Home />
      <Footer />
    </section>
  );
}

export default App;
