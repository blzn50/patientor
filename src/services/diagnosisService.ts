import DiagnosesData from '../../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = DiagnosesData as Diagnose[];

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default { getDiagnoses };
