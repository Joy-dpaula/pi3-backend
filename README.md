````
### Repositório criado para o backend do Projeto Integrador do 
3° semestre de 2024 so os loucos sabem 🎶🎵

````

´´´´
### Comandos para branch 

git checkout 'nome da branch'

git status

git add .


 
´´´´



´´´´´
 ### Instalando prisma 

npm install prisma --save-dev

npx prisma generate

npx prisma db push


´´´´´
### Para puxar os códigos da branch master para a sua branch atual, siga os seguintes passos:

`````
git checkout sua-branch

git checkout master

git pull origin master

git checkout sua-branch

git merge master


### exemplo de env pq o gustavo é imbecil pinto mole:


DATABASE_URL="mysql://root:aluno@localhost:3306/backend_db"
PORT=5000
ENVIRONMENT=local
HOST=http://localhost
SECRET_KEY=myChavesecreta12345!@#
CLIENT_ORIGIN_URL="*"


`````
