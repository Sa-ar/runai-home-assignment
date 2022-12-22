import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItem, createId, ETables, ItemType } from "../services/dbService";
import { getSelectedCompany } from "./Header";

function AddDepartmentForm({ setDepartments }: { setDepartments: Function }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const selectedCompany = getSelectedCompany();
  if (!selectedCompany || selectedCompany === "") navigate("/");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setDepartments((departments: ItemType[]) => [
      ...departments,
      { id: createId(), name, companyId: selectedCompany },
    ]);
    addItem(ETables.departments, { name, companyId: selectedCompany! });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" onInput={(e) => setName(e.currentTarget.value)} />
      </label>

      <button role="submit">Submit</button>
    </form>
  );
}

export default AddDepartmentForm;
