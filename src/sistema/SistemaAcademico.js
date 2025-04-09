import React, { useState } from 'react';

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
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Card: Professor */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-2">Cadastrar Professor</h2>
        <input
          type="text"
          value={nomeProfessor}
          onChange={(e) => setNomeProfessor(e.target.value)}
          placeholder="Nome do professor"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={cadastrarProfessor}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cadastrar
        </button>
        <ul className="mt-4">
          {professores.map((prof, index) => (
            <li key={index} className="flex justify-between items-center py-1">
              {prof}
              <button
                onClick={() => removerProfessor(index)}
                className="text-red-500 hover:underline"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Card: Disciplina */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-2">Cadastrar Disciplina</h2>
        <input
          type="text"
          value={nomeDisciplina}
          onChange={(e) => setNomeDisciplina(e.target.value)}
          placeholder="Nome da disciplina"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={cadastrarDisciplina}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Cadastrar
        </button>
        <ul className="mt-4">
          {disciplinas.map((disc, index) => (
            <li key={index}>{disc}</li>
          ))}
        </ul>
      </div>

      {/* Card: Classe */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-2">Cadastrar Classe</h2>
        <input
          type="text"
          value={nomeClasse}
          onChange={(e) => setNomeClasse(e.target.value)}
          placeholder="Nome da classe"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={cadastrarClasse}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Cadastrar
        </button>
        <ul className="mt-4">
          {classe.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
