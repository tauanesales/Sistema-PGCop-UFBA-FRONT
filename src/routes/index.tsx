import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

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
import { AuthenticationGuard } from "@/routes/AuthenticationGuard";

const routes = createRoutesFromElements(
  <>
    <Route index path="/" element={<Navigate to="/login" replace={true} />} />

    {/* Mover para dentro de route abaixo após implementar autenticação */}
    <Route path="/perfil-aluno" element={<PerfilAluno />} />
    <Route path="/perfil-orientador" element={<PerfilOrientador />} />
    <Route path="/perfil-coordenador" element={<PerfilCoordenador />} />
    <Route path="/perfil-coordenador/tarefas" element={<Tarefas />} />

    <Route element={<AuthenticationGuard />}>
      <Route path="/confirmar-cadastro" element={<ConfirmarCadastro />} />
      <Route path="/confirmar-envio-email" element={<ConfirmarEnvioEmail />} />
      <Route path="/atualizar-senha" element={<AtualizarSenha />} />
    </Route>

    <Route element={<AuthenticationGuard guardType="unauthenticated" />}>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro-aluno" element={<CadastroAluno />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      <Route path="/confirmar-nova-senha" element={<ConfirmarNovaSenha />} />
    </Route>

    <Route path="*" element={<Error404 />} />
  </>,
);

export const router = createBrowserRouter(routes);
