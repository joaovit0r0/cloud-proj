const express = require('express');

const app = express();

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'postgres.cxyoeu8woxmh.us-east-2.rds.amazonaws.com',  // Exemplo: mydb.xxxxx.us-west-2.rds.amazonaws.com
    database: 'postgres',
    password: 'postgres',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // isso permite SSL sem verificação do certificado, útil para testes
      }
});

// Testando a Conexão



app.get("/", (req, response) => {
    pool.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            response.json({ error: "Deu ruim" });
        } else {
            console.log('Conexão bem-sucedida:', res.rows);
            response.json({ success: res.rows });
        }
        pool.end();
    });
})

app.listen(3000, () => {
    console.log('Server started at localhost:3000');

})