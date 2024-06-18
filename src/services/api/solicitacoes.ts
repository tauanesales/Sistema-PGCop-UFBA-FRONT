import { Solicitacao, Status } from "@/models/Solicitacao";

import api from "./config";

export type GetSolicitacoesParams = {
  status: Status;
  orientadorId: number;
};

type UpdateSolitacaoParams = {
  status: Status;
  solicitacaoId: number;
};

const getSolicitacoes = ({ status, orientadorId }: GetSolicitacoesParams) =>
  api
    .get<Solicitacao[]>(`/solicitacoes/${status}/${orientadorId}`)
    .then((response) => response.data);

const updateSolicitacao = ({ status, solicitacaoId }: UpdateSolitacaoParams) =>
  api
    .put(`/solicitacoes/${solicitacaoId}?status=${status}`)
    .then((response) => response.data);

export default {
  getSolicitacoes,
  updateSolicitacao,
};
