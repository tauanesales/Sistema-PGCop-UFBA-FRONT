export type UserBase = {
  id: number;
  nome: string;
  email: string;
};

export type Aluno = UserBase & {
  cpf: string;
  telefone: string;
  matricula: string;
  orientador_id: number;
  curso: "M" | "D";
  lattes: string;
  data_ingresso: string;
  data_qualificacao: Date | null;
  data_defesa: Date | null;
};

export type Professor = UserBase & {
  role: "orientador" | "coordenador";
};

export type User = Aluno | Professor;
