import { Button, Table } from "rsuite";

const ActionCell = ({
  dataKey,
  onClick,
  ...props
}: {
  dataKey: string;
  onClick: Function;
}) => {
  return (
    <Table.Cell {...props} style={{ padding: "6px" }}>
      {(rowData) => (
        <Button
          appearance="link"
          onClick={() => {
            onClick(rowData.id);
          }}
        >
          {rowData.status === "EDIT" ? "Save" : "Edit"}
        </Button>
      )}
    </Table.Cell>
  );
};

export default ActionCell;
