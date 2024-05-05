import { createBrowserRouter, Navigate } from "react-router-dom";

import AtualizarSenha from "@/pages/AtualizarSenha/AtualizarSenha";
import CadastroAluno from "@/pages/CadastroAluno/CadastroAluno";
import ConfirmarCadastro from "@/pages/ConfirmarCadastro/ConfirmarCadastro";
import ConfirmarEnvioEmail from "@/pages/ConfirmarEnvioEmail/ConfirmarEnvioEmail";
import ConfirmarNovaSenha from "@/pages/ConfirmarNovaSenha/ConfirmarNovaSenha";
import Error404 from "@/pages/Erro/Error404";
import EsqueciSenha from "@/pages/EsqueciSenha/EsqueciSenha";
import Login from "@/pages/Login/Login";
import PerfilAluno from "@/pages/PerfilAluno/PerfilAluno";
import PerfilCoordenador from "@/pages/PerfilCoordenador/PerfilCoordenador";
import PerfilOrientador from "@/pages/PerfilOrientador/PerfilOrientador";
import Tarefas from "@/pages/Tarefas/Tarefas";

export const router = createBrowserRouter([
  { path: "*", element: <Error404 /> },
  { path: "/", element: <Navigate to="/login" replace={true} /> },
  { path: "/login", element: <Login /> },
  { path: "/perfil-aluno", element: <PerfilAluno /> },
  { path: "/perfil-orientador", element: <PerfilOrientador /> },
  { path: "/perfil-coordenador", element: <PerfilCoordenador /> },
  { path: "/perfil-coordenador/tarefas", element: <Tarefas /> },
  { path: "/confirmar-cadastro", element: <ConfirmarCadastro /> },
  { path: "/cadastro-aluno", element: <CadastroAluno /> },
  { path: "/esqueci-senha", element: <EsqueciSenha /> },
  { path: "/confirmar-envio-email", element: <ConfirmarEnvioEmail /> },
  { path: "/atualizar-senha", element: <AtualizarSenha /> },
  { path: "/confirmar-nova-senha", element: <ConfirmarNovaSenha /> },
]);
