import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../api";

const UserPage = () => {
  const history = useHistory();
  const params = useParams();
  const { userId } = params;

  const [user, setUser] = useState(0);

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleReturnToAllUsers = () => {
    history.push("/users");
  };

  return (
    <>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <h3>Профессия: {user.profession.name}</h3>
          {user.qualities.map((qual) => (
            <p key={qual._id} className={"badge m-1 bg-" + qual.color}>
              {qual.name}
            </p>
          ))}
          <p>completedMeetings: {user.completedMeetings}</p>
          <h3>Rate: {user.rate}</h3>
          <button onClick={handleReturnToAllUsers}>Все Пользователи</button>
        </div>
      ) : (
        <h2>LOADING</h2>
      )}
    </>
  );
};

export default UserPage;
