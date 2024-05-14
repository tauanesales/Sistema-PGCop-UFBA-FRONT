import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { resetAllStores } from "@/store/helpers";
import { saveTokens } from "@/store/tokens";

import * as userApi from "../services/api/user";

export const useUserQueries = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const useGetUser = (enabled: boolean) =>
    useQuery({
      queryKey: ["user"],
      queryFn: () => userApi.getUser().then((response) => response.data),
      enabled,
    });

  const useAuthUser = () =>
    useMutation({
      mutationFn: userApi.authenticateUser,
      onSuccess: async (tokens: any) => {
        const user = await queryClient.fetchQuery({
          queryKey: ["user"],
          queryFn: () =>
            userApi
              .getUser(tokens.accessToken)
              .then((response) => response.data),
        });

        saveTokens(tokens);

        const pathOptions: { [key: string]: string } = {
          'aluno': '/perfil-aluno',
          'professor': '/perfil-professor',
        };

        const path = user.dados.role != "coordenador" && pathOptions || "/perfil-coordenador";

        navigate(path, { replace: true });
      },
    });

  const signOut = () => {
    resetAllStores();
    queryClient.clear();
    navigate('/')
  };

  return {
    useGetUser,
    useAuthUser,
    signOut,
  };
};