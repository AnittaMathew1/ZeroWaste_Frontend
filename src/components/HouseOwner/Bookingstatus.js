import React, { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table';
import '../Municipalitypages/bookingstatusreport.css';



function BookingStatus() {
  const [data, setData] = useState([]);
 

 
    useEffect(()=>{
      let auth =  sessionStorage.getItem('jwt');
      // const fetchUserDetails = async () => {
      //  const response=await
       fetch('http://127.0.0.1:8000/zerowaste/houseowner/bookingstatus/',{
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
            console.log("response: ", res);
            const responseData=res;
            const loadedUserDetails=[];

      for (const key in responseData){
        loadedUserDetails.push({
          a: responseData[key].bookingdate,
          b: responseData[key].collectiondate,
          c: responseData[key].wastetype,
          d: responseData[key].supervisorname,
          e: responseData[key].status,
         
        });
      }
      setData(loadedUserDetails);
          })
 
    },[])




  return (
    <div>
     
        <h1 className='statushead'>Booking Status</h1>
        <div className="bookingstatusreport">
        <table class="table">
          <thead>
            <tr >
              <th>Booked Date</th>
              <th>Collection Date</th>
              <th>Waste Type</th>
              <th>Supervisor Name</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
            {data
              .map((item, index) =>(
                <tr key={index}>
                  <td>{item.a}</td>
                  <td>{item.b}</td>
                  <td>{item.c}</td>
                  <td>{item.d}</td>
                  <td>{item.e}</td>
                  </tr>
                  ))}
                 
          </tbody>
          </table>
          </div>
    </div>
  );
}

export default BookingStatus;


// import React, { useEffect, useState } from 'react';
// // import Table from 'react-bootstrap/Table';
// // import '../Municipalitypages/bookingstatusreport.css';
// import './Bookingstatus.css';



// function BookingStatus() {
//   const [data, setData] = useState([]);
 

 
//     useEffect(()=>{
//       let auth =  sessionStorage.getItem('jwt');
//       // const fetchUserDetails = async () => {
//       //  const response=await
//        fetch('http://127.0.0.1:8000/zerowaste/houseowner/bookingstatus/',{
//         method: 'GET',
//         headers:{
//           Accept: 'application/json',
//                    'Content-Type': 'application/json',
//                    'Authorization': auth,
//            },
//           })
//           .then(response => {
//             console.log("request: ", response);
//             return response.json();
           
//           })
//           .then((res)=>{
//             console.log("response: ", res);
//             const responseData=res;
//             const loadedUserDetails=[];

//       for (const key in responseData){
//         loadedUserDetails.push({
//           a: responseData[key].bookingdate,
//           b: responseData[key].collectiondate,
//           c: responseData[key].wastetype,
//           d: responseData[key].supervisorname,
//           e: responseData[key].status,
         
//         });
//       }
//       setData(loadedUserDetails);
//           })
//     },[])




//   return (
//     <div>
     
//         <h1 className='statushead'>Booking Status</h1>
//         <div className="bookingstatusreport">
//         <table class="table" className='table'>
//           <thead>
//             <tr >
//               <th>Booking Date</th>
//               <th>Collection Date</th>
//               <th>Waste Type</th>
//               <th>Superviser Name</th>
//               <th>Status</th>
             
//             </tr>
//           </thead>
//           <tbody>
//             {data
//               .map((item, index) =>(
//                 <tr key={index}>
//                   <td>{item.a}</td>
//                   <td>{item.b}</td>
//                   <td>{item.c}</td>
//                   <td>{item.d}</td>
//                   <td>{item.e}</td>
//                   </tr>
//                   ))}
                 
//           </tbody>
//           </table>
//           </div>
//     </div>
//   );
// }

// export default BookingStatus;