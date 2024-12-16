import { Link } from "react-router";
export default function Blog() {
  return (
    <div className="flex flex-col justify-center p-5">
      <div className="text-center p-6">Blog Page</div>
      <Link className="mx-auto" to="blogpost">
        <button className="bg-slate-400 w-28 rounded mx-auto py-3">
          read more
        </button>
      </Link>
    </div>
  );
}
