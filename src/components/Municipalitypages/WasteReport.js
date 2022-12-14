import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from 'react-router-dom';
import { Line } from "react-chartjs-2";
import '../pages/SlotBooking.css';
// import classes from './UserProfile.module.css';
import classes from './allocatecollectorlanding.module.css';

const WasteReport = () => {
    const[revenueData,setRevenueData]=useState({});
    const [id, setWasteid] = useState('');
    const [wasteData, setWasteData] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        getWasteData();
      },[]);
      
      const getWasteData = () => {
        fetch("http://127.0.0.1:8000/zerowaste/wastelist/",
        {
          method: "GET",
        }).then((response) => {
            return response.json();
          })
          .then(function (data) {
            setWasteData(data);
            console.log(wasteData);
          })
          .catch(err => {
            console.log(err);
          });
      }
      const handleWasteid =(e)=> {
        e.preventDefault();
        setWasteid(e.target.value);
      
      }
    const submitHandler = (event) => 
    {
      navigate('/allocatecollector'); 
    }
    useEffect(()=>{
        
        const fetchMonthlySales = async () => {

            const response = await fetch(
              'http://127.0.0.1:8000/zerowaste/corporation/wastereport/'
            );
            if (!response.ok) {
              throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
           
            setRevenueData(responseData);
          };
          fetchMonthlySales().catch((error)=>{})
    },[])

    let labels=[]
    let values=[]
    for (var key in revenueData){
        labels.push(key);
        values.push(revenueData[key])
    }
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Sales amount",
                data:values,
               
                backgroundColor: "rgb(35, 89, 190)",
               
               
               
            },
        ],
    };
    return (
        <div className="report">
        <label className="itemm"><b>Waste Type :</b>
       <div className="dropdown">
        <select className="dropdownn" onChange={(e) => handleWasteid(e)}>
          {wasteData?.map(waste => {
              return (<option key={waste.id} value={waste.id}>{waste.waste_type}</option>);
          })}
        </select>
      </div></label>
        <div className={classes.profile}>
            <div className={classes.bar_chart}>
            <canvas id="chart"></canvas>
            <Line data={data} />
            </div>
            <button type="submit" onClick={submitHandler} >Allocate Collector </button>
        </div>
        </div>

    );
};

export default WasteReport;