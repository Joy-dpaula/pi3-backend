import {getPaginatedUsers,  getUsersSummary} from '../controllers/admin/userController.js'


const router = express.Router();

router.get('/paginated', getPaginatedUsers);
router.get('/summary', getUsersSummary);

export default router;