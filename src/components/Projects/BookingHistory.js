import React, { useEffect, useState } from 'react'; 
import '../Municipalitypages/bookingstatusreport.css';


function Bookinghistory() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    const fetchUserDetails = async () => {

     const response=await fetch(

       'http://127.0.0.1:8000/zerowaste/houseowner/bookinghistory/',
       {
        body: JSON.stringify({
          jwt:sessionStorage.getItem("jwt"),
    
         
        })
       }

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
      <div>
          <div className='statushead'>
          <h1 >Booking History</h1>
          </div>

          {/* <Table striped bordered hover className='table'>  */}
          <div className="bookingstatusreport"> 
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
  
            {/* </Table> */}
            </div>
       
  
      </div>
  
    );
  
  }

export default Bookinghistory;







