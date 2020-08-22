const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  { id: "1", title: "Projeto A", tasks: [] },
  { id: "2", title: "Projeto B", tasks: [] },
  { id: "3", title: "Projeto C", tasks: [] },
  { id: "4", title: "Projeto D", tasks: ["Task D1"] }
];

/* Parte Nova */
// Crie um middleware global chamado em todas requisições que imprime (console.log) uma contagem de quantas requisições foram feitas na aplicação até então;
var requisicoes = 0;

server.use((req, res, next) => {
  requisicoes++;
  console.log(`Requisição No.: ${requisicoes};`);
  next();
});

// Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL que verifica se o projeto com aquele ID existe.
//Se não existir retorne um erro, caso contrário permita a requisição continuar normalmente;
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  for (var i = 0, len = projects.length; i < len; i++) {
    if (projects[i].id === id) {
      return next();
    }
  }
  return res.status(400).json({ error: "Project does not exist" });
}

// ******************** ROTAS ********************/
//POST /projects: A rota deve receber id e title dentro corpo de cadastrar um novo projeto dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] };
server.post("/project", (req, res) => {
  const { id, title } = req.body;
  const project = { id: id, title: title, tasks: [] };

  projects.push(project);

  return res.json(projects);
});

//GET /projects: Rota que lista todos projetos e suas tarefas;
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for (var i = 0, len = projects.length; i < len; i++) {
    if (projects[i].id === id) {
      projects[i].title = title;
    }
  }

  return res.json(projects);
});

//DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;
server.delete("/project/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  for (var i = 0, len = projects.length; i < len; i++) {
    if (projects[i].id == id) {
      projects.splice(i, 1);
      return res.send();
    }
  }
  return res.send();
});

//POST /projects/:id/tasks: A rota deve receber um campo title e armazenar uma nova tarefa
//                          no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for (var i = 0, len = projects.length; i < len; i++) {
    if (projects[i].id === id) {
      projects[i].tasks.push(title);
    }
  }

  return res.json(projects);
});

server.listen(3000);
