


import bcrypt from 'bcryptjs';
import { exceptionHandler } from '../../utils/ajuda.js';
import { update } from '../../models/accountModel.js';




export default async function updateAccount(req, res) {
    try {
        const id = Number(req.params.id);


        if (!id) {
            return res.status(400).json({ error: 'ID não fornecido ou inválido' });
        }

        const { nome, email, senha, cpf, telefone, nascimento, isAdmin } = req.body;
       
        const token = req.accessToken;


        
        const checkUsuario = await del(id);

        if (!checkUsuario || (checkUsuario.email !== token.email && !token.isAdmin)) {
            return res.sendStatus(403);
        }
    
        const usuario =  await update(id,{
            nome,
            email,
            senha: senha ? await bcrypt.hash(senha, 12) : undefined,
            cpf: cpf ? cpf.toString() : undefined,
            telefone: telefone ? telefone.toString() : undefined,
            nascimento: nascimento ? new Date(nascimento) : undefined,
            isAdmin: isAdmin !== undefined ? isAdmin : undefined,
        });

        

      return  res.json(usuario);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
