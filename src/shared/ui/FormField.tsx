import { useId } from 'react';

type FormFieldProps = {
  label: string;
  id?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
};

export const FormField = ({
  label,
  id,
  required = false,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}: FormFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={inputId}
        className="flex items-center gap-1 text-[0.625rem] tracking-[0.0125rem] text-gray-800"
      >
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`focus:border-primary-300 w-full rounded-[0.25rem] border bg-white p-2 text-[0.625rem] tracking-[0.0125rem] text-gray-800 outline-none placeholder:text-gray-400 ${error ? 'border-red-400' : 'border-gray-200'}`}
      />
      {error && (
        <p id={errorId} className="text-[0.5625rem] tracking-[0.0125rem] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
