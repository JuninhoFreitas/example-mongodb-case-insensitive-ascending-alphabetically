# Inicie o banco de dados MongoDB no Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Execute o arquivo exemplo.sh
chmod +x exemplo.sh
./exemplo.sh

# Usando multipass 
multipass exec d -- docker stop mongodb && multipass exec d -- docker remove mongodb && multipass exec d -- docker run -d -p 27017:27017 --name mongodb mongo