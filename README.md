````
### Repositório criado para o backend do Projeto Integrador do 
3° semestre de 2024

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




´´´´´
<<<<<<< Updated upstream
=======
### Para puxar os códigos da branch master para a sua branch atual, siga os seguintes passos:

`````
git checkout sua-branch

git checkout master

git pull origin master

git checkout sua-branch



`````

### dependencias a ser instaladas
```````
npm install express path cookie-parser morgan cors axios stripe
npm install dotenv
npm install @prisma/client
npm install prisma --save-dev
npx prisma init
npm install redis

´´´´´´´´´´

````````
# Iniciar o Servidor em Produção:
npm start

# Iniciar o Servidor em Desenvolvimento:
npm run dev

# Executar Migrações do Prisma:
npm run migrate

# Gerar Cliente Prisma:
npm run generate

# Rodar o Script de Seed:
npm run seed

# Verificar e Corrigir o Código com ESLint:
npm run lint
>>>>>>> Stashed changes
