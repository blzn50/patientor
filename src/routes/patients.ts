import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from './../utils/index';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsWithSSN());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (ex) {
    const e = ex as Error;
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getSinglePatientWithSSN(id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;
