/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NewPatient, Gender, EntryType, Entry, NewEntry, HealthCheckRating } from '../types';

/* Type Guard // => returns boolean*/
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSSN = (ssn: any): boolean => {
  return /^\d{6}-\d{3}[A-Za-z0-9]$/.test(ssn);
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isEntry = (entry: any): entry is Entry => {
  return Object.values(EntryType).includes(entry.type);
};

/* Parse inputs */
const parseString = (value: any, field: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${field}: ${value}`);
  }
  return value;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error(`Incorrect or missing SSN: ${ssn}`);
  }
  return ssn;
};

const parseDate = (date: any, field: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${field}: ${date}`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries.length) return [];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  entries.forEach((entry: any) => {
    if (!isEntry(entry)) {
      throw new Error(`Incorrect or missing entry: ${entry}`);
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name, 'name'),
    ssn: parseSSN(object.ssn),
    occupation: parseString(object.occupation, 'occupation'),
    dateOfBirth: parseDate(object.dateOfBirth, 'date of birth'),
    gender: parseGender(object.gender),
    entries: parseEntries(object.entries),
  };
};

/**
 *
 *
 * Entry type checking and parsing
 *
 *
 *
 */

/* Type Guard */
const isHealthCheckRating = (type: any): type is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(type);
};

/* Parse fields */
const parseHealthCheckRating = (type: any): number => {
  if (!isHealthCheckRating(type)) {
    throw new Error(`Incorrect or missing health check rating: ${type}`);
  }
  return type;
};

const toNewEntry = (obj: any): NewEntry => {
  const commonEntry = {
    date: parseDate(obj.date, 'entry date'),
    specialist: parseString(obj.specialist, 'entry specialist'),
    description: parseString(obj.description, 'entry description'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    diagnosisCodes: obj.diagnosisCodes,
  };

  switch (obj.type) {
    case 'Hospital':
      return {
        ...commonEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(obj.discharge.date, 'discharge date'),
          criteria: parseString(obj.discharge.criteria, 'discharge criteria'),
        },
      };
    case 'OccupationalHealthcare':
      let sickLeave;
      if (obj.sickLeave.startDate && obj.sickLeave.endDate) {
        sickLeave = {
          startDate: parseDate(obj.sickLeave.startDate, 'sick leave start date'),
          endDate: parseDate(obj.sickLeave.endDate, 'sick leave end date'),
        };
      }
      return {
        ...commonEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(obj.employerName, 'employer name'),
        sickLeave,
      };
    case 'HealthCheck':
      return {
        ...commonEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(Number(obj.healthCheckRating)),
      };
    default:
      throw new Error('Entry type checking failed');
  }
};

export { toNewPatient, toNewEntry };
