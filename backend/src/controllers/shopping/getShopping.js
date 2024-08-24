import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { exceptionHandler } from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';

const prisma = new PrismaClient()


export default async function getShopping(req, res) {

   try{
    

   }catch(exception) {
    exceptionHandler(exception, res);
}

}