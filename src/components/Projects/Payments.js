import React, { useEffect, useState } from 'react'; 
// import Table from 'react-bootstrap/Table';



function Status() {
  const [data, setData] = useState([]);
  

 
    useEffect(()=>{
      const fetchUserDetails = async () => {
       const response=await fetch(
         'https://billpayment-5ab71-default-rtdb.firebaseio.com/billpayments.json'
       );
       if (!response.ok){
        throw  new Error('something went wrong!');
       }   
      const responseData=await response.json();
      
      const loadedUserDetails=[];

      for (const key in responseData){
        loadedUserDetails.push({
            fromdate: responseData[key].from,
            todate: responseData[key].to,
            day: responseData[key].days,
            amount: responseData[key].price,
            amt: responseData[key].total,
            type: responseData[key].typeofWaste,
          
          
          
        });
      }
      setData(loadedUserDetails);
    };
    fetchUserDetails().catch((error) => {
    })  
    },[])




  return (
    <div>
     
        <h1 className='statushead'>Bill Payments</h1>
        
        <div className="bookingstatusreport"> 
        {/* <Table striped bordered hover className='table'>  */} 
        <table class='table'>
          <thead>
            <tr>
              <th>Date(From)</th>
              <th>Date(To)</th>
              <th>Waste Type</th>
              <th>Number of Days</th>
              <th>Amount/day</th>
              <th>Total Amount</th>
              
              
            </tr>
          </thead>
          <tbody>
            {data
              .map((item, index) =>( 
                <tr key={index}>
                  <td>{item.fromdate}</td>
                  <td>{item.todate}</td>
                  <td>{item.type}</td>
                  <td>{item.day}</td>
                  <td>{item.amount}</td> 
                  <td>{item.amt}</td>
                  
                  </tr>
                  ))}
                  
          </tbody>
          {/* </Table> */}
          </table>
          </div>
      
    </div>
  );
}

export default Status;
