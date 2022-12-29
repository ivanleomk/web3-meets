import React from "react";

type SecondaryButtonProps = {
  text: string;
  onClickHandler: () => void;
};

const SecondaryButton = ({ text, onClickHandler }: SecondaryButtonProps) => {
  return (
    <button
      onClick={onClickHandler}
      className="flex w-full justify-center border border-transparent  py-2 px-4 text-sm font-medium text-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
