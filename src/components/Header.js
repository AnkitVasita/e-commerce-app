import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

const Header = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      {/* top nav */}
      <div className="flex items-center  p-1 flex-grow py-2 bg-teal-900 ">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
         
          <h1
            className=" text-3xl px-2 pb-2 text-white font-medium cursor-pointer"
            onClick={() => router.push("/")}
          >
            Z-Shop
          </h1>
        </div>

        {/* search */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-teal-600 hover:bg-teal-700">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4 "
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* right */}

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap ">
          <div onClick={!session ? signIn : signOut} className="link">
            <p> {session ? `Hello ${session.user.username}` : "Sign In"} </p>
            <p className="font-extrabold sm:text-sm">Account & Lists</p>
          </div>

          <div onClick={() => router.push("/orders")} className="link">
            <p>Returns</p>
            <p className="font-extrabold sm:text-sm">& orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className=" relative link flex items-center cursor-pointer "
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-teal-600 text-center rounded-full text-white  font-bold ">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className=" hidden md:inline font-extrabold sm:text-sm">
              Basket
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
