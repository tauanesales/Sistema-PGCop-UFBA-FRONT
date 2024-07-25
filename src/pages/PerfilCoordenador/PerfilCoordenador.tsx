import "./styles.css";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { MdGroupAdd, MdLogout, MdOutlineLibraryBooks } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Solicitacoes from "@/components/Solicitacoes/Solicitacoes";
import { Status } from "@/models/Solicitacao";
import { Aluno, Professor } from "@/models/User";
import { useAlunosQueries } from "@/queries/alunos";
import { useProfessoresQueries } from "@/queries/professores";
import { useSolicitacoesQueries } from "@/queries/solicitacoes";
import { useUserQueries } from "@/queries/user";

function PerfilCoordenador() {
  const logoPgcop = "/assets/logoPgcop.png";
  const navigate = useNavigate();
  const { signOut, useGetUser } = useUserQueries();
  const { data: userData } = useGetUser();
  const user = userData as Professor;
  const { useGetSolicitacoes, useUpdateSolicitacao } = useSolicitacoesQueries();
  const { data: solicitacoes = [] } = useGetSolicitacoes({
    orientadorId: user.id,
    status: Status.PENDENTE,
  });
  const { mutate: updatedSolicitacao } = useUpdateSolicitacao();
  const handleAcceptRequest = (solicitacaoId: number) =>
    updatedSolicitacao({ solicitacaoId, status: Status.ACEITA });
  const handleRemoveRequest = (solicitacaoId: number) =>
    updatedSolicitacao({ solicitacaoId, status: Status.RECUSADA });
  const { useGetAlunosOrientador } = useProfessoresQueries();
  const { data: alunos = [] } = useGetAlunosOrientador();
  const { useRemoverOrientador } = useAlunosQueries();
  const { mutate: removerOrientador } = useRemoverOrientador();
  const [showModal, setShowModal] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno>();
  const [showSolicitacoes, setShowSolicitacoes] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Novo estado para mensagem de sucesso

  useEffect(() => {
    if (solicitacoes.length === 0) {
      setShowSolicitacoes(false);
    }
  }, [solicitacoes.length]);

  const handleDoubleClick = (matricula) => {
    const aluno = alunos.find((aluno) => aluno.matricula === matricula);
    if (aluno) {
      window.open(`/perfil-aluno`);
    }
  };

  const handleDelete = () => {
    removerOrientador(selectedAluno!.id);
    setShowModal(false);
  };

  const handleAddTask = (aluno) => {
    setSelectedAluno(aluno);
    setShowTaskModal(true);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    // Adicione a lógica para enviar os dados da tarefa aqui

    // Exemplo de envio de dados da tarefa (substitua com a lógica real)
    // saveTask({ ...taskData });

    setShowTaskModal(false);
    setSuccessMessage("Tarefa incluída com sucesso!"); // Exibir mensagem de sucesso
    setTimeout(() => setSuccessMessage(""), 3000); // Ocultar mensagem após 3 segundos
  };

  const alunosMestrado = alunos.filter((aluno) => aluno.curso === "M");
  const alunosDoutorado = alunos.filter((aluno) => aluno.curso === "D");
  const handleSolicitacoesClick = () => setShowSolicitacoes(!showSolicitacoes);

  return (
    <div className="contain">
      <div className="containerCoordenador">
        {/* Logo*/}
        <img src={logoPgcop} alt="Logo" />
        {/* Informações do perfil */}
        <div
          className="infoCoordenador"
          style={{ justifyContent: "space-between", marginRight: "30px" }}
        >
          <div>
            <h2>{user?.nome}</h2>
            <h3>Orientandos: {alunos.length}</h3>
          </div>
          {/* Botões Toolbar */}
          <div>
            <div className="botoesToolbar">
              <div style={{ position: "relative" }}>
                <MdGroupAdd
                  onClick={handleSolicitacoesClick}
                  style={{
                    marginRight: "40px",
                    cursor: "pointer",
                    color: solicitacoes.length > 0 ? "red" : "inherit",
                  }}
                  size={35}
                  title="Solicitações"
                />
                {showSolicitacoes && (
                  <div
                    className="solicitacoesContainer"
                    style={{ position: "absolute", top: "-50px" }}
                  >
                    <Solicitacoes
                      solicitacoes={solicitacoes}
                      handleAcceptRequest={handleAcceptRequest}
                      handleRemoveRequest={handleRemoveRequest}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <MdOutlineLibraryBooks
                onClick={() => navigate("/tarefas")}
                style={{ cursor: "pointer", marginRight: "45px" }}
                size={35}
                title="Tarefas"
              />
            </div>
            <div>
              <MdLogout
                onClick={signOut}
                style={{ cursor: "pointer", marginRight: "30px" }}
                size={35}
                title="Sair"
              />
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Lista de Orientandos
      </h2>
      {/* Container de Alunos Orientados - Mestrado */}
      <div className="containerOrientandosCoordenador">
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          Alunos de Mestrado
        </h3>
        <ul>
          {alunosMestrado?.map((aluno) => (
            <li
              style={{ cursor: "pointer", padding: "7px 20px" }}
              key={aluno.id}
              onDoubleClick={() => handleDoubleClick(aluno.matricula)}
            >
              <div>
                <strong>{aluno.nome}</strong> - Matrícula: {aluno.matricula}
                <br />
                {aluno.data_defesa
                  ? format(new Date(aluno.data_defesa), "dd/MM/yyyy")
                  : "-"}
              </div>
              <div>
                <button
                  className="bttn"
                  onClick={() => navigate("/PerfilAlunoCoordenador")}
                  style={{
                    marginRight: "10px",
                    height: "30px",
                    borderRadius: "5px",
                    width: "95px",
                    fontSize: "13px",
                  }}
                >
                  Abrir
                </button>
                <button
                  className="bttn"
                  onClick={() => handleAddTask(aluno)}
                  style={{
                    marginRight: "10px",
                    height: "30px",
                    borderRadius: "5px",
                    width: "95px",
                    fontSize: "13px",
                  }}
                >
                  + Tarefa
                </button>
                <button
                  className="bttn"
                  onClick={() => {
                    setSelectedAluno(aluno);
                    setShowModal(true);
                  }}
                  style={{
                    marginRight: "10px",
                    height: "30px",
                    borderRadius: "5px",
                    width: "95px",
                    fontSize: "13px",
                  }}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Container de Alunos Orientados - Doutorado */}
      <div
        className="containerOrientandosCoordenador"
        style={{ marginTop: "30px" }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          Alunos de Doutorado
        </h3>
        <ul>
          {alunosDoutorado?.map((aluno) => (
            <li
              style={{ cursor: "pointer", padding: "7px 20px" }}
              key={aluno.id}
              onDoubleClick={() => handleDoubleClick(aluno.matricula)}
            >
              <div>
                <strong>{aluno.nome}</strong> - Matrícula: {aluno.matricula}
                <br />
                Conclusão prevista em{" "}
                {aluno.data_defesa
                  ? format(new Date(aluno.data_defesa), "dd/MM/yyyy")
                  : "-"}
              </div>
              <div>
                <button
                  className="bttn"
                  onClick={() => handleDoubleClick(aluno.matricula)}
                  style={{
                    marginRight: "10px",
                    height: "30px",
                    borderRadius: "5px",
                    width: "95px",
                    fontSize: "13px",
                  }}
                >
                  Abrir
                </button>
                <button
                  className="bttn"
                  onClick={() => handleAddTask(aluno)}
                  style={{
                    marginRight: "10px",
                    height: "30px",
                    borderRadius: "5px",
                    width: "95px",
                    fontSize: "13px",
                  }}
                >
                  + Tarefa
                </button>
                <button
                  className="bttn"
                  onClick={() => {
                    setSelectedAluno(aluno);
                    setShowModal(true);
                  }}
                  style={{
                    marginRight: "10px",
                    height: "30px",
                    borderRadius: "5px",
                    width: "95px",
                    fontSize: "13px",
                  }}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="confirmationBox">
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <p>Tem certeza que deseja remover esse aluno da sua lista?</p>
            <ul style={{ display: "flex" }}>
              <button
                className="bttn"
                onClick={handleDelete}
                style={{ marginRight: "30px", padding: "10px" }}
              >
                Sim
              </button>
              <button
                className="bttn"
                onClick={() => setShowModal(false)}
                style={{ padding: "10px" }}
              >
                Não
              </button>
            </ul>
          </div>
        </div>
      )}

      {/* Modal de Adicionar Tarefa */}
      {showTaskModal && (
        <div className="taskModal">
          <div className="modalContent">
            <h2>Adicionar Tarefa</h2>
            <form onSubmit={handleTaskSubmit}>
              <div>
                <label>Nome do aluno: {selectedAluno?.nome}</label>
              </div>
              <div>
                <label>Matrícula: {selectedAluno?.matricula}</label>
              </div>
              <div>
                <label>Titulação: {selectedAluno?.curso}</label>
              </div>
              <div>
                <label>
                  Data do início:{" "}
                  {selectedAluno?.data_inicio
                    ? format(new Date(selectedAluno.data_inicio), "dd/MM/yyyy")
                    : "-"}
                </label>
              </div>
              <div>
                <label>
                  Término previsto:{" "}
                  {selectedAluno?.data_defesa
                    ? format(new Date(selectedAluno.data_defesa), "dd/MM/yyyy")
                    : "-"}
                </label>
              </div>
              <div>
                <label>
                  Título da tarefa <span className="required">*</span>
                </label>
                <input type="text" required />
              </div>
              <div>
                <label>
                  Descrição da tarefa <span className="required">*</span>
                </label>
                <textarea required style={{ height: "100px" }} />
              </div>
              <div>
                <label>
                  Data de entrega <span className="required">*</span>
                </label>
                <input type="date" required />
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  type="submit"
                  className="bttn"
                  style={{ marginRight: "10px" }}
                >
                  Salvar
                </button>
                <button
                  type="button"
                  className="bttn"
                  onClick={() => setShowTaskModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mensagem de sucesso */}
      {successMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default PerfilCoordenador;
