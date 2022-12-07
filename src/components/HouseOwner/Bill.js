import React, { useEffect, useState } from 'react';
import classes from './Bookinghistory.css';
import { useNavigate } from 'react-router-dom';
function Bill() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
      const submitHandler = (event) => {
         navigate('/payment'); 
       }
  return (
    <div className="bookinghistory">
     
        <h1 className='text-center mt-4'>Previous Bookings</h1>
       

       
        <table class="table">
          <thead>
            <tr>
              <th>Collection Date</th>              
              <th>Waste Type</th>
              <th>Rate</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>04/12/2022</td>
                    <td>Plastic</td>
                    <td>35</td>
                </tr>
                <tr>
                    <td>09/12/2022</td>
                    <td>Food</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>15/12/2022</td>
                    <td>metal</td>
                    <td>40</td>
                </tr>
            </tbody>
          </table>
     <h3>Total = 95.0</h3>
     <button type="submit" onClick={submitHandler}
       >Pay Now </button>
    </div>
  );
}

export default Bill;