import { Tarefa } from "@/models/Tarefa";

import api from "./config";

export const getTarefa = (tarefaId: number) => api.get(`/tarefas/${tarefaId}`);

export type GetTarefasAlunoResponse = Array<Tarefa>;

export const getTarefasAluno = (alunoId: number) =>
  api.get<GetTarefasAlunoResponse>(`/tarefas/aluno/${alunoId}`);

export const deleteTarefa = (tarefaId: number) =>
  api.delete(`/tarefas/${tarefaId}`);

export const createTarefa = (tarefaId: number) =>
  api.post(`/tarefas/${tarefaId}`);

type UpdateTarefaParams = Partial<Tarefa> & Pick<Tarefa, "id">;

export const updateTarefa = ({ id, ...tarefa }: UpdateTarefaParams) =>
  api.put(`/tarefas/${id}`, tarefa);
