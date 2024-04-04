import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

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
import { AuthenticationGuard } from "@/routes/AuthenticationGuard";

const routes = createRoutesFromElements(
  <>
    <Route index path="/" element={<Navigate to="/login" replace={true} />} />

    <Route element={<AuthenticationGuard />}>
      <Route path="/perfil-aluno" element={<PerfilAluno />} />
      <Route path="/confirmar-cadastro" element={<ConfirmarCadastro />} />
      <Route path="/confirmar-envio-email" element={<ConfirmarEnvioEmail />} />
      <Route path="/atualizar-senha" element={<AtualizarSenha />} />
    </Route>

    <Route element={<AuthenticationGuard guardType="unauthenticated" />}>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro-professor" element={<CadastroProfessor />} />
      <Route path="/cadastro-aluno" element={<CadastroAluno />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      <Route path="/confirmar-nova-senha" element={<ConfirmarNovaSenha />} />
    </Route>

    <Route path="*" element={<Error404 />} />
  </>,
);

export const router = createBrowserRouter(routes);
