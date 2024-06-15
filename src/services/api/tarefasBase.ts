import { TarefaBase } from "@/models/TarefaBase";

import api from "./config";

export const getTarefa = (tarefaId: number) =>
  api
    .get<TarefaBase>(`/tarefas_base/${tarefaId}`)
    .then((response) => response.data);

export const getTarefasCurso = (curso: string) =>
  api
    .get<TarefaBase[]>(`/tarefas_base/curso/${curso}`)
    .then((response) => response.data);

export const deleteTarefa = (tarefaId: number) =>
  api.delete(`/tarefas_base/${tarefaId}`).then((response) => response.data);

export const createTarefa = (tarefa: Omit<TarefaBase, "id">) =>
  api
    .post<TarefaBase>("/tarefas_base", tarefa)
    .then((response) => response.data);

type UpdateTarefaParams = Partial<TarefaBase> & Pick<TarefaBase, "id">;

export const updateTarefa = ({ id, ...tarefa }: UpdateTarefaParams) =>
  api
    .put<TarefaBase>(`/tarefas_base/${id}`, tarefa)
    .then((response) => response.data);
