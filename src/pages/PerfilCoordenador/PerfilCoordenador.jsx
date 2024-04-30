import { useState } from 'react';
import "./styles.css"
import Button from "../../components/Button";
import { AiOutlineUsergroupAdd, AiOutlineFileSync, AiOutlineLogout } from 'react-icons/ai'; // Importando os ícones

function PerfilCoordenador(){

    const logoPgcomp = "assets/logo-pgcop2.png"; // Logo

    const alunosMestrado =[
      { id: 1, nome: 'João Silva', matricula: '2022001', titulacao: 'Mestrado', datafinal: '03/05/2024' },
      { id: 2, nome: 'Mario Souza', matricula: '2022003', titulacao: 'Mestrado', datafinal: '15/05/2024' },
      { id: 3, nome: 'Pedro Henrique', matricula: '2022005', titulacao: 'Mestrado', datafinal: '03/012/2025' },
      { id: 4, nome: 'Roberta Santos', matricula: '2022007', titulacao: 'Mestrado', datafinal: '03/08/2025' }
  ]

  const alunosDoutorado = [
      { id: 2, nome: 'Tauane Souza', matricula: '2022002', titulacao: 'Doutorado', datafinal: '03=18/05/2027' },
      { id: 4, nome: 'Ana Clara', matricula: '2022004', titulacao: 'Doutorado', datafinal: '03/07/2027' },
      { id: 6, nome: 'Carlos Eduardo', matricula: '2022006', titulacao: 'Doutorado', datafinal: '03/05/2026' },
  ];

  const [mestrandos, setMestrandos] = useState(alunosMestrado)
  const [alunos, setAlunos] = useState(alunosDoutorado);
  const [showModal, setShowModal] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);

    const handleDoubleClick = (matricula) => {
        const aluno = alunos.find(aluno => aluno.matricula === matricula);
        if (aluno) {
            window.open(`/perfil-aluno`);
        }
    }

    const handleDelete = () => {
        const updatedAlunos = alunos.filter(aluno => aluno.id !== selectedAluno.id);
        setAlunos(updatedAlunos);
        setShowModal(false);
    }

    return (
        <div className="contain">
          <header>
            <div className="containerCoordenador">
              {/* Logo*/}
              <img src={logoPgcomp} alt="Logo" />
              {/* Informações do perfil */}
              <div className="infoCoordenador" style={{ justifyContent: "space-between", marginRight: "20px" }}>
                <div>
                  <h2 >Augusto Carlos Santos</h2>
                  <h3>Orientandos: {alunos.length + mestrandos.length}</h3>
                </div>
                {/* Botões Toolbar */}
                <div className="botoesToolbar">
                  <div >
                    <AiOutlineUsergroupAdd 
                      onClick={() => window.location.href = "/perfil-coordenador/solicitacoes"} 
                      style={{ cursor: 'pointer', marginRight: "30px" }}
                      size={35} 
                      title="Solicitações" 
                    />
                  </div>
                  <div >
                    <AiOutlineFileSync 
                      onClick={() => window.location.href = "/perfil-coordenador/tarefas"} 
                      style={{ cursor: 'pointer', marginRight: "30px" }}
                      size={35} 
                      title="Tarefas" 
                    />
                  </div>
                  <div>
                    <AiOutlineLogout 
                      onClick={() => window.location.href = "/"} 
                      style={{ cursor: 'pointer', marginRight: "30px" }}
                      size={35} 
                      title="Sair" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>
            

            <h2 style={{textAlign:'center', marginBottom:'10px'}}>Alunos do Doutorado</h2>
            <h2 style={{textAlign:'center', marginBottom:'10px'}}>Alunos do Doutorado</h2>
            <h2 style={{textAlign:'center', marginBottom:'10px'}}>Alunos do Doutorado</h2>
            {/* Container de Alunos Orientados */}
            <div className='containerOrientandos'>
                <ul>
                    {alunos.map(aluno => (
                        <li style={{cursor:'pointer', padding: '7px 20px', }}
                        key={aluno.id} 
                            onDoubleClick={() => handleDoubleClick(aluno.matricula)}>
                            <div>
                                <strong>{aluno.nome}</strong> - Matrícula: {aluno.matricula} - Titulação: {aluno.titulacao}<br />
                                Conclusão prevista em {aluno.datafinal}
                            </div>
                            <div >
                                <button onClick={() => window.location.href = "/perfil-aluno"}
                                        style={{marginRight: '10px', height:'30px', borderRadius:'5px', width:'95px', fontSize: '13px'}}>
                                        Abrir</button>
                                <button onClick={() => {
                                    setSelectedAluno(aluno);
                                    setShowModal(true);
                                }} style={{marginRight: '10px', height:'30px', borderRadius:'5px', width:'95px', fontSize: '13px'}}>
                                    Remover
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <h2 style={{textAlign:'center', marginBottom:'10px'}}>Alunos do Mestrado</h2>
            {/* Container de Alunos Orientados */}
            <div className='containerOrientandos'>
                <ul>
                    {mestrandos.map(aluno => (
                        <li style={{cursor:'pointer', padding: '7px 20px', }}
                        key={aluno.id} 
                            onDoubleClick={() => handleDoubleClick(aluno.matricula)}>
                            <div>
                                <strong>{aluno.nome}</strong> - Matrícula: {aluno.matricula} - Titulação: {aluno.titulacao}<br />
                                Conclusão prevista em {aluno.datafinal}
                            </div>
                            <div >
                                <button onClick={() => window.location.href = "/perfil-aluno"}
                                        style={{marginRight: '10px', height:'30px', borderRadius:'5px', width:'95px', fontSize: '13px'}}>
                                          Abrir</button>
                                <button onClick={() => {
                                    setSelectedAluno(aluno);
                                    setShowModal(true);
                                }} style={{marginRight: '10px', height:'30px', borderRadius:'5px', width:'95px', fontSize: '13px'}}>
                                    Remover
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal de confirmação */}
            {showModal && (
                <div className='confirmationBox'>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '10px',
                        width: '300px',
                        textAlign: 'center',}}>
                        <p>Tem certeza que deseja remover esse aluno da sua lista?</p>
                        <ul style={{display: 'flex'}}>
                            <button onClick={handleDelete} style={{marginRight: '30px', padding: "10px" }}>Sim</button>
                            <button onClick={() => setShowModal(false)} style={{padding: "10px" }}>Não</button>
                        </ul>
                    </div>
                </div>
            )}

        </div>
    )
}

export default PerfilCoordenador;