export type Tarefa = {
  nome: string;
  descricao: string;
  completada: number;
  data_prazo: Date;
  aluno_id: number;
  last_notified: Date;
  data_conclusao: Date | null;
  id: number;
};
