type LabeledFieldProps = {
  label: string;
  value: string | number;
  className?: string;
};

export function LabeledField({
  label,
  value,
  className = "",
}: LabeledFieldProps) {
  return (
    <div className={className}>
      {label && (
        <label className="text-xs text-gray-600 block mb-1.5 font-normal">
          {label}
        </label>
      )}
      <div className="text-sm text-gray-900 bg-white border border-gray-300 rounded px-3 py-2.5">
        {value}
      </div>
    </div>
  );
}

type DetailsRowProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function DetailsRow({
  label,
  children,
  className = "",
}: DetailsRowProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-start gap-4 md:gap-6 py-4 ${className}`}
    >
      <div className="text-sm text-gray-700 font-bold md:w-60 shrink-0">
        {label}
      </div>
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
}

type FieldsGridProps = {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
};

export function FieldsGrid({
  children,
  cols = 2,
  className = "",
}: FieldsGridProps) {
  return (
    <div
      className={`grid ${
        cols === 1
          ? "grid-cols-1"
          : cols === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : cols === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      } gap-4 ${className}`}
    >
      {children}
    </div>
  );
}

type DetailsTableProps = {
  children: React.ReactNode;
  className?: string;
};

export function DetailsTable({ children, className = "" }: DetailsTableProps) {
  return <div className={`bg-white ${className}`}>{children}</div>;
}
