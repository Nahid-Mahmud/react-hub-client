import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

// stripe promise
const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_PAYMENT_KEY);
// console.log(import.meta.env.VITE_PUBLIC_PAYMENT_KEY)

const Membership = () => {
  return (
    <div className="max-w-[90rem] py-10 mx-auto">
      <p className="md:text-3xl pb-5 text-xl md:font-bold font-semibold text-center underline">
        Become a member and take your conversations to another level!
      </p>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Membership;
