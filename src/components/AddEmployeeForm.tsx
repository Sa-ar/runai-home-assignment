import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addItem,
  createId,
  ETables,
  getAllDepartmentsByCompanyId,
  ItemType,
} from "../services/dbService";
import { getSelectedCompany } from "./Header";

function AddEmployeeForm({ setEmployees }: { setEmployees: Function }) {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<ItemType[]>([]);
  const selectedCompany = getSelectedCompany();
  if (!selectedCompany || selectedCompany === "") navigate("/");

  useEffect(() => {
    getAllDepartmentsByCompanyId(selectedCompany!).then((departments) => {
      setDepartments(departments);
      setDepartmentId(departments[0].id);
    });
  }, [selectedCompany]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setEmployees((employees: ItemType[]) => [
      ...employees,
      { id: createId(), name, departmentId },
    ]);
    addItem(ETables.employees, { name, departmentId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" onInput={(e) => setName(e.currentTarget.value)} />
      </label>
      <label>
        Department
        <select onChange={(e) => setDepartmentId(e.currentTarget.value)}>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </label>

      <button role="submit">Submit</button>
    </form>
  );
}

export default AddEmployeeForm;

