import { createBrowserRouter, Navigate } from "react-router-dom";

import PerfilAluno from "./PerfilAluno";
import ConfirmarCadastro from "./ConfirmarCadastro";
import CadastroProfessor from "./CadastroProfessor";
import CadastroAluno from "./CadastroAluno";
import Login from "./Login";
import Error404 from "./Error404";

export const router = createBrowserRouter([
  { path: "*", element: <Error404 /> },
  { path: "/", element: <Navigate to="/login" replace={true} /> },
  { path: "/login", element: <Login /> },
  { path: "/perfil-aluno", element: <PerfilAluno /> },
  { path: "/confirmar-cadastro", element: <ConfirmarCadastro /> },
  { path: "/cadastro-professor", element: <CadastroProfessor /> },
  { path: "/cadastro-aluno", element: <CadastroAluno /> },
]);
