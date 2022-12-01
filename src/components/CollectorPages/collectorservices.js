
import classes from './collectorservices.module.css';
import img from './imgg1.png'
import img1 from './img1.png'
import img2 from './img2.png'
import img3 from './img3.png'


import { NavLink } from 'react-router-dom';

const Homeservices = (props) => {
  return (
    <div className={classes.home}>
      <div className={classes.writeup}>
       
        
      </div>
      
      <div className={classes.logolinks}>
        <ul>
          <li>
            <NavLink to = "/slotbook" className={classes.usertext}>
               <img src={img}/> 
              <h4>Location Tracker</h4>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to ='/payments' className={classes.usertext}>
             <img src={img3}/>
              <h4>Bill Payment</h4>
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to ='/BookingHistory' className={classes.usertext}>
           <img src={img1}/>   
              <h4>Booking His</h4>
            </NavLink>
          </li> */}
          <li>
            <NavLink to ='/bookingstatus' className={classes.usertext}>
          <img src={img2}/> 
              <h4>Updation of Colection Details</h4>
            </NavLink>
          </li>
        </ul>
      </div>

    </div> 
  );
};

const textstyle = {
  color: "black",
  textAlign: "center",
  textdecoration: "none"
};

export default Homeservices;