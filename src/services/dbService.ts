import isEmpty from 'lodash/isEmpty';

type id = string | number;
export type item = {
  id: id;
  name: string;
  belongsTo?: id;
}
type itemValues = Omit<item, "id">;
export enum tablesEnum { company = "company", employee = "employee", department = "department" };

export function getItemById(id: id, type: tablesEnum) {
  const item = getAll(type).find(item => item.id === id);

  return item;
}

export function addItem({ name, belongsTo }: itemValues, type: tablesEnum) {
  const newItem = {
    id: getNextId(type),
    name,
    belongsTo
  }
  const newTable = [
    ...getAll(type),
    newItem
  ];

  localStorage.setItem(type, JSON.stringify(newTable));

  return newItem;
}

export function getAll(type: tablesEnum) {
  const table = localStorage.getItem(tablesEnum[type]);
  if (!table || isEmpty(table)) return [];

  return JSON.parse(table) as item[];
}

export function update(updatedInfo: item, type: tablesEnum) {
  const table = getAll(type).map(item => item.id === updatedInfo.id ? updatedInfo : item);

  localStorage.setItem(type, JSON.stringify(table));

  return updatedInfo;
}

function getNextId(type: tablesEnum) {
  return getAll(type).length;
}
