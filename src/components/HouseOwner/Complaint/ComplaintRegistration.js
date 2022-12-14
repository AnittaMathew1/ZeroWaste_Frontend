import React, { useRef , useState}from "react";
import classes from './ComplaintRegistration.module.css'

const ComplaintRegistration = () => {
  const subjectInputRef = useRef();
  const descriptionInputRef = useRef();
  const [issueDate, setIssueDate] = useState('');

  const current = new Date();
  const registrationDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  console.log(registrationDate);

  const handleDate = (e) => {
    e.preventDefault();
    setIssueDate(e.target.value);
    console.log(e.target.value)
 
}

  const submitHandler = (event) => {
    event.preventDefault();
   
    const enteredsubject = subjectInputRef.current.value;
    const entereddescription = descriptionInputRef.current.value;
    // let auth =  sessionStorage.getItem('jwt');
    //      fetch("http://127.0.0.1:8000/zerowaste/corporation/collectorlist/", {
    //       headers:{
    //            Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                    'Authorization': auth,
    //            },
    //     method: "POST",
    //      body: JSON.stringify({
    //            subject: enteredsubject,
    //            description: entereddescription,
    //            issuedate: issueDate,
    //            registrationdate: registrationDate,
    //            jwt:sessionStorage.getItem("jwt"),
  
       
    //   })
     
    //  })
  }


return(
    <div className={classes.ComplaintRegistration}>
        <h1>Complaint Registration</h1>
        <div className={classes.item}>
         <label className={classes.dropdown}><b>Issue Date:</b></label>
         <input type="date" id="slotdate" name="collection-date" min="2022-12-01" onChange={(e) =>handleDate(e)}/>
        <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='text'>Subject:</label>
          <input type='name' id='fname' required placeholder="Enter the subject"  ref={subjectInputRef} />
          </div>
          <div className={classes.control}>
          <label htmlFor='text'>Description:</label>
          <input type='name' className={classes.desc} id='lname' required placeholder="Enter the description" ref={descriptionInputRef} />
          </div> 
          </form>
          </div>
          <button type="button" className={classes.submit}>Submit</button>
    </div>

);
}
export default ComplaintRegistration;