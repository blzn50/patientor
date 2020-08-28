import express from 'express';
import cors from 'cors';

import patientRouter from './src/routes/patients';
import diagnosisRouter from './src/routes/diagnoses';
const app = express();

app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);

const PORT = 4000;

app.listen(PORT, () => console.log(`server listening in port: ${PORT}`));
