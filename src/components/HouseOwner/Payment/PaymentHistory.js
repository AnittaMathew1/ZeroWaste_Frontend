import React, { useState } from 'react';
import classes from './PaymentHistory.module.css';

const PaymentHistory = () => {
    const [paymentData, setPaymentData] = useState();

        // fetch("http://127.0.0.1:8000/zerowaste/wards/",
        // {
        //   method: "GET",
        // }).then(response => {
        //     setPaymentData(response.data)
        // });

        // {paymentData?.map(data => {
        // const month = data.month.toLocaleString('en-US',{month:'long'});
        // const day = data.day.toLocaleString('en-US',{day:'2-digit'});
        // const year = data.year.getFullYear();
        // const amount = data.amount;
        // })}
            const month = "august";
            const day="17";
            const year ="2022";
            const amount =232;

    return(
        <div className={classes.payment_item}>   
             <div className={classes.payment_date}>
            
                <div className={classes.payment_date__month}>{month}</div>
                <div className={classes.payment_date__year}>{year}</div>
                <div className={classes.payment_date__day}>{day}</div>
            </div>    
            <div className={classes.payment_item__description}>
                <h2>Paid Amount</h2>
                <div className={classes.payment_item__price}>{amount}</div>
            </div>
        </div>    
    )
}
export default PaymentHistory;