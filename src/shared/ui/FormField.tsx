type FormFieldProps = {
  label: string;
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
  required = false,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}: FormFieldProps) => (
  <div className="flex w-full flex-col gap-2">
    <div className="flex items-center gap-1 text-[0.625rem] tracking-[0.0125rem] text-gray-800">
      <span>{label}</span>
      {required && <span className="text-red-500">*</span>}
    </div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={`focus:border-primary-300 w-full rounded-[0.25rem] border bg-white p-2 text-[0.625rem] tracking-[0.0125rem] text-gray-800 outline-none placeholder:text-gray-400 ${error ? 'border-red-400' : 'border-gray-200'}`}
    />
    {error && <p className="text-[0.5625rem] tracking-[0.0125rem] text-red-500">{error}</p>}
  </div>
);
