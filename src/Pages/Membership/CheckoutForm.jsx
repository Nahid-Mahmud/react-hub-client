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
      console.log(res.data.clientSecret);
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
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log("Confirm error", confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        // change user role to gold
        console.log("Payment Id", paymentIntent?.id);
        axiosSecure
          .put(`/user/role/${user?.email}`, {
            badge: "gold",
            paymentId: paymentIntent?.id,
          })
          .then((res) => {
            console.log(res.data);
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

    console.log("clicked");
  };

  return (
    <div>
      <form
        className="md:max-w-[50vw] lg:max-w-[30vw] max-w-[95vw] mx-auto"
        onSubmit={handleSubmit}
      >
        <p className="py-5 font-semibold">Enter Your card Details</p>
        <CardElement
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
          className="btn btn-primary my-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-500">{payError.message}</p>
        <p className="text-green-500"></p>
      </form>
    </div>
  );
};

export default CheckoutForm;
