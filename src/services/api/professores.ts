import { Professor } from "@/models/User";

import api from "./config";

type GetProfessoresResponse = Array<Professor>;

export const getProfessores = () =>
  api.get<GetProfessoresResponse>("/professores/todos");
