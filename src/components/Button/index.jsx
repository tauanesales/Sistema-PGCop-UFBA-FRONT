/* eslint-disable react/prop-types */
import "./styles.css";

const Button = ({ link, label }) => {
  return (
    <a href={link}>
      <button className="my-button">{label}</button>
    </a>
  );
};

export default Button;
