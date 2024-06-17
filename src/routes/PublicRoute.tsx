import { Navigate, Outlet } from "react-router-dom";

import { useUserQueries } from "@/queries/user";
import { useTokensStore } from "@/store/tokens";

const userTypeRoute = {
  ALUNO: "/perfil-aluno",
  PROFESSOR: "/perfil-professor",
  COORDENADOR: "/perfil-coordenador",
};

export const PublicRoute = () => {
  const tokens = useTokensStore();

  const { useGetUser } = useUserQueries();

  const enabled = !!tokens.accessToken;

  const { data: user } = useGetUser(enabled);

  if (user) {
    return <Navigate to={userTypeRoute[user.tipo_usuario]} replace />;
  }

  return <Outlet />;
};
