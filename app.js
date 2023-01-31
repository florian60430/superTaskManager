const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");

const con = mysql.createConnection({
    host: "localhost",
    user: "florian",
    password: "123",
    database: "SuperTasksManager"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/* Ajoute une nouvelle tâche à un dashboard*/
app.post('/api/tasks', (req, res, next) => {

    const id_dashboard = req.body.id_dashboard;
    const id_creator = req.body.id_creator;
    const description = req.body.description;
    const id_contributors = req.body.id_contributors;
    const state = req.body.state;

    var sql = "INSERT INTO task (id_dashboard, id_creator, description, state) VALUES (?, ?, ?, ?)";
    var values = [id_dashboard, id_creator, description, state];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to insert task." });
            return;
        }

        /* recupère l'id crée*/
        let taskId = result.insertId;

        /* Attribut la task aux contributors */
        var sql = "INSERT INTO attribution (id_user, id_task) VALUES (?, ?)";

        for (let i = 0; i < id_contributors.length; i++) {
            values = [id_contributors[i], taskId];
            con.query(sql, values, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({ error: "Failed to insert task." });
                    return;
                }
            });
        }
        res.send({ message: "task inserted successfully, task id: " + taskId });
    });
});

/* Permet d'effacer une task*/
app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id;

    con.query('DELETE FROM task WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to delete task." });
            return;
        }

        res.send({ message: "Task deleted successfully" });
    });
});

/* Permet de passer une tâche de "en cours" à "terminé"*/
app.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const newStatus = req.body.state;

  const sql = "UPDATE task SET state = ? WHERE id = ?";
  const values = [newStatus, taskId];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Failed to update task status." });
      return;
    }
    res.send({ message: "Task status updated successfully." });
  });
});


/* Permet d'afficher la liste des tâches contenues dans un dashboard*/
app.get('/api/dashboards/:id/tasks', (req, res, next) => {
    const id_dashboard = req.params.id;

    var sql = "SELECT task.*, user.name as contributor FROM task LEFT JOIN attribution ON task.id = attribution.id_task LEFT JOIN user ON attribution.id_user = user.id WHERE task.id_dashboard = ?";
    var values = [id_dashboard];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to get tasks." });
            return;
        }

        /* Permet d'afficher la liste des contributors de la tache*/
        const tasks = {};
        result.forEach((row) => {
            if (!tasks[row.id]) {
                tasks[row.id] = {
                    id: row.id,
                    id_dashboard: row.id_dashboard,
                    id_creator: row.id_creator,
                    description: row.description,
                    state: row.state,
                    contributors: []
                };
            }
            if (row.contributor) {
                tasks[row.id].contributors.push(row.contributor);
            }
        });

        res.send(Object.values(tasks));
    });
});

module.exports = app;
