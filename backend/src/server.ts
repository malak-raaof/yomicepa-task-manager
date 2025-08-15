import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRouter from './routes/auth.js';
import taskRouter from './routes/tasks';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './util/swagger';

export const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});
