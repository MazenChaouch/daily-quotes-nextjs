import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full h-16 flex justify-center items-center bg-teal-400 shadow-xl gap-4">
      <Link
        href={"/"}
        className="text-white text-lg font-semibold hover:underline transition duration-300"
      >
        Home
      </Link>
      <Link
        href={""}
        className="text-white text-lg font-semibold hover:underline transition duration-300"
      >
        Favorites
      </Link>
    </div>
  );
};
