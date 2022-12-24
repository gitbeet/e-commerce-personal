import React from "react";

const CloseButton = ({ onClick }) => {
  return (
    <i
      onClick={onClick}
      className=" cursor-pointer fa fa-close text-neutral-400 hover:text-primary-500 transition-all duration-75"
    />
  );
};

export default CloseButton;
