import React, { useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15)
      return `${number} человек тусанет с тобой сегодня`;
    if ([2, 3, 4].indexOf(lastOne) >= 0)
      return `${number} человека тусанут с тобой сегодня`;
    if (lastOne === 1) return `${number} человек тусанет с тобой сегодня`;
  };

  if (users.length === 0) {
    return (
      <h2>
        <span className="badge bg-danger">Никто с тобой не тусанет</span>
      </h2>
    );
  }

  return (
    <>
      <h2>
        <span className="badge bg-primary">{renderPhrase(users.length)}</span>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встречи</th>
            <th>Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((quality) => {
                  return (
                    <span
                      key={quality._id}
                      className={"badge m-1 bg-" + quality.color}
                    >
                      {quality.name}
                    </span>
                  );
                })}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}/5</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
