import { Input } from "./input";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-200">{label}</label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
        required={required}
      />
    </div>
  );
}