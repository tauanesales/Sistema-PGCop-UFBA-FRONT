import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { TarefaBase } from "@/models/TarefaBase";

import * as tarefasBaseApi from "../services/api/tarefasBase";

const tarefasKeys = {
  all: ["tarefas"],
  lists: () => [...tarefasKeys.all, "list"],
  list: (curso: string) => [...tarefasKeys.lists(), curso],
};

const getTarefasCursoOptions = (curso: string) =>
  queryOptions({
    queryKey: tarefasKeys.list(curso),
    queryFn: () => tarefasBaseApi.getTarefasCurso(curso),
  });

export const useTarefasBaseQueries = () => {
  const queryClient = useQueryClient();

  const useGetTarefasCurso = (curso: string) =>
    useQuery(getTarefasCursoOptions(curso));

  const useCreateTarefa = () =>
    useMutation({
      mutationFn: tarefasBaseApi.createTarefa,
      onSuccess: (tarefa) => {
        queryClient.setQueryData(
          getTarefasCursoOptions(tarefa.curso).queryKey,
          (data) => data && [tarefa, ...data],
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: tarefasKeys.lists(),
          refetchType: "none",
        });
      },
    });

  const useUpdateTarefa = () =>
    useMutation({
      mutationFn: tarefasBaseApi.updateTarefa,
      onMutate: async ({ id, ...tarefa }) => {
        await queryClient.cancelQueries({
          queryKey: tarefasKeys.all,
        });

        const queries = queryClient.getQueriesData<TarefaBase[]>({
          queryKey: tarefasKeys.lists(),
        });

        const query = queries.find(([, data]) =>
          data?.find((t) => t.id === id),
        );

        if (query) {
          const [queryKey] = query;

          queryClient.setQueryData<TarefaBase[]>(
            queryKey,
            (data) =>
              data && data.map((t) => (t.id === id ? { ...t, ...tarefa } : t)),
          );
        }

        return { previousTarefasQuery: query };
      },
      onError: (_err, _variables, context) => {
        if (context?.previousTarefasQuery) {
          queryClient.setQueryData(...context.previousTarefasQuery);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: tarefasKeys.lists(),
        });
      },
    });

  const useDeleteTarefa = () =>
    useMutation({
      mutationFn: tarefasBaseApi.deleteTarefa,
      onMutate: (tarefaId) => {
        const previousTarefas = queryClient.getQueryData<TarefaBase[]>(
          tarefasKeys.all,
        );

        ["M", "D"].forEach((curso) => {
          queryClient.setQueryData<TarefaBase[]>(
            tarefasKeys.list(curso),
            (data) => data && data.filter((t) => t.id !== tarefaId),
          );
        });

        return { previousTarefas };
      },
      onError: (_err, _variables, context) => {
        if (context?.previousTarefas) {
          queryClient.setQueryData(tarefasKeys.all, context.previousTarefas);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: tarefasKeys.all,
        });
      },
    });

  return {
    useGetTarefasCurso,
    useCreateTarefa,
    useUpdateTarefa,
    useDeleteTarefa,
  };
};
