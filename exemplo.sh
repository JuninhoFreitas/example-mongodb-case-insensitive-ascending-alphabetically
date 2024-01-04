# exemplo.sh
# CURL para criar uma nova pessoa
curl -X POST -H "Content-Type: application/json" -d '{"nome": "João", "idade": 25}' http://localhost:3000/pessoas

# CURL para buscar pessoas com nome "jo"
curl http://localhost:3000/pessoas?nome=jo


