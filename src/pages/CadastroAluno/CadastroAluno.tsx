import "./styles.css";

import LoadingButton from "@mui/lab/LoadingButton";
import { MenuItem } from "@mui/material";
import { useMask } from "@react-input/mask";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Button from "@/components/Button";
import { FormikInput } from "@/components/FormikInput";
import { FormikPasswordInput } from "@/components/FormikPasswordInput";

import SelectCadastro from "../../components/SelectCadastro";

const CadastroAluno = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/(\w.+\s).+/, "Insira no mínimo 2 nomes")
      .required("Insira seu nome"),
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("Insira um e-mail"),
    telefone: Yup.string().required("Insira seu telefone"),
    cpf: Yup.string().required("Insira seu CPF"),
    matricula: Yup.string().required("Insira o seu número de matrícula"),
    orientador: Yup.string().required("Informe o nome do seu orientador"),
    titulacao: Yup.string()
      .required()
      .oneOf(["mestrado", "doutorado"])
      .required("Selecione uma titulação"),
    password: Yup.string()
      .min(8, ({ min }) => `A senha deve ter no mínimo ${min} caracteres`)
      .required("Insira uma senha"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Senhas não coincidem")
      .required("Insira a senha novamente"),
  });

  const cpfInputRef = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });

  const telefoneInputRef = useMask({
    mask: "(__) _____ ____",
    replacement: { _: /\d/ },
  });

  return (
    <Formik 
    initialValues={{
        name: "",
        cpf: "",
        email: "",
        telefone: "",
        matricula: "",
        orientador: "",
        titulacao: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <Form className="containerCadastro">
            <img src="assets/logopgcomp.png" width={110} />
            <div style={{ display: "flex", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormikInput
                  name="name"
                  label="Nome completo"
                  fullWidth
                  required
                />

                <FormikInput
                  name="email"
                  label="E-mail"
                  type="email"
                  fullWidth
                  required
                />

                <FormikInput
                  inputRef={telefoneInputRef}
                  name="telefone"
                  label="Telefone"
                  fullWidth
                  required
                />

                <FormikInput
                  inputRef={cpfInputRef}
                  name="cpf"
                  label="CPF"
                  fullWidth
                  required
                />

                <FormikPasswordInput
                  name="password"
                  label="Senha"
                  fullWidth
                  required
                />

                <FormikPasswordInput
                  name="confirmPassword"
                  label="Confirmar senha"
                  fullWidth
                  required
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormikInput
                  name="matricula"
                  label="Matrícula"
                  fullWidth
                  required
                />

                <FormikInput
                  name="orientador"
                  label="Orientador"
                  fullWidth
                  required
                />

                <FormikInput
                  fullWidth
                  variant="standard"
                  id="select-titulacao"
                  name="titulacao"
                  label="Titulação do curso"
                  select
                  required
                >
                  <MenuItem value="mestrado">Mestrado</MenuItem>
                  <MenuItem value="doutorado">Doutorado</MenuItem>
                </FormikInput>

                <SelectCadastro />
              </div>
            </div>

            <LoadingButton
              sx={{ marginTop: 2 }}
              variant="contained"
              fullWidth
              loading={isSubmitting}
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
            >
              Cadastrar
            </LoadingButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CadastroAluno;
