
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

const dbConfig = {
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "appuser",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "holamundo"
};

app.get("/", async (req, res) => {
    try {
        const conexion = await mysql.createConnection(dbConfig);

        const [resultado] = await conexion.query(
            "SELECT 'Hola Mundo desde MySQL' AS mensaje"
        );

        await conexion.end();

        res.send(`
            <h1>Hola Mundo con Docker</h1>
            <p>Aplicacion desarrollada con Node.js y Express.</p>
            <p>Base de datos: MySQL</p>
            <p>Estado: Conexion exitosa</p>
            <h3>${resultado[0].mensaje}</h3>
        `);

    } catch (error) {
        console.error("Error de conexion:", error.message);

        res.status(500).send(
            "No se pudo conectar a MySQL. Revisa los logs."
        );
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor ejecutandose en puerto ${PORT}`);
});
