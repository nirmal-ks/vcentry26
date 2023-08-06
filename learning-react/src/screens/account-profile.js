import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavbarComponent from '../components/navbar';

const AccountProfileScreen = () => {

  const [ studentForm, updateStudentForm ] = useState({
    name : "",
    location : ""
  });

  useEffect(() => {
    loadStudent();
  }, []);

  const [studentList, updateStudentList] = useState([])

  const loadStudent = () => {
    try{
      const url = "http://localhost:4000/api/list";
  
      axios.get(url)
        .then((response) => {
          updateStudentList(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
    }
    catch(error){
      alert("Somethings went wrong, pls contact admin");
    }
  }

  const onHandleInput = (event) => {
    updateStudentForm({...studentForm, [event.target.id] : event.target.value  });
  }

  const submitStudent = () => {
    // console.log(studentForm);
    const url = "http://localhost:4000/api/create/list";

    axios.post(url, studentForm)
      .then((response) => {
        alert(response.data);
        loadStudent();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const deleteUser = (value) =>{
    // console.log(value);
    const url = "http://localhost:4000/api/delete/" + value.name;

    axios.delete(url)
      .then((response) => {
        alert(response.data);
        loadStudent();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const list = studentList.map((value, index) => {
    return(
        <div className='user-content' key={index}>
          <h3>{value.name}</h3>
          <span>{value.location}</span>
          <button className='btn btn-danger' onClick={() => deleteUser(value)}>X</button>
        </div>
    )
  })

  return (
    <div>
      <h2 className='custome-font'>This is a Account Profile Screen</h2>
      <button onClick={() => loadStudent()}>Load Student</button>
      <NavbarComponent></NavbarComponent>
      <div>
        <label>Enter your Name :</label>
        <input type="text" id="name" placeholder='Enter Name' onChange={onHandleInput} />
      </div>
      <div>
        <label>Enter your Location :</label>
        <input type="text" id="location" placeholder='Enter Location' onChange={onHandleInput} />
      </div>
      <button onClick={() => submitStudent()}>Submit Student</button>
      
      <div className='user-wrap'>
        {list}
      </div>
    </div>
  );
};

export default AccountProfileScreen;