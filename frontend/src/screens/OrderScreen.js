import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder } from "../actions/orderActions";
import { orderDetailsReducer } from "../reducers/orderReducers";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  console.log("orderDetails", orderDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);
  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    { error }
  ) : (
    <div>
      <h1>Order</h1>
      <ul>
        <li>
          <h2>Shopping</h2>
          <p>
            <strong>Name</strong> {order.shippingAddress.fullName} <br />
            <strong>Address</strong> {order.shippingAddress.address},
            {order.shippingAddress.city}, {order.shippingAddress.country},
            {order.shippingAddress.postalCode}
          </p>
        </li>

        <li>
          <h2>Payment</h2>
          <p>
            <strong>Method</strong> {order.paymentMethod}
          </p>
        </li>

        <li>
          <h2>Order Items</h2>
          <ul>
            {order.orderItems.map((item) => (
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

          <p>Items ${order.itemsPrice}</p>
          <p>Shipping ${order.shippingPrice}</p>
          <p>Tax ${order.taxPrice}</p>
          <p>Order Total ${order.orderTotal}</p>
        </div>
      </ul>
    </div>
  );
}
