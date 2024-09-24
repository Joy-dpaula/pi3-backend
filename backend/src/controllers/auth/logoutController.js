import  { createSession, deleteSession, checkSession } from '../../models/authModel.js'

export default async function logout(req, res) {
    const { email, token } = req.body
  
    sessionModel.deleteSession(email, token, (error, result) => {
      if (error)
        res.status(500).json({ message: "Erro no Banco de Dados" })
      if (result) {
        if (result.affectedRows) {
          res.json({ message: "Usuário deslogado com sucesso!" })
        } else {
          res.status(404).json({ message: `Session não encontrada` })
        }
      }
    })
  }
  

