import { camelizeKeys } from "humps";

import { Aluno, Professor, User } from "@/models/User";

import api from "./config";

export const getUser = (accessToken?: string) =>
  api.get<User>("/usuarios/me", {
    headers: {
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  });

type CreateAlunoRequestData = Omit<Aluno, "id" | "orientador"> & {
  senha: string;
};

export const createAluno = (data: CreateAlunoRequestData) =>
  api.post<Aluno>("/alunos", data);

type CreateProfessorRequestData = Omit<Professor, "id"> & {
  senha: string;
};

export const createProfessor = (data: CreateProfessorRequestData) =>
  api.post<Professor>("/professores", data);

type UpdateUserParams = Partial<Omit<User, "id">>;

export const updateUser = (aluno: UpdateUserParams) =>
  api.put<User>("/usuarios", aluno).then((response) => response.data);

type AuthenticateUserRequestData = {
  username: string;
  password: string;
};

type AuthenticateUserResponse = {
  access_token: string;
  token_type: string;
};

export const authenticateUser = (data: AuthenticateUserRequestData) =>
  api
    .post<AuthenticateUserResponse>("token/", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => camelizeKeys<AuthenticateUserResponse>(response.data));

type CheckResetPasswordTokenRequestBody = {
  email: string;
  token: string;
};

export const checkResetPasswordToken = (
  data: CheckResetPasswordTokenRequestBody,
) => api.post("new_password/auth", data).then((response) => response.data);

type ResetPasswordRequestBody = {
  senha: string;
  email: string;
  token: string;
};

export const resetPassword = (data: ResetPasswordRequestBody) =>
  api.post("new_password", data).then((response) => response.data);

type RequestResetPasswordCodeRequestBody = {
  email: string;
};

export const requestResetPasswordCode = (
  data: RequestResetPasswordCodeRequestBody,
) =>
  api.post("new_password/create_token", data).then((response) => response.data);
