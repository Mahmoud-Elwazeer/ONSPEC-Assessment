import 'dotenv/config';
import express from "express";
import helmet from "helmet";
import { handleRoutes } from './routes/index'
import { globalError } from './middlewares/errorMiddleware';
import logMiddleware from './middlewares/log';
import limiter from './middlewares/rateLimiter';
import cors from 'cors';

// env
const PORT = process.env.PORT || 3000;

// app
const app = express();

app.use(cors());
app.options('*', cors()); 

// Security
app.use(helmet());
app.disable("x-powered-by");

// Trust the proxy (Nginx)
app.set('trust proxy', 1);

// Receiving JSON Data
app.use(express.json());


app.use(limiter);
app.use(logMiddleware);

// call routes
handleRoutes(app);

// must be after all routes middleware for handle error
app.use(globalError);

export default app;
