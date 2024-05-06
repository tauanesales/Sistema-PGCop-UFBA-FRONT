import './styles.css'

const ButtonSecondy = ({link, label, width }) => {



  const handleClick = () => {
    window.location.href = link;
  };
  
  return (
      <button onClick={handleClick}
      className="btnSecondary" style={{ width: width}} >
          {label}
      </button>
  )
}

export default ButtonSecondy;