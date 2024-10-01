
import { sessionsModel} from '../../models/authModel.js'


export const sessionsController = async (req, res) => {
    try {
        const sessions = await sessionsModel();
        
        res.json(sessions);
    } catch (error) {
        exceptionHandler(error, res);
    }
};