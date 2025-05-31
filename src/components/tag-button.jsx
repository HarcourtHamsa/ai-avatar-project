import React from "react";

const TagButton = ({ list, active, handleChange }) => {
  return (
    <div className="bg-white border border-cOrange rounded-full w-fit overflow-x-auto flex justify-between gap-2">
      {list.map((tag, index) => (
        <button
          onClick={() => handleChange(tag)}
          key={index}
          className={`${
            active === tag
              ? "border border-cOrange bg-cOrange text-white"
              : "text-cBlack border border-transparent"
          } text-sm sm:text-base rounded-full py-2 px-4 sm:px-5 font-medium transition-colors whitespace-nowrap`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagButton;
