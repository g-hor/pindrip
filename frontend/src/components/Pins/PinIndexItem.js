import { Link } from "react-router-dom";

const PinIndexItem = ({ pin }) => {

  return (
    <Link 
      to={`/pins/${pin.id}`}
      >
      <img 
        src={pin.photo} 
        alt={pin.altText} 
        className="pin-index-img"
        />
    </Link>
  )
};

export default PinIndexItem;