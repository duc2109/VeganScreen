import React from "react";

export interface DataTableColumn {
  key: string;
  label: string;
  className?: string;
}

export function TableCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-stone-200 rounded-[20px] shadow-sm overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function Table({
  children,
  className = "",
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table className={`w-full text-left border-collapse select-none ${className}`}>
      {children}
    </table>
  );
}

export function TableHeader({
  children,
  className = "",
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={`bg-stone-50 border-b border-stone-200 ${className}`}>
      {children}
    </thead>
  );
}

export function TableBody({
  children,
  className = "",
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={`divide-y divide-stone-100 ${className}`}>{children}</tbody>;
}

export function TableRow({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`h-14 transition-colors hover:bg-stone-50/80 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className = "",
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`h-11 px-6 text-xs font-semibold uppercase tracking-wider text-stone-500 align-middle ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`px-6 text-base text-stone-800 align-middle ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: Record<string, React.ReactNode>[];
  className?: string;
}

/** High-level helper — renders a styled card table from columns & rows data. */
export function DataTable({ columns, rows, className = "" }: DataTableProps) {
  return (
    <TableCard className={className}>
      <Table>
        <TableHeader>
          <tr>
            {columns.map((col) => (
              <TableHead key={col.key} className={col.className}>
                {col.label}
              </TableHead>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col) => (
                <TableCell key={col.key} className={col.className}>
                  {row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableCard>
  );
}
