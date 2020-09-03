import DiagnosesData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = DiagnosesData as Diagnosis[];

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default { getDiagnoses };
