import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={css.errorContainer}>
      <div className={css.errorCard}>
        <p className={css.errorMessage}>😕 Oops! {message}</p>
      </div>
    </div>
  );
}
export default ErrorMessage;
