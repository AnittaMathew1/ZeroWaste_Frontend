import './bookingstatusreport.css';
import classes from '../Projects/Login.module.css';
import React, { useEffect, useState } from 'react';
const Bookingstatusreport = () => {
    const [data, setData] = useState([]);
    const [wardData, setWardData] = useState();
    const [wardno, setWardNo] = useState('');
   
    const handleDate = (e) => {
      // setMessage(e.target.value);
    // console.log(email)
  }
  useEffect(()=>{
    getWardData();
  },[]);
  const getWardData = () => {
    fetch("http://127.0.0.1:8000/zerowaste/wards/", 
    {
      method: "GET",
    }).then((response) => {
        // console.log("response Ward data: ", response.json());
        return response.json();
      })
      .then(function (data) {
        setWardData(data);
      })
      .catch(err => {
        console.log(err);
      }); 
  }
  const handleWardno =(e)=> {
    e.preventDefault();
    setWardNo(e.target.value);
    console.log(e.target.value)
    // console.log(wardno)
  }
    useEffect(()=>{
      const fetchUserDetails = async () => {
       const response=await fetch(
         'http://127.0.0.1:8000/zerowaste/corporation/bookingreport'
       );
       if (!response.ok){
        throw  new Error('something went wrong!');
       } 
      const responseData=await response.json();
      const loadedUserDetails=[];
      for (const key in responseData){

        loadedUserDetails.push({
          firstname: responseData[key].firstname,
          lastname: responseData[key].lastname,
          address: responseData[key].address,
          phoneno: responseData[key].phoneno,
          wastetype:responseData[key].wastetype,
          collectorid:responseData[key].collectorid,
          status:responseData[key].status,

        });

      }

      setData(loadedUserDetails);

    };

    fetchUserDetails().catch((error) => {

    })  

    },[])
    return (
        <div>
          <div className="bookingstatus">
            <div className='statushead'>
            <h1 >Booking Status Report</h1>
            </div>

            {/* <Table striped bordered hover className='table'>  */}
           <div className="bookingstatusreport"> 
           {/* <p><div className='slotdate'>
              <label ><b>Select Date:</b></label>
              <input type="date" id="slotdate"  onChange={(e) =>handleDate(e)}/>
            </div>
              <label className="itemm">Ward Number : */}
              {/* <input className="inputarea" type="text" name="wardno" onChange={()=>handleWardno()} />  */}
              {/* <div className="dropdown">
              <select onChange={(e) => handleWardno(e)}
              placeholder="Select Ward Number"
               >
          {wardData?.map(ward => {
              return (<option key={ward.wardno} value={ward.wardno}>{ward.wardname}</option>);
          })}
        </select>
      </div></label></p> */}
      {/* <button type="submit"
      >Submit</button> */}
      </div>
      </div>
      <div className="tablereport">
            <table class="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Phone no:</th>
                  <th>Waste Type:</th>
                  <th>Collector Id:</th>
                  <th>Status:</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .map((item, index) =>(
                    <tr key={index}>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.address}</td>
                      <td>{item.phoneno}</td>
                      <td>{item.wastetype}</td>
                      <td>{item.collectorid}</td>
                      <td>{item.status}</td>
                      </tr>
                      
                      ))}
    
                     
    
              </tbody>
              </table>
    
              {/* </Table> */}
              </div>
    
        </div>
    
      );
    
    }

export default Bookingstatusreport;