export type User = {
  UserID: number;
  Nome: string;
  Email: string;
  Role: "aluno" | "professor" | "coordenador";
};
