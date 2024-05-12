import { camelizeKeys } from "humps";

import { Aluno, Professor, User } from "@/models/User";

import api from "./config";

type GetUserResponse = {
  tipo: "aluno" | "professor";
  dados: User;
};

export const getUser = (accessToken?: string) =>
  api.get<GetUserResponse>("/usuarios/me", {
    headers: {
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  });

type CreateAlunoRequestData = Omit<Aluno, "id"> & {
  senha: string;
};

export const createAluno = (data: CreateAlunoRequestData) =>
  api.post("/alunos", data);

type CreateProfessorRequestData = Omit<Professor, "id"> & {
  senha: string;
};

export const createProfessor = (data: CreateProfessorRequestData) =>
  api.post("/professores", data);

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
