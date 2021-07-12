import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";

export default function ShippingAddressScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);

  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;

    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }

    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        "You did not set your location on map. Continue?"
      );
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          country,
          postalCode,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push("/payment");
    }
  };

  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    props.history.push("/map");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>Shipping Address</h1>

        <div>
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Address: </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="city">City: </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="country">Country: </label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code: </label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="chooseOnMap">Location</label>
          {/* <button onClick={() => props.history.push("/map")}> */}
          <button type="button" onClick={chooseOnMap}>
            Choose On Map
          </button>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
