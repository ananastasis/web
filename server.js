const express = require('express');
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Указываем путь к главной странице сайта (например, formular_zadavanie.html или index.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formular_zadanie.html');
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kniznica_db"
});

app.get("/api/knihy", (req, res) => {
    db.query("SELECT * FROM knihy", (error, knihy) => {
        if (error) return res.status(500).send("Chyba SQL");
        res.json(knihy);
    });
});

app.post("/api/knihy", (req, res) => {
    const { nazov, autor, rok } = req.body;
    db.query("INSERT INTO knihy (nazov, autor, rok) VALUES (?, ?, ?)",
        [nazov, autor, rok], (error) => {
            if (error) return res.status(500).send("Chyba SQL");
            res.send("Kniha pridana");
        });
});

app.delete("/api/knihy/:id", (req, res) => {
    db.query("DELETE FROM knihy WHERE id = ?", [req.params.id], (error) => {
        if (error) return res.status(500).send("Chyba SQL");
        res.send("Kniha vymazana");
    });
});

app.patch("/api/knihy/:id/cena", (req, res) => {
    const zmena = Number(req.body.zmena);
    if (!Number.isFinite(zmena))
        return res.status(400).send("Neplatna zmena");
    const sql = "UPDATE knihy SET cena = cena + ? WHERE id = ?";
    db.query(sql, [zmena, req.params.id], (error, vysledok) => {
        if (error) return res.status(500).send("Chyba SQL");
        if (!vysledok.affectedRows) return res.sendStatus(404);
        res.send("Cena zmenena");
    });
});

app.put("/api/knihy/:id", (req, res) => {
    const { nazov, autor, rok } = req.body;
    if (!nazov || !autor || !Number.isInteger(rok))
        return res.status(400).send("Neplatne udaje");
    const sql = "UPDATE knihy SET nazov = ?, autor = ?, rok = ? WHERE id = ?";
    db.query(sql, [nazov, autor, rok, req.params.id], (error, vysledok) => {
        if (error) return res.status(500).send("Chyba SQL");
        if (!vysledok.affectedRows) return res.sendStatus(404);
        res.send("Kniha upravena");
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});


