/* eslint-disable react/prop-types */
import "./styles.css";

const Button = ({ link, label, ...props }) => {
  return (
    <a href={link}>
      <button {...props}>{label}</button>
    </a>
  );
};

export default Button;
