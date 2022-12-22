export enum ETables { companies = "companies", departments = "departments", employees = "employees" };
export type ItemType = {
  id: string;
  name: string;
  companyId?: string;
  departmentId?: string;
}
type ItemValuesType = Omit<ItemType, "id">;
type CompanyType = {
  id: string;
  name: string;
}
export type DepartmentType = {
  id: string;
  name: string;
  companyId: string;
}
export type EmployeeType = {
  id: string;
  name: string;
  departmentId: string;
}

export function getAllItems(tableType: ETables): ItemType[] {
  const items = JSON.parse(localStorage.getItem(tableType) || "[]");
  return items;
}

export async function getItem(tableType: ETables, id: string) {
  try {
    const items = await getAllItems(tableType);

    return items.find((item) => item.id === id);
  } catch (error) {
    console.error(error);
  }
}

async function getEmployeesInDepartment(departmentId: string) {
  const employees = await getAllItems(ETables.employees)
    .filter(employee => departmentId === employee.departmentId);

  return employees;
}

export async function getAllDepartmentsByCompanyId(companyId: string): Promise<DepartmentType[]> {
  const companyDepartments = await getAllItems(ETables.departments).filter(department => department.companyId === companyId) as DepartmentType[];

  return companyDepartments;
}

export async function getAllEmployeesByCompanyId(companyId: string) {
  const companyDepartments = await getAllDepartmentsByCompanyId(companyId);
  const companyDepartmentIds = companyDepartments.map(department => department.id);
  const companyEmployees = await getAllItems(ETables.employees)
    .filter(employee => companyDepartmentIds.includes(employee.departmentId!))
    .map(employee => ({ 
      ...employee, 
      departmentName: companyDepartments.find(department => department.id === employee.departmentId)?.name
    }));

  return companyEmployees;
}

export async function addItem(tableType: ETables, newItem: ItemValuesType) {
  const createdItem = { ...newItem, id: createId() };
  try {
    const items = await getAllItems(tableType);

    items.push(createdItem);

    saveTable(tableType, items);
    return createdItem;
  } catch (error) {
    console.error(error);
  }
}

export async function addItemsBatch(tableType: ETables, newItems: ItemValuesType[]) {
  try {
    const items = await getAllItems(tableType);

    const newTable = newItems.map((item) => ({
      ...item,
      id: createId(),
    }));
    items.push(...newTable);

    saveTable(tableType, items);
    return items;
  } catch (error) {
    console.error(error);
  }
}

export async function updateItem(tableType: ETables, updatedItem: ItemType) {
  try {
    const items: ItemType[] = await getAllItems(tableType);
    const index = items.findIndex(
      (item) => item.id === updatedItem.id
    );

    items.splice(index, 1, updatedItem);

    saveTable(tableType, items);
    return updatedItem;
  } catch (error) {
    console.error(error);
  }
}

export async function updateItemsBatch(tableType: ETables, updatedItems: ItemType[]) {
  try {
    const items: ItemType[] = await getAllItems(tableType);

    for (let item of updatedItems) {
      const index = items.findIndex(
        (oldItem) => oldItem.id === item.id
      );
  
      items.splice(index, 1, item);
    }

    saveTable(tableType, items);
    return updatedItems;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteItem(tableType: ETables, itemId: string, moveTo?: string) {
  try {
    if (tableType === ETables.companies) return;
  
    if (tableType === ETables.employees) {
      const deletedEmployee = await deleteEmployee(itemId);

      return deletedEmployee;
    }
    const deletedDepartment = deleteDepartment(itemId, moveTo);
    return deletedDepartment;
  } catch (error) {
    console.error(error);
  }
}

async function deleteDepartment(departmentId: string, moveTo?: string) {
  const departmentEmployees = await getEmployeesInDepartment(departmentId);
  const department = getItem(ETables.departments, departmentId);

  if (!moveTo) {
    await deleteEmployeesBatch(departmentEmployees.map(employee => employee.id));
    localStorage.removeItem(departmentId);

    return department;
  }

  const updatedEmployees = departmentEmployees.map(employee => ({...employee, departmentId: moveTo}));
  updateItemsBatch(ETables.employees, updatedEmployees);

  return department;
}

async function deleteEmployeesBatch(employeeIds: string[]) {
  const deletedEmployees = [];

  for (let employeeId of employeeIds) {
    const deletedEmployee = await deleteEmployee(employeeId);

    deletedEmployees.push(deletedEmployee);
  }

  return deletedEmployees;
}

function deleteEmployee(employeeId: string) {
  const employee = localStorage.getItem(employeeId);

  localStorage.removeItem(employeeId);

  return employee;
}

export function createId() {
  return Math.floor(Math.random() * 1000000).toString();
}

function saveTable(tableType: ETables, items: ItemType[]) {
  localStorage.setItem(tableType, JSON.stringify(items));
}

export async function populateDB() {
  if (localStorage.getItem("populated")) return;

  localStorage.clear();

  const companies = await addItemsBatch(ETables.companies, [
    { name: "Acme Inc." },
    { name: "XYZ Corp." }
  ]);
  const departments = await addItemsBatch(ETables.departments, [
    { name: "Marketing", companyId: companies![0].id },
    { name: "Sales", companyId: companies![0].id },
    { name: "Research", companyId: companies![0].id },
    { name: "Engineering", companyId: companies![1].id },
    { name: "Human Resources", companyId: companies![1].id },
  ]);
  await addItemsBatch(ETables.employees, [
    { name: "Alice", departmentId: departments![0].id },
    { name: "Bob", departmentId: departments![1].id },
    { name: "Eve", departmentId: departments![3].id },
    { name: "Frank", departmentId: departments![3].id },
    { name: "Gina", departmentId: departments![4].id },
    { name: "Henry", departmentId: departments![4].id },
  ]);

  localStorage.setItem("populated", "true");
}
