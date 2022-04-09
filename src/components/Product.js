import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  selectItems,
  removeFromBasket,
} from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ id, title, price, description, category, image }) => {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const randomNumber =
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING;
  const [rating] = useState(randomNumber);
  const [hasPrime] = useState(Math.random() < 0.5);

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

  function removeBasket() {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(removeFromBasket(product));
  }

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-teal-600" key={i} />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price * 70} currency="INR" />
      </div>

      {/* {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="http://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )} */}

      {items.some((item) => item.id === id) ? (
        <button onClick={removeBasket} className="mt-auto button text-white">
          Remove from Basket
        </button>
      ) : (
        <button onClick={addItemToBasket} className="mt-auto button text-white">
          Add to Basket
        </button>
      )}
    </div>
  );
};

export default Product;
