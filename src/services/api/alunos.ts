import { Aluno } from "@/models/User";

import api from "./config";

type UpdateAlunoParams = Partial<Aluno> & Pick<Aluno, "id">;

export const updateAluno = ({ id, ...aluno }: UpdateAlunoParams) =>
  api
    .put<Aluno>(`/alunos/${id}`, { ...aluno })
    .then((response) => response.data);

export const removerOrientador = (id: number) =>
  api
    .put<Aluno>(`/alunos/${id}/remover-orientador`)
    .then((response) => response.data);
