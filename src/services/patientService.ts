import { randomBytes } from 'crypto';
import patientData from '../../data/patients';

import { Patient, PatientWithoutSSN, NewPatient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsWithSSN = (): PatientWithoutSSN[] => {
  return patients.map(({ name, id, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: randomBytes(8).toString('hex'),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatientsWithSSN, addPatient };
