import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={css.errorContainer}>
      <div className={css.errorCard}>
        <div className={css.errorIcon}>😕</div>
        <h3 className={css.errorTitle}>Oops! Something went wrong</h3>
        <p className={css.errorMessage}>{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
