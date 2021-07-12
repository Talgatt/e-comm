import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search ? props.location.search.split("=")[1] : 0;
  console.log(props.location.search);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHander = () => {
    props.history.push("/signin?redirect=shipping");
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>

        <ul>
          {cartItems &&
            cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img className="small" src={item.image} alt={item.name} />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.qty}</div>
                  <div>$ {item.price}</div>
                  <div>
                    <button onClick={() => removeFromCartHandler(item.product)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <button onClick={checkoutHander}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
