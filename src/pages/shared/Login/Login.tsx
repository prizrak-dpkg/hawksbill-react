import { PropsInterface } from "../../../helpers/interfaces";
import { LoginForms } from "./Forms";
import { Logo } from "./Logo";
import { SocialNetwork } from "./SocialNetwork";

export const Login: React.FC<PropsInterface> = (): JSX.Element => {
  return (
    <div className="login">
      <div className="login__container">
        <Logo />
        <LoginForms />
        <SocialNetwork />
      </div>
    </div>
  );
};
