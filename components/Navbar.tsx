import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full h-16 flex justify-center items-center bg-teal-400 shadow-xl gap-4">
      <p>{process.env.name}</p>
      <Link
        href={"/"}
        className="text-white text-lg font-semibold hover:underline transition duration-300"
      >
        Home
      </Link>
      <Link
        href={"/favorites"}
        className="text-white text-lg font-semibold hover:underline transition duration-300"
      >
        Favorites
      </Link>
      <Link
        href={"/about"}
        className="text-white text-lg font-semibold hover:underline transition duration-300"
      >
        About
      </Link>
    </div>
  );
};
