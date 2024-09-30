import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Admin = prisma.admin;

export default Admin;
