import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
  const getBookmarkClass = () => {
    return status ? "bi bi-bookmark-heart-fill" : "bi bi-bookmark";
  };

  return (
    <button {...rest}>
      <i className={getBookmarkClass()}></i>
    </button>
  );
};

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired
};

export default Bookmark;
