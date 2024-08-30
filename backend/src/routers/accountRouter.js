import express from 'express';

// Importa os controladores para a criação, leitura, atualização e exclusão de contas
import createAccount from '../controllers/account/createController.js';
import deleteAccount from '../controllers/account/deleteController.js';
import updateAccount from '../controllers/account/updateController.js';
import getAccountById from '../controllers/account/getByIdController.js';
import getAccount from '../controllers/account/getController.js';

// Importa os controladores para perfil de usuário, preferências, recomendações, detecção de fraudes, e autenticação
import { updateUserProfile, getUserProfile } from '../controllers/account/profileController.js';
import { updateUserPreferences, getUserPreferences } from '../controllers/account/preferencesController.js';
import { recommendCars } from '../controllers/account/recommendationController.js';
import { detectFraud } from '../controllers/account/fraudDetectionController.js';
import loginController from '../controllers/auth/loginController.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

// Rotas para criação, leitura, atualização e exclusão de contas
router.post('/', createAccount); // Criar conta
router.get('/', getAccount); // Obter todas as contas
router.get('/:id', getAccountById); // Obter conta por ID
router.put('/:id', updateAccount); // Atualizar conta por ID
router.delete('/:id', deleteAccount); // Excluir conta por ID

// Rota pública para login
router.post('/login', loginController);

// Aplicar autenticação para as seguintes rotas
router.patch('/:id', authenticateToken, updateAccount);
router.delete('/:id', authenticateToken, deleteAccount);

// Rotas para perfil de usuário
router.get('/profile', getUserProfile);  // Obter o perfil do usuário
router.put('/profile', updateUserProfile);  // Atualizar o perfil do usuário

// Rotas para preferências de usuário
router.get('/preferences', getUserPreferences);  // Obter as preferências do usuário
router.put('/preferences', updateUserPreferences);  // Atualizar as preferências do usuário

// Rotas para recomendação de carros e detecção de fraudes
router.get('/recommendations', recommendCars);  // Recomendar carros ao usuário
router.get('/fraud-detection', detectFraud);  // Detectar comportamentos fraudulentos

export default router;
