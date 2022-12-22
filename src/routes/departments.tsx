import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Table } from "rsuite";

import { getSelectedCompany } from "../components/Header";

import {
  ItemType,
  getAllDepartmentsByCompanyId,
  updateItemsBatch,
  ETables,
  deleteItem,
} from "../services/dbService";
import EditableCell from "../components/EditCell";
import ActionCell from "../components/ActionCell";
import AddDepartmentForm from "../components/AddDepartmentForm";

function Departments() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [moveTo, setMoveTo] = useState("");
  const [departmentToDelete, setDepartmentToDelete] = useState("");
  const deleteDepartment = () => {
    const newDepartments = departments.filter(
      (department) => department.id !== departmentToDelete
    );
    setDepartments(newDepartments);
    deleteItem(ETables.departments, departmentToDelete, moveTo);
    setIsOpen(false);
  };

  const handleClose = () => setIsOpen(false);

  const navigate = useNavigate();
  const [departments, setDepartments] = useState<ItemType[]>([]);
  const selectedCompany = getSelectedCompany();
  if (!selectedCompany || selectedCompany === "") navigate("/");

  useEffect(() => {
    getAllDepartmentsByCompanyId(selectedCompany!).then(setDepartments);
  }, [selectedCompany]);

  const handleChange = (id: string, key: string, value: string) => {
    const nextData: ItemType[] = Object.assign([], departments);
    const editItem = nextData.find((item: any) => item.id === id);
    if (!editItem) return;

    editItem[key] = value;
    setDepartments(nextData);
  };
  const handleEditState = (id: string) => {
    const nextData = Object.assign([], departments);
    const activeItem = nextData.find((item: any) => item.id === id);
    if (!activeItem) return;

    activeItem.status = activeItem.status ? null : "EDIT";
    setDepartments(nextData);
    updateItemsBatch(ETables.departments, nextData);
  };

  const handleDelete = (rowData: any) => {
    setModalTitle(`Are you sure you want to delete ${rowData.name}?`);
    setIsOpen(true);
    setDepartmentToDelete(rowData.id);
  };

  return (
    <>
      <AddDepartmentForm setDepartments={setDepartments} />
      <Table width={400} data={departments}>
        <Table.Column width={80} align="center">
          <Table.HeaderCell>Id</Table.HeaderCell>
          <EditableCell dataKey="id" onChange={handleChange} />
        </Table.Column>
        <Table.Column align="center">
          <Table.HeaderCell>Name</Table.HeaderCell>
          <EditableCell dataKey="name" onChange={handleChange} />
        </Table.Column>

        <Table.Column align="center">
          <Table.HeaderCell>Edit</Table.HeaderCell>
          <ActionCell dataKey="id" onClick={handleEditState} />
        </Table.Column>
        <Table.Column align="center">
          <Table.HeaderCell>Delete</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <Button color="red" onClick={() => handleDelete(rowData)}>
                Delete
              </Button>
            )}
          </Table.Cell>
        </Table.Column>
      </Table>

      <Modal
        open={isOpen}
        onClose={handleClose}
        backdrop={true}
        role="alertdialog"
        size="xs"
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Which department will the employees move?
          <select onChange={(e) => setMoveTo(e.currentTarget.value)}>
            <option value="">Remove employees</option>
            {departments
              .filter((department) => departmentToDelete !== department.id)
              .map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteDepartment} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Departments;
