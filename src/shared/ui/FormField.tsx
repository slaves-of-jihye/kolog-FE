type FormFieldProps = {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export const FormField = ({
  label,
  required = false,
  type = 'text',
  placeholder,
  value,
  onChange,
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
      className="w-full rounded-[0.25rem] border border-gray-200 bg-white p-2 text-[0.625rem] tracking-[0.0125rem] text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-400"
    />
  </div>
);
