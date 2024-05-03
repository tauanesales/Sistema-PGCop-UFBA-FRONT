import './styles.css'

const ButtonPrimary = ({link, label, imageUrl, className}) => {

  const handleClick = () => {
    window.location.href = link;
  };
  
  return (
      <button onClick={handleClick}
      className='btnPrimary' >
        <img className={className} src={imageUrl} alt="" />
          {label}
      </button>
  )
}

export default ButtonPrimary;