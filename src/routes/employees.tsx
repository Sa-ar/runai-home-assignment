import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "rsuite";

import { getSelectedCompany } from "../components/Header";
import ActionCell from "../components/ActionCell";
import EditableCell from "../components/EditCell";

import {
  ItemType,
  getAllEmployeesByCompanyId,
  updateItemsBatch,
  ETables,
  deleteItem,
} from "../services/dbService";

import "rsuite-table/dist/css/rsuite-table.css";
import AddEmployeeForm from "../components/AddEmployeeForm";

function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<ItemType[]>([]);
  const selectedCompany = getSelectedCompany();
  if (!selectedCompany || selectedCompany === "") navigate("/");

  useEffect(() => {
    getAllEmployeesByCompanyId(selectedCompany!).then(setEmployees);
  }, [selectedCompany]);

  const handleChange = (id: string, key: string, value: string) => {
    const nextData: ItemType[] = Object.assign([], employees);
    const editItem = nextData.find((item: any) => item.id === id);
    if (!editItem) return;

    editItem[key] = value;
    setEmployees(nextData);
  };
  const handleEditState = (id: string) => {
    const nextData = Object.assign([], employees);
    const activeItem = nextData.find((item: any) => item.id === id);
    if (!activeItem) return;

    activeItem.status = activeItem.status ? null : "EDIT";
    setEmployees(nextData);
    updateItemsBatch(ETables.employees, nextData);
  };

  const handleDelete = (id: string) => {
    const newEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(newEmployees);
    deleteItem(ETables.employees, id);
  };

  return (
    <>
      <AddEmployeeForm setEmployees={setEmployees} />
      <Table height={400} width={500} data={employees}>
        <Table.Column width={80} align="center">
          <Table.HeaderCell>Id</Table.HeaderCell>
          <EditableCell dataKey="id" onChange={handleChange} />
        </Table.Column>
        <Table.Column align="center">
          <Table.HeaderCell>Name</Table.HeaderCell>
          <EditableCell dataKey="name" onChange={handleChange} />
        </Table.Column>
        <Table.Column align="center">
          <Table.HeaderCell>Department</Table.HeaderCell>
          <EditableCell dataKey="departmentName" onChange={handleChange} />
        </Table.Column>

        <Table.Column align="center">
          <Table.HeaderCell>Edit</Table.HeaderCell>
          <ActionCell dataKey="id" onClick={handleEditState} />
        </Table.Column>
        <Table.Column align="center">
          <Table.HeaderCell>Delete</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <Button color="red" onClick={() => handleDelete(rowData.id)}>
                Delete
              </Button>
            )}
          </Table.Cell>
        </Table.Column>
      </Table>
    </>
  );
}

export default Employees;
