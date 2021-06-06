import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const [pais, setPais] = useState("");
  const [genero, setGenero] = useState("");
  const [salario, setSalario] = useState(0);

  const [listaEmp, setListaEmp] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      nome: nome,
      idade: idade,
      pais: pais,
      genero: genero,
      salario: salario,
    }).then(() => {
      setListaEmp([
        ...listaEmp,
        {
          nome: nome,
          idade: idade,
          pais: pais,
          genero: genero,
          salario: salario,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setListaEmp(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Nome: </label>
        <input
          type="text"
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
        <label>Idade: </label>
        <input
          type="number"
          onChange={(e) => {
            setIdade(e.target.value);
          }}
        />
        <label>País: </label>
        <input
          type="text"
          onChange={(e) => {
            setPais(e.target.value);
          }}
        />
        <label>Gênero: </label>
        <input
          type="text"
          onChange={(e) => {
            setGenero(e.target.value);
          }}
        />
        <label>Salário: (Anual) </label>
        <input
          type="number"
          onChange={(e) => {
            setSalario(e.target.value);
          }}
        />
        <button className="btn" onClick={addEmployee}>
          Adicionar Funcionário
        </button>
      </div>
      <hr />
      <div className="empregados">
        <button onClick={getEmployees} className="btn">
          Listar Empregados
        </button>
        <table>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>País</th>
            <th>Sexo</th>
            <th>Salário</th>
          </tr>
          {listaEmp.map((val, key) => {
            return (
              <tr>
                <td>{val.id}</td>
                <td>{val.nome}</td>
                <td>{val.idade}</td>
                <td>{val.pais}</td>
                <td>{val.genero}</td>
                <td>{val.salario}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
