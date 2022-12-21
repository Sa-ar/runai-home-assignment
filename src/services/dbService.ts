import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';

export enum dataTypesEnum { company = "company", employee = "employee", department = "department" };
const dataTypes: {
  [key in dataTypesEnum]: {
    prefix: string;
    regex: RegExp;
  }
} = {
  company: {
    prefix: "company-",
    regex: new RegExp(/^company-/),
  },
  employee: {
    prefix: "employee-",
    regex: new RegExp(/^employee-/),
  },
  department: {
    prefix: "department-",
    regex: new RegExp(/^department-/),
  }
}


export function getItemById(id: string, type: dataTypesEnum) {
  const value = localStorage.getItem(`${dataTypes[type].prefix}${id}`);
  if (!value) return;

  const item = {
    id,
    ...parseValue(value)
  };

  return item;
}

export function addItem({ name, belongsTo }: { name: string, belongsTo?: string }, type: dataTypesEnum) {
  const id = getLastId(type) + 1;
  localStorage.setItem(`${dataTypes[type].prefix}${id}`, stringifyValue({ name, belongsTo }));

  return { id, name };
}

function stringifyValue({ name, belongsTo }: { name: string, belongsTo?: string }) {
  return JSON.stringify({ name, belongsTo });
}

function parseValue(value: string) {
  return JSON.parse(value);
}

export function update({ id, name, belongsTo }: { id: string | number, name: string, belongsTo?: string }, type: dataTypesEnum) {
  localStorage.setItem(`${dataTypes[type].prefix}${id}`, stringifyValue({ name, belongsTo }));

  return { id, name };
}

export function getAllIds(type: dataTypesEnum) {
  if (!localStorage) return [];

  const ids = Object.keys(localStorage)
    .filter(key => key.match(dataTypes[type].regex))
    .map(id => id.replace(dataTypes[type].regex, ''));

  return ids;
}

export function getLastId(type: dataTypesEnum) {
  const ids = getAllIds(type);
  if (isEmpty(ids)) return 0;

  const lastId = last(ids);

  return Number(lastId);
}

export function getAll(type: dataTypesEnum) {
  const ids = getAllIds(type);
  const items = ids.map(id => getItemById(id, type));

  return items;
}
