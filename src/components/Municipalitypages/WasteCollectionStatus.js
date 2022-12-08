import './bookingstatusreport.css';
import classes from '../HouseOwner/Login.module.css';

import React, { useEffect, useState } from 'react';
const WasteCollectionStatus = () => {
    const [data, setData] = useState([]);
    const [wardData, setWardData] = useState();
    const [wardno, setWardNo] = useState('');
    const [collectionDate, setCollectionDate] = useState('');
    const handleDate = (e) => {
    e.preventDefault();
    setCollectionDate(e.target.value);
    console.log(e.target.value)
    }

    let auth =  sessionStorage.getItem('jwt');
  const getCollectorDetails = (value)  => {
    //API call
    fetch("http://127.0.0.1:8000/zerowaste/corporation/collectorlist/", {
      headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': auth,
         },
    method: "POST",
    body: JSON.stringify({
     
      collectionDate:collectionDate,
      // jwt:sessionStorage.getItem("jwt"),

     
    })
   
  })

    .then(response => {
      console.log("request: ", response);
      return response.json();
    })
    .then(resJson => {
      console.log("response: ", resJson);
      // setCollectorData(resJson.data)

    })
    .catch(err => {
     
      console.log(err);
    });
    //setCollectorData();
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
          wardname: responseData[key].wardname,
          supervisor: responseData[key].supervisor,
          status: responseData[key].status,

        });

      }

      setData(loadedUserDetails);

    };

    fetchUserDetails().catch((error) => {

    })  

    },[])
    return (
          <div className="bookingstatus">
            <div className='statushead'>
            <h1 >Booking Status Report</h1>
            </div>
            <div className="itemm">
            <label className="dropdownn"><b>Select Date:</b></label>
            <input type="date" id="slotdate" name="collection-date" min="2022-12-01" onChange={(e) =>handleDate(e)}/>

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
                  <th>Ward Name</th>
                  <th>Supervisor Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .map((item, index) =>(
                    <tr key={index}>
                      <td>{item.wardname}</td>
                      <td>{item.supervisor}</td>
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

export default WasteCollectionStatus;