import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useUserBadge from "../../Hooks/useUserBadge";

// stripe promise
const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_PAYMENT_KEY);
// console.log(import.meta.env.VITE_PUBLIC_PAYMENT_KEY)

const Membership = () => {
  const [isUserBadge, isUserBadgeLoading,badgeDataRefetch] = useUserBadge();
  const goldMember = isUserBadge === "gold";
  return (
    <div className="max-w-[90rem] py-10 mx-auto">
      {goldMember ? (
        <div className="text-center text-2xl font-bold text-green-600 md:text-3xl">
          CongratulaTions and Thakyou for becoming a gold Member member!
        </div>
      ) : (
        <div>
          <p className="md:text-3xl pb-5 text-xl md:font-bold font-semibold text-center underline">
            Become a member and take your conversations to another level!
          </p>
          <div className="flex flex-col py-10  items-center">
            <div className="card w-96 bg-base-100 ">
              <div className="card-body">
                <h2 className="card-title">
                  One time Payment! ($5 only){" "}
                  <span className="text-red-500 text-xl">*</span>{" "}
                </h2>
                <p>Create Unlimited post and unlimited comment!</p>
              </div>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm badgeDataRefetch={badgeDataRefetch} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Membership;
