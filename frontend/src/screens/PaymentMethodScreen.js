import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";

export default function PaymentMethodScreen(props) {
  const { shippingAddress } = useSelector((state) => state.cart);
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const [paymentMethod, setpaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Payment Method: </h1>
        <div>
          <div>
            <div>
              <input
                type="radio"
                name="paymentMethod"
                id="paypal"
                value="PayPal"
                checked
                onChange={(e) => setpaymentMethod(e.target.value)}
                required
              ></input>
              <label htmlFor="PayPal">PayPal</label>
            </div>
            <div>
              <input
                type="radio"
                name="paymentMethod"
                id="stripe"
                value="Stripe"
                onChange={(e) => setpaymentMethod(e.target.value)}
                required
              />
              <label htmlFor="Stripe">Stripe</label>
            </div>
          </div>

          <div>
            <button className="primary" type="submit">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
