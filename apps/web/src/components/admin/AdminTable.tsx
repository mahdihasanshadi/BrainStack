interface AdminTableProps {
  title: string;
  description?: string;
  count?: number;
  children: React.ReactNode;
}

export function AdminTable({
  title,
  description,
  count,
  children,
}: AdminTableProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5">
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-white">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-white/60">{description}</p>
            ) : null}
          </div>
          {typeof count === "number" ? (
            <span className="rounded-pill border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-brand-yellow-light">
              {count} total
            </span>
          ) : null}
        </div>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

export function AdminTableShell({
  headers,
  rows,
  emptyMessage,
}: {
  headers: string[];
  rows: React.ReactNode[][];
  emptyMessage: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-sm text-white/50">{emptyMessage}</div>
    );
  }

  return (
    <table className="min-w-full text-left text-sm">
      <thead>
        <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/50">
          {headers.map((header) => (
            <th key={header} className="whitespace-nowrap px-4 py-3 font-semibold sm:px-6">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((cells, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b border-white/5 text-white/85 transition-colors hover:bg-white/5"
          >
            {cells.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="whitespace-nowrap px-4 py-3 align-top sm:px-6"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
