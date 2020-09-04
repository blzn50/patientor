export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthCare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  description: string;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export type NewEntry =
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthCareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
