const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeesystem",
});

app.post("/create", (req, res) => {
  const nome = req.body.nome;
  const idade = req.body.idade;
  const pais = req.body.pais;
  const genero = req.body.genero;
  const salario = req.body.salario;

  db.query(
    "INSERT INTO employees (nome, idade, pais, genero, salario) VALUES (?,?,?,?,?)",
    [nome, idade, pais, genero, salario],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Funcionário Cadastrado");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("E ai babaca, to rodando aqui viu!");
});
