import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
// import classes from './UserProfile.module.css';
import classes from './allocatecollectorlanding.module.css';
 import { useNavigate } from 'react-router-dom';

const Bookingstatusreport = () => {
  const navigate = useNavigate();
  const submitHandler = (event) => {
         navigate('/allocatecollector'); 
       }
    const labels = ["Kazhzkoottam","Nalanchira", "Kesavadasapuram", "Kowdiar","Kuruvankonam","Palayam","Ambalathara","Beemapalli","Chakka","Kannammoola","Anamugham","Aakkulam","Aattippra"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Waste",
               
                backgroundColor: "rgb(35, 89, 190)",
                borderColor: "rgb(255, 99, 132)",
                data: [24, 10, 50 ,89, 100, 33, 57,39,60,86,29,100,68],
            },
        ],
    };
    return (
      <div>
        <div className={classes.profile}>
            <div className={classes.bar_chart}>
            <canvas id="chart"></canvas>
            <Bar data={data} />
            </div>
            
        </div>
        <button type="submit" onClick={submitHandler}
       >Allocate Collector </button>
        </div>
        
    );
};

export default Bookingstatusreport;