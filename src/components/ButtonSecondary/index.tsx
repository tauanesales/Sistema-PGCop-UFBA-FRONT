import "./styles.css";

import { ButtonHTMLAttributes } from "react";

type Props = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonSecondy = ({ label, ...props }: Props) => {
  return (
    <button {...props} className="btnSecondary">
      {label}
    </button>
  );
};

export default ButtonSecondy;
