import { Skeleton } from "@mui/material";

export interface TableColumn<TData> {
  field: string;
  headerName: string;
  width?: number;
  valueGetter?: (value: TData) => string | React.ReactNode;
}
interface TableProps<TData> {
  columns: TableColumn<TData>[];
  rows: TData[];
}
export default function Table<TData>({ columns, rows }: TableProps<TData>) {
  return (
    <div className="relative overflow-x-auto sm:rounded border mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead className="text-xs text-gray-50 uppercase bg-gray-700">
          <tr>
            {columns.map((column, index) => (
              <th key={column.field} scope="col" className="px-6 py-3">
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0
            ? rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-gray-50 border-b hover:bg-gray-100"
                >
                  {columns.map((column) => (
                    <td
                      key={`${rowIndex}_${column.field}`}
                      className="px-6 py-4"
                    >
                      {column.valueGetter
                        ? column.valueGetter(row)
                        : (row as any)[column.field]}
                    </td>
                  ))}
                </tr>
              ))
            : Array.from({ length: 7 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((column) => (
                    <td key={`sk_${i}_${column.field}`} className="px-6 py-4">
                      <Skeleton variant={"text"} />
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
