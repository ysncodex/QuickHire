import { Link } from 'react-router-dom';

const Button = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  to,
  ...props
}) => {
  const baseStyles =
    'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-center inline-block';

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',

    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',

    ghost:
      'bg-transparent text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 focus:ring-indigo-500 px-2',

    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent hover:border-red-700',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
