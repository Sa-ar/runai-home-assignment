import { addItem, tablesEnum } from "../services/dbService";

export function dbInit() {
  localStorage.clear();

  addItem({ name: "Acme Inc." }, tablesEnum.company);
  addItem({ name: "XYZ Corp." }, tablesEnum.company);
  
  addItem({ name: "Marketing", belongsTo: 0}, tablesEnum.department),
  addItem({ name: "Sales", belongsTo: 0}, tablesEnum.department),
  addItem({ name: "Research", belongsTo: 0}, tablesEnum.department),
  addItem({ name: "Engineering", belongsTo: 1}, tablesEnum.department),
  addItem({ name: "Human Resources", belongsTo: 1}, tablesEnum.department)
  
  addItem({ name: "Alice", belongsTo: 0}, tablesEnum.employee);
  addItem({ name: "Bob", belongsTo: 1}, tablesEnum.employee);
  addItem({ name: "Eve", belongsTo: 3}, tablesEnum.employee);
  addItem({ name: "Frank", belongsTo: 3}, tablesEnum.employee);
  addItem({ name: "Gina", belongsTo: 4}, tablesEnum.employee);
  addItem({ name: "Henry", belongsTo: 4}, tablesEnum.employee);
}
