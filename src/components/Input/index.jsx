
import './styles.css'

const Input = ({type, onFocus, onBlur, label, id, margin,xwidth}) => {
  const className = `containInput ${margin ? 'marginBottom' : ''}`;
  return (
        <div className={className}>
          <label htmlFor={id} className="label">{label}</label>
            <input
              type={type}
              id={id}
              name={id}
              className="inputGeral"
              required
              onFocus={onFocus}
              onBlur={onBlur}
            style={{width: {xwidth}}}
            />
        </div>
    
  )
}

export default Input;