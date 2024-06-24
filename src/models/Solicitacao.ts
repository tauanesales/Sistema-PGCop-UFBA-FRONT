export enum Status {
  PENDENTE = "pendente",
  ACEITA = "aceita",
  RECUSADA = "recusada",
}

export type Solicitacao = {
  aluno_id: number;
  professor_id: number;
  status: Status;
  id: number;
  nome_aluno: "string";
  nome_professor: "string";
};
