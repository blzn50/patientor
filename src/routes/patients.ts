import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from './../utils/index';

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
  try {
    const patient = patientService.getSinglePatientWithSSN(id);
    res.send(patient);
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error) {
    const e = error as Error;
    res.status(400).send(e.message);
  }
});

export default router;
