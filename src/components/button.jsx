"use client"

import Spinner from "./spinner";


const Button = ({ label, theme = 'primary', isLoading = false, disabled, ...rest }) => {
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const themes = {
    primary: 'bg-cOrange text-white hover:opacity-70 focus:ring-blue-500',
    secondary: 'bg-cGray text-gray-900 hover:opacity-70 focus:ring-gray-300',
    ghost: 'bg-transparent text-gray-900 hover:opacity-70 focus:ring-gray-200',
  };

  const themeClasses = themes[theme] || themes.primary;

  return (
    <button
      className={`${baseStyles} ${themeClasses}`}
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
    </button>
  );
};

export default Button;