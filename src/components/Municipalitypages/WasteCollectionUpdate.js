import React, { useEffect, useState , useRef} from 'react';
import './wastecollectionupdate.css';
// import { Link } from "react-bootstrap";


const WasteCollectionUpdate = (props) => {
  var validated =false
  const wardInputRef = useRef();
  const [wardData, setWardData] = useState();
const [collectionDate, setCollectionDate] = useState('');
const [wardno, setWardNo] = useState('');
const [status, setStatus] = useState();

const current = new Date();
  const status_date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  console.log(status_date);

// const handleQuantity = (e) => {
//   setQuantity(e.target.value);
// }
//   const handleDate = (e) => {
//     e.preventDefault();
//     setCollectionDate(e.target.value);
//     console.log(e.target.value)
 
// }
useEffect(()=>{
  getWardData();
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


const handleRegister = () => {

    fetch("http://127.0.0.1:8000/zerowaste/houseowner/slotbooking/", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      status: status,
      
      // collection_date:collectionDate,
      status_date:status_date,
      jwt:sessionStorage.getItem("jwt"),

     
    })
   
  })

  console.log(sessionStorage.getItem('jwt'))
    .then(response => {
      console.log("request: ", response);
      return response.json();
    })
    .then(resJson => {
      console.log("response: ", resJson);

    })
    .catch(err => {
     
      console.log(err);
    });

  //   console.log(firstnameValidationError,pincode);
}
const handleStatusC = () => {

  fetch("http://127.0.0.1:8000/zerowaste/houseowner/slotbooking/", {
  headers: { "Content-Type": "application/json" },
  method: "POST",
  body: JSON.stringify({
    status: status,
    
    // collection_date:collectionDate,
    status_date:status_date,
    jwt:sessionStorage.getItem("jwt"),

   
  })
 
})

console.log(sessionStorage.getItem('jwt'))
  .then(response => {
    console.log("request: ", response);
    return response.json();
  })
  .then(resJson => {
    console.log("response: ", resJson);

  })
  .catch(err => {
   
    console.log(err);
  });

//   console.log(firstnameValidationError,pincode);
}


  return (
    <div className="register">
      <h2 className="registerhead">Waste Collection Update</h2>
      <div className="itemm">
      <label htmlFor='name'>Ward :
            <div className="dropdown">
              <select required ref={wardInputRef} placeholder="Select Ward Number"
             >
        {wardData?.map(ward => {
            return (<option key={ward.wardno} value={ward.wardno}>{ward.wardname}</option>);
        })}
      </select>
      </div></label>
         <div className='buttonss'> 
              <button type="submit" className='butn' id="two" onClick={handleStatusC}>
                Collected
              </button>
              </div>
              <div className='button'> 
              <button type="submit" className='butnn' id="two" onClick={handleRegister}>
                In Progress
              </button>
          </div>
          </div>
    </div>
  );
}
export default WasteCollectionUpdate;