import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    }
    dispatch(detailsProduct(productId));

    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setBrand(product.brand);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };

  const {
    userSignin: { userInfo },
  } = useSelector((state) => state.userSignin);

  const uploadFileHandler = async (e) => {
    //e.preventDefault();
    const file = e.target.files[0];
    // console.log("file");
    // console.log(file);

    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
    } catch {}
  };

  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <ul>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="image">Name</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="imageFile">Name</label>
            <input
              type="file"
              id="imageFile"
              value={image}
              onChange={uploadFileHandler}
            />
          </li>
          <li>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="countInStock">Count In Stock</label>
            <input
              type="text"
              id="countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="brand">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </li>
          <li>
            <button className="primary">Update</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
