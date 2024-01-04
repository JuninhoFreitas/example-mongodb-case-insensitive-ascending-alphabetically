const axios = require('axios');

async function criarPessoa(nome, idade) {
  try {
    await axios.post('http://localhost:3000/pessoas', { nome, idade });
    console.log(`Pessoa ${nome} criada com sucesso.`);
  } catch (error) {
    console.error(`Erro ao criar pessoa ${nome}.`);
  }
}

async function realizarRequisicoes() {
  // Criar 10 pessoas
  await criarPessoa('Ana', 28);
  await criarPessoa('Zé', 35);
  await criarPessoa('maria', 22);
  await criarPessoa('Carla', 30);
  await criarPessoa('joão', 25);
  await criarPessoa('Pedro', 40);
  await criarPessoa('Alice', 32);
  await criarPessoa('Beto', 27);
  await criarPessoa('carol', 35);
  await criarPessoa('Zara', 28);

  // Buscar pessoas com nome "a" (case-insensitive) e ordenar alfabeticamente
  try {
    const response = await axios.get('http://localhost:3000/pessoas?nome=a');
    const resultados = response.data;

    // resultados.sort((a, b) => a.nome.localeCompare(b.nome));

    // Resultado esperado ordenado alfabeticamente
    const resultadoEsperado = [
      {"nome": "Alice", "idade": 32},
      {"nome": "Ana", "idade": 28},
      {"nome": "Carla", "idade": 30},
      {"nome": "carol", "idade": 35},
      {"nome": "joão", "idade": 25},
      {"nome": "maria", "idade": 22},
      {"nome": "Zara", "idade": 28},
    ];

    // Verificar se os resultados correspondem ao esperado
    const comparacao = JSON.stringify(resultados) === JSON.stringify(resultadoEsperado);

    if (comparacao) {
      console.log('Resultados da busca estão corretos.');
    } else {
      console.error('Erro: Resultados da busca estão incorretos.');
      console.log('Resultados obtidos:', resultados);
    }

  } catch (error) {
    console.error('Erro ao buscar pessoas.');
  }
}

realizarRequisicoes();
