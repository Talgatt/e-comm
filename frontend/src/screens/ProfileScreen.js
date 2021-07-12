import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  console.log("userDetails", userDetails);

  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchEvent(updateUserProfile({ name, email, password }));
  };

  useEffect(() => {
    if (!user) {
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>User Profile</h1>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={name}
              placeholder="Enter password"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
        </ul>
      </form>
    </div>
  );
}
