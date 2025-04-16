import React, { useState } from 'react';
import './SistemaAcademico.css';

export default function SistemaAcademico() {
  const [professores, setProfessores] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [classe, setClasse] = useState([]);

  const [nomeProfessor, setNomeProfessor] = useState('');
  const [nomeDisciplina, setNomeDisciplina] = useState('');
  const [nomeClasse, setNomeClasse] = useState('');

  const [editandoIndexProfessor, setEditandoIndexProfessor] = useState(null);
  const [novoNomeProfessor, setNovoNomeProfessor] = useState('');

  const [editandoIndexDisciplina, setEditandoIndexDisciplina] = useState(null);
  const [novoNomeDisciplina, setNovoNomeDisciplina] = useState('');

  const [editandoIndexClasse, setEditandoIndexClasse] = useState(null);
  const [novoNomeClasse, setNovoNomeClasse] = useState('');

  const cadastrar = (nome, lista, setLista, setNome, label) => {
    if (!nome.trim()) {
      alert(`Nome do(a) ${label} não pode estar em branco.`);
      return;
    }
    if (lista.includes(nome)) {
      alert(`${label.charAt(0).toUpperCase() + label.slice(1)} já cadastrado(a).`);
      return;
    }
    setLista([...lista, nome]);
    setNome('');
    alert(`${label.charAt(0).toUpperCase() + label.slice(1)} cadastrado(a) com sucesso!`);
  };

  const remover = (index, lista, setLista, label) => {
    if (window.confirm(`Tem certeza que deseja remover este(a) ${label}?`)) {
      const novo = lista.filter((_, i) => i !== index);
      setLista(novo);
    }
  };

  const salvarEdicao = (index, novoNome, setNovoNome, lista, setLista, setEditandoIndex, label) => {
    if (!novoNome.trim()) {
      alert(`Nome do(a) ${label} não pode estar em branco.`);
      return;
    }
    const atualizado = [...lista];
    atualizado[index] = novoNome;
    setLista(atualizado);
    setEditandoIndex(null);
    setNovoNome('');
  };

  return (
    <div className="sistema-container">
      {[{
        titulo: 'Professor',
        lista: professores,
        nome: nomeProfessor,
        setNome: setNomeProfessor,
        cadastrar: () => cadastrar(nomeProfessor, professores, setProfessores, setNomeProfessor, 'professor'),
        remover: (index) => remover(index, professores, setProfessores, 'professor'),
        editar: editandoIndexProfessor,
        setEditar: setEditandoIndexProfessor,
        novoNome: novoNomeProfessor,
        setNovoNome: setNovoNomeProfessor,
        salvar: (index) => salvarEdicao(index, novoNomeProfessor, setNovoNomeProfessor, professores, setProfessores, setEditandoIndexProfessor, 'professor')
      }, {
        titulo: 'Disciplina',
        lista: disciplinas,
        nome: nomeDisciplina,
        setNome: setNomeDisciplina,
        cadastrar: () => cadastrar(nomeDisciplina, disciplinas, setDisciplinas, setNomeDisciplina, 'disciplina'),
        remover: (index) => remover(index, disciplinas, setDisciplinas, 'disciplina'),
        editar: editandoIndexDisciplina,
        setEditar: setEditandoIndexDisciplina,
        novoNome: novoNomeDisciplina,
        setNovoNome: setNovoNomeDisciplina,
        salvar: (index) => salvarEdicao(index, novoNomeDisciplina, setNovoNomeDisciplina, disciplinas, setDisciplinas, setEditandoIndexDisciplina, 'disciplina')
      }, {
        titulo: 'Classe',
        lista: classe,
        nome: nomeClasse,
        setNome: setNomeClasse,
        cadastrar: () => cadastrar(nomeClasse, classe, setClasse, setNomeClasse, 'classe'),
        remover: (index) => remover(index, classe, setClasse, 'classe'),
        editar: editandoIndexClasse,
        setEditar: setEditandoIndexClasse,
        novoNome: novoNomeClasse,
        setNovoNome: setNovoNomeClasse,
        salvar: (index) => salvarEdicao(index, novoNomeClasse, setNovoNomeClasse, classe, setClasse, setEditandoIndexClasse, 'classe')
      }].map((item, idx) => (
        <div className="card" key={idx}>
          <h2>Cadastrar {item.titulo}</h2>
          <input
            type="text"
            value={item.nome}
            onChange={(e) => item.setNome(e.target.value)}
            placeholder={`Nome do(a) ${item.titulo.toLowerCase()}`}
          />
          <button onClick={item.cadastrar}>Cadastrar</button>
          <ul className="item-list">
            {item.lista.map((valor, index) => (
              <li key={index}>
                {item.editar === index ? (
                  <>
                    <input
                      value={item.novoNome}
                      onChange={(e) => item.setNovoNome(e.target.value)}
                    />
                    <button onClick={() => item.salvar(index)}>Salvar</button>
                  </>
                ) : (
                  <>
                    <span>{valor}</span>
                    <button onClick={() => item.setEditar(index)}>Editar</button>
                    <button onClick={() => item.remover(index)}>Remover</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
