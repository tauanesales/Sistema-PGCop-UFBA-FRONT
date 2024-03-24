
import React, { useState } from 'react'; //Lib p/ delimitar tarefas


function PerfilAluno(){

    const logoPgcomp = "assets/logopgcomp.png" // Logo

    // A fazer: Att p/ tarefas adicionadas pelo Coordenador
    // A fazer: Alterar Listagem por ID para listagem por prazo mais próximo
    const [tarefas, setTarefas] = useState([
        { id: 1, descricao: 'Qualificacao', prazo:'dd/mm/yyyy', feita: false }, //prazo: (data de inicio + 2y) - data atual
        { id: 2, descricao: 'Artigo', prazo:'dd/mm/yyyy', feita: false },
        { id: 3, descricao: 'Defesa', prazo:'dd/mm/yyyy', feita: false },
        { id: 4, descricao: 'Artigo', prazo:'dd/mm/yyyy', feita: false },
        { id: 5, descricao: 'Defesa', prazo:'dd/mm/yyyy', feita: false },
        { id: 6, descricao: 'Artigo', prazo:'dd/mm/yyyy', feita: false },
        { id: 7, descricao: 'Defesa', prazo:'dd/mm/yyyy', feita: false },
    ]);

    
    // A fazer: Add cores conforme a proximidade do prazo (escala de cor amarelo/laranja/vermelho)
    const handleCheckboxChange = (id) => {
        const updatedTarefas = tarefas.map(tarefa => {
            if (tarefa.id === id) {
                return { ...tarefa, feita: !tarefa.feita };
            }
            return tarefa;
        });
        setTarefas(updatedTarefas);
    }

    const tarefasAFazer = tarefas.filter(tarefa => !tarefa.feita);
    const tarefasFeitas = tarefas.filter(tarefa => tarefa.feita);


    return (
        <div style={{ 
            display: 'flex', // Centralizar os containers
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '0px'
            }}>

            <div class='container' 
                style={{ width:'100%', height:'180px', backgroundColor: 'white',borderRadius:'10px',marginBottom:'30px',
                    maxWidth:'1300px', marginLeft:'auto', marginRight:'auto', alignItems:'center',padding:'0 20px', display: 'flex',
                }}>
                 {/* Logo*/}
                <img src = {logoPgcomp}  width={120} style={{ marginRight: '30px'}}/>
                {/* Informações do perfil */}
                <div style={{ marginRight: '100px', }}>
                    <h3>José Silva José Silva</h3>
                    <p>Titulação: Mestrado/Doutorado</p>
                    <p>Data de Inicio: dd/mm/aaaa</p>
                    <p>Status: Ativo</p>
                </div>
                <div style={{ marginRight: '250px', marginTop:'-41px'}}>
                    <h3>Matrícula: xxxxxxxxx</h3>
                    <p>Orientador(a): Augusto Carlos</p>
                    <p>Data de Término: dd/mm/aaaa</p>
                </div>

                {/* Botão Atualizar Dados */}
                <button style={{marginRight:'20px',marginBottom:'110px', padding:'5px 10px'}}>Atualizar Dados</button>
                {/* Botão Sair */}
                <button style={{marginBottom:'110px', padding:'5px 20px', }}> Sair </button>
            </div>


            {/* Enquadramento Containers Quadro de Tarefa */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-around', // Posição container
                width: '1200px' }}>

                {/* Container 2 - Quadro de Tarefas A fazer */}
                <div style={{
                    height: '480px', 
                    width: '38%',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    overflowY: 'auto', //Barra de rolagem
                    }}>  
                    {/* Conteúdo do segundo container */}
                    <h3 style={{ textAlign:'center'}}>TAREFAS A FAZER</h3>
                    {tarefasAFazer.map(tarefa => (
                        <div id='task' key={tarefa.id} 
                        style={{ width:'80%',margin:'10px 0', backgroundColor:'#FFA500',marginLeft: 'auto',
                        marginRight: 'auto',border:'1px solid grey', padding:'10px', borderRadius:'5px'}}>
                            <input type="checkbox" class='checkbox' 
                                checked={tarefa.feita}
                                onChange={() => handleCheckboxChange(tarefa.id)} />
                            <label style={{ marginLeft: '5px',fontSize:'17px', fontWeight:'500'}}>{tarefa.descricao}</label>
                            <br></br>
                            <label style={{ marginLeft: '30px', fontSize:'14px'}}>Data Limite: {tarefa.prazo}</label>
                        </div>
                    ))}

                </div>



                {/* Container 3 - Quadro de Tarefas Feito **/}
                <div style={{
                    height: '480px', 
                    width: '38%',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    overflowY: 'auto', //Barra de rolagem
                    }}>
                    {/* Conteúdo do terceiro container */}
                    <h3 style={{textAlign:'center'}}>TAREFAS FEITAS</h3>
                    {tarefasFeitas.map(tarefa => (
                         <div id='task' key={tarefa.id} 
                         style={{ width:'80%',margin:'10px 0', backgroundColor:'#00BFFF',marginLeft: 'auto',
                         marginRight: 'auto',border:'1px solid grey', padding:'10px', borderRadius:'5px' }}>
                            <input type="checkbox" class='checkbox' 
                                checked={tarefa.feita}
                                onChange={() => handleCheckboxChange(tarefa.id)}/>
                            <label style={{ marginLeft: '5px',fontSize:'17px', fontWeight:'500'}}>{tarefa.descricao}</label>
                            <br></br>
                            <label style={{ marginLeft: '30px', fontSize:'14px'}}>Data Limite: {tarefa.prazo}</label>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}


export default PerfilAluno