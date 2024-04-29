import { camelizeKeys } from "humps";

import { User } from "@/models/User";

import api from "./config";

type CreateUserRequestData = {
  Nome: string;
  Email: string;
  Role: string;
  Senha: string;
};

export const getUser = (accessToken?: string) =>
  api.get<User>("/usuarios/me", {
    headers: {
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  });

export const getUserByEmail = (email: string, accessToken?: string) =>
  api.get<User>(`/usuarios/email/${email}`, {
    headers: {
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  });

export const createUser = (data: CreateUserRequestData) =>
  api.post("/usuarios", data);

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
