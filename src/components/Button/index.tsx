/* eslint-disable react/prop-types */
import "./styles.css";

import { ButtonHTMLAttributes } from "react";

type Props = {
  label: string;
  link?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ link, label, ...props }: Props) => {
  return (
    <a href={link}>
      <button {...props}>{label}</button>
    </a>
  );
};

export default Button;
