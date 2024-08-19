import "./styles.css";

import LoadingButton from "@mui/lab/LoadingButton";
import { MenuItem } from "@mui/material";
import { format, unformat, useMask } from "@react-input/mask";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { FormikDateField } from "@/components/FormikDateField";
import { FormikInput } from "@/components/FormikInput";
import { TipoUsuario } from "@/models/User";
import { useProfessoresQueries } from "@/queries/professores";
import { useUserQueries } from "@/queries/user";
import { Button, Spinner } from "react-bootstrap";

type Values = {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  matricula: string;
  orientador_id: number | null;
  data_ingresso: Date | null;
  lattes: string;
  curso: "M" | "D" | "";
};

const cpfMaskOptions = {
  mask: "___.___.___-__",
  replacement: { _: /\d/ },
};

const telefoneMaskOptions = {
  mask: "(__) _____-____",
  replacement: { _: /\d/ },
};

export const EditarDados = () => {
  const navigate = useNavigate();

  const { useGetUser, useUpdateUser } = useUserQueries();

  const { mutate: updateUser } = useUpdateUser();

  const { data: user } = useGetUser();

  const { useGetProfessores } = useProfessoresQueries();

  const { data: professores = [] } = useGetProfessores();

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
    } = values;

    const payload = {
      nome,
      email,
      ...(user!.tipo_usuario === TipoUsuario.ALUNO && {
        orientador_id: orientador_id as number,
        curso: curso as "M" | "D",
        data_ingresso: (data_ingresso as Date).toISOString().split("T")[0],
        lattes,
        matricula,
        telefone: unformat(telefone, telefoneMaskOptions),
        cpf: unformat(cpf, cpfMaskOptions),
      }),
    };

    updateUser(payload, {
      onSettled: () => {
        formikHelpers.setSubmitting(false);
        navigate(-1); // Redireciona para a página anterior
      },
    });
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .matches(/(\w.+\s).+/, "Insira no mínimo 2 nomes")
      .required("Insira seu nome"),
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("Insira um e-mail"),
    telefone: Yup.string().when("tipo_usuario", {
      is: TipoUsuario.ALUNO,
      then: (schema) => schema.required("Insira seu telefone"),
    }),
    cpf: Yup.string().when("tipo_usuario", {
      is: TipoUsuario.ALUNO,
      then: (schema) => schema.required("Insira seu CPF"),
    }),
    lattes: Yup.string().when("tipo_usuario", {
      is: TipoUsuario.ALUNO,
      then: (schema) =>
        schema.required("Insira o link para seu perfil no Lattes"),
    }),
    matricula: Yup.string().when("tipo_usuario", {
      is: TipoUsuario.ALUNO,
      then: (schema) => schema.required("Insira o seu número de matrícula"),
    }),
    orientador_id: Yup.string().when("tipo_usuario", {
      is: TipoUsuario.ALUNO,
      then: (schema) => schema.required("Selecione um orientador"),
    }),
    data_ingresso: Yup.date().when("tipo_usuario", {
      is: TipoUsuario.ALUNO,
      then: (schema) =>
        schema
          .required("Insira uma data")
          .max(new Date(), "Escolha uma data no passado"),
      otherwise: (schema) => schema.notRequired(),
    }),
    curso: Yup.string().when("tipo_usuario", {
      is: TipoUsuario.ALUNO,
      then: (schema) =>
        schema.required().oneOf(["M", "D"]).required("Selecione uma titulação"),
    }),
  });

  const cpfInputRef = useMask(cpfMaskOptions);

  const telefoneInputRef = useMask(telefoneMaskOptions);

  return (
    <Formik
      initialValues={{
        nome: user!.nome,
        email: user!.email,
        cpf:
          user?.tipo_usuario === TipoUsuario.ALUNO
            ? format(user.cpf, cpfMaskOptions)
            : "",
        telefone: user?.tipo_usuario === TipoUsuario.ALUNO ? user.telefone : "",
        matricula:
          user?.tipo_usuario === TipoUsuario.ALUNO ? user.matricula : "",
        orientador_id:
          user?.tipo_usuario === TipoUsuario.ALUNO ? user.orientador.id : null,
        data_ingresso:
          user?.tipo_usuario === TipoUsuario.ALUNO
            ? new Date(user.data_ingresso)
            : null,
        lattes: user?.tipo_usuario === TipoUsuario.ALUNO ? user.lattes : "",
        curso: user?.tipo_usuario === TipoUsuario.ALUNO ? user.curso : "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form>
          <div className="containerPrincipal">
            <img src="/assets/logoPgcop.png" width={90} alt="LogoPGCOP" className="logoPgcop" />
            <h1>Editar dados</h1>

            <div className="containInputs">
              <div className="fisrtColumn">
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
              </div>

              {user!.tipo_usuario === TipoUsuario.ALUNO ? (
                <div className="fisrtColumn">
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
              ) : (
                <div className="fisrtColumn">
                    <FormikInput
                      className="inputRow"
                      style={{ width: "240px" }}
                      fullWidth
                      variant="standard"
                      id="select-tipo-usuario"
                      name="tipo_usuario"
                      label="Função"
                      select
                      required
                    >
                      <MenuItem value={TipoUsuario.PROFESSOR}>
                        Orientador
                      </MenuItem>
                      <MenuItem value={TipoUsuario.COORDENADOR}>
                        Coordenador
                      </MenuItem>
                    </FormikInput>
                </div>
              )}
            </div>

            <div
              className="containerButtons"
            >
              <Button
                  className="bttnCadastro bttnVermelho"
                  onClick={() => navigate('/login')}
                >
                  Voltar
                </Button>
                <Button
                  className="bttnCadastro bttnVerde"
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        variant="dark"
                        role="status"
                        aria-hidden="true"
                      />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    'Salvar'
                  )}
                </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
