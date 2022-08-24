import {
  checkPassword,
  formattedEmail,
  formattedInteger,
} from "../../../helpers/helpers";
import { useLoginForm } from "../../../hooks/useLoginForm";
import {
  LoginModes,
  LoginOptionInterface,
  PropsInterface,
} from "../../../helpers/interfaces";
import { PrimaryButton } from "../../reusableComponents";
import { FormInput } from "../../reusableComponents/Inputs/Inputs";
import { Options } from "./Options";
import { useRef } from "react";
import { useLoginTranslate } from "../../../hooks/useLoginTranslate";

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
        <PrimaryButton executeAction={validateForm}>Registrate</PrimaryButton>
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
  const [form, handleChanges] = useLoginForm({
    document: "",
    password: "",
  });
  const [validateDocument, document] = formattedInteger(form.document, 4, 10);
  const validatePassord = form.password ? form.password.length > 0 : false;
  form.document = document;
  const validateForm = validateDocument && validatePassord;
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
        <PrimaryButton executeAction={validateForm}>
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
        <PrimaryButton executeAction={validateDocument}>
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
