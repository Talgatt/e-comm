import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  console.log("state", state);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords did not match");
    } else {
      dispatch(register(email, name, password));
    }

    // history.pu
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>Register</h1>

        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            value={name}
            id="name"
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            value={email}
            id="email"
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            id="password"
            placeholder={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            value={confirmPassword}
            id="confirmPassword"
            placeholder={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button className="primary" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
