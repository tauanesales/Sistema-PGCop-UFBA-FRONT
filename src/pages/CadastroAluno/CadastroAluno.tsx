import "./styles.css";

import LoadingButton from "@mui/lab/LoadingButton";
import { FormControlLabel, MenuItem, Radio, RadioGroup } from "@mui/material";
import { unformat, useMask } from "@react-input/mask";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { FormikDateField } from "@/components/FormikDateField";
import { FormikInput } from "@/components/FormikInput";
import { FormikPasswordInput } from "@/components/FormikPasswordInput";
import { useProfessoresQueries } from "@/queries/professores";
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

const cpfMaskOptions = {
  mask: "___.___.___-__",
  replacement: { _: /\d/ },
};

const telefoneMaskOptions = {
  mask: "(__) _____ ____",
  replacement: { _: /\d/ },
};

const CadastroAluno = () => {
  const { useCreateAluno, useCreateProfessor } = useUserQueries();

  const { mutate: createAluno } = useCreateAluno();

  const { mutate: createProfessor } = useCreateProfessor();

  const { useGetProfessores } = useProfessoresQueries();

  const { data: professores = [] } = useGetProfessores();

  const [tipoCadastro, setTipoCadastro] = useState<"aluno" | "professor">(
    "aluno",
  );

  const handleSignUp = (
    values: Values,
    formikHelpers: FormikHelpers<Values>,
  ) => {
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
        data_ingresso: (data_ingresso as Date).toISOString().split("T")[0],
        data_defesa: null,
        data_qualificacao: null,
        lattes,
        matricula,
        telefone: unformat(telefone, telefoneMaskOptions),
        cpf: unformat(cpf, cpfMaskOptions),
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
        ? Yup.number().required("Selecione um orientador")
        : Yup.string().notRequired(),
    data_ingresso: Yup.date()
      .required("Insira uma data")
      .max(new Date(), "Escolha uma data no passado"),
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

  const cpfInputRef = useMask(cpfMaskOptions);

  const telefoneInputRef = useMask(telefoneMaskOptions);

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
                    select
                    required
                  >
                    {professores.map((professor) => (
                      <MenuItem key={professor.id} value={professor.id}>
                        {professor.nome}
                      </MenuItem>
                    ))}
                  </FormikInput>

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

                  <FormikDateField
                    required
                    variant="standard"
                    name="data_ingresso"
                    label="Data de ingresso"
                  />

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
