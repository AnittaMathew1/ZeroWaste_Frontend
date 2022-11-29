
import classes from './Municipalityservices.module.css';
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
            <NavLink to = "/bookingstatusreport" className={classes.usertext}>
               <img src={img}/> 
              <h4>Booking Status Report</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/Payments' className={classes.usertext}>
             <img src={img3}/>
              <h4>Payment Report</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/BookingHistory' className={classes.usertext}>
           <img src={img1}/>   
              <h4>Update Waste details</h4>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to ='/Bookingstatus' className={classes.usertext}>
          <img src={img2}/> 
              <h4>Booking Status</h4>
            </NavLink>
          </li> */}
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
