import cx from 'classnames';

interface UIThemes {
  primary: string;
  secondary: string;
  info: string;
  success: string;
  warning: string;
  danger: string;
}

interface UISizes {
  small: string;
  base: string;
  large: string;
}

interface UIButton extends React.ButtonHTMLAttributes<unknown> {
  loading?: boolean;
  rounded?: boolean;
  size?: keyof UISizes;
  theme?: keyof UIThemes;
}

const themes: UIThemes = {
  primary: 'bg-primary-base hover:bg-primary-dark focus:ring-primary-light',
  secondary:
    'bg-secondary-base hover:bg-secondary-dark focus:ring-secondary-light',
  info: 'bg-info-base hover:bg-info-dark focus:ring-info-light',
  success: 'bg-success-base hover:bg-success-dark focus:ring-success-light',
  warning: 'bg-warning-base hover:bg-warning-dark focus:ring-warning-light',
  danger: 'bg-danger-base hover:bg-danger-dark focus:ring-danger-light',
};

const disabledThemes: UIThemes = {
  primary: 'bg-primary-light hover:bg-primary-light focus:ring-primary-light',
  secondary:
    'bg-secondary-light hover:bg-secondary-light focus:ring-secondary-light',
  info: 'bg-info-light hover:bg-info-light focus:ring-info-light',
  success: 'bg-success-light hover:bg-success-light focus:ring-success-light',
  warning: 'bg-warning-light hover:bg-warning-light focus:ring-warning-light',
  danger: 'bg-danger-light hover:bg-danger-light focus:ring-danger-light',
};

const sizes: UISizes = {
  small: 'py-1 px-2',
  base: 'py-2 px-4',
  large: 'py-3 px-6',
};

function Button({
  children,
  className,
  disabled,
  loading,
  rounded,
  size = 'base',
  theme = 'primary',
  ...rest
}: UIButton) {
  return (
    <button
      className={cx(
        'font-semibold text-white shadow-md duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75',
        disabled || loading ? disabledThemes[theme] : themes[theme],
        sizes[size],
        {
          rounded,
          'cursor-pointer': !disabled,
          'cursor-not-allowed': disabled,
          'cursor-wait': !disabled && loading,
        },
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
