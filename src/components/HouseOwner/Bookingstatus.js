import React, { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table';
// import '../Municipalitypages/bookingstatusreport.css';
import DataTable from "react-data-table-component";
import classes from './Bookingstatus.module.css'



function BookingStatus() {
 
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
                        setData(res);
                  })
         
 
    },[])
    const [data, setData] = useState([]);
    const columns = [
      {
        name: "Booked Date",
        selector: (row) => row.bookingdate,
      },
      {
        name: "Collected Date",
        selector: (row) => row.collectiondate,
      },
      {
        name: "Waste Type",
        selector: (row) => row.wastetype,
      },
      {
        name: "Supervisor Name",
        selector: (row) => row.supervisorname,
      },
      {
        name: "Status",
        selector: (row) => row.status,
      },
    ]




  return (
    <div className={classes.table}>
    <h3>Booking Status</h3>
    <DataTable columns={columns} data={data} pagination />
     
    </div>
  );
}

export default BookingStatus;



// import React, { useEffect, useState } from 'react';
// // import Table from 'react-bootstrap/Table';
// import '../Municipalitypages/bookingstatusreport.css';



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
//         <table class="table">
//           <thead>
//             <tr >
//               <th>Booked Date</th>
//               <th>Collection Date</th>
//               <th>Waste Type</th>
//               <th>Supervisor Name</th>
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