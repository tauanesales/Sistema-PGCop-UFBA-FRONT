import { Navigate, Outlet } from "react-router-dom";

import { useUserQueries } from "@/queries/user";
import { useTokensStore } from "@/store/tokens";


export const PublicRoute = () => {
  const tokens = useTokensStore();

  const { useGetUser } = useUserQueries();

  const enabled = !!tokens.accessToken;

  const { data: user, isFetching } = useGetUser(enabled);

  if (isFetching) {
    return 'Carregando...'
  }

  if (user) {
    const pathOptions = {
      aluno: "/perfil-aluno",
      professor: "/perfil-professor",
    }[user.tipo];

    return (
      <Navigate
        to={user.dados.role != "coordenador" && pathOptions || "/perfil-coordenador"}
        replace
      />
    );
  }

  return <Outlet />;
};