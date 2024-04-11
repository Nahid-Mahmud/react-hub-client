import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useAuth } from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ badgeDataRefetch }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  // state for storing client secret
  const [clientSecret, setClientSecret] = useState("");
  const [payError, setPayError] = useState("");

  useEffect(() => {
    badgeDataRefetch();
  }, [badgeDataRefetch]);

  useEffect(() => {
    axiosSecure.get("/create-payment-intent").then((res) => {
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if stripe and elements both are loaded

    if (!stripe || !elements) {
      console.log("stripe and elements are not loaded", stripe, elements);
      return;
    }

    // get the card element
    const card = elements.getElement(CardElement);

    // checking if card is available
    if (card === null) {
      console.log("card is not avaialble");
      return;
    }
    // create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPayError(error);
    } else {
      setPayError("");
    }

    // confirm payment method
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        },
      },
    });

    if (confirmError) {
      // console.log("Confirm error", confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        // change user role to gold
        // console.log("Payment Id", paymentIntent?.id);
        axiosSecure
          .put(`/user/role/${user?.email}`, {
            badge: "gold",
            paymentId: paymentIntent?.id,
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.modifiedCount > 0) {
              badgeDataRefetch();
            }
          });
        // refetch user data for badge update

        // show alert
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your role has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }

    // console.log("clicked");
  };

  return (
    <div>
      <form
        className="md:max-w-[50vw] lg:max-w-[30vw] border p-5 rounded-md max-w-[95vw] mx-auto"
        onSubmit={handleSubmit}
      >
        <p className="py-5 font-semibold">Enter Your card Details :</p>
        <CardElement
          className="p-5 border rounded dark:bg-[#0b1222] dark:text-slate-300 bg-base-100 w-full"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className="relative  mt-5 py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-slate-200 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Become a member
        </button>
        <p className="text-red-500">{payError.message}</p>
        <p className="text-green-500"></p>
      </form>
    </div>
  );
};

export default CheckoutForm;
