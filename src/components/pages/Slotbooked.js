import './Slotbooked.css';
// import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Slotbooked = () => {
    return(
      <div className='slotbooked-header'>
        <div className='slotbooked'>
          <h1>Slot Booked Successfully</h1>
          <div className='buttons'> 
          <Link to="/houseownerservices"> 
              <button type="submit" className='butn' id="two">
                Home
              </button>
            </Link>      
         
            <Link to="/slotbook"> 
              <button type="submit" className='butn'  id="two">
                Book Again
              </button>
            </Link> 
          </div>
      </div>
    </div> 
    );
   
};

export default Slotbooked;