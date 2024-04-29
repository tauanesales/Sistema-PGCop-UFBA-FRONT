/* eslint-disable react/prop-types */
import "./styles.css";

import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
  return <input {...props} className="inputCadastro" required />;
};

export default Input;
