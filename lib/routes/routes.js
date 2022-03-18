import express from 'express';
import authentication from '../controllers/authentication.js';
const router = express.Router();


router.post('/dev/auth_server/generate_token', authentication.generateToken);
router.post('/qa/auth_server/generate_token', authentication.generateToken);

router.get('/dev/auth_server/validate_token', authentication.validateToken);
router.get('/qa/auth_server/validate_token', authentication.validateToken);

export default router;