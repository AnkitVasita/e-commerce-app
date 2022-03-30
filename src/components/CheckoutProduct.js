import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  rating,
  image,
  hasPrime,
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

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
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
        {/* 
        {hasPrime && (
          <div className="flex items-center space-x-2 ">
            <img
              loading="lazy"
              className="w-12"
              src="http://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )} */}
      </div>

      {/* right */}

      <div className="flex flex-col space-y-2 mr-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className=" text-white button">
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className=" text-white button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
