import React, {useState} from "react";
import EmployersTemplate from "./EmployersTemplate";
import './ContractEmployeeExcel.css'

const ContractEmployeeExcel = () => {
    const [selectedFile, setSelectedFile] = useState({})
    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };
    const onFileUpload = (e) => {
        e.preventDefault();
        setSelectedFile(e.target.files)
        const formData = new FormData()
        formData.append('file',selectedFile)
        console.log(formData)
        fetch('http://127.0.0.1:8000/zerowaste/corporation/employeelist/', {method: 'POST',body:formData})
        .then(res => {
            if (res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        });
    }; 
    const fileData = () => {
        if (selectedFile) {
            return (
                <div className='detailsShown'>
                    {/* <h6>File Details:</h6> */}
                    <p>File Name: {selectedFile.name}</p><br></br>
                    {/* <p className='date'>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p> */}
                </div>
            );
        }
  
  
        else {
          return (
            <div>
                <br />
                <h6>Choose before Pressing the Upload button</h6>
            </div>
        );
    }
    }
    return(
        <div className='manage'>
        <div className='upload'>
            <h3>
                Add New Employee
            </h3>
            <div>
                <br></br>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>
                    Upload
                </button>
            </div>
            {/* <div className='filedata'>{fileData()}</div> */}
         
          <EmployersTemplate></EmployersTemplate>
        </div>
    </div>
    )
}
export default ContractEmployeeExcel;