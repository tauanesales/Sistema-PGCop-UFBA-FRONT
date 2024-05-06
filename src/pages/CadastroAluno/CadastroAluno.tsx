import "./styles.css";

import {
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useMask } from "@react-input/mask";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { FormikInput } from "@/components/FormikInput";
import { FormikPasswordInput } from "@/components/FormikPasswordInput";
import { MaterialInput } from "@/components/MaterialInput";

import SelectCadastro from "../../components/SelectCadastro";

const CadastroAluno = () => {
  const [tipoCadastro, setTipoCadastro] = useState("aluno");
  const [tipoProfessor, setTipoProfessor] = useState("aluno");

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
    <div className="containerPrincipal">
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
          lattes: "",
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
                  <FormLabel id="user-type-radio-buttons-group-label">
                    Eu sou
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="user-type-radio-buttons-group-label"
                    value={tipoCadastro}
                    onChange={(_, value) => setTipoCadastro(value)}
                    name="user-type-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="aluno"
                      control={<Radio />}
                      label="Aluno"
                    />
                    <FormControlLabel
                      value="professor"
                      control={<Radio />}
                      label="Professor"
                    />
                  </RadioGroup>
                  <FormikInput
                    name="name"
                    label="Nome completo"
                    fullWidth
                    required
                  />
                  {tipoCadastro === "aluno" && (
                    <>
                      <FormikInput
                        name="matricula"
                        label="Matrícula"
                        fullWidth
                        required
                      />
                      <div className="row">
                        <FormikInput
                          inputRef={cpfInputRef}
                          name="cpf"
                          label="CPF"
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
                      </div>
                    </>
                  )}
                  <div className="row">
                    <FormikInput
                      name="email"
                      label="E-mail"
                      type="email"
                      fullWidth
                      required
                    />
                    {tipoCadastro === "aluno" ? (
                      <FormikInput
                        fullWidth
                        size="small"
                        id="select-titulacao"
                        name="titulacao"
                        label="Titulação do curso"
                        select
                        required
                      >
                        <MenuItem value="mestrado">Mestrado</MenuItem>
                        <MenuItem value="doutorado">Doutorado</MenuItem>
                      </FormikInput>
                    ) : (
                      <MaterialInput
                        fullWidth
                        variant="standard"
                        id="select-tipo-professor"
                        label="Função"
                        value={tipoProfessor}
                        onChange={(event) =>
                          setTipoProfessor(event.target.value)
                        }
                        select
                        required
                      >
                        <MenuItem value="orientador">Orientador</MenuItem>
                        <MenuItem value="coordenador">Coordenador</MenuItem>
                      </MaterialInput>
                    )}
                  </div>

                  {tipoCadastro === "aluno" && (
                    <>
                      <FormikInput
                        inputRef={telefoneInputRef}
                        name="lattes"
                        label="Currículo Lattes"
                        fullWidth
                        required
                      />
                      <div className="row">
                        <SelectCadastro />
                        <FormikInput
                          name="orientador"
                          label="Orientador"
                          fullWidth
                          required
                        />
                      </div>
                    </>
                  )}
                  <div className="row">
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
                </div>
              </div>

              <div className="buttonCadastro">
                <button onClick={() => handleSubmit()} disabled={isSubmitting}>
                  Cadastrar
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CadastroAluno;
