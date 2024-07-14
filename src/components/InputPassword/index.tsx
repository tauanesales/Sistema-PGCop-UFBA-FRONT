import "./styles.css";

import { Password } from "primereact/password";
import { InputHTMLAttributes } from "react";

type Props = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const InputPassword = ({ label, ...props }: Props) => {
  return (
    <div className="containInput">
      <label htmlFor={props.id} className="label">
        {label}
      </label>
      <Password
        toggleMask
        feedback={false}
        inputClassName="inputGeral"
        {...props}
      />
    </div>
  );
};

export default InputPassword;
