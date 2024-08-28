const express = require('express');
const cors = require('cors')

const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

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

pool.on("connect", client => {
    client
      .query("CREATE TABLE IF NOT EXISTS clients( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, cpf CHAR(11), born_date DATE NOT NULL, email VARCHAR(255) NOT NULL )")
      .catch(err => console.log(err));
  })

// Rota para listar todos os clientes
app.get('/clients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para buscar um cliente pelo cpf
app.get('/clients/:cpf', async (req, res) => {
  const { cpf } = req.params;
  try {
    const result = await pool.query('SELECT * FROM clients WHERE cpf = $1', [cpf]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar um novo cliente
app.post('/clients', async (req, res) => {
  const { name, cpf, born_date, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO clients (name, cpf, born_date, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, cpf, born_date, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para atualizar os dados de um cliente
app.put('/clients/:id', async (req, res) => {
  const { id } = req.params;
  const { name, cpf, born_date, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE clients SET name = $1, cpf = $2, born_date = $3, email = $4 WHERE id = $5 RETURNING *',
      [name, cpf, born_date, email, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para excluir um cliente
app.delete('/clients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.json({ message: 'Cliente excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
    console.log('Server started at localhost:3000');

})