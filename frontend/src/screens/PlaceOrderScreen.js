import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import {
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConstants";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order } = orderCreate;

  const dispatch = useDispatch();

  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((total, item) => total + item.price * item.qty, 0)
  );
  cart.shippingPrice = toPrice(cart.itemsPrice > 100 ? 0 : 20);
  cart.taxPrice = toPrice(cart.itemsPrice * 0.15);

  cart.totalPrice = toPrice(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  );

  console.log("cart", cart.cartItems);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, order, props.history, dispatch]);

  return (
    <div>
      <h1>Order</h1>
      <ul>
        <li>
          <h2>Shopping</h2>
          <p>
            <strong>Name</strong> {cart.shippingAddress.fullName} <br />
            <strong>Address</strong> {cart.shippingAddress.address},
            {cart.shippingAddress.city}, {cart.shippingAddress.country},
            {cart.shippingAddress.postalCode}
          </p>
        </li>

        <li>
          <h2>Payment</h2>
          <p>
            <strong>Method</strong> {cart.paymentMethod}
          </p>
        </li>

        <li>
          <h2>Order Items</h2>
          <ul>
            testing
            {cart.cartItems.map((item) => (
              <li key={item.product}>
                <img className="small" src={item.image} alt={item.name} />
                {item.name}
                <div>
                  {item.qty} x ${item.price} = ${item.qty * item.price}
                </div>
              </li>
            ))}
          </ul>
        </li>
        <div>
          <strong>Order Summary</strong>

          <p>Items ${cart.itemsPrice}</p>
          <p>Shipping ${cart.shippingPrice}</p>
          <p>Tax ${cart.taxPrice}</p>
          <p>Order Total ${cart.orderTotal}</p>
        </div>
        <div>
          <button
            className="primary block"
            type="button"
            onClick={placeOrderHandler}
            disabled={cart.cartItems.length === 0}
          >
            Place Order
          </button>
        </div>
      </ul>
    </div>
  );
}
