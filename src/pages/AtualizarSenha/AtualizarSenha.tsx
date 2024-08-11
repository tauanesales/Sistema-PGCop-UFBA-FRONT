import "./styles.css";

import { ErrorMessage, Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { FormikHTMLInput } from "@/components/FormikHTMLInput";
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
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleResetPassword}
    >
      <Form
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          width: "350px",
          height: "500px",
          textAlign: "center",
        }}
      >
        <img src={logoPgcop} width={110} />

        <h4>Atualizar Senha</h4>
        {/* Campo Nova Senha */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <FormikHTMLInput
            name="password"
            required
            type="password"
            placeholder="Nova Senha"
            style={{
              width: "90%",
              padding: "12px",
              borderRadius: "5px",
              backgroundColor: "#d3d3d3",
              color: "#333",
              fontSize: "14px",
              border: "1px solid #ccc",
            }}
          />
          <ErrorMessage name="password" />
        </div>

        {/* Campo Confirmar Nova Senha */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <FormikHTMLInput
            name="confirmPassword"
            type="password"
            placeholder="Digite Novamente"
            style={{
              width: "90%",
              padding: "12px",
              borderRadius: "5px",
              backgroundColor: "#d3d3d3",
              color: "#333",
              fontSize: "14px",
              border: "1px solid #ccc",
            }}
          />
          <ErrorMessage name="confirmPassword" />
        </div>

        <button
          disabled={isPending}
          style={{
            padding: "5px 5px",
            borderRadius: "5px",
            fontSize: "15px",
          }}
        >
          {isPending ? "Carregando..." : "Atualizar Senha"}
        </button>
      </Form>
    </Formik>
  );
}

export default AtualizarSenha;
