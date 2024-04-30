/* eslint-disable react/prop-types */
import './styles.css'

const Input = ({placeholder, type, onFocus, onBlur}) => {
  return (
        <input
          type={type}
          placeholder={placeholder}
          className="inputCadastro"
          required
          onFocus={onFocus}
          onBlur={onBlur}
        />
  )
}

export default Input;