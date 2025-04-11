import { DatePickerProps } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Moment } from "moment";

type DatePickerField = DatePickerProps<Moment> & {
  labelName: string;
  groupClassname?: string;
  id?: string;
};
export default function DatePicker({
  labelName,
  id,
  groupClassname = "",
  ...props
}: DatePickerField) {
  return (
    <div className={`${groupClassname} text-field mb-4`}>
      {labelName && (
        <label className="block mb-1 text-sm font-medium" htmlFor={id}>
          {labelName}
        </label>
      )}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MuiDatePicker {...props} />
      </LocalizationProvider>
    </div>
  );
}
