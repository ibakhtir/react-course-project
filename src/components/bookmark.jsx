import React from "react";

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

export default Bookmark;
