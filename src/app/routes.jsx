import { createBrowserRouter, Navigate } from "react-router-dom";

import PerfilAluno from "@/pages/PerfilAluno/PerfilAluno";
import PerfilOrientador from "@/pages/PerfilOrientador/PerfilOrientador";
import PerfilCoordenador from "@/pages/PerfilCoordenador/PerfilCoordenador";
import Tarefas from "@/pages/Tarefas/Tarefas";
import ConfirmarCadastro from "@/pages/ConfirmarCadastro/ConfirmarCadastro";
import CadastroAluno from "@/pages/CadastroAluno/CadastroAluno";
import Login from "@/pages/Login/Login";
import EsqueciSenha from "@/pages/EsqueciSenha/EsqueciSenha";
import ConfirmarEnvioEmail from "@/pages/ConfirmarEnvioEmail/ConfirmarEnvioEmail";
import AtualizarSenha from "@/pages/AtualizarSenha/AtualizarSenha";
import ConfirmarNovaSenha from "@/pages/ConfirmarNovaSenha/ConfirmarNovaSenha";
import Error404 from "@/pages/Erro/Error404";



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
