import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { resetAllStores } from "@/store/helpers";
import { saveTokens } from "@/store/tokens";

import * as userApi from "../services/api/user";

export const useUserQueries = () => {
  const queryClient = useQueryClient();

  const useGetUser = (enabled?: boolean) =>
    useQuery({
      queryKey: ["user"],
      queryFn: () => userApi.getUser().then((response) => response.data),
      enabled,
    });

  const fetchUser = (accessToken: string) =>
    queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: () =>
        userApi.getUser(accessToken).then((response) => response.data),
    });

  const useAuthUser = () =>
    useMutation({
      mutationFn: userApi.authenticateUser,
      onSuccess: (tokens) => {
        saveTokens(tokens);
      },
    });

  const useCreateAluno = () =>
    useMutation({
      mutationFn: userApi.createAluno,
    });

  const useCreateProfessor = () =>
    useMutation({
      mutationFn: userApi.createProfessor,
    });

  const useUpdateUser = () =>
    useMutation({
      mutationFn: userApi.updateUser,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
      onSettled: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    });

  const useCheckResetPasswordToken = () =>
    useMutation({
      mutationFn: userApi.checkResetPasswordToken,
    });

  const useResetPassword = () =>
    useMutation({
      mutationFn: userApi.resetPassword,
    });

  const useRequestResetPasswordCode = () =>
    useMutation({
      mutationFn: userApi.requestResetPasswordCode,
    });

  const signOut = () => {
    resetAllStores();
    queryClient.clear();
  };

  return {
    useGetUser,
    fetchUser,
    useAuthUser,
    useCreateAluno,
    useCreateProfessor,
    useUpdateUser,
    useResetPassword,
    useRequestResetPasswordCode,
    useCheckResetPasswordToken,
    signOut,
  };
};
