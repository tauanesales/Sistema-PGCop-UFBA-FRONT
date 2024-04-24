import { useState } from 'react';
import "./styles.css"
import Button from "../../components/ButtonPrimary";

function PerfilCoordenador(){

    const logoPgcomp = "assets/logopgcomp.png"; // Logo

    const alunosData = [
        { id: 1, nome: 'João Silva', matricula: '2022001', titulacao: 'Mestrado', datafinal: '03/05/2024' },
        { id: 2, nome: 'Tauane Souza', matricula: '2022002', titulacao: 'Doutorado', datafinal: '03=18/05/2027' },
        { id: 3, nome: 'Mario Souza', matricula: '2022003', titulacao: 'Mestrado', datafinal: '15/05/2024' },
        { id: 4, nome: 'Ana Clara', matricula: '2022004', titulacao: 'Doutorado', datafinal: '03/07/2027' },
        { id: 5, nome: 'Pedro Henrique', matricula: '2022005', titulacao: 'Mestrado', datafinal: '03/012/2025' },
        { id: 6, nome: 'Carlos Eduardo', matricula: '2022006', titulacao: 'Doutorado', datafinal: '03/05/2026' },
        { id: 7, nome: 'Roberta Santos', matricula: '2022007', titulacao: 'Mestrado', datafinal: '03/08/2025' }
    ];

    const [alunos, setAlunos] = useState(alunosData);
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
        <div className='contain'>
            <header>
                <div className='containerCoordenador'>
                    {/* Logo*/}
                    <img src={logoPgcomp}/>
                    {/* Informações do perfil */}
                    <div className='infoCoordenador'style={{justifyContent:"space-between", marginRight:"20px"}}>
                        <div>
                            <h2 >Augusto Carlos Santos</h2>
                            <h3>Orientandos: {alunos.length}</h3>
                        </div>
                        {/* Botão Vers Solicitações */}
                        <div className="botoesToolbar">
                            <button onClick={() => window.location.href = "/perfil-coordenador/solicitacoes"} 
                                style={{padding: "10px 10px", marginLeft:"0px" , marginRight:"10px", width:'140px',borderRadius: '5px'}}>
                                    Solicitações</button>
                            {/* Botão Tarefas*/}
                            <button onClick={() => window.location.href = "/perfil-coordenador/tarefas"} 
                                style={{padding: "10px 10px", marginRight:"10px",width:'110px', borderRadius: '5px'}}>
                                    Tarefas</button>
                            {/* Botão Sair*/}
                            <button onClick={() => window.location.href = "/"} 
                                style={{padding: "10px 10px", marginRight:"10px",width:'110px', borderRadius: '5px'}}>
                                    Sair</button>
                        </div>
                    </div>
                </div>
            </header>
            

            <h2 style={{textAlign:'center', marginBottom:'10px'}}>Lista de Orientandos</h2>
            {/* Container de Alunos Orientados */}
            <div className='containerOrientandos'>
                <ul>
                    {alunos.map(aluno => (
                        <li style={{cursor:'pointer', padding: '3px 20px', }}
                        key={aluno.id} 
                            onDoubleClick={() => handleDoubleClick(aluno.matricula)}>
                            <div>
                                <strong>{aluno.nome}</strong> - Matrícula: {aluno.matricula} - Titulação: {aluno.titulacao}<br />
                                Conclusão prevista em {aluno.datafinal}
                            </div>
                            <div >
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