import { ButtonInterface } from "../../../helpers/interfaces";

export const PrimaryButton: React.FC<ButtonInterface> = ({
  children,
  executeAction,
}): JSX.Element => {
  return (
    <div className="reusable__button">
      <button className="reusable__primary-button" disabled={!executeAction}>
        {children}
      </button>
    </div>
  );
};
