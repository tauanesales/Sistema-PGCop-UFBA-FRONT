import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Solicitacao } from "@/models/Solicitacao";

import solitacoesApi, {
  GetSolicitacoesParams,
} from "../services/api/solicitacoes";

const solicitacoesKeys = {
  all: ["solicitacoes"],
};

export const useSolicitacoesQueries = () => {
  const queryClient = useQueryClient();

  const useGetSolicitacoes = (params: GetSolicitacoesParams) =>
    useQuery({
      queryKey: solicitacoesKeys.all,
      queryFn: () => solitacoesApi.getSolicitacoes(params),
      enabled: !!params.orientadorId,
    });

  const useUpdateSolicitacao = () =>
    useMutation({
      mutationFn: solitacoesApi.updateSolicitacao,
      onMutate: async ({ solicitacaoId }) => {
        await queryClient.cancelQueries({
          queryKey: solicitacoesKeys.all,
        });

        const previousSolicitacoes = queryClient.getQueryData<Solicitacao[]>(
          solicitacoesKeys.all,
        );

        queryClient.setQueryData<Solicitacao[]>(
          solicitacoesKeys.all,
          (data) =>
            data &&
            data.filter((solicitacao) => solicitacao.id !== solicitacaoId),
        );

        return { previousSolicitacoes };
      },
      onError: (_err, _variables, context) => {
        queryClient.setQueryData(
          solicitacoesKeys.all,
          context?.previousSolicitacoes,
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: solicitacoesKeys.all,
        });
      },
    });

  return {
    useGetSolicitacoes,
    useUpdateSolicitacao,
  };
};
