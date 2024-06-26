import "./styles.css";

import { useState } from "react";
import {
  MdArrowBack,
  MdCreate,
  MdDelete,
  MdOutlineLibraryAdd,
} from "react-icons/md"; // Importando os ícones
import { useNavigate } from "react-router-dom";

import { TarefaBase } from "@/models/TarefaBase";
import { useTarefasBaseQueries } from "@/queries/tarefasBase";

function Tarefas() {
  const navigate = useNavigate();

  const {
    useGetTarefasCurso,
    useCreateTarefa,
    useUpdateTarefa,
    useDeleteTarefa,
  } = useTarefasBaseQueries();

  const { data: tarefasMestrado = [] } = useGetTarefasCurso("M");

  const { data: tarefasDoutorado = [] } = useGetTarefasCurso("D");

  const { mutate: createTarefa } = useCreateTarefa();

  const { mutate: updateTarefa } = useUpdateTarefa();

  const { mutate: deleteTarefa } = useDeleteTarefa();

  /*Const Att Tarefas */

  const [showModal, setShowModal] = useState(false);
  const [selectedTarefa, setSelectedTarefa] = useState<TarefaBase>();
  const [isEditing, setIsEditing] = useState(false);
  const [editTarefaNome, setEditTarefaNome] = useState("");
  const [editTarefaPrazo, setEditTarefaPrazo] = useState(0);
  const [editTarefaDescricao, setEditTarefaDescricao] = useState("");

  /* Const Add Tarefas*/
  const [showAddModal, setShowAddModal] = useState(false);
  const [novaTarefaNome, setNovaTarefaNome] = useState("");
  const [novaTarefaPrazo, setNovaTarefaPrazo] = useState(0);
  const [novaTarefaDescricao, setNovaTarefaDescricao] = useState("");
  const [novaTarefaTitulacao, setNovaTarefaTitulacao] =
    useState<TarefaBase["curso"]>("M");

  const handleDelete = () =>
    deleteTarefa(selectedTarefa!.id, {
      onSuccess: () => {
        setShowModal(false);
      },
    });

  const handleEdit = () => {
    const tarefa = {
      ...selectedTarefa,
      id: selectedTarefa!.id,
      nome: editTarefaNome,
      prazo_em_meses: editTarefaPrazo,
      descricao: editTarefaDescricao,
    };

    updateTarefa(tarefa, {
      onSuccess: () => {
        setIsEditing(false);
        setSelectedTarefa(undefined);
      },
    });
  };

  const handleAddTarefa = () => {
    const newTarefa = {
      nome: novaTarefaNome,
      prazo_em_meses: novaTarefaPrazo,
      descricao: novaTarefaDescricao,
      curso: novaTarefaTitulacao,
    };

    createTarefa(newTarefa, {
      onSuccess: () => {
        setShowAddModal(false);
        setNovaTarefaNome("");
        setNovaTarefaPrazo(0);
        setNovaTarefaDescricao("");
        setNovaTarefaTitulacao("M");
      },
    });
  };

  return (
    <div className="contain">
      <div className="botoesTarefas" style={{ marginLeft: "1000px" }}>
        {/* Botão Adicionar Tarefa */}
        <MdOutlineLibraryAdd
          onClick={() => setShowAddModal(true)}
          style={{ cursor: "pointer", marginRight: "30px" }}
          size={35}
          title="Adicionar Tarefa"
        />
        {/* Botão retornar */}
        <MdArrowBack
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer", marginRight: "10px" }}
          size={35}
          title="Voltar"
        />
      </div>

      <h3 style={{ marginBottom: "10px", marginTop: "50px" }}>
        Tarefas Mestrado
      </h3>
      {/* Container de Tarefas de Mestrado*/}
      <div className="containerLista">
        <ul>
          {tarefasMestrado.map((tarefa) => (
            <li key={tarefa.id}>
              {/* Edição das tarefas*/}
              <div>
                {" "}
                {isEditing &&
                selectedTarefa &&
                selectedTarefa.id === tarefa.id ? (
                  <>
                    <label>Nome da Tarefa</label>
                    <input
                      type="text"
                      value={editTarefaNome}
                      onChange={(e) => setEditTarefaNome(e.target.value)}
                      placeholder="Nome da tarefa"
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        padding: "8px",
                      }}
                    />
                    <label>Prazo em meses</label>
                    <input
                      type="number"
                      value={editTarefaPrazo}
                      onChange={(e) =>
                        setEditTarefaPrazo(Number(e.target.value))
                      }
                      placeholder="Prazo em meses"
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        padding: "8px",
                      }}
                    />
                    <label>Descrição</label>
                    <textarea
                      value={editTarefaDescricao}
                      onChange={(e) => setEditTarefaDescricao(e.target.value)}
                      placeholder="Descrição"
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        padding: "8px",
                        height: "80px",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <strong>{tarefa.nome}</strong> - Prazo:{" "}
                    {tarefa.prazo_em_meses} meses
                    <br />
                    Descrição: {tarefa.descricao}
                  </>
                )}
              </div>
              {/* Ação dos botões e ícones - salvar, editar e deletar*/}
              <div>
                {isEditing &&
                selectedTarefa &&
                selectedTarefa.id === tarefa.id ? (
                  <button
                    onClick={handleEdit}
                    style={{
                      marginRight: "10px",
                      width: "120px",
                      height: "30px",
                    }}
                  >
                    Salvar
                  </button>
                ) : (
                  <>
                    <MdCreate
                      style={{ padding: "15px", cursor: "pointer" }}
                      onClick={() => {
                        setIsEditing(true);
                        setEditTarefaNome(tarefa.nome);
                        setEditTarefaPrazo(tarefa.prazo_em_meses);
                        setEditTarefaDescricao(tarefa.descricao);
                        setSelectedTarefa(tarefa);
                      }}
                      size={55}
                    />
                    <MdDelete
                      style={{ cursor: "pointer", padding: "15px" }}
                      onClick={() => {
                        setSelectedTarefa(tarefa);
                        setShowModal(true);
                      }}
                      size={55}
                    />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
        Tarefas Doutorado
      </h3>
      {/*Container de Tarefas de Doutorado */}
      <div className="containerLista">
        <ul>
          {tarefasDoutorado.map((tarefa) => (
            <li key={tarefa.id}>
              {/* Edição das tarefas */}
              <div>
                {" "}
                {isEditing &&
                selectedTarefa &&
                selectedTarefa.id === tarefa.id ? (
                  <>
                    <label>Nome da Tarefa</label>
                    <input
                      type="text"
                      value={editTarefaNome}
                      onChange={(e) => setEditTarefaNome(e.target.value)}
                      placeholder="Nome da tarefa"
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        padding: "8px",
                      }}
                    />
                    <label>Prazo em meses</label>
                    <input
                      type="number"
                      value={editTarefaPrazo}
                      onChange={(e) =>
                        setEditTarefaPrazo(Number(e.target.value))
                      }
                      placeholder="Prazo em meses"
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        padding: "8px",
                      }}
                    />
                    <label>Descrição</label>
                    <textarea
                      value={editTarefaDescricao}
                      onChange={(e) => setEditTarefaDescricao(e.target.value)}
                      placeholder="Descrição"
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        padding: "8px",
                        height: "80px",
                      }}
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    {/* Exibir em tela*/}
                    <strong>{tarefa.nome}</strong> - Prazo:{" "}
                    {tarefa.prazo_em_meses} meses
                    <br />
                    Descrição: {tarefa.descricao}
                  </>
                )}
              </div>
              {/*Ação dos botões e ícones - salvar, editar e deletar*/}
              <div>
                {isEditing &&
                selectedTarefa &&
                selectedTarefa.id === tarefa.id ? (
                  <button
                    onClick={handleEdit}
                    style={{
                      marginRight: "10px",
                      width: "120px",
                      height: "30px",
                    }}
                  >
                    Salvar
                  </button>
                ) : (
                  <>
                    <MdCreate
                      style={{ padding: "15px", cursor: "pointer" }}
                      onClick={() => {
                        setIsEditing(true);
                        setEditTarefaNome(tarefa.nome);
                        setEditTarefaPrazo(tarefa.prazo_em_meses);
                        setEditTarefaDescricao(tarefa.descricao);
                        setSelectedTarefa(tarefa);
                      }}
                      size={55}
                    />
                    <MdDelete
                      style={{ cursor: "pointer", padding: "15px" }}
                      onClick={() => {
                        setSelectedTarefa(tarefa);
                        setShowModal(true);
                      }}
                      size={55}
                    />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de Adicionar Tarefa*/}
      {showAddModal && (
        <div className="confirmationBox">
          <div className="modal" style={{ backgroundColor: "#fff" }}>
            <p style={{ fontWeight: "bold" }}>Adicionar Nova Tarefa</p>
            <label>Nome da Tarefa</label>
            <input
              type="text"
              value={novaTarefaNome}
              onChange={(e) => setNovaTarefaNome(e.target.value)}
              placeholder="Nome da tarefa"
              style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
            />
            <label>Prazo em meses</label>
            <input
              type="number"
              value={novaTarefaPrazo}
              onChange={(e) => setNovaTarefaPrazo(Number(e.target.value))}
              placeholder="Prazo em meses"
              style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
            />
            <label>Descrição</label>
            <textarea
              value={novaTarefaDescricao}
              onChange={(e) => setNovaTarefaDescricao(e.target.value)}
              placeholder="Descrição"
              style={{
                marginBottom: "10px",
                width: "100%",
                padding: "8px",
                height: "80px",
              }}
            />
            <label>Curso</label>
            <select
              value={novaTarefaTitulacao}
              onChange={(e) =>
                setNovaTarefaTitulacao(e.target.value as TarefaBase["curso"])
              }
              style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
            >
              <option value="M">Mestrado</option>
              <option value="D">Doutorado</option>
            </select>
            <ul style={{ display: "flex" }}>
              <button
                onClick={handleAddTarefa}
                style={{ marginRight: "30px", padding: "10px" }}
              >
                Adicionar
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ padding: "10px" }}
              >
                Cancelar
              </button>
            </ul>
          </div>
        </div>
      )}

      {/* Modal de confirmação exclusão*/}
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
            <p>Tem certeza que deseja remover essa tarefa da lista?</p>
            <ul style={{ display: "flex" }}>
              <button
                onClick={handleDelete}
                style={{ marginRight: "30px", padding: "10px" }}
              >
                Sim
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: "10px" }}
              >
                Não
              </button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tarefas;
