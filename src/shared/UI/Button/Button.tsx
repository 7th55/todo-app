// Styles
import classes from './styles.module.css';
type ButtonProps = {
  variant?: 'outline';
  onClickHandler?: (...arg: any) => any;
  style?: React.CSSProperties;
  className?: string;
  children: any;
};

export const Button = (props: ButtonProps) => {
  const { variant, onClickHandler, children, style, className } = props;
  let buttonClass;

  switch (variant) {
    case 'outline':
      buttonClass = classes.outlineButton;
      break;
    default:
      buttonClass = classes.button;
  }

  return (
    <button
      style={style}
      className={`${buttonClass} ${className}`}
      onClick={(e) => {
        onClickHandler && onClickHandler(e);
      }}
    >
      {children}
    </button>
  );
};
