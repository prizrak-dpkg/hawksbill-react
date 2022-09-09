import {
  InputInterface,
  CornerRadiusInputInterface,
} from "../../../helpers/interfaces";

export const LoginInput: React.FC<InputInterface> = ({
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

export const FormInput: React.FC<CornerRadiusInputInterface> = ({
  label,
  paddingIcon,
  corners,
  ...rest
}): JSX.Element => {
  let cornersClasses: string = "";
  corners[0]
    ? (cornersClasses += " reusable__input--top-left-radius")
    : (cornersClasses += "");
  corners[1]
    ? (cornersClasses += " reusable__input--top-right-radius")
    : (cornersClasses += "");
  corners[2]
    ? (cornersClasses += " reusable__input--bottom-right-radius")
    : (cornersClasses += "");
  corners[3]
    ? (cornersClasses += " reusable__input--bottom-left-radius")
    : (cornersClasses += "");
  return (
    <div className="reusable">
      <label className="reusable__label">
        <span className="reusable__label-text">{label}</span>
        {paddingIcon ? (
          <div className="reusable__input--icon-container">
            <input
              className={`reusable__input reusable__input--padding-icon reusable__input--shadow${cornersClasses}`}
              {...rest}
            />
          </div>
        ) : (
          <input
            className={`reusable__input reusable__input--shadow${cornersClasses}`}
            {...rest}
          />
        )}
      </label>
    </div>
  );
};
