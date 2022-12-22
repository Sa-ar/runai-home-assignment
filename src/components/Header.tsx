
import { useMemo } from 'react';

import { ETables, getAllItems } from '../services/dbService';

function setSelectedCompany(companyId: string) {
  localStorage.setItem("selectedCompany", companyId);
}

export function getSelectedCompany() {
  return localStorage.getItem("selectedCompany");
}

function Header() {
  const companies = useMemo(() => getAllItems(ETables.companies), []);

  return (
    <header>
      <select onChange={e => setSelectedCompany(e.currentTarget.value)} value={getSelectedCompany() || ""}>
        <option value="">Choose a company</option>
        {companies.map(company => (
          <option key={company.id} value={company.id.toString()}>{company.name}</option>
        ))}
      </select>
    </header>
  )
}

export default Header;