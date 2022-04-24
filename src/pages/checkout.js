import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { clearCart, selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { getSession, useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useDispatch } from "react-redux";
const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const items = useSelector(selectItems);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //call the backend to create a checkout session

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    console.log("checkout Session", checkoutSession);

    // redirect user/customer  to stripe checkout

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="http://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col  space-y-10 pb-2 bg-white">
            <h1 className="text-3xl border-b pb-4 ">
              {" "}
              {items.length === 0
                ? "Your Amazon Basket is Empty"
                : " Your Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
                qty={item.qty}
              />
            ))}
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items) :
                <span className="font-bold">
                  {" "}
                  <Currency quantity={total * 70} currency="INR" />
                </span>
              </h2>

              <button
                role="Link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={` button mt-2 text-white ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed "
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

// {
//   items.length > 0 ? (
//     <button
//       className=" lg: w-36  ml-96 sm:ml-0  text-slate-900  rounded-sm  text-lg bg-gray-400"
//       onClick={() => dispatch(clearCart())}
//     >
//       Clear Basket
//     </button>
//   ) : null;
// }
