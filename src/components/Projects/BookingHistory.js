import React, { useEffect, useState } from 'react'; 
import classes from './Bookinghistory.css';
function History() {
  const [data, setData] = useState([]);
  

 
    useEffect(()=>{
      const fetchUserDetails = async () => {
       const response=await fetch(
         'https://bookinghistory-94165-default-rtdb.firebaseio.com/history.json'
       );
       if (!response.ok){
        throw  new Error('something went wrong!');
       }   
      const responseData=await response.json();
      
      const loadedUserDetails=[];

      for (const key in responseData){
        loadedUserDetails.push({
          bookeddate: responseData[key].Booking,
          colleceteddate: responseData[key].Collecting,
          name: responseData[key].Name,
          type: responseData[key].Waste,
        });
      }
      setData(loadedUserDetails);
    };
    fetchUserDetails().catch((error) => {
    })  
    },[])




  return (
    <div className="bookinghistory">
     
        <h1 className='text-center mt-4'>Previous Bookings</h1>
        

       
        <table class="table">
          <thead>
            <tr>
              <th>Booked Date</th>
              <th>Collected Date</th>
              <th>Collector Name</th>
              <th>Waste Type</th>
              
            </tr>
          </thead>
          <tbody>
            {data
              .map((item, index) =>( 
                <tr key={index}>
                  <td>{item.bookeddate}</td>
                  <td>{item.colleceteddate}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  </tr>
                  ))}
                  
          </tbody>
          
          </table>
      
    </div>
  );
}

export default History;







