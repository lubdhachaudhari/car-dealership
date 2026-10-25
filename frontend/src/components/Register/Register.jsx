import React, { useState } from 'react';
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import Header from '../Header/Header';

const Register = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");


  let register_url = window.location.origin+"/djangoapp/register";
  
  const register = async (e) => {
    e.preventDefault();

    let register_userequest = {
      "userName": userName,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password
    };
    
    const res = await fetch(register_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(register_userequest),
    });
    
    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem('username', json.userName);
        window.location.href = "/";
    }
    else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = "/login";
    }
};

  return(
    <div>
      <Header/>
      <div onClick={onclose} className="modalContainer">
          <div className="register_panel">
              <form className="form_panel" onSubmit={register}>
              <div className="input_field">
                <img src={user_icon} className='img_icon'/>
                <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)}/>
              </div>
              <div className="input_field">
                <img src={user_icon} className='img_icon'/>
                <input type="text" name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)}/>
              </div>
              <div className="input_field">
                <img src={user_icon} className='img_icon'/>
                <input type="text" name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setlastName(e.target.value)}/>
              </div>
              <div className="input_field">
                <img src={email_icon} className='img_icon'/>
                <input type="email" name="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="input_field">
                <img src={password_icon} className='img_icon'/>
                <input name="psw" type="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <input className="action_button" type="submit" value="Register"/>
              </form>
          </div>
      </div>
    </div>
  )
}

export default Register;
