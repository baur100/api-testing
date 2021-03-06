import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
const router = express();
const PORT = 6060;
import swaggerUi from 'swagger-ui-express';
import routes from './routes/routes.js';
import swagger from './swagger.js';

router.use(express.urlencoded({ extended: false }));
router.use(express.json());


// Cors set-up
// eslint-disable-next-line consistent-return
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

// Routes
// Swagger set-up
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swagger));
routes.get('/', (req, res)=>{
    res.sendFile('index.htm', { root: path.join(__dirname, './') });
});
router.use('/', routes);

// Error handling
router.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message,
    });
});

// Server
router.listen(PORT, (err) =>{
    if (err) console.log(err);
    console.log('Server listening on PORT', PORT);
});
