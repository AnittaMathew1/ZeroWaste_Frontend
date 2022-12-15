import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import classes from './PaymentHistory.module.css';





function PaymentHistory() {
  const [paymentHistory, setPaymentHistory] = useState([]);
 
    useEffect(()=>{
      let auth =  sessionStorage.getItem('jwt');
      
       fetch('http://127.0.0.1:8000/zerowaste/houseowner/paymenthistory/',{
        method: 'GET',
        headers:{
          Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': auth,
           },
          })
          .then(response => {
       
      setPaymentHistory(response.data);
          })
    },[])
    

    const columns = [
      {
        name: "Payment Date",
        selector: (row) => row.pay_date,
        sortable:true,
      },
      {
        name: "Amount Paid",
        selector: (row) => row.totalamount,
      },
    ]




  return (
    <div className={classes.history}>
    <h3>PAYMENT HISTORY</h3>
    <DataTable columns={columns}
     data={paymentHistory} 
     pagination 
     highlightOnHover/>
    </div>
  );
}

export default PaymentHistory;