import { useQuery } from "@tanstack/react-query";

import * as alunosApi from "../services/api/alunos";
import * as professoresApi from "../services/api/professores";
import { useUserQueries } from "./user";

export const useProfessoresQueries = () => {
  const { useGetUser } = useUserQueries();

  const { data: user } = useGetUser(true);

  const useGetProfessores = () =>
    useQuery({
      queryKey: ["professores"],
      queryFn: () =>
        professoresApi.getProfessores().then((response) => response.data),
    });

  const useGetAlunosOrientador = () =>
    useQuery({
      queryKey: ["orientandos"],
      queryFn: () => alunosApi.getAlunosProfessor(user!.id),
    });

  return {
    useGetProfessores,
    useGetAlunosOrientador,
  };
};
