````
### Repositório criado para o backend do Projeto Integrador do 
3° semestre de 2024 so os loucos sabem 🎶🎵

````

 ### Comandos do prisma 

npm run prisma:local:push

npm run prisma:local:pull

npm run prisma:local:generate

npm run prisma:local:migrate



´´´´´
### Para puxar os códigos da branch master para a sua branch atual, siga os seguintes passos:

`````
git checkout sua-branch

git checkout master

git pull origin master

git checkout sua-branch

git merge master


`````
### exemplo de env:
`````

DATABASE_URL="mysql://root:aluno@localhost:3306/backend_db"
PORT=5000
ENVIRONMENT=local
HOST=http://localhost
SECRET_KEY=myChavesecreta12345!@#
CLIENT_ORIGIN_URL="*"

export async function newShopping({ usuarioId, veiculoId }) {

    const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioId }
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    const veiculo = await prisma.veiculo.findUnique({
        where: { id: veiculoId }
    });

    if (!veiculo) {
        throw new Error('Veículo não encontrado.');
    }
    const existingPurchase = await prisma.compra.findFirst({
        where: {
            veiculoId: veiculoId
        }
    });

    if (existingPurchase) {
        throw new Error('Veículo já comprado');
    }

    const compra = await prisma.compra.create({
        data: {
            veiculoId: veiculoId,
            usuarioId: usuarioId,
            status: 'pendente'
        },
        select: {
            id: true,
            status: true
        }
    });

    return { compra }

}
