import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UsersList = ({ user }) => {
  return (
    <>
      {
        <Link key={user._id} to={`users/${user._id}`}>
          {user.name}
        </Link>
      }
    </>
  );
};

UsersList.propTypes = {
  user: PropTypes.object.isRequired
};

export default UsersList;
