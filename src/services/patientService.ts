import patientData from '../../data/patients';

import { Patient, PatientWithoutSSN } from '../types';

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

export default { getPatients, getPatientsWithSSN };
