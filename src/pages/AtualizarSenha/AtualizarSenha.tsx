import "./styles.css";

import { ErrorMessage, Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Input from "@/components/Input";
import ButtonSecondary from "@/components/ButtonSecondary";
import { useUserQueries } from "@/queries/user";

const logoPgcop = "/assets/logoPgcop.png";

type Values = {
  password: string;
  confirmPassword: string;
};

function AtualizarSenha() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, token } = location.state || {};
  const { useResetPassword } = useUserQueries();
  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleResetPassword = (values: Values) =>
    resetPassword(
      { email, token, senha: values.password },
      { onSuccess: () => navigate("/confirmar-nova-senha") },
    );

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, ({ min }) => `A senha deve ter no mínimo ${min} caracteres`)
      .required("Insira uma senha"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Senhas não coincidem")
      .required("Insira a senha novamente"),
  });

  return (
    <div className="container">
      <div className="containerCard">
        <img src={logoPgcop} width={130} />
        <h1>Atualizar Senha</h1>
        <p>Informe a nova senha para atualizar seu acesso.</p>

        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting, handleSubmit }) => (
            <div className="containInput">
              {/* Campo Nova Senha */}
              <Input
                name="password"
                type="password"
                label="Nova Senha:"
                placeholder="Digite a nova senha"
                required
                style={{ marginBottom: ".5em" }}
              />
              <ErrorMessage name="password" component="div" />

              {/* Campo Confirmar Nova Senha */}
              <Input
                name="confirmPassword"
                type="password"
                label="Confirmar Senha:"
                placeholder="Digite a senha novamente"
                required
                style={{ marginBottom: ".5em" }}
              />
              <ErrorMessage name="confirmPassword" component="div" />

              <ButtonSecondary
                type="submit"
                label={isPending ? "Carregando..." : "Atualizar Senha"}
                style={{ width: "12em", alignSelf: "center" }}
                disabled={isSubmitting || isPending}
                onClick={() => handleSubmit()}
              />
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AtualizarSenha;
