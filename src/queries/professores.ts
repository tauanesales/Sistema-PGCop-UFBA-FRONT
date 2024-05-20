import { useQuery } from "@tanstack/react-query";

import * as professoresApi from "../services/api/professores";

export const useProfessoresQueries = () => {
  const useGetProfessores = () =>
    useQuery({
      queryKey: ["professores"],
      queryFn: () =>
        professoresApi.getProfessores().then((response) => response.data),
    });

  return {
    useGetProfessores,
  };
};
