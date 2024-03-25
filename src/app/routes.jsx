import { createBrowserRouter, Navigate } from "react-router-dom";

import PerfilAluno from "@/pages/PerfilAluno";
import ConfirmarCadastro from "@/pages/ConfirmarCadastro";
import CadastroProfessor from "@/pages/CadastroProfessor";
import CadastroAluno from "@/pages/CadastroAluno";
import Login from "@/pages/Login";
import EsqueciSenha from "@/pages/EsqueciSenha";
import ConfirmarEnvioEmail from "@/pages/ConfirmarEnvioEmail";
import AtualizarSenha from "@/pages/AtualizarSenha";
import ConfirmarNovaSenha from "@/pages/ConfirmarNovaSenha";
import Error404 from "@/pages/Error404";

export const router = createBrowserRouter([
  { path: "*", element: <Error404 /> },
  { path: "/", element: <Navigate to="/login" replace={true} /> },
  { path: "/login", element: <Login /> },
  { path: "/perfil-aluno", element: <PerfilAluno /> },
  { path: "/confirmar-cadastro", element: <ConfirmarCadastro /> },
  { path: "/cadastro-professor", element: <CadastroProfessor /> },
  { path: "/cadastro-aluno", element: <CadastroAluno /> },
  { path: "/esqueci-senha", element: <EsqueciSenha /> },
  { path: "/confirmar-envio-email", element: <ConfirmarEnvioEmail /> },
  { path: "/atualizar-senha", element: <AtualizarSenha /> },
  { path: "/confirmar-nova-senha", element: <ConfirmarNovaSenha /> },
]);
