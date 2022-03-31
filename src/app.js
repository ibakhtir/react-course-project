import React, { useState } from "react";
import Users from "./components/users";
import Status from "./components/status";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  return (
    <div>
      <Status length={users.length} />
      <Users
        onDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
        users={users}
      />
    </div>
  );
};

export default App;
