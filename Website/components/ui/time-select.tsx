import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  times: string[];
  disabled?: boolean;
  placeholder?: string;
}

export default function TimeSelect({
  value,
  onChange,
  times,
  disabled = false,
  placeholder = "Select a time",
}: TimeSelectProps) {
  return (
    <Select onValueChange={onChange} value={value} disabled={disabled}>
      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {times.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}