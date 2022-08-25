import { InputInterface } from "../../../helpers/interfaces";

export const FormInput: React.FC<InputInterface> = ({
  label,
  ...rest
}): JSX.Element => {
  return (
    <div className="reusable">
      <label className="reusable__label">
        <span className="reusable__label-text">{label}</span>
        <input className="reusable__input" {...rest} />
      </label>
    </div>
  );
};
