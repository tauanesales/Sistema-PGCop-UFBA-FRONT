import { createBrowserRouter, Navigate } from "react-router-dom";

import AtualizarSenha from "@/pages/AtualizarSenha/AtualizarSenha";
import CadastroAluno from "@/pages/CadastroAluno/CadastroAluno";
import CadastroProfessor from "@/pages/CadastroProfessor/CadastroProfessor";
import ConfirmarCadastro from "@/pages/ConfirmarCadastro/ConfirmarCadastro";
import ConfirmarEnvioEmail from "@/pages/ConfirmarEnvioEmail/ConfirmarEnvioEmail";
import ConfirmarNovaSenha from "@/pages/ConfirmarNovaSenha/ConfirmarNovaSenha";
import Error404 from "@/pages/Erro/Error404";
import EsqueciSenha from "@/pages/EsqueciSenha/EsqueciSenha";
import Login from "@/pages/Login/Login";
import PerfilAluno from "@/pages/PerfilAluno/PerfilAluno";

export const router = createBrowserRouter([
  { path: "*", element: <Error404 /> },
  { path: "/", element: <Navigate to="/login" replace={true} /> },
  { path: "/login", element: <Login /> },
  { path: "/perfil-aluno", element: <PerfilAluno /> },
  { path: "/confirmar-cadastro", element: <ConfirmarCadastro /> },
  { path: "/CadastroProfessor", element: <CadastroProfessor /> },
  { path: "/cadastro-aluno", element: <CadastroAluno /> },
  { path: "/esqueci-senha", element: <EsqueciSenha /> },
  { path: "/confirmar-envio-email", element: <ConfirmarEnvioEmail /> },
  { path: "/atualizar-senha", element: <AtualizarSenha /> },
  { path: "/confirmar-nova-senha", element: <ConfirmarNovaSenha /> },
]);
