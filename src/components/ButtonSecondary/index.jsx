import './styles.css'

const ButtonSecondy = ({link, label }) => {

  const handleClick = () => {
    window.location.href = link;
  };
  
  return (
      <button onClick={handleClick}
      className='btnSecondary' >
          {label}
      </button>
  )
}

export default ButtonSecondy;