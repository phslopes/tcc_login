import React, { useState } from 'react';
import '../App.css';

export default function SistemaAcademico() {
  const [professores, setProfessores] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [classe, setClasse] = useState([]);
  const [nomeProfessor, setNomeProfessor] = useState('');
  const [nomeDisciplina, setNomeDisciplina] = useState('');
  const [nomeClasse, setNomeClasse] = useState('');

  const cadastrarProfessor = () => {
    if (nomeProfessor.trim()) {
      setProfessores([...professores, nomeProfessor]);
      setNomeProfessor('');
    }
  };

  const removerProfessor = (index) => {
    const novosProfessores = professores.filter((_, i) => i !== index);
    setProfessores(novosProfessores);
  };

  const cadastrarDisciplina = () => {
    if (nomeDisciplina.trim()) {
      setDisciplinas([...disciplinas, nomeDisciplina]);
      setNomeDisciplina('');
    }
  };

  const cadastrarClasse = () => {
    if (nomeClasse.trim()) {
      setClasse([...classe, nomeClasse]);
      setNomeClasse('');
    }
  };

  return (
    <div className="sistema-container">
      {/* Card: Professor */}
      <div className="card">
        <h2>Cadastrar Professor</h2>
        <input
          type="text"
          value={nomeProfessor}
          onChange={(e) => setNomeProfessor(e.target.value)}
          placeholder="Nome do professor"
        />
        <button onClick={cadastrarProfessor}>Cadastrar</button>
        <ul className="item-list">
          {professores.map((prof, index) => (
            <li key={index}>
              {prof}
              <button onClick={() => removerProfessor(index)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Card: Disciplina */}
      <div className="card">
        <h2>Cadastrar Disciplina</h2>
        <input
          type="text"
          value={nomeDisciplina}
          onChange={(e) => setNomeDisciplina(e.target.value)}
          placeholder="Nome da disciplina"
        />
        <button onClick={cadastrarDisciplina}>Cadastrar</button>
        <ul className="item-list">
          {disciplinas.map((disc, index) => (
            <li key={index}>{disc}</li>
          ))}
        </ul>
      </div>

      {/* Card: Classe */}
      <div className="card">
        <h2>Cadastrar Classe</h2>
        <input
          type="text"
          value={nomeClasse}
          onChange={(e) => setNomeClasse(e.target.value)}
          placeholder="Nome da classe"
        />
        <button onClick={cadastrarClasse}>Cadastrar</button>
        <ul className="item-list">
          {classe.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
