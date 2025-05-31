"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const isTextLike = ["text", "email", "password", "number", "search"].includes(
    type
  );

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={inputType}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring focus:ring-cOrange ${
          isTextLike ? "" : ""
        }`}
        {...rest}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
        </button>
      )}
    </div>
  );
};

export default Input;
