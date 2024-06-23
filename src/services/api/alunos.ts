import { Aluno } from "@/models/User";

import api from "./config";

export const getAlunosProfessor = (orientadorId: number) =>
  api
    .get<Aluno[]>(`/alunos/orientador/${orientadorId}`)
    .then((response) => response.data);

type UpdateAlunoParams = Partial<Aluno> & Pick<Aluno, "id">;

export const updateAluno = ({ id, ...aluno }: UpdateAlunoParams) =>
  api
    .put<Aluno>(`/alunos/${id}`, { ...aluno, nome: "Teste" })
    .then((response) => response.data);
