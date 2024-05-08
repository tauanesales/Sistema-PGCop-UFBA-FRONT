import { useState } from 'react';
import "./styles.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { MenuItem, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useMask } from "@react-input/mask";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikInput } from "@/components/FormikInput";
import { FormikPasswordInput } from "@/components/FormikPasswordInput";
import SelectCadastro from "@/components/SelectCadastro";

const CadastroAluno = () => {
  const [tipoCadastro, setTipoCadastro] = useState<"aluno" | "professor">("aluno");

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/(\w.+\s).+/, "Insira no mínimo 2 nomes")
      .required("Insira seu nome"),
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("Insira um e-mail"),
    telefone: Yup.string().required("Insira seu telefone"),
    cpf: Yup.string().required("Insira seu CPF"),
    matricula: tipoCadastro === "aluno" ? Yup.string().required("Insira o seu número de matrícula") : Yup.string().notRequired(),
    orientador: tipoCadastro === "aluno" ? Yup.string().required("Informe o nome do seu orientador") : Yup.string().notRequired(),
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
      {({ isSubmitting, handleSubmit }) => (
        <Form className="containerPrincipal">
          <img src="assets/logoPgcop.png" width={110} />
          
          <RadioGroup
            row
            aria-label="tipo-cadastro"
            name="tipo-cadastro"
            value={tipoCadastro}
            onChange={(e) => setTipoCadastro(e.target.value as "aluno" | "professor")}
          >
            <FormControlLabel 
              value="aluno"
              control={<Radio color="primary" />}
              label="Aluno"
            />
            <FormControlLabel style={{marginRight:'400px'}}
              value="professor"
              control={<Radio color="primary" />}
              label="Professor"
            />
          </RadioGroup>

          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
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

            <div style={{ display: "flex", flexDirection: "column" }}>
              {tipoCadastro === "aluno" && (
                <div style={{ display: "flex", flexDirection: "column" }}>
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

                  <div className="inputData">
                    <SelectCadastro />
                  </div>
                </div>
              )}

              {tipoCadastro === "professor" && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormikInput className="inputRow" style={{ width: '240px' }}
                    fullWidth
                    variant="standard"
                    id="select-funcao"
                    name="Função"
                    label="Função"
                    select
                    required
                  >
                    <MenuItem value="professor">Professor</MenuItem>
                    <MenuItem value="coordenador">Coordenador</MenuItem>
                  </FormikInput>
                </div>
              )}
            </div>
          </div>

          <div className="buttonCadastro">
            <LoadingButton className="bttn"
              sx={{ marginTop: 2 }}
              variant="contained"
              fullWidth
              loading={isSubmitting}
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
            >
              Cadastrar
            </LoadingButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CadastroAluno;