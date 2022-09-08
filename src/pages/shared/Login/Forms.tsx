import {
  checkPassword,
  formattedEmail,
  formattedInteger,
  onlyDigits,
  sendData,
} from "../../../helpers/helpers";
import { useLoginForm } from "../../../hooks/useLoginForm";
import {
  APIPaths,
  APIResponseInterface,
  HTTPRequestMethods,
  LoginModes,
  LoginOptionInterface,
  PropsInterface,
} from "../../../helpers/interfaces";
import { PrimaryButton } from "../../reusableComponents";
import { FormInput } from "../../reusableComponents/Inputs/Inputs";
import { Options } from "./Options";
import { useRef } from "react";
import { useLoginTranslate } from "../../../hooks/useLoginTranslate";
import { useAuth } from "../../../hooks/useAuth";

export const SignUpForm: React.FC<LoginOptionInterface> = ({
  mode,
  formContainerRef,
  onModeChange,
}): JSX.Element => {
  const [form, handleChanges] = useLoginForm({
    document: "",
    email: "",
    password: "",
  });
  const [validateEmail, email] = formattedEmail(form.email ? form.email : "");
  const [validateDocument, document] = formattedInteger(form.document, 4, 10);
  const validatePassord = checkPassword(form.password ? form.password : "");
  form.document = document;
  form.email = email;
  const validateForm = validateDocument && validateEmail && validatePassord;
  const action = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log(form);
  };
  return (
    <div className="login__form-container">
      <form className="login__form">
        <FormInput
          label="Documento"
          name="document"
          value={form.document}
          placeholder="Ingrese su número de documento"
          type="text"
          onChange={handleChanges}
        />
        <FormInput
          label="Correo electrónico"
          name="email"
          value={form.email === undefined ? "" : form.email}
          placeholder="Ingrese su correo electrónico"
          type="text"
          onChange={handleChanges}
        />
        <FormInput
          label="Contraseña"
          name="password"
          value={form.password === undefined ? "" : form.password}
          placeholder="Ingrese su contraseña"
          type="password"
          onChange={handleChanges}
        />
        <PrimaryButton executeAction={validateForm} action={action}>
          Registrate
        </PrimaryButton>
      </form>
      <Options
        mode={mode}
        formContainerRef={formContainerRef}
        onModeChange={onModeChange}
      />
    </div>
  );
};

export const SignInForm: React.FC<LoginOptionInterface> = ({
  mode,
  formContainerRef,
  onModeChange,
}): JSX.Element => {
  const { login } = useAuth();
  const [form, handleChanges] = useLoginForm({
    document: "",
    password: "",
  });
  const [validateDocument, document] = formattedInteger(form.document, 4, 10);
  const validatePassord = form.password ? form.password.length > 0 : false;
  form.document = document;
  const validateForm = validateDocument && validatePassord;
  const action = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const data: FormData = new FormData();
    data.append(
      "login",
      JSON.stringify({
        username: onlyDigits(form.document),
        password: form.password,
      })
    );
    const response: APIResponseInterface = await sendData(
      `${APIPaths.BASE_URL}/login/`,
      HTTPRequestMethods.POST,
      data
    );
    login(response);
  };
  return (
    <div className="login__form-container">
      <form className="login__form">
        <FormInput
          label="Documento"
          name="document"
          value={form.document}
          placeholder="Ingrese su número de documento"
          type="text"
          onChange={handleChanges}
        />
        <FormInput
          label="Contraseña"
          name="password"
          value={form.password === undefined ? "" : form.password}
          placeholder="Ingrese su contraseña"
          type="password"
          onChange={handleChanges}
        />
        <PrimaryButton executeAction={validateForm} action={action}>
          Iniciar sesión
        </PrimaryButton>
      </form>
      <Options
        mode={mode}
        formContainerRef={formContainerRef}
        onModeChange={onModeChange}
      />
    </div>
  );
};

export const RecoveryForm: React.FC<LoginOptionInterface> = ({
  mode,
  formContainerRef,
  onModeChange,
}): JSX.Element => {
  const [form, handleChanges] = useLoginForm({
    document: "",
  });
  const [validateDocument, document] = formattedInteger(form.document, 4, 10);
  form.document = document;
  const action = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log(form);
  };
  return (
    <div className="login__form-container">
      <form className="login__form">
        <FormInput
          label="Documento"
          name="document"
          value={form.document}
          placeholder="Ingrese su número de documento"
          type="text"
          onChange={handleChanges}
        />
        <PrimaryButton executeAction={validateDocument} action={action}>
          Recupera el acceso
        </PrimaryButton>
      </form>
      <Options
        mode={mode}
        formContainerRef={formContainerRef}
        onModeChange={onModeChange}
      />
    </div>
  );
};

export const LoginForms: React.FC<PropsInterface> = () => {
  const formContainerRef: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  const [mode, setMode] = useLoginTranslate(
    LoginModes.SignIn,
    formContainerRef
  );
  return (
    <div ref={formContainerRef} className="login__slide">
      {mode === LoginModes.SignIn ? (
        <SignInForm
          mode={mode}
          formContainerRef={formContainerRef}
          onModeChange={(mode) => setMode(mode)}
        />
      ) : mode === LoginModes.SignUp ? (
        <SignUpForm
          mode={mode}
          formContainerRef={formContainerRef}
          onModeChange={(mode) => setMode(mode)}
        />
      ) : (
        <RecoveryForm
          mode={mode}
          formContainerRef={formContainerRef}
          onModeChange={(mode) => setMode(mode)}
        />
      )}
    </div>
  );
};
