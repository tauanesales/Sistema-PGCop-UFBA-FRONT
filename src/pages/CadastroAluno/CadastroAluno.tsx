import "./styles.css";

import LoadingButton from "@mui/lab/LoadingButton";
import { FormControlLabel, MenuItem, Radio, RadioGroup } from "@mui/material";
import { useMask } from "@react-input/mask";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { FormikInput } from "@/components/FormikInput";
import { FormikPasswordInput } from "@/components/FormikPasswordInput";
import SelectCadastro from "@/components/SelectCadastro";

import { useUserQueries } from "@/queries/user";

type Values = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
  matricula: string;
  orientador_id: number | "";
  data_ingresso: Date | null;
  lattes: string;
  curso: "M" | "D" | "";
  senhaConfirmada: string;
};

const CadastroAluno = () => {
  const { useCreateAluno, useCreateProfessor } = useUserQueries();

  const { mutate: createAluno } = useCreateAluno();

  const { mutate: createProfessor } = useCreateProfessor();

  const [tipoCadastro, setTipoCadastro] = useState<"aluno" | "professor">(
    "aluno",
  );

  const handleSignUp = (values: Values) => {
    const {
      cpf,
      telefone,
      matricula,
      orientador_id,
      data_ingresso,
      lattes,
      curso,
      nome,
      email,
      senha,
    } = values;

    if (tipoCadastro === "aluno") {
      createAluno({
        nome,
        email,
        senha,
        orientador_id: orientador_id as number,
        curso: curso as "M" | "D",
        data_ingresso: data_ingresso as Date,
        data_defesa: null,
        data_qualificacao: null,
        lattes,
        matricula,
        telefone,
        cpf,
      });
    } else {
      createProfessor({ nome, email, senha });
    }
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .matches(/(\w.+\s).+/, "Insira no mínimo 2 nomes")
      .required("Insira seu nome"),
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("Insira um e-mail"),
    telefone: Yup.string().required("Insira seu telefone"),
    cpf: Yup.string().required("Insira seu CPF"),
    lattes: Yup.string().required("Insira o link para seu perfil no Lattes"),
    matricula:
      tipoCadastro === "aluno"
        ? Yup.string().required("Insira o seu número de matrícula")
        : Yup.string().notRequired(),
    orientador_id:
      tipoCadastro === "aluno"
        ? Yup.string().required("Informe o nome do seu orientador")
        : Yup.string().notRequired(),
    curso: Yup.string()
      .required()
      .oneOf(["M", "D"])
      .required("Selecione uma titulação"),
    senha: Yup.string()
      .min(8, ({ min }) => `A senha deve ter no mínimo ${min} caracteres`)
      .required("Insira uma senha"),
    senhaConfirmada: Yup.string()
      .oneOf([Yup.ref("senha")], "Senhas não coincidem")
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
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        matricula: "",
        orientador_id: "",
        data_ingresso: null,
        lattes: "",
        curso: "",
        senha: "",
        senhaConfirmada: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form className="containerPrincipal">
          <img src="assets/logoPgcop.png" width={110} />

          <RadioGroup
            row
            aria-label="tipo-cadastro"
            name="tipo-cadastro"
            value={tipoCadastro}
            onChange={(e) =>
              setTipoCadastro(e.target.value as "aluno" | "professor")
            }
          >
            <FormControlLabel
              value="aluno"
              control={<Radio color="primary" />}
              label="Aluno"
            />
            <FormControlLabel
              style={{ marginRight: "400px" }}
              value="professor"
              control={<Radio color="primary" />}
              label="Professor"
            />
          </RadioGroup>

          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FormikInput
                name="nome"
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
                name="senha"
                label="Senha"
                fullWidth
                required
              />

              <FormikPasswordInput
                name="senhaConfirmada"
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
                    name="orientador_id"
                    label="Orientador"
                    fullWidth
                    required
                  />
                  <FormikInput
                    fullWidth
                    variant="standard"
                    id="select-curso"
                    name="curso"
                    label="Titulação do curso"
                    select
                    required
                  >
                    <MenuItem value="M">Mestrado</MenuItem>
                    <MenuItem value="D">Doutorado</MenuItem>
                  </FormikInput>

                  <div className="inputData">
                    <SelectCadastro />
                  </div>

                  <FormikInput
                    name="lattes"
                    label="Link para o Lattes"
                    fullWidth
                    required
                  />
                </div>
              )}

              {tipoCadastro === "professor" && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormikInput
                    className="inputRow"
                    style={{ width: "240px" }}
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
            <LoadingButton
              className="bttn"
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
