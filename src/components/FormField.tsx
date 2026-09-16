import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

export default function FormField({
  label,
  error,
  required,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
