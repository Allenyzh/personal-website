import { Link } from "react-router";
export default function BlogPost() {
  return (
    <div className="flex flex-col h-screen justify-evenly items-center bg-slate-100">
      <h1 className="">Title</h1>
      <p>My First blogpost</p>
      <div className="flex container justify-around">
        <Link to="/blog" className="hover:scale-125">
          Back to Blog
        </Link>
        <Link to="/" className="hover:scale-125">
          Back to HomePage
        </Link>
      </div>
    </div>
  );
}
