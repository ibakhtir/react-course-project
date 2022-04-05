import React from "react";
import PropTypes from "prop-types";

const Status = ({ length }) => {
  const getBadgeStyle = () => {
    return length === 0 ? "badge bg-danger" : "badge bg-primary";
  };

  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number === 0) {
      return "Никто с тобой не тусанет";
    }

    if (lastOne === 1) {
      return `${number} человек тусанет с тобой сегодня`;
    }

    if (number > 4 && number < 15) {
      return `${number} человек тусанет с тобой сегодня`;
    }

    if ([2, 3, 4].indexOf(lastOne) >= 0) {
      return `${number} человека тусанут с тобой сегодня`;
    }
  };

  return (
    <h2>
      <span className={getBadgeStyle()}>{renderPhrase(length)}</span>
    </h2>
  );
};

Status.propTypes = {
  length: PropTypes.number.isRequired
};

export default Status;
