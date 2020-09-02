/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NewPatient, Gender, EntryType, Entry } from '../types';

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

const isEntryType = (entry: any): entry is Entry => {
  return Object.values(EntryType).includes(entry.type);
};

/* Parse inputs */
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error(`Incorrect or missing SSN: ${ssn}`);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect or missing date of birth: ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseEntryType = (entries: any): Entry[] => {
  if (!entries.length) return [];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  entries.forEach((entry: any) => {
    if (!isEntryType(entry)) {
      throw new Error(`Incorrect or missing entry: ${entry}`);
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    occupation: parseOccupation(object.occupation),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    entries: parseEntryType(object.entries),
  };
};

export default toNewPatient;
