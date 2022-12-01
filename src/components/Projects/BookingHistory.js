import React, { useEffect, useState } from 'react';
import classes from './Bookinghistory.css';
function History() {
  const [data, setData] = useState([]);
 

 
    useEffect(()=>{
      let auth =  sessionStorage.getItem('jwt');
      // console.log(auth)
      // const fetchUserDetails = async () => {

      //  const response=await
       fetch('http://127.0.0.1:8000/zerowaste/houseowner/bookinghistory/',{
          method: 'GET',
          headers:{
            Accept: 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': auth,
             },
            })
            .then(response => {
              console.log("request: ", response);
              return response.json();
             
            })
            .then((res)=>{
              // if (!res.ok){
              //   throw  new Error('something went wrong!');
              //  }
              console.log("response: ", res);
              const responseData= res;
              const loadedUserDetails=[];
              for (const key in responseData){
                loadedUserDetails.push({
                  bookeddate: responseData[key].bookeddate,
                  colleceteddate: responseData[key].collectiondate,
                  type: responseData[key].wastetype,
                  collectorid: responseData[key].collectorid,
                });
              }
              setData(loadedUserDetails);
            })    
     
    // };
    // fetchUserDetails().catch((error) => {
    // })  
    },[])


  return (
    <div className="bookinghistory">
     
        <h1 className='text-center mt-4'>Previous Bookings</h1>
       

       
        <table class="table">
          <thead>
            <tr>
              <th>Booked Date</th>
              <th>Collected Date</th>              
              <th>Waste Type</th>
              <th>Collector ID</th>
             
            </tr>
          </thead>
          <tbody>
            {data
              .map((item, index) =>(
                <tr key={index}>
                  <td>{item.bookeddate}</td>
                  <td>{item.colleceteddate}</td>                
                  <td>{item.type}</td>
                  <td>{item.collectorid}</td>
                  </tr>
                  ))}
                 
          </tbody>
         
          </table>
     
    </div>
  );
}

export default History;