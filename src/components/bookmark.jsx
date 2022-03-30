import React from "react";

const BookMark = ({ user, ...rest }) => {
  const getBookmarkClass = () => {
    return user.bookmark === true
      ? "bi bi-bookmark-heart-fill"
      : "bi bi-bookmark";
  };

  return (
    <button>
      <i
        className={getBookmarkClass()}
        onClick={() => rest.onToggleBookmark(user._id)}
      ></i>
    </button>
  );
};

export default BookMark;
