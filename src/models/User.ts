export type UserBase = {
  id: number;
  nome: string;
  email: string;
  role: string;
};

export type Aluno = UserBase & {
  cpf: string;
  telefone: string;
  matricula: string;
  orientador_id: number;
  curso: "M" | "D";
  lattes: string;
  data_ingresso: Date;
  data_qualificacao: Date;
  data_defesa: Date;
};

export type Professor = UserBase;

export type User = Aluno | Professor;
