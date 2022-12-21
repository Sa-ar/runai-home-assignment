
import { useContext, useMemo } from 'react';
import { CompanyContext } from '../context/companyContext';
import { getAll, tablesEnum } from '../services/dbService';

function Header() {
  const { setCompany } = useContext(CompanyContext)
  const companies = useMemo(() => getAll(tablesEnum.company), [])

  return (
    <header>
      <select onChange={e => setCompany(e.currentTarget.value)}>
        <option value="">Choose a company</option>
        {companies.map(company => (
          <option key={company.id} value={company.id.toString()}>{company.name}</option>
        ))}
      </select>
    </header>
  )
}

export default Header;