// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// 2. Conexão ao banco de dados
mongoose.connect('mongodb://172.25.146.150:27017/pessoasdb', { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true });

// 2.1. Criação da collection 'pessoas' e índice case insensitive para o campo 'nome'
const pessoaSchema = new mongoose.Schema({
  nome : { type: String, text : true },
  idade: Number
});
// pessoaSchema.path('nome').index({ text: true, caseInsensitive: true });
// pessoaSchema.index({ nome: 'text'});

const Pessoa = mongoose.model('Pessoa', pessoaSchema);

// 3. Rota GET /pessoas
app.get('/pessoas', async (req, res) => {
  const nomeQuery = req.query.nome || '';
  const pessoas = await Pessoa.find({ $text: { $search: nomeQuery }})
  .collation({ locale: 'pt', strength: 1, caseLevel: true })
  .sort({ nome: 1 });
  res.json(pessoas);
});

// 4. Rota POST /pessoas
app.post('/pessoas', async (req, res) => {
  const { nome, idade } = req.body;

  try {
    const novaPessoa = new Pessoa({ nome, idade });
    await novaPessoa.save();
    res.json({ mensagem: 'Pessoa criada com sucesso!' });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar pessoa.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
