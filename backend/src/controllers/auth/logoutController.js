

import { logoutModel } from '../../models/authModel.js';

export default async function logout(req, res) {
    const { email, token } = req.body; 

    try {
        const result = await logoutModel(email, token);

        const isProduction = process.env.NODE_ENV === 'production';
        const secureOption = isProduction;

        res.clearCookie('userData', {
            httpOnly: true,
            secure: secureOption,
            sameSite: 'Lax' 
        });
        

        return res.status(200).json(result); 
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

