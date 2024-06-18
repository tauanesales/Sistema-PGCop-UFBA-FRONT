export type UserBase = {
  id: number;
  nome: string;
  email: string;
};

export enum Curso {
  M = "Mestrado",
  D = "Doutorado",
}

export enum TipoUsuario {
  ALUNO = "ALUNO",
  PROFESSOR = "PROFESSOR",
  COORDENADOR = "COORDENADOR",
}

export type Aluno = UserBase & {
  tipo_usuario: TipoUsuario.ALUNO;
  cpf: string;
  telefone: string;
  matricula: string;
  orientador_id: number;
  curso: keyof typeof Curso;
  lattes: string;
  data_ingresso: string;
  data_qualificacao: Date | null;
  data_defesa: Date | null;
};

export type Professor = UserBase & {
  tipo_usuario: TipoUsuario.PROFESSOR | TipoUsuario.COORDENADOR;
};

export type User = Aluno | Professor;
