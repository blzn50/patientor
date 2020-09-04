import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';

import { Patient, PatientWithoutSSN, NewPatient, NewEntry, Entry } from '../types';

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

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    id: uuidv4(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error('Patient not found!');
  }

  const newEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    id: uuidv4(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getPatients, getPatientsWithSSN, getSinglePatientWithSSN, addPatient, addEntry };
