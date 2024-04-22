import { TextFieldProps } from "@mui/material";
import { useField } from "formik";

import { MaterialInput } from "../MaterialInput";

export type Props = { name: string } & TextFieldProps;

export const FormikInput = ({ name, ...props }: Props) => {
  const [field, meta] = useField(name);

  return (
    <MaterialInput
      {...field}
      {...props}
      helperText={meta.touched && meta.error ? meta.error : " "}
      error={!!(meta.touched && meta.error)}
    />
  );
};
