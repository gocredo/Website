import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  placeholderText?: string;
  className?: string;
}

const CustomDatePicker = forwardRef<DatePicker, CustomDatePickerProps>(
  ({ selected, onChange, minDate, placeholderText = "DD/MM/YYYY", className }, ref) => {
    return (
      <>
        <style jsx global>{`
          .react-datepicker {
            background-color: #111827 !important; /* bg-gray-900 */
            border: 1px solid #374151 !important; /* border-gray-700 */
            border-radius: 0.5rem !important;
            color: #ffffff !important; /* text-white */
            font-family: inherit !important;
          }
          .react-datepicker__header {
            background-color: #1f2937 !important; /* bg-gray-800 */
            border-bottom: 1px solid #374151 !important; /* border-gray-700 */
            color: #ffffff !important; /* text-white */
          }
          .react-datepicker__day,
          .react-datepicker__day-name {
            color: #e5e7eb !important; /* text-gray-200 */
          }
          .react-datepicker__day:hover {
            background: linear-gradient(to right, #a855f7, #ec4899) !important; /* from-purple-500 to-pink-500 */
            color: #ffffff !important; /* text-white */
          }
          .react-datepicker__day--selected,
          .react-datepicker__day--keyboard-selected {
            background: linear-gradient(to right, #a855f7, #ec4899) !important; /* from-purple-500 to-pink-500 */
            color: #ffffff !important; /* text-white */
          }
          .react-datepicker__day--disabled {
            color: #4b5563 !important; /* text-gray-600 */
            cursor: not-allowed !important;
          }
          .react-datepicker__month-text,
          .react-datepicker__quarter-text,
          .react-datepicker__year-text {
            color: #e5e7eb !important; /* text-gray-200 */
          }
          .react-datepicker__month-text:hover,
          .react-datepicker__quarter-text:hover,
          .react-datepicker__year-text:hover {
            background: linear-gradient(to right, #9333ea, #db2777) !important; /* from-purple-600 to-pink-600 */
            color: #ffffff !important; /* text-white */
          }
          .react-datepicker__navigation-icon::before {
            border-color: #e5e7eb !important; /* text-gray-200 */
          }
          .react-datepicker__triangle {
            display: none !important; /* Hide default triangle */
          }
          .react-datepicker-popper {
            z-index: 50 !important; /* Ensure above other elements */
          }
          .react-datepicker__month-container {
            background-color: #111827 !important; /* bg-gray-900 */
          }
          .react-datepicker__current-month {
            color: #ffffff !important; /* text-white */
          }
        `}</style>
        <div className="relative">
          <DatePicker
            selected={selected}
            onChange={onChange}
            minDate={minDate}
            dateFormat="dd/MM/yyyy"
            placeholderText={placeholderText}
            className={`w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-lg p-2 pr-10 focus:ring-2 focus:ring-purple-500 ${className}`}
            required
            ref={ref}
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </>
    );
  }
);

CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;