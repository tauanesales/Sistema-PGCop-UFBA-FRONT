import "./styles.css";

import { InputHTMLAttributes } from "react";

type Props = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, ...props }: Props) => {
  return (
    <div className="containInput">
      <label htmlFor={props.id} className="label">
        {label}
      </label>
      <input name={props.id} className="inputGeral" required {...props} />
    </div>
  );
};

export default Input;
