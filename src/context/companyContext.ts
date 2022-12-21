import { createContext } from 'react';

const setCompany: React.Dispatch<React.SetStateAction<string>> = () => {};

export const CompanyContext = createContext({
  company: '',
  setCompany,
});
