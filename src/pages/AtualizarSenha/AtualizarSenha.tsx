import "./styles.css";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import { FormikHTMLInput } from "@/components/FormikHTMLInput";

const logoPgcop = "/assets/logoPgcop.png";

function AtualizarSenha() {
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
      onSubmit={() => {}}
    >
      {({ isSubmitting, handleSubmit }) => (
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
          <h4>Digite o CPF</h4>
          {/* Campo CPF */}
          <div style={{ position: "relative", marginBottom: "15px" }}>
            <FormikHTMLInput
              name="cpf"
              type="number"
              placeholder="CPF"
              style={{
                width: "90%",
                padding: "8px",
                borderRadius: "5px",
                backgroundColor: "#d3d3d3",
                color: "#333",
                fontSize: "14px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>

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
          </div>

          {/* Campo Confirmar Nova Senha */}
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
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
          </div>

          <button
            disabled={isSubmitting}
            onClick={() => handleSubmit()}
            style={{
              padding: "5px 5px",
              borderRadius: "5px",
              fontSize: "15px",
            }}
          >
            Atualizar Senha
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default AtualizarSenha;
