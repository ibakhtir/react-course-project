import React from "react";
import User from "./user";

const Users = ({ users, ...rest }) => {
  if (users.length > 0) {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Качества</th>
              <th>Профессия</th>
              <th>Встречи</th>
              <th>Оценка</th>
              <th>Избранное</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user._id} user={user} {...rest} />
            ))}
          </tbody>
        </table>
      </>
    );
  } else {
    return "";
  }
};

export default Users;
