interface Props {
  columns: string[];
  children: React.ReactNode;
}
export default function TableForm({ columns, children }: Props) {
  return (
    <div className="relative overflow-x-auto">
      <table className="table-form">
        <thead className={"table-form-head"}>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="p-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
