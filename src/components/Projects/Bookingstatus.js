import React, { useEffect, useState } from 'react'; 
// import Table from 'react-bootstrap/Table';
import '../Municipalitypages/bookingstatusreport.css';



function Status() {
  const [data, setData] = useState([]);
  

 
    useEffect(()=>{
      const fetchUserDetails = async () => {
       const response=await fetch(
         'https://bookingstatus-f2b00-default-rtdb.firebaseio.com/bstatus.json'
       );
       if (!response.ok){
        throw  new Error('something went wrong!');
       }   
      const responseData=await response.json();
      
      const loadedUserDetails=[];

      for (const key in responseData){
        loadedUserDetails.push({
          a: responseData[key].bookeddate,
          b: responseData[key].collecteddate,
          c: responseData[key].status,
          d: responseData[key].wastetype,
        });
      }
      setData(loadedUserDetails);
    };
    fetchUserDetails().catch((error) => {
    })  
    },[])




  return (
    <div>
     
        <h1 className='statushead'>Booking Status</h1>
        <div className="bookingstatusreport">
        <table class="table">
        {/* <Table striped bordered hover className='table'>  */} 
        {/* <table class='table'> */}
          <thead>
            <tr >
              <th>Booked Date</th>
              <th>Collection Date</th>
              <th>Waste Type</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {data
              .map((item, index) =>( 
                <tr key={index}>
                  <td>{item.a}</td>
                  <td>{item.b}</td>
                  <td>{item.d}</td>
                  <td>{item.c}</td>
                  </tr>
                  ))}
                  
          </tbody>
          </table>
          {/* </Table> */}
          {/* </table> */}
          </div>
    </div>
  );
}

export default Status;
