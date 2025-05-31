"use client";

import Spinner from "./spinner";

const Button = ({
  label,
  theme = "primary",
  isLoading = false,
  className,
  disabled,
  icon,
  ...rest
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded-md transition-colors w-full duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium select-none";

  const themes = {
    primary: "bg-cOrange text-white hover:opacity-70 focus:ring-blue-500",
    secondary: "bg-cGray text-white hover:opacity-70 focus:ring-gray-300",
    pink: "bg-cPink text-white hover:opacity-70 focus:ring-gray-300",
    danger: "bg-red-500 text-white hover:opacity-70 focus:ring-red-500",
    white: "bg-white text-gray-900 hover:opacity-70 focus:ring-gray-200",
    ghost: "bg-transparent text-gray-900 hover:opacity-70 focus:ring-gray-200",
  };

  const themeClasses = themes[theme] || themes.primary;

  return (
    <button
      className={`${baseStyles} ${themeClasses} ${className}`}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Spinner size={18} />
          <span>Loading...</span>
        </div>
      ) : (
        label
      )}

      {/* Icon */}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
