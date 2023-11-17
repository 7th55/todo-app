// Styles
import classes from './styles.module.css';

type InputProps = {
  value: string;
  placeholder: string;
  error?: {
    message: string;
    isOpen: boolean;
  };
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: InputProps) => {
  const { value, onChangeHandler, error, placeholder } = props;

  return (
    <div className={classes.inputBox}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeHandler(e)}
      />
      {error && error.isOpen && (
        <div className={classes.errorBox}>
          <p className={classes.errorMessage}>{error.message}</p>
        </div>
      )}
    </div>
  );
};
