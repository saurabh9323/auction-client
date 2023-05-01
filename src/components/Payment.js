import React, { useState, useEffect } from "react";
import "./css/payment.css";
// import { useStateValue } from "./StateProvider";
// import CheckoutProduct from "./CheckoutProduct";
//import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import CurrencyFormat from "react-currency-format";
//import { getBasketTotal } from "./reducer";
import axios from "axios";
//import { db } from "./firebase";

function Payment() {
  //const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // useEffect(() => {
  //   // generate the special stripe secret which allows us to charge a customer
  //   const getClientSecret = async () => {
  //     var amount = getBasketTotal(basket) * 100;
  //     console.log(amount);
  //     amount = Math.floor(amount);
  //     console.log(amount);

  //     const response = await axios({
  //       method: "post",
  //       // Stripe expects the total in a currencies subunits
  //       url: `/payments/create?total=${amount}`,
  //     });
  //     setClientSecret(response.data.clientSecret);
  //   };

  //   if (basket.length) {
  //     getClientSecret();
  //   }
  // }, [basket]);

  const handleSubmit = async (event) => {
    //do all the stripe stuff
    event.preventDefault();
    setProcessing(true);

    var amount = 100 * 100;
    console.log(amount);
    amount = Math.floor(amount);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios({
          method: "post",
          // Stripe expects the total in a currencies subunits
          url: `/payments/create?total=${amount}&id=${id}`,
        });

        console.log(response);

        // db.collection("users").doc(user?.uid).collection("orders").doc(id).set({
        //   basket: basket,
        //   amount: response.data.clientSecret.amount,
        //   created: response.data.clientSecret.created,
        // });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        
        // history.replace("/orders");

        // const payload = await stripe
        //   .confirmCardPayment(clientSecret, {
        //     payment_method: {
        //       card: elements.getElement(CardElement),
        //     },
        //   })
        //   .then(({ paymentIntent }) => {
        //     // paymentIntent = payment confirmation
        //     console.log("paymentIntent", paymentIntent);

        //
        //   });
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  const handleChange = (event) => {
    //listen for any canges at card element
    //and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                {/* <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                /> */}
                <button disabled={processing || disabled || succeeded || error}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && (
                <div style={{ marginTop: "10px", color: "red" }}>{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
