export interface TarefaBase {
  nome: string;
  descricao: string;
  prazo_em_meses: number;
  curso: "M" | "D";
  id: number;
}
