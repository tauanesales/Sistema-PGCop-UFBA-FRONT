import { DateField, DateFieldProps } from "@mui/x-date-pickers/DateField";
import { useField } from "formik";

type Props = {
  name: string;
} & Omit<DateFieldProps<Date, false>, "onChange" | "value">;

export const FormikDateField = ({ name, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);

  return (
    <DateField
      variant="standard"
      InputLabelProps={{
        style: {
          fontWeight: 700,
          fontFamily: "Raleway",
          fontSize: 14,
        },
      }}
      FormHelperTextProps={{
        style: {
          fontFamily: "Raleway",
        },
      }}
      sx={{
        "& .MuiInputLabel-standard": {
          color: "#00000070",
        },
      }}
      margin="dense"
      value={field.value}
      onBlur={() => helpers.setTouched(true)}
      slotProps={{
        textField: {
          error: !!(meta.touched && meta.error),
          helperText: meta.touched && meta.error ? meta.error : " ",
        },
      }}
      onChange={(newValue) => helpers.setValue(newValue)}
      {...props}
    />
  );
};
