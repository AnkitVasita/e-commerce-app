import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  decreasedFromCart,
} from "../slices/basketSlice";

const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  rating,
  image,
  hasPrime,
  qty,
}) => {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(addToBasket(product));
  };

  function removeItemFromBasket() {
    dispatch(removeFromBasket({ id }));
  }

  const decreasedFromBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
    };

    dispatch(decreasedFromCart(product));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/* middle */}

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-teal-600" key={i} />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price * 70} currency="INR" />
        <br />
        <button
          className="  mb-2  mt-2 px-3 py-1.5 text-xs md:text-sm bg-gray-400 text-slate-900 font-sans rounded-sm"
          onClick={removeItemFromBasket}
        >
          Remove
        </button>
      </div>

      {/* right */}

      <div className=" flex flex-row sm:flex-col space-x-12  mr-10  my-auto justify-self-end  ">
        <button
          onClick={decreasedFromBasket}
          className=" text-white font-bold px-1.5 button sm: mr-2"
        >
          -
        </button>
        {qty}
        <button
          onClick={addItemToBasket}
          className=" text-white px-2 font-bold  button sm: ml-16"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
