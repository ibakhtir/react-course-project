import React from "react";
import PropTypes from "prop-types";

import Quality from "./quality";
import { useQualities } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
  const { isLoading, getQuality } = useQualities();

  if (!isLoading) {
    return (
      <>
        {qualities.map((qual) => (
          <Quality
            key={getQuality(qual)._id}
            name={getQuality(qual).name}
            color={getQuality(qual).color}
          />
        ))}
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
