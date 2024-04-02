import { createBrowserRouter, Navigate } from "react-router-dom";

import PerfilAluno from "@/pages/PerfilAluno/PerfilAluno";
import ConfirmarCadastro from "@/pages/ConfirmarCadastro/ConfirmarCadastro";
import CadastroProfessor from "@/pages/CadastroProfessor/CadastroProfessor";
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
  { path: "/confirmar-cadastro", element: <ConfirmarCadastro /> },
  { path: "/CadastroProfessor", element: <CadastroProfessor /> },
  { path: "/cadastro-aluno", element: <CadastroAluno /> },
  { path: "/esqueci-senha", element: <EsqueciSenha /> },
  { path: "/confirmar-envio-email", element: <ConfirmarEnvioEmail /> },
  { path: "/atualizar-senha", element: <AtualizarSenha /> },
  { path: "/confirmar-nova-senha", element: <ConfirmarNovaSenha /> },
]);
