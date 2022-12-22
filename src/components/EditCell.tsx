import { Table } from "rsuite";

const EditableCell = ({
  rowData,
  dataKey,
  onChange,
  ...props
}: {
  rowData?: any;
  dataKey: string;
  onChange: Function;
}) => {
  const editing = rowData.status === "EDIT";
  return (
    <Table.Cell {...props} className={editing ? "table-content-editing" : ""}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Table.Cell>
  );
};

export default EditableCell