import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listUsers } from "../actions/userActions";

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error ...</div>
  ) : (
    <div>
      <strong>Users</strong>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>IS SELLER</th>
            <th>IS ADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.isSeller ? "YES" : "NO"}</td>
              <td>{item.isAdmin ? "YES" : "NO"}</td>
              <td>
                <button onClick={() => props.history.push(`/users/`)}>
                  Edit
                </button>
                {/* <button onClick={()=>deleteUserHandler(item)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
