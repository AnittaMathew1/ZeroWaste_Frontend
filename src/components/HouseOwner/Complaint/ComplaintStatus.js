import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";





function ComplaintStatus() {
  const [complaint, setComplaint] = useState([]);
 
    useEffect(()=>{
      let auth =  sessionStorage.getItem('jwt');
       fetch('http://127.0.0.1:8000/zerowaste/houseowner/bookingstatus/',{
        method: 'GET',
        headers:{
          Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': auth,
           },
          })
          .then(response => {
       
      setComplaint(response.data);
          })
    },[])
    

    const columns = [
      {
        name: "Registration Date",
        selector: (row) => row.registrationdate,
      },
      {
        name: "Subject",
        selector: (row) => row.subject,
      },
      {
        name: "Description",
        selector: (row) => row.description,
      },
      {
        name: "Remarks",
        selector: (row) => row.remarks,
      },
      {
        name: "Status",
        selector: (row) => row.status,
      },
    ]




  return (
    <div>
    <h3>COMPLAINT STATUS</h3>
    <DataTable columns={columns} data={complaint} pagination />
    </div>
  );
}

export default ComplaintStatus;