import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  updateProduct,
} from "../actions/productActions";
import ProductScreen from "./ProductScreen";

export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error ...</div>
  ) : (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <button
                  onClick={() =>
                    props.history.push(`/product/${product._id}/edit`)
                  }
                >
                  Edit
                </button>
                <button onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
