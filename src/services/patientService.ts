import { randomBytes } from 'crypto';
import patientData from '../../data/patients';

import { Patient, PatientWithoutSSN, NewPatient, Gender } from '../types';

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

const addPatient = (obj: any): NewPatient => {
  // const newPatient = {
  //   id: randomBytes(16).toString(),
  //   ...obj
  // };
  // patients.push(newPatient);
  // return newPatient;
};

export default { getPatients, getPatientsWithSSN };
