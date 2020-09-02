import { randomBytes } from 'crypto';
import patientData from '../../data/patients';

import { Patient, PatientWithoutSSN, NewPatient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsWithSSN = (): PatientWithoutSSN[] => {
  return patients.map(({ name, id, occupation, gender, dateOfBirth, entries }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
    entries,
  }));
};

const getSinglePatientWithSSN = (id: string): PatientWithoutSSN | undefined => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    throw new Error('Patient not found');
  }

  if (!patient.entries) {
    patient.entries = [];
  }
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: randomBytes(8).toString('hex'),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatientsWithSSN, getSinglePatientWithSSN, addPatient };
