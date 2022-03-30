import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ user, ...rest }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((qualitie) => (
          <Qualitie
            key={qualitie._id}
            color={qualitie.color}
            name={qualitie.name}
          />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <BookMark user={user} {...rest} />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => rest.onDelete(user._id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default User;
