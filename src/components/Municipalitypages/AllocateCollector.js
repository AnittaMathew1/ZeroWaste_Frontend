import './allocatecollector.css';
import classes from '../HouseOwner/Login.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
const AllocateCollector = () => {
    const [data, setData] = useState([]);
    const [wardData, setWardData] = useState();
    const [superviserData, setSuperviserData] = useState();
    const [wardno, setWardNo] = useState('');
    const [id, setid] = useState('');
    const [collectionDate, setCollectionDate] = useState('');
    const [collectorData, setCollectorData] = useState([]);
    const submitHandler = (event) => {
       
    }
    const handleDate = (e) => {
      e.preventDefault();
      setCollectionDate(e.target.value);
      console.log(e.target.value)
  }
  useEffect(()=>{
    getWardData();
  },[]);
  useEffect(()=>{
    getSuperviserData();
  },[]);
  const getWardData = () => {
    fetch("http://127.0.0.1:8000/zerowaste/wards/",
    {
      method: "GET",
    }).then((response) => {
       
        return response.json();
      })
      .then(function (data) {
        setWardData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  const handleSupervisorData =(e)=> {
    e.preventDefault();
    setid(e.target.value);
    // getCollectorDetails(e.target.value);
    console.log("supervisor",e.target.value)
  }
  const getSuperviserData = () => {
    fetch("http://127.0.0.1:8000/zerowaste/corporationapp/supervisorslist/",
    {
      method: "GET",
    }).then((response) => {
        return response.json();
      })
      .then(function (data) {
        setSuperviserData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  const handleWardno =(e)=> {
    e.preventDefault();
    setWardNo(e.target.value);
    getCollectorDetails(e.target.value);
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
     
      wardno:value,
      // jwt:sessionStorage.getItem("jwt"),

     
    })
   
  })

    .then(response => {
      console.log("request: ", response);
      return response.json();
    })
    .then(resJson => {
      console.log("response: ", resJson);
      setCollectorData(resJson.data)

    })
    .catch(err => {
     
      console.log(err);
    });
    //setCollectorData();
  }

  const handleChange = (e) => {
    const {checked} = e.target;
    console(e.target);
    setStatus();
}
// let auth =  sessionStorage.getItem('jwt');
const setStatus = (value) => {
  // api call
  fetch("http://127.0.0.1:8000/zerowaste/corporation/collectorlist/", {
      headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': auth,
         },
    method: "POST",
    body: JSON.stringify({
     
      wardno:value,
      id:id,
      collectionDate:collectionDate,
      status:"Pending",
      // jwt:sessionStorage.getItem("jwt"),

     
    })
   
  })

    .then(response => {
      console.log("request: ", response);
      return response.json();
    })
    .then(resJson => {
      console.log("response: ", resJson);
      setCollectorData(resJson.data)

    })
    .catch(err => {
     
      console.log(err);
    });
}
    useEffect(()=>{
      const fetchCollectorDetails = async () => {
       const response=await fetch(
         'http://127.0.0.1:8000/zerowaste/corporation/collectorlist/'
       );
       if (!response.ok){
        throw  new Error('something went wrong!');
       }
      const responseData=await response.json();
      const loadedCollectorDetails=[];
      for (const key in responseData){

        loadedCollectorDetails.push({
          firstname: responseData[key].firstname,

        });

      }

      setData(loadedCollectorDetails);
    };

    fetchCollectorDetails().catch((error) => {

    })  

    },[])
    return (
          <div className="bookingstatus">
            <div className='statushead'>
            <h1 >Allocate Collector</h1>
            </div>
           <div className="bookingstatusreport"> 
               <label className="itemm">Ward Number :
                <div className="dropdown">
                <select onChange={(e) => handleWardno(e)} placeholder="Select Ward Number" oncl
                >
                    {wardData?.map(ward => {
                    return (<option key={ward.wardno} value={ward.wardno}>{ward.wardname}</option>);
                     })}
                 </select>
                </div></label> 
                <label className="itemm">Superviser :
                <div className="dropdown">
                <select onChange={(e) => handleSupervisorData(e)} placeholder="Select Supervisor"
                >
                    {superviserData?.map(superviser => {
                    return (<option key={superviser.id} value={superviser.id}>{superviser.firstname}</option>);
                     })}
                 </select>
                </div></label> 
                <br></br>
                <div className="itemm">

         <label className="dropdownn"><b>Select Date:</b></label>
         <input type="date" id="slotdate" name="collection-date" min="2022-12-01" onChange={(e) =>handleDate(e)}/>
      </div>
      </div>
      <div className="tablereport">
            <table class="table">
              <thead>
                <tr>
                   <th>Collector Name</th>
                  <th> Select<br/></th>
                </tr>
              </thead>
              <tbody>
                {collectorData?.map((item, index) =>(
                    <tr key={index}>
                      <td>{item.firstname}</td>
                      <td><input type="checkbox" id="collector" name="collector" onchange={(e) =>handleChange(e)} value="collector_id"/></td>
                      </tr>
                     
                      ))}
              </tbody>
              </table>
              </div>
              <button type="submit" onClick={submitHandler}
      >Allocate Collector </button>
        </div>
      );
   
    }

export default AllocateCollector;



