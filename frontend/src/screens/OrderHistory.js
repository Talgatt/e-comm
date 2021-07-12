import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";
import { orderMyListReducer } from "../reducers/orderReducers";

export default function OrderHistory(props) {
  const [orderId, setorderId] = useState("");
  const orderMyList = useSelector((state) => state.orderMyList);
  const { orders, error, loading } = orderMyList;
  const dispatch = useDispatch();

  const handleSubmit = (orderId) => {
    props.history.push(`/order/${orderId}`);
  };
  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch, listMyOrders]);

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    { error }
  ) : (
    <div>
      Order history
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr>
              <td>{item._id}</td>
              <td>{item.createdAt.substring(0, 10)}</td>
              <td>{item.totalPrice}</td>
              <td>{item.isPaid ? item.paidAt.substring(0, 10) : "No"}</td>
              <td>
                {item.isDelivered ? item.deliveredAt.substring(0, 10) : "No"}
              </td>
              <td>
                <button onClick={() => handleSubmit(item._id)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
