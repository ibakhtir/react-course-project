import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (id) => {
    const bookmarkState = [...users];
    for (let state of bookmarkState) {
      if (state._id === id) {
        state.bookmark = !state.bookmark;
      }
    }

    setUsers(bookmarkState);
  };

  return (
    <div>
      {<SearchStatus length={users.length} />}

      {
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookmark={handleToggleBookmark}
        />
      }
    </div>
  );
};

export default App;
