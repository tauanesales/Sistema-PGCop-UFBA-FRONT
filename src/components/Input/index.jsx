/* eslint-disable react/prop-types */
import './styles.css'

const Input = ({type, onFocus, onBlur, label, id}) => {
  return (

      <div className="containInput">
        <label htmlFor={id} className="label">{label}</label>
          <input
            type={type}
            id={id}
            name={id}
            className="inputGeral"
            required
            onFocus={onFocus}
            onBlur={onBlur}
          />
      </div>
    
  )
}

export default Input;