import { useField } from "formik";
import { InputHTMLAttributes } from "react";

export type Props = { name: string } & InputHTMLAttributes<HTMLInputElement>;

export const FormikHTMLInput = ({ name, ...props }: Props) => {
  const [field] = useField(name);

  return <input {...field} {...props} />;
};
