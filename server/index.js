const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'banco',
});




app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email],
        (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result.length == 0) {
                db.query("INSERT INTO usuarios (email, password) VALUES (?,?)", [email, password], (err, result) => {
                    if (err) {
                        res.send(err);
                    }
                    res.send({ message: "Usuário criado com sucesso!" }); // Mensagem de sucesso
                });
            } else {
                res.send({ message: "Email já existe!" });
            }
        });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM usuarios  WHERE  email = ? AND password = ?",
        [email, password],
        (err, result) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados:', err); // Logando o erro
        res.status(500).send({ message: 'Erro interno do servidor' });
                // res.send(err);
                return;
            }
            if (Array.isArray(result) && result.length > 0) {
                res.send({ message: "Usuário logado com sucesso!" }); // Mensagem de sucesso
            } else {
                res.send({ message: "Usuário não encontrado!" });
            }
        })
})

app.post("/validate-email", (req, res) => {
    const { email } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).send({ message: "Erro no servidor" });
        }
        if (result.length > 0) {
            res.send({ valid: true, message: "E-mail válido!" });
        } else {
            res.send({ valid: false, message: "E-mail não encontrado!" });
        }
    });
});



app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});
